import type { Viewport, Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Create a loading component that matches your design
const ProjectsLoading = () => (
  <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-4xl font-bold mb-12 text-center">
        Projects
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// Dynamically import the heavy client component
const ProjectsClient = dynamic(() => import('@/components/ProjectsClient'), {
  loading: () => <ProjectsLoading />
})

export const metadata: Metadata = {
  title: 'Projects | Mohamed Yaakoubi',
  description: 'Explore Mohamed Yaakoubi\'s portfolio of projects in AI, web development, and localization. View featured projects and GitHub repositories.',
  alternates: {
    canonical: 'https://mohamed-yakoubi.vercel.app/projects'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default function ProjectsPage() {
  return (
    <>
      {/* Add comprehensive static pre-rendered content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h1>Projects - Mohamed Yaakoubi</h1>
        <p>Explore a collection of innovative projects developed by Mohamed Yaakoubi, spanning AI/ML, healthcare technology, and web development. View featured projects and open-source GitHub repositories.</p>
        
        <section aria-labelledby="featured-projects">
          <h2 id="featured-projects">Featured Projects</h2>
          
          <article>
            <h3>NotYet - AI Career Guidance Platform</h3>
            <p>AI-powered web application assisting Tunisian students and job seekers in career development.</p>
            <p>NotYet is an AI-driven platform designed to help Tunisian students and job seekers by offering career guidance, educational pathways, and skill-building resources. Built with React, Firebase, and Azure AI, it integrates AI-powered search and recommendation systems to optimize user experiences.</p>
            <p>Technologies: React, Firebase, Azure AI, Prompt Engineering</p>
            <p>Status: In Progress</p>
            <ul>
              <li>AI-powered career and education recommendations</li>
              <li>Personalized guidance based on user input</li>
              <li>Integration with Azure AI for smart analysis</li>
              <li>Community-driven discussions and mentorship</li>
            </ul>
            <p>Demo: https://notyet-demo.vercel.app</p>
            <p>GitHub: https://github.com/mohamedyaakoubi/notyet</p>
          </article>

          <article>
            <h3>DocuMed - Medical Documentation Platform</h3>
            <p>Web-based medical documentation and management platform for healthcare professionals.</p>
            <p>DocuMed simplifies medical record management by providing a digital platform for organizing patient records, prescriptions, and appointments. It was developed as part of the MentorNations Bootcamp using React and Firebase.</p>
            <p>Technologies: React, Firebase</p>
            <p>Status: Completed</p>
            <ul>
              <li>Secure cloud-based storage for medical records</li>
              <li>User-friendly patient management system</li>
              <li>Real-time appointment scheduling and tracking</li>
              <li>Collaborative tools for healthcare professionals</li>
            </ul>
            <p>Demo: https://docu-med.vercel.app/</p>
            <p>GitHub: https://github.com/mohamedyaakoubi/documed</p>
          </article>

          <article>
            <h3>Potential - AI-Powered Search Engine</h3>
            <p>AI-powered search engine for the Abu Dhabi Open Data Platform with real-time API query processing.</p>
            <p>Potential enhances the Abu Dhabi Open Data Platform by integrating GPT-4 with Azure Cognitive Search, enabling users to retrieve relevant datasets using natural language queries. It dynamically indexes API-accessed data and refines queries using LLM-powered suggestions.</p>
            <p>Technologies: Next.js, Azure Cognitive Search, GPT-4, API Query Processing</p>
            <p>Status: Completed</p>
            <ul>
              <li>Natural language dataset search powered by GPT-4</li>
              <li>Real-time API indexing and retrieval</li>
              <li>Automated query refinement for better results</li>
              <li>Seamless integration with Abu Dhabi Open Data API</li>
            </ul>
            <p>Demo: https://potential-kegz.vercel.app/</p>
            <p>GitHub: https://github.com/mohamedyaakoubi/potential</p>
          </article>
        </section>

        <section aria-labelledby="github-repositories">
          <h2 id="github-repositories">GitHub Repositories</h2>
          <p>Explore open-source projects and code repositories on GitHub, including AI/ML experiments, web applications, and development tools.</p>
          
          <article>
            <h3>Project Categories</h3>
            <ul>
              <li>AI/ML Projects - Machine learning models, AI applications, and data science projects</li>
              <li>Healthcare Technology - Medical software and healthcare management tools</li>
              <li>Web Development - Full-stack web applications and frontend projects</li>
              <li>API Development - Backend services and API integrations</li>
              <li>Open Source Contributions - Community projects and collaborative development</li>
            </ul>
          </article>

          <article>
            <h3>Technologies Used</h3>
            <ul>
              <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
              <li>Backend: Node.js, Firebase, API Development</li>
              <li>AI/ML: Azure AI, GPT-4, Prompt Engineering, Machine Learning</li>
              <li>Cloud Services: Azure Cognitive Search, Firebase</li>
              <li>Tools: Git, GitHub, Vercel, Development Workflows</li>
            </ul>
          </article>

          <article>
            <h3>Project Highlights</h3>
            <ul>
              <li>AI-powered applications with natural language processing</li>
              <li>Healthcare management and documentation systems</li>
              <li>Search engines with advanced query processing</li>
              <li>Career guidance and educational platforms</li>
              <li>API integrations and data processing tools</li>
            </ul>
          </article>
        </section>

        <section aria-labelledby="technical-skills">
          <h2 id="technical-skills">Technical Skills Demonstrated</h2>
          <ul>
            <li>Artificial Intelligence and Machine Learning implementation</li>
            <li>Full-stack web development with modern frameworks</li>
            <li>API design and integration</li>
            <li>Cloud computing and serverless architecture</li>
            <li>Database design and management</li>
            <li>User experience and interface design</li>
            <li>Performance optimization and scalability</li>
            <li>Security best practices and data protection</li>
          </ul>
        </section>
      </div>

      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient />
      </Suspense>
    </>
  )
}