/**
 * Gedeelde props interface voor alle icoon componenten
 * @property className - Tailwind classes voor grootte, kleur, etc.
 */
interface IconProps {
  className?: string;
}

/**
 * ArrowLeftIcon - Pijl naar links icoon
 * Vaak gebruikt voor terug navigatie
 *
 * @example
 * <ArrowLeftIcon className="w-5 h-5 text-white" />
 */
const ArrowLeftIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export default ArrowLeftIcon;
