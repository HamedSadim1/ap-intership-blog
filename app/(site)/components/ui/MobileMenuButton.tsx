"use client";

import { MenuIcon, CloseIcon } from "../svgs";

/**
 * Props voor MobileMenuButton component
 * @property isOpen - Of het menu open is
 * @property onClick - Toggle functie
 * @property className - Extra Tailwind classes (optioneel)
 */
interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * MobileMenuButton - Hamburger/close toggle button voor mobiele navigatie
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
 */
const MobileMenuButton = ({
  isOpen,
  onClick,
  className = "",
}: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors ${className}`}
      aria-label={isOpen ? "Sluit menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <CloseIcon className="w-6 h-6" />
      ) : (
        <MenuIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default MobileMenuButton;
