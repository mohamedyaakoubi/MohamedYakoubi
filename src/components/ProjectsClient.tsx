"use client"
import { Suspense, useEffect, useState } from "react"
import ProjectsList from "@/components/ProjectsList"
import { LoadingCard } from "@/components/LoadingCard"
import { getGithubRepos } from '../../utils/github'
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import type { Repository } from '../../utils/github'



export default function Projects() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Update the useEffect hook
useEffect(() => {
  const fetchRepos = async () => {
    try {
      console.log("Fetching GitHub repositories...");
      const fetchedRepos = await getGithubRepos("mohamedyaakoubi");
      console.log("Repos fetched:", fetchedRepos?.length || 0);
      setRepos(fetchedRepos);
    } catch (error) {
      console.error("Failed to fetch GitHub repos:", error);
      setError(t('projects.error') || "Failed to load GitHub repositories");
    } finally {
      setLoading(false);
    }
  };

  fetchRepos();
}, []);  // Keep the empty dependency array

  if (loading) {
    return (
      <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">
            {t('projects.title')}
          </h1>
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
            {t('actions.tryAgain')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">
          {t('projects.title')}
        </h1>
        <ProjectsList initialRepos={repos} />
      </div>
    </div>
  )
}