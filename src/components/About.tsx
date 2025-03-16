"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'

export function About() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              {t('about.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.description.first')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.description.second')}
            </p>
          </motion.div>
          
              {/* Image */}
              <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative w-80 h-80 mx-auto"
          >
            {/* Decorative Background Elements */}
            <div className="absolute -inset-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                        opacity-75 group-hover:opacity-100 blur-lg transition-all duration-500 
                        group-hover:blur-xl animate-tilt">
            </div>
            
            {/* Decorative Dots Pattern */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 
                        bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                        rounded-full blur-xl">
            </div>
            
            {/* Main Image Container */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden 
                        ring-4 ring-white dark:ring-gray-800 shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg"
                alt="Mohamed Yaakoubi"
                fill
                className="object-cover object-top transition-all duration-500 
                      group-hover:scale-110 group-hover:rotate-1"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t 
                          from-gray-900 via-gray-900/40 to-transparent 
                          opacity-0 group-hover:opacity-60 
                          transition-opacity duration-300 z-20">
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute -left-3 -top-3 w-20 h-20 
                        bg-blue-500/10 rounded-full blur-xl">
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}