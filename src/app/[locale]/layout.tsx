import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/context/language-context'
import { ClientLayout } from '@/components/ClientLayout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
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
    en: 'Mohamed Yaakoubi | AI Language Technology Specialist | Machine Translation Post-Editor | LLM Evaluator | Localization Coordinator',
    fr: 'Mohamed Yaakoubi | Spécialiste Technologie Linguistique IA | Post-Éditeur Traduction Automatique | Évaluateur LLM | Coordinateur Localisation', 
    ar: 'محمد يعقوبي | متخصص تكنولوجيا اللغة بالذكاء الاصطناعي | مراجع الترجمة الآلية | مقيم نماذج اللغة | منسق التوطين'
  }
  
  const descriptions = {
    en: 'Mohamed Yaakoubi: AI Language Technology Specialist at Wirestock, DeepL, RWS (Meta AI), Uber, and UbiAi. Expert in Arabic-English machine translation post-editing, LLM evaluation (Llama 4), AI annotation, localization coordination, and multilingual content creation. 5+ years experience with 1.6M+ words translated.',
    fr: 'Mohamed Yaakoubi : Spécialiste en technologie linguistique IA chez Wirestock, DeepL, RWS (Meta AI), Uber et UbiAi. Expert en post-édition de traduction automatique arabe-anglais, évaluation de LLM (Llama 4), annotation IA et coordination de localisation. Plus de 1,6M de mots traduits.',
    ar: 'محمد يعقوبي: متخصص تكنولوجيا اللغة بالذكاء الاصطناعي في Wirestock و DeepL و RWS (Meta AI) و Uber و UbiAi. خبير في مراجعة الترجمة الآلية عربي-إنجليزي، تقييم نماذج اللغة الكبيرة (Llama 4)، التعليق التوضيحي للذكاء الاصطناعي وتنسيق التوطين. أكثر من 1.6 مليون كلمة مترجمة.'
  }

  return {
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
      url: 'https://www.mohamedyaakoubi.live' 
    }],
    creator: 'Mohamed Yaakoubi',
    publisher: 'Mohamed Yaakoubi',
    applicationName: 'Mohamed Yaakoubi Portfolio',
    alternates: {
      canonical: `https://www.mohamedyaakoubi.live/${locale}`,
      languages: {
        'en': 'https://www.mohamedyaakoubi.live/en',
        'fr': 'https://www.mohamedyaakoubi.live/fr', 
        'ar': 'https://www.mohamedyaakoubi.live/ar',
        'x-default': 'https://www.mohamedyaakoubi.live/en',
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://www.mohamedyaakoubi.live/${locale}`,
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'profile',
      images: [
        {
          url: 'https://www.mohamedyaakoubi.live/profile.jpg',
          width: 1200,
          height: 630,
          alt: 'Mohamed Yaakoubi - AI Language Technology Specialist specializing in Machine Translation, LLM Evaluation, and Localization',
          type: 'image/jpeg',
          // OG Image Best Practices 2025: 1200x630px, <1MB, JPEG/PNG/WebP, <20% text overlay
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
      google: '7RkYGVcLiInN-GqBR9z9vjQKFjwWo54z1BsU0vemYi4',
      other: {
        'msvalidate.01': '567F2213DA2A1DE09D5C5ADF16CDE77B',
        'yandex-verification': '86d3754b6e757e9e',
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
  const { locale } = await params
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const fontClasses = `${inter.variable} ${ibmPlexSansArabic.variable}`
  
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* 
          Hreflang tags for homepage - child pages inherit these but override via their own metadata.alternates 
          This ensures proper language targeting for international SEO (Google, Bing, Yandex)
        */}
        <link rel="alternate" hrefLang="en" href="https://www.mohamedyaakoubi.live/en" />
        <link rel="alternate" hrefLang="fr" href="https://www.mohamedyaakoubi.live/fr" />
        <link rel="alternate" hrefLang="ar" href="https://www.mohamedyaakoubi.live/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://www.mohamedyaakoubi.live/en" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="preload" href="/hero-light.webp" as="image" fetchPriority="high" type="image/webp" />
        <link rel="preload" href="/profile.jpg" as="image" fetchPriority="high" type="image/jpeg" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="https://www.mohamedyaakoubi.live/sitemap.xml" />

        {/* Enhanced Person Schema with accurate current roles */}
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohamed Yaakoubi",
              "givenName": "Mohamed",
              "familyName": "Yaakoubi",
              "alternateName": ["Yaakoubi Mohamed", "محمد يعقوبي", "Mohamed Yakoubi"],
              "url": "https://www.mohamedyaakoubi.live",
              "image": {
                "@type": "ImageObject",
                "url": "https://www.mohamedyaakoubi.live/profile.jpg",
                "width": 1200,
                "height": 630
              },
              "description": "Freelance AI Language Technology Specialist with expertise in machine translation post-editing, LLM evaluation, AI annotation, and localization coordination. Currently working with multiple companies: Wirestock (Media Content & Metadata Specialist), DeepL (Linguistic Editor), RWS/Meta AI (Linguistic AI Evaluator), Uber/Volga Partners (Localization Coordinator & Quality Reviewer), and UbiAi (Technical Content Writer).",
              "jobTitle": ["AI Language Technology Specialist", "Machine Translation Post-Editor", "LLM Evaluator", "Localization Coordinator", "AI Annotator"],
              "hasOccupation": [
                {
                  "@type": "Occupation",
                  "name": "Media Content & Metadata Specialist",
                  "occupationLocation": {
                    "@type": "Place",
                    "name": "Wirestock"
                  },
                  "skills": ["Metadata Writing", "SEO Keywords", "Content Moderation", "Video Evaluation", "AI Image Ranking", "Content Review", "Media Evaluation"]
                },
                {
                  "@type": "Occupation",
                  "name": "Linguistic AI Evaluator",
                  "occupationLocation": {
                    "@type": "Place",
                    "name": "RWS Group (Meta AI)"
                  },
                  "skills": ["LLM Evaluation", "Llama 4", "Arabic Maghrebi QA", "Prompt Engineering", "AI Response Ranking"]
                },
                {
                  "@type": "Occupation",
                  "name": "Localization Vendor Coordinator",
                  "occupationLocation": {
                    "@type": "Place",
                    "name": "Uber (via Volga Partners)"
                  },
                  "skills": ["AI Content Evaluation", "Arabic-English Translation", "Transcription", "Data Labeling", "Quality Assurance"]
                },
                {
                  "@type": "Occupation",
                  "name": "Technical Content Writer",
                  "occupationLocation": {
                    "@type": "Place",
                    "name": "UbiAi"
                  },
                  "skills": ["Technical Writing", "LLM Fine-tuning", "NLP Content", "SEO Audits", "WordPress"]
                },
                {
                  "@type": "Occupation",
                  "name": "Linguistic Editor",
                  "occupationLocation": {
                    "@type": "Place",
                    "name": "DeepL"
                  },
                  "skills": ["Machine Translation Post-Editing", "Arabic-English QA", "Translation Quality Assessment"]
                },
                {
                  "@type": "Occupation",
                  "name": "Freelance Editor",
                  "occupationLocation": {
                    "@type": "Place",
                    "name": "Unbabel"
                  },
                  "skills": ["Post-Editing", "CAT Tools", "Arabic-English Translation", "Localization"]
                }
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Wirestock",
                  "url": "https://wirestock.io",
                  "sameAs": "https://wirestock.io",
                  "description": "Full-time Video Metadata Writer creating structured metadata, SEO-optimized captions, and quality assessments for visual media content"
                },
                {
                  "@type": "Organization",
                  "name": "RWS Group",
                  "url": "https://www.rws.com",
                  "sameAs": "https://www.rws.com",
                  "description": "Linguistic AI Evaluator for Meta AI projects, evaluating Arabic Maghrebi prompts and responses for Llama 4 LLM refinement"
                },
                {
                  "@type": "Organization",
                  "name": "Uber",
                  "url": "https://www.uber.com",
                  "sameAs": "https://www.uber.com",
                  "description": "Localization Vendor Coordinator via Volga Partners, specializing in Arabic-English AI content evaluation and translation quality assurance"
                },
                {
                  "@type": "Organization",
                  "name": "Volga Partners",
                  "description": "Language Data and Quality Reviewer conducting comprehensive quality evaluations for Generative AI and Large Language Models"
                },
                {
                  "@type": "Organization",
                  "name": "UbiAi",
                  "url": "https://ubiai.tools",
                  "sameAs": "https://ubiai.tools",
                  "description": "Technical Content Writer creating AI-focused tutorials on LLM fine-tuning, NLP topics, and performing SEO audits for annotation platform"
                },
                {
                  "@type": "Organization",
                  "name": "DeepL",
                  "url": "https://www.deepl.com",
                  "sameAs": "https://www.deepl.com",
                  "description": "Linguistic Editor evaluating and refining AI-generated Arabic-English translations for machine translation quality improvement"
                },
                {
                  "@type": "Organization",
                  "name": "Unbabel",
                  "url": "https://unbabel.com",
                  "sameAs": "https://unbabel.com",
                  "description": "Freelance Editor with 1.6M+ words translated across 8,000+ Arabic-English tasks since 2020"
                }
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Faculty of Sciences in Sfax",
                "location": {
                  "@type": "Place",
                  "name": "Sfax, Tunisia"
                }
              },
              "knowsLanguage": [
                {
                  "@type": "Language",
                  "name": "Arabic",
                  "alternateName": "العربية"
                },
                {
                  "@type": "Language",
                  "name": "English"
                },
                {
                  "@type": "Language",
                  "name": "French",
                  "alternateName": "Français"
                },
                {
                  "@type": "Language",
                  "name": "German",
                  "alternateName": "Deutsch"
                }
              ],
              "knowsAbout": [
                "Machine Translation",
                "Post-Editing",
                "LLM Evaluation",
                "AI Annotation",
                "Localization",
                "Natural Language Processing",
                "Arabic-English Translation",
                "Maghrebi Arabic Dialect",
                "Prompt Engineering",
                "Multilingual Quality Assurance",
                "Content Moderation",
                "SEO Metadata",
                "Video Content Evaluation",
                "Technical Writing",
                "React",
                "Next.js",
                "TypeScript",
                "Firebase",
                "Azure AI"
              ],
              "email": "amirrak8@gmail.com",
              "telephone": "+216-54711524",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sfax",
                "addressRegion": "Sfax Governorate",
                "addressCountry": "TN"
              },
              "sameAs": [
                "https://www.linkedin.com/in/yaakoubi-mohamed/",
                "https://github.com/mohamedyaakoubi",
                "https://twitter.com/Mohamed0Yakoubi",
                "https://www.upwork.com/freelancers/~0118c281163fef05cb",
                "https://www.fiverr.com/mohamedyaakoubi",
                "https://www.proz.com/profile/3972649",
                "https://ubiai.tools/author/mohamedyaakoubi/",
                "https://www.freelances.tn/freelance/mohamed-yaakoubi",
                "https://www.f6s.com/mohamed-yaakoubi"
              ],
              "workExample": [
                {
                  "@type": "CreativeWork",
                  "name": "Technical AI Content Writing",
                  "url": "https://ubiai.tools/author/mohamedyaakoubi/",
                  "description": "Technical blog posts and tutorials on LLM fine-tuning, NLP, and AI topics for UbiAi platform",
                  "author": {
                    "@type": "Person",
                    "name": "Mohamed Yaakoubi"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Potential - AI-Powered Search Engine",
                  "url": "https://tariff-mu.vercel.app/",
                  "applicationCategory": "SearchApplication",
                  "description": "AI search engine for Abu Dhabi Open Data Platform built with Next.js, NLP, and real-time API indexing",
                  "operatingSystem": "Web Browser",
                  "author": {
                    "@type": "Person",
                    "name": "Mohamed Yaakoubi"
                  }
                },
                {
                  "@type": "WebApplication",
                  "name": "NotYet - Career Guidance Platform",
                  "applicationCategory": "EducationalApplication",
                  "description": "AI-powered CV analysis and career advice platform for Tunisian students built with React, Firebase, and Azure AI",
                  "operatingSystem": "Web Browser",
                  "author": {
                    "@type": "Person",
                    "name": "Mohamed Yaakoubi"
                  }
                },
                {
                  "@type": "WebApplication",
                  "name": "DocuMed - Healthcare Management System",
                  "applicationCategory": "MedicalApplication",
                  "description": "Medical web application for streamlining healthcare resource access and patient management, built with React and Firebase",
                  "operatingSystem": "Web Browser",
                  "author": {
                    "@type": "Person",
                    "name": "Mohamed Yaakoubi"
                  }
                },
                {
                  "@type": "WebApplication",
                  "name": "InternationalSkills.fi Recruiting System",
                  "applicationCategory": "BusinessApplication",
                  "description": "Job application portal with candidate tracking, automated interview scheduling, AI scoring, and admin dashboard",
                  "operatingSystem": "Web Browser",
                  "author": {
                    "@type": "Person",
                    "name": "Mohamed Yaakoubi"
                  }
                }
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Training in Artificial Intelligence and Machine Learning",
                  "credentialCategory": "certificate",
                  "educationalLevel": "Professional Training",
                  "recognizedBy": {
                    "@type": "EducationalOrganization",
                    "name": "Virtual University of Tunis"
                  },
                  "dateCreated": "2024-12",
                  "credentialID": "NjUxNDAzMjk3LjY",
                  "about": "Machine Learning (Classification, Regression), Deep Learning, GANs, NLP with Azure AI, Computer Vision, Knowledge Mining, Quantum AI, and Ethical AI. Score: 87.33%"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "EF SET English Certificate C1 Advanced",
                  "credentialCategory": "certificate",
                  "educationalLevel": "C1 Advanced (CEFR)",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "EF SET"
                  },
                  "dateCreated": "2024-09",
                  "about": "Score: 62/100 (C1 Advanced level on the CEFR scale)"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Certificate of Completion - Fullstack Development",
                  "credentialCategory": "certificate",
                  "educationalLevel": "Professional Bootcamp",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "MentorNations"
                  },
                  "dateCreated": "2024-08",
                  "about": "Fullstack development bootcamp covering React, TypeScript, Firebase, DevOps, and project-based collaboration"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "IBM Artificial Intelligence Fundamentals",
                  "credentialCategory": "certificate",
                  "educationalLevel": "Professional Certificate"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Cisco Networking Basics",
                  "credentialCategory": "certificate"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Cisco Introduction to Cybersecurity",
                  "credentialCategory": "certificate"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "3D Printing Training",
                  "credentialCategory": "certificate",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "American Corner Tunis / US Embassy"
                  }
                }
              ],
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "TED Translators",
                  "url": "https://www.ted.com/participate/translate"
                }
              ]
            })
          }}
        />

        {/* BreadcrumbList Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": `https://www.mohamedyaakoubi.live/${locale}`
                }
              ]
            })
          }}
        />

        {/* WebSite Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mohamed Yaakoubi Portfolio",
              "alternateName": "Mohamed Yaakoubi - AI Language Technology Specialist",
              "url": "https://www.mohamedyaakoubi.live",
              "description": "Professional portfolio of Mohamed Yaakoubi, AI Language Technology Specialist specializing in machine translation, LLM evaluation, and localization",
              "inLanguage": ["en", "fr", "ar"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.mohamedyaakoubi.live/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>

      <body className={fontClasses} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLanguage={locale}>
            <ClientLayout footer={<Footer locale={locale} />}>
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