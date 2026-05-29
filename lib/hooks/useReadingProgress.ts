"use client";

import { useState, useEffect, useRef } from "react";
import { clamp } from "@/lib/utils/math";

/**
 * useReadingProgress - Track reading progress as a percentage (0-100)
 *
 * Throttled via requestAnimationFrame voor scroll-performance.
 * Gebruikt een ref om onnodige setState calls te vermijden wanneer
 * het percentage niet verandert.
 *
 * @returns Number between 0 and 100 representing scroll percentage
 *
 * @example
 * const progress = useReadingProgress();
 * // progress = 45 when 45% through the page
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;

          const totalScrollableHeight = documentHeight - windowHeight;
          const scrollPercentage = clamp(
            (scrollTop / totalScrollableHeight) * 100,
            0,
            100,
          );

          // Alleen updaten als het percentage significant verschilt (voorkom onnodige re-renders)
          if (Math.abs(scrollPercentage - prevRef.current) > 0.5) {
            prevRef.current = scrollPercentage;
            setProgress(scrollPercentage);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
