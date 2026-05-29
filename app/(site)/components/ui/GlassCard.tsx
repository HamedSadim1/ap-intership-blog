import { ReactNode } from "react";
import { GLASS_CLASSES, ROUNDED_CLASSES, cn } from "@/lib/utils/styles";

/**
 * Props voor GlassCard component
 * @property children - Inhoud van de kaart
 * @property className - Extra Tailwind classes (optioneel)
 */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * GlassCard - Een glasmorphism container
 * Gebruikt semi-transparante achtergrond voor een modern glass effect
 *
 * @example
 * <GlassCard className="max-w-xl">
 *   <h1>Titel</h1>
 *   <p>Content hier...</p>
 * </GlassCard>
 */
const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative z-10 p-10 md:p-14 shadow-2xl",
        GLASS_CLASSES.card,
        ROUNDED_CLASSES.xl,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
