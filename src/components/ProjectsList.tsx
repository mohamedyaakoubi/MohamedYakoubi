"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import type { Repository } from "../../utils/github"
import type { ProjectCategory } from "@/types/project"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { featuredProjects } from "@/data/project"

// Dynamically import the ProjectCard component
const ProjectCard = dynamic(() => import('@/components/ProjectCard').then(mod => ({ default: mod.ProjectCard })), {
  loading: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  )
})

// Dynamically import the GithubReposList component
const GithubReposList = dynamic(() => import('@/components/GithubRepoList'), {
  loading: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        GitHub Repositories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  ),
  ssr: false
})

interface ProjectsListProps {
  initialRepos: Repository[]
}

export default function ProjectsList({ initialRepos }: ProjectsListProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [repos] = useState(initialRepos)
  const [filter, setFilter] = useState("all")
  const [category, setCategory] = useState<ProjectCategory | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean))
  );

  const filteredProjects = featuredProjects.filter((project) => {
    if (category === "all") return true;
    return project.category === category;
  }).filter((project) => {
    return project.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-16"
    >
      {/* Search and Filter Section */}
      <div className="mb-8">
        <motion.div 
          className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
          variants={itemVariants}
        >
          <motion.input
            type="text"
            placeholder={t('projects.search.placeholder')}
            className="w-full md:w-64 px-4 py-2 rounded-full border border-gray-200 
                     dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500
                     focus:border-transparent transition-all duration-300"
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={containerVariants}
          >
            <motion.button
              onClick={() => setCategory("all")}
              className={`filter-button ${category === "all" ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('projects.search.filters.all')}
            </motion.button>
            {Object.entries(t('projects.search.filters') as Record<string, string>).map(([key, value]) => {
              if (key === 'all') return null;
              
              const filterValue = value;
              
              return (
              <motion.button
                key={key}
                onClick={() => setCategory(key as ProjectCategory)}
                className={`filter-button ${category === key ? "active" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterValue}
              </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Projects Section */}
      <motion.section variants={itemVariants}>
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          {t('projects.sections.featured')}
        </h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <Suspense key={project.name} fallback={
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            }>
              <ProjectCard key={project.name} project={project} index={index} />
            </Suspense>
          ))}
        </motion.div>
      </motion.section>

      {/* GitHub Repositories Section - Dynamically loaded */}
      <Suspense fallback={
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            GitHub Repositories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      }>
        <GithubReposList repos={repos} filter={filter} />
      </Suspense>
    </motion.div>
  )
}