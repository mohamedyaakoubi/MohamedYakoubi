import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SheetDiff™ — Compare, Diff & QA for Sheets | Google Sheets Add-on by Mohamed Yaakoubi',
  description: 'SheetDiff™ is a schema-agnostic Google Sheets add-on that compares spreadsheet versions and generates QA diff reports with color-coded output and quality metrics. 7-day free trial.',
}

export default function SheetDiffPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">SheetDiff™ — Compare, Diff &amp; QA for Sheets</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          A Google Sheets Add-on by Mohamed Yaakoubi
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed mb-12">
          <p>
            SheetDiff™ is a schema-agnostic Google Sheets add-on built
            for spreadsheet comparison and quality assurance. It compares two
            versions of any structured data — the original and the reworked — and produces a
            detailed, row-level diff report.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Open any spreadsheet in Google Sheets</li>
              <li>The add-on auto-detects column roles (speaker, timestamps, transcript, sound events)</li>
              <li>Commit a snapshot of the original data</li>
              <li>Make edits or import the reworked version</li>
              <li>Run the diff — every row is categorized and color-coded</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Diff Categories</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Unchanged</strong> — identical rows between versions</li>
              <li><strong>Modified</strong> — rows with text or timing changes</li>
              <li><strong>Split</strong> — one original row split into multiple</li>
              <li><strong>Merged</strong> — multiple original rows merged into one</li>
              <li><strong>Added</strong> — new rows in the reworked version</li>
              <li><strong>Deleted</strong> — rows removed from the original</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Three Comparison Modes</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Structural Diff</strong> — Row-level comparison with split/merge detection</li>
              <li><strong>Cell-by-Cell</strong> — Column-aligned granular comparison</li>
              <li><strong>Duplicate Finder</strong> — Detect duplicate rows within a sheet</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Schema-agnostic — works with any column layout</li>
              <li>Auto-detect column roles via flexible header pattern matching</li>
              <li>Color-coded Diff Viewer sheet</li>
              <li>Summary QA Report with per-category counts and WER/CER/SER metrics</li>
              <li>Configurable similarity threshold</li>
              <li>Multi-script normalization (Arabic, Cyrillic, CJK, Thai, Devanagari, Bengali)</li>
              <li>Optional reviewer and transcriptionist metadata</li>
              <li>Settings sidebar for full control</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 pr-4 font-semibold">Plan</th>
                    <th className="text-left py-3 pr-4 font-semibold">Rows</th>
                    <th className="text-left py-3 pr-4 font-semibold">Comparisons/mo</th>
                    <th className="text-left py-3 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-medium">Trial (7 days)</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2">Free</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-medium">Free Tier</td>
                    <td className="py-2 pr-4">50</td>
                    <td className="py-2 pr-4">10</td>
                    <td className="py-2">Free</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-medium">Pro Monthly</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2">$4.99/mo</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4 font-medium">Pro Annual</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2">$29.99/yr</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Pro Lifetime</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2">$49.99 one-time</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              See full details on the{' '}
              <Link href="/sheetdiff/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
                Pricing page
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Privacy &amp; Security</h2>
            <p>
              Your spreadsheet data stays in Google Sheets — it is never transmitted to
              external servers. The only data sent to our license server is your Google account
              email and the spreadsheet ID, solely for license verification and usage tracking.
              Payments are handled by Dodo Payments (Merchant of Record). No cell content, row data,
              or file contents ever leave Google&apos;s infrastructure.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/sheetdiff/pricing"
            className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            View Pricing
          </Link>
          <Link
            href="/privacy-policy/sheetdiff"
            className="text-blue-600 dark:text-blue-400 hover:underline py-2.5"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service/sheetdiff"
            className="text-blue-600 dark:text-blue-400 hover:underline py-2.5"
          >
            Terms of Service
          </Link>
          <a
            href="mailto:amirrak8@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline py-2.5"
          >
            Support
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Developed by{' '}
            <a
              href="https://mohamedyaakoubi.live/en"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Mohamed Yaakoubi
            </a>
            {' '}&middot;{' '}
            <a
              href="mailto:amirrak8@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              amirrak8@gmail.com
            </a>
            {' '}&middot;{' '}
            <a
              href="https://www.linkedin.com/in/yaakoubi-mohamed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
