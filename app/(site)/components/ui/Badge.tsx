import { ReactNode } from "react";

/**
 * Props voor Badge component
 * @property children - Tekst of inhoud van de badge
 * @property showPulse - Toon pulserende indicator (default: true)
 * @property pulseColor - Tailwind kleur class voor pulse dot (default: "bg-green-400")
 * @property className - Extra Tailwind classes (optioneel)
 */
interface BadgeProps {
  children: ReactNode;
  showPulse?: boolean;
  pulseColor?: string;
  className?: string;
}

/**
 * Badge - Een status badge met optionele pulserende indicator
 * Ideaal voor het tonen van status, labels of tags
 *
 * @example
 * // Standaard met groene pulse
 * <Badge>Stage 2024-2025</Badge>
 *
 * @example
 * // Met rode pulse
 * <Badge pulseColor="bg-red-400">Urgent</Badge>
 *
 * @example
 * // Zonder pulse
 * <Badge showPulse={false}>Label</Badge>
 */
const Badge = ({
  children,
  showPulse = true,
  pulseColor = "bg-green-400",
  className = "",
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30 ${className}`}
    >
      {showPulse && (
        <span className={`w-2 h-2 ${pulseColor} rounded-full animate-pulse`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
