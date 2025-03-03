"use client"

import { useEffect } from 'react'
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { useLanguage } from '@/context/language-context'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])
  
  return (
    <main className={language === 'ar' ? 'rtl' : 'ltr'}>
      <section id="home" className="min-h-screen">
        <Hero />
      </section>
      <section id="about" className="min-h-screen">
        <About />
      </section>
    </main>
  )
}
// Update the existing JsonLd component
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mohamed Yaakoubi",
          url: "https://mohamed-yakoubi.vercel.app/",
          jobTitle: "Emerging AI and Technology Specialist",
          knowsAbout: ["Machine Learning", "Web Development", "React", "Next.js", "Typescript", "Translation", "Localization", "AI Annotation"],
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic.jpg-ZVOn8cZhvmsJOsRLossXo8UgDkmffp.jpeg",
          description: "A passionate Emerging AI specialist with versatile background",
          alumniOf: "Faculty of sciecnes in Sfax", // Add your education details
          worksFor: {
            "@type": "Organization",
            name: "DeepL" // If applicable
          },
          skills: ["AI", "React", "Next.js", "TypeScript", "Machine Learning", "Localization"], 
          sameAs: [
            "https://github.com/mohamedyaakoubi",
            "https://linkedin.com/in/yaakoubi-mohamed"
          ]
        })
      }}
    />
  );
}