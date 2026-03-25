import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffPrivacyClient from '@/components/SheetDiffPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Privacy Policy — SheetDiff™ | Mohamed Yaakoubi',
    description: 'Privacy Policy for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',
    robots: 'noindex, nofollow',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/privacy-policy`,
    },
  }
}

export default function SheetDiffPrivacyPolicy() {
  return <SheetDiffPrivacyClient />
}
