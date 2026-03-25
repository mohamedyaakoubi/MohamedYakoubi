'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { getRecentBlogPosts } from '@/data/blog'

export function RecentBlogPosts() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const isRTL = language === 'ar'
  const recentPosts = getRecentBlogPosts(3)

  if (recentPosts.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('blog.recentPosts')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => {
            const theme = post.theme
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/${language}/blog/${post.slug}`} className="block h-full">
                  <div className={`bg-white dark:bg-[#111] rounded overflow-hidden border border-gray-100 dark:border-[#222] ${theme.cardHoverBorder} transition-all duration-300 h-full flex flex-col`}>
                    {/* Accent strip */}
                    <div className={`h-[2px] bg-gradient-to-r ${theme.cardGradient}`} />

                    <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${theme.cardCategoryText} ${theme.cardCategoryBg} border ${theme.cardBorder} px-3 py-1 rounded`}>
                        {t(`blog.categories.${post.category}`) || post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-[#666]">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} {t('blog.minRead')}
                      </span>
                    </div>

                    <div className="px-6 pb-4 flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-[#888] text-sm leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <div className="px-6 pb-5 pt-2 flex items-center justify-between mt-auto border-t border-gray-100 dark:border-[#1a1a1a]">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-[#666]">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-FR' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
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

        {/* View All Posts Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            href={`/${language}/blog`}
            className={`inline-flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t('blog.viewAllPosts')}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
