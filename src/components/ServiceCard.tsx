import { motion } from "framer-motion"
import { Service } from "@/types/services"
import Link from "next/link"

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-500/10 rounded-lg mr-3">
            <service.icon className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {service.name}
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Process */}
        {service.process && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Work Process
            </h3>
            <ol className="space-y-2">
              {service.process.map((step, i) => (
                <li key={step} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium mr-2">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* CTA Button */}
        <Link
          href={`/contact?service=${encodeURIComponent(service.name)}`}
          className="block w-full py-3 px-4 bg-blue-500 text-white text-center rounded-lg 
                   hover:bg-blue-600 transition-colors duration-300 font-medium"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  )
}