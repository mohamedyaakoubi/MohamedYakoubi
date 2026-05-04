'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Scale } from 'lucide-react'
import { useLanguage } from '@/context/language-context'
import { getPortfolioLegalI18n } from '@/data/portfolio-legal-i18n'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

export default function PortfolioTermsClient() {
  const { language } = useLanguage()
  const tos = getPortfolioLegalI18n(language).terms

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'page_view', {
        page_title: 'Terms of Service',
        page_location: window.location.href,
      })
    }
  }, [])

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <section className="relative pt-24 pb-12 overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl -z-10" />

        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-4"
          >
            <motion.div
              variants={fadeIn}
              className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4"
            >
              <Scale className="w-6 h-6" />
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight">
              {tos.title}
            </motion.h1>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span>{tos.subtitle}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>{tos.lastUpdated}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={fadeIn}>
            {tos.sections.map((section, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8 last:border-0 last:mb-0">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {section.heading}
                </h2>
                <div
                  className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:dark:text-gray-100 [&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <Link
            href={`/${language}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tos.backTo}
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
