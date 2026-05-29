import "server-only";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import markdownItAnchor from "markdown-it-anchor";
import markdownItContainer from "markdown-it-container";
import { escapeHtml, slugify } from "@/lib/utils/string";

/**
 * Configure markdown-it with extensive plugins for rich content
 *
 * Features:
 * - Syntax highlighting with highlight.js
 * - Auto-generated heading anchors for navigation
 * - Custom containers for callouts/alerts
 */
export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (error) {
        console.error("Highlight.js error:", error);
      }
    }
    return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`;
  },
})
  // Auto-generate heading anchors for deep linking
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "before",
      class: "heading-anchor",
    }),
    slugify,
  })
  // Success container
  .use(markdownItContainer, "success", {
    render: function (tokens: Array<{ nesting: number }>, idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-success">\n';
      } else {
        return "</div>\n";
      }
    },
  })
  // Warning container
  .use(markdownItContainer, "warning", {
    render: function (tokens: Array<{ nesting: number }>, idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-warning">\n';
      } else {
        return "</div>\n";
      }
    },
  })
  // Info container
  .use(markdownItContainer, "info", {
    render: function (tokens: Array<{ nesting: number }>, idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-info">\n';
      } else {
        return "</div>\n";
      }
    },
  })
  // Danger container
  .use(markdownItContainer, "danger", {
    render: function (tokens: Array<{ nesting: number }>, idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-danger">\n';
      } else {
        return "</div>\n";
      }
    },
  });

/**
 * Render markdown string to HTML
 *
 * Gebruikt de geconfigureerde markdown-it instance met highlight.js voor
 * syntax highlighting, heading anchors en custom containers.
 *
 * @param content - Markdown string om te renderen
 * @returns HTML string met volledige opmaak
 */
export function renderMarkdown(content: string): string {
  return md.render(content || "");
}

/**
 * Extract headings from markdown for Table of Contents
 *
 * Parse markdown tokens om heading-level, tekst en unieke anchor IDs te extraheren.
 * Duplicate heading IDs krijgen een numeriek suffix (bv. "titel-1", "titel-2").
 *
 * @param content - Markdown string om te parsen
 * @returns Array van heading objecten met level, text en unieke id
 */
export function extractHeadings(content: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const tokens = md.parse(content, {});
  const headings: Array<{ level: number; text: string; id: string }> = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "heading_open") {
      const level = parseInt(tokens[i].tag.substring(1));
      const textToken = tokens[i + 1];
      const text = textToken.content;
      const id = slugify(text);

      // Ensure unique id
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      headings.push({ level, text, id: uniqueId });
    }
  }

  return headings;
}
