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
    en: 'Professional Experience | Mohamed Yaakoubi | Wirestock, Prosessor.AI, DeepL, Meta AI (RWS), Uber, UbiAi | Transcription, Video Metadata, Translation, AI Evaluation',
    fr: 'Expérience Professionnelle | Mohamed Yaakoubi | Wirestock, Prosessor.AI, DeepL, Meta AI (RWS), Uber, UbiAi | Transcription, Métadonnées Vidéo, Traduction, Évaluation IA',
    ar: 'الخبرة المهنية | محمد يعقوبي | Wirestock، Prosessor.AI، DeepL، Meta AI (RWS)، Uber، UbiAi | النسخ، البيانات الوصفية للفيديو، الترجمة، تقييم الذكاء الاصطناعي'
  }
  
  const descriptions = {
    en: 'Comprehensive work experience of Mohamed Yaakoubi: Media Content & Metadata Specialist at Wirestock (Full-time), Arabic Maghrebi Transcriber at Prosessor.AI, Linguistic AI Evaluator at RWS/Meta AI (Llama 4), Localization Coordinator at Uber via Volga Partners, Linguistic Editor at DeepL, Technical Writer at UbiAi, and 5+ years as Freelance Editor at Unbabel (1.6M+ words translated). Specializing in Arabic transcription & annotation, AI content evaluation, machine translation post-editing, and localization quality assurance.',
    fr: 'Expérience professionnelle complète de Mohamed Yaakoubi : Spécialiste Contenu & Métadonnées Médias chez Wirestock (Temps plein), Transcripteur Arabe Maghrébin chez Prosessor.AI, Évaluateur IA Linguistique chez RWS/Meta AI (Llama 4), Coordinateur Localisation chez Uber via Volga Partners, Éditeur Linguistique chez DeepL, Rédacteur Technique chez UbiAi, et 5+ ans comme Éditeur Freelance chez Unbabel (1,6M+ mots traduits). Spécialisé en transcription & annotation arabe, évaluation contenu IA, post-édition traduction automatique, et assurance qualité localisation.',
    ar: 'الخبرة المهنية الشاملة لمحمد يعقوبي: متخصص محتوى وبيانات وصفية للوسائط في Wirestock (دوام كامل)، ناسخ عربية مغاربية في Prosessor.AI، مقيم ذكاء اصطناعي لغوي في RWS/Meta AI (Llama 4)، منسق توطين في Uber عبر Volga Partners، محرر لغوي في DeepL، كاتب تقني في UbiAi، و5+ سنوات كمحرر مستقل في Unbabel (1.6 مليون+ كلمة مترجمة). متخصص في النسخ والتعليق العربي، تقييم محتوى الذكاء الاصطناعي، مراجعة الترجمة الآلية، وضمان جودة التوطين.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'Mohamed Yaakoubi experience', 'Wirestock', 'Prosessor.AI', 'UbiAi', 'DeepL', 'RWS Meta AI',
      'Arabic transcriber', 'Maghrebi Arabic', 'audio transcription',
      'video metadata writer', 'technical content writer', 'linguistic editor',
      'AI evaluator', 'machine translation', 'Arabic English translation',
      'freelance AI specialist', 'remote work experience', 'speech-to-text'
    ].join(', '),
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/experience`
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/experience`,
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
      "item": `https://www.mohamedyaakoubi.com/${locale}`
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": translations.navigation?.links.experience || "Experience",
      "item": `https://www.mohamedyaakoubi.com/${locale}/experience`
    }
  ]
}
  return (
    <>
        <script
      id="experience-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
      <ExperienceClient />
    </>
  )
}