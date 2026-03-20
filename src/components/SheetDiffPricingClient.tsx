'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Check, CircleHelp, ArrowLeft, ArrowRight, Zap, ShieldCheck } from 'lucide-react'

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

  const faqs = [
    {
      q: "How does the 7-day trial work?",
      a: "When you first install SheetDiff™, you get 7 days of full, unlimited access — no credit card required, no sign-up. After the trial, you can continue using SheetDiff™ for free (with limits) or upgrade to Pro."
    },
    {
      q: "What happens when the trial ends?",
      a: "You automatically move to the Free tier: 50 rows per comparison and 10 comparisons per month. All features remain available — only the row count and comparison frequency are limited."
    },
    {
      q: "What payment methods do you accept?",
      a: "Payments are processed by Dodo Payments, supporting credit/debit cards, PayPal, and local payment methods depending on your region. Dodo Payments handles all tax/VAT compliance automatically."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Monthly and annual subscriptions can be cancelled at any time through Dodo Payments' customer portal. You keep access until the end of your current billing period."
    },
    {
      q: "What is the refund policy?",
      a: "We offer a 14-day refund policy for all purchases. If SheetDiff™ doesn't meet your needs, contact us at amirrak8@gmail.com and we'll process your refund. See our Terms of Service for full details."
    },
    {
      q: "Is my data safe?",
      a: "Yes. Your spreadsheet data never leaves Google Sheets™. The only data sent to our server is your email for license verification. See our Privacy Policy for complete details."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30">
      
      {/* Header Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold tracking-tight">
              SheetDiff™ Pricing
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start with a 7-day free trial — full access, no credit card required. After the trial, keep using SheetDiff™ for free or upgrade to Pro for unlimited access.
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
            Monthly billing
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors z-10 ${isAnnual ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
          >
            Annual billing
            <div className="absolute -top-3 -right-2 md:-right-6">
              <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">Save 50%</span>
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
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">After 7-day trial</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">$0</span>
                <span className="text-gray-500 dark:text-gray-400">/forever</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "All 3 comparison modes",
                "Up to 50 rows per comparison",
                "10 comparisons per month"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
              Included after trial
            </div>
          </motion.div>

          {/* Pro Tier (Highlighted) */}
          <motion.div variants={fadeIn} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 border-2 border-blue-500 shadow-xl flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
              <Zap className="w-4 h-4" /> Most Popular
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Pro</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Monthly or Annual</p>
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
                      <span className="text-gray-500 dark:text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
                    </div>
                    {isAnnual && <span className="text-emerald-500 text-sm font-medium mt-1">(save 50%)</span>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "All 3 comparison modes",
                <span key="rows"><strong>Unlimited</strong> rows per comparison</span>,
                <span key="comps"><strong>Unlimited</strong> comparisons per month</span>,
                "Color-coded Diff Viewer",
                "QA Report with WER/CER/SER metrics",
                "Priority email support"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-900 dark:text-gray-100">
                  <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="https://workspace.google.com/marketplace/app/sheetdiff_%E2%80%94_compare_diff_qa_for_sheets/51917286120" target="_blank" rel="noopener noreferrer" className="py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-center font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5">
              Install the Add-on
            </a>
          </motion.div>

          {/* Lifetime Tier */}
          <motion.div variants={fadeIn} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Pro Lifetime</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">One-time purchase</p>
              <div className="flex flex-col gap-1">
                <span className="text-5xl font-extrabold tracking-tight">$49.99</span>
                <span className="text-gray-500 dark:text-gray-400">Pay once, use forever</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Everything in Pro",
                "Locks in today's price — no renewals ever",
                "No recurring payments",
                "Priority email support"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="https://workspace.google.com/marketplace/app/sheetdiff_%E2%80%94_compare_diff_qa_for_sheets/51917286120" target="_blank" rel="noopener noreferrer" className="py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Install the Add-on
            </a>
          </motion.div>

        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <CircleHelp className="w-10 h-10 mx-auto text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
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
          <Link href="/sheetdiff" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to SheetDiff™ Overview
          </Link>
          
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/privacy-policy/sheetdiff" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service/sheetdiff" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
            <a href="mailto:amirrak8@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a>
          </div>
        </div>
      </section>

      {/* Trademark Notice */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 py-4">Google Sheets™ and Google Drive™ are trademarks of Google LLC.</p>

    </div>
  )
}
