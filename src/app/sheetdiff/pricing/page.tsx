import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — SheetDiff | Compare, Diff & QA for Sheets',
  description: 'SheetDiff pricing plans: 7-day free trial, free tier with 50 rows and 3 comparisons/month, or unlimited access with SheetDiff Pro starting at $4.99/month.',
}

export default function SheetDiffPricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SheetDiff Pricing</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start with a 7-day free trial — full access, no credit card required.
            After the trial, keep using SheetDiff for free or upgrade to Pro for unlimited access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Free Tier */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col">
            <h2 className="text-xl font-bold mb-1">Free</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">After 7-day trial</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-500 dark:text-gray-400">/forever</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>All 3 comparison modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Up to 50 rows per comparison</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>3 comparisons per month</span>
              </li>
            </ul>
            <div className="border border-gray-300 dark:border-gray-700 text-center py-3 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400">
              Included after trial
            </div>
          </div>

          {/* Pro Monthly/Annual — highlighted */}
          <div className="border-2 border-blue-600 rounded-xl p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h2 className="text-xl font-bold mb-1">Pro</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Monthly or Annual</p>
            <div className="mb-2">
              <span className="text-4xl font-bold">$4.99</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              or <strong>$29.99/year</strong> (save 50%)
            </p>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>All 3 comparison modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 font-bold">&#8734;</span>
                <span><strong>Unlimited</strong> rows per comparison</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 font-bold">&#8734;</span>
                <span><strong>Unlimited</strong> comparisons per month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Color-coded Diff Viewer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>QA Report with WER/CER/SER metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Priority email support</span>
              </li>
            </ul>
            <a
              href="mailto:amirrak8@gmail.com?subject=SheetDiff%20Pro%20%E2%80%94%20Early%20Access"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg text-sm font-semibold block transition-colors"
            >
              Get Early Access
            </a>
          </div>

          {/* Lifetime */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col">
            <h2 className="text-xl font-bold mb-1">Pro Lifetime</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">One-time purchase</p>
            <div className="mb-2">
              <span className="text-4xl font-bold">$49.99</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Pay once, use forever
            </p>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Locks in today&apos;s price — no renewals ever</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>No recurring payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Priority email support</span>
              </li>
            </ul>
            <a
              href="mailto:amirrak8@gmail.com?subject=SheetDiff%20Pro%20Lifetime%20%E2%80%94%20Early%20Access"
              className="border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 text-center py-3 rounded-lg text-sm font-semibold block transition-colors"
            >
              Get Early Access
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 text-[15px]">
            <div>
              <h3 className="font-semibold mb-2">How does the 7-day trial work?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                When you first install SheetDiff, you get 7 days of full, unlimited access —
                no credit card required, no sign-up. After the trial, you can continue using
                SheetDiff for free (with limits) or upgrade to Pro.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens when the trial ends?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You automatically move to the Free tier: 50 rows per comparison and
                3 comparisons per month. All features remain available — only the row count
                and comparison frequency are limited.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Payments are processed by Paddle, supporting credit/debit cards, PayPal,
                and local payment methods depending on your region. Paddle handles
                all tax/VAT compliance automatically.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes. Monthly and annual subscriptions can be cancelled at any time through
                Paddle&apos;s customer portal. You keep access until the end of your current
                billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the refund policy?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 14-day refund policy for all purchases. If SheetDiff doesn&apos;t
                meet your needs, contact us at{' '}
                <a href="mailto:amirrak8@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  amirrak8@gmail.com
                </a>{' '}
                and we&apos;ll process your refund. See our{' '}
                <Link href="/terms-of-service/sheetdiff" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                for full details.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes. Your spreadsheet data never leaves Google Sheets. The only data sent to
                our server is your email and spreadsheet ID for license verification. See
                our{' '}
                <Link href="/privacy-policy/sheetdiff" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>{' '}
                for complete details.
              </p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-4">
          <Link href="/sheetdiff" className="hover:underline">
            &larr; Back to SheetDiff
          </Link>
          <Link href="/privacy-policy/sheetdiff" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service/sheetdiff" className="hover:underline">
            Terms of Service
          </Link>
          <a href="mailto:amirrak8@gmail.com" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </div>
  )
}
