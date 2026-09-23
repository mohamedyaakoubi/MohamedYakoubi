import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getStructuralApiI18n } from '@/data/structural-api-i18n'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
import StructuralApiPrivacyClient from '@/components/StructuralApiPrivacyClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Privacy Policy — Structural Diff API | Mohamed Yaakoubi',
    fr: 'Politique de confidentialité — API Structural Diff | Mohamed Yaakoubi',
    ar: 'سياسة الخصوصية — Structural Diff API | محمد يعقوبي',
  }
  const descriptions: Record<string, string> = {
    en: 'Privacy Policy for the Structural Diff API: how request data is processed, what is logged, and how API keys are stored.',
    fr: "Politique de confidentialité de l'API Structural Diff : traitement des données, journaux serveur et gestion des clés API.",
    ar: 'سياسة الخصوصية لـ Structural Diff API: كيفية معالجة البيانات والسجلات وتخزين مفاتيح API.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/privacy-policy`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/privacy-policy',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/privacy-policy',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/privacy-policy',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/privacy-policy',
      },
    },
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/privacy-policy`,
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

export default async function StructuralApiPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff\u2122', item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: getStructuralApiI18n(locale).breadcrumb.current, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs` },
      { '@type': 'ListItem', position: 4, name: getSheetDiffI18n(locale).main.privacyLink, item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/privacy-policy` },
    ],
  }

  return (
    <>
      <script
        id="api-privacy-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StructuralApiPrivacyClient />
    </>
  )
}
