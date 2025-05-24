"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaHome, FaCode, FaLightbulb } from 'react-icons/fa'
import type { TerminalLine } from '@/types/terminal'
import { Terminal } from './Terminal'

export default function AnimatedNotFound() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Mohamed\'s Portfolio Terminal v2.0.1' },
    { type: 'output', content: 'ERROR 404: Page not found in current directory' },
    { type: 'output', content: 'Type "help" for available commands' },
  ])
  const [isSystemDestroyed, setIsSystemDestroyed] = useState(false)
  const [deletionStage, setDeletionStage] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Hide elements based on deletion stage
  const shouldHideNavigation = deletionStage >= 2
  const shouldHideChat = deletionStage >= 3
  const shouldHideThemeToggle = deletionStage >= 4
  const shouldHideFooter = deletionStage >= 5
  const shouldCorrupt404 = deletionStage >= 2

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-20">
      {/* Hide navigation */}
      {shouldHideNavigation && (
        <style jsx global>{`
          header { display: none !important; }
        `}</style>
      )}
      
      {/* Hide chat */}
      {shouldHideChat && (
        <style jsx global>{`
          .fixed.bottom-6.right-6 { display: none !important; }
        `}</style>
      )}
      
      {/* Hide theme toggle */}
      {shouldHideThemeToggle && (
        <style jsx global>{`
          .fixed.top-20.right-6 { display: none !important; }
        `}</style>
      )}
      
      {/* Hide footer */}
      {shouldHideFooter && (
        <style jsx global>{`
          footer { display: none !important; }
        `}</style>
      )}

      <div className="max-w-4xl mx-auto">
        {/* 404 Number - corrupts when fonts are deleted */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className={`text-6xl md:text-8xl font-bold leading-none mb-4 ${
            shouldCorrupt404 
              ? 'font-mono text-gray-500' 
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'
          }`}>
            {shouldCorrupt404 ? '4□4' : '404'}
          </h1>
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
            shouldCorrupt404 
              ? 'font-mono text-gray-600' 
              : 'text-gray-800 dark:text-white'
          }`}>
            {shouldCorrupt404 ? 'P□ge N□t F□□nd' : 'Page Not Found'}
          </h2>
          <p className={`mb-6 ${
            shouldCorrupt404 
              ? 'font-mono text-gray-500' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>
            {shouldCorrupt404 ? '' : 'But hey, try the interactive terminal below!'}
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Terminal
            terminalLines={terminalLines}
            setTerminalLines={setTerminalLines}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            isSystemDestroyed={isSystemDestroyed}
            setIsSystemDestroyed={setIsSystemDestroyed}
            setDeletionStage={setDeletionStage}
          />
        </motion.div>

        {/* Action Buttons */}
        {!shouldHideFooter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>
            
            <Link 
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <FaCode className="mr-2" />
              View Projects
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <FaLightbulb className="mr-2" />
              Get in Touch
            </Link>
          </motion.div>
        )}

        {/* Footer tip */}
        {!shouldHideFooter && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
          >
            Pro tip: Try typing "help", "joke", "cd ..", "history" or "cat bio" in the terminal above! Use ↑/↓ arrows for command history.
          </motion.p>
        )}
      </div>
    </div>
  )
}