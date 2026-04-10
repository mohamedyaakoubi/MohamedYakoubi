'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield } from 'lucide-react'
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

export default function StructuralApiPrivacyClient() {
  const { language } = useLanguage()
  const pvt = getStructuralApiI18n(language).privacy
  const isRtl = language === 'ar'

  useEffect(() => {
    analytics.structuralApiPageView('privacy')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-violet-500/30"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <section className="relative pt-24 pb-12 overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-gradient-to-bl from-violet-500/10 to-transparent blur-3xl -z-10" />
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.div
              variants={fadeIn}
              className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4"
            >
              <Shield className="w-6 h-6" />
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight">
              {pvt.title}
            </motion.h1>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span>{pvt.productLine}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>{pvt.lastUpdated}</span>
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
            className="[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:text-gray-700 [&_ul]:dark:text-gray-300 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:dark:text-gray-100 [&_a]:text-violet-600 [&_a]:dark:text-violet-400 [&_a]:underline [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:font-mono"
          >
            {language === 'en' ? (
              <>
                <h2>1. Overview</h2>
                <p>
                  The Structural Diff API (&ldquo;the API&rdquo;) is a self-hosted REST service developed by Mohamed
                  Yaakoubi that compares structured transcript and spreadsheet rows and generates detailed diff reports.
                  This Privacy Policy explains how the API processes and protects your data.
                </p>

                <h2>2. Data You Submit</h2>
                <p>
                  To use the API, you send JSON payloads containing transcript or spreadsheet rows, configuration
                  options, and an <code>x-api-key</code> authentication header. That data is:
                </p>
                <ul>
                  <li>
                    <strong>Processed in memory only</strong> — rows are compared by the diff engine and immediately
                    discarded. No content data is written to any persistent database or file.
                  </li>
                  <li>
                    <strong>Not shared</strong> — the content of your requests is never sold, rented, or shared with
                    third parties.
                  </li>
                  <li>
                    <strong>Not tied to identities</strong> — the API does not require any personally identifiable
                    information (PII) in the rows themselves.
                  </li>
                </ul>

                <h2>3. API Keys and Authentication</h2>
                <p>
                  Access requires a valid <code>x-api-key</code> header. Keys are provisioned individually and stored as
                  plaintext in the server&apos;s <code>API_KEYS</code> environment variable (accessible only to the
                  operator). Comparison is performed via <code>crypto.timingSafeEqual</code> to prevent timing attacks.
                  Keys are <strong>never</strong> written to any log. Keep your key confidential and report any
                  compromise immediately.
                </p>

                <h2>4. Server Logs</h2>
                <p>The API infrastructure automatically logs:</p>
                <ul>
                  <li>Incoming request IP address (used for rate limiting).</li>
                  <li>
                    Request identifier (<code>x-request-id</code>) for debugging.
                  </li>
                  <li>Timestamp, HTTP status code, and latency.</li>
                </ul>
                <p>
                  Logs are written to <strong>stdout only</strong> via Winston — no log data is written to a database
                  or external service. Retention duration depends on the deployment environment&apos;s log policy.
                </p>

                <h2>5. Third-Party Services</h2>
                <p>
                  The API uses <strong>no third-party data storage, analytics, or tracking services</strong>. There is
                  no Firebase, no database, no telemetry. Production dependencies are:{' '}
                  <code>express</code>, <code>helmet</code>, <code>cors</code>, <code>winston</code>,{' '}
                  <code>morgan</code>, <code>joi</code>. All processing occurs on the server operated by Mohamed
                  Yaakoubi.
                </p>

                <h2>6. Security</h2>
                <p>
                  All communications with the API occur over HTTPS/TLS. The <code>x-api-key</code> header is mandatory
                  for endpoints that return diff data. Keys are compared in constant time and never logged in plaintext.
                  The API uses <code>helmet</code> to apply standard HTTP security headers on every response.
                </p>

                <h2>7. Changes to This Policy</h2>
                <p>
                  We may update this policy if our practices change. The &ldquo;Last updated&rdquo; date at the top
                  will be revised accordingly.
                </p>

                <h2>8. Contact</h2>
                <p>
                  For any questions about this Privacy Policy, reach out via{' '}
                  <a href="https://www.mohamedyaakoubi.com/contact">mohamedyaakoubi.com/contact</a>.
                </p>
              </>
            ) : (
              pvt.sections.map((section, i) => (
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
            className="inline-flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:underline"
          >
            {pvt.backTo}
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
