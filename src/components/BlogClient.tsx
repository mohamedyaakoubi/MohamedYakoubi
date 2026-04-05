'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { blogCategories } from '@/data/blog'
import { BlogPost } from '@/types/blog'
import { useState, useEffect } from 'react'
import { analytics } from '@/lib/analytics'

interface BlogClientProps {
  locale: string
  translations: any
  posts: BlogPost[]
}

export default function BlogClient({ locale, translations, posts }: BlogClientProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory)

  const isRTL = language === 'ar'

  useEffect(() => {
    analytics.blogListView(posts.length)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className={`min-h-screen py-24 md:py-32 bg-[#fafafa] dark:bg-[#0a0a0a] ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "var(--font-instrument-serif, 'Instrument Serif'), serif" }}>
            {t('blog.pageTitle')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-[#666] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-syne, 'Syne'), sans-serif" }}>
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-[#0a0a0a]'
                : 'bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900 dark:text-[#666] dark:border-[#222] dark:hover:border-[#444] dark:hover:text-white'
            }`}
          >
            {t('blog.allCategories')}
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-[#0a0a0a]'
                  : 'bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900 dark:text-[#666] dark:border-[#222] dark:hover:border-[#444] dark:hover:text-white'
              }`}
            >
              {t(`blog.categories.${cat.id}`) || cat.label}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-[#666] py-12">
            {t('blog.noPosts')}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const theme = post.theme
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/${language}/blog/${post.slug}`} className="block" aria-label={`${t('blog.readMore')} — ${post.title}`}>
                    <div className={`bg-white dark:bg-[#111] rounded overflow-hidden border border-gray-200 dark:border-[#222] ${theme.cardHoverBorder} transition-all duration-300 h-full flex flex-col`}>
                      {/* Accent strip */}
                      <div className={`h-[2px] bg-gradient-to-r ${theme.cardGradient}`} />

                      {/* Category & Reading Time */}
                      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${theme.cardCategoryText} ${theme.cardCategoryBg} border ${theme.cardBorder} px-3 py-1 rounded`}
                              style={{ fontFamily: "var(--font-jetbrains-mono, 'JetBrains Mono'), monospace", fontSize: '10px', letterSpacing: '2px' }}>
                          {t(`blog.categories.${post.category}`) || post.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-[#666]" style={{ fontFamily: "var(--font-jetbrains-mono, 'JetBrains Mono'), monospace" }}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {post.readingTime} {t('blog.minRead')}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="px-6 pb-4 flex-grow">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 dark:text-[#888] text-sm leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="px-6 pb-5 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-[#1a1a1a] mt-auto">
                        <div className="text-xs text-gray-500 dark:text-[#666]" style={{ fontFamily: "var(--font-jetbrains-mono, 'JetBrains Mono'), monospace" }}>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          <time dateTime={post.publishedAt} suppressHydrationWarning>
                            {(() => {
                              const [y, m, d] = post.publishedAt.split('-').map(Number)
                              return new Date(y, m - 1, d).toLocaleDateString(
                                language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-FR' : 'en-US',
                                { year: 'numeric', month: 'long', day: 'numeric' }
                              )
                            })()}
                          </time>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${theme.cardAccentText} group-hover:gap-2 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {t('blog.readMore')}
                          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
