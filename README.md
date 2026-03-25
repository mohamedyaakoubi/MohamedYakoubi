# My Portfolio - A Next.js & AI Powered Showcase

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

This is not just a portfolio. It's a feature-rich, AI-integrated, and fully internationalized web application designed to showcase my skills, projects, and experience in a modern and interactive way. Built with a powerful stack including Next.js, TypeScript, and Tailwind CSS, this project serves as a testament to my capabilities in web development and AI integration.

## 🚀 Live Demo

Check out the live version of the portfolio: **[https://www.mohamedyaakoubi.com/](https://www.mohamedyaakoubi.com/)**

## ✨ Features

This portfolio is packed with features designed to provide an engaging and informative user experience:

*   🌐 **Internationalization (i18n):**
    *   Full support for English, French, and Arabic.
    *   Custom locale-based routing with middleware.
    *   Language selection with flag icons and automatic redirection based on user's browser/local storage preferences.
    *   RTL (Right-to-Left) support for Arabic with custom Arabic font (IBM Plex Sans Arabic).
    *   Language persistence across sessions.

*   🤖 **AI-Powered Chatbot:**
    *   An intelligent chatbot powered by **Mistral AI** that uses your CV/resume content as its knowledge base.
    *   Uses LangChain to process and split CV documents for context-aware responses.
    *   Users can ask questions about your skills, experience, and projects in natural language.
    *   Maintains conversation context for better interactions.

*   💻 **Interactive Terminal:**
    *   A fully functional terminal on the 404 page.
    *   Users can run commands like `ls`, `cat bio`, `skills`, `projects`, `help`, and more.
    *   Includes a "secret" `sudo rm -rf` command that triggers a fun, non-destructive system destruction animation.
    *   Typewriter effect for authentic terminal experience.

*   🎨 **Modern UI/UX:**
    *   **Responsive Design:** Fully responsive layout that looks great on all devices.
    *   **Dark/Light Mode:** Theme toggling with system preference detection and persistence in local storage.
    *   **Animations:** Smooth page transitions and component animations with `framer-motion`.
    *   **Custom UI Components:** Built with `shadcn/ui` and Tailwind CSS for a consistent and modern look.
    *   **Accessibility:** Semantic HTML, proper ARIA labels, and keyboard navigation.

*   📱 **Progressive Web App (PWA):**
    *   **Offline Support:** Service worker caches assets for offline access.
    *   **Automatic Cache Busting:** Cache version updates automatically on deployment.
    *   **Background Updates:** New content downloads in background and activates on next load.
    *   **Smart Caching:** Different strategies for HTML, static assets, and API routes.

*   📈 **Dynamic Content & Advanced SEO:**
    *   **Dynamic Project Loading:** Fetches and displays latest projects from the GitHub API using `@octokit/rest`.
    *   **Local Data Management:** Services, experiences, and CV data in structured JSON/TypeScript files.
    *   **SEO Optimized:** 
        *   Static site generation (SSG) for most pages
        *   Dynamic sitemap with proper priorities
        *   Dynamic `robots.txt` generation
        *   Schema.org structured data (Person, Organization, Breadcrumbs)
        *   OpenGraph and Twitter Card meta tags
        *   Canonical URLs for all pages
        *   Hreflang tags for multi-language SEO
        *   Semantic HTML with proper heading hierarchy
    *   **Performance Optimized:**
        *   Lighthouse score 95+
        *   Image optimization with Next.js Image and Sharp
        *   Code splitting and lazy loading
        *   CSS optimization with PurgeCSS
        *   Critical CSS inlining with Critters
        *   Font optimization

*   📊 **Analytics & Monitoring:**
    *   **Vercel Analytics:** Tracks page views and user engagement.
    *   **Vercel Speed Insights:** Monitors website performance and Core Web Vitals.

*   📧 **Contact Form:**
    *   Integrated contact form using Formspree.
    *   Form validation and error handling.
    *   Success/error feedback to users.

## 🛠️ Tech Stack

This project is built with a modern and powerful tech stack:

### Core Framework & Language
*   **Framework:** [Next.js 15](https://nextjs.org/) - The React framework for production with App Router.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) - For static typing and better developer experience.
*   **Runtime:** [React 18](https://react.dev/) - Latest React with concurrent features.

### Styling & UI
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) - For beautiful and performant animations.
*   **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes) - Dark/light mode with system preference detection.
*   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react) & [React Icons](https://react-icons.github.io/react-icons/) - For a wide range of icons.
*   **Flag Icons:** [country-flag-icons](https://www.npmjs.com/package/country-flag-icons) - For language selector flags.

### AI & Machine Learning
*   **AI SDK:** [@ai-sdk/mistral](https://sdk.vercel.ai/docs/guides/providers/mistral) & [Mistral AI](https://mistral.ai/) - For the intelligent chatbot.
*   **AI Orchestration:** [LangChain](https://js.langchain.com/) - For document processing and text splitting in chatbot.

### Internationalization
*   **i18n Framework:** Custom implementation with locale-based routing.
*   **Translations:** Structured translation files for English, French, and Arabic.
*   **RTL Support:** Full right-to-left layout support for Arabic.
*   **Arabic Font:** IBM Plex Sans Arabic for proper Arabic typography.

### Data & APIs
*   **GitHub API:** [@octokit/rest](https://github.com/octokit/rest.js) - For fetching GitHub repositories dynamically.
*   **Forms:** [@formspree/react](https://formspree.io/react) - For contact form handling.
*   **State Management:** [React Context API](https://react.dev/reference/react/useContext) - For managing global state like language and theme.

### Analytics & Monitoring
*   **Analytics:** [Vercel Analytics](https://vercel.com/analytics) - Tracks page views and user engagement.
*   **Performance:** [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - Monitors website performance.

### Build & Optimization
*   **Bundle Analyzer:** [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Analyze and optimize bundle size.
*   **CSS Optimization:** [PurgeCSS](https://purgecss.com/) - Remove unused CSS.
*   **Critical CSS:** [Critters](https://github.com/GoogleChromeLabs/critters) - Inline critical CSS.
*   **Image Optimization:** [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing.

### Development Tools
*   **Linting:** [ESLint](https://eslint.org/) - For code quality.
*   **Type Checking:** TypeScript with strict mode enabled.
*   **Utilities:** [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) - For conditional class names.

## 📂 Project Structure

The project is organized into the following directories:

```
/
├── .github/
│   └── instructions/        # GitHub Copilot instructions
├── public/                  # Static assets
│   ├── service-worker.js    # PWA service worker
│   ├── robots.txt           # Static robots file
│   ├── companies/           # Company logos
│   ├── projects/            # Project images
│   └── ...                  # Other static files
├── scripts/
│   └── update-sw-version.js # Auto-update service worker cache version
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [locale]/        # Internationalized routes
│   │   │   ├── layout.tsx   # Root layout with metadata
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── contact/     # Contact page
│   │   │   ├── experience/  # Experience page
│   │   │   ├── projects/    # Projects page
│   │   │   ├── services/    # Services page
│   │   │   └── not-found/   # Custom 404 with terminal
│   │   ├── api/
│   │   │   └── chat/        # AI chatbot API route
│   │   ├── globals.css      # Global styles
│   │   ├── manifest.ts      # PWA manifest
│   │   └── sitemap.ts       # Dynamic sitemap generation
│   ├── components/          # Reusable React components (35+ components)
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Chat.tsx         # AI chatbot component
│   │   ├── Terminal.tsx     # Interactive terminal
│   │   ├── Navigation.tsx   # Main navigation
│   │   ├── LanguageSelector.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ...              # Many more components
│   ├── context/             # React context providers
│   │   ├── language-context.tsx
│   │   └── useMenu.tsx
│   ├── data/                # Local data files
│   │   ├── cv/              # Structured CV data (JSON)
│   │   ├── project.ts       # Featured projects
│   │   └── services.ts      # Services data
│   ├── hooks/               # Custom React hooks
│   │   ├── useTranslation.ts
│   │   └── useTypewriter.ts
│   ├── lib/                 # Utility functions
│   │   ├── utils.ts
│   │   ├── terminal-commands.ts
│   │   └── system-destruction.ts
│   ├── translations/        # i18n translation files
│   │   ├── en.ts            # English
│   │   ├── fr.ts            # French
│   │   └── ar.ts            # Arabic
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Additional utilities
├── middleware.ts            # Custom routing & locale handling
├── robots.ts                # Dynamic robots.txt generation
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
├── purgecss.config.js       # PurgeCSS configuration
├── components.json          # shadcn/ui configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```


## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18.17.0 or later)
*   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/mohamedyaakoubi/my.git
    cd my
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following environment variables. You will need to get your own API keys for the services that require them.

    ```env
    # Mistral AI API Key
    MISTRAL_API_KEY=your_mistral_api_key
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Customization Guide

If you want to use this portfolio for your own purposes, here's a guide to customizing it:

*   **Personal Information:**
    *   Update your name, email, and other personal details in `src/translations/*.ts`.
    *   Replace the profile picture at `public/profile.jpg`.
    *   Update your CV at `public/Mohamed_Yaakoubi.pdf`.

*   **Content:**
    *   **Projects:** Modify the `featuredProjects` array in `src/data/project.ts` to add your own featured projects. The rest of the projects are fetched from the GitHub API.
    *   **Services:** Update the `services` array in `src/data/services.ts`.
    *   **Experience:** Update the `experiences` array in `src/components/ExperienceClient.tsx`.
    *   **CV/Resume:** Update the JSON files in `src/data/cv/` with your own CV data.

*   **Styling:**
    *   Colors, fonts, and other design tokens can be customized in `tailwind.config.ts` and `src/app/globals.css`.

*   **AI Chatbot:**
    *   The chatbot's logic is in `src/app/api/chat/route.ts`. You can modify the prompts and behavior there.

## 📱 PWA & Offline Support

This portfolio is a **Progressive Web App (PWA)** with advanced caching strategies:

*   **Service Worker:** Automatic caching of static assets for offline access.
*   **Automatic Cache Busting:** Cache version updates automatically on each deployment using Git commit hash.
*   **Smart Caching Strategy:**
    *   HTML pages: Always fresh (`max-age=0, must-revalidate`)
    *   Static assets: Long-term caching (`max-age=31536000, immutable`)
    *   Service worker: Always updated
*   **Background Updates:** New content downloads in the background and activates on next page load.

### Cache Management

The cache version is automatically updated before each build via the `prebuild` script.

## 📜 Available Scripts

*   **`npm run dev`** - Start development server on `http://localhost:3000`
*   **`npm run build`** - Build for production (automatically updates service worker version)
*   **`npm start`** - Start production server
*   **`npm run lint`** - Run ESLint to check code quality
*   **`npm run analyze`** - Build with bundle analyzer (Linux/Mac)
*   **`npm run analyze:win`** - Build with bundle analyzer (Windows)

### Build Process

When you run `npm run build`, the following happens automatically:
1. `scripts/update-sw-version.js` runs (prebuild hook)
2. Service worker cache version updates with Git commit hash
3. Next.js builds the optimized production bundle
4. Static pages are pre-rendered (SSG)
5. Bundle is analyzed if `ANALYZE=true`

## 🔍 SEO & Performance

This portfolio is heavily optimized for search engines and performance:

### SEO Features
*   **Dynamic Sitemap:** Auto-generated at `/sitemap.xml` with proper priorities
*   **Robots.txt:** Dynamic generation via `robots.ts`
*   **Structured Data:** Schema.org markup for Person, Organization, and Breadcrumbs
*   **OpenGraph Tags:** Optimized social media sharing
*   **Canonical URLs:** Proper canonical tags for all pages
*   **Hreflang Tags:** Multi-language SEO support
*   **Meta Tags:** Comprehensive metadata for all pages
*   **Semantic HTML:** Proper heading hierarchy and semantic elements

### Performance Optimizations
*   **Static Site Generation (SSG):** Most pages pre-rendered at build time
*   **Image Optimization:** Next.js Image component with Sharp
*   **Code Splitting:** Automatic route-based code splitting
*   **CSS Optimization:** PurgeCSS removes unused styles
*   **Critical CSS:** Inlined critical CSS with Critters
*   **Bundle Analysis:** Monitor and optimize bundle size
*   **Lazy Loading:** Components and images load on demand
*   **Font Optimization:** Next.js font optimization

**Performance Scores:**
- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## ⚙️ Advanced Configuration

### Middleware (`middleware.ts`)
Custom middleware handles:
*   Locale detection and redirection
*   Route validation
*   404 handling with proper redirects
*   Permanent redirects for SEO

### Next.js Config (`next.config.js`)
Advanced features enabled:
*   **Bundle Analyzer:** Visualize bundle composition
*   **Image Optimization:** Multiple remote patterns for external images
*   **Compiler Optimizations:** Remove console logs in production
*   **Experimental Features:**
    *   CSS optimization
    *   Package import optimization (react-icons, framer-motion)
    *   Webpack build worker
    *   Server React optimization
*   **Custom Headers:** Cache control and security headers
*   **Domain Redirects:** Non-www to www redirects

### Custom Hooks
*   **`useTranslation`** - Access translations in any component
*   **`useTypewriter`** - Typewriter effect for terminal and hero sections

### Context Providers
*   **`LanguageContext`** - Global language state with localStorage persistence
*   **`MenuContext`** - Mobile menu state management

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1.  **Push to GitHub:**
    ```sh
    git add .
    git commit -m "Your commit message"
    git push origin main
    ```

2.  **Import to Vercel:**
    *   Go to [Vercel](https://vercel.com/)
    *   Click "New Project"
    *   Import your GitHub repository
    *   Vercel will auto-detect Next.js settings

3.  **Configure Environment Variables:**
    *   Add `MISTRAL_API_KEY` in Vercel project settings
    *   Add any other required API keys

4.  **Deploy:**
    *   Vercel automatically deploys on every push to main
    *   Preview deployments for pull requests

### Manual Deployment

```sh
npm run build
npm start
```

The app will be available on `http://localhost:3000`.

### Environment Variables

Required environment variables:
```env
# AI Chatbot
MISTRAL_API_KEY=your_mistral_api_key_here

# Optional: Analytics (auto-configured on Vercel)
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

## 🎯 Key Features Explained

### Interactive Terminal (404 Page)
The 404 page features a fully functional terminal where users can:
*   Run commands: `ls`, `cat bio`, `skills`, `projects`, `help`
*   Execute a "secret" `sudo rm -rf` command with a fun animation
*   Navigate using keyboard shortcuts

### AI Chatbot
Powered by Mistral AI, the chatbot:
*   Uses your CV/resume content as its knowledge base
*   Processes CV documents with LangChain for accurate context
*   Answers questions about your skills and experience based on actual CV data
*   Maintains conversation context for better interactions

### Dynamic Project Loading
Projects are loaded from two sources:
1. **Featured Projects:** Manually curated in `src/data/project.ts`
2. **GitHub Projects:** Automatically fetched via GitHub API using `@octokit/rest`

### Multi-Language Support
*   3 languages: English, French, Arabic
*   RTL layout for Arabic
*   Language persistence in localStorage
*   Browser language detection
*   Flag icons for visual language selection


## 🤝 Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Mohamed Yaakoubi - [amirrak8@gmail.com](mailto:amirrak8@gmail.com)

Project Link: [https://github.com/mohamedyakoubi/](https://github.com/mohamedyakoubi/)

## 🙏 Acknowledgements

*   [Next.js Team](https://nextjs.org/)
*   [Tailwind CSS Team](https://tailwindcss.com/)
*   [shadcn](https://github.com/shadcn)
*   [Mistral AI](https://mistral.ai/)
*   All the amazing developers who create open-source software.