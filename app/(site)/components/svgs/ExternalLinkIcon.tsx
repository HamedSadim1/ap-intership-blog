interface IconProps {
  /** Tailwind classes voor grootte, kleur, etc. */
  className?: string;
}

/**
 * ExternalLinkIcon — Externe link (pijl naar buiten)
 *
 * Geeft visueel aan dat een link naar een externe website leidt.
 * Gebruikt in ExternalLink en InfoCard componenten.
 *
 * @param className - Tailwind classes voor grootte, kleur (default: geen)
 * @returns SVG element
 *
 * @example
 * <ExternalLinkIcon className="w-4 h-4 text-cyan-300" />
 */
const ExternalLinkIcon = ({ className }: IconProps) => (
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
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default ExternalLinkIcon;
