"use client";

import { useEffect, useState } from "react";
import { ClockIcon } from "@/app/(site)/components/svgs";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  readingTime?: string;
}

/**
 * Table of Contents — mostly CSS with minimal JS for active highlight
 *
 * Smooth scroll: html { scroll-behavior: smooth } + scroll-margin-top on headings
 * Sticky: parent's lg:sticky lg:top-24
 * Active highlight: IntersectionObserver (only JS — no click handler)
 * Links: native <a href="#id"> — zero JS for navigation
 */
export function TableOfContents({ headings, readingTime }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc">
      <div className="bg-white/15 rounded-xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/20">
          <span className="text-xl">📑</span>
          <h3 className="text-base font-bold text-white uppercase tracking-wide">
            Inhoudsopgave
          </h3>
        </div>

        {readingTime && (
          <div className="mb-4 flex items-center gap-2 text-white/50 text-xs">
            <ClockIcon className="w-3.5 h-3.5" />
            {readingTime}
          </div>
        )}

        <ul className="space-y-2.5">
          {headings.map(({ level, text, id }) => (
            <li
              key={id}
              style={{ marginLeft: `${(level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${id}`}
                className={`group flex items-center gap-2 text-sm rounded-md -ml-1.5 px-1.5 py-0.5 transition-[background-color,color] duration-300 cursor-pointer ${
                  activeId === id
                    ? "text-cyan-200"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-[background-color,transform] duration-300 ${
                    activeId === id
                      ? "bg-cyan-300 scale-125"
                      : "bg-white/30 group-hover:bg-white/60"
                  }`}
                />
                <span className="flex-1">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
