import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import ParametersGuideClient from '@/components/ParametersGuideClient'
import { getParametersGuideI18n } from '@/data/parameters-guide-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getParametersGuideI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'structural diff API config',
      'simpleMode transcript diff',
      'stripDiacritics Arabic NLP',
      'ignoreColNames annotation QA',
      'positionalMode diff',
      'enableSplits enableMerges',
      'transcript comparison parameters',
      'SheetDiff API config guide',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/parameters`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/parameters',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/parameters',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/parameters',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/parameters',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/parameters`,
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

export default async function ParametersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getParametersGuideI18n(locale)

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t.meta.title,
    description: t.meta.description,
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs/parameters`,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    publisher: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    proficiencyLevel: 'Expert',
    isPartOf: { '@type': 'TechArticle', name: 'Structural Diff API Docs', url: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff™', item: `${BASE_URL}/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: t.breadcrumb.apiDocs, item: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
      { '@type': 'ListItem', position: 4, name: t.breadcrumb.current, item: `${BASE_URL}/${locale}/sheetdiff/api-docs/parameters` },
    ],
  }

  return (
    <>
      <script
        id="parameters-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        id="parameters-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ParametersGuideClient />
    </>
  )
}
