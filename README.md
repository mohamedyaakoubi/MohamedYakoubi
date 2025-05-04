# 🤖 AI-Powered Portfolio with Chat Application

A modern, AI-powered portfolio featuring an intelligent chat system built with Next.js 13 and Mistral AI.

## 📌 Overview

This project showcases a full-stack development approach combining modern web technologies with AI capabilities. The portfolio includes a sophisticated chat interface powered by Mistral AI, demonstrating both technical proficiency and practical application of AI integration.

### 🌟 Key Features

- **AI-Powered Chat**: Real-time conversation with Mistral AI integration
- **Multilingual**: Full support for English, French, and Arabic
- **Theme Switching**: Smooth dark/light mode transitions with sound effects
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Accessibility**: ARIA-compliant with keyboard navigation
- **Real-time Updates**: Server-side streaming for instant responses

## 🛠️ Tech Stack

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


## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18
npm or yarn
Mistral AI API key
```

### Setup
1. Clone and install:
```bash
git clone https://github.com/mohamedyaakoubi/MohamedYakoubi.git
cd portfolio-chat
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
# Add your Mistral AI API key to .env.local
```

3. Run development server:
```bash
npm run dev
```

## 📂 Project Structure
```
src/
├── app/                # Next.js pages & API routes
├── components/        # React components
│   ├── Chat/         # Chat interface components
│   └── ui/           # Shared UI components
├── context/          # React contexts
├── hooks/            # Custom hooks
├── translations/     # i18n files
└── types/           # TypeScript definitions
```

## 💡 Implementation Highlights

### Chat Integration
```typescript
const chatResponse = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    messages,
    language 
  })
});
```

### Key Features
- **Streaming**: Real-time message streaming with progress indicators
- **Multilingual**: Language-specific responses and RTL support
- **Error Handling**: Robust error management with retry mechanism
- **State Management**: Efficient React state handling
- **Accessibility**: Screen reader support and keyboard navigation


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is MIT licensed - see [LICENSE.md](LICENSE.md)

## 👤 Author

**Mohamed Yaakoubi**
- Portfolio: [mohamed-yakoubi.vercel.app](https://mohamed-yakoubi.vercel.app)
- LinkedIn: [yaakoubi-mohamed](https://linkedin.com/in/yaakoubi-mohamed)
- GitHub: [@mohamedyaakoubi](https://github.com/mohamedyaakoubi)

---

<p align="center">Built with ❤️ using Next.js and Mistral AI</p>
