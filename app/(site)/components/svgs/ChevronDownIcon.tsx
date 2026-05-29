interface ChevronDownIconProps {
  /** Tailwind classes voor grootte, kleur, etc. (default: "w-4 h-4") */
  className?: string;
}

/**
 * ChevronDownIcon — Pijltje omlaag
 *
 * Gebruikt in MobileTocToggle voor collapsible toggle.
 *
 * @param className - Tailwind classes (default: "w-4 h-4")
 * @returns SVG element
 *
 * @example
 * <ChevronDownIcon className="w-4 h-4 transition-transform group-open:rotate-180" />
 */
const ChevronDownIcon = ({ className = "w-4 h-4" }: ChevronDownIconProps) => {
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default ChevronDownIcon;
