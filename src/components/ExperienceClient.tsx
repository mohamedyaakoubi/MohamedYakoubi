"use client"
import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"
import type { Experience } from "@/types/experience"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'



const experiences: Experience[] = [
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
    companyUrl: "https://www.volgapartners.com",
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
interface ExperienceContentProps {
  experience: Experience;
}

function ExperienceContent({ experience }: ExperienceContentProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {t(`experience.positions.${experience.title}`)}
      </h3>
      <div className="mt-2 text-gray-600 dark:text-gray-300">
        <p className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Building2 className={language === 'ar' ? 'ml-2' : 'mr-2'} />
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors underline decoration-dotted"
            >
              {t(`experience.companies.${experience.company}`)}
            </a>
          ) : (
            t(`experience.companies.${experience.company}`)
          )}
        </p>
        <p className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <MapPin className={language === 'ar' ? 'ml-2' : 'mr-2'} />
          {t(`experience.locations.${experience.location}`)}
        </p>
        <p className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Calendar className={language === 'ar' ? 'ml-2' : 'mr-2'} />
          {t(`experience.periods.${experience.period}`)}
        </p>
      </div>
      <ul className={`mt-4 list-disc ${language === 'ar' ? 'mr-4' : 'ml-4'} text-gray-600 dark:text-gray-300`}>
        {experience.description.map((item, index) => (
          <li key={index}>{t(`experience.descriptions.${item}`)}</li>
        ))}
      </ul>
    </div>
  );
}

// Update the Experience component with timeline and better rendering
export default function Experience() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  // Update the return section of your Experience component
 // Update the return section of your Experience component
return (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-gray-100 dark:bg-gray-900">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
    >
      {t('experience.title')}
    </motion.h1>

    <div className="timeline-container">
      {/* Timeline line */}
      <div className="timeline-line" />

{experiences.map((exp, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }} // Changed from whileInView to animate
    transition={{ 
      duration: 0.5, 
      delay: index * 0.1,
      ease: "easeOut"
    }}
    className="timeline-item"
  >
    {/* Timeline dot */}
    <div className="timeline-dot">
      <div className="timeline-dot-inner" />
    </div>
    
    {/* Experience card */}
    <div className="experience-card-container">
      <motion.div 
        className="experience-card"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <ExperienceContent experience={exp} />
      </motion.div>
    </div>
  </motion.div>
))}
    </div>
  </div>
)}