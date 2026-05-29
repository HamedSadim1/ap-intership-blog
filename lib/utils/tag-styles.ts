/**
 * Shared Tag Styling Utilities
 * DRY principe voor tag components (TagFilter & TagList)
 */

import { cn, ROUNDED_CLASSES, TRANSITION_CLASSES } from "./styles";

/**
 * Tag size configuratie
 */
export const TAG_SIZES = {
  compact: "px-2 py-1 text-xs",
  default: "px-3 py-1 text-sm",
  large: "px-4 py-1.5 text-sm",
} as const;

/**
 * Tag states styling
 */
export const TAG_STYLES = {
  base: cn(
    ROUNDED_CLASSES.full,
    "text-white",
    TRANSITION_CLASSES.colors,
    "cursor-pointer",
  ),
  inactive: "bg-white/20 hover:bg-white/30",
  active: "bg-linear-to-r from-purple-500 to-pink-500 shadow-lg",
  nonClickable: "bg-purple-500/20 text-purple-200",
} as const;

/**
 * Helper: Genereer tag className op basis van state
 */
export function getTagClassName(
  size: keyof typeof TAG_SIZES,
  isActive: boolean,
  isClickable: boolean = true,
): string {
  const sizeClass = TAG_SIZES[size];
  const baseClass = TAG_STYLES.base;

  if (!isClickable) {
    return cn(sizeClass, baseClass, TAG_STYLES.nonClickable);
  }

  const stateClass = isActive ? TAG_STYLES.active : TAG_STYLES.inactive;
  return cn(sizeClass, baseClass, stateClass);
}
