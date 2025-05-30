import type { Viewport, Metadata } from 'next'
import ExperienceClient from '@/components/ExperienceClient'

export const metadata: Metadata = {
  title: 'Experience | Mohamed Yaakoubi',
  description: 'Professional experience of Mohamed Yaakoubi at DeepL, RWS (Meta AI), UbiAi, Wirestock, Uber, and Volga Partners in AI, translation, and localization.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/experience'
  }
}

// Ensure static generation for SEO
export const dynamic = 'force-static';
export const generateStaticParams = async () => { return [{}] };

export default function ExperiencePage() {
  return (
    <>
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Professional Experience - Mohamed Yaakoubi</h1>
        <p>Explore Mohamed Yaakoubi's professional experience in AI solutions, translation, and localization at companies like DeepL, RWS (Meta AI), UbiAi, Wirestock, Uber, and Volga Partners.</p>
        
        <section aria-labelledby="experience-detailed">
          <h2 id="experience-detailed">Detailed Work Experience</h2>
          
          <article>
            <h3>Video Metadata Writer | Wirestock</h3>
            <p>April 2025 - Present | Sfax (Remote) | Full-Time</p>
            <ul>
              <li>Wrote detailed and structured metadata for edited videos, including final goal articulation, video descriptions, cut rationales, and audio choices</li>
              <li>Segmented raw video footage and authored rationale-rich descriptions for each segment to support clear storytelling and narrative flow</li>
              <li>Evaluated video content and metadata for coherence, quality, and alignment with intended visual communication</li>
              <li>Collaborated with the remote team through consistent communication and adherence to content guidelines and structured workflows</li>
            </ul>
          </article>
          
          <article>
            <h3>Technical Content Writer & Web Operations Assistant | UbiAi</h3>
            <p>March 2025 - Present | Sfax (Remote)</p>
            <ul>
              <li>Created technical blog content and tutorials on LLM fine-tuning, NLP, and AI topics for a WordPress-based platform</li>
              <li>Performed website audits and diagnostics to improve UX, SEO, and platform performance</li>
              <li>Collaborated with client to plan content strategy, including potential video tutorials and community engagement efforts</li>
              <li>Acted as a liaison and task coordinator for external media and marketing support to ensure project delivery</li>
            </ul>
          </article>
          
          <article>
            <h3>Linguistic Editor | DeepL</h3>
            <p>February 2025 - Present | Sfax (Remote)</p>
            <ul>
              <li>Evaluate and refine AI-generated Arabic-English translations for accuracy and fluency</li>
              <li>Identify translation errors, provide corrections, and explain linguistic issues</li>
              <li>Work on diverse language tasks, including quality assessment and transcreation</li>
              <li>Collaborate with DeepL's Language Data team to enhance AI translation models</li>
            </ul>
          </article>
          
          <article>
            <h3>Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI (RWS)</h3>
            <p>November 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Evaluate multilingual prompts and AI-generated responses in Arabic to refine advanced Large Language Models, including projects like Llama 4</li>
              <li>Rank outputs based on quality metrics such as coherence, fluency, and cultural relevance to enhance AI-driven conversational tools</li>
              <li>Provide detailed feedback to improve linguistic and contextual accuracy, ensuring alignment with diverse cultural and linguistic norms</li>
            </ul>
          </article>
          
          <article>
            <h3>Localization Vendor Coordinator | Uber (via Volga Partners)</h3>
            <p>July 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Evaluate Arabic and English AI-generated content for linguistic and cultural accuracy</li>
              <li>Provide precise English to Arabic translations, maintaining nuance and relevance</li>
              <li>Coordinate localization efforts to optimize user experience in both languages</li>
              <li>Contribute to AI model improvements through data labeling and collaboration with teams</li>
            </ul>
          </article>

          <article>
            <h3>Language Data and Quality Reviewer | Volga Partners</h3>
            <p>July 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Provide language data and quality review services on a project basis</li>
              <li>Collaborate directly with clients of Volga Partners to meet their specific needs</li>
              <li>Ensure high-quality deliverables tailored to each unique project</li>
            </ul>
          </article>

          <article>
            <h3>KYC Validator | Pi Network</h3>
            <p>July 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Reviewing submitted identification documents for authenticity</li>
              <li>Cross-referencing information against official records</li>
              <li>Maintaining a high standard of accuracy and confidentiality</li>
            </ul>
          </article>

          <article>
            <h3>Freelance AI Data Annotator | Toloka</h3>
            <p>February 2024 - August 2024 | Sfax (Remote)</p>
            <ul>
              <li>Conducted data labeling, image annotation, and text transcription for AI training</li>
              <li>Ensured high-quality annotations to improve machine learning models</li>
              <li>Worked on diverse projects across multiple industries</li>
              <li>Collaborated with a global workforce to meet task requirements efficiently</li>
            </ul>
          </article>

          <article>
            <h3>Crowdsourced Data Contributor | Premise</h3>
            <p>February 2024 - September 2024 | Sfax (Remote)</p>
            <ul>
              <li>Conducted surveys via Premise mobile app on various topics</li>
              <li>Provided accurate data adhering to Premise's guidelines</li>
              <li>Contributed to real-time insights for governments and businesses</li>
              <li>Collaborated with global network of contributors</li>
            </ul>
          </article>

          <article>
            <h3>Subtitle Editor | TED Translators</h3>
            <p>April 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Translate and subtitle TED Talks into native language, ensuring global accessibility</li>
              <li>Ensure quality and accuracy while preserving the speaker's original message</li>
              <li>Collaborate with other translators through the Amara CAT tool</li>
              <li>Engage in continuous learning by exploring diverse topics</li>
              <li>Contribute to global idea exchange and empower non-English speakers</li>
            </ul>
          </article>

          <article>
            <h3>Freelance Editor (Arabic to English & English to Arabic) | Unbabel</h3>
            <p>March 2020 - Present | Sfax (Remote)</p>
            <ul>
              <li>Review and edit Arabic-English translations for accuracy, clarity, and style</li>
              <li>Ensure linguistic integrity and cultural appropriateness in AI-assisted translations</li>
              <li>Provide feedback to improve translation quality and consistency</li>
              <li>Conduct quality checks to maintain high translation standards</li>
            </ul>
          </article>
        </section>
      </div>
      
      <ExperienceClient />
    </>
  )
}