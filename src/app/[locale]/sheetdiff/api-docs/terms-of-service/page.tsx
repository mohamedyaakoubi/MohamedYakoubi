import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getStructuralApiI18n } from '@/data/structural-api-i18n'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
import StructuralApiTermsClient from '@/components/StructuralApiTermsClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Terms of Service — Structural Diff API | Mohamed Yaakoubi',
    fr: "Conditions d'utilisation — API Structural Diff | Mohamed Yaakoubi",
    ar: 'شروط الخدمة — Structural Diff API | محمد يعقوبي',
  }
  const descriptions: Record<string, string> = {
    en: 'Terms of Service for the Structural Diff API: permitted use, prohibited activities, rate limits, IP rights, and governing law.',
    fr: "Conditions d'utilisation de l'API Structural Diff : usages autorisés, activités interdites, limites de débit et droit applicable.",
    ar: 'شروط استخدام Structural Diff API: الاستخدامات المسموح بها، الأنشطة المحظورة، حدود المعدل والقانون الحاكم.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/terms-of-service`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/terms-of-service',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/terms-of-service',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/terms-of-service',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/terms-of-service',
      },
    },
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/terms-of-service`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  }
}

export default async function StructuralApiTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff\u2122', item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: getStructuralApiI18n(locale).breadcrumb.current, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs` },
      { '@type': 'ListItem', position: 4, name: getSheetDiffI18n(locale).main.termsLink, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/terms-of-service` },
    ],
  }

  return (
    <>
      <script
        id="api-terms-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StructuralApiTermsClient />
    </>
  )
}
