import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — SheetDiff | Mohamed Yaakoubi',
  description: 'Terms of Service for the SheetDiff Google Sheets add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function TranscriptQATermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          SheetDiff &middot; Google Sheets Add-on
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: February 26, 2026
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By installing or using the SheetDiff add-on
              (&ldquo;the Add-on&rdquo;), you agree to these Terms of Service. If you do not
              agree, please do not install or use the Add-on.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. Description of the Add-on</h2>
            <p>
              The Add-on is a Google Sheets tool that compares two versions of a transcript
              spreadsheet (an original snapshot and a reworked version) to detect changes such
              as modifications, splits, merges, additions, and deletions. It calculates
              accuracy metrics (WER, CER, SER) and generates a quality assurance report.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. License</h2>
            <p>
              The Add-on is available with a 7-day trial. You are granted a non-exclusive,
              non-transferable, revocable license to use the Add-on for personal or
              commercial purposes within Google Sheets. You may not reverse-engineer,
              decompile, or create derivative works from the Add-on.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Your Data</h2>
            <p>
              The Add-on operates entirely within your Google Sheets spreadsheet. It does not
              transmit data to external servers or third parties. You retain full ownership
              of all data in your spreadsheets. For complete details on data handling, please
              refer to our{' '}
              <a
                href="/privacy-policy/transcript-qa"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Accuracy and Reliability</h2>
            <p>
              The Add-on uses text similarity algorithms and heuristic matching to detect
              changes between transcript versions. While we strive for accuracy, the results
              are provided on an &ldquo;as is&rdquo; basis. The Add-on may not detect every
              change perfectly in all edge cases. You should review the generated report and
              use your professional judgment when making quality assessments.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p>
              THE ADD-ON IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
              WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT. THE DEVELOPER DOES NOT WARRANT THAT THE ADD-ON
              WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE DEVELOPER SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, WHETHER INCURRED DIRECTLY
              OR INDIRECTLY, ARISING FROM YOUR USE OF OR INABILITY TO USE THE ADD-ON.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Modifications to the Add-on</h2>
            <p>
              The developer reserves the right to modify, suspend, or discontinue the Add-on
              at any time, with or without notice. The developer is not liable to you or any
              third party for any modification, suspension, or discontinuation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Modifications to These Terms</h2>
            <p>
              These Terms of Service may be updated from time to time. Continued use of the
              Add-on after changes constitutes acceptance of the updated terms. Changes will
              be reflected on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
            <p>
              You may stop using the Add-on at any time by uninstalling it from Google
              Sheets. The developer may terminate or restrict access to the Add-on if these
              Terms are violated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable
              laws, without regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">12. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please contact:
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
