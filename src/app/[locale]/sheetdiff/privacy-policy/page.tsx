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

    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/privacy-policy`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/privacy-policy',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/privacy-policy',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/privacy-policy',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/privacy-policy',
      },
    },
  }
}

export default function SheetDiffPrivacyPolicy() {
  return <SheetDiffPrivacyClient />
}
