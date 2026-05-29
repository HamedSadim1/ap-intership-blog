interface IconProps {
  /** Tailwind classes voor grootte, kleur, etc. */
  className?: string;
}

/**
 * MenuIcon — Hamburger menu (3 horizontale lijnen)
 *
 * Gebruikt in MobileMenuButton voor mobiele navigatie toggle.
 *
 * @param className - Tailwind classes voor grootte, kleur (default: geen)
 * @returns SVG element
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
