import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './production-fixes.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mohamed Yaakoubi | Portfolio',
  description: 'Portfolio of Mohamed Yaakoubi - AI and Technology Specialist',
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