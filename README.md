# My Portfolio - A Next.js & AI Powered Showcase

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

This is not just a portfolio. It's a feature-rich, AI-integrated, and fully internationalized web application designed to showcase my skills, projects, and experience in a modern and interactive way. Built with a powerful stack including Next.js, TypeScript, and Tailwind CSS, this project serves as a testament to my capabilities in web development and AI integration.

## 🚀 Live Demo

Check out the live version of the portfolio: **[https://www.mohamedyaakoubi.live/](https://www.mohamedyaakoubi.live/)**

## ✨ Features

This portfolio is packed with features designed to provide an engaging and informative user experience:

*   🌐 **Internationalization (i18n):**
    *   Full support for English, French, and Arabic.
    *   Uses `next-intl` for seamless routing and translations.
    *   Language selection with flag icons and automatic redirection based on user's browser/local storage preferences.
    *   RTL support for Arabic.

*   🤖 **AI-Powered Chatbot:**
    *   An intelligent chatbot powered by **Mistral AI**.
    *   Users can ask questions about my skills, experience, and projects in natural language.
    *   The chatbot provides informative and context-aware responses.

*   💻 **Interactive Terminal:**
    *   A fully functional terminal on the 404 page.
    *   Users can run commands like `ls`, `cat bio`, `skills`, `projects`, and more.
    *   Includes a "secret" `sudo rm -rf` command that triggers a fun, non-destructive animation.

*   🎨 **Modern UI/UX:**
    *   **Responsive Design:** Fully responsive layout that looks great on all devices.
    *   **Dark/Light Mode:** Theme toggling with persistence in local storage.
    *   **Animations:** Smooth page transitions and component animations with `framer-motion`.
    *   **Custom UI Components:** Built with `shadcn/ui` and Tailwind CSS for a consistent and modern look.

*   📈 **Dynamic Content & SEO:**
    *   **Dynamic Project Loading:** Fetches and displays my latest projects from the GitHub API.
    *   **Local Data:** Services and experiences are managed in local data files for easy updates.
    *   **SEO Optimized:** Static site generation (SSG) for most pages, dynamic sitemap, `robots.txt`, and metadata for better search engine ranking.

*   📊 **Analytics:**
    *   **Vercel Analytics:** Tracks page views and user engagement.
    *   **Vercel Speed Insights:** Monitors website performance.

## 🛠️ Tech Stack

This project is built with a modern and powerful tech stack:

*   **Framework:** [Next.js 15](https://nextjs.org/) - The React framework for production.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) - For static typing and better developer experience.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) - For beautiful and performant animations.
*   **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) - For handling translations and i18n routing.
*   **AI:** [@ai-sdk/mistral](https://sdk.vercel.ai/docs/guides/providers/mistral) - For integrating the Mistral AI chatbot.
*   **State Management:** [React Context API](https://react.dev/reference/react/useContext) - For managing global state like language and theme.
*   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react) & [React Icons](https://react-icons.github.io/react-icons/) - For a wide range of icons.
*   **Linting & Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - For code quality and consistency.

## 📂 Project Structure

The project is organized into the following directories:

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── [locale]/    # Internationalized routes
│   │   ├── api/         # API routes (e.g., for the chatbot)
│   │   └── ...          # Layouts, pages, etc.
│   ├── components/      # Reusable React components
│   │   ├── ui/          # UI components from shadcn/ui
│   │   └── ...
│   ├── context/         # React context providers (Language, Menu)
│   ├── data/            # Local data files (projects, services, CV)
│   ├── hooks/           # Custom React hooks (useTranslation, useTypewriter)
│   ├── lib/             # Utility functions and libraries
│   ├── translations/    # Translation files for each language
│   └── types/           # TypeScript type definitions
├── .gitignore           # Git ignore file
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
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