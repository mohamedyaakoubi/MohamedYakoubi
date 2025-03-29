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
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasOpenedChat, setHasOpenedChat] = useState(false);
  const [hasPlayedNotification, setHasPlayedNotification] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Remove hasInitialized state as we'll handle initialization differently
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Separate effect for initial setup
  useEffect(() => {
    if (!hasMounted) return;
    
    // Create and set up audio element
    const audio = new Audio('/sounds/notification.mp3');
    audio.preload = 'auto';
    audioRef.current = audio;
    
    const timer = setTimeout(() => {
      setShowNotification(true);
      setMessages([{
        role: 'assistant',
        content: t('chat.welcomeMessage')
      }]);
      
      // Try to play audio after user interaction
      const playAudio = async () => {
        try {
          if (audioRef.current && !hasPlayedNotification) {
            await audioRef.current.play();
            setHasPlayedNotification(true);
          }
        } catch (error) {
          console.log('Audio playback failed:', error);
        }
      };

      // Add event listeners for user interaction
      const handleInteraction = () => {
        playAudio();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };

      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasMounted, t, hasPlayedNotification]);

  // Rest of your component code remains the same...

 // Update chat toggle to remove audio logic
 const handleChatToggle = () => {
  setIsOpen(!isOpen);
  if (!hasOpenedChat) {
    setHasOpenedChat(true);
  }
};

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  

  // Replace the error handling in the component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return;

  const userMessage = { role: 'user' as const, content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    // First, check API availability without showing errors
    const checkAvailable = await fetch('/api/chat', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // Prevent console errors from appearing
      mode: 'no-cors',
    }).catch(() => null); // Catch and ignore network errors

    // If API check fails, proceed with POST anyway - we'll handle the error
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [...messages, userMessage],
        language: language
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error: ${response.status}`);
    }

    // Rest of your streaming code
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');
  
      // Add placeholder for bot message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '' 
      }]);
  
      // Process chunks as they arrive
      let fullText = '';
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value, { stream: true });
        fullText += text;
        
        // Update the last message with the accumulated text
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'assistant', 
            content: fullText 
          };
          return newMessages;
        });
      }
    } catch (error) {
      // Suppress console error but show user-friendly message
      console.warn('Chat API error - handled gracefully');
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: t('chat.error') || 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
   <audio 
  ref={audioRef} 
  src="/sounds/notification.mp3" 
  preload="auto"
  style={{ display: 'none' }}
/>
      <div className="fixed bottom-6 right-6 pointer-events-auto">
      <button
  onClick={handleChatToggle}
  style={{ 
    width: '44px',
    height: '44px',
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    color: 'white',
    position: 'relative',
    zIndex: 9999,
    transition: 'all 500ms ease-out',
    transform: 'translateZ(0)' // Force hardware acceleration
  }}
  aria-label={isOpen ? t('chat.toggleClose') : t('chat.toggleOpen')}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 8px 15px rgba(59, 130, 246, 0.25)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  }}
>
  <span className="text-xl leading-none">
    {isOpen ? '×' : '💬'}
  </span>
  {showNotification && !hasOpenedChat && (
    <span 
      className="absolute -top-2 -right-2 flex items-center justify-center text-xs font-bold"
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: '#ef4444',
        borderRadius: '50%',
        animation: 'notification 0.5s ease-out forwards'
      }}
    >
      1
    </span>
  )}
</button>
        
{/* Welcome Message Tooltip */}
{showNotification && !hasOpenedChat && (
  <div className="absolute bottom-0 right-14 mb-2 animate-notification">
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl 
      border border-gray-200 dark:border-gray-800 
      py-2 px-3 // Reduced vertical padding, kept horizontal padding
      max-w-[280px] // Increased max width from 200px
      min-w-[200px] // Added minimum width
    ">
      <p className="text-[11px] // Adjusted font size
        font-medium text-gray-700 dark:text-gray-300 
        leading-tight // Added tighter line height
        whitespace-normal // Allow text to wrap naturally
      ">
        {t('chat.welcomeMessage')}
      </p>
    </div>
  </div>
)}
      </div>

{/* Update the chat window */}
<div
  className={`
    fixed bottom-24 right-6 w-80 // Increased bottom spacing from 20 to 24
    transform transition-all duration-500 ease-out
    z-[9998]
    max-h-[70vh] // Add maximum height constraint
    ${isOpen 
      ? 'opacity-100 translate-y-0 pointer-events-auto' 
      : 'opacity-0 translate-y-10 pointer-events-none'}
  `}
>
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 max-h-[inherit]"> {/* Added max-height inheritance */}
    <div className="flex flex-col h-full"> {/* Changed fixed height to h-full */}
          {/* Chat Content */}
          <div className="flex flex-col h-[400px]">
         {/* Header */}
<div className="p-2.5 border-b border-gray-200 dark:border-gray-800"> {/* Reduced from p-4 to p-2.5 */}
  <h2 className="font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
    {t('chat.title')}
  </h2>
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
            </div>
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
          <form 
  onSubmit={handleSubmit}
  className="p-2.5 border-t border-gray-200 dark:border-gray-800" // Reduced padding further
>
  <div className="flex gap-1"> {/* Reduced gap further */}
  <input
  type="text"
  value={input}
  onChange={handleInputChange}
  placeholder={t('chat.placeholder')}
  className="flex-1 px-1.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800
    bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500
    transition-all duration-200 text-[10px] placeholder:text-[10px]
    w-full min-w-0 truncate"
  disabled={isLoading}
/>
    <button
      type="submit"
      className="px-2.5 py-1.5 rounded-lg // Further reduced padding
        bg-gradient-to-r from-blue-500 to-purple-500 text-white
        hover:shadow-lg hover:shadow-blue-500/25
        transition-all duration-200 disabled:opacity-50
        transform hover:scale-105
        text-xs font-medium whitespace-nowrap" // Added whitespace-nowrap and adjusted text size
      disabled={isLoading || !input.trim()}
    >
      {t('chat.sendButton')}
    </button>
  </div>
</form>
        </div>
        </div>
      </div>
    </div>
  );
}