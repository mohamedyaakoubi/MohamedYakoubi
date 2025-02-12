import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from '@/context/language-context'
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "@/components/ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohamed Yaakoubi | Portfolio",
  description: "A passionate Emerging AI specialist with versatile background, offering expertise in machine learning, web development, and localization services.",
  keywords: [
    "Mohamed Yaakoubi",
    "AI Specialist",
    "Web Developer",
    "Machine Learning",
    "Full Stack Developer",
    "Tunisia",
    "AI annotation"
  ],
  authors: [{ name: "Mohamed Yaakoubi" }],
  creator: "Mohamed Yaakoubi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}