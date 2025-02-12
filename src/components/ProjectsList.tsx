"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa"
import type { Repository } from "../../utils/github"
import { ProjectCard } from "./ProjectCard"
import { featuredProjects } from "@/data/project"
import type { ProjectCategory } from "@/types/project"

interface ProjectsListProps {
  initialRepos: Repository[]
}

export default function ProjectsList({ initialRepos }: ProjectsListProps) {
  const [repos, setRepos] = useState(initialRepos)
  const [filter, setFilter] = useState("all")
  const [category, setCategory] = useState<ProjectCategory | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  const filteredRepos = repos.filter((repo) => {
    if (filter === "all") return true
    return repo.language?.toLowerCase() === filter.toLowerCase()
  })

  const languages = Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)))

  const filteredProjects = featuredProjects.filter((project) => {
    if (category === "all") return true
    return project.category === category
  }).filter((project) => {
    return project.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Search and Filter */}
<div className="mb-8 space-y-4">
  <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
    <input
      type="text"
      placeholder="Search projects..."
      className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-200 
                 dark:border-gray-700 bg-white dark:bg-gray-800 
                 text-gray-800 dark:text-white"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="flex flex-wrap gap-2">
      {["all", "AI/ML", "Web Development", "Healthcare", "Tools"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat as ProjectCategory)}
          className={`px-3 py-1 text-xs md:text-sm rounded-full transition-colors ${
            category === cat
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
</div>

      {/* Featured Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>

    

{/* GitHub Repositories */}
<div>
  <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">GitHub Repositories</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredRepos.map((repo, index) => (
      <motion.div
        key={repo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {repo.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {repo.description || 'No description available'}
          </p>
          <div className="flex items-center space-x-4">
            {repo.language && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {repo.language}
              </span>
            )}
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FaStar className="mr-1 text-yellow-500" />
              {repo.stargazers_count}
            </span>
          </div>
          <div className="flex space-x-3 pt-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors flex items-center space-x-2"
            >
              <FaGithub size={16} />
              <span>View Source</span>
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors flex items-center space-x-2"
              >
                <FaExternalLinkAlt size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
    </div>
  )
}