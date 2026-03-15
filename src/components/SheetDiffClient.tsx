'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileSpreadsheet,
  CircleCheckBig,
  Zap,
  SplitSquareHorizontal,
  GitMerge,
  Search,
  Globe2,
  ShieldCheck,
  CreditCard,
  Mail,
  ArrowRight,
  TrendingUp,
  Rows,
  Sparkles
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function SheetDiffClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Google Sheets Add-on by Mohamed Yaakoubi</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              SheetDiff™ <span className="text-gray-400 font-light hidden sm:inline">—</span> <br className="block sm:hidden" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Compare, Diff & QA
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              SheetDiff™ is a schema-agnostic Google Sheets add-on built for spreadsheet comparison and quality assurance.
              It compares two versions of any structured data — the original and the reworked — and produces a detailed, row-level diff report.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://workspace.google.com/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Install Add-on <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/sheetdiff/pricing"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 text-gray-900 dark:text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* Three Modes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeIn} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Rows className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Structural Diff</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Row-level comparison with advanced algorithms to detect splits and merges across your data rows.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Cell-by-Cell</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Column-aligned granular comparison for pinpointing exact character or formatting changes.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Duplicate Finder</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Scan massive datasets instantly to detect and highlight duplicate rows within a single sheet.
            </p>
          </motion.div>
        </motion.div>

        {/* How It Works & Diff Categories Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Open any spreadsheet in Google Sheets' },
                { title: 'The add-on auto-detects column roles (speaker, timestamps, transcript, sound events)' },
                { title: 'Commit a snapshot of the original data' },
                { title: 'Make edits or import the reworked version' },
                { title: 'Run the diff — every row is categorized and color-coded' }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeIn} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{step.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Diff Categories Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-500" /> Diff Categories
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="font-medium text-gray-600 dark:text-gray-400">Unchanged — identical rows between versions</span>
                <CircleCheckBig className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <span className="font-medium text-yellow-700 dark:text-yellow-400">Modified — rows with text or timing changes</span>
                <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 ml-4" />
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <span className="font-medium text-purple-700 dark:text-purple-400">Split — one original row split into multiple</span>
                <SplitSquareHorizontal className="w-5 h-5 text-purple-600 dark:text-purple-500 shrink-0 ml-4" />
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                <span className="font-medium text-indigo-700 dark:text-indigo-400">Merged — multiple original rows merged into one</span>
                <GitMerge className="w-5 h-5 text-indigo-600 dark:text-indigo-500 shrink-0 ml-4" />
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <span className="font-medium text-green-700 dark:text-green-400">Added — new rows in the reworked version</span>
                <div className="w-5 h-5 rounded-md bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0 ml-4">+</div>
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <span className="font-medium text-red-700 dark:text-red-400">Deleted — rows removed from the original</span>
                <div className="w-5 h-5 rounded-md bg-red-500 text-white flex items-center justify-center font-bold text-sm shrink-0 ml-4">-</div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Feature List & Pricing Snippet */}
        <div className="grid md:grid-cols-2 gap-12 items-start py-12 border-t border-gray-200 dark:border-gray-800">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="space-y-4">
              {[
                { t: 'Schema-agnostic — works with any column layout', i: <TrendingUp className="w-5 h-5 text-blue-500" /> },
                { t: 'Auto-detect column roles via flexible header pattern matching', i: <Search className="w-5 h-5 text-purple-500" /> },
                { t: 'Color-coded Diff Viewer sheet', i: <Zap className="w-5 h-5 text-yellow-500" /> },
                { t: 'Summary QA Report with per-category counts and WER/CER/SER metrics', i: <CircleCheckBig className="w-5 h-5 text-green-500" /> },
                { t: 'Configurable similarity threshold', i: <Rows className="w-5 h-5 text-indigo-500" /> },
                { t: 'Multi-script normalization (Arabic, Cyrillic, CJK, Thai, Devanagari, Bengali)', i: <Globe2 className="w-5 h-5 text-emerald-500" /> },
                { t: 'Optional reviewer and transcriptionist metadata', i: <FileSpreadsheet className="w-5 h-5 text-orange-500" /> },
                { t: 'Settings sidebar for full control', i: <ShieldCheck className="w-5 h-5 text-gray-500" /> }
              ].map((f, i) => (
                <motion.li variants={fadeIn} key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                  <div className="flex-shrink-0 mt-0.5">{f.i}</div>
                  <span>{f.t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-3xl text-white shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-2">Pricing</h2>
            <p className="text-blue-100 mb-8">See full details on the Pricing page.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-white/20">
                <span className="font-medium">Free Tier</span>
                <span className="font-bold text-xl">$0</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/20">
                <span className="font-medium">Pro Monthly</span>
                <span className="font-bold text-xl">$4.99<span className="text-sm font-normal text-blue-200">/mo</span></span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/20">
                <span className="font-medium">Pro Lifetime</span>
                <span className="font-bold text-xl">$49.99<span className="text-sm font-normal text-blue-200"> once</span></span>
              </div>
            </div>

            <Link href="/sheetdiff/pricing" className="block w-full py-3 bg-white text-blue-700 text-center font-bold rounded-xl hover:bg-gray-50 transition-colors">
              Compare Full Plans
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer / Trust Section */}
      <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-4 text-base">
              <ShieldCheck className="text-green-500" />
              Privacy & Security
            </div>
            <p className="leading-relaxed mb-4">
              Your spreadsheet data stays in Google Sheets — it is never transmitted to external servers. The only data sent to our license server is your Google account email, solely for license verification and usage tracking. Payments are handled by Dodo Payments (Merchant of Record). No cell content, row data, or file contents ever leave Google&apos;s infrastructure.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy-policy/sheetdiff" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>
              <Link href="/terms-of-service/sheetdiff" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>
            </div>
          </div>
          <div className="md:text-right">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-base">Get in Touch</h4>
            <div className="flex flex-col md:items-end space-y-2">
              <a href="mailto:amirrak8@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> amirrak8@gmail.com
              </a>
              <a href="https://mohamedyaakoubi.live/en" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                <Globe2 className="w-4 h-4" /> mohamedyaakoubi.live
              </a>
              <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
