"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useTypewriter } from "@/hooks/useTypewriter"
import { useLanguage } from "@/context/language-context"
import { useTranslation } from "@/hooks/useTranslation"
import Image from "next/image"
import dynamic from 'next/dynamic'

// Types for Navigator.connection
interface NetworkInformation {
  saveData: boolean
  // Add other properties if needed
}

// Dynamically import SocialButtons to reduce initial JS bundle
const SocialButtons = dynamic(
  () => import('@/components/ui/SocialButtons'),
  {
    loading: () => (
      <div className="flex flex-wrap justify-center gap-4 mb-12 h-14 animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
        <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
        <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
      </div>
    ),
    ssr: false
  }
)

type AnimatedContentProps = {
  typedText: string;
  language: string;
  t: (key: string) => string;
}

// Separate animated content into a client component
const AnimatedContent = ({ typedText, language, t }: AnimatedContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl dark:text-gray-300 text-gray-700 mb-8 h-8">
          {typedText}
          <span className="animate-blink">|</span>
        </h2>
        
        {/* Replace the social buttons with the imported component */}
        <Suspense fallback={
          <div className="flex flex-wrap justify-center gap-4 mb-12 h-14 animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
            <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
          </div>
        }>
          <SocialButtons t={t} language={language} />
        </Suspense>
      </motion.div>
    </motion.div>
  );
};

export function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const phrases = t('hero.roles')
  const typedText = useTypewriter(phrases)

  // Eagerly load critical content
  useEffect(() => {
    setMounted(true)
    
    // Preload the background images with low priority
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as Window).requestIdleCallback(() => {
        const darkImage = new window.Image();
        darkImage.src = '/hero-dark.webp';
        // Use a standard property instead of a non-standard attribute
        darkImage.loading = 'lazy';
      });
    }
    
    // Prefetch CV with low priority during idle time
    // Type-safe check for navigator.connection
    if (typeof navigator !== 'undefined' && 
      'connection' in navigator && 
      (!navigator.connection?.saveData)) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = '/Mohamed_Yaakoubi.pdf';
    // Standard attributes only
    document.head.appendChild(link);
  }
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Show light theme content during initial render
  const currentTheme = mounted ? theme : "light"

  return (
    <>
      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
     {/* Background Elements with Next.js Image */}
     <div className="hero-background">
          {/* Light theme background - high priority */}
          <div
            className="absolute inset-0"
            style={{
              opacity: currentTheme === "light" ? 1 : 0,
              transition: "opacity 1000ms ease"
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image 
                src="/hero-light.webp"
                alt="hero-light-background"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                quality={75}
                className="object-cover fixed-bg"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='8' height='5' fill='%23f8f8f8' filter='url(%23b)'/%3E%3C/svg%3E"
              />
            </div>
            <div className="absolute inset-0 bg-white/15" />
          </div>

          {/* Dark theme background - lower priority */}
          {mounted && (
            <div
              className="absolute inset-0"
              style={{
                opacity: currentTheme === "dark" ? 1 : 0,
                transition: "opacity 1000ms ease"
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image 
                  src="/hero-dark.webp"
                  alt="hero-dark-background"
                  fill
                  priority={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  quality={65}
                  loading="lazy"
                  className="object-cover fixed-bg"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='8' height='5' fill='%23171717' filter='url(%23b)'/%3E%3C/svg%3E"
                />
              </div>
              <div className="absolute inset-0 bg-black/15" />
            </div>
          )}
        </div>

        {/* Content - Optimize for LCP */}
        <div className="relative z-20 text-center px-6">
          <div className="max-w-4xl mx-auto">
            {/* Static content rendered immediately for fast LCP */}
            <div id="hero-headline" className="mb-4 text-center" data-testid="main-heading">
              <h2 className="block text-2xl md:text-3xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t('hero.greeting')}
              </h2>
                  
              {/* Name - rendered immediately without animations */}
              <h3 
                className="gradient-name block text-4xl md:text-6xl font-bold mb-4"
                style={{
                  fontWeight: 700,
                }}
              >
                {language === 'ar' ? 'محمد يعقوبي' : 'Mohamed Yaakoubi'}
              </h3>
                  
              <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
                {t('hero.tagline')}
              </h2>
            </div>

            {/* Animated elements render after critical content loads */}
            {mounted && (
              <Suspense fallback={<div className="h-20"></div>}>
                <AnimatedContent 
                  typedText={typedText}
                  language={language}
                  t={t}
                />
              </Suspense>
            )}
          </div>
        </div>
        
        {/* Scroll Indicator Arrow */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, 8, 0] 
            }}
            transition={{ 
              delay: 1.5,
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            onClick={handleScroll}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
            aria-label={t('hero.scrollToAbout')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleScroll(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              className="dark:text-white text-gray-900"
              aria-hidden="true"
            >
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 13l5 5 5-5M7 7l5 5 5-5"
              />
            </svg>
          </motion.div>
        )}
      </section>
    </>
  )
}