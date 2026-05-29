/**
 * Shared CSS Class Utilities
 * Herbruikbare Tailwind class combinaties volgens DRY principe
 *
 * Single Source of Truth voor ALLE styling patterns in de applicatie.
 * Elke component gebruikt deze constanten i.p.v. inline Tailwind classes.
 */

/**
 * Glassmorphism effect classes
 */
export const GLASS_CLASSES = {
  card: "bg-white/15 border border-white/20",
  light: "bg-white/15",
  dark: "bg-white/10",
  border: "border border-white/10",
  borderLight: "border border-white/20",
} as const;

/**
 * Transition classes
 */
export const TRANSITION_CLASSES = {
  all: "transition-all duration-200",
  colors: "transition-colors duration-200",
  transform: "transition-transform duration-200",
  opacity: "transition-opacity duration-200",
  fast: "transition-all duration-150",
  slow: "transition-all duration-300",
  slowEase: "transition-all duration-300 ease-out",
  mediumEase: "transition-all duration-200 ease-out",
} as const;

/**
 * Rounded classes
 */
export const ROUNDED_CLASSES = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
} as const;

/**
 * Hover interactie classes
 * Consistente hover/active/focus patronen
 */
export const HOVER_CLASSES = {
  scale: "hover:scale-105 active:scale-[0.97]",
  scaleSm: "hover:scale-110 active:scale-95",
  lift:
    "hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20",
  glow: "hover:shadow-lg hover:shadow-purple-500/10",
  image: "transition-transform duration-300 ease-out group-hover:scale-110",
} as const;

/**
 * Gradient palette — één bron voor alle gradienten
 */
export const GRADIENTS = {
  /** Achtergrond gradient (layout, globals.css) */
  brand: "bg-linear-to-br from-blue-500 via-purple-500 to-pink-500",
  /** Accent lijn/divider */
  accent: "bg-linear-to-r from-blue-400 via-purple-400 to-pink-400",
  /** Shimmer tekst titel (hero, blog header) */
  text: "bg-linear-to-r from-yellow-200 via-pink-200 to-cyan-200",
  /** Subtiele titel gradient */
  title: "bg-linear-to-r from-white via-purple-100 to-pink-100",
  /** Progress bar */
  progress: "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500",
  /** Card hover title */
  cardTitleHover:
    "group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text",
  /** Nieuw badge */
  newBadge: "bg-linear-to-r from-green-400 to-emerald-500",
  /** Featured badge */
  featuredBadge: "bg-linear-to-r from-yellow-400 to-amber-500",
  /** Profiel glow ring (outer) */
  profileGlow:
    "bg-linear-to-br from-purple-400/40 via-pink-400/30 to-blue-400/40",
  /** Profiel inner ring */
  profileRing:
    "bg-linear-to-br from-purple-400/30 to-pink-400/20",
  /** GlassCard inner glow overlay */
  innerGlow:
    "bg-linear-to-br from-white/5 via-transparent to-purple-500/5",
  /** Dark overlay (PostHeader image) */
  darkOverlay:
    "bg-linear-to-t from-black/70 via-black/20 to-transparent",
  /** PostHeader purple/pink tint overlay */
  postOverlay:
    "bg-linear-to-r from-purple-500/10 to-pink-500/10",
  /** Card hover gradient overlay (related posts) */
  cardHoverOverlay:
    "bg-linear-to-t from-black/60 via-transparent to-transparent",
  /** Horizontale divider lijn */
  divider: "bg-linear-to-r from-transparent via-white/30 to-transparent",
  /** Actieve tag */
  tagActive: "bg-linear-to-r from-purple-500 to-pink-500 shadow-lg",
} as const;

/**
 * Text opacity stijlen — semantisch consistent
 */
export const TEXT_STYLES = {
  primary: "text-white",
  secondary: "text-white/85",
  muted: "text-white/60",
  faint: "text-white/40",
} as const;

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — Combineer Tailwind classes met conflict resolutie
 *
 * Gebruikt clsx voor conditionele logica (ternaries, arrays, objects)
 * + tailwind-merge om conflicterende Tailwind classes te dedupliceren
 * (bv. "px-4 px-6" wordt "px-6").
 *
 * @param inputs - Class values (strings, arrays, objects, falsy values)
 * @returns Geresolveerde Tailwind class string zonder conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


