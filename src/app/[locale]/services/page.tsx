import type { Metadata } from 'next'
import ServicesClient from '@/components/ServicesClient'
import { getTranslations, getSupportedLocales } from '@/lib/translations'

export async function generateStaticParams() {
  const locales = getSupportedLocales();
  return locales.map(locale => ({ locale }));
}

// Add this generateMetadata function with canonical URL
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'Professional Services | Mohamed Yaakoubi - AI & Web Development',
    fr: 'Services Professionnels | Mohamed Yaakoubi - IA & Développement Web',
    ar: 'الخدمات المهنية | محمد يعقوبي - الذكاء الاصطناعي وتطوير الويب'
  }
  
  const descriptions = {
    en: 'Professional services by Mohamed Yaakoubi: AI data annotation, translation & localization, web development, career coaching, technical support, and IT consulting.',
    fr: 'Services professionnels par Mohamed Yaakoubi : annotation de données IA, traduction et localisation, développement web, coaching de carrière, support technique et conseil IT.',
    ar: 'الخدمات المهنية من محمد يعقوبي: تعليق البيانات بالذكاء الاصطناعي، الترجمة والتوطين، تطوير الويب، تدريب المهن، الدعم التقني، والاستشارات التقنية.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      'AI services', 'data annotation', 'translation services', 'web development',
      'career coaching', 'technical support', 'IT consulting', 'localization',
      'Mohamed Yaakoubi services', 'freelance AI specialist', 'Arabic English translation',
      'resume writing', 'portfolio development', 'multilingual support'
    ].join(', '),
    alternates: {
      // Add canonical URL - consistent with your URL structure
      canonical: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/en/services'
        : `https://www.mohamedyaakoubi.live/${locale}/services`
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      url: locale === 'en' 
        ? 'https://www.mohamedyaakoubi.live/en/services'
        : `https://www.mohamedyaakoubi.live/${locale}/services`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    }
  }
}



export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const translations = getTranslations(locale)

  return (
    <>
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>{translations.services?.title || 'Professional Services'} - Mohamed Yaakoubi</h1>
        <p>Discover professional services in AI solutions, web development, translation, and localization by Mohamed Yaakoubi, an emerging AI and technology specialist.</p>
        
        <section aria-labelledby="services-overview">
          <h2 id="services-overview">Service Categories</h2>
          <ul>
            <li>{translations.services?.categories?.['Language Services'] || 'Language Services'} - Translation & Localization</li>
            <li>{translations.services?.categories?.['AI & Data Services'] || 'AI & Data Services'} - Data Annotation & Evaluation</li>
            <li>{translations.services?.categories?.['Career Development'] || 'Career Development'} - Resume Writing & Coaching</li>
            <li>{translations.services?.categories?.['Tech & IT Services'] || 'Tech & IT Services'} - Technical Support & Web Development</li>
            <li>{translations.services?.categories?.['Education & Training'] || 'Education & Training'} - Educational Consulting</li>
            <li>{translations.services?.categories?.['Business & Research'] || 'Business & Research'} - Project Management & Research Assistance</li>
          </ul>
        </section>

        <section aria-labelledby="language-services">
          <h2 id="language-services">{translations.services?.categories?.['Language Services'] || 'Language Services'}</h2>
          
          <article>
            <h3>{translations.services?.names?.['Translation & Localization'] || 'Translation & Localization'}</h3>
            <p>{translations.services?.descriptions?.['Translation & Localization'] || 'Accurate and culturally-sensitive translation and localization services for Arabic and English.'}</p>
            <h4>{translations.services?.sections?.features || 'Features'}:</h4>
            <ul>
              <li>{translations.services?.features?.['Translation & Localization']?.['Technical document translation'] || 'Technical document translation'}</li>
              <li>{translations.services?.features?.['Translation & Localization']?.['Legal document translation'] || 'Legal document translation'}</li>
              <li>{translations.services?.features?.['Translation & Localization']?.['Website and app localization'] || 'Website and app localization'}</li>
              <li>{translations.services?.features?.['Translation & Localization']?.['Marketing content adaptation'] || 'Marketing content adaptation'}</li>
              <li>{translations.services?.features?.['Translation & Localization']?.['AI-powered translation post-editing'] || 'AI-powered translation post-editing'}</li>
            </ul>
            <h4>{translations.services?.sections?.workProcess || 'Work Process'}:</h4>
            <ol>
              <li>{translations.services?.process?.['Translation & Localization']?.['Initial content review'] || 'Initial content review'}</li>
              <li>{translations.services?.process?.['Translation & Localization']?.['Translation and localization'] || 'Translation and localization'}</li>
              <li>{translations.services?.process?.['Translation & Localization']?.['Post-editing for AI-generated translations'] || 'Post-editing for AI-generated translations'}</li>
              <li>{translations.services?.process?.['Translation & Localization']?.['Quality assurance and proofreading'] || 'Quality assurance and proofreading'}</li>
              <li>{translations.services?.process?.['Translation & Localization']?.['Final review and delivery'] || 'Final review and delivery'}</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="ai-data-services">
          <h2 id="ai-data-services">{translations.services?.categories?.['AI & Data Services'] || 'AI & Data Services'}</h2>
          
          <article>
            <h3>{translations.services?.names?.['AI Data Annotation & Evaluation'] || 'AI Data Annotation & Evaluation'}</h3>
            <p>{translations.services?.descriptions?.['AI Data Annotation & Evaluation'] || 'Expert AI data annotation and evaluation services to improve machine learning models.'}</p>
            <h4>{translations.services?.sections?.features || 'Features'}:</h4>
            <ul>
              <li>{translations.services?.features?.['AI Data Annotation & Evaluation']?.['AI prompt and response evaluation'] || 'AI prompt and response evaluation'}</li>
              <li>{translations.services?.features?.['AI Data Annotation & Evaluation']?.['Linguistic AI testing (Arabic-English)'] || 'Linguistic AI testing (Arabic-English)'}</li>
              <li>{translations.services?.features?.['AI Data Annotation & Evaluation']?.['Dataset annotation and quality assurance'] || 'Dataset annotation and quality assurance'}</li>
              <li>{translations.services?.features?.['AI Data Annotation & Evaluation']?.['Sentiment analysis and intent recognition'] || 'Sentiment analysis and intent recognition'}</li>
              <li>{translations.services?.features?.['AI Data Annotation & Evaluation']?.['Model output assessment and feedback'] || 'Model output assessment and feedback'}</li>
            </ul>
            <h4>{translations.services?.sections?.workProcess || 'Work Process'}:</h4>
            <ol>
              <li>{translations.services?.process?.['AI Data Annotation & Evaluation']?.['Data collection and preprocessing'] || 'Data collection and preprocessing'}</li>
              <li>{translations.services?.process?.['AI Data Annotation & Evaluation']?.['Annotation and tagging'] || 'Annotation and tagging'}</li>
              <li>{translations.services?.process?.['AI Data Annotation & Evaluation']?.['Quality control and validation'] || 'Quality control and validation'}</li>
              <li>{translations.services?.process?.['AI Data Annotation & Evaluation']?.['Feedback and model improvement recommendations'] || 'Feedback and model improvement recommendations'}</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="career-development">
          <h2 id="career-development">{translations.services?.categories?.['Career Development'] || 'Career Development Services'}</h2>
          
          <article>
            <h3>{translations.services?.names?.['Resume Writing & Review'] || 'Resume Writing & Review'}</h3>
            <p>{translations.services?.descriptions?.['Resume Writing & Review'] || 'Professional resume writing and review services tailored to your career goals.'}</p>
            <h4>{translations.services?.sections?.features || 'Features'}:</h4>
            <ul>
              <li>{translations.services?.features?.['Resume Writing & Review']?.['Resume drafting from scratch'] || 'Resume drafting from scratch'}</li>
              <li>{translations.services?.features?.['Resume Writing & Review']?.['ATS optimization'] || 'ATS optimization'}</li>
              <li>{translations.services?.features?.['Resume Writing & Review']?.['Industry-specific formatting'] || 'Industry-specific formatting'}</li>
              <li>{translations.services?.features?.['Resume Writing & Review']?.['Cover letter writing'] || 'Cover letter writing'}</li>
              <li>{translations.services?.features?.['Resume Writing & Review']?.['Detailed feedback on existing resumes'] || 'Detailed feedback on existing resumes'}</li>
            </ul>
            <h4>{translations.services?.sections?.workProcess || 'Work Process'}:</h4>
            <ol>
              <li>{translations.services?.process?.['Resume Writing & Review']?.['Initial consultation'] || 'Initial consultation'}</li>
              <li>{translations.services?.process?.['Resume Writing & Review']?.['Resume structure planning'] || 'Resume structure planning'}</li>
              <li>{translations.services?.process?.['Resume Writing & Review']?.['Content drafting and optimization'] || 'Content drafting and optimization'}</li>
              <li>{translations.services?.process?.['Resume Writing & Review']?.['Final review and refinement'] || 'Final review and refinement'}</li>
            </ol>
          </article>

          <article>
            <h3>{translations.services?.names?.['Career Development Coaching'] || 'Career Development Coaching'}</h3>
            <p>{translations.services?.descriptions?.['Career Development Coaching'] || 'Personalized coaching for career growth and success.'}</p>
            <h4>{translations.services?.sections?.features || 'Features'}:</h4>
            <ul>
              <li>{translations.services?.features?.['Career Development Coaching']?.['Resume and cover letter optimization'] || 'Resume and cover letter optimization'}</li>
              <li>{translations.services?.features?.['Career Development Coaching']?.['Interview preparation'] || 'Interview preparation'}</li>
              <li>{translations.services?.features?.['Career Development Coaching']?.['Job search strategies'] || 'Job search strategies'}</li>
              <li>{translations.services?.features?.['Career Development Coaching']?.['Professional networking guidance'] || 'Professional networking guidance'}</li>
              <li>{translations.services?.features?.['Career Development Coaching']?.['Long-term career planning'] || 'Long-term career planning'}</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="tech-it-services">
          <h2 id="tech-it-services">{translations.services?.categories?.['Tech & IT Services'] || 'Tech & IT Services'}</h2>
          
          <article>
            <h3>{translations.services?.names?.['Technical Support & IT Consulting'] || 'Technical Support & IT Consulting'}</h3>
            <p>{translations.services?.descriptions?.['Technical Support & IT Consulting'] || 'Providing troubleshooting, technical assistance, and IT consultations for various digital needs.'}</p>
            <h4>{translations.services?.sections?.features || 'Features'}:</h4>
            <ul>
              <li>{translations.services?.features?.['Technical Support & IT Consulting']?.['Software troubleshooting'] || 'Software troubleshooting'}</li>
              <li>{translations.services?.features?.['Technical Support & IT Consulting']?.['IT infrastructure consultation'] || 'IT infrastructure consultation'}</li>
              <li>{translations.services?.features?.['Technical Support & IT Consulting']?.['System setup and optimization'] || 'System setup and optimization'}</li>
              <li>{translations.services?.features?.['Technical Support & IT Consulting']?.['Tech tools training'] || 'Tech tools training'}</li>
              <li>{translations.services?.features?.['Technical Support & IT Consulting']?.['Cybersecurity awareness guidance'] || 'Cybersecurity awareness guidance'}</li>
            </ul>
          </article>

          <article>
            <h3>{translations.services?.names?.['Web Development & Digital Presence'] || 'Web Development & Digital Presence'}</h3>
            <p>{translations.services?.descriptions?.['Web Development & Digital Presence'] || 'Professional web development services to establish and enhance your digital presence.'}</p>
            <h4>{translations.services?.sections?.features || 'Features'}:</h4>
            <ul>
              <li>{translations.services?.features?.['Web Development & Digital Presence']?.['Responsive website development'] || 'Responsive website development'}</li>
              <li>{translations.services?.features?.['Web Development & Digital Presence']?.['Portfolio and showcase websites'] || 'Portfolio and showcase websites'}</li>
              <li>{translations.services?.features?.['Web Development & Digital Presence']?.['AI-enhanced website features'] || 'AI-enhanced website features'}</li>
              <li>{translations.services?.features?.['Web Development & Digital Presence']?.['Content creation and management'] || 'Content creation and management'}</li>
              <li>{translations.services?.features?.['Web Development & Digital Presence']?.['Multilingual support'] || 'Multilingual support'}</li>
            </ul>
            <p>Pricing information available at: https://tariff-mu.vercel.app/</p>
          </article>
        </section>
      </div>
      
      <ServicesClient locale={locale} translations={translations} />
    </>
  )
}