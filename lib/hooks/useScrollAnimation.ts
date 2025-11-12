// lib/hooks/useScrollAnimation.ts - Enhanced scroll animations (Fixed)

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  animationType?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
  disablePrefersReducedMotion?: boolean;
}

interface ScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  progress: number;
  inView: boolean;
}

// Main enhanced scroll animation hook
export function useScrollAnimation(
  optionsOrThreshold?: UseScrollAnimationOptions | number,
  hideOnScrollUp?: boolean
): ScrollAnimationReturn {
  // Handle backward compatibility with old (threshold, hideOnScrollUp) signature
  let options: UseScrollAnimationOptions;
  
  if (typeof optionsOrThreshold === 'number') {
    // Old signature: useScrollAnimation(0.1, true)
    options = {
      threshold: optionsOrThreshold,
      triggerOnce: !hideOnScrollUp, // Invert hideOnScrollUp logic
    };
  } else {
    // New signature: useScrollAnimation({ threshold: 0.1, triggerOnce: true })
    options = optionsOrThreshold || {};
  }

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = false,
    delay = 0,
    disablePrefersReducedMotion = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const hasAnimated = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (disablePrefersReducedMotion) return false;
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [disablePrefersReducedMotion]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If user prefers reduced motion, show immediately
    if (prefersReducedMotion()) {
      setIsVisible(true);
      setInView(true);
      setProgress(1);
      return;
    }

    // Create intersection observer for visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          
          // Calculate progress based on intersection ratio
          const intersectionProgress = entry.intersectionRatio;
          setProgress(intersectionProgress);
          setInView(isIntersecting);

          // Handle visibility with optional delay
          if (isIntersecting) {
            // Check if triggerOnce and already animated
            if (triggerOnce && hasAnimated.current) {
              return;
            }

            if (delay > 0) {
              timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
                hasAnimated.current = true;
              }, delay);
            } else {
              setIsVisible(true);
              hasAnimated.current = true;
            }
          } else {
            // Only hide if not triggerOnce
            if (!triggerOnce) {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: Array.isArray(threshold) 
          ? threshold 
          : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, prefersReducedMotion]);

  return { ref, isVisible, progress, inView };
}

// Hook for scroll direction detection
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return { scrollDirection, scrollY };
}

// Hook for parallax effects
export function useParallaxScroll(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
        const parallax = (scrolled - elementTop) * speed;
        setOffset(parallax);
      }
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [speed]);

  return { ref, offset };
}

// Hook for stagger animations
export function useStaggerAnimation(itemCount: number, staggerDelay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal items with stagger
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, i]));
              }, i * staggerDelay);
            }
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [itemCount, staggerDelay]);

  return { ref, visibleItems };
}

// Hook for scroll-triggered animations with progress tracking
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1) as element enters and leaves viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Element enters from bottom (progress 0) to exits from top (progress 1)
      const start = windowHeight;
      const end = -elementHeight;
      const range = start - end;
      const current = start - elementTop;
      
      const scrollProgress = Math.max(0, Math.min(1, current / range));
      setProgress(scrollProgress);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return { ref, progress };
}

// Default export
export default useScrollAnimation;