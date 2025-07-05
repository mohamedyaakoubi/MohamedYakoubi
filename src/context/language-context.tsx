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
    // For SSG, use the initial language from props first
    if (initialLanguage && ['en', 'fr', 'ar'].includes(initialLanguage)) {
      return initialLanguage as Language
    }
    
    // Fallback to localStorage only on client side
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    // Set initial language from props if provided
    if (initialLanguage && ['en', 'fr', 'ar'].includes(initialLanguage)) {
      setLanguage(initialLanguage as Language)
    }
  }, [initialLanguage])

  useEffect(() => {
    if (language) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language)
      }
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = language
    }
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    
    // For SSG, we need to navigate to the correct locale URL
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const currentLocale = currentPath.split('/')[1]
      
      // Remove current locale from path if it exists
      let newPath = currentPath
      if (['en', 'fr', 'ar'].includes(currentLocale)) {
        newPath = currentPath.substring(currentLocale.length + 1) || '/'
      }
      
      // Add new locale to path (except for English which is default)
      const targetPath = lang === 'en' ? newPath : `/${lang}${newPath}`
      
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

