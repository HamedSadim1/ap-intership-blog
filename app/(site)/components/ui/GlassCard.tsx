import { ReactNode } from "react";

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
 * GlassCard - Een glasmorphism container met blur effect
 * Gebruikt backdrop-blur en semi-transparante achtergrond voor een modern glass effect
 *
 * @example
 * <GlassCard className="max-w-xl">
 *   <h1>Titel</h1>
 *   <p>Content hier...</p>
 * </GlassCard>
 */
const GlassCard = ({ children, className = "" }: GlassCardProps) => {
  return (
    <div
      className={`relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
