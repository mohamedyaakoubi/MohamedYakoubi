import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SheetDiff™ — Compare, Diff & QA for Sheets | Google Sheets™ Add-on by Mohamed Yaakoubi',
  description: 'SheetDiff™ is a schema-agnostic Google Sheets™ add-on that compares spreadsheet versions and generates QA diff reports with color-coded output and quality metrics. 7-day free trial.',
}

import SheetDiffClient from '@/components/SheetDiffClient'

export default function SheetDiffPage() {
  return <SheetDiffClient />
}
