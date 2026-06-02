# Mohamed Yaakoubi Portfolio — AI Agent Instructions

Welcome! This file provides essential context, architecture overview, and specific conventions to help AI coding agents be immediately productive in the portfolio codebase.

---

## 🏗️ Big Picture Architecture
This is a personal portfolio and product landing page for SheetDiff, built with **Next.js 15 (App Router)** and **TypeScript 5**.
- **Dynamic Localization (`[locale]` Routing)**: The app is multilingual (English, French, Arabic RTL). The current locale is managed via a custom URL segment `/[locale]/` and evaluated in `middleware.ts`.
- **Blog System**: A custom markdown-in-TS data structure. Posts are loaded statically from `src/data/blog/content/{slug}/{locale}.ts` and registered in `src/data/blog.ts`.
- **SheetDiff API Docs & Live Simulator**: Public product documentation and playground located in `src/app/[locale]/sheetdiff/api-docs/`. Uses data schemas from `src/data/` to render components like `LiveSimulatorClient.tsx` and `StructuralApiClient.tsx`.
- **PWA Service Worker**: A service worker `public/service-worker.js` caches static pages. Assets are versioned via a Git commit hash injected on build by `scripts/update-sw-version.js`.
- **Mistral AI Chatbot**: Backend route under `src/app/api/chat/route.ts` using `@ai-sdk/mistral` and LangChain vector search from ChromaDB embeddings (from `src/data/cv/`).

---

## 🔄 Critical Developer Workflows
- **Running Locally**:
  ```bash
  npm run dev
  ```
- **Building for Production**:
  Every production build automatically runs `scripts/update-sw-version.js` to stamp the service worker with the current Git commit hash:
  ```bash
  npm run build
  ```
- **Adding a New Blog Post**:
  1. Create a subfolder under `src/data/blog/content/{new-slug}/`.
  2. Create `en.ts`, `fr.ts`, and `ar.ts` inside that folder, exporting `postContent` matching the schema in `src/types/blog.ts`.
  3. Import and register the post in `src/data/blog.ts` in the `blogPosts` array and `localeContentMap`.
  4. Ensure Arabic translation content uses RTL formatting.

---

## 📝 Project-Specific Conventions
1. **Localization Integrity**: 
   - Never hardcode user-facing strings. Always use `useTranslation` hook or the translation maps in `src/translations/`.
   - Respect layout directions: Arabic (`ar`) uses `dir="rtl"` and custom fonts like `IBM Plex Sans Arabic`.
2. **ESLint & TypeScript**: Strictly respect TypeScript typing and ESLint rules. Do not bypass type definitions.
3. **Styling**: Styled using Tailwind CSS and shadcn/ui. Stick to utility classes and existing themes in `tailwind.config.ts`.
4. **Knowledge Discovery**: Always remember, if you encounter an issue to solve something ahead of your training data and knowledge, search the web for documentation and solutions ONLY AFTER strictly checking the current date (we are in 2026).

---

## 🔌 Integration Points
- **Mistral AI**: Relies on `MISTRAL_API_KEY` defined in `.env.local`.
- **Formspree**: The contact form in `ContactClient.tsx` posts directly to Formspree endpoints.

---

## 📂 Codebase Tree Structure

```text
my/
├── .browserslistrc
├── .env
├── .gitignore
├── BingSiteAuth (1).xml
├── CACHE_STRATEGY.md
├── LICENSE
├── README.md
├── SEO_FIXES_REPORT.md
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── prompt.txt
├── purgecss.config.js
├── robots.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── will-need.txt
├── public/
│   ├── service-worker.js
│   ├── companies/
│   └── projects/
├── scripts/
│   └── update-sw-version.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── production-fixes.css
│   │   ├── sitemap.ts
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   ├── diff/
│   │   │   │   └── route.ts
│   │   │   └── indexnow/
│   │   │       └── route.ts
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── not-found.tsx
│   │       ├── page.tsx
│   │       ├── contact/
│   │       │   ├── opengraph-image.tsx
│   │       │   └── page.tsx
│   │       ├── experience/
│   │       │   ├── opengraph-image.tsx
│   │       │   └── page.tsx
│   │       ├── projects/
│   │       │   ├── opengraph-image.tsx
│   │       │   ├── page.tsx
│   │       │   ├── documed/
│   │       │   │   ├── opengraph-image.tsx
│   │       │   │   └── page.tsx
│   │       │   ├── internationalskills/
│   │       │   │   ├── opengraph-image.tsx
│   │       │   │   └── page.tsx
│   │       │   └── potential/
│   │       │       ├── opengraph-image.tsx
│   │       │       └── page.tsx
│   │       ├── services/
│   │       │   ├── opengraph-image.tsx
│   │       │   └── page.tsx
│   │       └── sheetdiff/
│   │           ├── opengraph-image.tsx
│   │           ├── page.tsx
│   │           ├── api-docs/
│   │           │   ├── opengraph-image.tsx
│   │           │   ├── page.tsx
│   │           │   ├── demo/
│   │           │   │   └── page.tsx
│   │           │   ├── diff-statuses/
│   │           │   │   └── page.tsx
│   │           │   ├── engine-precision/
│   │           │   │   └── page.tsx
│   │           │   ├── parameters/
│   │           │   │   └── page.tsx
│   │           │   ├── playground/
│   │           │   │   └── page.tsx
│   │           │   ├── privacy-policy/
│   │           │   │   └── page.tsx
│   │           │   └── terms-of-service/
│   │           │       └── page.tsx
│   │           ├── pricing/
│   │           │   └── page.tsx
│   │           ├── privacy-policy/
│   │           │   └── page.tsx
│   │           └── terms-of-service/
│   │               └── page.tsx
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Analytics.tsx
│   │   ├── AnimateNotFound.tsx
│   │   ├── ApiDocPrimitives.tsx
│   │   ├── BlogClient.tsx
│   │   ├── BlogPostClient.tsx
│   │   ├── Chat.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ClientLayout.tsx
│   │   ├── CompanyLogos.tsx
│   │   ├── ContactClient.tsx
│   │   ├── CookieConsent.tsx
│   │   ├── DemoWalkthroughClient.tsx
│   │   ├── DiffStatusesClient.tsx
│   │   ├── DocuMedProjectClient.tsx
│   │   ├── EnginePrecisionClient.tsx
│   │   ├── ExperienceClient.tsx
│   │   ├── Footer.tsx
│   │   ├── GithubRepoList.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── HeroContent.tsx
│   │   ├── HomeClient.tsx
│   │   ├── InternationalSkillsClient.tsx
│   │   ├── JobCard.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── LazyYouTube.tsx
│   │   ├── LiveSimulatorClient.tsx
│   │   ├── LoadingCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navigation.tsx
│   │   ├── NotFoundClient.tsx
│   │   ├── PageTransition.tsx
│   │   ├── ParametersGuideClient.tsx
│   │   ├── PdfSlideCarousel.tsx
│   │   ├── PopupBlocker.tsx
│   │   ├── PortfolioPrivacyClient.tsx
│   │   ├── PortfolioTermsClient.tsx
│   │   ├── PotentialProjectClient.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectsClient.tsx
│   │   ├── ProjectsList.tsx
│   │   ├── RecentBlogPosts.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServicesClient.tsx
│   │   ├── SheetDiffClient.tsx
│   │   ├── SheetDiffPricingClient.tsx
│   │   ├── SheetDiffPrivacyClient.tsx
│   │   ├── SheetDiffTermsClient.tsx
│   │   ├── Skills.tsx
│   │   ├── StaticHome.tsx
│   │   ├── StructuralApiClient.tsx
│   │   ├── StructuralApiPrivacyClient.tsx
│   │   ├── StructuralApiTermsClient.tsx
│   │   ├── Terminal.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── LiveSimulator/
│   │   │   ├── Controls.tsx
│   │   │   ├── helpers.ts
│   │   │   ├── index.tsx
│   │   │   ├── ResultRow.tsx
│   │   │   ├── samples.ts
│   │   │   ├── ScorePanel.tsx
│   │   │   ├── SpreadsheetView.tsx
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ScrollToTopButton.tsx
│   │       └── SocialButtons.tsx
│   ├── context/
│   │   ├── language-context.tsx
│   │   └── useMenu.tsx
│   ├── data/
│   │   ├── blog.ts
│   │   ├── demo-walkthrough-i18n.ts
│   │   ├── diff-statuses-i18n.ts
│   │   ├── documed-i18n.ts
│   │   ├── engine-precision-i18n.ts
│   │   ├── internationalskills-i18n.ts
│   │   ├── live-simulator-i18n.ts
│   │   ├── parameters-guide-i18n.ts
│   │   ├── portfolio-legal-i18n.ts
│   │   ├── potential-i18n.ts
│   │   ├── project.ts
│   │   ├── services.ts
│   │   ├── sheetdiff-i18n.ts
│   │   ├── structural-api-i18n.ts
│   │   ├── blog/
│   │   │   └── content/
│   │   │       ├── ai-built-it/
│   │   │       │   ├── ar.ts
│   │   │       │   ├── en.ts
│   │   │       │   └── fr.ts
│   │   │       └── rag-challenge/
│   │   │           ├── ar.ts
│   │   │           ├── en.ts
│   │   │           └── fr.ts
│   │   └── cv/
│   │       ├── ar.json
│   │       ├── en.json
│   │       └── fr.json
│   ├── hooks/
│   │   ├── useAnalytics.ts
│   │   ├── useTranslation.ts
│   │   └── useTypewriter.ts
│   ├── lib/
│   │   ├── analytics.ts
│   │   ├── system-destruction.ts
│   │   ├── terminal-commands.ts
│   │   ├── translations.ts
│   │   └── utils.ts
│   ├── translations/
│   │   ├── ar.ts
│   │   ├── en.ts
│   │   └── fr.ts
│   ├── types/
│   │   ├── blog.ts
│   │   ├── experience.ts
│   │   ├── globals.d.ts
│   │   ├── language.ts
│   │   ├── project.ts
│   │   ├── services.ts
│   │   └── terminal.ts
│   └── utils/
│       └── github.ts
```
