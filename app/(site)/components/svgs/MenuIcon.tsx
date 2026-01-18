/**
 * Gedeelde props interface voor alle icoon componenten
 * @property className - Tailwind classes voor grootte, kleur, etc.
 */
interface IconProps {
  className?: string;
}

/**
 * MenuIcon - Hamburger menu icoon (3 horizontale lijnen)
 * Gebruikt voor mobiele navigatie menu toggle
 *
 * @example
 * <MenuIcon className="w-6 h-6 text-white" />
 */
const MenuIcon = ({ className }: IconProps) => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export default MenuIcon;
