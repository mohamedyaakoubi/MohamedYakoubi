import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Transcript QA Diff Engine | Mohamed Yaakoubi',
  description: 'Privacy Policy for the Transcript QA — Diff Engine Google Sheets add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function TranscriptQAPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Transcript QA — Diff Engine &middot; Google Sheets Add-on
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: February 26, 2026
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <p>
              Transcript QA — Diff Engine (&ldquo;the Add-on&rdquo;) is a Google Sheets add-on
              developed by Mohamed Yaakoubi that compares transcript versions and generates
              quality assurance reports. This Privacy Policy explains how the Add-on handles
              your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. Data the Add-on Accesses</h2>
            <p>The Add-on requests the following Google OAuth scopes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>spreadsheets.currentonly</strong> — Read and write access to the
                currently open Google Sheets spreadsheet only. This is required to read
                transcript data, create snapshot sheets, generate the Diff Viewer, and
                produce the QA Report.
              </li>
              <li>
                <strong>script.container.ui</strong> — Permission to display the Settings
                sidebar, dialogs, and custom menus within Google Sheets.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Data the Add-on Does NOT Access</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Add-on does <strong>not</strong> access any other files in your Google Drive.</li>
              <li>The Add-on does <strong>not</strong> access your Gmail, Calendar, Contacts, or any other Google service.</li>
              <li>The Add-on does <strong>not</strong> access your personal information, Google account profile, or authentication credentials.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Data Storage</h2>
            <p>
              All data processed by the Add-on remains within your Google Sheets spreadsheet.
              User settings (column mapping, similarity threshold, report metadata) are stored
              in the spreadsheet&apos;s <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">DocumentProperties</code> using
              Google Apps Script&apos;s built-in Properties Service. This data is tied to the
              specific spreadsheet and is not accessible from other documents.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. No External Servers</h2>
            <p>
              The Add-on runs entirely within Google&apos;s Apps Script infrastructure. It does
              not transmit any data to external servers, third-party services, APIs, or
              databases. No network requests are made outside of Google&apos;s own services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. No Data Collection or Tracking</h2>
            <p>
              The Add-on does not collect, store, or share any personal data, usage analytics,
              telemetry, or tracking information. There are no cookies, no analytics scripts,
              and no third-party integrations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. No Advertising</h2>
            <p>
              The Add-on does not display advertisements, promotional content, or sponsored
              material of any kind.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Data Deletion</h2>
            <p>
              Since no data is stored outside your spreadsheet, uninstalling the Add-on or
              deleting the spreadsheet removes all associated data. You can also use the
              &ldquo;Reset&rdquo; button in the Settings sidebar to clear saved preferences, or
              the &ldquo;Delete All Snapshots&rdquo; menu item to remove snapshot sheets.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Children&apos;s Privacy</h2>
            <p>
              The Add-on is not directed at children under 13 and does not knowingly collect
              any information from children.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes will be
              reflected on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact:
            </p>
            <p className="mt-2">
              <strong>Mohamed Yaakoubi</strong><br />
              Email:{' '}
              <a
                href="mailto:amirrak8@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                amirrak8@gmail.com
              </a>
              <br />
              GitHub:{' '}
              <a
                href="https://github.com/mohamedyaakoubi/volgapartners-scripts/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                github.com/mohamedyaakoubi/volgapartners-scripts
              </a>
            </p>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <a href="https://www.mohamedyaakoubi.live/en" className="hover:underline">
            &larr; Back to mohamedyaakoubi.live
          </a>
        </div>
      </div>
    </div>
  )
}
