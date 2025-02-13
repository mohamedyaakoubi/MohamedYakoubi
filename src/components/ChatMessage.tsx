import React from 'react';
import { useLanguage } from '@/context/language-context';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} group`}>
      <div
        className={`
          max-w-[80%] rounded-lg px-4 py-2.5 
          ${sender === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 shadow-sm'}
          ${isRTL ? 'font-arabic' : ''}
          transform transition-all duration-200 ease-out
          hover:scale-[1.02] hover:shadow-md
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;