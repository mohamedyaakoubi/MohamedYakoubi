import { Project } from "@/types/project"

export const featuredProjects: Project[] = [
    {
    name: "NotYet",
    category: "AI/ML",
    description: "AI-powered web application assisting Tunisian students and job seekers in career development.",
    longDescription: "NotYet is an AI-driven platform designed to help Tunisian students and job seekers by offering career guidance, educational pathways, and skill-building resources. Built with React, Firebase, and Azure AI, it integrates AI-powered search and recommendation systems to optimize user experiences.",
    technologies: ["React", "Firebase", "Azure AI", "Prompt Engineering"],
    demoUrl: "https://notyet-demo.vercel.app",
    githubUrl: "https://github.com/mohamedyaakoubi/notyet",
    image: "/NotYet.webp",
    features: [
      "AI-powered career and education recommendations",
      "Personalized guidance based on user input",
      "Integration with Azure AI for smart analysis",
      "Community-driven discussions and mentorship"
    ],
    status: "in-progress"
  },
    {
    name: "InternationalSkills",
    category: "Web Development",
    description: "Comprehensive recruiting system for InternationalSkills.fi connecting job seekers with employers.",
    longDescription: "The International Skills Candidate Portal is a web application that streamlines the job application process for everyone. For Job Seekers: create an account, fill out applications, upload documents (CV, certificates), and track application status with real-time updates and interview notifications. For Recruiters/Admins: access a powerful admin dashboard to view all candidates, filter and sort applicants, schedule interviews with automatic Google Meet links, score candidates using AI-powered evaluation, and update application statuses. The portal is secure, web-based, and features email verification, calendar integration, and AI-powered scoring to save time and make hiring easier.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Google Calendar API", "AI Scoring"],
    demoUrl: "https://candidate-git-latest-mohamedyaakoubis-projects.vercel.app/",
    image: "/projects/international-skills-labor-company.webp",
    features: [
      "User authentication with email verification",
      "Complete candidate profile management with document uploads",
      "Real-time application tracking and status updates",
      "Admin dashboard with advanced filtering and sorting",
      "Automated interview scheduling with Google Meet integration",
      "AI-powered candidate scoring and evaluation",
      "Email notifications for status updates and interviews",
      "Secure document storage and management"
    ],
    status: "completed"
  },

    {
    name: "Potential",
    category: "AI/ML",
    description: "AI-powered search engine for the Abu Dhabi Open Data Platform with real-time API query processing.",
    longDescription: "Potential enhances the Abu Dhabi Open Data Platform by integrating GPT-4 with Azure Cognitive Search, enabling users to retrieve relevant datasets using natural language queries. It dynamically indexes API-accessed data and refines queries using LLM-powered suggestions.",
    technologies: ["Next.js", "Azure Cognitive Search", "GPT-4", "API Query Processing"],
    demoUrl: "https://potential-kegz.vercel.app/",
    githubUrl: "https://github.com/mohamedyaakoubi/potential",
    image: "/Potential.webp",
    features: [
      "Natural language dataset search powered by GPT-4",
      "Real-time API indexing and retrieval",
      "Automated query refinement for better results",
      "Seamless integration with Abu Dhabi Open Data API"
    ],
    status: "completed"
  },
  {
    name: "DocuMed",
    category: "Healthcare",
    description: "Web-based medical documentation and management platform for healthcare professionals.",
    longDescription: "DocuMed simplifies medical record management by providing a digital platform for organizing patient records, prescriptions, and appointments. It was developed as part of the MentorNations Bootcamp using React and Firebase.",
    technologies: ["React", "Firebase"],
    demoUrl: "https://docu-med.vercel.app/",
    githubUrl: "https://github.com/mohamedyaakoubi/documed", 
    image: "/DocuMed.webp",
    features: [
      "Secure cloud-based storage for medical records",
      "User-friendly patient management system",
      "Real-time appointment scheduling and tracking",
      "Collaborative tools for healthcare professionals"
    ],
    status: "completed"
  },


];
