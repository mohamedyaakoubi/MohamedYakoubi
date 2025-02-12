import { Suspense } from "react"
import ProjectsList from "@/components/ProjectsList"
import { LoadingCard } from "@/components/LoadingCard"
import { getGithubRepos } from "../../../utils/github"

export const revalidate = 3600

export default async function Projects() {
  let repos: any[] = [];
  try {
    repos = await getGithubRepos("mohamedyaakoubi");
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    // Will show empty repos list but still display featured projects
  }

  return (
    <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
          Projects
        </h1>
        <Suspense 
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          }
        >
          <ProjectsList initialRepos={repos} />
        </Suspense>
      </div>
    </div>
  )
}