import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import { PageTransition } from "@/components/PageTransition"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"
import type React from "react"

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main>
            <Navigation />
            <ThemeToggle />
            <PageTransition>{children}</PageTransition>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}