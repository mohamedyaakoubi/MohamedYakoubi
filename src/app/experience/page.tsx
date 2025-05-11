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
              <li>Write detailed metadata for edited videos, including final goal articulation and video descriptions</li>
              <li>Segment raw video footage with descriptions for clear storytelling</li>
              <li>Evaluate video content for coherence and quality</li>
              <li>Collaborate with remote team through consistent communication</li>
            </ul>
          </article>
          
          <article>
            <h3>Technical Content Writer | UbiAi</h3>
            <p>March 2025 - Present | Sfax (Remote)</p>
            <ul>
              <li>Create technical blog content on LLM fine-tuning and NLP topics</li>
              <li>Perform website audits to improve UX and SEO</li>
              <li>Plan content strategy including video tutorials</li>
            </ul>
          </article>
          
          <article>
            <h3>Linguistic Editor | DeepL</h3>
            <p>February 2025 - Present | Sfax (Remote)</p>
            <ul>
              <li>Evaluate AI-generated Arabic-English translations</li>
              <li>Identify translation errors and provide corrections</li>
              <li>Enhance AI translation models through quality feedback</li>
            </ul>
          </article>
          
          <article>
            <h3>Linguistic AI Evaluator | RWS (Meta AI)</h3>
            <p>November 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Evaluate multilingual prompts for advanced LLMs like Llama 4</li>
              <li>Rank outputs based on quality metrics</li>
              <li>Improve linguistic and contextual accuracy</li>
            </ul>
          </article>
          
          <article>
            <h3>Localization Vendor Coordinator | Uber (via Volga Partners)</h3>
            <p>July 2024 - Present | Sfax (Remote)</p>
            <ul>
              <li>Evaluate Arabic and English AI-generated content</li>
              <li>Coordinate localization efforts for optimal user experience</li>
              <li>Contribute to AI model improvements through data labeling</li>
            </ul>
          </article>
        </section>
      </div>
      
      <ExperienceClient />
    </>
  )
}