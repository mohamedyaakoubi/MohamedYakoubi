import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffTermsClient from '@/components/SheetDiffTermsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Terms of Service — SheetDiff™ | Mohamed Yaakoubi',
    description: 'Terms of Service for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',

    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/terms-of-service`,
    },
  }
}

export default function SheetDiffTermsOfService() {
  return <SheetDiffTermsClient />
}
