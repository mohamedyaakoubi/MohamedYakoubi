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
      // Add canonical URL
      canonical: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/en/projects'
        : `https://www.mohamedyaakoubi.live/${locale}/projects`
    }
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
      "item": `https://www.mohamedyaakoubi.live/${locale}`
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": translations.navigation?.links.projects || "Projects",
      "item": `https://www.mohamedyaakoubi.live/${locale}/projects`
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
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>{translations.projects?.title || 'Projects'} - Mohamed Yaakoubi</h1>
        <p>Explore a collection of innovative projects developed by Mohamed Yaakoubi, spanning AI/ML, healthcare technology, and web development. View featured projects and open-source GitHub repositories.</p>
        
        <section aria-labelledby="featured-projects">
          <h2 id="featured-projects">Featured Projects</h2>
          
          <article>
            <h3>{translations.projects?.names?.NotYet || 'NotYet'} - AI Career Guidance Platform</h3>
            <p>AI-powered web application assisting Tunisian students and job seekers in career development.</p>
            <p>{translations.projects?.longDescriptions?.NotYet || 'NotYet is an AI-driven platform designed to help Tunisian students and job seekers by offering career guidance, educational pathways, and skill-building resources. Built with React, Firebase, and Azure AI, it integrates AI-powered search and recommendation systems to optimize user experiences.'}</p>
            <p>Technologies: {translations.projects?.technologies?.NotYet?.join(', ') || 'React, Firebase, Azure AI, Prompt Engineering'}</p>
            <p>Status: {translations.projects?.status?.['in-progress'] || 'In Progress'}</p>
            <ul>
              {translations.projects?.features?.NotYet?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              )) || [
                <li key="1">AI-powered career and education recommendations</li>,
                <li key="2">Personalized guidance based on user input</li>,
                <li key="3">Integration with Azure AI for smart analysis</li>,
                <li key="4">Community-driven discussions and mentorship</li>
              ]}
            </ul>
            <p>Demo: https://notyet-demo.vercel.app</p>
            <p>GitHub: https://github.com/mohamedyaakoubi/notyet</p>
          </article>

          <article>
            <h3>{translations.projects?.names?.DocuMed || 'DocuMed'} - Medical Documentation Platform</h3>
            <p>Web-based medical documentation and management platform for healthcare professionals.</p>
            <p>{translations.projects?.longDescriptions?.DocuMed || 'DocuMed simplifies medical record management by providing a digital platform for organizing patient records, prescriptions, and appointments. It was developed as part of the MentorNations Bootcamp using React and Firebase.'}</p>
            <p>Technologies: {translations.projects?.technologies?.DocuMed?.join(', ') || 'React, Firebase'}</p>
            <p>Status: {translations.projects?.status?.completed || 'Completed'}</p>
            <ul>
              {translations.projects?.features?.DocuMed?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              )) || [
                <li key="1">Secure cloud-based storage for medical records</li>,
                <li key="2">User-friendly patient management system</li>,
                <li key="3">Real-time appointment scheduling and tracking</li>,
                <li key="4">Collaborative tools for healthcare professionals</li>
              ]}
            </ul>
            <p>Demo: https://docu-med.vercel.app/</p>
            <p>GitHub: https://github.com/mohamedyaakoubi/documed</p>
          </article>

          <article>
            <h3>{translations.projects?.names?.Potential || 'Potential'} - AI-Powered Search Engine</h3>
            <p>AI-powered search engine for the Abu Dhabi Open Data Platform with real-time API query processing.</p>
            <p>{translations.projects?.longDescriptions?.Potential || 'Potential enhances the Abu Dhabi Open Data Platform by integrating GPT-4 with Azure Cognitive Search, enabling users to retrieve relevant datasets using natural language queries. It dynamically indexes API-accessed data and refines queries using LLM-powered suggestions.'}</p>
            <p>Technologies: {translations.projects?.technologies?.Potential?.join(', ') || 'Next.js, Azure Cognitive Search, GPT-4, API Query Processing'}</p>
            <p>Status: {translations.projects?.status?.completed || 'Completed'}</p>
            <ul>
              {translations.projects?.features?.Potential?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              )) || [
                <li key="1">Natural language dataset search powered by GPT-4</li>,
                <li key="2">Real-time API indexing and retrieval</li>,
                <li key="3">Automated query refinement for better results</li>,
                <li key="4">Seamless integration with Abu Dhabi Open Data API</li>
              ]}
            </ul>
            <p>Demo: https://potential-kegz.vercel.app/</p>
            <p>GitHub: https://github.com/mohamedyaakoubi/potential</p>
          </article>
        </section>

        <section aria-labelledby="github-repositories">
          <h2 id="github-repositories">GitHub Repositories</h2>
          <p>Explore open-source projects and code repositories on GitHub, including AI/ML experiments, web applications, and development tools.</p>
          
          {repos.length > 0 && (
            <div>
              <h3>Repository List</h3>
              <ul>
                {repos.slice(0, 10).map((repo: any) => (
                  <li key={repo.id}>
                    <h4>{repo.name}</h4>
                    <p>{repo.description || 'No description available'}</p>
                    <p>Language: {repo.language || 'Not specified'}</p>
                    <p>Stars: {repo.stargazers_count} | Forks: {repo.forks_count}</p>
                    <p>URL: {repo.html_url}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient locale={locale} translations={translations} initialRepos={repos} />
      </Suspense>
    </>
  )
}