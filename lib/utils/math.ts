/**
 * Math Utilities
 *
 * Herbruikbare wiskundige hulpfuncties.
 */

/**
 * clamp - Beperk een waarde tot een bereik [min, max]
 *
 * @param value - De inkomende waarde
 * @param min - Minimale toegestane waarde
 * @param max - Maximale toegestane waarde
 * @returns De geclampede waarde
 *
 * @example
 * clamp(150, 0, 100)
 * // Returns: 100
 *
 * clamp(-10, 0, 100)
 * // Returns: 0
 *
 * clamp(50, 0, 100)
 * // Returns: 50
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
