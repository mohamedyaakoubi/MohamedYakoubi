"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa"
import { useTheme } from "next-themes"
import { useTypewriter } from "@/hooks/useTypewriter"


const phrases = ["Emerging AI Specialist", "Web Developer", "Localization Expert", "Continuous Learner"]

export function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const typedText = useTypewriter(phrases)

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
        <div className="absolute inset-0 transition-opacity duration-1000">
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

        // Find the Content section and update the h1 and surrounding elements

{/* Content */}
<div className="relative z-10 text-center px-6">
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
        Hello, I'm
      </span>
      <span className="block text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Mohamed Yaakoubi
      </span>
      <span className="block text-4xl md:text-6xl font-bold dark:text-white text-gray-900">
        Taking You to
        <br />
        Greater Heights
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
                <motion.a
                  href="https://github.com/mohamedyaakoubi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 dark:text-white text-gray-900"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/yaakoubi-mohamed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 dark:text-white text-gray-900"
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </motion.a>
                <motion.a
                  href="/Mohamed_Yaakoubi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 text-white"
                >
                  <FaFileDownload className="w-5 h-5" />
                  <span>Download CV</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 dark:text-white text-gray-900 cursor-pointer"
          onClick={handleScroll}
        >
          <svg className="w-6 h-6" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>
    </>
  )
}