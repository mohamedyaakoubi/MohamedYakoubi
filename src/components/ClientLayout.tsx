"use client"

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { Navigation } from "./Navigation"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./LanguageSelector"
import { PageTransition } from "./PageTransition"
import Chat from './Chat'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { language, setLanguage } = useLanguage()
    const [mounted, setMounted] = useState(false)
  
    useEffect(() => {
      setMounted(true)
    }, [])
  
    if (!mounted) {
      return null
    }
  
    return (
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        <Navigation />
        {/* Repositioned container for buttons */}
        <div className="fixed top-20 left-6 z-50 flex flex-col items-start gap-4">
          <LanguageSelector 
            currentLang={language} 
            onChange={setLanguage} 
          />
          <ThemeToggle />
        </div>
        <PageTransition>{children}</PageTransition>
        <Chat />
      </div>
    )
  }