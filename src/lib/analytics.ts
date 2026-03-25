// GA4 event tracking utility
// Only fires in production with gtag loaded

type GtagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

// Pre-defined events for consistency in GA4 reports

export const analytics = {
  // Contact
  contactFormSubmit: () =>
    trackEvent({ action: 'form_submit', category: 'contact', label: 'contact_form' }),

  socialLinkClick: (platform: string) =>
    trackEvent({ action: 'click', category: 'social', label: platform }),

  // Blog
  blogView: (slug: string, title: string, category: string, readingTime: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'blog_view', {
        event_category: 'blog',
        blog_slug: slug,
        blog_title: title,
        blog_category: category,
        reading_time: readingTime,
      })
    }
  },

  blogListView: (postCount: number) =>
    trackEvent({ action: 'blog_list_view', category: 'blog', value: postCount }),

  blogShare: (slug: string, method: 'native' | 'clipboard') =>
    trackEvent({ action: 'share', category: 'blog', label: `${slug}_${method}` }),

  // Projects
  projectDemoClick: (name: string) =>
    trackEvent({ action: 'click', category: 'project', label: `demo_${name}` }),

  projectGithubClick: (name: string) =>
    trackEvent({ action: 'click', category: 'project', label: `github_${name}` }),

  // SheetDiff
  sheetdiffPageView: (page: 'main' | 'pricing' | 'privacy' | 'terms') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sheetdiff_page_view', {
        event_category: 'sheetdiff',
        sheetdiff_page: page,
      })
    }
  },

  sheetdiffInstallClick: (source: string = 'hero') =>
    trackEvent({ action: 'click', category: 'sheetdiff', label: `install_marketplace_${source}` }),

  sheetdiffPricingClick: (source: string = 'hero') =>
    trackEvent({ action: 'click', category: 'sheetdiff', label: `view_pricing_${source}` }),

  sheetdiffPrivacyClick: () =>
    trackEvent({ action: 'click', category: 'sheetdiff', label: 'view_privacy_policy' }),

  sheetdiffTermsClick: () =>
    trackEvent({ action: 'click', category: 'sheetdiff', label: 'view_terms_of_service' }),

  sheetdiffContactClick: (method: string) =>
    trackEvent({ action: 'click', category: 'sheetdiff', label: `contact_${method}` }),

  sheetdiffBillingToggle: (plan: 'monthly' | 'annual') =>
    trackEvent({ action: 'toggle', category: 'sheetdiff', label: `billing_${plan}` }),

  // Services
  serviceCTAClick: (service: string) =>
    trackEvent({ action: 'click', category: 'service', label: service }),

  // Site preferences
  languageChange: (lang: string) =>
    trackEvent({ action: 'select', category: 'language', label: lang }),

  themeToggle: (theme: string) =>
    trackEvent({ action: 'toggle', category: 'theme', label: theme }),

  // CV / Resume
  cvDownload: () =>
    trackEvent({ action: 'download', category: 'cv', label: 'resume' }),

  // External links
  externalLinkClick: (url: string) =>
    trackEvent({ action: 'click', category: 'outbound', label: url }),
}
