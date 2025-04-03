"use client"

import { useEffect, useState, Suspense } from 'react'
import { useLanguage } from '@/context/language-context'
import { MenuProvider } from '@/context/useMenu'
import { Navigation } from "./Navigation"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./LanguageSelector"
import { PageTransition } from "./PageTransition"
import dynamic from 'next/dynamic'
import { Footer } from "./Footer"

// Dynamically import non-critical components with lower priority
const ScrollToTopButton = dynamic(() => import('./ui/ScrollToTopButton'), { 
  ssr: false,
  loading: () => null
})

const Chat = dynamic(() => import('./Chat'), { 
  ssr: false,
  loading: () => null
})

const Analytics = dynamic(() => import('./Analytics'), {
  ssr: false,
  loading: () => null
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Use deferred mounting for non-critical UI
  useEffect(() => {
    // Use requestIdleCallback or setTimeout to defer non-critical work
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)
    
    // Register service worker only after initial render
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      window.addEventListener('load', () => {
        // Defer service worker registration
        setTimeout(() => {
          navigator.serviceWorker.register('/service-worker.js')
            .catch(error => {
              console.log('ServiceWorker registration failed: ', error);
            });
        }, 3000); // Delay service worker registration
      });
    }
    
    return () => clearTimeout(timer)
  }, [])

  // Render a minimal layout first for faster LCP
  return (
    <MenuProvider>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        <Navigation />
        {/* Render main content immediately */}
        <PageTransition>{children}</PageTransition>
        <Footer />
        {/* Defer rendering of non-critical UI elements */}
        {mounted && (
          <>
            <div className="fixed top-20 left-6 z-50 flex flex-col items-start gap-4">
              <LanguageSelector currentLang={language} onChange={setLanguage} />
              <ThemeToggle />
            </div>
            
            {/* Lazy-loaded non-critical UI elements */}
            <Suspense fallback={null}>
              <ScrollToTopButton />
            </Suspense>
            <Suspense fallback={null}>
              <Chat />
            </Suspense>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </>
        )}
      </div>
    </MenuProvider>
  )
}