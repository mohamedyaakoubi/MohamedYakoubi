import type { Viewport, Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Site Map | Mohamed Yaakoubi',
  description: 'Complete navigation map of Mohamed Yaakoubi\'s portfolio website, providing easy access to all sections and pages.',
}

// Add viewport export for consistency with other pages
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

export default function HTMLSitemap() {
    return (
      <div className="container mx-auto p-8 py-32 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Site Map</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  Home
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  Overview of Mohamed Yaakoubi's skills, experience, and professional background
                </p>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  Projects
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  Showcase of featured projects and GitHub repositories
                </p>
              </li>
              <li>
                <Link 
                  href="/services"
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  Services
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  Professional services offered including AI solutions and web development
                </p>
              </li>
              <li>
                <Link 
                  href="/experience"
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  Experience
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  Professional work experience at companies like DeepL, RWS, and Uber
                </p>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  Contact
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  Contact form and professional social media profiles
                </p>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/Mohamed_Yaakoubi.pdf"
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                  aria-label="Download Mohamed Yaakoubi's Resume (PDF)"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  Resume/CV
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  Download Mohamed Yaakoubi's resume in PDF format
                </p>
              </li>
              <li>
                <a 
                  href="https://github.com/mohamedyaakoubi"
                  className="text-blue-700 dark:text-blue-400 underline decoration-[1.5px] underline-offset-2 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Mohamed Yaakoubi's GitHub Profile (opens in new tab)"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-700 dark:bg-blue-400 mr-1.5"></span>
                  GitHub Profile
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-3">
                  View source code and contributions on GitHub
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
}