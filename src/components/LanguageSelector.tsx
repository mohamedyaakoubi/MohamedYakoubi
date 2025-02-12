"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { languages, type Language } from '@/types/language'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  currentLang: Language
  onChange: (lang: Language) => void
}

export function LanguageSelector({ currentLang, onChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLanguage = languages.find(lang => lang.code === currentLang)
  const Flag = currentLanguage?.FlagComponent

  return (
    <div className="relative"> {/* Remove fixed positioning */}
      <motion.div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm 
                     px-4 py-2 rounded-full hover:bg-white/20 transition-colors
                     border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-4 h-4 text-gray-700 dark:text-white" />
          {Flag && <Flag className="w-5 h-5 ml-2" />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 
                         rounded-lg shadow-lg overflow-hidden min-w-[150px]"
            >
              {languages.map((lang) => {
                const LangFlag = lang.FlagComponent;
                return (
                  <motion.button
                    key={lang.code}
                    onClick={() => {
                      onChange(lang.code)
                      setIsOpen(false)
                    }}
                    className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 
                               dark:hover:bg-gray-700 transition-colors ${
                      currentLang === lang.code
                        ? 'bg-blue-50 dark:bg-gray-700'
                        : ''
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <LangFlag className="w-5 h-5 mr-3" />
                    <span className="text-gray-800 dark:text-white">
                      {lang.name}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}