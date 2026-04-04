import type { Metadata } from 'next'
import Script from 'next/script'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffClient from '@/components/SheetDiffClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

const MARKETPLACE_URL =
  'https://workspace.google.com/marketplace/app/sheetdiff_%E2%80%94_compare_diff_qa_for_sheets/51917286120'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const title = 'SheetDiff\u2122 \u2014 Compare Google Sheets\u2122 | Spreadsheet Diff & QA Add-on'
  const description =
    'Compare two Google Sheets\u2122 versions and detect every change \u2014 modified, split, merged, added & deleted rows. Color-coded diff reports with WER/CER/SER metrics. Used by transcription and localization teams. Free 7-day trial, no credit card required.'

  return {
    title,
    description,
    keywords: [
      'google sheets diff',
      'compare google sheets',
      'compare two google sheets',
      'spreadsheet comparison tool',
      'google sheets add-on',
      'localization QA',
      'transcription QA',
      'subtitle diff tool',
      'WER CER SER metrics',
      'spreadsheet version control',
      'data quality assurance',
      'google sheets compare versions',
      'detect changes in google sheets',
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
    'SheetDiff\u2122 compares two versions of any Google Sheets\u2122 spreadsheet and generates a color-coded diff report \u2014 detecting modified, split, merged, added, and deleted rows. Includes WER/CER/SER quality metrics, inline character diffs, duplicate finder, and multi-script normalization.',
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
    'Structural Diff \u2014 detect modified, split, merged, added, deleted rows',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the 7-day trial work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you first install SheetDiff\u2122, you get 7 days of full, unlimited access \u2014 no credit card required. After the trial, you can continue using SheetDiff\u2122 for free (50 rows, 10 comparisons/month) or upgrade to Pro.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my spreadsheet data safe and private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Your spreadsheet data never leaves Google Sheets\u2122. The only data sent externally is your Google account email for license verification. No cell content, row data, or file contents are ever transmitted to outside servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What comparison modes does SheetDiff\u2122 support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SheetDiff\u2122 includes three comparison modes: Structural Diff (row-level with split/merge detection), Cell-by-Cell Comparison (granular column-aligned diff), and Duplicate Finder (detect duplicate rows within a sheet). Each mode has independent settings and custom transform rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can SheetDiff\u2122 handle large datasets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "SheetDiff\u2122 includes a chunked execution engine that processes large datasets in time-budgeted batches, bypassing Google Apps Script's 6-minute execution limit. Datasets with 100,000+ rows are supported.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the refund policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We offer a 14-day refund policy for all purchases. Contact amirrak8@gmail.com and we'll process your refund within 5\u201310 business days.",
      },
    },
  ],
}

export default function SheetDiffPage() {
  return (
    <>
      <Script
        id="sheetdiff-software-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Script
        id="sheetdiff-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SheetDiffClient />
    </>
  )
}
