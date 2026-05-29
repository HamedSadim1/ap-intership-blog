interface IconProps {
  /** Tailwind classes voor grootte, kleur, etc. */
  className?: string;
}

/**
 * BuildingIcon — Kantoorgebouw / bedrijf
 *
 * Gebruikt op de About pagina voor de stageplaats-sectie.
 *
 * @param className - Tailwind classes voor grootte, kleur (default: geen)
 * @returns SVG element
 *
 * @example
 * <BuildingIcon className="w-6 h-6 text-yellow-300" />
 */
const BuildingIcon = ({ className }: IconProps) => (
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
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

export default BuildingIcon;
