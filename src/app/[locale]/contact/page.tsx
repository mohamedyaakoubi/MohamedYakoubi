import type { Metadata } from 'next'
import ContactClient from '@/components/ContactClient'
import { getTranslations } from '@/lib/translations'
import Script from 'next/script'

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
    en: 'Contact Mohamed Yaakoubi | Hire AI Language Specialist | Translation, Localization, LLM Evaluation Services | Sfax, Tunisia',
    fr: 'Contacter Mohamed Yaakoubi | Embaucher Spécialiste IA Linguistique | Services Traduction, Localisation, Évaluation LLM | Sfax, Tunisie',
    ar: 'تواصل مع محمد يعقوبي | توظيف متخصص لغة الذكاء الاصطناعي | خدمات الترجمة والتوطين وتقييم نماذج اللغة | صفاقس، تونس'
  }
  
  const descriptions = {
    en: 'Get in touch with Mohamed Yaakoubi for AI solutions, web development, or language services. Contact form and professional social profiles.',
    fr: 'Contactez Mohamed Yaakoubi pour des solutions IA, développement web ou services linguistiques. Formulaire de contact et profils sociaux professionnels.',
    ar: 'تواصل مع محمد يعقوبي للحصول على حلول الذكاء الاصطناعي أو تطوير الويب أو الخدمات اللغوية. نموذج الاتصال والملفات الشخصية المهنية.'
  }
  
  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/en/contact'
        : `https://www.mohamedyaakoubi.live/${locale}/contact`
    }
  }
}

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage(props: ContactPageProps) {
  const params = await props.params
  const { locale } = params
  const translations = getTranslations(locale)
  
  // Add breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": translations.navigation?.links?.home || "Home", // Fix: Use links.home
        "item": `https://www.mohamedyaakoubi.live/${locale}`
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": translations.contact?.title || "Contact",
        "item": `https://www.mohamedyaakoubi.live/${locale}/contact`
      }
    ]
  }
  
  return (
    <>
          {/* Add breadcrumb schema */}
      <Script
        id="contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      {/* SEO-optimized static content */}
      <div className="sr-only" aria-hidden="false">
        <h1>{translations.contact?.title || 'Contact'} Mohamed Yaakoubi</h1>
        <p>Get in touch with Mohamed Yaakoubi for inquiries about AI solutions, web development, translation, and localization services.</p>
        
        <section aria-labelledby="contact-information">
          <h2 id="contact-information">Contact Information</h2>
          
          <article>
            <h3>{translations.contact?.info?.email || 'Professional Email'}</h3>
            <p>{translations.contact?.info?.email || 'Email'}: amirrak8@gmail.com</p>
            <p>For business inquiries, project discussions, and professional collaboration.</p>
          </article>

          <article>
            <h3>{translations.contact?.info?.phone || 'Phone Contact'}</h3>
            <p>{translations.contact?.info?.phone || 'Phone'}: +216 54711524</p>
            <p>Available for urgent inquiries and consultation calls.</p>
          </article>

          <article>
            <h3>{translations.contact?.info?.location || 'Location'}</h3>
            <p>{translations.contact?.info?.location || 'Location'}: {translations.contact?.info?.locationValue || 'Sfax, Tunisia'}</p>
            <p>Available for remote work and international collaborations.</p>
          </article>
        </section>

        <section aria-labelledby="professional-profiles">
          <h2 id="professional-profiles">Professional Profiles & Social Media</h2>
          
          <article>
            <h3>GitHub</h3>
            <p>GitHub Profile: https://github.com/mohamedyaakoubi</p>
            <p>View open-source projects, code repositories, and development work.</p>
          </article>

          <article>
            <h3>LinkedIn</h3>
            <p>LinkedIn Profile: https://www.linkedin.com/in/yaakoubi-mohamed/</p>
            <p>Professional network, career history, and business connections.</p>
          </article>

          <article>
            <h3>Freelance Platforms</h3>
            <h4>Upwork</h4>
            <p>Upwork Profile: https://www.upwork.com/freelancers/~0118c281163fef05cb</p>
            <p>Professional freelance services and client reviews.</p>
            
            <h4>Fiverr</h4>
            <p>Fiverr Profile: https://www.fiverr.com/s/wkZqrpg</p>
            <p>Service packages and gig offerings.</p>
            
            <h4>Freelances.tn</h4>
            <p>Freelances.tn Profile: https://www.freelances.tn/freelance/mohamed-yaakoubi</p>
            <p>Local Tunisian freelance platform profile.</p>
            
            <h4>Proz.com</h4>
            <p>Proz.com Profile: https://www.proz.com/profile/3972649</p>
            <p>Professional translation and localization services.</p>
          </article>

          <article>
            <h3>Social Media</h3>
            <h4>Instagram</h4>
            <p>Instagram: https://www.instagram.com/mohamed__yaakoubi/</p>
            <p>Personal updates and behind-the-scenes content.</p>
          </article>
        </section>

        <section aria-labelledby="services-inquiry">
          <h2 id="services-inquiry">Services Available for Inquiry</h2>
          <ul>
            <li>AI and Machine Learning Solutions</li>
            <li>Web Development and Digital Presence</li>
            <li>Translation and Localization Services</li>
            <li>Technical Writing and Content Creation</li>
            <li>Data Annotation and AI Evaluation</li>
            <li>Career Development and Resume Services</li>
            <li>Technical Support and IT Consulting</li>
            <li>Project Management and Research</li>
            <li>Educational Consulting</li>
          </ul>
        </section>

        <section aria-labelledby="support-creator">
          <h2 id="support-creator">{translations.contact?.coffee?.title || 'Support the Creator'}</h2>
          <p>{translations.contact?.coffee?.description || 'If you appreciate the work and would like to support continued development:'}</p>
          <p>Buy Me a Coffee: https://www.buymeacoffee.com/medykb</p>
          <p>Your support helps maintain and improve the quality of services provided.</p>
        </section>

        <section aria-labelledby="languages">
          <h2 id="languages">Languages</h2>
          <p>Communication available in:</p>
          <ul>
            <li>English (Professional proficiency)</li>
            <li>Arabic (Native speaker)</li>
            <li>French (Working proficiency)</li>
          </ul>
        </section>
      </div>
      
      <ContactClient locale={locale} translations={translations} />
    </>
  )
}