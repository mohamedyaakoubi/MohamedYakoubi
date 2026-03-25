import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffClient from '@/components/SheetDiffClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'SheetDiff\u2122 \u2014 Compare, QA for Sheets | Google Sheets\u2122 Add-on by Mohamed Yaakoubi',
    description: 'SheetDiff\u2122 is a schema-agnostic Google Sheets\u2122 add-on that compares spreadsheet versions and generates QA diff reports with color-coded output and quality metrics. 7-day free trial.',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/sheetdiff',
        'fr': 'https://www.mohamedyaakoubi.com/fr/sheetdiff',
        'ar': 'https://www.mohamedyaakoubi.com/ar/sheetdiff',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff',
      },
    },
    openGraph: {
      title: 'SheetDiff\u2122 \u2014 Compare, QA for Sheets | Google Sheets\u2122 Add-on by Mohamed Yaakoubi',
      description: 'SheetDiff™ is a schema-agnostic Google Sheets™ add-on that compares spreadsheet versions and generates QA diff reports with color-coded output and quality metrics. 7-day free trial.',
      url: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff`,
      type: 'website',
    },
  }
}

export default function SheetDiffPage() {
  return <SheetDiffClient />
}
