'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { getDocuMedI18n } from '@/data/documed-i18n'
import { ArrowLeft, ExternalLink, Github, ChevronRight, LogIn, CalendarCheck, ClipboardList, LayoutDashboard, Calendar, FileText, Building2, ShieldCheck, Maximize2, Minimize2 } from 'lucide-react'
import PdfSlideCarousel from '@/components/PdfSlideCarousel'

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const featureIcons = [LayoutDashboard, Calendar, FileText, Building2]

export default function DocuMedProjectClient() {
  const { language } = useLanguage()
  const t = getDocuMedI18n(language)
  const isRTL = language === 'ar'

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* background blobs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-6">
          {/* back link */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href={`/${language}/projects`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t.backToProjects}
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            {/* badges */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                {t.badge}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-medium">
                🏥 {t.bootcampBadge}
              </span>
            </motion.div>

            {/* title + image row */}
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <motion.h1
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold tracking-tight"
                >
                  {t.heroTitle}
                </motion.h1>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {t.heroDesc}
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://docu-med.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.demoBtn}
                  </a>
                  <a
                    href="https://github.com/mohamedyaakoubi/documed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {t.githubBtn}
                  </a>
                </motion.div>
              </div>

              <motion.div
                variants={fadeIn}
                className="w-full md:w-72 h-44 relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 dark:ring-white/10 flex-shrink-0"
              >
                <Image
                  src="/DocuMed.webp"
                  alt="DocuMed healthcare platform screenshot"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DOCUMENTATION SLIDES ────────────────────────────── */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeIn} className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">{t.docsTitle}</h2>
            </motion.div>
            <motion.div variants={fadeIn}>
              <PdfSlideCarousel
                slides={[
                  { src: '/projects/documed-slides/slide-1.png', alt: 'DocuMed cover — Connecting Doctors and Patients through Digital Records' },
                  { src: '/projects/documed-slides/slide-2.png', alt: 'DocuMed — Vision and Mission: hospital rules, online appointments, practice visibility' },
                  { src: '/projects/documed-slides/slide-3.png', alt: 'DocuMed — Transforming Healthcare: patient awareness, digital presence for doctors, streamlining medical records' },
                  { src: '/projects/documed-slides/slide-4.png', alt: 'DocuMed — Badges and subscription monetization features' },
                  { src: '/projects/documed-slides/slide-5.png', alt: 'DocuMed — Thank you slide' },
                ]}
                pdfUrl="/projects/documed.pdf"
                title="DocuMed"
                openLabel={t.pdfOpen}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">{t.featuresTitle}</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t.featuresSubtitle}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {t.features.map((feat, i) => {
                const Icon = featureIcons[i]
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-md transition-shadow"
                  >
                    <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{feat.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">{t.howTitle}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t.howSubtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.steps.map((step, i) => {
                const icons = [LogIn, CalendarCheck, ClipboardList]
                const Icon = icons[i]
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                  >
                    <div className="mb-4 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="absolute top-4 end-4 text-3xl font-black text-emerald-100 dark:text-emerald-900/60 select-none">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────── */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center">
              {t.techTitle}
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {t.techStack.map((group, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                >
                  <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium ring-1 ring-black/5 dark:ring-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECURITY ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.securityTitle}</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.securityItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="flex gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10"
                >
                  <ChevronRight className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0 rtl:rotate-180" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTEXT ──────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-4 text-center"
          >
            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold">
              {t.contextTitle}
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg"
            >
              {t.contextText}
            </motion.p>

            <motion.div variants={fadeIn} className="flex justify-center gap-4 pt-4">
              <a
                href="https://docu-med.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {t.demoBtn}
              </a>
              <a
                href="https://github.com/mohamedyaakoubi/documed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                {t.githubBtn}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
