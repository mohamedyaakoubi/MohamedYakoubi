import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffPrivacyClient from '@/components/SheetDiffPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Privacy Policy — SheetDiff™ | Mohamed Yaakoubi',
  description: 'Privacy Policy for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',
  robots: 'noindex, nofollow',
}

export default function SheetDiffPrivacyPolicy() {
  return <SheetDiffPrivacyClient />
}
