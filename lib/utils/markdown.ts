import "server-only";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
// @ts-ignore - Some packages don't have proper TS types
import markdownItAnchor from "markdown-it-anchor";
// @ts-ignore
import markdownItContainer from "markdown-it-container";

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
    return `<pre class="hljs"><code>${MarkdownIt.prototype.utils.escapeHtml(str)}</code></pre>`;
  },
})
  // Auto-generate heading anchors for deep linking
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "before",
      class: "heading-anchor",
    }),
    slugify: (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
  })
  // Success container
  .use(markdownItContainer, "success", {
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-success">\n';
      } else {
        return "</div>\n";
      }
    },
  })
  // Warning container
  .use(markdownItContainer, "warning", {
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-warning">\n';
      } else {
        return "</div>\n";
      }
    },
  })
  // Info container
  .use(markdownItContainer, "info", {
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-info">\n';
      } else {
        return "</div>\n";
      }
    },
  })
  // Danger container
  .use(markdownItContainer, "danger", {
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<div class="callout callout-danger">\n';
      } else {
        return "</div>\n";
      }
    },
  });

/**
 * Render markdown string to HTML
 */
export function renderMarkdown(content: string): string {
  return md.render(content || "");
}

/**
 * Extract headings from markdown for Table of Contents
 */
export function extractHeadings(content: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const tokens = md.parse(content, {});
  const headings: Array<{ level: number; text: string; id: string }> = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "heading_open") {
      const level = parseInt(tokens[i].tag.substring(1));
      const textToken = tokens[i + 1];
      const text = textToken.content;
      const id = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      headings.push({ level, text, id });
    }
  }

  return headings;
}
