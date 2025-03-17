
import { useState, useEffect, RefObject } from 'react';

interface InViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export function useInView(
  elementRef: RefObject<HTMLElement>,
  options: InViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  
  const { once = false, margin = '0px', threshold = 0.1 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin: margin,
        threshold,
      }
    );

    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, once, margin, threshold]);

  return isInView;
}
