import type { Metadata } from 'next'
import { getTranslations, getSupportedLocales } from '@/lib/translations'
import { getGithubRepos } from '@/utils/github'
import type { Repository } from '@/utils/github'
import ProjectsClient from '@/components/ProjectsClient'


export async function generateStaticParams() {
  const locales = getSupportedLocales();
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'AI Projects & Open Source Portfolio | Mohamed Yaakoubi | Healthcare AI, Career Guidance Platforms, Data Search Engines',
    fr: 'Projets IA & Portfolio Open Source | Mohamed Yaakoubi | IA Santé, Plateformes Orientation Carrière, Moteurs Recherche Données',
    ar: 'مشاريع الذكاء الاصطناعي والمصادر المفتوحة | محمد يعقوبي | الذكاء الاصطناعي للرعاية الصحية، منصات التوجيه المهني، محركات البحث'
  }
  
  const descriptions = {
    en: 'Explore innovative projects by Mohamed Yaakoubi including AI career guidance platforms, medical documentation systems, and AI-powered search engines.',
    fr: 'Explorez les projets innovants de Yaakoubi Mohamed incluant des plateformes de guidance de carrière IA, des systèmes de documentation médicale et des moteurs de recherche IA.',
    ar: 'استكشف المشاريع المبتكرة لمحمد يعقوبي بما في ذلك منصات توجيه المهنة بالذكاء الاصطناعي وأنظمة التوثيق الطبي ومحركات البحث المدعومة بالذكاء الاصطناعي.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/projects`
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/projects`,
      type: 'website',
    },
  }
}
interface ProjectsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ProjectsPage(props: ProjectsPageProps) {
  // Fix: Properly await params
  const params = await props.params
  const { locale } = params
  const translations = getTranslations(locale)

  // Pre-fetch GitHub repos for SSG
  let repos: Repository[] = []
  try {
    repos = await getGithubRepos("mohamedyaakoubi")
  } catch (error) {
    console.error("Failed to fetch GitHub repos during build:", error)
  }
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
      "name": translations.navigation?.links.projects || "Projects",
      "item": `https://www.mohamedyaakoubi.com/${locale}/projects`
    }
  ]
}
  return (
    <>
        <script
      id="projects-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
      <ProjectsClient locale={locale} translations={translations} initialRepos={repos} />
    </>
  )
}