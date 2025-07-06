"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Language } from '@/types/language'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
  initialLanguage?: string
}

export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Always use initialLanguage for SSG consistency
    if (initialLanguage && ['en', 'fr', 'ar'].includes(initialLanguage)) {
      return initialLanguage as Language
    }
    return 'en'
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Set initial language from props if provided
    if (initialLanguage && ['en', 'fr', 'ar'].includes(initialLanguage)) {
      setLanguage(initialLanguage as Language)
    }
  }, [initialLanguage])

  useEffect(() => {
    if (mounted && language) {
      // Only update DOM after component is mounted to avoid hydration mismatch
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language)
      }
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    
    // For SSG, we need to navigate to the correct locale URL
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const pathSegments = currentPath.split('/').filter(Boolean)
      
      // Remove current locale from path if it exists
      let newPath = ''
      if (['en', 'fr', 'ar'].includes(pathSegments[0])) {
        // Remove the locale and keep the rest of the path
        newPath = '/' + pathSegments.slice(1).join('/')
      } else {
        // No locale in current path, use as is
        newPath = currentPath
      }
      
      // Ensure we have a clean path
      if (newPath === '/' || newPath === '') {
        newPath = '/'
      }
      
      // Always add the locale prefix (including for English)
      const targetPath = `/${lang}${newPath === '/' ? '' : newPath}`
      
      // Navigate to new URL
      window.location.href = targetPath
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}