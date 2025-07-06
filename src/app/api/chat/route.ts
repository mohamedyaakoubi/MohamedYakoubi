import { NextResponse } from 'next/server'
import { Mistral } from '@mistralai/mistralai';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import enCV from '@/data/cv/en.json';
import arCV from '@/data/cv/ar.json';
import frCV from '@/data/cv/fr.json';
import type { Language } from '@/types/language';

// Add proper export configuration for API route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Define types for Mistral API
interface MistralChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatStreamResponse {
    data: {
        choices: {
            delta: {
                content: string;
            };
        }[];
    };
}

type StreamChunk = ChatStreamResponse;

// Initialize Mistral client only if API key is available
const getMistralClient = () => {
    if (!process.env.MISTRAL_API_KEY) {
        return null;
    }
    return new Mistral({
        apiKey: process.env.MISTRAL_API_KEY
    });
};


async function createCVDocuments(language: Language) {
    const cvData = {
        en: enCV,
        ar: arCV,
        fr: frCV
    }[language];

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const cvText = Object.entries(cvData).map(([key, value]) => {
        if (typeof value === 'object') {
            return `${key}: ${JSON.stringify(value, null, 2)}`;
        }
        return `${key}: ${value}`;
    }).join('\n\n');

    const docs = await splitter.createDocuments([cvText]);
    return docs;
}

function detectLanguage(text: string): Language {
    const arabicRegex = /[\u0600-\u06FF]/;
    const frenchRegex = /[à-üÀ-Ü]/;

    if (arabicRegex.test(text)) return 'ar';
    if (frenchRegex.test(text)) return 'fr';
    return 'en';
}

function calculateRelevance(text: string, query: string): number {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/);
    
    const topicWeights = {
        'service': 3,
        'offer': 3,
        'provide': 3,
        'feature': 2,
        'category': 2,
        'work': 2,
        'process': 2,
        'development': 1.5,
        'consulting': 1.5,
        'assistance': 1.5,
        'support': 1.5
    };

    let score = 0;

    if (queryLower.includes('service') || queryLower.includes('offer')) {
        if (textLower.includes('service') || textLower.includes('category:')) {
            score += 5;
        }
    }

    for (const term of queryTerms) {
        if (textLower.includes(term)) {
            score += 1;
            
            for (const [topic, weight] of Object.entries(topicWeights)) {
                if (term.includes(topic)) {
                    score += weight;
                }
            }
        }
    }

    if (textLower.includes('features:') || textLower.includes('workprocess:')) {
        score += 2;
    }

    return score;
}

async function findRelevantDocuments(query: string, documents: Document[]): Promise<string[]> {
    const scoredDocs = documents.map(doc => ({
        content: doc.pageContent,
        score: calculateRelevance(doc.pageContent, query)
    }));

    const relevantDocs = scoredDocs
        .sort((a, b) => b.score - a.score)
        .filter(doc => doc.score > 0)
        .slice(0, 5)
        .map(doc => doc.content);

    if (relevantDocs.length === 0) {
        return documents
            .filter(doc => 
                doc.pageContent.toLowerCase().includes('service') ||
                doc.pageContent.toLowerCase().includes('category') ||
                doc.pageContent.toLowerCase().includes('features')
            )
            .slice(0, 3)
            .map(doc => doc.pageContent);
    }

    return relevantDocs;
}

function getFallbackResponse(language: Language, query: string): string {
    const fallbackResponses = {
        en: {
            greeting: "Hello! I'm Mohamed Yaakoubi's AI assistant. I'm currently in demo mode. I specialize in AI/ML, web development, and language services. How can I help you today?",
            services: "I offer AI solutions, web development, translation services, and consulting. I have experience with React, Next.js, Python, and various AI frameworks.",
            experience: "I have experience working with companies like DeepL, RWS (Meta AI), Uber, and Volga Partners in various AI and technology roles.",
            projects: "Some of my key projects include NotYet (AI career guidance), DocuMed (healthcare platform), and Potential (AI search engine).",
            contact: "You can reach me through the contact form on this website, or connect with me on LinkedIn. I'm always open to discussing new opportunities and collaborations.",
            skills: "My core skills include AI/ML development, web development with React and Next.js, translation and localization services, and consulting on technology solutions.",
            default: "Thank you for your question! I'm currently in demo mode. Please visit my portfolio to learn more about my services and experience."
        },
        fr: {
            greeting: "Bonjour ! Je suis l'assistant IA de Mohamed Yaakoubi. Je suis actuellement en mode démo. Je me spécialise dans l'IA/ML, le développement web et les services linguistiques. Comment puis-je vous aider ?",
            services: "J'offre des solutions IA, développement web, services de traduction et consulting. J'ai de l'expérience avec React, Next.js, Python et divers frameworks IA.",
            experience: "J'ai de l'expérience avec des entreprises comme DeepL, RWS (Meta AI), Uber et Volga Partners dans divers rôles technologiques et IA.",
            projects: "Mes projets clés incluent NotYet (orientation IA), DocuMed (plateforme santé) et Potential (moteur de recherche IA).",
            contact: "Vous pouvez me contacter via le formulaire de contact sur ce site, ou me joindre sur LinkedIn. Je suis toujours ouvert aux discussions sur de nouvelles opportunités.",
            skills: "Mes compétences principales incluent le développement IA/ML, le développement web avec React et Next.js, les services de traduction et localisation, et le conseil en solutions technologiques.",
            default: "Merci pour votre question ! Je suis actuellement en mode démo. Visitez mon portfolio pour en savoir plus sur mes services."
        },
        ar: {
            greeting: "مرحباً! أنا المساعد الذكي لمحمد يعقوبي. أعمل حالياً في وضع التجريب. أتخصص في الذكاء الاصطناعي وتطوير الويب والخدمات اللغوية. كيف يمكنني مساعدتك؟",
            services: "أقدم حلول الذكاء الاصطناعي وتطوير الويب وخدمات الترجمة والاستشارات. لدي خبرة في React و Next.js و Python وأطر عمل الذكاء الاصطناعي.",
            experience: "لدي خبرة مع شركات مثل DeepL و RWS (Meta AI) و Uber و Volga Partners في أدوار متنوعة في التكنولوجيا والذكاء الاصطناعي.",
            projects: "مشاريعي الرئيسية تشمل NotYet (توجيه مهني بالذكاء الاصطناعي) و DocuMed (منصة صحية) و Potential (محرك بحث ذكي).",
            contact: "يمكنك التواصل معي عبر نموذج الاتصال في هذا الموقع، أو التواصل معي على LinkedIn. أنا دائماً مفتوح لمناقشة الفرص الجديدة.",
            skills: "مهاراتي الأساسية تشمل تطوير الذكاء الاصطناعي والتعلم الآلي، تطوير الويب باستخدام React و Next.js، خدمات الترجمة والتوطين، والاستشارات التقنية.",
            default: "شكراً لسؤالك! أعمل حالياً في وضع التجريب. يرجى زيارة معرض أعمالي لمعرفة المزيد عن خدماتي."
        }
    };

    const responses = fallbackResponses[language];
    const queryLower = query.toLowerCase();

    if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('مرحبا') || queryLower.includes('bonjour')) {
        return responses.greeting;
    }
    if (queryLower.includes('service') || queryLower.includes('خدم') || queryLower.includes('offr')) {
        return responses.services;
    }
    if (queryLower.includes('experience') || queryLower.includes('خبر') || queryLower.includes('expérience')) {
        return responses.experience;
    }
    if (queryLower.includes('project') || queryLower.includes('مشروع') || queryLower.includes('projet')) {
        return responses.projects;
    }
    if (queryLower.includes('contact') || queryLower.includes('تواصل') || queryLower.includes('contacter')) {
        return responses.contact;
    }
    if (queryLower.includes('skill') || queryLower.includes('مهار') || queryLower.includes('compétence')) {
        return responses.skills;
    }

    return responses.default;
}

export async function GET() {
    return NextResponse.json({ 
        message: 'Chat API is operational',
        status: 'ready',
        timestamp: new Date().toISOString()
    }, {
        status: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
    });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Allow': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Cache-Control': 'no-cache'
        }
    });
}

export async function POST(request: Request) {
    try {
        const { messages: incomingMessages, language = 'en' } = await request.json();
        
        if (!incomingMessages || !Array.isArray(incomingMessages) || incomingMessages.length === 0) {
            throw new Error('Invalid messages format');
        }

        const lastMessage = incomingMessages[incomingMessages.length - 1].content;
        const detectedLanguage = detectLanguage(lastMessage);
        const effectiveLanguage = language === 'en' ? detectedLanguage : language;
        
        const client = getMistralClient();
        
        if (!client) {
            console.log('Using fallback response - no Mistral API key');
            const fallbackResponse = getFallbackResponse(effectiveLanguage as Language, lastMessage);
            
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                start(controller) {
                    const words = fallbackResponse.split(' ');
                    let index = 0;
                    
                    const sendWord = () => {
                        if (index < words.length) {
                            const word = index === 0 ? words[index] : ' ' + words[index];
                            controller.enqueue(encoder.encode(word));
                            index++;
                            setTimeout(sendWord, 50);
                        } else {
                            controller.close();
                        }
                    };
                    
                    sendWord();
                }
            });

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'no-cache, no-transform',
                    'Connection': 'keep-alive',
                },
            });
        }

        const docs = await createCVDocuments(effectiveLanguage);
        const relevantDocs = await findRelevantDocuments(lastMessage, docs);

        const systemPrompts = {
            en: "You are an AI assistant for Mohamed Yaakoubi's portfolio website. Answer questions about his background, experience, skills, and services. Use only the provided CV information. If information isn't available, say you don't have that information.",
            fr: "Vous êtes un assistant IA pour le site portfolio de Mohamed Yaakoubi. Répondez aux questions sur son parcours, expérience, compétences et services. Utilisez uniquement les informations CV fournies. Si l'information n'est pas disponible, dites que vous n'avez pas cette information.",
            ar: "أنت مساعد ذكاء اصطناعي لموقع محمد يعقوبي الشخصي. يجب أن تجيب باللغة العربية فقط. استخدم فقط معلومات السيرة الذاتية التالية للإجابة على الأسئلة. إذا لم تكن المعلومات موجودة في السياق، قل أنك لا تملك هذه المعلومات."
        };

        const messages: MistralChatMessage[] = [
            {
                role: "system",
                content: `${systemPrompts[effectiveLanguage as Language]}\n\nRelevant CV Information:\n${relevantDocs.join('\n\n')}`
            },
            {
                role: "user",
                content: lastMessage
            }
        ];

        const result = await client.chat.stream({
            model: "mistral-small-latest",
            messages: messages,
        });

        const encoder = new TextEncoder();
        
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result) {
                        const streamChunk = chunk as unknown as StreamChunk;
                        const content = streamChunk.data.choices[0]?.delta?.content;
                        
                        if (content) {
                            controller.enqueue(encoder.encode(content));
                        }
                    }
                } catch (error) {
                    console.error('Stream error:', error);
                    const fallbackResponse = getFallbackResponse(effectiveLanguage as Language, lastMessage);
                    controller.enqueue(encoder.encode(fallbackResponse));
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Content-Type-Options': 'nosniff',
            },
        });

    } catch (error) {
        console.error('Chat error:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ 
            error: 'Service temporarily unavailable',
            details: errorMessage,
            fallback: 'Please try again later or contact directly through the contact form.'
        }, {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        });
    }
}