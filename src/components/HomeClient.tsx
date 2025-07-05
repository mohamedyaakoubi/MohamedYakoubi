"use client"
import { useEffect } from 'react'
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { CompanyLogos } from "@/components/CompanyLogos"
import { Skills } from "@/components/Skills" 
import { useSearchParams } from 'next/navigation'

interface HomeClientProps {
  locale: string
  translations: any
}

export default function HomeClient({ locale, translations }: HomeClientProps) {
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
    <main className={locale === 'ar' ? 'rtl' : 'ltr'}>
      <section id="home" className="min-h-screen">
        <Hero />
      </section>
      
      {/* About section */}
      <section id="about">
        <About />
      </section>
      
      {/* Companies section between About and Skills */}
      <CompanyLogos />
      
      {/* Skills section */}
      <Skills />
    </main>
  )
}

