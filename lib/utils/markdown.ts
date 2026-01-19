import "server-only";

import markdownit from "markdown-it";
import hljs from "highlight.js";

/**
 * Configure markdown-it with syntax highlighting
 *
 * Singleton instance for consistent markdown rendering across the app.
 * Supports HTML, auto-linking, smart typography, and code highlighting.
 */
export const md = markdownit({
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
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

/**
 * Render markdown string to HTML
 */
export function renderMarkdown(content: string): string {
  return md.render(content || "");
}
