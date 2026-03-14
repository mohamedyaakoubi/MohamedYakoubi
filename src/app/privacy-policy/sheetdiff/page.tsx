import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — SheetDiff™ | Mohamed Yaakoubi',
  description: 'Privacy Policy for the SheetDiff™ Google Sheets add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function SheetDiffPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          SheetDiff™ &middot; Google Sheets Add-on
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: March 14, 2026
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <p>
              SheetDiff™ (&ldquo;the Add-on&rdquo;) is a Google Sheets add-on
              developed by Mohamed Yaakoubi that compares spreadsheet versions and generates
              quality assurance reports. This Privacy Policy explains how the Add-on collects,
              uses, and protects your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. Data the Add-on Accesses</h2>
            <p>The Add-on requests the following Google OAuth scopes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>userinfo.email</strong> — Read your Google account email
                address. Used solely to identify you for license validation and
                usage tracking (see Section 5).
              </li>
              <li>
                <strong>spreadsheets.currentonly</strong> — Read and write access to the
                Google Sheets spreadsheet the Add-on is installed in. This is required
                to read data in your active spreadsheet, create snapshot sheets,
                generate the Diff Viewer, and produce the QA Report.
              </li>
              <li>
                <strong>drive.file</strong> — Access to individual Google Drive files
                that you explicitly select through the built-in Google Picker dialog.
                This is used solely for the Cross-Sheet Import feature: when you click
                &quot;Pick from Google Drive&quot; and choose a spreadsheet, this scope
                grants read access to that specific file only, allowing the Add-on to
                copy a sheet into your current spreadsheet for comparison. The Add-on
                cannot access any other files in your Drive.
              </li>
              <li>
                <strong>script.container.ui</strong> — Permission to display the Settings
                sidebar, dialogs, and custom menus within Google Sheets.
              </li>
              <li>
                <strong>script.external_request</strong> — Permission to make network
                requests to our license verification server. This scope is used solely
                for license validation and usage tracking (see Section 5).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Data the Add-on Does NOT Access</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                The Add-on does <strong>not</strong> browse, list, or scan your Google
                Drive. The Cross-Sheet Import feature uses Google&apos;s built-in file
                picker, and the Add-on can only access the specific file you select.
                No other Drive files are accessible to the Add-on.
              </li>
              <li>The Add-on does <strong>not</strong> access your Gmail, Calendar, Contacts, or any other Google service.</li>
              <li>The Add-on does <strong>not</strong> read, store, or transmit the content of your spreadsheets to any external server.</li>
              <li>The Add-on does <strong>not</strong> access your Google account password or authentication credentials.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Spreadsheet Data Storage</h2>
            <p>
              All spreadsheet data processed by the Add-on remains within your Google Sheets
              document. Comparison results, snapshots, diff reports, and user settings
              (column mapping, similarity threshold, report metadata) are stored
              in the spreadsheet&apos;s <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">DocumentProperties</code> using
              Google Apps Script&apos;s built-in Properties Service. This data is tied to the
              specific spreadsheet and is not accessible from other documents.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. License Server &amp; Data We Collect</h2>
            <p>
              To manage licensing, trial periods, and usage limits, the Add-on communicates
              with a license verification server hosted on Google Firebase
              (Cloud Functions + Firestore) in the <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">us-central1</code> region. The following
              data is transmitted to and stored on this server:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Google account email address</strong> — Retrieved
                via <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">Session.getEffectiveUser().getEmail()</code>.
                Used as a unique identifier for license records and usage tracking.
              </li>
              <li>
                <strong>License status</strong> — Whether you are on a trial, free tier,
                or paid plan. Stored alongside your email to determine access level.
              </li>
              <li>
                <strong>Usage count</strong> — The number of comparisons performed per
                calendar month. No spreadsheet content is transmitted — only a counter
                is incremented.
              </li>
              <li>
                <strong>Payment metadata (via Dodo Payments webhook)</strong> — When you
                purchase a subscription or lifetime license, Dodo Payments sends a webhook
                to our license server containing: your billing email address, Dodo customer
                ID, subscription ID, subscription status, and billing dates. No payment card
                details or billing address are included in these webhooks.
              </li>
            </ul>
            <p className="mt-3">
              <strong>No spreadsheet content, cell values, row data, or file contents are
              ever transmitted to or stored on the license server.</strong> Only the metadata
              listed above is collected.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Payment Processing</h2>
            <p>
              Paid subscriptions are processed by <strong>Dodo Payments</strong> (Dodo Payments Inc.),
              which acts as the Merchant of Record. When you purchase a SheetDiff™ Pro license:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Payment information (credit card, billing address) is collected and
                processed entirely by Dodo Payments. The Add-on developer never sees or stores
                your payment details.</li>
              <li>Dodo Payments sends a webhook notification to our license server confirming
                your purchase, which includes your email address and subscription status.</li>
              <li>Dodo Payments&apos; own privacy policy applies to payment data:
                {' '}<a href="https://www.dodopayments.com/legal/privacy-policy" target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline">
                  dodopayments.com/legal/privacy-policy
                </a>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Data Security &amp; Protection</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                All spreadsheet data is protected by <strong>Google&apos;s encryption</strong> — in
                transit (TLS/HTTPS) and at rest (AES-256) — as part of Google Workspace&apos;s
                built-in security.
              </li>
              <li>
                Communication between the Add-on and the license server uses
                <strong> HTTPS/TLS encryption</strong> exclusively.
              </li>
              <li>
                The license server (Firebase) is protected by Google Cloud&apos;s
                infrastructure security, including encryption at rest and in transit.
              </li>
              <li>
                Dodo Payments webhook signatures are cryptographically verified to prevent
                unauthorized license activations.
              </li>
              <li>
                The Add-on does <strong>not</strong> store, cache, or persist any authentication
                tokens, credentials, or user passwords.
              </li>
              <li>
                User preferences (column mapping, thresholds) are stored
                in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">DocumentProperties</code>, which is
                scoped to the individual spreadsheet and protected by Google&apos;s access
                controls.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. No Advertising or Tracking</h2>
            <p>
              The Add-on does not display advertisements, use cookies, include analytics
              scripts, or employ any form of user tracking or behavioral profiling.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. No Sale or Transfer of Data</h2>
            <p>
              The Add-on does <strong>not</strong> sell, trade, rent, or transfer your data
              (including your email address) to any third party for advertising, data
              brokering, credit assessment, or any purpose unrelated to providing the
              Add-on&apos;s core functionality and license management.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">10. No AI/ML Model Training</h2>
            <p>
              Your data is <strong>never</strong> used for training artificial
              intelligence or machine learning models. The Add-on&apos;s comparison algorithms
              are rule-based (text similarity, bigram matching) and do not involve any form
              of model training, fine-tuning, or data aggregation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">11. Data Retention &amp; Deletion</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Spreadsheet data</strong> (snapshots, diff reports, settings) resides
                entirely within your Google Sheets document and is deleted when you delete
                the spreadsheet or uninstall the Add-on.
              </li>
              <li>
                <strong>License records</strong> (email, plan status, usage count) are stored
                on the Firebase license server for as long as your account is active. If you
                cancel your subscription or request deletion, your license record will be
                removed within 30 days.
              </li>
              <li>
                <strong>Trial data</strong> (trial start date) is stored both locally
                in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">UserProperties</code> (cleared on
                uninstall) and on the license server (deleted on request).
              </li>
              <li>
                You may request deletion of all your data at any time by contacting
                the developer at the email address listed below.
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
              Continued use of the Add-on after changes constitutes acceptance of the
              revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">14. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request
              deletion of your data, please contact:
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

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-4">
          <Link href="/sheetdiff" className="hover:underline">
            &larr; SheetDiff™
          </Link>
          <Link href="/sheetdiff/pricing" className="hover:underline">
            Pricing
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
