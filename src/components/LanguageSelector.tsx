"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { languages, type Language } from '@/types/language'
import { Globe } from 'lucide-react'
import { useMenu } from '@/context/useMenu'

interface LanguageSelectorProps {
  currentLang: Language
  onChange: (lang: Language) => void
}

export function LanguageSelector({ currentLang, onChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMenuOpen } = useMenu()
  const currentLanguage = languages.find(lang => lang.code === currentLang)
  const Flag = currentLanguage?.FlagComponent
  
  // RTL support
  const isRTL = currentLang === 'ar'
  
  // Get current language name for the aria-label
  const currentLangName = currentLanguage?.name || 'Language'
  
  // Close language dropdown when mobile menu opens
  useEffect(() => {
    if (isMenuOpen) {
      setIsOpen(false)
    }
  }, [isMenuOpen])

  const handleToggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const handleLanguageSelect = (lang: Language) => {
    onChange(lang)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${isMenuOpen ? 'hidden md:block' : 'block'}`}>
      <motion.div className="relative">
        <motion.button
          onClick={handleToggleDropdown}
          className={`flex items-center bg-white/10 backdrop-blur-sm 
                     px-4 py-2 rounded-full hover:bg-white/20 transition-colors
                     border border-gray-200 dark:border-gray-700 ${
                       isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'
                     }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Select language, current language: ${currentLangName}`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Globe className="w-4 h-4 text-gray-700 dark:text-white" />
          {Flag && <Flag className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 bg-white dark:bg-gray-800 
                         rounded-lg shadow-lg overflow-hidden min-w-[150px] z-50
                         left-0"
              role="listbox"
              aria-label="Select language"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <ul className="py-1">
                {languages.map(lang => (
                  <motion.li 
                    key={lang.code}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                    className={`px-4 py-2 cursor-pointer flex items-center ${
                      isRTL ? 'flex-row-reverse gap-2' : 'gap-2'
                    }`}
                    onClick={() => handleLanguageSelect(lang.code)}
                    role="option"
                    aria-selected={currentLang === lang.code}
                  >
                    {lang.FlagComponent && <lang.FlagComponent className="w-5 h-5" />}
                    <span className={`${currentLang === lang.code ? 'font-semibold' : ''} 
                                    dark:text-white text-gray-800`}>
                      {lang.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}