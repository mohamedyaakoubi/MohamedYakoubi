"use client"

import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"

const experiences = [
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

export default function Experience() {
  return (
    <div className="container mx-auto px-6 py-32 bg-gray-100 dark:bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
      >
        Professional Experience
      </motion.h1>
  
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2" />
  
        {/* Experience items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 mt-1.5">
              <div className="absolute inset-[2px] bg-gray-100 dark:bg-gray-900 rounded-full" />
            </div>
  
            {/* Content */}
            {index % 2 === 0 ? (
  <>
    <div className="md:text-left md:pr-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        {exp.title}
      </h3>
      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 my-2">
        <div className="flex items-center gap-1">
          <Building2 className="w-4 h-4" />
          <span>{exp.company}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{exp.location}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500 mb-4">
        <Calendar className="w-4 h-4" />
        <span>{exp.period}</span>
      </div>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        {exp.description.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div /> {/* Empty column */}
  </>
) : (
  <>
  <div /> {/* Empty column */}
  <div className="md:text-left md:pl-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 my-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

