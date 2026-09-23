import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomeClient from '@/components/HomeClient'
import { getTranslations } from '@/lib/translations'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const translations = getTranslations(locale)
  
  return {
    title: translations.meta.title,
    description: translations.meta.description,
    alternates: {
      canonical: `https://www.mohamedyaakoubi.com/${locale}`,
      languages: {
        en: 'https://www.mohamedyaakoubi.com/en',
        fr: 'https://www.mohamedyaakoubi.com/fr',
        ar: 'https://www.mohamedyaakoubi.com/ar',
        'x-default': 'https://www.mohamedyaakoubi.com/en',
      },
    },
    openGraph: {
      title: translations.meta.title,
      description: translations.meta.description,
      url: `https://www.mohamedyaakoubi.com/${locale}`,
      siteName: 'Mohamed Yaakoubi - AI Language Technology Portfolio',
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'profile',
      // Image comes from ./opengraph-image.tsx; an explicit images array here would override it.
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.meta.title,
      description: translations.meta.description,
      site: '@Mohamed0Yakoubi',
      creator: '@Mohamed0Yakoubi',
    },
  }
}


interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params
  const { locale } = params

  // If locale is not valid (e.g. /randomstring), show 404
  if (!['en', 'fr', 'ar'].includes(locale)) {
    notFound()
  }

  const translations = getTranslations(locale)
  
  return (
    <>
      <HomeClient locale={locale} translations={translations} />

      {/* ProfilePage + WebSite JSON-LD belong on the homepage only: Google documents ProfilePage
          for the page about the person and WebSite for the home page ("not necessary to include
          it on every page"). Rendered in <body>, not <head>, because browser extensions that
          inject scripts into <head> before hydration caused hydration mismatches. */}
        {/* ── ProfilePage & Person Schema ── */}
        <script
          id="profile-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "dateCreated": "2024-01-01T00:00:00+00:00",
              "dateModified": "2026-05-09T00:00:00+00:00",
              "mainEntity": {
                "@type": "Person",
                "name": "Mohamed Yaakoubi",
                "givenName": "Mohamed",
                "familyName": "Yaakoubi",
                "alternateName": ["Yaakoubi Mohamed", "محمد يعقوبي", "Mohamed Yakoubi"],
              "url": "https://www.mohamedyaakoubi.com",
              "image": {
                "@type": "ImageObject",
                "url": "https://www.mohamedyaakoubi.com/profile.jpg",
                "width": 963,
                "height": 1280
              },
              "description": "Freelance AI Language Technology Specialist with expertise in AI quality assurance, machine translation post-editing, LLM evaluation, AI annotation, and localization coordination. Currently working with multiple companies: DATAmundi (External QA), Wirestock (Media Content & Metadata Specialist), DeepL (Linguistic Editor), RWS/Meta AI (Linguistic AI Evaluator), Uber/Volga Partners (Localization Coordinator & Quality Reviewer), and UbiAi (Technical Content Writer).",
              "jobTitle": ["AI Language Technology Specialist", "Machine Translation Post-Editor", "LLM Evaluator", "Localization Coordinator", "AI Annotator"],
              "hasOccupation": [
                {
                  "@type": "Occupation",
                  "name": "External QA",
                  "occupationLocation": { "@type": "Place", "name": "DATAmundi" },
                  "skills": ["Data Annotation QA", "AI Response Evaluation", "Multilingual Quality Assessment", "Freelancer Feedback"]
                },
                {
                  "@type": "Occupation",
                  "name": "Media Content & Metadata Specialist",
                  "occupationLocation": { "@type": "Place", "name": "Wirestock" },
                  "skills": ["Metadata Writing", "SEO Keywords", "Content Moderation", "Video Evaluation", "AI Image Ranking", "Content Review", "Media Evaluation"]
                },
                {
                  "@type": "Occupation",
                  "name": "Linguistic AI Evaluator",
                  "occupationLocation": { "@type": "Place", "name": "RWS Group (Meta AI)" },
                  "skills": ["LLM Evaluation", "Llama 4", "Arabic Maghrebi QA", "Prompt Engineering", "AI Response Ranking"]
                },
                {
                  "@type": "Occupation",
                  "name": "Localization Vendor Coordinator",
                  "occupationLocation": { "@type": "Place", "name": "Uber (via Volga Partners)" },
                  "skills": ["AI Content Evaluation", "Arabic-English Translation", "Transcription", "Data Labeling", "Quality Assurance"]
                },
                {
                  "@type": "Occupation",
                  "name": "Technical Content Writer",
                  "occupationLocation": { "@type": "Place", "name": "UbiAi" },
                  "skills": ["Technical Writing", "LLM Fine-tuning", "NLP Content", "SEO Audits", "WordPress"]
                },
                {
                  "@type": "Occupation",
                  "name": "Linguistic Editor",
                  "occupationLocation": { "@type": "Place", "name": "DeepL" },
                  "skills": ["Machine Translation Post-Editing", "Arabic-English QA", "Translation Quality Assessment"]
                },
                {
                  "@type": "Occupation",
                  "name": "Freelance Editor",
                  "occupationLocation": { "@type": "Place", "name": "Unbabel" },
                  "skills": ["Post-Editing", "CAT Tools", "Arabic-English Translation", "Localization"]
                }
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "DATAmundi",
                  "url": "https://datamundi.ai/",
                  "sameAs": "https://datamundi.ai/",
                  "description": "External QA auditing multilingual data annotation outputs and AI-generated responses for AI training and evaluation datasets"
                },
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
                "location": { "@type": "Place", "name": "Sfax, Tunisia" }
              },
              "knowsLanguage": [
                { "@type": "Language", "name": "Arabic", "alternateName": "العربية" },
                { "@type": "Language", "name": "English" },
                { "@type": "Language", "name": "French", "alternateName": "Français" },
                { "@type": "Language", "name": "German", "alternateName": "Deutsch" }
              ],
              "knowsAbout": [
                "Machine Translation", "Post-Editing", "LLM Evaluation", "AI Annotation",
                "Localization", "Natural Language Processing", "Arabic-English Translation",
                "Maghrebi Arabic Dialect", "Prompt Engineering", "Multilingual Quality Assurance",
                "Content Moderation", "SEO Metadata", "Video Content Evaluation",
                "Technical Writing", "React", "Next.js", "TypeScript", "Firebase", "Azure AI"
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
                "https://medium.com/@amirrak8",
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
                  "author": { "@type": "Person", "name": "Mohamed Yaakoubi" }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Potential - AI-Powered Search Engine",
                  "url": "https://www.mohamedyaakoubi.com/en/projects/potential",
                  "applicationCategory": "SearchApplication",
                  "description": "AI search engine for Abu Dhabi Open Data Platform built with Next.js, NLP, and real-time API indexing",
                  "operatingSystem": "Web Browser",
                  "author": { "@type": "Person", "name": "Mohamed Yaakoubi" }
                },
                {
                  "@type": "WebApplication",
                  "name": "NotYet - Career Guidance Platform",
                  "applicationCategory": "EducationalApplication",
                  "description": "AI-powered CV analysis and career advice platform for Tunisian students built with React, Firebase, and Azure AI",
                  "operatingSystem": "Web Browser",
                  "author": { "@type": "Person", "name": "Mohamed Yaakoubi" }
                },
                {
                  "@type": "WebApplication",
                  "name": "DocuMed - Healthcare Management System",
                  "url": "https://www.mohamedyaakoubi.com/en/projects/documed",
                  "applicationCategory": "MedicalApplication",
                  "description": "Medical web application for streamlining healthcare resource access and patient management, built with React and Firebase",
                  "operatingSystem": "Web Browser",
                  "author": { "@type": "Person", "name": "Mohamed Yaakoubi" }
                },
                {
                  "@type": "WebApplication",
                  "name": "InternationalSkills.fi Recruiting System",
                  "applicationCategory": "BusinessApplication",
                  "description": "Job application portal with candidate tracking, automated interview scheduling, AI scoring, and admin dashboard",
                  "operatingSystem": "Web Browser",
                  "author": { "@type": "Person", "name": "Mohamed Yaakoubi" }
                }
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Training in Artificial Intelligence and Machine Learning",
                  "credentialCategory": "certificate",
                  "educationalLevel": "Professional Training",
                  "recognizedBy": { "@type": "EducationalOrganization", "name": "Virtual University of Tunis" },
                  "dateCreated": "2024-12",
                  "credentialID": "NjUxNDAzMjk3LjY",
                  "about": "Machine Learning (Classification, Regression), Deep Learning, GANs, NLP with Azure AI, Computer Vision, Knowledge Mining, Quantum AI, and Ethical AI. Score: 87.33%"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "EF SET English Certificate C1 Advanced",
                  "credentialCategory": "certificate",
                  "educationalLevel": "C1 Advanced (CEFR)",
                  "recognizedBy": { "@type": "Organization", "name": "EF SET" },
                  "dateCreated": "2024-09",
                  "about": "Score: 62/100 (C1 Advanced level on the CEFR scale)"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Certificate of Completion - Fullstack Development",
                  "credentialCategory": "certificate",
                  "educationalLevel": "Professional Bootcamp",
                  "recognizedBy": { "@type": "Organization", "name": "MentorNations" },
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
                  "recognizedBy": { "@type": "Organization", "name": "American Corner Tunis / US Embassy" }
                }
              ],
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "TED Translators",
                  "url": "https://www.ted.com/participate/translate"
                }
              ]
            }
          }).replace(/</g, '\\u003c')
        }}
      />

        {/* ── WebSite Schema ── */}
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mohamed Yaakoubi - AI Language Technology Portfolio",
              "url": "https://www.mohamedyaakoubi.com",
              "author": {
                "@type": "Person",
                "name": "Mohamed Yaakoubi"
              },
              "inLanguage": ["en", "fr", "ar"]
            }).replace(/</g, '\\u003c')
          }}
        />
    </>
  )
}

