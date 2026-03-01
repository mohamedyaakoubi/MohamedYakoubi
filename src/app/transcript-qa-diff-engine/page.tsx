import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SheetDiff — Compare, Diff & QA for Sheets | Google Sheets Add-on by Mohamed Yaakoubi',
  description: 'SheetDiff is a schema-agnostic Google Sheets add-on that compares spreadsheet versions and generates QA diff reports with color-coded output and quality metrics.',
}

export default function TranscriptQADiffEnginePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">SheetDiff — Compare, Diff &amp; QA for Sheets</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          A Google Sheets Add-on by Mohamed Yaakoubi
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed mb-12">
          <p>
            SheetDiff is a schema-agnostic Google Sheets add-on built
            for spreadsheet comparison and quality assurance. It compares two
            versions of any structured data — the original and the reworked — and produces a
            detailed, row-level diff report.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Open any transcript spreadsheet in Google Sheets</li>
              <li>The add-on auto-detects column roles (speaker, timestamps, transcript, sound events)</li>
              <li>Commit a snapshot of the original transcript</li>
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
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Schema-agnostic — works with any column layout</li>
              <li>Auto-detect column roles via flexible header pattern matching</li>
              <li>Color-coded Diff Viewer sheet</li>
              <li>Summary QA Report with per-category counts</li>
              <li>Configurable similarity threshold</li>
              <li>Optional reviewer and transcriptionist metadata</li>
              <li>Settings sidebar for full control</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Privacy &amp; Security</h2>
            <p>
              The add-on runs entirely within Google Sheets. It does not transmit data to
              external servers, collect personal information, or use tracking of any kind.
              All data stays in your spreadsheet.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/privacy-policy/transcript-qa"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service/transcript-qa"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Terms of Service
          </Link>
          <a
            href="mailto:amirrak8@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
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
