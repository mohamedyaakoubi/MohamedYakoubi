import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import DiffStatusesClient from '@/components/DiffStatusesClient'
import { getDiffStatusesI18n } from '@/data/diff-statuses-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDiffStatusesI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'diff status UNCHANGED MODIFIED ADDED DELETED',
      'SPLIT MERGED transcript diff',
      'transcriptDiff inline diff',
      'annotation QA diff statuses',
      'source row MERGED artifact',
      'CER WER SER transcript scoring',
      'structural diff status reference',
      'SheetDiff diff statuses',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/diff-statuses`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/diff-statuses',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/diff-statuses',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/diff-statuses',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/diff-statuses',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/diff-statuses`,
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

export default async function DiffStatusesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDiffStatusesI18n(locale)

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t.meta.title,
    description: t.meta.description,
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs/diff-statuses`,
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
      { '@type': 'ListItem', position: 4, name: t.breadcrumb.current, item: `${BASE_URL}/${locale}/sheetdiff/api-docs/diff-statuses` },
    ],
  }

  return (
    <>
      <script
        id="diff-statuses-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        id="diff-statuses-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DiffStatusesClient />
    </>
  )
}
