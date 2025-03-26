import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site Map | Mohamed Yaakoubi',
  description: 'Complete navigation map of Mohamed Yaakoubi\'s portfolio website, providing easy access to all sections and pages.',
}

export default function HTMLSitemap() {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Site Map</h1>
        <ul className="space-y-4">
          <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
          <li><a href="/projects" className="text-blue-600 hover:underline">Projects</a></li>
          <li><a href="/services" className="text-blue-600 hover:underline">Services</a></li>
          <li><a href="/experience" className="text-blue-600 hover:underline">Experience</a></li>
          <li><a href="/contact" className="text-blue-600 hover:underline">Contact</a></li>
        </ul>
      </div>
    )
}