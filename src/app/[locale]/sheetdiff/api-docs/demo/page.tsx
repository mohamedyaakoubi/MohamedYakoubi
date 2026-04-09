import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import DemoWalkthroughClient from '@/components/DemoWalkthroughClient'
import { getDemoWalkthroughI18n } from '@/data/demo-walkthrough-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDemoWalkthroughI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'structural diff API demo',
      'transcript QA walkthrough',
      'annotation diff example',
      'CER WER SER score interpretation',
      'column name mapping API',
      'podcast transcript diff',
      'AI annotation QA pipeline',
      'SheetDiff demo',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/demo`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/demo',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/demo',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/demo',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/demo',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/demo`,
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

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDemoWalkthroughI18n(locale)

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t.meta.title,
    description: t.meta.description,
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs/demo`,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    publisher: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    proficiencyLevel: 'Expert',
    isPartOf: { '@type': 'TechArticle', name: 'Structural Diff API Docs', url: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use the Structural Diff API for transcript QA',
    description:
      'End-to-end walkthrough: adapt column names, send a POST /v1/diff request, and interpret CER/WER/SER scores for annotation QA.',
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs/demo`,
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Adapt your column names', text: 'Map your dataset’s column names to the engine schema using the headers array or columnMapping object.' },
      { '@type': 'HowToStep', position: 2, name: 'Send a POST /v1/diff request', text: 'POST your original and reworked row arrays with your x-api-key header to /v1/diff.' },
      { '@type': 'HowToStep', position: 3, name: 'Interpret diff statuses', text: 'Read the status field of each result row: UNCHANGED, MODIFIED, ADDED, DELETED, SPLIT, or MERGED.' },
      { '@type': 'HowToStep', position: 4, name: 'Read CER/WER/SER scores', text: 'Use the scores object to grade transcript quality. SER measures segmentation errors; CER and WER measure text fidelity.' },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff™', item: `${BASE_URL}/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: t.breadcrumb.apiDocs, item: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
      { '@type': 'ListItem', position: 4, name: t.breadcrumb.current, item: `${BASE_URL}/${locale}/sheetdiff/api-docs/demo` },
    ],
  }

  return (
    <>
      <script
        id="demo-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        id="demo-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        id="demo-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DemoWalkthroughClient />
    </>
  )
}
