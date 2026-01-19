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

interface LearningGoalCardProps {
  title: string;
  description: string;
}

export function LearningGoalCard({
  title,
  description,
}: LearningGoalCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <h3 className="text-lg font-medium text-purple-200 mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
}
