import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffPricingClient from '@/components/SheetDiffPricingClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Pricing — SheetDiff™ | Compare, Diff & QA for Sheets',
    description: 'SheetDiff™ pricing plans: 7-day free trial, free tier with 50 rows and 10 comparisons/month, or unlimited access with SheetDiff™ Pro starting at $4.99/month.',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}/sheetdiff/pricing`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.com/en/sheetdiff/pricing',
        'fr': 'https://www.mohamedyaakoubi.com/fr/sheetdiff/pricing',
        'ar': 'https://www.mohamedyaakoubi.com/ar/sheetdiff/pricing',
        'x-default': 'https://www.mohamedyaakoubi.com/en/sheetdiff/pricing',
      },
    },
  }
}

export default function SheetDiffPricingPage() {
  return <SheetDiffPricingClient />
}
