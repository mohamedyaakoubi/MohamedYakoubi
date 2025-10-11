import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './production-fixes.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
title: 'Mohamed Yaakoubi | AI & Language Technology Specialist Portfolio',
description: 'Explore the portfolio of Mohamed Yaakoubi, an AI and Language Technology Specialist showcasing projects in AI, evaluation, and localization.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}