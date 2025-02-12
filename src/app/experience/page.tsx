"use client"

import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"
import type { Experience } from "@/types/experience"




const experiences: Experience[] = [
  {
    title: "Linguistic Editor",
    company: "DeepL",
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
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{experience.title}</h3>
      <div className="mt-2 text-gray-600 dark:text-gray-300">
        <p className="flex items-center"><Building2 className="w-4 h-4 mr-2" />{experience.company}</p>
        <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{experience.location}</p>
        <p className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{experience.period}</p>
      </div>
      <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-300">
        {experience.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Create a separate component for experience content
export default function Experience() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-gray-100 dark:bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
      >
        Professional Experience
      </motion.h1>

      <div className="relative max-w-7xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform md:-translate-x-1/2" />

        {/* Experience items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative mb-8 md:mb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 mt-6 z-10">
              <div className="absolute inset-[2px] bg-gray-100 dark:bg-gray-900 rounded-full" />
            </div>

            <div className={`ml-12 md:ml-0 ${
              index % 2 === 0 
                ? 'md:mr-[50%] md:pr-12' 
                : 'md:ml-[50%] md:pl-12'
            }`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <ExperienceContent experience={exp} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}