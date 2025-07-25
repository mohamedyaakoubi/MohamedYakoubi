"use client"

import { motion } from "framer-motion"
import { Service } from "@/types/services"
import Link from "next/link"

interface ServiceCardProps {
  service: Service
  index: number
  locale: string
  translations: any
}

export function ServiceCard({ service, index, locale, translations }: ServiceCardProps) {
  const isRTL = locale === 'ar'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="service-card group bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Content area */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Header with RTL support */}
        <div className="flex items-center mb-4 w-full">
          {!isRTL ? (
            // LTR Layout
            <div className="flex items-center gap-3 w-full">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <service.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {translations?.services?.names?.[service.name] || service.name}
              </h3>
            </div>
          ) : (
            // RTL Layout - Fixed for Arabic
            <div className="flex items-center gap-3 w-full">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-right w-full">
                {translations?.services?.names?.[service.name] || service.name}
              </h3>
              <div className="p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
                <service.icon className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {translations?.services?.descriptions?.[service.name] || service.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h3 className={`font-semibold text-gray-800 dark:text-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {translations?.services?.sections?.features || 'Features'}
          </h3>
          <ul className={`service-list ${isRTL ? 'rtl-list' : ''}`}>
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className={`service-item ${isRTL ? 'rtl-item' : ''}`}>
                <div className={`bullet-wrapper ${isRTL ? 'order-last' : 'order-first'}`}>
                  <div className="service-bullet" />
                </div>
                <div className="service-text">
                  {translations?.services?.features?.[service.name]?.[feature] || feature}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Process */}
        {service.process && (
          <div className="mb-6">
            <h3 className={`font-semibold text-gray-800 dark:text-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {translations?.services?.sections?.workProcess || 'Work Process'}
            </h3>
            <ol className={`service-list ${isRTL ? 'rtl-list' : ''}`}>
              {service.process?.map((step, i) => (
                <li key={i} className={`service-item ${isRTL ? 'rtl-item' : ''}`}>
                  <div className={`number-wrapper ${isRTL ? 'order-last' : 'order-first'}`}>
                    <span className="service-number font-semibold">
                      {`${i + 1}.`}
                    </span>
                  </div>
                  <div className="service-text">
                    {translations?.services?.process?.[service.name]?.[step] || step}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow"></div>
        
        {/* Buttons with justify-between for extreme positioning */}
        <div className="mt-6 flex justify-between w-full items-center">
          {/* Contact Button - At extreme left/right based on language */}
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <span>{translations?.services?.cta?.button || 'Get in Touch'}</span>
            {isRTL ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </Link>
          
          {/* Spacer or Tariff Button at extreme right/left */}
          {service.tariffLink ? (
            <a
              href={service.tariffLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-800 text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors tariff-button"
              aria-label={`${translations?.services?.tariff?.button || 'View Pricing'} - ${translations?.services?.names?.[service.name] || service.name}`}
              title={`${translations?.services?.tariff?.viewTariff || 'View Tariff'} - ${translations?.services?.names?.[service.name] || service.name}`}
            >
              {isRTL ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{translations?.services?.tariff?.button || 'View Pricing'}</span>
                </>
              ) : (
                <>
                  <span>{translations?.services?.tariff?.button || 'View Pricing'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </a>
          ) : (
            <div></div> /* Empty div as spacer when no tariff link */
          )}
        </div>
      </div>
    </motion.div>
  )
}