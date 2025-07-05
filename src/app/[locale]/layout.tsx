import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/context/language-context'
import { ClientLayout } from '@/components/ClientLayout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import '../production-fixes.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'Mohamed Yaakoubi | Emerging AI and Technology Specialist',
    fr: 'Mohamed Yaakoubi | Spécialiste émergent en IA et technologie',
    ar: 'محمد يعقوبي | متخصص ناشئ في الذكاء الاصطناعي والتكنولوجيا'
  }
  
  const descriptions = {
    en: 'Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at DeepL, RWS (Meta AI), Uber, and Volga Partners.',
    fr: 'Spécialiste en IA motivé et adaptable avec une expertise en traductions, localisation et solutions technologiques. Expérience chez DeepL, RWS (Meta AI), Uber et Volga Partners.',
    ar: 'متخصص في الذكاء الاصطناعي مدفوع ومتكيف مع خبرة في الترجمة والتوطين والحلول التقنية. خبرة في DeepL و RWS (Meta AI) و Uber و Volga Partners.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://mohamed-yakoubi.vercel.app/${locale === 'en' ? '' : locale}`,
      languages: {
        'en': 'https://mohamed-yakoubi.vercel.app/',
        'fr': 'https://mohamed-yakoubi.vercel.app/fr',
        'ar': 'https://mohamed-yakoubi.vercel.app/ar',
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://mohamed-yakoubi.vercel.app/${locale === 'en' ? '' : locale}`,
      siteName: 'Mohamed Yaakoubi Portfolio',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLanguage={locale}>
            <ClientLayout>
              {children}
            </ClientLayout>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

