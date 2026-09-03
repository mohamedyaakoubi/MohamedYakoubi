"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useTypewriter } from "@/hooks/useTypewriter"
import { useLanguage } from "@/context/language-context"
import { useTranslation } from "@/hooks/useTranslation"
import Image from "next/image"
import SocialButtons from '@/components/ui/SocialButtons'

type AnimatedContentProps = {
  typedText: string;
  t: (key: string) => string;
}

// Separate animated content into a client component (typewriter text only)
const AnimatedContent = ({ typedText, t }: AnimatedContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl md:text-2xl dark:text-gray-300 text-gray-700 mb-8 h-8 flex items-center justify-center">
        <span>{typedText}</span>
        <span className="animate-blink inline-block w-[1ch]" aria-hidden="true">|</span>
      </p>
    </motion.div>
  );
};

export function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [displayTheme, setDisplayTheme] = useState("light") // Add state for smooth transitions
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const phrases = t('hero.roles')
  const typedText = useTypewriter(phrases)

  // Handle theme transitions smoothly
  useEffect(() => {
    if (mounted && theme) {
      // Add delay for smooth transition
      const timer = setTimeout(() => {
        setDisplayTheme(theme)
      }, 50) // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer)
    }
  }, [theme, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Use displayTheme for smooth transitions
  const currentTheme = mounted ? displayTheme : "light"

  return (
    <>
      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background Elements with Next.js Image */}
        <div className="hero-background">
          {/* Light theme background */}
          <div className="absolute inset-0 dark:hidden transition-opacity duration-1000">
            <div className="absolute inset-0 overflow-hidden">
              <Image 
                src="/hero-light.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1600px"
                quality={55}
                className="object-cover fixed-bg"
              />
            </div>
            <div className="absolute inset-0 bg-white/15" />
          </div>

          {/* Dark theme background */}
          <div className="absolute inset-0 hidden dark:block transition-opacity duration-1000">
            <div className="absolute inset-0 overflow-hidden">
              <Image 
                src="/hero-dark.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1600px"
                quality={55}
                className="object-cover fixed-bg"
              />
            </div>
            <div className="absolute inset-0 bg-black/15" />
          </div>
        </div>

        {/* Content - Optimize for LCP */}
        <div className="relative z-20 text-center px-6">
          <div className="max-w-4xl mx-auto">
            {/* Static content rendered immediately for fast LCP */}
            <div id="hero-headline" className="mb-4 text-center" data-testid="main-heading">
              <p className="block text-2xl md:text-3xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t('hero.greeting')}
              </p>
                  
      {/* Name - rendered immediately without animations */}
<h1
  className="gradient-name block text-4xl md:text-6xl font-bold mb-4"
  style={{
    fontWeight: 700,
  }}
>
  {language === 'ar'
    ? 'محمد يعقوبي'
    : language === 'fr'
    ? 'Yaakoubi Mohamed'
    : 'Mohamed Yaakoubi'}
</h1>

<p className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
  {t('hero.tagline')}
</p>
            </div>

            {/* Social buttons - rendered unconditionally for SEO crawlability */}
            <Suspense fallback={
              <div className="flex flex-wrap justify-center gap-4 mb-12 h-14 animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 w-32 h-12 rounded-full"></div>
              </div>
            }>
              <SocialButtons t={t} language={language} />
            </Suspense>

            {/* Typewriter animation - client-only, no SEO value */}
            {mounted && (
              <Suspense fallback={<div className="h-8 mb-8"></div>}>
                <AnimatedContent 
                  typedText={typedText}
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