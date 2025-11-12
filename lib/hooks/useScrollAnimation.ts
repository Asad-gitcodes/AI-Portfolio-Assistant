// lib/hooks/useScrollAnimation.ts - Custom hook for scroll animations

'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1, hideOnScrollUp = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hideOnScrollUp) {
          // Show when entering viewport, hide when leaving
          setIsVisible(entry.isIntersecting);
        } else {
          // Once visible, stay visible (original behavior)
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, hideOnScrollUp]);

  return { ref, isVisible };
}