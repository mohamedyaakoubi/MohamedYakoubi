"use client"
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
  
  // Use the passed locale for RTL detection
  const isRTL = locale === 'ar'

  if (state.succeeded) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-4xl font-bold mb-12 text-center">
              {translations?.contact?.form?.success || 'Thank you for your message!'}
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
            {translations?.contact?.title || 'Contact Me'}
          </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="space-y-6"
>
  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
    <div className="bg-blue-500/20 p-3 rounded-full">
      <FaEnvelope className="text-blue-500 w-6 h-6" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">
        {translations?.contact?.info?.email || 'Email'}
      </h3>
      <a href="mailto:amirrak8@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
        amirrak8@gmail.com
      </a>
    </div>
  </div>

  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
    <div className="bg-blue-500/20 p-3 rounded-full">
      <FaPhone className="text-blue-500 w-6 h-6" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">
        {translations?.contact?.info?.phone || 'Phone'}
      </h3>
      <a href="tel:+21654711524" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
        +216 54711524
      </a>
    </div>
  </div>

  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
    <div className="bg-blue-500/20 p-3 rounded-full">
      <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">
        {translations?.contact?.info?.location || 'Location'}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {translations?.contact?.info?.locationValue || 'Sfax, Tunisia'}
      </p>
    </div>
  </div>
  <div className={`flex ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'} pt-6`}>
  {/* GitHub */}
  <motion.a
    href="https://github.com/mohamedyaakoubi"
    target="_blank"
    rel="noopener noreferrer me"
    className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
    aria-label={translations?.social?.github || 'GitHub'}
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <FaGithub className="w-6 h-6" />
  </motion.a>
  
  {/* LinkedIn */}
  <motion.a
    href="https://www.linkedin.com/in/yaakoubi-mohamed/"
    target="_blank"
    rel="noopener noreferrer me"
    className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
    aria-label={translations?.social?.linkedin || 'LinkedIn'}
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <FaLinkedin className="w-6 h-6" />
  </motion.a>
  
  {/* Upwork */}
  <motion.a
    href="https://www.upwork.com/freelancers/~0118c281163fef05cb?mp_source=share"
    target="_blank"
    rel="noopener noreferrer me"
    className="text-[#6fda44] hover:text-[#5cb536]"
    aria-label={translations?.social?.upwork || 'Upwork'}
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <SiUpwork className="w-6 h-6" />
  </motion.a>
  
  {/* Freelances.tn */}
  <motion.a
  href="https://www.freelances.tn/freelance/mohamed-yaakoubi"
  target="_blank"
  rel="noopener noreferrer me"
  className="text-blue-600 hover:text-blue-700"
  aria-label={translations?.social?.freelances || "Freelances.tn"}
  whileHover={{ 
    scale: 1.15,
    transition: { duration: 0.2 }
  }}
  whileTap={{ scale: 0.95 }}
>
  <div className="w-6 h-6 relative">
    <Image 
      src="/freelances.webp" 
      alt="Freelances.tn" 
      width={24} 
      height={24}
      className="w-6 h-6 object-contain"
      loading="lazy" 
    />
  </div>
</motion.a>
  
  {/* Fiverr */}
  <motion.a
    href="https://www.fiverr.com/s/wkZqrpg"
    target="_blank"
    rel="noopener noreferrer me"
    className="text-[#1dbf73] hover:text-[#19a463]"
    aria-label={translations?.social?.fiverr || "Fiverr"}
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <SiFiverr className="w-6 h-6" />
  </motion.a>
   {/* F6S */}
  <motion.a
    href="https://www.f6s.com/mohamed-yaakoubi"
    target="_blank"
    rel="noopener noreferrer me"
    className="text-[#2563eb] hover:text-[#1d4ed8]"
    aria-label={translations?.social?.f6s || "F6S"}
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="w-6 h-6 relative">
      <Image 
        src="/companies/f6s_logo.png" 
        alt="F6S" 
        width={24} 
        height={24}
        className="w-6 h-6 object-contain"
        loading="lazy" 
      />
    </div>
  </motion.a>
  {/* Instagram */}
  <motion.a
    href="https://www.instagram.com/mohamed__yaakoubi/"
    target="_blank"
    rel="noopener noreferrer me"
    className="text-[#E4405F] hover:text-[#d62e4c]"
    aria-label={translations?.social?.instagram || 'Instagram'}
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <FaInstagram className="w-6 h-6" />
  </motion.a>
  
  {/* Proz.com */}
  <motion.a
  href="https://www.proz.com/profile/3972649"
  target="_blank"
  rel="noopener noreferrer me"
  className="text-[#0068C5] hover:text-[#004F97]"
  aria-label={translations?.social?.proz || "Proz.com"}
  whileHover={{ 
    scale: 1.15,
    transition: { duration: 0.2 }
  }}
  whileTap={{ scale: 0.95 }}
>
  <div className="w-10 h-10 relative flex items-center justify-center -mt-2 -ml-3">
    <Image 
      src="/companies/proz_logo.webp" 
      alt="Proz.com" 
      width={40} 
      height={40}
      className="w-10 h-10 object-contain"
      loading="lazy"
    />
  </div>
</motion.a>
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
                {translations?.contact?.form?.name || 'Name'}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                required
              />
              <ValidationError prefix={translations?.contact?.form?.name || 'Name'} field="name" errors={state.errors} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {translations?.contact?.form?.email || 'Email'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                required
              />
              <ValidationError prefix={translations?.contact?.form?.email || 'Email'} field="email" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {translations?.contact?.form?.message || 'Message'}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                required
              />
              <ValidationError prefix={translations?.contact?.form?.message || 'Message'} field="message" errors={state.errors} />
            </div>
            
            <motion.button
  type="submit"
  disabled={state.submitting}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full py-3 px-4 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
  aria-label={state.submitting ? (translations?.contact?.form?.sending || 'Sending...') : (translations?.contact?.form?.submit || 'Send Message')}
>
  {state.submitting ? (translations?.contact?.form?.sending || 'Sending...') : (translations?.contact?.form?.submit || 'Send Message')}
</motion.button>
          </motion.form>
        </div>

     {/* Buy Me a Coffee Section */}
     <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-lg mx-auto mt-16"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              {translations?.contact?.coffee?.title || 'Support My Work'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {translations?.contact?.coffee?.description || 'If you appreciate the work and would like to support continued development'}
            </p>
            <motion.a
  href="https://www.buymeacoffee.com/medykb"
  target="_blank"
  rel="noopener noreferrer me"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="inline-block"
>
  <Image
    src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=☕&slug=medykb&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
    alt={translations?.contact?.coffee?.buttonAlt || 'Buy me a coffee'}
    width={217}
    height={48}
    className="h-12 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    loading="lazy"
  />
</motion.a>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}