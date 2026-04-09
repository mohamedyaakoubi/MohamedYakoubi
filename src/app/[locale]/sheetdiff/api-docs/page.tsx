import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import StructuralApiClient from '@/components/StructuralApiClient'
import { getStructuralApiI18n } from '@/data/structural-api-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getStructuralApiI18n(locale)
  const title = t.meta.title
  const description = t.meta.description

  return {
    title,
    description,
    keywords: [
      'transcript diff API',
      'structural diff REST API',
      'transcript QA API',
      'CER WER SER API',
      'localization QA API',
      'transcription comparison API',
      'row diff JSON API',
      'SheetDiff API',
      'split merge diff detection',
      'transcript scoring API',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs`,
      type: 'website',
      siteName: 'Mohamed Yaakoubi Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const BASE_URL = 'https://www.mohamedyaakoubi.com'

export default async function StructuralApiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Structural Diff API Documentation — SheetDiff™',
    description:
      'Complete REST API reference for SheetDiff™ Structural Diff. Detect modified, split, merged, added, and deleted rows in transcript datasets with CER/WER/SER quality scoring.',
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs`,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    publisher: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    proficiencyLevel: 'Expert',
    about: {
      '@type': 'SoftwareApplication',
      name: 'SheetDiff™ Structural Diff API',
      applicationCategory: 'DeveloperApplication',
      url: `${BASE_URL}/en/sheetdiff/api-docs`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff™', item: `${BASE_URL}/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: 'API Docs', item: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
    ],
  }

  return (
    <>
      <script
        id="api-docs-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        id="api-docs-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StructuralApiClient />
    </>
  )
}
