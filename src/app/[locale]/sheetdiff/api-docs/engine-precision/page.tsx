import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import EnginePrecisionClient from '@/components/EnginePrecisionClient'
import { getEnginePrecisionI18n } from '@/data/engine-precision-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getEnginePrecisionI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'transcript diff engine precision',
      'structural diff F1 score',
      'transcript QA engine accuracy',
      'diff classification precision recall',
      'MODIFIED ADDED MERGED SPLIT accuracy',
      'Arabic transcript diff evaluation',
      'SheetDiff engine metrics',
      'structural diff confusion matrix',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/engine-precision`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/engine-precision',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/engine-precision',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/engine-precision',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/engine-precision',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/engine-precision`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

const BASE_URL = 'https://www.mohamedyaakoubi.com'

export default async function EnginePrecisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Engine Precision Analysis — SheetDiff Structural Diff',
    description:
      'Measured precision, recall, and F1 for the 8-pass structural diff engine across 14 real Arabic transcript datasets. Per-category metrics, confusion matrix, per-dataset accuracy, and similarity benchmarking.',
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs/engine-precision`,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    publisher: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    proficiencyLevel: 'Expert',
    about: {
      '@type': 'SoftwareApplication',
      name: 'SheetDiff™ Structural Diff Engine',
      applicationCategory: 'DeveloperApplication',
      url: `${BASE_URL}/en/sheetdiff/api-docs`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff™',     item: `${BASE_URL}/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: 'API Docs',       item: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
      { '@type': 'ListItem', position: 4, name: 'Engine Precision', item: `${BASE_URL}/${locale}/sheetdiff/api-docs/engine-precision` },
    ],
  }

  return (
    <>
      <script
        id="engine-precision-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        id="engine-precision-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EnginePrecisionClient />
    </>
  )
}
