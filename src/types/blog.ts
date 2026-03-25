export type BlogCategory = "AI & Cybersecurity";

export interface BlogTheme {
  // Core CSS colors
  accent: string;             // hex: '#ff4444'
  accentRgb: string;          // for rgba: '255,68,68'
  // Hero
  heroTag: string;            // e.g. 'Security Analysis · 2025'
  // Tailwind classes for listing pages
  cardAccentText: string;
  cardAccentHover: string;
  cardCategoryBg: string;
  cardCategoryText: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardGradient: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  heroTitle?: string;         // HTML-formatted title for hero section
  description: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string; // ISO date string
  updatedAt?: string;
  readingTime: number; // minutes
  author: {
    name: string;
    url: string;
  };
  image?: string;
  imageAlt?: string;
  theme: BlogTheme;
}
