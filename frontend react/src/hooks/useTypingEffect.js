import { useEffect, useState } from "react";

export default function useTypingEffect(wordsArray, typeSpeed = 80, eraseSpeed = 50, delayBetween = 1500) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!wordsArray || wordsArray.length === 0) return;
    
    const currentWord = wordsArray[currentWordIndex];
    let timer;

    if (!isDeleting) {
      // TYPING LOGIC
      if (displayedText !== currentWord) {
        timer = setTimeout(() => {
          // Use functional update to ensure we safely grab the exact previous state layout
          setDisplayedText((prev) => currentWord.substring(0, prev.length + 1));
        }, typeSpeed);
      } else {
        // Fully typed! Pause before erasing
        timer = setTimeout(() => setIsDeleting(true), delayBetween);
      }
    } else {
      // ERASING THE LOGIC
      if (displayedText !== "") {
        timer = setTimeout(() => {
          setDisplayedText((prev) => currentWord.substring(0, prev.length - 1));
        }, eraseSpeed);
      } else {
        // Fully erased! Switch to next word
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsArray.length);
      }
    }
  return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, wordsArray, typeSpeed, eraseSpeed, delayBetween]);
  
  return displayedText
}