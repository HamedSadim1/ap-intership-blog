interface IconProps {
  /** Tailwind classes voor grootte, kleur, etc. */
  className?: string;
}

/**
 * CloseIcon — Sluit/kruis icoon (X)
 *
 * Gebruikt in MobileMenuButton om het menu te sluiten.
 *
 * @param className - Tailwind classes voor grootte, kleur (default: geen)
 * @returns SVG element
 *
 * @example
 * <CloseIcon className="w-6 h-6 text-white" />
 */
const CloseIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default CloseIcon;
