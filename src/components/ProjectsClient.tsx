"use client"
import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { LoadingCard } from "@/components/LoadingCard"
import { getGithubReposClient } from "@/utils/github"
import { useTranslation } from '@/hooks/useTranslation'
import type { Repository } from "@/utils/github"

// Dynamically import the heavy ProjectsList component
const ProjectsList = dynamic(() => import("@/components/ProjectsList"), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {[...Array(6)].map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  ),
  ssr: false
})

interface ProjectsClientProps {
  locale: string
  translations: any
  initialRepos?: Repository[]
}

export default function ProjectsClient({ locale, translations, initialRepos = [] }: ProjectsClientProps) {
  const { t } = useTranslation(locale as any)
  const [repos, setRepos] = useState<Repository[]>(initialRepos)
  const [loading, setLoading] = useState(initialRepos.length === 0)
  const [error, setError] = useState<string | null>(null)

  // Only fetch if we don't have initial repos
  useEffect(() => {
    if (initialRepos.length === 0) {
      const fetchRepos = async () => {
        try {
          const fetchedRepos = await getGithubReposClient("mohamedyaakoubi");
          setRepos(fetchedRepos);
        } catch (error) {
          console.error("Failed to fetch GitHub repos:", error);
          setError(translations.projects?.error || "Failed to load GitHub repositories");
        } finally {
          setLoading(false);
        }
      };

      fetchRepos();
    }
  }, [initialRepos.length, translations.projects?.error]);

  if (loading) {
    return (
      <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-4xl font-bold mb-12 text-center">
            {translations.projects?.title || 'Projects'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 btn-primary"
          >
            {translations.actions?.tryAgain || 'Try Again'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {translations.projects?.title || 'Projects'}
        </h2>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        }>
          <ProjectsList initialRepos={repos} />
        </Suspense>
      </div>
    </div>
  )
}

