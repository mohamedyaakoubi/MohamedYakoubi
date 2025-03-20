import { Message } from 'ai';
import { Mistral } from '@mistralai/mistralai';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import enCV from '@/data/cv/en.json';
import arCV from '@/data/cv/ar.json';
import frCV from '@/data/cv/fr.json';
import type { Language } from '@/types/language';

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

const client = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY
});

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
    // Arabic character range
    const arabicRegex = /[\u0600-\u06FF]/;
    // French accents and common characters
    const frenchRegex = /[à-üÀ-Ü]/;

    if (arabicRegex.test(text)) return 'ar';
    if (frenchRegex.test(text)) return 'fr';
    return 'en';
}
// Add GET handler to prevent 405 errors
export async function GET() {
    return new Response(JSON.stringify({ 
      error: 'This endpoint requires a POST request with proper message format'
    }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Allow': 'POST'
      },
    });
  }
  
export async function POST(request: Request) {
    try {
        const { messages: incomingMessages, language = 'en' } = await request.json();
        
        if (!incomingMessages || !Array.isArray(incomingMessages) || incomingMessages.length === 0) {
            throw new Error('Invalid messages format');
        }

        const lastMessage = incomingMessages[incomingMessages.length - 1].content;
        // Detect language from user input if not explicitly set
        const detectedLanguage = detectLanguage(lastMessage);
        const effectiveLanguage = language === 'en' ? detectedLanguage : language;
        
        const docs = await createCVDocuments(effectiveLanguage);
        const relevantDocs = await findRelevantDocuments(lastMessage, docs);

        // Update system prompt based on detected language
        const systemPrompts = {
            en: "You are an AI assistant for Mohamed Yaakoubi's portfolio website...",
            fr: "Vous êtes un assistant IA pour le site portfolio de Mohamed Yaakoubi...",
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
        let fullMessage = '';
        
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // Send an initial empty chunk for faster TTFB
                    controller.enqueue(encoder.encode(''));
                    
                    for await (const chunk of result) {
                        const streamChunk = chunk as unknown as StreamChunk;
                        const content = streamChunk.data.choices[0]?.delta?.content;
                        
                        if (content) {
                            controller.enqueue(encoder.encode(content));
                            
                            // Store the full message for context (no change to logic)
                            fullMessage += content;
                        }
                        
                        // Flush after each chunk for real-time streaming
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }
                } catch (error) {
                    console.error('Stream error:', error);
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
                'Transfer-Encoding': 'chunked'
            },
        });

    } catch (error) {
        console.error('Chat error:', error);
        return new Response(JSON.stringify({ 
            error: `Chat service error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

function calculateRelevance(text: string, query: string): number {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/);
    
    // Define key topic terms and their weights
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

    // Check for service-related terms in the query
    if (queryLower.includes('service') || queryLower.includes('offer')) {
        // Boost sections that are explicitly about services
        if (textLower.includes('service') || textLower.includes('category:')) {
            score += 5;
        }
    }

    // Calculate term-based relevance
    for (const term of queryTerms) {
        if (textLower.includes(term)) {
            // Add base score for term match
            score += 1;
            
            // Add weighted scores for important terms
            for (const [topic, weight] of Object.entries(topicWeights)) {
                if (term.includes(topic)) {
                    score += weight;
                }
            }
        }
    }

    // Boost sections containing service-related structure
    if (textLower.includes('features:') || textLower.includes('workprocess:')) {
        score += 2;
    }

    return score;
}

async function findRelevantDocuments(query: string, documents: Document[]): Promise<string[]> {
    // Score each document
    const scoredDocs = documents.map(doc => ({
        content: doc.pageContent,
        score: calculateRelevance(doc.pageContent, query)
    }));

    // Sort by relevance score and take top matches
    const relevantDocs = scoredDocs
        .sort((a, b) => b.score - a.score)
        .filter(doc => doc.score > 0)
        .slice(0, 5)  // Increased from 3 to 5 for better coverage
        .map(doc => doc.content);

    // If no relevant docs found, look for general service information
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