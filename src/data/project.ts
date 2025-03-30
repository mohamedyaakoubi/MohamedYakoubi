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
    image: "/NotYet.PNG",
    features: [
      "AI-powered career and education recommendations",
      "Personalized guidance based on user input",
      "Integration with Azure AI for smart analysis",
      "Community-driven discussions and mentorship"
    ],
    status: "in-progress"
  },
  {
    name: "DocuMed",
    category: "Healthcare",
    description: "Web-based medical documentation and management platform for healthcare professionals.",
    longDescription: "DocuMed simplifies medical record management by providing a digital platform for organizing patient records, prescriptions, and appointments. It was developed as part of the MentorNations Bootcamp using React and Firebase.",
    technologies: ["React", "Firebase"],
    demoUrl: "https://docu-med.vercel.app/",
    githubUrl: "https://github.com/mohamedyaakoubi/documed", 
    image: "/DocuMed.PNG",
    features: [
      "Secure cloud-based storage for medical records",
      "User-friendly patient management system",
      "Real-time appointment scheduling and tracking",
      "Collaborative tools for healthcare professionals"
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
    image: "/Potential.PNG",
    features: [
      "Natural language dataset search powered by GPT-4",
      "Real-time API indexing and retrieval",
      "Automated query refinement for better results",
      "Seamless integration with Abu Dhabi Open Data API"
    ],
    status: "completed"
  },
];
