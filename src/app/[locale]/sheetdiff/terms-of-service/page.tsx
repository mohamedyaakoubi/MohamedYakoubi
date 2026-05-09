import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffTermsClient from '@/components/SheetDiffTermsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Terms of Service — SheetDiff™ | Mohamed Yaakoubi',
    fr: "Conditions d'utilisation — SheetDiff™ | Mohamed Yaakoubi",
    ar: 'شروط الخدمة — SheetDiff™ | محمد يعقوبي',
  }
  const descriptions: Record<string, string> = {
    en: 'Terms of Service for the SheetDiff™ Google Sheets™ add-on by Mohamed Yaakoubi.',
    fr: "Conditions d'utilisation du module Google Sheets™ SheetDiff™ par Mohamed Yaakoubi.",
    ar: 'شروط الخدمة لإضافة Google Sheets™ SheetDiff™ من محمد يعقوبي.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,

    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/terms-of-service`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/terms-of-service',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/terms-of-service',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/terms-of-service',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/terms-of-service',
      },
    },
  }
}

export default function SheetDiffTermsOfService() {
  return <SheetDiffTermsClient />
}
