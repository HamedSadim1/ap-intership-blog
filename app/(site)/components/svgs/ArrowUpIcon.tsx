interface ArrowUpIconProps {
  /** Tailwind classes voor grootte, kleur, etc. (default: "w-4 h-4") */
  className?: string;
}

/**
 * ArrowUpIcon — Pijl omhoog
 *
 * Gebruikt voor de BackToTop scroll-knop.
 *
 * @param className - Tailwind classes (default: "w-4 h-4")
 * @returns SVG element
 *
 * @example
 * <ArrowUpIcon className="w-5 h-5" />
 */
const ArrowUpIcon = ({ className = "w-4 h-4" }: ArrowUpIconProps) => {
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
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
};

export default ArrowUpIcon;
