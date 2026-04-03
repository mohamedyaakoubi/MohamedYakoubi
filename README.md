# Mohamed Yaakoubi — Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![Live](https://img.shields.io/badge/Live-mohamedyaakoubi.com-blue)](https://www.mohamedyaakoubi.com/)

Personal portfolio built with Next.js 15 App Router. Includes a multilingual blog, a product landing page for [SheetDiff](https://workspace.google.com/marketplace/app/sheetdiff/51917286120), an AI chatbot backed by Mistral, and a PWA service worker.

**Live:** [https://www.mohamedyaakoubi.com/](https://www.mohamedyaakoubi.com/)

The source code is MIT licensed — you're free to fork it and adapt it as your own portfolio. See the [Customization](#customization) section for what to change, and the [License](#license) section for what's not included under MIT (blog posts, CV data, images).

---

## Tech Stack

| Category | Libraries / Tools |
|---|---|
| Framework | Next.js 15 (App Router), React 18, TypeScript 5 |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion, next-themes |
| AI | Mistral AI (`@ai-sdk/mistral`), LangChain, ChromaDB, Hugging Face Inference |
| Data / APIs | Octokit REST (GitHub), Formspree (contact form) |
| i18n | Custom locale routing (`[locale]` segment), middleware, RTL support |
| SEO | Dynamic sitemap, Schema.org structured data, hreflang, IndexNow API |
| PWA | Service worker with cache-busting via Git commit hash |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Build | PurgeCSS, Critters (critical CSS), Sharp, `@next/bundle-analyzer` |

---

## Features

**Internationalization** — English, French, and Arabic with RTL layout and IBM Plex Sans Arabic. Locale is detected from the browser and persisted in `localStorage`.

**AI Chatbot** — Mistral-powered chatbot at `/api/chat`. Uses LangChain to split and embed CV content into ChromaDB for context-aware answers about skills and experience.

**Blog** — Multilingual blog at `[locale]/blog` with dynamic `[slug]` routes. Content is structured per-locale in `src/data/blog/`.

**SheetDiff landing page** — Product page at `[locale]/sheetdiff` for the SheetDiff Google Sheets add-on, with a pricing page, privacy policy, and terms of service.

**Interactive 404 terminal** — Custom 404 page with a simulated terminal. Supports commands: `ls`, `cat bio`, `skills`, `projects`, `help`, and `sudo rm -rf` (animation only).

**PWA** — Service worker caches static assets offline. Cache version updates automatically via a `prebuild` script that injects the current Git commit hash.

**SEO** — Dynamic `sitemap.ts`, `robots.ts`, OpenGraph/Twitter meta, canonical URLs, hreflang tags, Schema.org Person/Breadcrumb markup, and IndexNow submission via `/api/indexnow`.

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Home
│   │   ├── blog/
│   │   │   └── [slug]/           # Individual blog posts
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── sheetdiff/            # SheetDiff product landing
│   │   │   ├── pricing/
│   │   │   ├── privacy-policy/
│   │   │   └── terms-of-service/
│   │   └── not-found/            # 404 with terminal
│   ├── api/
│   │   ├── chat/                 # Mistral AI chatbot
│   │   └── indexnow/             # IndexNow search engine ping
│   ├── manifest.ts               # PWA manifest
│   └── sitemap.ts                # Dynamic sitemap
├── components/                   # ~40 React components
├── context/                      # Language & menu context
├── data/
│   ├── blog/                     # Per-locale blog content
│   ├── cv/                       # Structured CV data (JSON)
│   ├── blog.ts                   # Blog metadata & registry
│   ├── project.ts                # Featured projects
│   ├── services.ts               # Services data
│   ├── sheetdiff-i18n.ts         # SheetDiff translations
│   └── potential-i18n.ts         # Potential project translations
├── hooks/                        # useTranslation, useTypewriter
├── lib/                          # utils, terminal-commands, system-destruction
├── translations/                 # en.ts, fr.ts, ar.ts
└── types/

public/
├── service-worker.js
├── companies/                    # Company logos
└── projects/                     # Project images

scripts/
└── update-sw-version.js          # Injects Git hash into service worker

middleware.ts                     # Locale detection & redirects
robots.ts                         # Dynamic robots.txt
```

---

## Getting Started

**Prerequisites:** Node.js ≥ 18.17

```sh
git clone https://github.com/mohamedyaakoubi/my.git
cd my
npm install
```

Create `.env.local`:

```env
MISTRAL_API_KEY=your_key_here
```

```sh
npm run dev
# http://localhost:3000
```

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (runs `update-sw-version.js` first) |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run analyze:win` | Bundle analyzer (Windows) |
| `npm run analyze` | Bundle analyzer (Linux/Mac) |

---

## Customization

| What | Where |
|---|---|
| Personal info & copy | `src/translations/en.ts`, `fr.ts`, `ar.ts` |
| Featured projects | `src/data/project.ts` |
| Services | `src/data/services.ts` |
| Experience | `src/components/ExperienceClient.tsx` |
| CV data | `src/data/cv/` |
| Blog posts | `src/data/blog/` + register in `src/data/blog.ts` |
| SheetDiff content | `src/data/sheetdiff-i18n.ts` |
| Chatbot behavior | `src/app/api/chat/route.ts` |
| Design tokens | `tailwind.config.ts`, `src/app/globals.css` |

---

## Deployment

Deployed on Vercel. Set `MISTRAL_API_KEY` in project environment variables. Vercel auto-deploys on push to `master`.

```sh
npm run build
npm start
```

---

## License

Source code is MIT licensed. See [`LICENSE`](LICENSE).

Blog content, CV data, and media assets under `src/data/blog/`, `src/data/cv/`, and `public/` are **not** covered by the MIT license and remain © 2024–2026 Mohamed Yaakoubi. All rights reserved.

---

## Contact

[amirrak8@gmail.com](mailto:amirrak8@gmail.com) · [github.com/mohamedyaakoubi](https://github.com/mohamedyaakoubi) · [mohamedyaakoubi.com](https://www.mohamedyaakoubi.com/)