import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — SheetDiff™ | Mohamed Yaakoubi',
  description: 'Terms of Service for the SheetDiff™ Google Sheets add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

import SheetDiffTermsClient from '@/components/SheetDiffTermsClient'

export default function SheetDiffTermsOfService() {
  return <SheetDiffTermsClient />
}
