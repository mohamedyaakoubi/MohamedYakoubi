import type { Metadata } from 'next'
import ExperienceClient from '@/components/ExperienceClient'
import { getTranslations } from '@/lib/translations'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'Professional Experience | Mohamed Yaakoubi - AI Specialist',
    fr: 'Expérience Professionnelle | Mohamed Yaakoubi - Spécialiste IA',
    ar: 'الخبرة المهنية | محمد يعقوبي - متخصص الذكاء الاصطناعي'
  }
  
  const descriptions = {
    en: 'Comprehensive work experience of Mohamed Yaakoubi: Video Metadata Writer at Wirestock, Technical Content Writer at UbiAi, Linguistic Editor at DeepL, AI Evaluator at RWS (Meta AI), and more.',
    fr: 'Expérience professionnelle complète de Mohamed Yaakoubi : Rédacteur de métadonnées vidéo chez Wirestock, Rédacteur de contenu technique chez UbiAi, Éditeur linguistique chez DeepL, Évaluateur IA chez RWS (Meta AI).',
    ar: 'الخبرة المهنية الشاملة لمحمد يعقوبي: كاتب بيانات وصفية للفيديو في Wirestock، كاتب محتوى تقني في UbiAi، محرر لغوي في DeepL، مقيم ذكاء اصطناعي في RWS (Meta AI).'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'Mohamed Yaakoubi experience', 'Wirestock', 'UbiAi', 'DeepL', 'RWS Meta AI',
      'video metadata writer', 'technical content writer', 'linguistic editor',
      'AI evaluator', 'machine translation', 'Arabic English translation',
      'freelance AI specialist', 'remote work experience'
    ].join(', '),
    alternates: {
      // Fixed canonical URL - consistent pattern
      canonical: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/en/experience'
        : `https://www.mohamedyaakoubi.live/${locale}/experience`
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'profile',
    }
  }
}

interface ExperiencePageProps {
  params: Promise<{ locale: string }>
}

export default async function ExperiencePage(props: ExperiencePageProps) {
  // Fix: Properly await params
  const params = await props.params
  const { locale } = params
  const translations = getTranslations(locale)

  return (
    <>
      {/* Enhanced static content for SEO */}
      <div className="sr-only" aria-hidden="false">
        <h1>Professional Experience - Mohamed Yaakoubi</h1>
        <p>Comprehensive professional experience of Mohamed Yaakoubi in AI, machine translation, content creation, and technology consulting.</p>
        
        <section aria-labelledby="current-positions">
          <h2 id="current-positions">Current Positions (2025)</h2>
          
          <article>
            <h3>Video Metadata Writer | Wirestock</h3>
            <time dateTime="2025-04">April 2025 - Present</time>
            <p>Full-time remote position focusing on video content analysis and metadata creation.</p>
            <ul>
              <li>Write detailed metadata for edited videos including goal articulation and descriptions</li>
              <li>Segment raw footage with rationale-rich descriptions for storytelling</li>
              <li>Evaluate content for coherence and visual communication alignment</li>
              <li>Collaborate with remote teams following structured workflows</li>
            </ul>
          </article>
          
          <article>
            <h3>Technical Content Writer & Web Operations Assistant | UbiAi</h3>
            <time dateTime="2025-03">March 2025 - Present</time>
            <p>Creating technical content on AI topics and improving platform performance.</p>
            <ul>
              <li>Create blog content on LLM fine-tuning and NLP for WordPress platform</li>
              <li>Perform website audits to improve UX, SEO, and performance</li>
              <li>Plan content strategy including video tutorials and community engagement</li>
              <li>Coordinate external media and marketing support</li>
            </ul>
          </article>
          
          <article>
            <h3>Linguistic Editor | DeepL</h3>
            <time dateTime="2025-02">February 2025 - Present</time>
            <p>Enhancing AI translation models through expert linguistic evaluation.</p>
            <ul>
              <li>Evaluate and refine AI-generated Arabic-English translations</li>
              <li>Identify errors and provide corrections with linguistic explanations</li>
              <li>Work on quality assessment and transcreation tasks</li>
              <li>Collaborate with Language Data team for model enhancement</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="ai-evaluation-roles">
          <h2 id="ai-evaluation-roles">AI Evaluation and Localization (2024-Present)</h2>
          
          <article>
            <h3>Linguistic AI Evaluator - Arabic Maghrebi QA | RWS (Meta AI)</h3>
            <time dateTime="2024-11">November 2024 - Present</time>
            <p>Evaluating Large Language Models including Llama 4 for Meta AI.</p>
            <ul>
              <li>Evaluate multilingual prompts and AI responses in Arabic</li>
              <li>Rank outputs for coherence, fluency, and cultural relevance</li>
              <li>Provide feedback for linguistic and contextual accuracy</li>
            </ul>
          </article>
          
          <article>
            <h3>Localization Vendor Coordinator | Uber (via Volga Partners)</h3>
            <time dateTime="2024-07">July 2024 - Present</time>
            <p>Managing Arabic-English localization for Uber's platform.</p>
            <ul>
              <li>Evaluate AI-generated content for linguistic accuracy</li>
              <li>Provide precise English to Arabic translations</li>
              <li>Coordinate localization efforts for optimal user experience</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="education-certifications">
          <h2 id="education-certifications">Education & Certifications</h2>
          
          <article>
            <h3>Licentiate Degree in Computer Science</h3>
            <p>Faculty of Sciences in Sfax (2024-2027)</p>
          </article>
          
          <article>
            <h3>Integrated Preparatory Cycle in Computer Science</h3>
            <p>Faculty of Sciences in Sfax (2021-2024)</p>
          </article>
          
          <article>
            <h3>Professional Certifications</h3>
            <ul>
              <li>IBM Artificial Intelligence Fundamentals</li>
              <li>Cisco NetAcad Networking Basics</li>
              <li>Cisco NetAcad Introduction to Cybersecurity</li>
              <li>3D Printing Training (American Corner Tunis)</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="technical-skills">
          <h2 id="technical-skills">Technical Skills</h2>
          <ul>
            <li>Programming: JavaScript, TypeScript, Python, C</li>
            <li>Web Development: React, Next.js, HTML/CSS</li>
            <li>Databases: Firebase, SQL</li>
            <li>Cloud: Azure AI services</li>
            <li>Tools: Visual Studio Code, Git/GitHub, Smartcat, Amara</li>
            <li>Languages: Arabic (Native), English (Professional), French (Working), German (Basic)</li>
          </ul>
        </section>
      </div>
      
      <ExperienceClient />
    </>
  )
}