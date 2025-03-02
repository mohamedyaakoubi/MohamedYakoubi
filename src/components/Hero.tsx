"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa"
import { useTheme } from "next-themes"
import { useTypewriter } from "@/hooks/useTypewriter"
import { SiUpwork } from "react-icons/si"  // Add this import
import type { Language } from "@/types/language"
import { useLanguage } from "@/context/language-context"
import { useTranslation } from "@/hooks/useTranslation"




const phrases = ["Emerging AI Specialist", "Web Developer", "Localization Expert", "Continuous Learner"]

export function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation(language)
  const phrases = t('hero.roles')
  const typedText = useTypewriter(phrases)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }
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

  // Show light theme content during initial render
  const currentTheme = mounted ? theme : "light"

  return (
    <>
 
      {/* Home Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="hero-background">
        {/* Light theme background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-light.jpg-wzxoumtgBbXiRKjNYxMdak9ZFenr3p.jpeg")',
              opacity: currentTheme === "light" ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 bg-white/50" />
          </div>

          {/* Dark theme background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-dark.jpg-OyPCbiNXVPCGYlGZkEpO12lCUk2Ixu.jpeg")',
              opacity: currentTheme === "dark" ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>

        

{/* Content */}
<div className="relative z-20 text-center px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-4"
            >
              <span className="block text-2xl md:text-3xl font-medium mb-2 text-gray-700 dark:text-gray-300">
        {t('hero.greeting')}
       
     
<span className="block text-4xl md:text-6xl font-bold mb-4">
<div className="name-container">
  <motion.span 
    className="name-text-wrapper"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
  >
    <span className="gradient-name">
      {language === 'ar' ? 'محمد يعقوبي' : 'Mohamed Yaakoubi'}
    </span>
  </motion.span>
</div>
</span>
        {t('hero.tagline')}
      </span>
            </motion.h1>

    {/* Rest of your existing content... */}

            <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.7 }}
      >
          <h2 className="text-xl md:text-2xl dark:text-gray-300 text-gray-700 mb-8 h-8">
        {typedText}
        <span className="animate-blink">|</span>
      </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
  {/* GitHub button */}
<motion.a
  href={t('social.links.github')}
  target="_blank"
  rel="noopener noreferrer"
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
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-[#0A66C2] px-6 py-3 rounded-full hover:bg-[#004182] transition-colors flex items-center gap-2 text-white"
>
  <FaLinkedin className="w-5 h-5" />
  <span>{t('social.linkedin')}</span>
</motion.a>

{/* Upwork button */}
<motion.a
  href="https://www.upwork.com/freelancers/~0118c281163fef05cb?mp_source=share"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-[#6fda44] px-6 py-3 rounded-full hover:bg-[#5cb536] transition-colors flex items-center gap-2 text-white"
>
  <SiUpwork className="w-5 h-5" />
  <span>{t('hero.cta.upwork')}</span>
</motion.a>

{/* CV download button */}
<motion.a
  href="/Mohamed_Yaakoubi.pdf"
  target="_blank"
  rel="noopener noreferrer"
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
        </div>
{/* Scroll Indicator Arrow */}
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
>
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 24 24" 
    className="dark:text-white text-gray-900"
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

</section>
    </>
  )
}
