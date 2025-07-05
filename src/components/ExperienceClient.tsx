"use client"
import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"
import type { Experience } from "@/types/experience"
import { useTranslation } from '@/hooks/useTranslation'

interface ExperienceClientProps {
  locale: string
  translations: any
}

const experiences: Experience[] = [
    {
    title: "Video Metadata Writer",
    company: "Wirestock",
    companyUrl: "https://wirestock.io",
    location: "Sfax (Remote)",
    period: "Apr 2025 - Present",
    description: [
      "Wrote detailed and structured metadata for edited videos, including final goal articulation, video descriptions, cut rationales, and audio choices",
      "Segmented raw video footage and authored rationale-rich descriptions for each segment to support clear storytelling and narrative flow",
      "Evaluated video content and metadata for coherence, quality, and alignment with intended visual communication",
      "Collaborated with the remote team through consistent communication and adherence to content guidelines and structured workflows"
    ],
  },
  {
    title: "Technical Content Writer & Web Operations Assistant",
    company: "UbiAi",
    companyUrl: "https://ubiai.tools",
    location: "Sfax (Remote)",
    period: "Mar 2025 - Present",
    description: [
      "Created technical blog content and tutorials on LLM fine-tuning, NLP, and AI topics for a WordPress-based platform",
      "Performed website audits and diagnostics to improve UX, SEO, and platform performance",
      "Collaborated with client to plan content strategy, including potential video tutorials and community engagement efforts",
      "Acted as a liaison and task coordinator for external media and marketing support to ensure project delivery"
    ],
  },
  {
    title: "Linguistic Editor",
    company: "DeepL",
    companyUrl: "https://www.deepl.com",
    location: "Sfax (Remote)",
    period: "Feb 2025 - Present",
    description: [
      "Evaluate and refine AI-generated Arabic-English translations for accuracy and fluency",
      "Identify translation errors, provide corrections, and explain linguistic issues",
      "Work on diverse language tasks, including quality assessment and transcreation",
      "Collaborate with DeepL's Language Data team to enhance AI translation models",
    ],
  },
  {
    title: "Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI",
    company: "RWS",
    companyUrl: "https://www.rws.com",
    location: "Sfax (Remote)",
    period: "Nov 2024 - Present",
    description: [
      "Evaluate multilingual prompts and AI-generated responses in Arabic to refine advanced Large Language Models, including projects like Llama 4",
      "Rank outputs based on quality metrics such as coherence, fluency, and cultural relevance to enhance AI-driven conversational tools",
      "Provide detailed feedback to improve linguistic and contextual accuracy, ensuring alignment with diverse cultural and linguistic norms",
    ],
  },
  {
    title: "Localization Vendor Coordinator",
    company: "Uber (via Volga Partners)",
    companyUrl: "https://www.uber.com",
    location: "Sfax (Remote)",
    period: "Jul 2024 - Present",
    description: [
      "Evaluate Arabic and English AI-generated content for linguistic and cultural accuracy",
      "Provide precise English to Arabic translations, maintaining nuance and relevance",
      "Coordinate localization efforts to optimize user experience in both languages",
      "Contribute to AI model improvements through data labeling and collaboration with teams",
    ],
  },
  {
    title: "Language Data and Quality Reviewer",
    company: "Volga Partners",
    companyUrl: "https://volgapartners.com",
    location: "Sfax (Remote)",
    period: "Jul 2024 - Present",
    description: [
      "Provide language data and quality review services on a project basis",
      "Collaborate directly with clients of Volga Partners to meet their specific needs",
      "Ensure high-quality deliverables tailored to each unique project",
    ],
  },
  {
    title: "KYC Validator",
    company: "Pi Network",
    companyUrl: "https://minepi.com",
    location: "Sfax (Remote)",
    period: "Jul 2024 - Present",
    description: [
      "Reviewing submitted identification documents for authenticity",
      "Cross-referencing information against official records",
      "Maintaining a high standard of accuracy and confidentiality",
    ],
  },
  {
    title: "Freelance AI Data Annotator",
    company: "Toloka",
    companyUrl: "https://toloka.ai",
    location: "Sfax (Remote)",
    period: "Feb 2024 - Aug 2024",
    description: [
      "Conducted data labeling, image annotation, and text transcription for AI training",
      "Ensured high-quality annotations to improve machine learning models",
      "Worked on diverse projects across multiple industries",
      "Collaborated with a global workforce to meet task requirements efficiently",
    ],
  },
  {
    title: "Crowdsourced Data Contributor",
    company: "Premise",
    companyUrl: "https://www.premise.com",
    location: "Sfax (Remote)",
    period: "Feb 2024 - Sep 2024",
    description: [
      "Conducted surveys via Premise mobile app on various topics",
      "Provided accurate data adhering to Premise's guidelines",
      "Contributed to real-time insights for governments and businesses",
      "Collaborated with global network of contributors",
    ],
  },
  {
    title: "Subtitle Editor",
    company: "TED Translators",
    companyUrl: "https://www.ted.com/participate/translate",
    location: "Sfax (Remote)",
    period: "Apr 2024 - Present",
    description: [
      "Translate and subtitle TED Talks into native language, ensuring global accessibility",
      "Ensure quality and accuracy while preserving the speaker's original message",
      "Collaborate with other translators through the Amara CAT tool",
      "Engage in continuous learning by exploring diverse topics",
      "Contribute to global idea exchange and empower non-English speakers",
    ],
  },
  {
    title: "Freelance Editor (Arabic to English & English to Arabic)",
    company: "Unbabel",
    companyUrl: "https://unbabel.com",
    location: "Sfax (Remote)",
    period: "Mar 2020 - Present",
    description: [
      "Review and edit Arabic-English translations for accuracy, clarity, and style",
      "Ensure linguistic integrity and cultural appropriateness in AI-assisted translations",
      "Provide feedback to improve translation quality and consistency",
      "Conduct quality checks to maintain high translation standards",
    ],
  },
]

export default function ExperienceClient({ locale, translations }: ExperienceClientProps) {
  const { t } = useTranslation(locale as any)
  const isRTL = locale === 'ar'

  const getTranslatedExperience = (exp: Experience) => {
    return {
      ...exp,
      title: translations.experience?.positions?.[exp.title] || exp.title,
      company: translations.experience?.companies?.[exp.company] || exp.company,
      location: translations.experience?.locations?.[exp.location] || exp.location,
      period: translations.experience?.periods?.[exp.period] || exp.period,
      description: exp.description.map(desc => 
        translations.experience?.descriptions?.[desc] || desc
      )
    }
  }

  return (
    <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {translations.experience?.title || 'Experience'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional journey in AI, translation, and technology
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => {
            const translatedExp = getTranslatedExperience(experience)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 relative"
              >
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-16 w-0.5 h-full bg-blue-200 dark:bg-blue-800`} />
                )}
                
                {/* Timeline dot */}
                <div className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900`} />
                
                <div className={`${isRTL ? 'mr-12' : 'ml-12'} bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {translatedExp.title}
                      </h3>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                        <Building2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <a 
                          href={experience.companyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline font-medium"
                        >
                          {translatedExp.company}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center mb-1">
                        <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <span>{translatedExp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <span>{translatedExp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {translatedExp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className={`inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

