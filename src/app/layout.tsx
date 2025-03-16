import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from '@/context/language-context'
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "@/components/ClientLayout"
import { IBM_Plex_Sans_Arabic } from "next/font/google"

// Configure fonts - Next.js will optimize these automatically
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-ibm-plex',
})

export const metadata: Metadata = {
  title: "Mohamed Yaakoubi | Emerging AI and Technology Specialist Portfolio",
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
        
        {/* Remove the problematic onLoad handler and use Next.js font optimization instead */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} ${inter.className}`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}