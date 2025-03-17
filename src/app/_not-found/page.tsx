import type { Viewport } from 'next'
import Link from 'next/link'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'

// Define viewport separately
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

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Page Not Found</h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}