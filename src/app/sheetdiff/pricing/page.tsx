import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — SheetDiff™ | Compare, Diff & QA for Sheets',
  description: 'SheetDiff™ pricing plans: 7-day free trial, free tier with 50 rows and 10 comparisons/month, or unlimited access with SheetDiff™ Pro starting at $4.99/month.',
}

import SheetDiffPricingClient from '@/components/SheetDiffPricingClient'

export default function SheetDiffPricingPage() {
  return <SheetDiffPricingClient />
}
