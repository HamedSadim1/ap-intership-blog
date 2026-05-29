"use client";

import { useEffect } from "react";

interface CodeBlockEnhancerProps {
  /** Key die verandert per post om useEffect te triggeren bij navigatie */
  slug: string;
}

/**
 * Client-side component that adds copy functionality to code blocks.
 * Uses useEffect with slug dependency to re-run on post navigation.
 */
export function CodeBlockEnhancer({ slug }: CodeBlockEnhancerProps) {
  useEffect(() => {
    const preElements = document.querySelectorAll(".prose pre");

    preElements.forEach((pre) => {
      // Skip if button already exists
      if (pre.querySelector(".copy-button")) return;

      const button = document.createElement("button");
      button.textContent = "Kopieer";
      button.className = "copy-button";
      button.onclick = () => handleCopy(button);

      (pre as HTMLElement).style.position = "relative";
      pre.appendChild(button);
    });
  }, [slug]);

  return null;
}

/**
 * handleCopy — Copy code block content to clipboard
 *
 * Zoekt het `<code>` element binnen de `<pre>`, kopieert de tekst
 * en toont een tijdelijke statusmelding op de knop.
 *
 * @param button - De geklikte kopieer-knop
 * @returns void
 */
function handleCopy(button: HTMLButtonElement) {
  const pre = button.closest("pre");
  if (!pre) return;

  const code = pre.querySelector("code");
  if (!code) return;

  navigator.clipboard.writeText(code.textContent || "").then(() => {
    button.textContent = "✓ Gekopieerd!";
    button.classList.add("copied");

    setTimeout(() => {
      button.textContent = "Kopieer";
      button.classList.remove("copied");
    }, 2000);
  }).catch(() => {
    button.textContent = "Fout!";
    setTimeout(() => {
      button.textContent = "Kopieer";
    }, 1500);
  });
}
