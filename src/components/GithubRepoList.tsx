"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from "react-icons/fa"
import type { Repository } from "../../utils/github"
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'

interface ProjectLinkProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const ProjectLink = ({ href, icon: Icon, label }: ProjectLinkProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="mr-1" />
    {label}
  </motion.a>
)

interface GithubReposListProps {
  repos: Repository[]
  filter: string
}

export default function GithubReposList({ repos, filter }: GithubReposListProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const getTranslatedLanguage = (language: string | null, t: (key: string) => string) => {
    if (!language) return null;
    const translationKey = `projects.repository.languages.${language}`;
    const translation = t(translationKey);
    return translation === translationKey ? language : translation;
  };

  const filteredRepos = repos.filter((repo) => {
    if (filter === "all") return true;
    return repo.language?.toLowerCase() === filter.toLowerCase();
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
    <motion.section variants={itemVariants}>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {t('projects.sections.github')}
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {filteredRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
                      shadow-md hover:shadow-xl transition-all duration-500 
                      transform hover:-translate-y-1"
          >
            {repo.homepage && (
              <div className="group relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={`/projects/${repo.name}.PNG`}
                  alt={repo.name}
                  fill
                  className="object-cover object-top transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {repo.name}
                </h3>
                {repo.private && (
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {t('projects.repository.status.private')}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                {repo.description || t('projects.repository.noDescription')}
              </p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4">
                {repo.language && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 bg-${repo.language.toLowerCase()}`} />
                    {getTranslatedLanguage(repo.language, t)}
                  </span>
                )}
                <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FaStar className="mx-1 text-yellow-500" />
                  {repo.stargazers_count}
                </span>
                {repo.forks_count > 0 && (
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaCodeBranch className="mx-1" />
                    {repo.forks_count}
                  </span>
                )}
              </div>
              <div className={`flex ${language === 'ar' ? 'space-x-reverse' : 'space-x-4'} mt-4`}>
                <ProjectLink
                  href={repo.html_url}
                  icon={FaGithub}
                  label={t('projects.repository.links.viewSource')}
                />
                {repo.homepage && (
                  <ProjectLink
                    href={repo.homepage}
                    icon={FaExternalLinkAlt}
                    label={t('projects.repository.links.liveDemo')}
                  />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}