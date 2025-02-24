# 🤖 AI-Powered Portfolio with Chat Application

![Banner](/public/ReadMe/header.png)

## 📌 Overview

A modern, AI-powered Portfolio with chat application built with Next.js 13, TypeScript, and integrated with the Mistral AI API. This project demonstrates full-stack development capabilities, clean code practices, and seamless AI integration.

### 🌟 Key Features

- **Real-time Chat Interface**: Smooth, responsive chat experience with server-side streaming
- **Multi-language Support**: Full internationalization (English, French, and Arabic)
- **Theme Customization**: Dynamic light/dark mode with smooth transitions
- **Accessibility**: ARIA compliant with keyboard navigation support
- **AI Integration**: Leverages Mistral AI's API for intelligent responses
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠️ Technical Stack

### Frontend
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Backend
- Next.js API Routes
- Mistral AI SDK
- LangChain
- Streaming Response Handling

### Development Tools
- ESLint
- Prettier
- Husky (pre-commit hooks)
- Jest (testing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm/yarn
- Mistral AI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/chat-application.git
cd chat-application
npm install
```
2. Copy the example environment file and add your Mistral AI API key
```bash
cp .env.example .env.local
# Add your Mistral AI API key to .env.local
```
3. Start the development server
```bash
npm run dev
```
### 🎯 Project Structure

src/
├── app/                  # Next.js app router pages
├── components/          # React components
│   ├── Chat/           # Chat-related components
│   ├── ui/             # Reusable UI components
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── translations/       # i18n translation files
└── types/             # TypeScript type definitions

### Example of Mistral AI API integration
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    messages: [...messages, userMessage],
    language: language
  }),
});
```
## Internationalization
Support for multiple languages (EN, FR, AR)
RTL layout support for Arabic
Language-specific AI responses
## Streaming Responses
Real-time message streaming
Progress indicators
Error handling and retry mechanism
## 🎨 UI/UX Features
Smooth animations
Loading states
Error handling
Responsive design
Accessibility features
## 📈 Performance
Optimized bundle size
Lazy loading
Image optimization
Efficient state management
## 🤝 Contributing
Fork the repository
Create a feature branch
Commit changes
Push to the branch
Open a pull request
## 📝 License
MIT License - see LICENSE.md

### 🙋‍♂️ Author
Mohamed Yaakoubi

LinkedIn: [Mohamed Yaakoubi](https://www.linkedin.com/in/yaakoubi-mohamed/)
Portfolio: https://mohamed-yakoubi.vercel.app/

### Built with ❤️ using Next.js and Mistral AI
