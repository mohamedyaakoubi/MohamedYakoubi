import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
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
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/terms-of-service`,
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

export default async function SheetDiffTermsOfService({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff\u2122', item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: getSheetDiffI18n(locale).main.termsLink, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/terms-of-service` },
    ],
  }

  return (
    <>
      <script
        id="sheetdiff-terms-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SheetDiffTermsClient />
    </>
  )
}
