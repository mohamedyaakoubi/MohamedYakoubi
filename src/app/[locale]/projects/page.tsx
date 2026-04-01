import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getTranslations, getSupportedLocales } from '@/lib/translations'
import { getGithubRepos } from '@/utils/github'
import type { Repository } from '@/utils/github'
import Script from 'next/script'

// Create a loading component that matches your design
const ProjectsLoading = () => (
  <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-4xl font-bold mb-12 text-center">
        Projects
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// Dynamically import the heavy client component
const ProjectsClient = dynamic(() => import('@/components/ProjectsClient'), {
  loading: () => <ProjectsLoading />
})

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
        <Script
      id="projects-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient locale={locale} translations={translations} initialRepos={repos} />
      </Suspense>
    </>
  )
}