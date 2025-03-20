import { Service } from "@/types/services"
import { 
  FaLanguage, FaEdit, FaFileAlt, FaSearch, 
  FaHeadset, FaLaptop, FaGraduationCap, 
  FaTasks, FaChartLine, 
  FaGlobe
} from "react-icons/fa"

export const services: Service[] = [
  {
    name: "Translation & Localization",
    icon: FaLanguage,
    category: "Language Services",
    description: "Accurate and culturally-sensitive translation and localization services for Arabic and English.",
    features: [
      "Technical document translation",
      "Legal document translation",
      "Website and app localization",
      "Marketing content adaptation",
      "AI-powered translation post-editing"
    ],
    process: [
      "Initial content review",
      "Translation and localization",
      "Post-editing for AI-generated translations",
      "Quality assurance and proofreading",
      "Final review and delivery"
    ]
  },
  {
    name: "AI Data Annotation & Evaluation",
    icon: FaTasks,
    category: "AI & Data Services",
    description: "Expert AI data annotation and evaluation services to improve machine learning models.",
    features: [
      "AI prompt and response evaluation",
      "Linguistic AI testing (Arabic-English)",
      "Dataset annotation and quality assurance",
      "Sentiment analysis and intent recognition",
      "Model output assessment and feedback"
    ],
    process: [
      "Data collection and preprocessing",
      "Annotation and tagging",
      "Quality control and validation",
      "Feedback and model improvement recommendations"
    ]
  },
  {
    name: "Resume Writing & Review",
    icon: FaFileAlt,
    category: "Career Development",
    description: "Professional resume writing and review services tailored to your career goals.",
    features: [
      "Resume drafting from scratch",
      "ATS optimization",
      "Industry-specific formatting",
      "Cover letter writing",
      "Detailed feedback on existing resumes"
    ],
    process: [
      "Initial consultation",
      "Resume structure planning",
      "Content drafting and optimization",
      "Final review and refinement"
    ]
  },
  {
    name: "Technical Support & IT Consulting",
    icon: FaLaptop,
    category: "Tech & IT Services",
    description: "Providing troubleshooting, technical assistance, and IT consultations for various digital needs.",
    features: [
      "Software troubleshooting",
      "IT infrastructure consultation",
      "System setup and optimization",
      "Tech tools training",
      "Cybersecurity awareness guidance"
    ],
    process: [
      "Issue assessment",
      "Diagnosis and solution planning",
      "Implementation and testing",
      "Final review and recommendations"
    ]
  },
  {
    name: "Educational Consulting",
    icon: FaGraduationCap,
    category: "Education & Training",
    description: "Guidance on academic paths, scholarships, and professional skill development.",
    features: [
      "University application support",
      "Course and skill development advice",
      "Scholarship and grant research",
      "Career guidance for students",
      "Personalized learning strategies"
    ],
    process: [
      "Initial consultation",
      "Academic or career assessment",
      "Customized guidance plan",
      "Ongoing support and mentoring"
    ]
  },
  {
    name: "Project Management & Research Assistance",
    icon: FaChartLine,
    category: "Business & Research",
    description: "Managing projects efficiently and conducting thorough research to support decision-making.",
    features: [
      "End-to-end project coordination",
      "Deadline and resource management",
      "Market and academic research",
      "Comprehensive data analysis",
      "Report writing and documentation"
    ],
    process: [
      "Project or research briefing",
      "Planning and execution",
      "Data collection and analysis",
      "Final report and presentation"
    ]
  },
  {
    name: "Career Development Coaching",
    icon: FaChartLine,
    category: "Career Development",
    description: "Personalized coaching for career growth and success.",
    features: [
      "Resume and cover letter optimization",
      "Interview preparation",
      "Job search strategies",
      "Professional networking guidance",
      "Long-term career planning"
    ],
    process: [
      "Initial consultation",
      "Skill and career assessment",
      "Customized development plan",
      "Ongoing mentorship and support"
    ]
  },
  {
    name: "Web Development & Digital Presence",
    icon: FaGlobe,
    category: "Tech & IT Services",
    description: "Professional web development services to establish and enhance your digital presence.",
    features: [
      "Responsive website development",
      "Portfolio and showcase websites",
      "AI-enhanced website features",
      "Content creation and management",
      "Multilingual support"
    ],
    process: [
      "Requirements analysis and planning",
      "Design and development",
      "Content creation and integration",
      "Testing and quality assurance",
      "Launch and maintenance"
    ],
    tariffLink: "https://tariff-mu.vercel.app/"
  },
  
];