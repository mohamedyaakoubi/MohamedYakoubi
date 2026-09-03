import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffPrivacyClient from '@/components/SheetDiffPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Privacy Policy — SheetDiff™ | Mohamed Yaakoubi',
    fr: 'Politique de confidentialité — SheetDiff™ | Mohamed Yaakoubi',
    ar: 'سياسة الخصوصية — SheetDiff™ | محمد يعقوبي',
  }
  const descriptions: Record<string, string> = {
    en: 'Privacy Policy for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',
    fr: 'Politique de confidentialité du module Google Sheets™ SheetDiff™ par Mohamed Yaakoubi.',
    ar: 'سياسة الخصوصية لإضافة Google Sheets™ SheetDiff™ من محمد يعقوبي.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,

    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/privacy-policy`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/privacy-policy',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/privacy-policy',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/privacy-policy',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/privacy-policy',
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/privacy-policy`,
      type: 'website',
      siteName: 'SheetDiff™ by Mohamed Yaakoubi',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  }
}

export default function SheetDiffPrivacyPolicy() {
  return <SheetDiffPrivacyClient />
}
