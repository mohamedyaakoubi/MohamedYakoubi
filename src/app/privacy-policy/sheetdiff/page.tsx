import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — SheetDiff | Mohamed Yaakoubi',
  description: 'Privacy Policy for the SheetDiff Google Sheets add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function TranscriptQAPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          SheetDiff &middot; Google Sheets Add-on
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: March 1, 2026
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <p>
              SheetDiff (&ldquo;the Add-on&rdquo;) is a Google Sheets add-on
              developed by Mohamed Yaakoubi that compares spreadsheet versions and generates
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
            <h2 className="text-xl font-semibold mb-3">7. Data Security &amp; Protection</h2>
            <p>
              The Add-on relies entirely on Google&apos;s infrastructure for data security.
              Specifically:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                All spreadsheet data is protected by <strong>Google&apos;s encryption</strong> — in
                transit (TLS/HTTPS) and at rest (AES-256) — as part of Google Workspace&apos;s
                built-in security.
              </li>
              <li>
                The Add-on uses the <strong>principle of least privilege</strong>: it requests
                only two OAuth scopes — <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">spreadsheets.currentonly</code> (access
                limited to the currently open spreadsheet) and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">script.container.ui</code> (sidebar
                and dialog display only).
              </li>
              <li>
                The Add-on does <strong>not</strong> store, cache, or persist any authentication
                tokens, credentials, or user passwords.
              </li>
              <li>
                No data is transmitted outside of Google&apos;s own encrypted infrastructure.
                There are no external API calls, webhooks, or outbound network requests.
              </li>
              <li>
                User preferences (column mapping, thresholds) are stored
                in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">DocumentProperties</code>, which is
                scoped to the individual spreadsheet and protected by Google&apos;s access
                controls — only users with edit access to the spreadsheet can read or modify
                these properties.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. No Advertising</h2>
            <p>
              The Add-on does not display advertisements, promotional content, or sponsored
              material of any kind.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. No Sale or Transfer of Data</h2>
            <p>
              The Add-on does <strong>not</strong> sell, trade, rent, or transfer your Google
              user data to any third party for any reason, including but not limited to
              advertising, data brokering, credit assessment, or any purpose unrelated to
              providing the Add-on&apos;s core functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">10. No AI/ML Model Training</h2>
            <p>
              Your Google user data is <strong>never</strong> used for training artificial
              intelligence or machine learning models. The Add-on&apos;s comparison algorithms
              are rule-based (text similarity, bigram matching) and do not involve any form
              of model training, fine-tuning, or data aggregation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">11. Data Retention &amp; Deletion</h2>
            <p>
              The Add-on does not maintain any independent data store. All data resides
              within your Google Sheets spreadsheet and is retained only as long as the
              spreadsheet exists in your Google Drive. Specifically:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Snapshot sheets</strong> are stored as additional tabs within your
                spreadsheet. You can delete them at any time using the &ldquo;Delete All
                Snapshots&rdquo; menu item.
              </li>
              <li>
                <strong>User preferences</strong> (column mapping, thresholds, metadata)
                are stored in the spreadsheet&apos;s DocumentProperties. You can clear them
                using the &ldquo;Reset&rdquo; button in the Settings sidebar.
              </li>
              <li>
                <strong>Uninstalling the Add-on</strong> or deleting the spreadsheet removes
                all associated data entirely. No residual data is retained anywhere.
              </li>
              <li>
                You may request deletion of any data at any time by contacting the developer
                at the email address listed below.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">12. Children&apos;s Privacy</h2>
            <p>
              The Add-on is not directed at children under 13 and does not knowingly collect
              any information from children.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">13. Changes to This Policy</h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes will be
              reflected on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">14. Contact</h2>
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
              LinkedIn:{' '}
              <a
                href="https://www.linkedin.com/in/yaakoubi-mohamed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                linkedin.com/in/yaakoubi-mohamed
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
