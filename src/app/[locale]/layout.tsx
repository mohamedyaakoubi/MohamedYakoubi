import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/context/language-context'
import { ClientLayout } from '@/components/ClientLayout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

// Enhanced font configurations
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
  preload: true,
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
    en: 'Mohamed Yaakoubi | Emerging AI and Technology Specialist',
    fr: 'Mohamed Yaakoubi | Spécialiste émergent en IA et technologie', 
    ar: 'محمد يعقوبي | متخصص ناشئ في الذكاء الاصطناعي والتكنولوجيا'
  }
  
  const descriptions = {
    en: 'AI specialist with experience at DeepL, RWS (Meta AI), UbiAi, and Wirestock. Expert in machine translation, AI evaluation, and web development using React, Next.js, and Azure AI.',
    fr: 'Spécialiste en IA avec expérience chez DeepL, RWS (Meta AI), UbiAi et Wirestock. Expert en traduction automatique, évaluation IA et développement web avec React, Next.js et Azure AI.',
    ar: 'متخصص في الذكاء الاصطناعي مع خبرة في DeepL و RWS (Meta AI) و UbiAi و Wirestock. خبير في الترجمة الآلية وتقييم الذكاء الاصطناعي وتطوير الويب.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'AI specialist', 'machine translation', 'linguistic evaluator', 'web development',
      'React', 'Next.js', 'Azure AI', 'DeepL', 'Meta AI', 'Arabic English translation',
      'Mohamed Yaakoubi', 'Yaakoubi Mohamed', 'محمد يعقوبي', 'Mohamed Yakoubi',
      'freelance developer', 'AI data annotation', 'localization'
    ].join(', '),
    authors: [{ 
      name: 'Mohamed Yaakoubi',
      url: 'https://www.mohamedyaakoubi.live' 
    }],
    creator: 'Mohamed Yaakoubi',
    publisher: 'Mohamed Yaakoubi',
alternates: {
  canonical: `https://www.mohamedyaakoubi.live/${locale}`, // Always use localized URLs
  languages: {
    'en': 'https://www.mohamedyaakoubi.live/en',
    'fr': 'https://www.mohamedyaakoubi.live/fr', 
    'ar': 'https://www.mohamedyaakoubi.live/ar',
    'x-default': 'https://www.mohamedyaakoubi.live/en', // Default to English
  }
},
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/' 
        : `https://www.mohamedyaakoubi.live/${locale}`,
      siteName: 'Mohamed Yaakoubi',
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://www.mohamedyaakoubi.live/profile.jpg',
          width: 1200,
          height: 1200,
          alt: 'Mohamed Yaakoubi - Emerging AI and Technology Specialist',
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      site: '@Mohamed0Yakoubi',
      creator: '@Mohamed0Yakoubi',
      images: ['https://www.mohamedyaakoubi.live/profile.jpg'],
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
    verification: {
      google: '7RkYGVcLiInN-GqBR9z9vjQKFjwWo54z1BsU0vemYi4',
      other: {
        'msvalidate.01': '567F2213DA2A1DE09D5C5ADF16CDE77B',
      },
    },
    other: {
      'og:locale:alternate': ['en_US', 'fr_FR', 'ar_AR'],
      'linkedin:author': 'Mohamed Yaakoubi',
      'linkedin:title': 'Emerging AI and Technology Specialist | Video Metadata Writer at Wirestock | Technical Content Writer at UbiAi | Linguistic Editor at DeepL',
      'linkedin:description': 'Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at Wirestock, UbiAi, DeepL, RWS (Meta AI), and Uber.',
      'github:profile': 'mohamedyaakoubi',
      'github:card': 'summary',
      'gravatar:profile': 'mohamedyaakoubi',
    }
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
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  
  // Fix: Ensure consistent font class application
  const fontClasses = `${inter.variable} ${ibmPlexSansArabic.variable}`
  
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* Enhanced hreflang meta tags */}
        <link rel="alternate" hrefLang="en" href="https://www.mohamedyaakoubi.live/en" title="Mohamed Yaakoubi - English" />
        <link rel="alternate" hrefLang="fr" href="https://www.mohamedyaakoubi.live/fr" title="Mohamed Yaakoubi - Français" />
        <link rel="alternate" hrefLang="ar" href="https://www.mohamedyaakoubi.live/ar" title="محمد يعقوبي - العربية" />
        <link rel="alternate" hrefLang="x-default" href="https://www.mohamedyaakoubi.live/en" title="Mohamed Yaakoubi - Default" />
        
        {/* Preconnect and Preload Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/hero-light.webp" as="image" fetchPriority="high" type="image/webp" />
        <link rel="preload" href="/profile.jpg" as="image" fetchPriority="high" type="image/jpeg" />
        <link rel="preload" href="/sounds/light.mp3" as="audio" type="audio/mpeg" />
        <link rel="sitemap" type="application/xml" href="https://www.mohamedyaakoubi.live/sitemap.xml" title="XML Sitemap"/>
        
        {/* Language-specific author and name meta tags */}
        <meta name="author" content="Mohamed Yaakoubi" />
        <meta name="person:name" content="Mohamed Yaakoubi" />
        <meta name="person:alternate-name" content="Mohamed Yaakoubi" />
        <meta name="person:alternate-name" content="Yaakoubi Mohamed" />
        <meta name="person:alternate-name" content="محمد يعقوبي" />
        <meta name="person:alternate-name" content="Mohamed Yakoubi" />
        <meta name="person:alternate-name" content="Yakoubi Mohamed" />
        <meta name="person:alternate-name" content="Mohammed Yaakoubi" />
        <meta name="person:alternate-name" content="Mohammed Yakoubi" />

        {/* Cultural naming conventions */}
        <meta name="person:given-name" content={locale === 'ar' ? 'محمد' : 'Mohamed'} />
        <meta name="person:family-name" content={locale === 'ar' ? 'يعقوبي' : 'Yaakoubi'} />

        {/* Social media name variations */}
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content={locale === 'ar' ? 'محمد' : 'Mohamed'} />
        <meta property="profile:last_name" content={locale === 'ar' ? 'يعقوبي' : 'Yaakoubi'} />

        {/* Additional Meta Tags */}
        <meta property="og:locale:alternate" content="en_US"/>
        <meta property="og:locale:alternate" content="fr_FR"/>
        <meta property="og:locale:alternate" content="ar_AR"/>
        <meta property="linkedin:author" content="Mohamed Yaakoubi"/>
        <meta property="linkedin:title" content="Emerging AI and Technology Specialist | Video Metadata Writer at Wirestock | Technical Content Writer at UbiAi | Linguistic Editor at DeepL"/>
        <meta property="linkedin:description" content="Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at Wirestock, UbiAi, DeepL, RWS (Meta AI), and Uber."/>
        <meta property="og:see_also" content="https://github.com/mohamedyaakoubi"/>
        <meta property="og:see_also" content="https://mohamedyaakoubi.link/"/>
        <meta name="github:profile" content="mohamedyaakoubi"/>
        <meta name="github:card" content="summary"/>
        <meta name="twitter:label1" content="GitHub"/>
        <meta name="twitter:data1" content="@mohamedyaakoubi"/>
        <meta name="gravatar:profile" content="mohamedyaakoubi"/>

        {/* Enhanced Structured Data - Person Schema */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Person",
              "name": "Mohamed Yaakoubi",
              "alternateName": [
                "Yaakoubi Mohamed", 
                "محمد يعقوبي",
                "Mohamed Yakoubi",
                "Yakoubi Mohamed",
                "Mohammed Yaakoubi",
                "Mohammed Yakoubi"
              ],
              "url": "https://www.mohamedyaakoubi.live",
              "image": "https://www.mohamedyaakoubi.live/profile.jpg",
              "description": "Emerging AI and Technology Specialist with expertise in machine translation, AI evaluation, and web development",
              "jobTitle": [
                "Video Metadata Writer",
                "Technical Content Writer",
                "Linguistic Editor",
                "AI Evaluator"
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Wirestock",
                  "url": "https://wirestock.io"
                },
                {
                  "@type": "Organization", 
                  "name": "UbiAi",
                  "url": "https://ubiai.tools"
                },
                {
                  "@type": "Organization",
                  "name": "DeepL",
                  "url": "https://www.deepl.com"
                },
                {
                  "@type": "Organization",
                  "name": "RWS Group",
                  "url": "https://www.rws.com"
                },
                {
                  "@type": "Organization",
                  "name": "Uber (via Volga Partners)",
                  "url": "https://www.uber.com"
                }
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Faculty of Sciences in Sfax",
                "url": "https://fss.rnu.tn"
              },
              "knowsLanguage": ["Arabic", "English", "French", "German"],
              "knowsAbout": [
                "Machine Learning",
                "Artificial Intelligence", 
                "Web Development",
                "React",
                "Next.js",
                "TypeScript",
                "Translation",
                "Localization",
                "AI Data Annotation",
                "Natural Language Processing",
                "Azure AI",
                "Firebase"
              ],
              "telephone": "+216 54711524",
              "email": "amirrak8@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sfax",
                "addressCountry": "Tunisia"
              },
              "sameAs": [
                "https://github.com/mohamedyaakoubi",
                "https://www.linkedin.com/in/yaakoubi-mohamed/",
                "https://www.upwork.com/freelancers/~0118c281163fef05cb",
                "https://www.fiverr.com/s/wkZqrpg",
                "https://www.instagram.com/mohamed__yaakoubi/",
                "https://www.proz.com/profile/3972649",
                "https://www.freelances.tn/freelance/mohamed-yaakoubi",
                "https://www.f6s.com/mohamed-yaakoubi"
              ]
            })
          }}
        />
        
        {/* Enhanced Resume Schema */}
        <Script
          id="resume-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Resume",
              "alternateName": [
                "Mohamed Yaakoubi",
                "Yaakoubi Mohamed", 
                "محمد يعقوبي",
                "Mohamed Yakoubi",
                "Yakoubi Mohamed"
              ],
              "name": "Mohamed Yaakoubi's Professional Resume",
              "url": "https://www.mohamedyaakoubi.live",
              "description": "Professional resume of Mohamed Yaakoubi, Emerging AI and Technology Specialist with experience in AI/ML, localization, and web development",
              "about": {
                "@type": "Person",
                "name": "Mohamed Yaakoubi",
                "description": "Driven, adaptable AI specialist thriving on tackling complex challenges and acquiring new skills quickly",
                "jobTitle": "Emerging AI and Technology Specialist",
                "email": "amirrak8@gmail.com",
                "telephone": "+216 54711524",
                "image": "https://www.mohamedyaakoubi.live/profile.jpg",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Sfax",
                  "addressCountry": "Tunisia"
                },
                "url": "https://www.mohamedyaakoubi.live",
                "sameAs": [
                  "https://github.com/mohamedyaakoubi",
                  "https://www.linkedin.com/in/yaakoubi-mohamed/"
                ]
              },
              "workExperience": [
                {
                  "@type": "WorkPosition",
                  "name": "Video Metadata Writer",
                  "worksFor": { "@type": "Organization", "name": "Wirestock", "url": "https://wirestock.io" },
                  "startDate": "2025-04",
                  "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Sfax", "addressCountry": "Tunisia" } },
                  "description": "Write detailed and structured metadata for edited videos, segment descriptions, and content evaluation."
                },
                {
                  "@type": "WorkPosition",
                  "name": "Technical Content Writer",
                  "worksFor": { "@type": "Organization", "name": "UbiAi", "url": "https://ubiai.tools" },
                  "startDate": "2025-03",
                  "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Sfax", "addressCountry": "Tunisia" } },
                  "description": "Create technical blog content on LLM fine-tuning and NLP topics, perform website audits for UX and SEO."
                },
                {
                  "@type": "WorkPosition",
                  "name": "Linguistic Editor",
                  "worksFor": { "@type": "Organization", "name": "DeepL", "url": "https://www.deepl.com" },
                  "startDate": "2025-02",
                  "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Sfax", "addressCountry": "Tunisia" } },
                  "description": "Evaluate and refine AI-generated Arabic-English translations for accuracy and fluency."
                },
                {
                  "@type": "WorkPosition",
                  "name": "Linguistic AI Evaluator - Arabic Maghrebi QA",
                  "worksFor": { "@type": "Organization", "name": "RWS (Meta AI)", "url": "https://www.rws.com" },
                  "startDate": "2024-11",
                  "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Sfax", "addressCountry": "Tunisia" } },
                  "description": "Evaluate multilingual prompts and AI responses for LLMs like Llama 4."
                }
              ],
              "educationalCredentialAwarded": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Licentiate Degree in Computer Science",
                  "educationalLevel": "Bachelor",
                  "credentialCategory": "degree",
                  "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Faculty of sciences in Sfax" },
                  "startDate": "2024",
                  "endDate": "2027"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Integrated Preparatory Cycle in Computer Science",
                  "educationalLevel": "Some College",
                  "credentialCategory": "certificate",
                  "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Faculty of sciences in Sfax" },
                  "startDate": "2021",
                  "endDate": "2024"
                }
              ],
              "skills": [
                "Development & Scripting: HTML/CSS, Javascript",
                "Programming Languages: C, Python, Typescript",
                "Database: Firebase, SQL",
                "Version Control: Git, Github",
                "Tools: Visual Studio Code, CodeBlocks, Pyscripter",
                "AI & Machine Learning",
                "CAT: Smartcat, Amara",
                "Cloud Computing: Azure"
              ],
              "knowsLanguage": ["Arabic", "English", "French", "German"]
            })
          }}
        />
      </head>

      {/* Fix: Use consistent font classes and add suppressHydrationWarning */}
      <body className={fontClasses} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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