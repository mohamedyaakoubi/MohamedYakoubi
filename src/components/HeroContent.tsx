import React from 'react';
import { useLanguage } from '@/context/language-context';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroContent() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <h1 id="hero-headline" className="mb-4 text-center">
      <span className="block text-2xl md:text-3xl font-medium mb-2 text-gray-700 dark:text-gray-300">
        {t('hero.greeting')}
      </span>
      
      {/* Name - static without motion to improve LCP */}
      <div className="block text-4xl md:text-6xl font-bold mb-4">
        <span 
          className="gradient-name" // Using the class from globals.css
          style={{
            display: 'inline-block',
            fontWeight: 700,
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent', 
            fontSize: 'clamp(1.875rem, 5vw, 3.75rem)',
            padding: '0.2em 0',
            lineHeight: 1.4,
            transform: 'translateZ(0)', // Force GPU acceleration
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
        >
          {language === 'ar' ? 'محمد يعقوبي' : 'Mohamed Yaakoubi'}
        </span>
      </div>
      
      <span className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
        {t('hero.tagline')}
      </span>
    </h1>
  );
}