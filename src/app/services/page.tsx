import type { Viewport, Metadata } from 'next'
import ServicesClient from '@/components/ServicesClient'

export const metadata: Metadata = {
  title: 'Services | Mohamed Yaakoubi',
  description: 'Professional services offered by Mohamed Yaakoubi including AI solutions, web development, and translation services.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/services'
  }
}

// Define viewport separately - this is now in a server component
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

export default function ServicesPage() {
  return (
    <>
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Professional Services - Mohamed Yaakoubi</h1>
        <p>Discover professional services in AI solutions, web development, translation, and localization by Mohamed Yaakoubi, an emerging AI and technology specialist.</p>
        
        <section aria-labelledby="services-overview">
          <h2 id="services-overview">Service Categories</h2>
          <ul>
            <li>Language Services - Translation & Localization</li>
            <li>AI & Data Services - Data Annotation & Evaluation</li>
            <li>Career Development - Resume Writing & Coaching</li>
            <li>Tech & IT Services - Technical Support & Web Development</li>
            <li>Education & Training - Educational Consulting</li>
            <li>Business & Research - Project Management & Research Assistance</li>
          </ul>
        </section>

        <section aria-labelledby="language-services">
          <h2 id="language-services">Language Services</h2>
          
          <article>
            <h3>Translation & Localization</h3>
            <p>Accurate and culturally-sensitive translation and localization services for Arabic and English.</p>
            <h4>Features:</h4>
            <ul>
              <li>Technical document translation</li>
              <li>Legal document translation</li>
              <li>Website and app localization</li>
              <li>Marketing content adaptation</li>
              <li>AI-powered translation post-editing</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Initial content review</li>
              <li>Translation and localization</li>
              <li>Post-editing for AI-generated translations</li>
              <li>Quality assurance and proofreading</li>
              <li>Final review and delivery</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="ai-data-services">
          <h2 id="ai-data-services">AI & Data Services</h2>
          
          <article>
            <h3>AI Data Annotation & Evaluation</h3>
            <p>Expert AI data annotation and evaluation services to improve machine learning models.</p>
            <h4>Features:</h4>
            <ul>
              <li>AI prompt and response evaluation</li>
              <li>Linguistic AI testing (Arabic-English)</li>
              <li>Dataset annotation and quality assurance</li>
              <li>Sentiment analysis and intent recognition</li>
              <li>Model output assessment and feedback</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Data collection and preprocessing</li>
              <li>Annotation and tagging</li>
              <li>Quality control and validation</li>
              <li>Feedback and model improvement recommendations</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="career-development">
          <h2 id="career-development">Career Development Services</h2>
          
          <article>
            <h3>Resume Writing & Review</h3>
            <p>Professional resume writing and review services tailored to your career goals.</p>
            <h4>Features:</h4>
            <ul>
              <li>Resume drafting from scratch</li>
              <li>ATS optimization</li>
              <li>Industry-specific formatting</li>
              <li>Cover letter writing</li>
              <li>Detailed feedback on existing resumes</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Initial consultation</li>
              <li>Resume structure planning</li>
              <li>Content drafting and optimization</li>
              <li>Final review and refinement</li>
            </ol>
          </article>

          <article>
            <h3>Career Development Coaching</h3>
            <p>Personalized coaching for career growth and success.</p>
            <h4>Features:</h4>
            <ul>
              <li>Resume and cover letter optimization</li>
              <li>Interview preparation</li>
              <li>Job search strategies</li>
              <li>Professional networking guidance</li>
              <li>Long-term career planning</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Initial consultation</li>
              <li>Skill and career assessment</li>
              <li>Customized development plan</li>
              <li>Ongoing mentorship and support</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="tech-it-services">
          <h2 id="tech-it-services">Tech & IT Services</h2>
          
          <article>
            <h3>Technical Support & IT Consulting</h3>
            <p>Providing troubleshooting, technical assistance, and IT consultations for various digital needs.</p>
            <h4>Features:</h4>
            <ul>
              <li>Software troubleshooting</li>
              <li>IT infrastructure consultation</li>
              <li>System setup and optimization</li>
              <li>Tech tools training</li>
              <li>Cybersecurity awareness guidance</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Issue assessment</li>
              <li>Diagnosis and solution planning</li>
              <li>Implementation and testing</li>
              <li>Final review and recommendations</li>
            </ol>
          </article>

          <article>
            <h3>Web Development & Digital Presence</h3>
            <p>Professional web development services to establish and enhance your digital presence.</p>
            <h4>Features:</h4>
            <ul>
              <li>Responsive website development</li>
              <li>Portfolio and showcase websites</li>
              <li>AI-enhanced website features</li>
              <li>Content creation and management</li>
              <li>Multilingual support</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Requirements analysis and planning</li>
              <li>Design and development</li>
              <li>Content creation and integration</li>
              <li>Testing and quality assurance</li>
              <li>Launch and maintenance</li>
            </ol>
            <p>Pricing information available at: https://tariff-mu.vercel.app/</p>
          </article>
        </section>

        <section aria-labelledby="education-training">
          <h2 id="education-training">Education & Training</h2>
          
          <article>
            <h3>Educational Consulting</h3>
            <p>Guidance on academic paths, scholarships, and professional skill development.</p>
            <h4>Features:</h4>
            <ul>
              <li>University application support</li>
              <li>Course and skill development advice</li>
              <li>Scholarship and grant research</li>
              <li>Career guidance for students</li>
              <li>Personalized learning strategies</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Initial consultation</li>
              <li>Academic or career assessment</li>
              <li>Customized guidance plan</li>
              <li>Ongoing support and mentoring</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="business-research">
          <h2 id="business-research">Business & Research</h2>
          
          <article>
            <h3>Project Management & Research Assistance</h3>
            <p>Managing projects efficiently and conducting thorough research to support decision-making.</p>
            <h4>Features:</h4>
            <ul>
              <li>End-to-end project coordination</li>
              <li>Deadline and resource management</li>
              <li>Market and academic research</li>
              <li>Comprehensive data analysis</li>
              <li>Report writing and documentation</li>
            </ul>
            <h4>Process:</h4>
            <ol>
              <li>Project or research briefing</li>
              <li>Planning and execution</li>
              <li>Data collection and analysis</li>
              <li>Final report and presentation</li>
            </ol>
          </article>
        </section>

        <section aria-labelledby="service-benefits">
          <h2 id="service-benefits">Why Choose These Services</h2>
          <ul>
            <li>Professional expertise in AI, technology, and language services</li>
            <li>Bilingual capabilities in Arabic and English</li>
            <li>Experience with international companies and projects</li>
            <li>AI-enhanced workflows for improved efficiency</li>
            <li>Customized solutions for individual and business needs</li>
            <li>Quality assurance and professional standards</li>
            <li>Competitive pricing and flexible service packages</li>
          </ul>
        </section>

        <section aria-labelledby="contact-info">
          <h2 id="contact-info">Get Started</h2>
          <p>Ready to work together? Contact Mohamed Yaakoubi to discuss your project requirements and get a customized quote for professional services.</p>
          <p>Available for remote work and international collaborations.</p>
        </section>
      </div>
      
      <ServicesClient />
    </>
  )
}