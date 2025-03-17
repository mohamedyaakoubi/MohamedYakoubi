"use client"
import { motion } from "framer-motion"
import { services } from "@/data/services"
import { ServiceCard } from "@/components/ServiceCard"
import { useState } from "react"
import { FaEnvelope } from "react-icons/fa"
import Link from "next/link"
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'




export default function Services() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const categories = ["all", ...new Set(services.map(service => service.category))]

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  return (
    <div className="min-h-screen py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
              }`}
            >
              {category === "all" 
                ? t('services.categories.all') 
                : t(`services.categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('services.cta.description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-500 rounded-lg
                     hover:bg-blue-50 transition-colors duration-300 font-medium"
          >
            <FaEnvelope className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
            {t('services.cta.button')}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}