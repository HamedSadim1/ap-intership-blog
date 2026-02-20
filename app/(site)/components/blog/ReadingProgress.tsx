"use client";

import { useEffect, useState } from "react";

/**
 * Reading Progress Bar
 * Toont scroll voortgang door het artikel
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = (scrollTop / totalScrollableHeight) * 100;

      setProgress(Math.min(scrollPercentage, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div
        className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
