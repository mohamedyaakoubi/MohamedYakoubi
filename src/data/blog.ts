import { BlogPost, BlogCategory, BlogTheme } from '@/types/blog';
import { postContent as enContent } from './blog/content/ai-built-it/en';
import { postContent as arContent } from './blog/content/ai-built-it/ar';
import { postContent as frContent } from './blog/content/ai-built-it/fr';
import { postContent as ragEnContent } from './blog/content/rag-challenge/en';
import { postContent as ragFrContent } from './blog/content/rag-challenge/fr';
import { postContent as ragArContent } from './blog/content/rag-challenge/ar';

type LocaleContent = {
  title: string;
  heroTitle: string;
  description: string;
  content: string;
  heroTag?: string;
  tags?: string[];
};

const localeContentMap: Record<string, Record<string, LocaleContent>> = {
  'ai-built-it-i-broke-it-ai-helped-me-break-it': {
    ar: arContent,
    fr: frContent,
  },
  'rag-challenge-technical-comparison': {
    fr: ragFrContent,
    ar: ragArContent,
  },
};

// Theme for the first post — AI & Cybersecurity: editorial red accent
export const aiCyberTheme: BlogTheme = {
  accent: '#ff4444',
  accentRgb: '255,68,68',
  heroTag: 'Security Analysis · 24/03/2026',
  cardAccentText: 'text-red-400',
  cardAccentHover: 'hover:text-red-300',
  cardCategoryBg: 'bg-red-500/10',
  cardCategoryText: 'text-red-400',
  cardBorder: 'border-red-500/20',
  cardHoverBorder: 'hover:border-red-500/40',
  cardGradient: 'from-red-600 to-orange-600',
  tagBg: 'bg-red-500/10',
  tagText: 'text-red-300',
  tagBorder: 'border-red-500/20',
};

// Theme for the RAG Challenge post — AI & Data Engineering: navy academic accent
export const ragChallengeTheme: BlogTheme = {
  accent: '#4a9eff',
  accentRgb: '74,158,255',
  heroTag: "AINC'26 · RAG Challenge · Technical Post-Mortem",
  cardAccentText: 'text-blue-400',
  cardAccentHover: 'hover:text-blue-300',
  cardCategoryBg: 'bg-blue-500/10',
  cardCategoryText: 'text-blue-400',
  cardBorder: 'border-blue-500/20',
  cardHoverBorder: 'hover:border-blue-500/40',
  cardGradient: 'from-blue-600 to-cyan-600',
  tagBg: 'bg-blue-500/10',
  tagText: 'text-blue-300',
  tagBorder: 'border-blue-500/20',
};

export const blogCategories: { id: BlogCategory; label: string }[] = [
  { id: "AI & Cybersecurity", label: "AI & Cybersecurity" },
  { id: "AI & Data Engineering", label: "AI & Data Engineering" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-built-it-i-broke-it-ai-helped-me-break-it",
    title: "AI Built It. I Broke It. AI Helped Me Break It.",
    heroTitle: '<span class="hero-safe">AI Built It.</span> <span class="hero-warn">I Broke It.</span><br><em class="hero-danger">AI Helped Me Break It.</em>',
    description: "A story about curiosity, a game campaign, client-side trust, and what happens when AI-assisted development ships without a security lens — analyzed with AI assistance itself.",
    category: "AI & Cybersecurity",
    tags: ["Penetration Testing", "Web Security", "AI-Assisted Development", "Responsible Disclosure", "Vibe Coding", "SecureByDesign", "GameSecurity", "ClientSideTrust"],
    publishedAt: "2026-03-24",
    readingTime: 15,
    author: {
      name: "Mohamed Yaakoubi",
      url: "https://www.mohamedyaakoubi.com",
    },
    theme: aiCyberTheme,
    content: enContent.content,
  },
  {
    slug: "rag-challenge-technical-comparison",
    title: "RAG Challenge Technical Comparison: A Reproducible Post-Mortem",
    heroTitle: 'RAG Challenge Technical Comparison:<br><em class="hero-accent">A Reproducible Post-Mortem</em>',
    description: "A detailed technical comparison of two RAG solutions from the AINC'26 challenge — documenting constraint compliance, retrieval benchmarks, and reproducible evidence.",
    category: "AI & Data Engineering",
    tags: ["RAG", "PostgreSQL", "pgvector", "Semantic Search", "Data Engineering", "Benchmarking", "NLP", "Python"],
    publishedAt: "2026-03-29",
    readingTime: 25,
    author: {
      name: "Mohamed Yaakoubi",
      url: "https://www.mohamedyaakoubi.com",
    },
    theme: ragChallengeTheme,
    content: ragEnContent.content,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}

export function getLocalizedBlogPost(slug: string, locale: string): BlogPost | undefined {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return undefined;
  if (locale === 'en' || !localeContentMap[slug]?.[locale]) return post;

  const lc = localeContentMap[slug][locale];
  return {
    ...post,
    title: lc.title,
    heroTitle: lc.heroTitle,
    description: lc.description,
    content: lc.content,
    tags: lc.tags || post.tags,
    theme: {
      ...post.theme,
      heroTag: lc.heroTag || post.theme.heroTag,
    },
  };
}

export function getLocalizedBlogPosts(locale: string): BlogPost[] {
  return blogPosts.map(post => getLocalizedBlogPost(post.slug, locale) || post);
}
