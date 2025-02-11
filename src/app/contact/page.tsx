"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa"
import { useForm, ValidationError } from '@formspree/react'

export default function Contact() {
  const [state, handleSubmit] = useForm("mnnjbdyb")

  if (state.succeeded) {
    return (
      <div className="container mx-auto px-6 py-32 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Thank you for your message!</h3>
            <p className="text-gray-600 dark:text-gray-300">I'll get back to you as soon as possible.</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-32 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
        >
          Get in Touch
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <FaEnvelope className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
                <a
                  href="mailto:amirrak8@gmail.com
"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                  amirrak8@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <FaPhone className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Phone</h3>
                <a href="tel:+21654711524" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
                  +216 54711524
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">Sfax, Tunisia</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <a
                href="https://github.com/mohamedyaakoubi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yaakoubi-mohamed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            
            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
        

{/* Coffee Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="md:col-span-2 mt-16 text-center"
>
  <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white dark:bg-gray-800 
                  shadow-lg hover:shadow-xl transition-all duration-300">
    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
      ☕ Let's have a coffee together
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      If you find my work helpful, consider buying me a coffee!
    </p>
    <motion.a
      href="https://www.buymeacoffee.com/medykb"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <img 
        src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=medykb&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
        alt="Buy Me A Coffee"
        className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
      />
    </motion.a>
  </div>
</motion.div>
      </div>
    </div>
    
  )
}

