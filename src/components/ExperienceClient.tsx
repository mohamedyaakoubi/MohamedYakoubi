"use client"
import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"
import type { Experience } from "@/types/experience"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'

const experiences: Experience[] = [
  {
    title: "Media Content & Metadata Specialist",
    company: "Wirestock",
    companyUrl: "https://wirestock.io",
    location: "Sfax (Remote)",
    period: "Apr 2025 - Present",
    description: [
      "wirestock_desc_1",
      "wirestock_desc_2",
      "wirestock_desc_3",
      "wirestock_desc_4",
      "wirestock_desc_5",
      "wirestock_desc_6",
      "wirestock_desc_7",
      "wirestock_desc_8",
      "wirestock_desc_9",
      "wirestock_desc_10",
      "wirestock_desc_11"
    ],
  },
  {
    title: "Transcriber – Arabic (Maghrebi)",
    company: "ProsessorAI Data & Language Services",
    companyUrl: "https://www.prosessor-ai.com/",
    location: "Sfax (Remote)",
    period: "Sep 2025 - Present",
    description: [
      "prosessor_desc_1",
      "prosessor_desc_2",
      "prosessor_desc_3",
      "prosessor_desc_4",
      "prosessor_desc_5"
    ],
  },
{
  title: "Technical Content Writer & Web Operations Assistant",
  company: "UbiAi",
  companyUrl: "https://ubiai.tools",
  location: "Sfax (Remote)",
  period: "Mar 2025 - Jun 2025",
  description: [
      "ubiai_desc_1",
      "ubiai_desc_2",
      "ubiai_desc_3",
      "ubiai_desc_4",
  ],
},
  {
    title: "Linguistic Editor",
    company: "DeepL",
    companyUrl: "https://www.deepl.com",
    location: "Sfax (Remote)",
    period: "Feb 2025",
    description: [
      "deepl_desc_1",
      "deepl_desc_2",
      "deepl_desc_3",
      "deepl_desc_4",
      "deepl_desc_5"
    ],
  },
  {
    title: "Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI",
    company: "RWS",
    companyUrl: "https://www.rws.com",
    location: "Sfax (Remote)",
    period: "Nov 2024 - Present",
    description: [
      "rws_desc_1",
      "rws_desc_2",
      "rws_desc_3"
    ],
  },
  {
    title: "Localization Vendor Coordinator",
    company: "Uber (via Volga Partners)",
    companyUrl: "https://www.uber.com",
    location: "Sfax (Remote)",
    period: "Jul 2024 - Present",
    description: [
      "uber_desc_1",
      "uber_desc_2",
      "uber_desc_3",
      "uber_desc_4",
      "uber_desc_5",
      "uber_desc_6"
    ],
  },
  {
    title: "Language Data and Quality Reviewer",
    company: "Volga Partners",
    companyUrl: "https://www.volgapartners.com",
    location: "Sfax (Remote)",
    period: "Jul 2024 - Present",
    description: [
      "volga_desc_1",
      "volga_desc_2",
      "volga_desc_3",
      "volga_desc_4"
    ],
  },
  {
    title: "Freelance AI Data Annotator",
    company: "Toloka",
    companyUrl: "https://toloka.ai",
    location: "Sfax (Remote)",
    period: "Feb 2024 - Aug 2024",
    description: [
      "toloka_desc_1",
      "toloka_desc_2",
      "toloka_desc_3",
      "toloka_desc_4",
      "toloka_desc_5",
      "toloka_desc_6"
    ],
  },
  {
    title: "Crowdsourced Data Contributor",
    company: "Premise",
    companyUrl: "https://www.premise.com",
    location: "Sfax (Remote)",
    period: "Feb 2024 - Sep 2024",
    description: [
      "premise_desc_1",
      "premise_desc_2",
      "premise_desc_3",
      "premise_desc_4"
    ],
  },
  {
    title: "Subtitle Editor",
    company: "TED Translators",
    companyUrl: "https://www.ted.com/participate/translate",
    location: "Sfax (Remote)",
    period: "Apr 2024 - Present",
    description: [
      "ted_desc_1",
      "ted_desc_2",
      "ted_desc_3",
      "ted_desc_4",
      "ted_desc_5",
      "ted_desc_6",
      "ted_desc_7"
    ],
  },
  {
    title: "KYC Validator (Know your customer)",
    company: "Pi Network",
    companyUrl: "https://minepi.com",
    location: "Sfax (Remote)",
    period: "Jul 2024 - Present",
    description: [
      "pi_desc_1",
      "pi_desc_2",
      "pi_desc_3",
      "pi_desc_4"
    ],
  },
  {
    title: "Freelance Editor (Arabic to English & English to Arabic)",
    company: "Unbabel",
    companyUrl: "https://unbabel.com",
    location: "Sfax (Remote)",
    period: "Mar 2020 - Present",
    description: [
      "unbabel_desc_1",
      "unbabel_desc_2",
      "unbabel_desc_3",
      "unbabel_desc_4",
      "unbabel_desc_5",
      "unbabel_desc_6",
      "unbabel_desc_7"
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
              aria-label={`${t(`experience.companies.${experience.company}`)} ${t('common.website')}`}
              title={`${t('common.visitWebsite')}: ${t(`experience.companies.${experience.company}`)}`}
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
  {experience.description.map((item, index) => {
    // First get the base translation without any links
    let translatedItem = t(`experience.descriptions.${item}`);
    
    // Handle UbiAi specific items with links - only if translation was successful
    if (experience.company === "UbiAi" && translatedItem !== `experience.descriptions.${item}`) {
      if (index === 0) {
        translatedItem += ` <a href="https://ubiai.tools/author/mohamedyaakoubi/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${t('experience.links.authorPage')}</a>`;
      }
      if (index === 1) {
        translatedItem += ` <a href="https://ubiai-audit.notion.site/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${t('experience.links.sampleAudit')}</a> <span class="text-gray-600">${t('experience.links.nonConfidential')}</span>`;
      }
    }
    
    return (
      <li 
        key={index} 
        dangerouslySetInnerHTML={{ 
          __html: translatedItem 
        }} 
      />
    )
  })}
</ul>
    </div>
  );
}

export default function ExperienceClient() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-gray-100 dark:bg-gray-900">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
      >
        {t('experience.title')}
      </motion.h2>

      <div className="timeline-container">
        {/* Timeline line */}
        <div className="timeline-line" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
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
  )
}