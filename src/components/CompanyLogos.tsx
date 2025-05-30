"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimationControls, useInView } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useTranslation } from "@/hooks/useTranslation"

// Company logo data with names, image paths, and URLs
const companies = [
  { name: "DeepL", logo: "/companies/DeepL_logo.svg", url: "https://www.deepl.com/" },
  { name: "Meta AI", logo: "/companies/Meta_AI_logo.png", url: "https://ai.meta.com/" },
  { name: "Premise", logo: "/companies/premise_logo.png", url: "https://premise.com/" },
  { name: "RWS", logo: "/companies/RWS_logo.png", url: "https://www.rws.com/" },
  { name: "Toloka", logo: "/companies/Toloka_logo.png", url: "https://toloka.ai/" },
  { name: "Translated", logo: "/companies/translated_logo.png", url: "https://translated.com/welcome" },
  { name: "Uber", logo: "/companies/uber_logo.svg", url: "https://www.uber.com/" },
  { name: "Unbabel", logo: "/companies/Unbabel_logo.webp", url: "https://unbabel.com/" },
  { name: "Volga", logo: "/companies/volga_logo.png", url: "https://volgapartners.com/" },
  { name: "Ubiai", logo: "/companies/ubi.png", url: "https://ubiai.tools/" },
  { name: "Wirestock", logo: "/companies/wirestock.avif", url: "https://wirestock.io/" },
  { name: "Andovar", logo: "/companies/Andovar_logo.webp", url: "https://andovar.com/" },
  { name: "Kudra", logo: "/companies/Kudra_logo.png", url: "https://kudra.ai/" }

]

// Duplicate the array to create a seamless loop effect
const duplicatedCompanies = [...companies, ...companies]

export function CompanyLogos() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const controls = useAnimationControls()
  
  // Function to determine logo size category
  const getLogoSizeClass = (companyName: string) => {
    if (["Translated", "Meta AI"].includes(companyName)) {
      return "extra-large";
    } else if (companyName === "Toloka") {
      return "medium";
    } else {
      return "regular";
    }
  };
  
  // Start animation when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("animate")
    }
  }, [isInView, controls])

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            animate: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 }
            }
          }}
          className="text-2xl font-bold mb-10 text-gray-800 dark:text-white"
        >
          {t('companies.workedwith')}
        </motion.h2>
        
        {/* Logos container with continuous horizontal scroll */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center py-4"
              animate={{
                x: [0, language === 'ar' ? '50%' : '-50%']
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }
              }}
            >
              {duplicatedCompanies.map((company, index) => {
                // Get the appropriate size class for this logo
                const sizeCategory = getLogoSizeClass(company.name);
                
                // Define classes based on size category
                let sizeClasses;
                let imageSizes;
                
                switch (sizeCategory) {
                  case "extra-large":
                    sizeClasses = 'h-[5.5rem] w-44 md:h-[6.5rem] md:w-52';
                    imageSizes = "(max-width: 640px) 176px, 208px";
                    break;
                  case "medium":
                    sizeClasses = 'h-[4.5rem] w-36 md:h-[5.5rem] md:w-44';
                    imageSizes = "(max-width: 640px) 144px, 176px";
                    break;
                  default:
                    sizeClasses = 'h-16 w-32 md:h-20 md:w-40';
                    imageSizes = "(max-width: 640px) 128px, 160px";
                }
                
                return (
                  <Link
                    key={`${company.name}-${index}`}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-shrink-0 relative grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer ${sizeClasses}`}
                    aria-label={`Visit ${company.name} website`}
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                      sizes={imageSizes}
                    />
                  </Link>
                );
              })}
            </motion.div>
          </div>
          
          {/* Gradient overlays for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}