import type { Metadata } from 'next'
import ExperienceClient from '@/components/ExperienceClient'
import { getTranslations } from '@/lib/translations'
import Script from 'next/script'

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
    en: 'Professional Experience | Mohamed Yaakoubi | Wirestock, DeepL, Meta AI (RWS), Uber, UbiAi | Video Metadata, Translation, AI Evaluation',
    fr: 'Expérience Professionnelle | Mohamed Yaakoubi | Wirestock, DeepL, Meta AI (RWS), Uber, UbiAi | Métadonnées Vidéo, Traduction, Évaluation IA',
    ar: 'الخبرة المهنية | محمد يعقوبي | Wirestock، DeepL، Meta AI (RWS)، Uber، UbiAi | البيانات الوصفية للفيديو، الترجمة، تقييم الذكاء الاصطناعي'
  }
  
  const descriptions = {
    en: 'Comprehensive work experience of Mohamed Yaakoubi: Media Content & Metadata Specialist at Wirestock (Full-time), Linguistic AI Evaluator at RWS/Meta AI (Llama 4), Localization Coordinator at Uber via Volga Partners, Linguistic Editor at DeepL, Technical Writer at UbiAi, and 5+ years as Freelance Editor at Unbabel (1.6M+ words translated). Specializing in Arabic-English AI content evaluation, machine translation post-editing, and localization quality assurance.',
    fr: 'Expérience professionnelle complète de Mohamed Yaakoubi : Spécialiste Contenu & Métadonnées Médias chez Wirestock (Temps plein), Évaluateur IA Linguistique chez RWS/Meta AI (Llama 4), Coordinateur Localisation chez Uber via Volga Partners, Éditeur Linguistique chez DeepL, Rédacteur Technique chez UbiAi, et 5+ ans comme Éditeur Freelance chez Unbabel (1,6M+ mots traduits). Spécialisé en évaluation contenu IA arabe-anglais, post-édition traduction automatique, et assurance qualité localisation.',
    ar: 'الخبرة المهنية الشاملة لمحمد يعقوبي: متخصص محتوى وبيانات وصفية للوسائط في Wirestock (دوام كامل)، مقيم ذكاء اصطناعي لغوي في RWS/Meta AI (Llama 4)، منسق توطين في Uber عبر Volga Partners، محرر لغوي في DeepL، كاتب تقني في UbiAi، و5+ سنوات كمحرر مستقل في Unbabel (1.6 مليون+ كلمة مترجمة). متخصص في تقييم محتوى الذكاء الاصطناعي عربي-إنجليزي، مراجعة الترجمة الآلية، وضمان جودة التوطين.'
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": translations.navigation?.links.home || "Home",
      "item": `https://www.mohamedyaakoubi.live/${locale}`
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": translations.navigation?.links.experience || "Experience",
      "item": `https://www.mohamedyaakoubi.live/${locale}/experience`
    }
  ]
}
  return (
    <>
        <Script
      id="experience-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
      {/* Enhanced static content for SEO */}
      <div className="sr-only" aria-hidden="false">
        <h1>Professional Experience - Mohamed Yaakoubi</h1>
        <p>Comprehensive professional experience of Mohamed Yaakoubi in AI, machine translation, content creation, and technology consulting.</p>
        
        <section aria-labelledby="current-positions">
          <h2 id="current-positions">Current Positions (2025)</h2>
          
          <article>
            <h3>Media Content & Metadata Specialist | Wirestock</h3>
            <time dateTime="2025-04">April 2025 - Present (7 months)</time>
            <p>Full-time remote position focusing on media content evaluation, metadata creation, and quality assurance.</p>
            <ul>
              <li>Write detailed and structured metadata for edited videos, including final goal articulation, video descriptions, cut rationales, and audio choices</li>
              <li>Segment raw video footage and author rationale-rich descriptions for each segment to support clear storytelling and narrative flow</li>
              <li>Evaluate video content and metadata for coherence, quality, and alignment with intended visual communication</li>
              <li>Write detailed, descriptive captions and generate extensive, SEO-style keyword sets for media to enhance searchability and content discovery</li>
              <li>Assess the production quality of video and photo assets based on established criteria, including composition, lighting, focus, and adherence to brand aesthetics</li>
              <li>Perform content moderation by approving relevant media and rejecting unrelated or non-compliant content to maintain dataset quality and focus</li>
              <li>Evaluate and revise content to maintain quality, consistency, and alignment with platform standards</li>
              <li>Review contributor submissions, refining titles, captions, and keyword sets to ensure accuracy and relevance</li>
              <li>Moderate media by approving compliant content and filtering out unsuitable material</li>
              <li>Rank and evaluate AI-generated images by writing detailed rationales to identify the highest-quality outputs</li>
              <li>Collaborate with a distributed remote team, following structured workflows and communication practices</li>
            </ul>
          </article>
          
<article>
  <h3>Technical Content Writer & Web Operations Assistant | UbiAi</h3>
  <time dateTime="2025-03">March 2025 - June 2025</time>
  <p>Creating technical content on AI topics and improving platform performance.</p>
  <ul>
    <li>Created technical blog content and tutorials on LLM fine-tuning, NLP, and AI topics for a WordPress-based platform. <a href="https://ubiai.tools/author/mohamedyaakoubi/" target="_blank" rel="noopener noreferrer">Author page</a></li>
    <li>Performed website audits and diagnostics to improve UX, SEO, and platform performance. <a href="https://ubiai-audit.notion.site/" target="_blank" rel="noopener noreferrer">View sample audit report</a> (non-confidential)</li>
    <li>Collaborated with client to plan content strategy, including potential video tutorials and community engagement efforts</li>
    <li>Acted as a liaison and task coordinator for external media and marketing support to ensure project delivery</li>
  </ul>
</article>
          
          <article>
            <h3>Linguistic Editor | DeepL</h3>
            <time dateTime="2025-02">February 2025 (1 month)</time>
            <p>Freelance linguistic evaluation specialist for AI translation quality enhancement.</p>
            <ul>
              <li>Conduct detailed linguistic evaluations to identify and correct translation errors in AI-generated Arabic-English content</li>
              <li>Assess and refine Arabic translations for clarity, accuracy, and natural fluency based on DeepL's quality standards</li>
              <li>Provide detailed explanations of translation issues and propose improved versions to enhance AI-driven language models</li>
              <li>Work on diverse language-centric projects, including categorization, labeling, transcreation, and quality assessments</li>
              <li>Collaborate with DeepL's Language Data team to ensure high-quality translations and AI model improvements</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="ai-evaluation-roles">
          <h2 id="ai-evaluation-roles">AI Evaluation and Localization (2024-Present)</h2>
          
          <article>
            <h3>Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI</h3>
            <time dateTime="2024-11">November 2024 - Present (1 year)</time>
            <p>Freelance role via RWS Group evaluating Large Language Models including Llama 4 for Meta AI projects.</p>
            <ul>
              <li>Evaluate multilingual prompts and AI-generated responses in Arabic to refine advanced Large Language Models, including projects like Llama 4</li>
              <li>Rank outputs based on quality metrics such as coherence, fluency, and cultural relevance to enhance AI-driven conversational tools</li>
              <li>Provide detailed feedback to improve linguistic and contextual accuracy, ensuring alignment with diverse cultural and linguistic norms</li>
            </ul>
          </article>
          
          <article>
            <h3>Localization Vendor Coordinator | Uber (via Volga Partners)</h3>
            <time dateTime="2024-07">July 2024 - Present (1 year 4 months)</time>
            <p>Contract role managing Arabic-English localization quality for Uber's platform.</p>
            <ul>
              <li>Specialize in evaluating Arabic and English AI-generated content, ensuring linguistic and cultural accuracy</li>
              <li>Provide precise translations from English to Arabic, maintaining both linguistic nuance and cultural relevance</li>
              <li>Deliver accurate Arabic transcriptions for various projects</li>
              <li>Coordinate localization efforts to optimize the Arabic and English user experience</li>
              <li>Contribute to AI model improvement through accurate data labeling and annotation for machine learning</li>
              <li>Collaborate with Data Science and Product teams to analyze datasets, ensuring data quality and extracting actionable insights for business improvements</li>
            </ul>
          </article>
          
          <article>
            <h3>Language Data and Quality Reviewer | Volga Partners</h3>
            <time dateTime="2024-07">July 2024 - Present (1 year 4 months)</time>
            <p>Contract role conducting comprehensive quality evaluations for Generative AI and Large Language Models.</p>
            <ul>
              <li>Conduct comprehensive quality and safety evaluations for Generative AI and Large Language Models</li>
              <li>Apply complex policy guidelines to rate AI-generated responses for accuracy, truthfulness, and adherence to user intent</li>
              <li>Perform critical safety analysis to identify, classify, and mitigate risks from harmful content like hate speech and dangerous information</li>
              <li>Provide structured feedback and data annotations that directly contribute to the training and improvement of advanced AI systems</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="long-term-roles">
          <h2 id="long-term-roles">Long-Term Freelance Roles (2020-Present)</h2>
          
          <article>
            <h3>Freelance Editor (Arabic to English & English to Arabic) | Unbabel</h3>
            <time dateTime="2020-03">March 2020 - Present (5 years 8 months)</time>
            <p>Freelance translation post-editing specialist with 1.6M+ words translated across 8,000+ tasks.</p>
            <ul>
              <li>Translated and post-edited 1.6M+ words across 8,000+ Arabic↔English tasks</li>
              <li>Review and edit translations for accuracy, clarity, and style in both Arabic to English and English to Arabic</li>
              <li>Ensure translations maintain quality standards and linguistic integrity</li>
              <li>Ensured linguistic integrity and cultural appropriateness in AI-assisted translations</li>
              <li>Provide feedback to improve translator work and translation quality consistency</li>
              <li>Conduct quality checks for cultural appropriateness and accuracy to maintain high translation standards</li>
              <li>Collaborate with teams to deliver high-quality translations on time</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="past-roles">
          <h2 id="past-roles">Previous Roles & Contributions (2024)</h2>
          
          <article>
            <h3>Crowdsourced Data Contributor | Premise</h3>
            <time dateTime="2024-02">February 2024 - September 2024 (8 months)</time>
            <p>Freelance data collection contributor supporting real-time market research and economic analysis.</p>
            <ul>
              <li>Engaged in crowdsourced data collection on diverse topics using the Premise mobile app</li>
              <li>Provided accurate and timely information to support decision-making for governments, businesses, and organizations</li>
              <li>Collaborated with a global network of contributors to gather real-time insights</li>
              <li>Contributed to various projects including market research, infrastructure monitoring, and economic analysis</li>
            </ul>
          </article>
          
          <article>
            <h3>Freelance AI Data Annotator | Toloka</h3>
            <time dateTime="2024-02">February 2024 - August 2024 (7 months)</time>
            <p>Freelance data annotation specialist supporting machine learning model training.</p>
            <ul>
              <li>Conducted data labeling, image annotation, and text transcription for AI training</li>
              <li>Provided accurate and high-quality annotations and labels to support machine learning algorithms and AI training</li>
              <li>Ensured high-quality annotations to improve machine learning models</li>
              <li>Consistently met task requirements and quality standards set by clients and Toloka</li>
              <li>Worked on diverse projects across multiple industries including technology, healthcare, and finance</li>
              <li>Collaborated with a diverse community of contributors worldwide to complete tasks efficiently</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="volunteer-roles">
          <h2 id="volunteer-roles">Volunteer & Side Projects</h2>
          
          <article>
            <h3>Subtitle Editor | TED Translators</h3>
            <time dateTime="2024-04">April 2024 - Present</time>
            <p>Volunteer translator and subtitle editor making TED Talks accessible in Arabic.</p>
            <ul>
              <li>Translate and subtitle TED Talks using Amara software to ensure global accessibility</li>
              <li>Ensure quality and accuracy while maintaining high translation standards and preserving the speaker's original message</li>
              <li>Collaborate with other translators through the Amara CAT tool, valuing feedback for improvement</li>
              <li>Engage in continuous learning by exploring diverse topics to enhance translation skills</li>
              <li>Contribute to global idea exchange by empowering non-English speakers and facilitating the exchange of ideas worldwide</li>
            </ul>
          </article>
          
          <article>
            <h3>KYC Validator (Know Your Customer) | Pi Network</h3>
            <time dateTime="2024-07">July 2024 - Present</time>
            <p>Volunteer identity verification validator for Pi Network blockchain platform.</p>
            <ul>
              <li>Review submitted identification documents for authenticity</li>
              <li>Cross-reference information against official records</li>
              <li>Maintain a high standard of accuracy and confidentiality</li>
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