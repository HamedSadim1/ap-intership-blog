import { cn, TEXT_STYLES } from "@/lib/utils/styles";
import type { ReactNode } from "react";

interface EmptyStateProps {
  /** Emoji of icon (default: 🔍) */
  icon?: string;
  /** Hoofdbericht */
  message: ReactNode;
  /** Secundaire hint tekst */
  hint?: string;
  /** Extra styling voor de hint (overschrijft default text-sm) */
  hintClassName?: string;
  /** Optionele extra content onder de hint (bv. knoppen, links) */
  children?: ReactNode;
  /** Buitenste wrapper classes */
  className?: string;
  /** Icon grootte (default: text-6xl) */
  iconSize?: string;
  /** HTML tag voor het bericht (default: p) */
  messageAs?: "h1" | "h2" | "p";
}

const headingStyles = {
  h1: "text-3xl md:text-4xl font-bold text-white",
  h2: "text-3xl md:text-4xl font-bold text-white",
  p: cn("text-lg", TEXT_STYLES.muted),
} as const;

/**
 * EmptyState — Lege toestand placeholder
 *
 * Toont een gecentreerd icoon, bericht en optionele hint voor situaties
 * waar geen data beschikbaar is (lege lijsten, geen zoekresultaten, etc.).
 *
 * @example
 * <EmptyState
 *   icon="🔍"
 *   message="Geen artikelen gevonden"
 *   hint="Probeer een andere tag"
 * />
 *
 * @example
 * <EmptyState
 *   message="Pagina niet gevonden"
 *   messageAs="h2"
 *   iconSize="text-8xl"
 * >
 *   <NotFoundActions />
 * </EmptyState>
 */
export function EmptyState({
  icon = "🔍",
  message,
  hint,
  hintClassName,
  children,
  className,
  iconSize = "text-6xl",
  messageAs = "p",
}: EmptyStateProps) {
  const MessageTag = messageAs;

  return (
    <div className={cn("text-center py-16", className)}>
      <div className={cn("mb-6", iconSize)}>{icon}</div>
      <MessageTag className={cn("mb-4", headingStyles[messageAs])}>{message}</MessageTag>
      {hint && (
        <p className={hintClassName || cn("text-sm mt-2", TEXT_STYLES.faint)}>{hint}</p>
      )}
      {children}
    </div>
  );
}
