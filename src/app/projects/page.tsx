import type { Viewport, Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

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

export const metadata: Metadata = {
  title: 'Projects | Mohamed Yaakoubi',
  description: 'Explore Mohamed Yaakoubi\'s portfolio of projects in AI, web development, and localization. View featured projects and GitHub repositories.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/projects'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default function ProjectsPage() {
  return (
    <>
      {/* Add static pre-rendered content for search engines */}
      <div className="sr-only">
        <h1>Projects - Mohamed Yaakoubi</h1>
        <p>Explore a collection of projects developed by Mohamed Yaakoubi, including web applications, AI solutions, and localization tools.</p>
        <ul>
          <li>Web Development Projects</li>
          <li>AI & Machine Learning Projects</li>
          <li>Translation & Localization Tools</li>
          <li>GitHub Repositories</li>
        </ul>
      </div>

      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient />
      </Suspense>
    </>
  )
}