import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import LiveSimulatorClient from '@/components/LiveSimulatorClient'
import { getLiveSimulatorI18n } from '@/data/live-simulator-i18n'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getLiveSimulatorI18n(locale)
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'structural diff API simulator',
      'live diff test tool',
      'transcript QA API playground',
      'JSON diff online',
      'annotation diff tool',
      'CER WER SER live scoring',
      'transcript comparison API',
      'SheetDiff live demo',
      'AI annotation QA pipeline',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/live-demo`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/live-demo',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff/api-docs/live-demo',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff/api-docs/live-demo',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/api-docs/live-demo',
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/api-docs/live-demo`,
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

export default async function LiveDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getLiveSimulatorI18n(locale)

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Structural Diff API Live Simulator — SheetDiff™',
    description: t.meta.description,
    url: `${BASE_URL}/${locale}/sheetdiff/api-docs/live-demo`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Mohamed Yaakoubi', url: BASE_URL },
    featureList: [
      'Paste or upload two JSON transcript arrays',
      'Configure all diff parameters interactively',
      'Run a real structural diff against the API',
      'Inspect row-level results with inline character diffs',
      'View CER/WER/SER quality scores',
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff™', item: `${BASE_URL}/${locale}/sheetdiff` },
      { '@type': 'ListItem', position: 3, name: t.breadcrumb.apiDocs, item: `${BASE_URL}/${locale}/sheetdiff/api-docs` },
      { '@type': 'ListItem', position: 4, name: t.breadcrumb.current, item: `${BASE_URL}/${locale}/sheetdiff/api-docs/live-demo` },
    ],
  }

  return (
    <>
      <script
        id="live-demo-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        id="live-demo-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LiveSimulatorClient />
    </>
  )
}
