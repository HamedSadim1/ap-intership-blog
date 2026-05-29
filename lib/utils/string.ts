/**
 * String Utilities
 *
 * Herbruikbare functies voor string-manipulatie.
 */

/**
 * escapeHtml - Escape HTML special characters
 *
 * Vervangt &, <, >, ", ' door hun HTML entity equivalenten.
 *
 * @param text - De input string
 * @returns Geëscapete string, veilig voor HTML-injectie
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * slugify - Converteer tekst naar een URL-safe slug
 *
 * Verwijdert speciale karakters en vervangt spaties door koppeltekens.
 *
 * @param text - De input string
 * @returns Slug string, lowercase met koppeltekens
 *
 * @example
 * slugify("Hello World!")
 * // Returns: "hello-world"
 *
 * slugify("Dit is een Test!!")
 * // Returns: "dit-is-een-test"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
