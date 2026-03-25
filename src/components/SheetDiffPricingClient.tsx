'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Check, CircleHelp, ArrowLeft, ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/context/language-context'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function SheetDiffPricingClient() {
  const [isAnnual, setIsAnnual] = useState(true)
  const { language } = useLanguage()
  const p = getSheetDiffI18n(language).pricing

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold tracking-tight">
              {p.title}
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {p.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle (Monthly / Annual) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1.5 rounded-2xl inline-flex items-center gap-2 shadow-sm relative">
          <button 
            onClick={() => setIsAnnual(false)}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors z-10 ${!isAnnual ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
          >
            {p.monthlyBilling}
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors z-10 ${isAnnual ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
          >
            {p.annualBilling}
            <div className="absolute -top-3 -right-2 md:-right-6">
              <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">{p.save50}</span>
            </div>
          </button>
          
          <motion.div 
            className="absolute top-1.5 bottom-1.5 w-[140px] bg-blue-600 rounded-xl"
            initial={false}
            animate={{ 
              x: isAnnual ? 'calc(100% - 10px)' : 0,
              width: isAnnual ? 160 : 130 
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 items-stretch"
        >
          
          {/* Free Tier */}
          <motion.div variants={fadeIn} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{p.freeTitle}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{p.freeAfterTrial}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">$0</span>
                <span className="text-gray-500 dark:text-gray-400">{p.forever}</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {p.freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
              {p.includedAfterTrial}
            </div>
          </motion.div>

          {/* Pro Tier (Highlighted) */}
          <motion.div variants={fadeIn} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-blue-500 shadow-xl flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
              <Zap className="w-4 h-4" /> {p.mostPopular}
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{p.proTitle}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{p.proSub}</p>
              <div className="flex items-baseline gap-1 h-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isAnnual ? 'annual' : 'monthly'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold tracking-tight">${isAnnual ? '29.99' : '4.99'}</span>
                      <span className="text-gray-500 dark:text-gray-400">/{isAnnual ? p.perYear.slice(1) : p.perMonth.slice(1)}</span>
                    </div>
                    {isAnnual && <span className="text-emerald-500 text-sm font-medium mt-1">{p.savePct}</span>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {p.proFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-900 dark:text-gray-100">
                  <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{typeof feature === 'string' ? feature : <><strong>{feature.bold}</strong>{feature.rest}</>}</span>
                </li>
              ))}
            </ul>
            
            <a href="https://workspace.google.com/marketplace/app/sheetdiff_%E2%80%94_compare_diff_qa_for_sheets/51917286120" target="_blank" rel="noopener noreferrer" className="py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-center font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5">
              {p.installAddon}
            </a>
          </motion.div>

          {/* Lifetime Tier */}
          <motion.div variants={fadeIn} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{p.lifetimeTitle}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{p.lifetimeSub}</p>
              <div className="flex flex-col gap-1">
                <span className="text-5xl font-extrabold tracking-tight">{p.lifetimePrice}</span>
                <span className="text-gray-500 dark:text-gray-400">{p.payOnce}</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {p.lifetimeFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="https://workspace.google.com/marketplace/app/sheetdiff_%E2%80%94_compare_diff_qa_for_sheets/51917286120" target="_blank" rel="noopener noreferrer" className="py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {p.installAddon}
            </a>
          </motion.div>

        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <CircleHelp className="w-10 h-10 mx-auto text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold">{p.faqTitle}</h2>
        </div>
        
        <div className="space-y-6">
          {p.faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Back link */}
      <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href={`/${language}/sheetdiff`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> {p.backToOverview}
          </Link>
          
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href={`/${language}/sheetdiff/privacy-policy`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).main.privacyLink}</Link>
            <Link href={`/${language}/sheetdiff/terms-of-service`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).main.termsLink}</Link>
            <a href="mailto:amirrak8@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{p.support}</a>
          </div>
        </div>
      </section>

      {/* Trademark Notice */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 py-4">Google Sheets™ and Google Drive™ are trademarks of Google LLC.</p>

    </div>
  )
}
