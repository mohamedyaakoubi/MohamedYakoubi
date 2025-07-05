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
  const translations = getTranslations(locale)
  
  const titles = {
    en: 'Experience | Mohamed Yaakoubi',
    fr: 'Expérience | Mohamed Yaakoubi',
    ar: 'الخبرات | محمد يعقوبي'
  }
  
  const descriptions = {
    en: 'Professional experience of Mohamed Yaakoubi at DeepL, RWS (Meta AI), UbiAi, Wirestock, Uber, and Volga Partners in AI, translation, and localization.',
    fr: 'Expérience professionnelle de Mohamed Yaakoubi chez DeepL, RWS (Meta AI), UbiAi, Wirestock, Uber et Volga Partners en IA, traduction et localisation.',
    ar: 'الخبرة المهنية لمحمد يعقوبي في DeepL و RWS (Meta AI) و UbiAi و Wirestock و Uber و Volga Partners في الذكاء الاصطناعي والترجمة والتوطين.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://mohamed-yakoubi.vercel.app/${locale === 'en' ? '' : locale + '/'}experience`
    }
  }
}

interface ExperiencePageProps {
  params: Promise<{ locale: string }>
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { locale } = await params
  const translations = getTranslations(locale)
  
  return (
    <>
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>{translations.experience?.title || 'Professional Experience'} - Mohamed Yaakoubi</h1>
        <p>Explore Mohamed Yaakoubi's professional experience in AI solutions, translation, and localization at companies like DeepL, RWS (Meta AI), UbiAi, Wirestock, Uber, and Volga Partners.</p>
        
        <section aria-labelledby="experience-detailed">
          <h2 id="experience-detailed">Detailed Work Experience</h2>
          
          <article>
            <h3>{translations.experience?.positions?.['Video Metadata Writer'] || 'Video Metadata Writer'} | Wirestock</h3>
            <p>{translations.experience?.periods?.['Apr 2025 - Present'] || 'April 2025 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'} | Full-Time</p>
            <ul>
              <li>{translations.experience?.descriptions?.['Wrote detailed and structured metadata for edited videos, including final goal articulation, video descriptions, cut rationales, and audio choices'] || 'Wrote detailed and structured metadata for edited videos, including final goal articulation, video descriptions, cut rationales, and audio choices'}</li>
              <li>{translations.experience?.descriptions?.['Segmented raw video footage and authored rationale-rich descriptions for each segment to support clear storytelling and narrative flow'] || 'Segmented raw video footage and authored rationale-rich descriptions for each segment to support clear storytelling and narrative flow'}</li>
              <li>{translations.experience?.descriptions?.['Evaluated video content and metadata for coherence, quality, and alignment with intended visual communication'] || 'Evaluated video content and metadata for coherence, quality, and alignment with intended visual communication'}</li>
              <li>{translations.experience?.descriptions?.['Collaborated with the remote team through consistent communication and adherence to content guidelines and structured workflows'] || 'Collaborated with the remote team through consistent communication and adherence to content guidelines and structured workflows'}</li>
            </ul>
          </article>
          
          <article>
            <h3>{translations.experience?.positions?.['Technical Content Writer & Web Operations Assistant'] || 'Technical Content Writer & Web Operations Assistant'} | UbiAi</h3>
            <p>{translations.experience?.periods?.['Mar 2025 - Present'] || 'March 2025 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <ul>
              <li>{translations.experience?.descriptions?.['Created technical blog content and tutorials on LLM fine-tuning, NLP, and AI topics for a WordPress-based platform'] || 'Created technical blog content and tutorials on LLM fine-tuning, NLP, and AI topics for a WordPress-based platform'}</li>
              <li>{translations.experience?.descriptions?.['Performed website audits and diagnostics to improve UX, SEO, and platform performance'] || 'Performed website audits and diagnostics to improve UX, SEO, and platform performance'}</li>
              <li>{translations.experience?.descriptions?.['Collaborated with client to plan content strategy, including potential video tutorials and community engagement efforts'] || 'Collaborated with client to plan content strategy, including potential video tutorials and community engagement efforts'}</li>
              <li>{translations.experience?.descriptions?.['Acted as a liaison and task coordinator for external media and marketing support to ensure project delivery'] || 'Acted as a liaison and task coordinator for external media and marketing support to ensure project delivery'}</li>
            </ul>
          </article>
          
          <article>
            <h3>{translations.experience?.positions?.['Linguistic Editor'] || 'Linguistic Editor'} | DeepL</h3>
            <p>{translations.experience?.periods?.['Feb 2025 - Present'] || 'February 2025 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <ul>
              <li>{translations.experience?.descriptions?.['Evaluate and refine AI-generated Arabic-English translations for accuracy and fluency'] || 'Evaluate and refine AI-generated Arabic-English translations for accuracy and fluency'}</li>
              <li>{translations.experience?.descriptions?.['Identify translation errors, provide corrections, and explain linguistic issues'] || 'Identify translation errors, provide corrections, and explain linguistic issues'}</li>
              <li>{translations.experience?.descriptions?.['Work on diverse language tasks, including quality assessment and transcreation'] || 'Work on diverse language tasks, including quality assessment and transcreation'}</li>
              <li>{translations.experience?.descriptions?.['Collaborate with DeepL\'s Language Data team to enhance AI translation models'] || 'Collaborate with DeepL\'s Language Data team to enhance AI translation models'}</li>
            </ul>
          </article>
          
          <article>
            <h3>{translations.experience?.positions?.['Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI'] || 'Linguistic AI Evaluator - Arabic Maghrebi QA'} | Meta AI (RWS)</h3>
            <p>{translations.experience?.periods?.['Nov 2024 - Present'] || 'November 2024 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <ul>
              <li>{translations.experience?.descriptions?.['Evaluate multilingual prompts and AI-generated responses in Arabic to refine advanced Large Language Models, including projects like Llama 4'] || 'Evaluate multilingual prompts and AI-generated responses in Arabic to refine advanced Large Language Models, including projects like Llama 4'}</li>
              <li>{translations.experience?.descriptions?.['Rank outputs based on quality metrics such as coherence, fluency, and cultural relevance to enhance AI-driven conversational tools'] || 'Rank outputs based on quality metrics such as coherence, fluency, and cultural relevance to enhance AI-driven conversational tools'}</li>
              <li>{translations.experience?.descriptions?.['Provide detailed feedback to improve linguistic and contextual accuracy, ensuring alignment with diverse cultural and linguistic norms'] || 'Provide detailed feedback to improve linguistic and contextual accuracy, ensuring alignment with diverse cultural and linguistic norms'}</li>
            </ul>
          </article>
          
          <article>
            <h3>{translations.experience?.positions?.['Localization Vendor Coordinator'] || 'Localization Vendor Coordinator'} | Uber (via Volga Partners)</h3>
            <p>{translations.experience?.periods?.['Jul 2024 - Present'] || 'July 2024 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <ul>
              <li>{translations.experience?.descriptions?.['Evaluate Arabic and English AI-generated content for linguistic and cultural accuracy'] || 'Evaluate Arabic and English AI-generated content for linguistic and cultural accuracy'}</li>
              <li>{translations.experience?.descriptions?.['Provide precise English to Arabic translations, maintaining nuance and relevance'] || 'Provide precise English to Arabic translations, maintaining nuance and relevance'}</li>
              <li>{translations.experience?.descriptions?.['Coordinate localization efforts to optimize user experience in both languages'] || 'Coordinate localization efforts to optimize user experience in both languages'}</li>
              <li>{translations.experience?.descriptions?.['Contribute to AI model improvements through data labeling and collaboration with teams'] || 'Contribute to AI model improvements through data labeling and collaboration with teams'}</li>
            </ul>
          </article>

          <article>
            <h3>{translations.experience?.positions?.['Freelance Editor (Arabic to English & English to Arabic)'] || 'Freelance Editor (Arabic to English & English to Arabic)'} | Unbabel</h3>
            <p>{translations.experience?.periods?.['Mar 2020 - Present'] || 'March 2020 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <ul>
              <li>{translations.experience?.descriptions?.['Review and edit Arabic-English translations for accuracy, clarity, and style'] || 'Review and edit Arabic-English translations for accuracy, clarity, and style'}</li>
              <li>{translations.experience?.descriptions?.['Ensure linguistic integrity and cultural appropriateness in AI-assisted translations'] || 'Ensure linguistic integrity and cultural appropriateness in AI-assisted translations'}</li>
              <li>{translations.experience?.descriptions?.['Provide feedback to improve translation quality and consistency'] || 'Provide feedback to improve translation quality and consistency'}</li>
              <li>{translations.experience?.descriptions?.['Conduct quality checks to maintain high translation standards'] || 'Conduct quality checks to maintain high translation standards'}</li>
            </ul>
          </article>
        </section>
      </div>
      
      <ExperienceClient locale={locale} translations={translations} />
    </>
  )
}

