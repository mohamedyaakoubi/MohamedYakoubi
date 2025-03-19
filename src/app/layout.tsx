import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from '@/context/language-context'
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "@/components/ClientLayout"
import { SpeedInsights } from '@vercel/speed-insights/next'
import "./production-fixes.css" 
import { StaticSEO } from '@/components/StaticSEO'
import { StaticHome } from '@/components/StaticHome' 

// Simplify font configurations
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

// Define viewport separately
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

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamed-yakoubi.vercel.app'),
  title: "Mohamed Yaakoubi | Emerging AI and Technology Specialist",
  description: "Expert in AI/ML, web development, and localization services. View my projects, services and experience in AI, React, Next.js and more.",
  keywords: [
    "Mohamed Yaakoubi",
    "AI Specialist",
    "Web Developer",
    "Machine Learning",
    "Full Stack Developer",
    "Tunisia",
    "AI annotation",
    "React developer",
    "Next.js portfolio"
  ],
  authors: [{ name: "Mohamed Yaakoubi" }],
  creator: "Mohamed Yaakoubi",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohamed-yakoubi.vercel.app/',
    siteName: 'Mohamed Yaakoubi Portfolio',
    title: 'Mohamed Yaakoubi | Emerging AI Specialist',
    description: 'Expert in AI/ML, web development, and localization services with expertise in Next.js, React, and machine learning technologies.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mohamed Yaakoubi - Emerging AI Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mohamed0Yakoubi',
    creator: '@Mohamed0Yakoubi',
    title: 'Mohamed Yaakoubi | Emerging AI and Technology Specialist',
    description: 'Expert in AI/ML, web development, and localization services with expertise in Next.js, React, and machine learning technologies.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg'
    ]
  },
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/',
    languages: {
      'en': 'https://mohamed-yakoubi.vercel.app/',
      'fr': 'https://mohamed-yakoubi.vercel.app/',
      'ar': 'https://mohamed-yakoubi.vercel.app/',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '7RkYGVcLiInN-GqBR9z9vjQKFjwWo54z1BsU0vemYi4', // Add your verification ID if you have one
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Moved viewport meta to viewport export above */}
        <meta property="linkedin:author" content="Mohamed Yaakoubi" />
        <meta property="linkedin:title" content="Emerging AI and Technology Specialist | Machine Translation Post-Editor at Unbabel | AI Annotator & Evaluator | Localization Vendor Coordinator at Uber | Language Data and Quality Reviewer at Volga Partners" />
        <meta property="linkedin:description" content="Driven, adaptable, and passionate about advancing technology, I am a fast learner who thrives on tackling complex challenges and acquiring new skills quickly. With hands-on experience in AI, web development, and localization, I seek opportunities that foster innovation and personal growth. I am dedicated to leveraging my technical and problem-solving abilities to create solutions that make a meaningful difference. Eager to join collaborative environments, I aim to contribute effectively and grow alongside motivated teams." />
        <meta property="og:see_also" content="https://github.com/mohamedyaakoubi" />
        <meta name="github:profile" content="mohamedyaakoubi" />
        <meta name="github:card" content="summary" />
        <meta name="twitter:label1" content="GitHub" />
        <meta name="twitter:data1" content="@mohamedyaakoubi" />
        <meta property="og:see_also" content="https://mohamedyaakoubi.link/" />
        <meta name="gravatar:profile" content="mohamedyaakoubi" />
        <meta name="msvalidate.01" content="567F2213DA2A1DE09D5C5ADF16CDE77B" />
        {/* Font optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" href="https://mohamed-yakoubi.vercel.app/sitemap" title="HTML Sitemap" />
        {/* Prefetch important routes */}
        <link rel="prefetch" href="/api/chat" />
  
        {/* Preload critical assets with optimized attributes */}
        <link 
          rel="preload" 
          href="/hero-light.webp" 
          as="image" 
          fetchPriority="high"
          type="image/webp" 
        />
        {/* Preload sound file for theme toggle */}
        <link 
          rel="preload" 
          href="/sounds/light.mp3" 
          as="audio" 
          type="audio/mpeg" 
        />

{/* Add this critical CSS inline */}
<style dangerouslySetInnerHTML={{ __html: `
    /* Preload critical styles for hero headline */
    #hero-headline {
      font-family: ${inter.style.fontFamily};
      font-display: swap;
      content-visibility: auto;
      contain-intrinsic-size: auto;
    }
    
    /* Ensure gradient works without JS */
    .gradient-name {
      background-image: linear-gradient(to right, #3b82f6, #8b5cf6) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      color: transparent !important;
      font-weight: 700 !important;
      line-height: 1.4 !important;
      /* Optimize font rendering */
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }

    /* Ensure the hero content is visible immediately */
    section#home .relative.z-20.text-center.px-6 {
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Force hardware acceleration for critical elements */
    #hero-headline, .gradient-name {
      transform: translateZ(0);
    }
  `}} />
       {/* Adding structured data for better SEO */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mohamed Yaakoubi",
      "url": "https://mohamed-yakoubi.vercel.app/",
      "jobTitle": "Emerging AI and Technology Specialist",
      "knowsAbout": ["Machine Learning", "Web Development", "React", "Next.js", "Typescript", "Translation", "Localization", "AI Annotation"],
      "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg",
      "description": "A passionate Emerging AI specialist with versatile background",
      "alumniOf": "Faculty of sciecnes in Sfax",
      "worksFor": {
        "@type": "Organization",
        "name": "DeepL"
      },
      "sameAs": [
        "https://github.com/mohamedyaakoubi",
        "https://linkedin.com/in/yaakoubi-mohamed",
        "https://x.com/Mohamed0Yakoubi",
        "https://mohamedyaakoubi.link/",
        "https://www.upwork.com/freelancers/~0118c281163fef05cb",
        "https://www.instagram.com/mohamed__yaakoubi/",
        "https://www.freelances.tn/freelance/mohamed-yaakoubi",
        "https://www.buymeacoffee.com/medykb",
        "https://www.fiverr.com/s/wkZqrpg",
        "https://www.proz.com/profile/3972649"
      ]
    })
  }}
/>

{/* Add CV/Resume structured data */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "DigitalDocument",
      "name": "Mohamed Yaakoubi's CV",
      "description": "Professional resume of Mohamed Yaakoubi, Emerging AI and Technology Specialist",
      "encodingFormat": "application/pdf",
      "about": {
        "@type": "Person",
        "name": "Mohamed Yaakoubi"
      },
      "url": "https://mohamed-yakoubi.vercel.app/Mohamed_Yaakoubi.pdf",
      "dateModified": "2025-02-12"
    })
  }}
/>
      </head>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} ${inter.className} overflow-x-hidden max-w-full`}>
      <StaticSEO />
      <StaticHome />
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}