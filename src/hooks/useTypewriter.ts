import { useState, useEffect } from 'react';

export function useTypewriter(phrases: string[], typingSpeed = 150, deletingSpeed = 75, pauseTime = 2000) {
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayedText === phrases[phraseIndex]) {
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      } else {
        // Type the next character
        timeout = setTimeout(() => {
          setDisplayedText(phrases[phraseIndex].slice(0, displayedText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (displayedText === '') {
        // Move to next phrase
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      } else {
        // Delete the last character
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return displayedText;
}