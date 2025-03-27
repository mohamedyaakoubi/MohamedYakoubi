"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
                 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={t(`projects.names.${project.name}`)}
          fill
          className="object-cover transition-transform duration-700 
                   ease-in-out group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-white/20 text-white rounded-full
                           backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2
                     group-hover:text-blue-500 dark:group-hover:text-blue-400 
                     transition-colors duration-300">
          {t(`projects.names.${project.name}`)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {t(`projects.descriptions.${project.name}`)}
        </p>
        <div className={`flex ${language === 'ar' ? 'space-x-reverse' : 'space-x-4'}`}>
          {project.githubUrl && (
            <ProjectLink
              href={project.githubUrl}
              icon={FaGithub}
              label={t('projects.repository.links.viewSource')}
            />
          )}
          {project.demoUrl && (
            <ProjectLink
              href={project.demoUrl}
              icon={FaExternalLinkAlt}
              label={t('projects.repository.links.liveDemo')}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectLinkProps {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
}

function ProjectLink({ href, icon: Icon, label }: ProjectLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="mr-1" />
      {label}
    </motion.a>
  )
}

// Add this default export that re-exports the named export
export default { ProjectCard };