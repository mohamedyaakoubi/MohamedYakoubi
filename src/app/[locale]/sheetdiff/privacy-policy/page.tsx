import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
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
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
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

export default async function SheetDiffPrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff\u2122', item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: getSheetDiffI18n(locale).main.privacyLink, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/privacy-policy` },
    ],
  }

  return (
    <>
      <script
        id="sheetdiff-privacy-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SheetDiffPrivacyClient />
    </>
  )
}
