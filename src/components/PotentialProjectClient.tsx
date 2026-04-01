'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { getPotentialI18n } from '@/data/potential-i18n'
import { ArrowLeft, ExternalLink, Github, ChevronRight, MessageSquare, Search, Sparkles, BarChart2, User } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function PotentialProjectClient() {
  const { language } = useLanguage()
  const t = getPotentialI18n(language)
  const isRTL = language === 'ar'

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* background blobs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl -z-10" />

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
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                {t.badge}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">
                🏆 {t.hackathonBadge}
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
                    href="https://potential-kegz.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.demoBtn}
                  </a>
                  <a
                    href="https://github.com/mohamedyaakoubi/potential"
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
                  src="/Potential.webp"
                  alt="Potential project screenshot"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DEMO VIDEO ───────────────────────────────────────────── */}
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
              <h2 className="text-2xl md:text-3xl font-bold">{t.videoTitle}</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t.videoDesc}</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 bg-black"
              style={{ paddingTop: '56.25%' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/ldz38xUGmHY?rel=0&modestbranding=1"
                title="Potential — demo walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PIPELINE DIAGRAM ─────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center">
              {t.diagramTitle}
            </motion.h2>

            {/* Diagram — horizontal scroll on small screens */}
            <motion.div variants={fadeIn} className="overflow-x-auto pb-2">
              <div className="flex rtl:flex-row-reverse items-center justify-start md:justify-center gap-0 min-w-max md:min-w-0 mx-auto">
                {t.diagramNodes.map((node, i) => {
                  const icons = [User, Sparkles, Search, MessageSquare, BarChart2]
                  const Icon = icons[i]
                  return (
                    <React.Fragment key={i}>
                      {/* Node */}
                      <div className="flex flex-col items-center gap-2 w-32 md:w-36 flex-shrink-0">
                        {/* icon above box */}
                        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        {/* box */}
                        <div className="w-full rounded-xl bg-blue-600 dark:bg-blue-700 text-white text-center px-2 py-4 shadow-md min-h-[72px] flex items-center justify-center">
                          <span className="text-xs font-medium leading-tight">{node.label}</span>
                        </div>
                        {/* tool name below */}
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">
                          {node.tool}
                        </span>
                      </div>

                      {/* Arrow between nodes — CSS handles flip for RTL */}
                      {i < t.diagramNodes.length - 1 && (
                        <div className="flex items-center self-start mt-[52px] mx-1 flex-shrink-0">
                          <div className="w-6 h-0.5 bg-gray-300 dark:bg-gray-600" />
                          <svg
                            className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500 -ml-0.5 rtl:rotate-180 rtl:-mr-0.5 rtl:ml-0"
                            viewBox="0 0 10 10"
                            fill="currentColor"
                          >
                            <polygon points="0,0 10,5 0,10" />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </motion.div>
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
              {t.steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                >
                  <span className="absolute -top-3 -start-3 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center">
              {t.capabilitiesTitle}
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {t.capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-md transition-shadow"
                >
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 rtl:rotate-180" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{cap.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
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
                  className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                >
                  <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
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
                href="https://potential-kegz.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t.demoBtn}
              </a>
              <a
                href="https://github.com/mohamedyaakoubi/potential"
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
