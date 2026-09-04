import { useState, useEffect } from 'react';

export function useTypewriter(phrases: string[], typingSpeed = 150, deletingSpeed = 75, pauseTime = 2000) {
  const initialPhrase = phrases && phrases.length > 0 ? phrases[0] : '';
  const [displayedText, setDisplayedText] = useState(initialPhrase);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialPaused, setHasInitialPaused] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    let timeout: NodeJS.Timeout;

    if (!hasInitialPaused) {
      // Pause on the initial phrase before starting deletion
      timeout = setTimeout(() => {
        setHasInitialPaused(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }
    
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
  }, [displayedText, isTyping, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime, hasInitialPaused]);

  return displayedText;
}