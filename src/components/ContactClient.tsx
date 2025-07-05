"use client"
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from "framer-motion"
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin,
  FaInstagram 
} from "react-icons/fa"
import { SiFiverr, SiUpwork } from "react-icons/si"
import { useForm, ValidationError } from '@formspree/react'
import Image from 'next/image'

interface ContactClientProps {
  locale: string
  translations: any
}

export default function ContactClient({ locale, translations }: ContactClientProps) {
  const [state, handleSubmit] = useForm("mnnjbdyb")
  const { t } = useTranslation(locale as any)
  const isRTL = locale === 'ar'

  if (state.succeeded) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-4xl font-bold mb-12 text-center">
              {translations.contact?.form?.success || 'Thank you for your message!'}
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
          >
            {translations.contact?.title || 'Contact'}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                {translations.contact?.form?.title || 'Send a Message'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.contact?.form?.name || 'Name'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.contact?.form?.email || 'Email'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.contact?.form?.message || 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting 
                    ? (translations.contact?.form?.sending || 'Sending...') 
                    : (translations.contact?.form?.submit || 'Send Message')
                  }
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className={`text-blue-600 w-5 h-5 ${isRTL ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {translations.contact?.info?.email || 'Email'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">amirrak8@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaPhone className={`text-blue-600 w-5 h-5 ${isRTL ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {translations.contact?.info?.phone || 'Phone'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">+216 54711524</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaMapMarkerAlt className={`text-blue-600 w-5 h-5 ${isRTL ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {translations.contact?.info?.location || 'Location'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {translations.contact?.info?.locationValue || 'Sfax, Tunisia'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Connect With Me
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://github.com/mohamedyaakoubi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaGithub className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    <span className="font-medium">GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/yaakoubi-mohamed/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaLinkedin className={`w-5 h-5 text-blue-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    <span className="font-medium">LinkedIn</span>
                  </a>

                  <a
                    href="https://www.upwork.com/freelancers/~0118c281163fef05cb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <SiUpwork className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    <span className="font-medium">Upwork</span>
                  </a>

                  <a
                    href="https://www.fiverr.com/s/wkZqrpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <SiFiverr className={`w-5 h-5 text-green-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    <span className="font-medium">Fiverr</span>
                  </a>
                </div>
              </div>

              {/* Buy Me a Coffee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white text-center"
              >
                <h3 className="text-xl font-bold mb-2">
                  {translations.contact?.coffee?.title || '☕ Buy Me a Coffee'}
                </h3>
                <p className="mb-4 opacity-90">
                  {translations.contact?.coffee?.description || 'If you found my work helpful, you can buy me a coffee!'}
                </p>
                <a
                  href="https://www.buymeacoffee.com/medykb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Image
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=medykb&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                    alt={translations.contact?.coffee?.buttonAlt || "Buy Me A Coffee"}
                    width={217}
                    height={60}
                    className="rounded-lg"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

