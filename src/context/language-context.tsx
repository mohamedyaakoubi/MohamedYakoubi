"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Language } from '@/types/language'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    if (language) {
      localStorage.setItem('language', language)
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = language
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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