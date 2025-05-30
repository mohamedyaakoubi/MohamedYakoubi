import type { Viewport, Metadata } from 'next'
import ContactClient from '@/components/ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Mohamed Yaakoubi',
  description: 'Get in touch with Mohamed Yaakoubi for AI solutions, web development, or language services. Contact form and professional social profiles.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/contact'
  }
}

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

export default function ContactPage() {
  return (
    <>
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Contact Mohamed Yaakoubi</h1>
        <p>Get in touch with Mohamed Yaakoubi for inquiries about AI solutions, web development, translation, and localization services.</p>
        
        <section aria-labelledby="contact-information">
          <h2 id="contact-information">Contact Information</h2>
          
          <article>
            <h3>Professional Email</h3>
            <p>Email: amirrak8@gmail.com</p>
            <p>For business inquiries, project discussions, and professional collaboration.</p>
          </article>

          <article>
            <h3>Phone Contact</h3>
            <p>Phone: +216 54711524</p>
            <p>Available for urgent inquiries and consultation calls.</p>
          </article>

          <article>
            <h3>Location</h3>
            <p>Location: Sfax, Tunisia</p>
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

        <section aria-labelledby="contact-methods">
          <h2 id="contact-methods">How to Get in Touch</h2>
          
          <article>
            <h3>Contact Form</h3>
            <p>Use the contact form on this page for detailed inquiries and project discussions.</p>
            <ul>
              <li>Project consultation requests</li>
              <li>Service inquiries</li>
              <li>Collaboration proposals</li>
              <li>Technical support questions</li>
              <li>General business inquiries</li>
            </ul>
          </article>

          <article>
            <h3>Direct Email</h3>
            <p>Send direct emails to amirrak8@gmail.com for:</p>
            <ul>
              <li>Urgent project requests</li>
              <li>Business partnerships</li>
              <li>Job opportunities</li>
              <li>Technical consultations</li>
              <li>Media inquiries</li>
            </ul>
          </article>

          <article>
            <h3>Phone Consultation</h3>
            <p>Call +216 54711524 for:</p>
            <ul>
              <li>Immediate technical support</li>
              <li>Project clarifications</li>
              <li>Consultation scheduling</li>
              <li>Urgent business matters</li>
            </ul>
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

        <section aria-labelledby="response-times">
          <h2 id="response-times">Response Times</h2>
          <ul>
            <li>Contact Form: Within 24-48 hours</li>
            <li>Email Inquiries: Within 12-24 hours</li>
            <li>Phone Calls: Immediate response during business hours</li>
            <li>Social Media Messages: Within 24 hours</li>
            <li>Freelance Platform Messages: Within 12 hours</li>
          </ul>
        </section>

        <section aria-labelledby="business-hours">
          <h2 id="business-hours">Availability</h2>
          <p>Available for remote work across different time zones.</p>
          <p>Flexible scheduling for international clients and collaborations.</p>
          <p>Emergency support available for ongoing projects.</p>
        </section>

        <section aria-labelledby="support-creator">
          <h2 id="support-creator">Support the Creator</h2>
          <p>If you appreciate the work and would like to support continued development:</p>
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
      
      <ContactClient />
    </>
  )
}