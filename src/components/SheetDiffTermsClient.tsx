'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Scale } from 'lucide-react'
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
    transition: { staggerChildren: 0.05 }
  }
}

export default function SheetDiffTermsClient() {
  const { language } = useLanguage()
  const tos = getSheetDiffI18n(language).terms

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <section className="relative pt-24 pb-12 overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <motion.div variants={fadeIn} className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Scale className="w-6 h-6" />
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight">
              {tos.title}
            </motion.h1>
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
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
          <motion.div variants={fadeIn} className="[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:text-gray-700 [&_ul]:dark:text-gray-300 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:dark:text-gray-100 [&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:hover:underline [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:font-mono">
          {language === 'en' ? (
            <>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By installing or using the SheetDiff™ add-on (&ldquo;the Add-on&rdquo;), you agree to these Terms of Service. If you do not agree, please do not install or use the Add-on.
            </p>

            <h2>2. Description of the Add-on</h2>
            <p>
              The Add-on is a Google Sheets™ tool that compares two versions of a spreadsheet (an original snapshot and a reworked version) to detect changes such as modifications, splits, merges, additions, and deletions. It calculates accuracy metrics (WER, CER, SER) and generates a quality assurance report. The Add-on also supports importing a sheet from another spreadsheet you select through the built-in Google Picker dialog for cross-spreadsheet comparison.
            </p>

            <h2>3. Plans &amp; Pricing</h2>
            <p>The Add-on is offered under the following tiers:</p>

            <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm not-prose">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Trial (7 days)</th>
                    <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Free Tier</th>
                    <th className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">SheetDiff™ Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">Row limit per comparison</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Unlimited</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">50 rows</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">Comparisons per month</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Unlimited</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">10</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">All comparison modes</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Yes</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Yes</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">Yes</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 bg-gray-50 dark:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">Price</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Free</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Free</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-bold">$4.99/mo <span className="font-normal text-gray-500">&middot;</span> $29.99/yr <span className="font-normal text-gray-500">&middot;</span> $49.99 lifetime</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The trial period begins when you first use the Add-on and lasts 7 calendar days. After the trial expires, you are automatically moved to the Free Tier unless you upgrade to SheetDiff™ Pro. Pricing is in US dollars and may be updated with notice.
            </p>

            <h2>4. License</h2>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to use the Add-on for personal or commercial purposes within Google Sheets™, subject to the usage limits of your current plan. You may not reverse-engineer, decompile, redistribute, or create derivative works from the Add-on.
            </p>

            <h2>5. Payment &amp; Subscriptions</h2>
            <ul>
              <li>All payments are processed by <strong>Dodo Payments (Dodo Payments Inc.)</strong>, which acts as the Merchant of Record and handles billing, tax collection, and compliance on behalf of the developer.</li>
              <li>Monthly and annual subscriptions renew automatically at the end of each billing period unless cancelled before the renewal date.</li>
              <li>Lifetime licenses are a one-time purchase granting perpetual access to the current version and all future updates of the Add-on.</li>
              <li>You may cancel your subscription at any time through the Dodo Payments customer portal. Cancellation takes effect at the end of the current billing cycle — you retain access until then.</li>
              <li>If you purchase a Lifetime license while holding an active monthly or annual subscription, your existing subscription will be cancelled immediately. No prorated refund is issued for any unused time remaining on the cancelled subscription. By completing the Lifetime purchase, you acknowledge and accept this automatic cancellation.</li>
            </ul>

            <h2>6. Refund Policy</h2>
            <p>We want you to be satisfied with SheetDiff™. The following refund policy applies:</p>
            <ul>
              <li><strong>7-day free trial:</strong> Since you can try the full Add-on for free for 7 days before purchasing, we encourage you to evaluate it thoroughly during the trial period.</li>
              <li><strong>Monthly &amp; annual subscriptions:</strong> If you are unsatisfied, you may request a full refund within 14 days of your initial purchase or most recent renewal. Contact us at <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a>.</li>
              <li><strong>Lifetime licenses:</strong> Refund requests are accepted within 14 days of purchase if the Add-on does not function as described.</li>
              <li>Refunds are processed through Dodo Payments and typically appear within 5–10 business days. After the 14-day window, refunds are granted at the developer&apos;s discretion.</li>
            </ul>

            <h2>7. Your Data</h2>
            <p>
              The Add-on processes spreadsheet data entirely within Google Sheets™. When you use the Cross-Sheet Import feature, you select a spreadsheet through Google&apos;s built-in Picker dialog, and the Add-on copies the selected sheet into your current spreadsheet — no data leaves Google&apos;s servers during this process. To manage licensing, the Add-on transmits your Google account email address to a license verification server. No spreadsheet content or spreadsheet identifiers are ever transmitted. The Add-on also collects anonymous usage analytics via Google Analytics 4 to improve the product — no personally identifiable information or spreadsheet content is included in analytics data. For complete details, please refer to our <Link href={`/${language}/sheetdiff/privacy-policy`}>Privacy Policy</Link>.
            </p>

            <h2>8. Accuracy and Reliability</h2>
            <p>
              The Add-on uses text similarity algorithms and heuristic matching to detect changes between spreadsheet versions. While we strive for accuracy, the results are provided on an &ldquo;as is&rdquo; basis. The Add-on may not detect every change perfectly in all edge cases. You should review the generated report and use your professional judgment when making quality assessments.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p className="uppercase text-xs font-semibold leading-relaxed p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              THE ADD-ON IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. THE DEVELOPER DOES NOT WARRANT THAT THE ADD-ON WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p className="uppercase text-xs font-semibold leading-relaxed p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE DEVELOPER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF OR INABILITY TO USE THE ADD-ON.
            </p>

            <h2>11. Modifications to the Add-on</h2>
            <p>
              The developer reserves the right to modify, suspend, or discontinue the Add-on at any time, with or without notice. The developer is not liable to you or any third party for any modification, suspension, or discontinuation. Active paid subscribers will be notified in advance of any material changes that affect their subscription.
            </p>

            <h2>12. Modifications to These Terms</h2>
            <p>
              These Terms of Service may be updated from time to time. Continued use of the Add-on after changes constitutes acceptance of the updated terms. Changes will be reflected on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>

            <h2>13. Termination</h2>
            <p>
              You may stop using the Add-on at any time by uninstalling it from Google Sheets™ and cancelling any active subscription through Dodo Payments. The developer may terminate or restrict access to the Add-on if these Terms are violated.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>

            <h2>15. Contact</h2>
            <p>If you have any questions about these Terms of Service, please contact:</p>
            <p>
              <strong>Mohamed Yaakoubi</strong><br />
              Email: <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br />
              LinkedIn: <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a>
            </p>
            </>
          ) : (
            <>
            {tos.sections.map((section, i) => (
              <div key={i}>
                {section.heading && <h2>{section.heading}</h2>}
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
                {i === 2 && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm not-prose">
                    <table className="w-full text-sm" dir="ltr">
                      <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white text-left">{tos.pricingTable.feature}</th>
                          <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white text-left">{tos.pricingTable.trial}</th>
                          <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white text-left">{tos.pricingTable.free}</th>
                          <th className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400 text-left">{tos.pricingTable.pro}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
                        {tos.pricingTable.rows.map((row, j) => (
                          <tr key={j} className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 ${j === tos.pricingTable.rows.length - 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}>
                            <td className="py-3 px-4 font-medium">{row.feature}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.trial}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.free}</td>
                            <td className={`py-3 px-4 ${j === tos.pricingTable.rows.length - 1 ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-900 dark:text-white font-medium'}`}>{row.pro}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
            </>
          )}

          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link href={`/${language}/sheetdiff`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> {tos.backTo}
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href={`/${language}/sheetdiff/pricing`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).pricing.title}</Link>
            <Link href={`/${language}/sheetdiff/privacy-policy`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).main.privacyLink}</Link>
            <a href="mailto:amirrak8@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{getSheetDiffI18n(language).pricing.support}</a>
          </div>
        </div>
      </section>

      {/* Trademark Notice */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 py-4">Google Sheets™ and Google Drive™ are trademarks of Google LLC.</p>

    </div>
  )
}
