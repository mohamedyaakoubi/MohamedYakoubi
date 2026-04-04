'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { getInternationalSkillsI18n } from '@/data/internationalskills-i18n'
import {
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  UserCheck,
  LayoutDashboard,
  Brain,
  CalendarCheck,
  TableProperties,
  BarChart3,
  LogIn,
  Cpu,
  Video,
  ShieldCheck,
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const featureIcons = [UserCheck, LayoutDashboard, Brain, CalendarCheck, TableProperties, BarChart3]
const stepIcons = [LogIn, Cpu, Video]

export default function InternationalSkillsClient() {
  const { language } = useLanguage()
  const t = getInternationalSkillsI18n(language)
  const isRTL = language === 'ar'

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── HERO ──────────────────────────────────────────────────── */}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                🤖 {t.heroBadge}
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
                    href="https://candidate-git-latest-mohamedyaakoubis-projects.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.demoBtn}
                  </a>
                </motion.div>
              </div>

              <motion.div
                variants={fadeIn}
                className="w-full md:w-72 h-44 relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 dark:ring-white/10 flex-shrink-0"
              >
                <Image
                  src="/projects/international-skills-labor-company.webp"
                  alt="InternationalSkills.fi recruiting management system screenshot"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
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
                    <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
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
                const Icon = stepIcons[i]
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                  >
                    <div className="mb-4 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="absolute top-4 end-4 text-3xl font-black text-blue-100 dark:text-blue-900/60 select-none">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────── */}
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
                  <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-3">
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

      {/* ── SECURITY ──────────────────────────────────────────────── */}
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
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
                  <ChevronRight className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0 rtl:rotate-180" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTEXT ───────────────────────────────────────────────── */}
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
                href="https://candidate-git-latest-mohamedyaakoubis-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {t.demoBtn}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
