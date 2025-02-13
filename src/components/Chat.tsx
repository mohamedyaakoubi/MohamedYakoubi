"use client"

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/language-context';
import { useTranslation } from '@/hooks/useTranslation';

import ChatMessage from './ChatMessage';



interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Start closed
  const [error, setError] = useState<Error | null>(null);
  const [hasSeenChat, setHasSeenChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle initial animation and welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([{
        role: 'assistant',
        content: t('chat.welcomeMessage')
      }]);
    }, 1500); // Delay chat opening

    return () => clearTimeout(timer);
  }, [t]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                messages: [...messages, userMessage],
                language: language
            }),
        });

      if (!response.ok) throw new Error('Failed to fetch response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let accumulatedContent = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        accumulatedContent += text;

        // Update the UI with accumulated content
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.role === 'assistant') {
            lastMessage.content = accumulatedContent;
            return [...newMessages];
          }
          return [...newMessages, { role: 'assistant', content: accumulatedContent }];
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
   <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
  {/* Chat Toggle Button */}
  <div className="fixed bottom-6 right-6 pointer-events-auto">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`
      w-11 h-11
      flex items-center justify-center
      rounded-full shadow-lg
      bg-gradient-to-r from-blue-500 to-purple-500 text-white
      hover:shadow-blue-500/25 hover:shadow-xl
      transition-all duration-500 ease-out transform 
      hover:scale-105
      ${isOpen ? 'rotate-0' : 'rotate-180'}
    `}
    aria-label={isOpen ? t('chat.toggleClose') : t('chat.toggleOpen')}
  >
    <span className="text-xl leading-none">
      {isOpen ? '×' : '💬'}
    </span>
  </button>
</div>

{/* Update the chat window */}
<div
  className={`
    fixed bottom-20 right-6 w-80 // Smaller width and adjusted position
    transform transition-all duration-500 ease-out
    pointer-events-auto
    ${isOpen 
      ? 'translate-y-0 opacity-100' 
      : 'translate-y-10 opacity-0 pointer-events-none'}
  `}
>
  <div className={`
    h-[400px] // Reduced height
    bg-white dark:bg-gray-900 
    border border-gray-200 dark:border-gray-800
    rounded-xl // Slightly smaller border radius
    shadow-xl flex flex-col
    backdrop-blur-sm bg-opacity-95
    ${language === 'ar' ? 'rtl font-arabic' : 'ltr'}
    animate-slideUp
  `}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t('chat.title')}
            </h3>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ChatMessage 
                  message={message.content} 
                  sender={message.role === 'user' ? 'user' : 'bot'} 
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg px-4 py-2">
                  <p className="text-sm">{t('chat.errorPrefix')} {error.message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={t('chat.placeholder')}
                className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-800
                  bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500
                  transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg
                  bg-gradient-to-r from-blue-500 to-purple-500 text-white
                  hover:shadow-lg hover:shadow-blue-500/25
                  transition-all duration-200 disabled:opacity-50
                  transform hover:scale-105"
                disabled={isLoading || !input.trim()}
              >
                {t('chat.sendButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}