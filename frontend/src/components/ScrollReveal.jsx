import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children }) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          // This is only to make the animation works only once
          observer.unobserve(entry.target);
        }
      },
      {
        // This means that it trigger when 10% of the element is visible
        threshold: 0.1,
        // rootMargin acts like a bounding box padding
        // The px that i established makes the animation enters the screen before that quantity
        rootMargin: "0px 0px -50px 0px",
      } 
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

return (
    <div
      ref={elementRef}
      className={`transition-opacity duration-1000 ease-out ${
        hasRevealed
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {children}
    </div>
);  
}