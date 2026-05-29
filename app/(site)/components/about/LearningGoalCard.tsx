/**
 * LearningGoalCard Component
 *
 * Card component voor het weergeven van individuele leerdoelen.
 * Gebruikt in grid layout op about pagina.
 *
 * @example
 * <LearningGoalCard
 *   title="React Development"
 *   description="Learn advanced React patterns"
 * />
 */

import { GLASS_CLASSES, ROUNDED_CLASSES, TRANSITION_CLASSES, HOVER_CLASSES, TEXT_STYLES, cn } from "@/lib/utils/styles";

interface LearningGoalCardProps {
  title: string;
  description: string;
  icon?: string;
}

export function LearningGoalCard({
  title,
  description,
  icon = "🎯",
}: LearningGoalCardProps) {
  return (
    <div
      className={cn(
        "group p-6 hover:-translate-y-1",
        GLASS_CLASSES.light,
        GLASS_CLASSES.border,
        ROUNDED_CLASSES.lg,
        TRANSITION_CLASSES.slowEase,
        "hover:bg-white/15 hover:border-white/20",
        HOVER_CLASSES.glow,
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className={cn("text-sm leading-relaxed", TEXT_STYLES.secondary)}>{description}</p>
    </div>
  );
}
