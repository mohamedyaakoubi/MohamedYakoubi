import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
import SheetDiffPricingClient from '@/components/SheetDiffPricingClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Pricing — SheetDiff™ | Compare, QA for Sheets',
    fr: 'Tarifs — SheetDiff™ | Comparaison, QA pour Sheets',
    ar: 'الأسعار — SheetDiff™ | مقارنة وضمان الجودة',
  }
  const descriptions: Record<string, string> = {
    en: 'SheetDiff™ pricing plans: 7-day free trial, free tier with 50 rows and 10 comparisons/month, or unlimited access with SheetDiff™ Pro starting at $4.99/month.',
    fr: "Tarifs SheetDiff™ : 7 jours d'essai gratuit, forfait gratuit avec 50 lignes et 10 comparaisons/mois, ou accès illimité avec SheetDiff™ Pro à partir de 4,99 $/mois.",
    ar: 'خطط أسعار SheetDiff™: تجربة مجانية 7 أيام، أو طبقة مجانية بـ 50 صفًا و10 مقارنات شهريًا، أو وصول غير محدود مع SheetDiff™ Pro من 4.99 $/شهر.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/pricing`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/sheetdiff/pricing',
        'fr': 'https://www.mohamedyaakoubi.com/fr/sheetdiff/pricing',
        'ar': 'https://www.mohamedyaakoubi.com/ar/sheetdiff/pricing',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/pricing',
      },
    },
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/pricing`,
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

export default async function SheetDiffPricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff\u2122', item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: getSheetDiffI18n(locale).pricing.title, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/pricing` },
    ],
  }

  return (
    <>
      <script
        id="sheetdiff-pricing-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SheetDiffPricingClient />
    </>
  )
}
