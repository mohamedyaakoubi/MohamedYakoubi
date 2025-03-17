"use client"
import { useEffect } from 'react'
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { CompanyLogos } from "@/components/CompanyLogos"
import { Skills } from "@/components/Skills" 
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