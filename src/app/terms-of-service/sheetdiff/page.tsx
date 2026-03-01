import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — SheetDiff | Mohamed Yaakoubi',
  description: 'Terms of Service for the SheetDiff Google Sheets add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function SheetDiffTermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          SheetDiff &middot; Google Sheets Add-on
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Last updated: March 1, 2026
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
              The Add-on is a Google Sheets tool that compares two versions of a
              spreadsheet (an original snapshot and a reworked version) to detect changes such
              as modifications, splits, merges, additions, and deletions. It calculates
              accuracy metrics (WER, CER, SER) and generates a quality assurance report.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Plans &amp; Pricing</h2>
            <p>The Add-on is offered under the following tiers:</p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 pr-4 font-semibold">Feature</th>
                    <th className="text-left py-2 pr-4 font-semibold">Trial (7 days)</th>
                    <th className="text-left py-2 pr-4 font-semibold">Free Tier</th>
                    <th className="text-left py-2 font-semibold">SheetDiff Pro</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4">Row limit per comparison</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2 pr-4">50 rows</td>
                    <td className="py-2">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4">Comparisons per month</td>
                    <td className="py-2 pr-4">Unlimited</td>
                    <td className="py-2 pr-4">3</td>
                    <td className="py-2">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 pr-4">All comparison modes</td>
                    <td className="py-2 pr-4">Yes</td>
                    <td className="py-2 pr-4">Yes</td>
                    <td className="py-2">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Price</td>
                    <td className="py-2 pr-4">Free</td>
                    <td className="py-2 pr-4">Free</td>
                    <td className="py-2">$4.99/mo &middot; $29.99/yr &middot; $49.99 lifetime</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3">
              The trial period begins when you first use the Add-on and lasts 7 calendar
              days. After the trial expires, you are automatically moved to the Free Tier
              unless you upgrade to SheetDiff Pro. Pricing is in US dollars and may be
              updated with notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. License</h2>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to use
              the Add-on for personal or commercial purposes within Google Sheets, subject
              to the usage limits of your current plan. You may not reverse-engineer,
              decompile, redistribute, or create derivative works from the Add-on.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Payment &amp; Subscriptions</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                All payments are processed by <strong>Paddle.com</strong> (Paddle Payments Ltd.),
                which acts as the Merchant of Record and handles billing, tax collection, and
                compliance on behalf of the developer.
              </li>
              <li>
                Monthly and annual subscriptions renew automatically at the end of each
                billing period unless cancelled before the renewal date.
              </li>
              <li>
                Lifetime licenses are a one-time purchase granting perpetual access to the
                current version and all future updates of the Add-on.
              </li>
              <li>
                You may cancel your subscription at any time through Paddle&apos;s customer
                portal. Cancellation takes effect at the end of the current billing cycle —
                you retain access until then.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Refund Policy</h2>
            <p>
              We want you to be satisfied with SheetDiff. The following refund policy applies:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>7-day free trial:</strong> Since you can try the full Add-on
                for free for 7 days before purchasing, we encourage you to evaluate it
                thoroughly during the trial period.
              </li>
              <li>
                <strong>Monthly &amp; annual subscriptions:</strong> If you are unsatisfied,
                you may request a full refund within <strong>14 days</strong> of your
                initial purchase or most recent renewal. Contact us
                at <a href="mailto:amirrak8@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline">amirrak8@gmail.com</a>.
              </li>
              <li>
                <strong>Lifetime licenses:</strong> Refund requests are accepted within
                <strong> 14 days</strong> of purchase if the Add-on does not function as
                described.
              </li>
              <li>
                Refunds are processed through Paddle and typically appear within 5–10
                business days. After the 14-day window, refunds are granted at the
                developer&apos;s discretion.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Your Data</h2>
            <p>
              The Add-on processes spreadsheet data entirely within Google Sheets. To manage
              licensing, the Add-on transmits your Google account email address and the
              current spreadsheet ID to a license verification server. No spreadsheet content
              is ever transmitted. For complete details, please refer to our{' '}
              <a
                href="/privacy-policy/sheetdiff"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Accuracy and Reliability</h2>
            <p>
              The Add-on uses text similarity algorithms and heuristic matching to detect
              changes between spreadsheet versions. While we strive for accuracy, the results
              are provided on an &ldquo;as is&rdquo; basis. The Add-on may not detect every
              change perfectly in all edge cases. You should review the generated report and
              use your professional judgment when making quality assessments.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Disclaimer of Warranties</h2>
            <p>
              THE ADD-ON IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
              WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT. THE DEVELOPER DOES NOT WARRANT THAT THE ADD-ON
              WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE DEVELOPER SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, WHETHER INCURRED DIRECTLY
              OR INDIRECTLY, ARISING FROM YOUR USE OF OR INABILITY TO USE THE ADD-ON.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">11. Modifications to the Add-on</h2>
            <p>
              The developer reserves the right to modify, suspend, or discontinue the Add-on
              at any time, with or without notice. The developer is not liable to you or any
              third party for any modification, suspension, or discontinuation. Active paid
              subscribers will be notified in advance of any material changes that affect
              their subscription.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">12. Modifications to These Terms</h2>
            <p>
              These Terms of Service may be updated from time to time. Continued use of the
              Add-on after changes constitutes acceptance of the updated terms. Changes will
              be reflected on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">13. Termination</h2>
            <p>
              You may stop using the Add-on at any time by uninstalling it from Google
              Sheets and cancelling any active subscription through Paddle. The developer may
              terminate or restrict access to the Add-on if these Terms are violated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable
              laws, without regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">15. Contact</h2>
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
