"use client"

import Link from 'next/link'
import { FaHome, FaCode, FaLightbulb } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function NotFoundClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            The page you're looking for seems to have vanished into the digital void.
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400">
            Don't worry, even the best developers encounter broken links sometimes!
          </p>
        </motion.div>

        {/* Fun Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 mb-8 text-left max-w-md mx-auto"
        >
          <div className="flex items-center mb-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <code className="text-green-400 text-sm">
            <span className="text-purple-400">if</span> (page.exists()) {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-blue-400">render</span>(page);
            <br />
            {'}'} <span className="text-purple-400">else</span> {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-red-400">return</span> <span className="text-yellow-300">"404"</span>;
            <br />
            {'}'}
          </code>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          
          <Link 
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            <FaCode className="mr-2" />
            View Projects
          </Link>
          
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            <FaLightbulb className="mr-2" />
            Get in Touch
          </Link>
        </motion.div>

        {/* Fun suggestion */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-8"
        >
          💡 <strong>Pro tip:</strong> Try checking the URL for typos, or use the navigation menu above!
        </motion.p>
      </div>
    </div>
  )
}