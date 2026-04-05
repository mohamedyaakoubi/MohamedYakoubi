'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import { useLanguage } from '@/context/language-context'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
import { analytics } from '@/lib/analytics'
import { useEffect } from 'react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

export default function SheetDiffPrivacyClient() {
  const { language } = useLanguage()
  const pvt = getSheetDiffI18n(language).privacy

  useEffect(() => {
    analytics.sheetdiffPageView('privacy')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <section className="relative pt-24 pb-12 overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-gradient-to-bl from-emerald-500/10 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.div variants={fadeIn} className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Shield className="w-6 h-6" />
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight">
              {pvt.title}
            </motion.h1>
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
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
          <motion.div variants={fadeIn} className="[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:text-gray-700 [&_ul]:dark:text-gray-300 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:dark:text-gray-100 [&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:hover:underline [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:font-mono">
          {language === 'en' ? (
            <>
            <h2>1. Overview</h2>
            <p>
              SheetDiff™ (&ldquo;the Add-on&rdquo;) is a Google Sheets™ add-on developed by Mohamed Yaakoubi that compares spreadsheet versions and generates quality assurance reports. This Privacy Policy explains how the Add-on collects, uses, and protects your data.
            </p>

            <h2>2. Data the Add-on Accesses</h2>
            <p>The Add-on requests the following Google OAuth scopes:</p>
            <ul>
              <li><strong>userinfo.email</strong> — Read your Google account email address. Used solely to identify you for license validation and usage tracking (see Section 5).</li>
              <li><strong>spreadsheets.currentonly</strong> — Read and write access to the Google Sheets™ spreadsheet the Add-on is installed in. This is required to read data in your active spreadsheet, create snapshot sheets, generate the Diff Viewer, and produce the QA Report.</li>
              <li><strong>drive.file</strong> — Access to individual Google Drive™ files that you explicitly select through the built-in Google Picker dialog. This is used solely for the Cross-Sheet Import feature: when you click "Pick from Google Drive™" and choose a spreadsheet, this scope grants read access to that specific file only, allowing the Add-on to copy a sheet into your current spreadsheet for comparison. The Add-on cannot access any other files in your Drive.</li>
              <li><strong>script.container.ui</strong> — Permission to display the Settings sidebar, dialogs, and custom menus within Google Sheets™.</li>
              <li><strong>script.external_request</strong> — Permission to make network requests to our license verification server and to Google Analytics for anonymous usage analytics (see Sections 5 and 8).</li>
            </ul>

            <h2>3. Data the Add-on Does NOT Access</h2>
            <ul>
              <li>The Add-on does <strong>not</strong> browse, list, or scan your Google Drive™. The Cross-Sheet Import feature uses Google&apos;s built-in file picker, and the Add-on can only access the specific file you select. No other Drive files are accessible to the Add-on.</li>
              <li>The Add-on does <strong>not</strong> access your Gmail, Calendar, Contacts, or any other Google service.</li>
              <li>The Add-on does <strong>not</strong> read, store, or transmit the content of your spreadsheets to any external server.</li>
              <li>The Add-on does <strong>not</strong> access your Google account password or authentication credentials.</li>
            </ul>

            <h2>4. Spreadsheet Data Storage</h2>
            <p>
               All spreadsheet data processed by the Add-on remains within your Google Sheets™ document. Comparison results, snapshots, diff reports, and user settings (column mapping, similarity threshold, report metadata) are stored in the spreadsheet&apos;s DocumentProperties using Google Apps Script&apos;s built-in Properties Service. This data is tied to the specific spreadsheet and is not accessible from other documents.
            </p>

            <h2>5. License Server &amp; Data We Collect</h2>
            <p>
              To manage licensing, trial periods, and usage limits, the Add-on communicates with a license verification server hosted on Google Firebase (Cloud Functions + Firestore) in the us-central1 region. The following data is transmitted to and stored on this server:
            </p>
            <ul>
              <li><strong>Google account email address</strong> — Retrieved via Session.getEffectiveUser().getEmail(). Used as a unique identifier for license records and usage tracking.</li>
              <li><strong>License status</strong> — Whether you are on a trial, free tier, or paid plan. Stored alongside your email to determine access level.</li>
              <li><strong>Usage count</strong> — The number of comparisons performed per calendar month. No spreadsheet content is transmitted — only a counter is incremented.</li>
              <li><strong>Payment metadata (via Dodo Payments webhook)</strong> — When you purchase a subscription or lifetime license, Dodo Payments sends a webhook to our license server containing: your billing email address, Dodo customer ID, subscription ID, subscription status, and billing dates. No payment card details or billing address are included in these webhooks.</li>
            </ul>
            <p className="font-medium">
              No spreadsheet content, cell values, row data, or file contents are ever transmitted to or stored on the license server. Only the metadata listed above is collected.
            </p>

            <h2>6. Payment Processing</h2>
            <p>
              Paid subscriptions are processed by <strong>Dodo Payments (Dodo Payments Inc.)</strong>, which acts as the Merchant of Record. When you purchase a SheetDiff™ Pro license:
            </p>
            <ul>
              <li>Payment information (credit card, billing address) is collected and processed entirely by Dodo Payments. The Add-on developer never sees or stores your payment details.</li>
              <li>Dodo Payments sends a webhook notification to our license server confirming your purchase, which includes your email address and subscription status.</li>
              <li>Dodo Payments&apos; own privacy policy applies to payment data: <a href="https://dodopayments.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">dodopayments.com/legal/privacy-policy</a>.</li>
            </ul>

            <h2>7. Data Security &amp; Protection</h2>
            <ul>
              <li>All spreadsheet data is protected by <strong>Google&apos;s encryption</strong> — in transit (TLS/HTTPS) and at rest (AES-256) — as part of Google Workspace&apos;s built-in security.</li>
              <li>Communication between the Add-on and the license server uses HTTPS/TLS encryption exclusively.</li>
              <li>The license server (Firebase) is protected by Google Cloud&apos;s infrastructure security, including encryption at rest and in transit.</li>
              <li>Dodo Payments webhook signatures are cryptographically verified to prevent unauthorized license activations.</li>
              <li>The Add-on does not store, cache, or persist any authentication tokens, credentials, or user passwords.</li>
              <li>User preferences (column mapping, thresholds) are stored in DocumentProperties, which is scoped to the individual spreadsheet and protected by Google&apos;s access controls.</li>
            </ul>

            <h2>8. Analytics</h2>
            <p>
              The Add-on collects anonymous usage analytics via Google Analytics 4 (GA4) to help us understand how features are used, identify issues, and improve the product. Analytics data is collected in two ways:
            </p>
            <ul>
              <li><strong>Server-side events</strong> — When you run a comparison, commit a snapshot, or export a report, the Add-on sends an anonymous event to Google Analytics via the Measurement Protocol. Your email address is hashed (SHA-256) before being used as a client identifier — Google Analytics never receives your actual email.</li>
              <li><strong>Client-side events</strong> — Dialogs and sidebars (Settings, Comparison Picker, License dialog) include the Google Analytics gtag.js snippet that records page views and interaction events (e.g., which mode you selected, whether you opened the subscription dialog).</li>
            </ul>
            <p>Analytics data collected includes:</p>
            <ul>
              <li>Which features and comparison modes are used</li>
              <li>Dialog open/close events</li>
              <li>Aggregate interaction patterns (e.g., &ldquo;structural mode chosen&rdquo;, &ldquo;chunked execution started&rdquo;)</li>
            </ul>
            <p>Analytics data does <strong>not</strong> include:</p>
            <ul>
              <li>Your email address or any personally identifiable information</li>
              <li>Spreadsheet content, cell values, file names, or any user data</li>
              <li>IP addresses (Google Analytics is configured without IP collection)</li>
            </ul>
            <p>The Add-on does not display advertisements, use cookies for ad targeting, or employ behavioral profiling.</p>

            <h2>9. No Sale or Transfer of Data</h2>
            <p>The Add-on does not sell, trade, rent, or transfer your data (including your email address) to any third party for advertising, data brokering, credit assessment, or any purpose unrelated to providing the Add-on&apos;s core functionality and license management.</p>

            <h2>10. No AI/ML Model Training</h2>
            <p>Your data is <strong>never</strong> used for training artificial intelligence or machine learning models. The Add-on&apos;s comparison algorithms are rule-based (text similarity, bigram matching) and do not involve any form of model training, fine-tuning, or data aggregation.</p>

            <h2>11. Data Retention &amp; Deletion</h2>
            <ul>
              <li><strong>Spreadsheet data</strong> (snapshots, diff reports, settings) resides entirely within your Google Sheets™ document and is deleted when you delete the spreadsheet or uninstall the Add-on.</li>
              <li><strong>License records</strong> (email, plan status, usage count) are stored on the Firebase license server for as long as your account is active. If you cancel your subscription or request deletion, your license record will be removed within 30 days.</li>
              <li>Trial data (trial start date) is stored both locally in UserProperties (cleared on uninstall) and on the license server (deleted on request).</li>
              <li>You may request deletion of all your data at any time by contacting the developer at the email address listed below.</li>
            </ul>

            <h2>12. Children&apos;s Privacy</h2>
            <p>The Add-on is not directed at children under 13 and does not knowingly collect any information from children.</p>

            <h2>13. Changes to This Policy</h2>
            <p>This Privacy Policy may be updated from time to time. Any changes will be reflected on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the Add-on after changes constitutes acceptance of the revised policy.</p>

            <h2>14. Contact</h2>
            <p>If you have any questions about this Privacy Policy or wish to request deletion of your data, please contact:</p>
            <p>
              <strong>Mohamed Yaakoubi</strong><br />
              Email: <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br />
              LinkedIn: <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a>
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
      </section>

      {/* Footer */}
      <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link href={`/${language}/sheetdiff`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> {pvt.backTo}
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href={`/${language}/sheetdiff/pricing`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).pricing.title}</Link>
            <Link href={`/${language}/sheetdiff/terms-of-service`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).main.termsLink}</Link>
            <a href="mailto:amirrak8@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).pricing.support}</a>
          </div>
        </div>
      </section>

      {/* Trademark Notice */}
      <p className="text-center text-xs text-gray-600 dark:text-gray-400 py-4">Google Sheets™ and Google Drive™ are trademarks of Google LLC.</p>

    </div>
  )
}
