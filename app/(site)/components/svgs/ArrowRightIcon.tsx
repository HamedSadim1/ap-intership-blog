/**
 * Gedeelde props interface voor alle icoon componenten
 * @property className - Tailwind classes voor grootte, kleur, etc.
 */
interface IconProps {
  className?: string;
}

/**
 * ArrowRightIcon - Pijl naar rechts icoon
 * Vaak gebruikt voor CTA buttons en navigatie elementen
 *
 * @example
 * <ArrowRightIcon className="w-5 h-5 text-white" />
 */
const ArrowRightIcon = ({ className }: IconProps) => (
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
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export default ArrowRightIcon;
