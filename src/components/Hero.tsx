"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa"
import { useTheme } from "next-themes"
import { useTypewriter } from "@/hooks/useTypewriter"
import { SiUpwork } from "react-icons/si"
import type { Language } from "@/types/language"
import { useLanguage } from "@/context/language-context"
import { useTranslation } from "@/hooks/useTranslation"
import Image from "next/image"
import { Suspense } from "react"

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
        
        {/* Social buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* GitHub button */}
          <motion.a
            href={t('social.links.github')}
            target="_blank"
            rel="noopener noreferrer me"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 dark:text-white text-gray-900"
          >
            <FaGithub className="w-5 h-5" />
            <span>{t('hero.cta.github')}</span>
          </motion.a>

          {/* LinkedIn button */}
          <motion.a
            href="https://www.linkedin.com/in/yaakoubi-mohamed/"
            target="_blank"
            rel="noopener noreferrer me"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0A66C2] px-6 py-3 rounded-full hover:bg-[#004182] transition-colors flex items-center gap-2 text-white"
          >
            <FaLinkedin className="w-5 h-5" />
            <span>{t('social.linkedin')}</span>
          </motion.a>

          {/* Other buttons */}
          <motion.a
            href="https://www.upwork.com/freelancers/~0118c281163fef05cb?mp_source=share"
            target="_blank"
            rel="noopener noreferrer me"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#6fda44] px-6 py-3 rounded-full hover:bg-[#5cb536] transition-colors flex items-center gap-2 text-white"
          >
            <SiUpwork className="w-5 h-5" />
            <span>{t('hero.cta.upwork')}</span>
          </motion.a>

          <motion.a
            href="/Mohamed_Yaakoubi.pdf"
            target="_blank"
            rel="noopener noreferrer me"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 text-white"
          >
            <FaFileDownload className="w-5 h-5" />
            <span>{t('hero.cta.downloadCV')}</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation(language)
  const phrases = t('hero.roles')
  const typedText = useTypewriter(phrases)

  // Eagerly load critical content
  useEffect(() => {
    setMounted(true)
    
    // Preload the background images - fix TypeScript errors
    const lightImage = new window.Image();
    lightImage.src = '/hero-light.webp';
    
    const darkImage = new window.Image();
    darkImage.src = '/hero-dark.webp';
    
    // Preload your CV file
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/Mohamed_Yaakoubi.pdf';
    document.head.appendChild(link);
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

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
                alt=""
                fill
                priority={true}
                sizes="100vw"
                quality={80}
                className="object-cover fixed-bg"
                fetchPriority="high"
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
                  alt=""
                  fill
                  priority={false}
                  sizes="100vw"
                  quality={75}
                  loading="lazy"
                  className="object-cover fixed-bg"
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
            <h1 id="hero-headline" className="mb-4 text-center">
              <span className="block text-2xl md:text-3xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t('hero.greeting')}
              </span>
              
              {/* Name - rendered immediately without animations */}
              <span 
                className="gradient-name block text-4xl md:text-6xl font-bold mb-4"
                style={{
                  fontWeight: 700,
                }}
              >
                {language === 'ar' ? 'محمد يعقوبي' : 'Mohamed Yaakoubi'}
              </span>
              
              <span className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
                {t('hero.tagline')}
              </span>
            </h1>

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
                handleScroll(e as any);
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