import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from '@/context/language-context'
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "@/components/ClientLayout"
import { SpeedInsights } from '@vercel/speed-insights/next'
import "./production-fixes.css" 
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
  title: "Mohamed Yaakoubi | Emerging AI and Technology Specialist",
  description: "Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at DeepL, RWS (Meta AI), Uber, and Volga Partners.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:title" content="Mohamed Yaakoubi | Emerging AI and Technology Specialist"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://mohamed-yakoubi.vercel.app/"/>
        <meta property="og:image" content="https://mohamed-yakoubi.vercel.app/profile.jpg"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="1200"/>
        <meta property="og:image:alt" content="Mohamed Yaakoubi - Emerging AI and Technology Specialist"/>
        <meta property="og:description" content="Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at DeepL, RWS (Meta AI), Uber, and Volga Partners."/>
        <meta property="og:site_name" content="Mohamed Yaakoubi"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:locale:alternate" content="fr_FR"/>
        <meta property="og:locale:alternate" content="ar_AR"/>
        <meta property="linkedin:author" content="Mohamed Yaakoubi"/>
        <meta property="linkedin:title" content="Emerging AI and Technology Specialist | Machine Translation Post-Editor at DeepL | Linguistic AI Evaluator | Localization Coordinator"/>
        <meta property="linkedin:description" content="Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at DeepL, RWS (Meta AI), Uber, and Volga Partners."/>
        <meta property="og:see_also" content="https://github.com/mohamedyaakoubi"/>
        <meta name="github:profile" content="mohamedyaakoubi"/>
        <meta name="github:card" content="summary"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@Mohamed0Yakoubi"/>
        <meta name="twitter:creator" content="@Mohamed0Yakoubi"/>
        <meta name="twitter:title" content="Mohamed Yaakoubi | Emerging AI and Technology Specialist"/>
        <meta name="twitter:description" content="Expert in AI/ML, web development, and localization services with expertise in Next.js, React, and machine learning technologies."/>
        <meta name="twitter:image" content="https://mohamed-yakoubi.vercel.app/profile.jpg"/>
        <meta name="twitter:label1" content="GitHub"/>
        <meta name="twitter:data1" content="@mohamedyaakoubi"/>
        <meta property="og:see_also" content="https://mohamedyaakoubi.link/"/>
        <meta name="gravatar:profile" content="mohamedyaakoubi"/>
        <meta name="msvalidate.01" content="567F2213DA2A1DE09D5C5ADF16CDE77B"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="sitemap" type="text/html" href="https://mohamed-yakoubi.vercel.app/sitemap" title="HTML Sitemap"/>
        <link rel="prefetch" href="/api/chat"/>
        <link rel="preload" href="/hero-light.webp" as="image" fetchPriority="high" type="image/webp"/>
        <link rel="preload" href="/sounds/light.mp3" as="audio" type="audio/mpeg"/>
        <style dangerouslySetInnerHTML={{__html: `
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
            
        `}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Person",
          "name": "Mohamed Yaakoubi",
          "url": "https://mohamed-yakoubi.vercel.app",
          "image": "https://mohamed-yakoubi.vercel.app/profile.jpg",
          "description": "Emerging AI and Technology Specialist with expertise in machine translation, AI evaluation, and web development",
          "sameAs": [
            "https://github.com/mohamedyaakoubi",
            "https://www.linkedin.com/in/yaakoubi-mohamed/",
            "https://www.upwork.com/freelancers/~0118c281163fef05cb",
            "https://www.fiverr.com/s/wkZqrpg",
            "https://www.instagram.com/mohamed__yaakoubi/",
            "https://www.proz.com/profile/3972649",
            "https://www.freelances.tn/freelance/mohamed-yaakoubi"
          ],
          "jobTitle": "Language Data and Quality Reviewer",
          "worksFor": [
            {
              "@type": "Organization",
              "name": "Volga Partners",
              "url": "https://volgapartners.com"
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
            "name": "Faculty of sciences in Sfax",
            "url":"https://fss.rnu.tn"
          },
          "knowsLanguage": ["Arabic", "English", "French", "German"],
          "knowsAbout": [
            "Machine Learning",
            "Web Development",
            "React", 
            "Next.js",
            "TypeScript",
            "Translation", 
            "Localization",
            "AI Annotation"
          ],
          "telephone": "+216 54711524",
          "email": "amirrak8@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sfax",
            "addressCountry": "Tunisia"
          }
        })}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
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
          "dateModified": "2025-02-12",
          "educationalCredentialAwarded": "Licentiate Degree in Computer Science",
          "teaches": [
            "Machine Learning",
            "Web Development",
            "Translation"
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
"workExperience": [
  {
    "@type": "WorkPosition",
    "name": "Linguistic Editor",
    "worksFor": {
      "@type": "Organization",
      "name": "DeepL"
    },
    "startDate": "2025-02",
    "jobDescription": "Evaluate and refine AI-generated Arabic-English translations for accuracy and fluency."
  },
  {
    "@type": "WorkPosition",
    "name": "Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI",
    "worksFor": {
      "@type": "Organization",
      "name": "RWS"
    },
    "startDate": "2024-11",
    "jobDescription": "Evaluate multilingual prompts and AI-generated responses in Arabic to refine advanced Large Language Models, including projects like Llama 4."
  },
  {
    "@type": "WorkPosition",
    "name": "Localization Vendor Coordinator",
    "worksFor": {
      "@type": "Organization",
      "name": "Uber (via Volga Partners)"
    },
    "startDate": "2024-07",
    "jobDescription": "Evaluate Arabic and English AI-generated content for linguistic and cultural accuracy."
  }
]
        })}}/>
      </head>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} ${inter.className} overflow-x-hidden max-w-full`}>
       
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
        <SpeedInsights/>
      </body>
    </html>
  );
}