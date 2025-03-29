import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Site Map | Mohamed Yaakoubi',
  description: 'Complete navigation map of Mohamed Yaakoubi\'s portfolio website, providing easy access to all sections and pages.',
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
                <Link href="/" className="text-blue-700 hover:underline dark:text-blue-400">
                  Home
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Overview of Mohamed Yaakoubi's skills, experience, and professional background
                </p>
              </li>
              <li>
                <Link href="/projects" className="text-blue-700 hover:underline dark:text-blue-400">
                  Projects
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Showcase of featured projects and GitHub repositories
                </p>
              </li>
              <li>
                <Link href="/services" className="text-blue-700 hover:underline dark:text-blue-400">
                  Services
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Professional services offered including AI solutions and web development
                </p>
              </li>
              <li>
                <Link href="/experience" className="text-blue-700 hover:underline dark:text-blue-400">
                  Experience
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Professional work experience at companies like DeepL, RWS, and Uber
                </p>
              </li>
              <li>
                <Link href="/contact" className="text-blue-700 hover:underline dark:text-blue-400">
                  Contact
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Contact form and professional social media profiles
                </p>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <ul className="space-y-4">
              <li>
                <a href="/Mohamed_Yaakoubi.pdf" className="text-blue-700 hover:underline dark:text-blue-400">
                  Resume/CV
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Download Mohamed Yaakoubi's resume in PDF format
                </p>
              </li>
              <li>
                <a href="https://github.com/mohamedyaakoubi" className="text-blue-700 hover:underline dark:text-blue-400">
                  GitHub Profile
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  View source code and contributions on GitHub
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
}