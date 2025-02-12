"use client"

import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import type { Project } from "@/types/project"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden group w-full"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 text-xs font-medium rounded-full 
                         bg-blue-500/20 text-white backdrop-blur-sm">
            {project.category}
          </span>
          <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full 
                         bg-gray-500/20 text-white backdrop-blur-sm">
            {project.status}
          </span>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {project.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {project.features.map((feature) => (
            <li 
              key={feature} 
              className="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 
                       text-gray-600 dark:text-gray-300 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-end gap-4 pt-4">
          {project.githubUrl && (
            <ProjectLink href={project.githubUrl} icon={FaGithub} label="View Source" />
          )}
          {project.demoUrl && (
            <ProjectLink href={project.demoUrl} icon={FaExternalLinkAlt} label="Live Demo" />
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 
                 hover:text-blue-500 transition-colors"
    >
      <Icon size={16} />
      <span>{label}</span>
    </motion.a>
  )
}