"use client";

import { useState } from "react";

/**
 * Client-side component that adds copy functionality to code blocks
 * Scans for all <pre> elements and adds a copy button to each
 */
export function CodeBlockEnhancer() {
  return <CodeBlockWrapper />;
}

function CodeBlockWrapper() {
  const [, setCopied] = useState(false);

  const handleCopy = async (button: HTMLButtonElement) => {
    const pre = button.closest("pre");
    if (!pre) return;

    const code = pre.querySelector("code");
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code.textContent || "");
      button.textContent = "✓ Gekopieerd!";
      button.classList.add("copied");
      setCopied(true);

      setTimeout(() => {
        button.textContent = "Kopieer";
        button.classList.remove("copied");
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Add copy buttons to all code blocks after mount
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const preElements = document.querySelectorAll(".prose pre");
      preElements.forEach((pre) => {
        // Check if button already exists
        if (pre.querySelector(".copy-button")) return;

        const button = document.createElement("button");
        button.textContent = "Kopieer";
        button.className = "copy-button";
        button.onclick = () => handleCopy(button);

        (pre as HTMLElement).style.position = "relative";
        pre.appendChild(button);
      });
    }, 100);
  }

  return null;
}
