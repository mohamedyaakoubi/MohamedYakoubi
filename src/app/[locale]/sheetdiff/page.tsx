import type { Metadata } from 'next'
import { getSupportedLocales, assertSupportedLocale, getTranslations } from '@/lib/translations'
import { getSheetDiffI18n } from '@/data/sheetdiff-i18n'
import SheetDiffClient from '@/components/SheetDiffClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

const MARKETPLACE_URL =
  'https://workspace.google.com/marketplace/app/sheetdiff_%E2%80%94_compare_diff_qa_for_sheets/51917286120'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  // fr/ar reuse the page's own translated hero copy so the <title>, meta description and
  // og:/twitter: text match the language of the body and of hreflang. Previously every
  // locale shipped the English strings below.
  const t = getSheetDiffI18n(locale).main
  const title = locale === 'en'
    ? 'SheetDiff\u2122 \u2014 Compare Google Sheets\u2122 | Spreadsheet Diff & QA Add-on'
    : `${t.heroTitle} \u2014 ${t.badge}`
  const description = locale === 'en'
    ? 'Compare two Google Sheets\u2122 versions and detect modified, moved, split, merged, added & deleted rows. Use SKU-based matching for product catalogs, inventory updates, supplier price lists, localization QA, and spreadsheet audits. Free 7-day trial.'
    : t.heroDesc

  return {
    title,
    description,
    keywords: [
      'google sheets diff',
      'compare google sheets',
      'compare two google sheets',
      'spreadsheet comparison tool',
      'compare product catalogs in google sheets',
      'sku based spreadsheet comparison',
      'supplier price list comparison',
      'inventory spreadsheet comparison',
      'google sheets add-on',
      'localization QA',
      'transcription QA',
      'subtitle diff tool',
      'WER CER SER metrics',
      'spreadsheet version control',
      'data quality assurance',
      'google sheets compare versions',
      'detect changes in google sheets',
      'detect moved rows in google sheets',
      'find added deleted modified rows spreadsheet',
      'google workspace add-on',
      'spreadsheet diff tool',
    ],
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en/sheetdiff',
        fr: 'https://www.mohamedyaakoubi.com/fr/sheetdiff',
        ar: 'https://www.mohamedyaakoubi.com/ar/sheetdiff',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff',
      },
    },
    openGraph: {
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      title,
      description,
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff`,
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

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SheetDiff\u2122',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Productivity',
  operatingSystem: 'Google Workspace',
  description:
    'SheetDiff\u2122 compares two versions of any Google Sheets\u2122 spreadsheet and generates a color-coded diff report \u2014 detecting modified, moved, split, merged, added, and deleted rows. It supports SKU-based product catalog comparison, inventory updates, supplier price list reviews, WER/CER/SER quality metrics, inline character diffs, duplicate finder, and multi-script normalization.',
  url: MARKETPLACE_URL,
  image: 'https://www.mohamedyaakoubi.com/sheetdiff-logo.png',
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      name: 'Free Tier',
      description: 'Up to 50 rows per comparison, 10 comparisons per month (after 7-day full trial)',
    },
    {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'USD',
      name: 'Pro Monthly',
      description: 'Unlimited rows and comparisons per month',
    },
    {
      '@type': 'Offer',
      price: '49.99',
      priceCurrency: 'USD',
      name: 'Pro Lifetime',
      description: 'One-time purchase \u2014 unlimited access forever',
    },
  ],
  author: {
    '@type': 'Person',
    name: 'Mohamed Yaakoubi',
    url: 'https://www.mohamedyaakoubi.com',
    sameAs: 'https://www.linkedin.com/in/yaakoubi-mohamed/',
  },
  featureList: [
    'Structural Diff \u2014 detect modified, moved, split, merged, added, deleted rows',
    'Simple Mode \u2014 compare product catalogs, inventory updates, and supplier price lists by SKU or another ID column',
    'Cell-by-Cell Comparison \u2014 granular column-aligned diff',
    'Duplicate Finder \u2014 column-by-column and full-sheet deduplication',
    'WER, CER, SER quality metrics for transcription and localization QA',
    'Inline character-level diffs with color-coded highlighting',
    'Multi-script normalization \u2014 Arabic, Cyrillic, CJK, Thai, Devanagari, Bengali',
    'Chunked execution engine for large datasets (100,000+ rows)',
    'Schema-agnostic \u2014 works with any spreadsheet column layout',
    '7-day free trial, no credit card required',
  ],
}


const simpleModeVideoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'SheetDiff Simple Mode product catalog comparison demo',
  description:
    'A SheetDiff use case video showing how to compare product catalogs in Google Sheets by SKU, highlight modified fields, find added and deleted products, and avoid false differences when supplier rows are reordered.',
  thumbnailUrl: 'https://i.ytimg.com/vi/9NITyMjfIdw/hqdefault.jpg',
  uploadDate: '2026-06-01T15:56:53-07:00',
  embedUrl: 'https://www.youtube-nocookie.com/embed/9NITyMjfIdw',
  // No contentUrl: Google defines it as a link to the video MEDIA FILE, not the watch
  // page. https://www.youtube.com/watch?v=... is a web page, so the property was invalid.
  // YouTube exposes no direct file URL, so embedUrl alone is the correct annotation.
}

export default async function SheetDiffPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  assertSupportedLocale(locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: getTranslations(locale).navigation?.links.home || 'Home', item: `https://www.mohamedyaakoubi.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'SheetDiff\u2122', item: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff` },
    ],
  }

  return (
    <>
      <script
        id="sheetdiff-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="sheetdiff-software-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        id="sheetdiff-simple-mode-video"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(simpleModeVideoJsonLd) }}
      />
      <SheetDiffClient />
    </>
  )
}
