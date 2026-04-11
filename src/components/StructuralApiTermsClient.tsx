'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scale } from 'lucide-react'
import { useLanguage } from '@/context/language-context'
import { getStructuralApiI18n } from '@/data/structural-api-i18n'
import { analytics } from '@/lib/analytics'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

export default function StructuralApiTermsClient() {
  const { language } = useLanguage()
  const tos = getStructuralApiI18n(language).terms
  const isRtl = language === 'ar'

  useEffect(() => {
    analytics.structuralApiPageView('terms')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-500/30"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <section className="relative pt-24 pb-12 overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-gradient-to-bl from-indigo-500/10 to-transparent blur-3xl -z-10" />
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.div
              variants={fadeIn}
              className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4"
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
              <span>{tos.productLine}</span>
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
          className="space-y-12 text-[15px] leading-relaxed"
        >
          <motion.div
            variants={fadeIn}
            className="[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:text-gray-700 [&_ul]:dark:text-gray-300 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:dark:text-gray-100 [&_a]:text-indigo-600 [&_a]:dark:text-indigo-400 [&_a]:underline [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:font-mono"
          >
            {language === 'en' ? (
              <>
                <h2>1. Acceptance</h2>
                <p>
                  By accessing or using the Structural Diff API, you agree to be bound by these Terms of Service. If you
                  use the API on behalf of an organization, you represent that you have authority to bind that
                  organization to these terms.
                </p>

                <h2>2. API Access and License</h2>
                <p>
                  Use of the API requires a valid authentication key issued by Mohamed Yaakoubi. Subject to these terms,
                  you are granted a limited, non-exclusive, non-transferable right to access and use the API within your
                  own systems.
                </p>

                <h2>3. Permitted Use</h2>
                <p>You may use the API to:</p>
                <ul>
                  <li>Compare transcripts, subtitles, or spreadsheet rows within your own workflows.</li>
                  <li>Localization QA, transcription QA, and data annotation tasks.</li>
                  <li>
                    Integrate into your own internal tools or pipelines, provided you do not re-surface API access rights
                    to others and do not embed or operate the API from Google Sheets, Google Apps Script, or
                    spreadsheet-bound automations.
                  </li>
                  <li>
                    For Google Sheets usage, you must use the official SheetDiff Google Workspace Marketplace add-on,
                    not direct API access.
                  </li>
                </ul>

                <h2>4. Prohibited Use</h2>
                <p>You may not:</p>
                <ul>
                  <li>Resell, sublicense, or redistribute API access to third parties.</li>
                  <li>Use the API to build a competing service offering substantially similar functionality.</li>
                  <li>Use the API directly from Google Sheets, Google Apps Script, or custom spreadsheet add-ons/connectors.</li>
                  <li>Share or disclose your API key to unauthorized individuals.</li>
                  <li>Attempt to bypass authentication or rate-limiting mechanisms.</li>
                  <li>Reverse-engineer, disassemble, or otherwise attempt to derive the engine&apos;s source code.</li>
                  <li>Send payloads for the purpose of unauthorized load testing or service attack.</li>
                </ul>

                <h2>5. API Keys</h2>
                <p>
                  Each key is provisioned for a single user or organization. Do not share your key. If you believe your
                  key has been compromised, report it immediately for revocation. One key per entity is permitted without
                  prior written agreement.
                </p>

                <h2>6. Rate Limits and Quotas</h2>
                <p>
                  Tier 0 (trial/free) is limited to <strong>10 requests per minute</strong> (1-minute window) and{' '}
                  <strong>60 requests per 15 minutes</strong>. Higher tiers are provisioned individually. Repeatedly
                  exceeding limits may result in key suspension.
                </p>

                <h2>7. Service Availability</h2>
                <p>
                  The API is provided &ldquo;as is&rdquo; without any guarantee of uptime. We may modify, suspend, or
                  discontinue the service at any time, with reasonable notice where practicable.
                </p>

                <h2>8. Intellectual Property</h2>
                <p>
                  The diff engine, API design, documentation, and all associated software components are the intellectual
                  property of Mohamed Yaakoubi. These Terms grant you no ownership rights in anything related to the
                  API.
                </p>

                <h2>9. Disclaimer of Warranties</h2>
                <p>
                  THE API IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by applicable law, Mohamed Yaakoubi shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages arising from your use of or inability
                  to use the API.
                </p>

                <h2>11. Termination</h2>
                <p>
                  We reserve the right to revoke your API key and terminate your access at any time for violation of
                  these Terms, service abuse, or fraudulent activity.
                </p>

                <h2>12. Changes to These Terms</h2>
                <p>
                  We may update these Terms. The &ldquo;Last updated&rdquo; date will be revised accordingly. Continued
                  use after notification constitutes acceptance of the revised terms.
                </p>

                <h2>13. Governing Law</h2>
                <p>
                  These Terms are governed by the applicable laws of the Republic of Tunisia, without regard to conflict
                  of law principles.
                </p>

                <h2>14. Contact</h2>
                <p>
                  For any questions regarding these Terms, reach out via{' '}
                  <a href="https://www.mohamedyaakoubi.com/contact">mohamedyaakoubi.com/contact</a>.
                </p>
              </>
            ) : (
              tos.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && <h2>{section.heading}</h2>}
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              ))
            )}
          </motion.div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <Link
            href={`/${language}/sheetdiff/api-docs`}
            className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {tos.backTo}
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
