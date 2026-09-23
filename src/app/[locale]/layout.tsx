import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/context/language-context'
import { ClientLayout } from '@/components/ClientLayout'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '@/components/Footer'

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-ibm-plex',
  preload: false,
  fallback: ['Arial', 'sans-serif']
})

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
    en: 'Mohamed Yaakoubi | AI Language Technology Specialist | Machine Translation Post-Editor | LLM Evaluator | Localization Coordinator',
    fr: 'Mohamed Yaakoubi | Spécialiste Technologie Linguistique IA | Post-Éditeur Traduction Automatique | Évaluateur LLM | Coordinateur Localisation', 
    ar: 'محمد يعقوبي | متخصص تكنولوجيا اللغة بالذكاء الاصطناعي | مراجع الترجمة الآلية | مقيم نماذج اللغة | منسق التوطين'
  }
  
  const descriptions = {
    en: 'Mohamed Yaakoubi: AI Language Technology Specialist at DATAmundi, Wirestock, DeepL, RWS (Meta AI), Uber, and UbiAi. Expert in AI quality assurance, Arabic-English machine translation post-editing, LLM evaluation (Llama 4), AI annotation, localization coordination, and multilingual content creation. 5+ years experience with 1.6M+ words translated.',
    fr: 'Mohamed Yaakoubi : Spécialiste en technologie linguistique IA chez DATAmundi, Wirestock, DeepL, RWS (Meta AI), Uber et UbiAi. Expert en assurance qualité IA, post-édition de traduction automatique arabe-anglais, évaluation de LLM (Llama 4), annotation IA et coordination de localisation. Plus de 1,6M de mots traduits.',
    ar: 'محمد يعقوبي: متخصص تكنولوجيا اللغة بالذكاء الاصطناعي في DATAmundi و Wirestock و DeepL و RWS (Meta AI) و Uber و UbiAi. خبير في ضمان جودة الذكاء الاصطناعي، مراجعة الترجمة الآلية عربي-إنجليزي، تقييم نماذج اللغة الكبيرة (Llama 4)، التعليق التوضيحي للذكاء الاصطناعي وتنسيق التوطين. أكثر من 1.6 مليون كلمة مترجمة.'
  }

  return {
    metadataBase: new URL('https://www.mohamedyaakoubi.com'),
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      // Core identity & brand
      'Mohamed Yaakoubi', 'محمد يعقوبي', 'Mohamed Yakoubi',
      
      // Primary services & expertise (what clients search for)
      'machine translation post-editor', 'LLM evaluator', 'AI language specialist',
      'Arabic English translator', 'localization coordinator', 'linguistic quality assurance',
      'video metadata writer', 'SEO metadata specialist', 'content moderator', 'AI annotator',
      'prompt evaluator', 'AI content evaluation', 'translation quality reviewer',
      'multilingual content writer', 'technical content writer',
      
      // Key current employers (for credibility & brand association)
      'DATAmundi External QA', 'data annotation quality auditor',
      'Wirestock metadata specialist', 'DeepL linguistic editor', 'Meta AI evaluator',
      'Uber localization coordinator', 'RWS linguistic evaluator', 'Llama 4 evaluator',
      'UbiAi technical writer', 'Unbabel post-editor', 'Volga Partners quality reviewer',
      
      // Specialized skills & services (your actual daily work)
      'Arabic Maghrebi dialect expert', 'prompt engineering', 'AI response ranking',
      'CAT tools specialist', 'Smartcat', 'Amara subtitling', 'multilingual QA',
      'data annotation services', 'dataset quality assurance', 'transcription services',
      'image annotation', 'video content evaluation', 'media quality assessment',
      
      // Service offerings for freelance clients
      'freelance translator Arabic English', 'localization services', 'resume writing services',
      'career coaching', 'web development services', 'AI consultation',
      'technical support services', 'educational consulting',
      
      // Tech stack (secondary - for project credibility)
      'React developer', 'Next.js', 'Firebase', 'TypeScript', 'Azure AI', 'WordPress',
      
      // Geographic & language targeting
      'Sfax Tunisia', 'Tunisia freelancer', 'Arabic English French trilingual',
      'remote AI specialist', 'North Africa localization expert'
    ].join(', '),
    authors: [{ 
      name: 'Mohamed Yaakoubi',
      url: `https://www.mohamedyaakoubi.com/${locale}`
    }],
    creator: 'Mohamed Yaakoubi',
    publisher: 'Mohamed Yaakoubi',
    applicationName: 'Mohamed Yaakoubi Portfolio',
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://www.mohamedyaakoubi.com/${locale}`,
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'profile',
      // No images here: every route ships its own 1200x630 card via an opengraph-image.tsx
      // file, and Next.js uses it for twitter:image too. The old default, profile.jpg, is a
      // 963x1280 portrait that social platforms crop badly in large-image cards.
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      site: '@Mohamed0Yakoubi',
      creator: '@Mohamed0Yakoubi',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'lsgC7s3-ZPP7PrwkW1TntzfjbmfGCHCl8sTS4EvVqIY',
      other: {
        'msvalidate.01': '567F2213DA2A1DE09D5C5ADF16CDE77B',
        'yandex-verification': '343cfebbc5470b37',
        'seznam-wmt': 'FGc8Y2lVQaYWgB32AOVXa87EUd4xiOAW',
      },
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
  const { locale: rawLocale } = await params
  // Normalize invalid locales to 'en' so the layout renders correctly. Rejecting them is
  // each PAGE's job: every page under [locale] must call assertSupportedLocale() (from
  // @/lib/translations), or /<anything>/<route> serves that page with HTTP 200 and a
  // self-referencing canonical. Don't reject here instead: a layout's notFound() is caught
  // above this layout, and `dynamicParams = false` was tried and served the bare root 404
  // (no header/navigation) for single-segment URLs like /about.
  const locale = ['en', 'fr', 'ar'].includes(rawLocale) ? rawLocale : 'en'
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const fontClasses = `${inter.variable} ${ibmPlexSansArabic.variable}`
  
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* 
          Hreflang is set per-page via metadata.alternates.languages in each page's
          generateMetadata(). Do NOT add hardcoded root-only hreflang here — it would
          override page-specific alternates and send wrong cross-locale signals to crawlers.
        */}
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="https://www.mohamedyaakoubi.com/sitemap.xml" />

        {/* Framer Motion server-renders entrance animations as inline opacity:0 and reveals them
            only after hydration, so with JavaScript disabled most page content stayed invisible.
            <noscript> content is inert whenever scripting is enabled, so animations are unchanged.
            The selectors match only animation start states (not e.g. opacity:0.08 decoration). */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<style>[style^="opacity:0;transform"],[style="opacity:0"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
      </head>

      <body className={fontClasses} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <LanguageProvider initialLanguage={locale}>
            <ClientLayout footer={<Footer locale={locale} />}>
              {children}
            </ClientLayout>
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
