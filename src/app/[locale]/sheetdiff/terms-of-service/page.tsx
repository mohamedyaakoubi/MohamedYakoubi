import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffTermsClient from '@/components/SheetDiffTermsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Terms of Service — SheetDiff™ | Mohamed Yaakoubi',
  description: 'Terms of Service for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function SheetDiffTermsOfService() {
  return <SheetDiffTermsClient />
}
