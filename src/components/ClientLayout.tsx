"use client"

import { useEffect, useState, Suspense } from 'react'
import { useLanguage } from '@/context/language-context'
import { MenuProvider } from '@/context/useMenu'
import { Navigation } from "./Navigation"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./LanguageSelector"
import { PageTransition } from "./PageTransition"
import dynamic from 'next/dynamic'

// Dynamically import non-critical components
const ScrollToTopButton = dynamic(() => import('./ui/ScrollToTopButton'), { ssr: false })
const Chat = dynamic(() => import('./Chat'), { 
  loading: () => null,
  ssr: false
})
// Import analytics component
const Analytics = dynamic(() => import('./Analytics'), {
  ssr: false
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { language, setLanguage } = useLanguage()
    const [mounted, setMounted] = useState(false)
  
    useEffect(() => {
      setMounted(true)
      
      // Register service worker
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
              console.log('ServiceWorker registration failed: ', error);
            });
        });
      }
    }, [])
  
    if (!mounted) {
      return null
    }
  
    return (
      <MenuProvider>
        <div className={language === 'ar' ? 'rtl' : 'ltr'}>
          <Navigation />
          <div className="fixed top-20 left-6 z-50 flex flex-col items-start gap-4">
            <LanguageSelector currentLang={language} onChange={setLanguage} />
            <ThemeToggle />
          </div>
          <PageTransition>{children}</PageTransition>
          
          {/* Lazy-loaded non-critical UI elements */}
          <Suspense fallback={null}>
            <Chat />
          </Suspense>
          <Suspense fallback={null}>
            <ScrollToTopButton />
          </Suspense>
          
          {/* Analytics */}
          <Analytics />
        </div>
      </MenuProvider>
    )
}