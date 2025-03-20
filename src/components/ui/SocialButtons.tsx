"use client"
import { memo } from 'react'
import { motion } from "framer-motion"
import { IconType } from "react-icons"

// Import icons individually to reduce bundle size
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaFileDownload } from "@react-icons/all-files/fa/FaFileDownload";
import { SiUpwork } from "@react-icons/all-files/si/SiUpwork";

// Define proper TypeScript interfaces
interface SocialButtonProps {
  href: string
  className: string
  icon: IconType
  label: string
  ariaLabel?: string
  title?: string
  type?: string
}

// Memoized button components to prevent unnecessary re-renders
const SocialButton = memo(({ 
  href, 
  className, 
  icon: Icon, 
  label,
  ariaLabel,
  title,
  type
}: SocialButtonProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer me"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={className}
    aria-label={ariaLabel || label}
    title={title || label}
    {...(type ? { type } : {})}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.a>
));

SocialButton.displayName = 'SocialButton';

interface SocialButtonsProps {
  t: (key: string) => string
  language: string
}

function SocialButtons({ t, language }: SocialButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <SocialButton 
        href={t('social.links.github')}
        className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 dark:text-white text-gray-900"
        icon={FaGithub}
        label={t('hero.cta.github')}
      />

      <SocialButton 
        href="https://www.linkedin.com/in/yaakoubi-mohamed/"
        className="bg-[#0A66C2] px-6 py-3 rounded-full hover:bg-[#004182] transition-colors flex items-center gap-2 text-white"
        icon={FaLinkedin}
        label={t('social.linkedin')}
      />

      {/* Fix contrast issue by changing text color to black */}
      <SocialButton 
        href="https://www.upwork.com/freelancers/~0118c281163fef05cb?mp_source=share"
        className="bg-[#6fda44] px-6 py-3 rounded-full hover:bg-[#5cb536] transition-colors flex items-center gap-2 text-black font-medium"
        icon={SiUpwork}
        label={t('hero.cta.upwork')}
        title="Hire me on Upwork"
      />

      <SocialButton 
        href="/Mohamed_Yaakoubi.pdf"
        className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 text-white"
        icon={FaFileDownload}
        label={t('hero.cta.downloadCV')}
        ariaLabel="Download Mohamed Yaakoubi's CV"
        title="Download my professional resume (PDF)"
        type="application/pdf"
      />
    </div>
  )
}

export default memo(SocialButtons);