import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — SheetDiff™ | Mohamed Yaakoubi',
  description: 'Privacy Policy for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

import SheetDiffPrivacyClient from '@/components/SheetDiffPrivacyClient'

export default function SheetDiffPrivacyPolicy() {
  return <SheetDiffPrivacyClient />
}
