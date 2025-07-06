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

// Import your existing Chat component as client-side only
const Chat = dynamic(() => import('./Chat'), { 
  ssr: false,
  loading: () => null
})

const Analytics = dynamic(() => import('./Analytics'), {
  ssr: false,
  loading: () => null
})

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
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
  }, [])

  // Always render the same structure to avoid hydration mismatch
  return (
    <MenuProvider>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
        
        {/* Always render the container but conditionally show content */}
        <div className="fixed top-20 left-6 z-50 flex flex-col items-start gap-4">
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.3s' }}>
            <LanguageSelector currentLang={language} onChange={setLanguage} />
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Lazy-loaded non-critical UI elements */}
        {mounted && (
          <>
            <Suspense fallback={null}>
              <ScrollToTopButton />
            </Suspense>
            {/* Your existing Chat component will work here */}
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