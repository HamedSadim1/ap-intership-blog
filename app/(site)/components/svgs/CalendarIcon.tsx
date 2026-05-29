interface CalendarIconProps {
  /** Tailwind classes voor grootte, kleur, etc. (default: "w-4 h-4") */
  className?: string;
}

/**
 * CalendarIcon — Kalender / datum
 *
 * Gebruikt in PostMeta voor publicatiedatum weergave.
 *
 * @param className - Tailwind classes (default: "w-4 h-4")
 * @returns SVG element
 *
 * @example
 * <CalendarIcon className="w-5 h-5 text-white/40" />
 */
const CalendarIcon = ({ className = "w-4 h-4" }: CalendarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};

export default CalendarIcon;
