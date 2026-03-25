import type { Metadata } from 'next'
import { getSupportedLocales } from '@/lib/translations'
import SheetDiffPricingClient from '@/components/SheetDiffPricingClient'

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Pricing — SheetDiff™ | Compare, Diff & QA for Sheets',
  description: 'SheetDiff™ pricing plans: 7-day free trial, free tier with 50 rows and 10 comparisons/month, or unlimited access with SheetDiff™ Pro starting at $4.99/month.',
}

export default function SheetDiffPricingPage() {
  return <SheetDiffPricingClient />
}
