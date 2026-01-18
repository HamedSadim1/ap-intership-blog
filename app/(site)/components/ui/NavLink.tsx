"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../data/navbar";

/**
 * Props voor NavLink component
 * @property item - Navigatie item data
 * @property variant - Desktop of mobiel variant
 * @property onClick - Optionele click handler (voor mobiel menu sluiten)
 */
interface NavLinkProps {
  item: NavItem;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
}

/**
 * NavLink - Herbruikbare navigatie link met hover effecten
 * Toont automatisch welke pagina actief is
 *
 * @example
 * // Desktop variant met underline hover effect
 * <NavLink item={{ label: "Home", href: "/" }} variant="desktop" />
 *
 * @example
 * // Mobiel variant met achtergrond hover effect
 * <NavLink item={{ label: "Blog", href: "/blog" }} variant="mobile" onClick={closeMenu} />
 */
const NavLink = ({ item, variant = "desktop", onClick }: NavLinkProps) => {
  const pathname = usePathname();

  // Check of deze link actief is
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  const baseStyles = "font-medium transition-colors";
  const activeStyles = "text-white";
  const inactiveStyles = "text-white/60 hover:text-white";

  const desktopStyles = "relative group";
  const mobileStyles = "px-4 py-2 rounded-lg";
  const mobileActiveStyles = "bg-white/10";
  const mobileInactiveStyles = "hover:bg-white/10";

  const combinedStyles = `${baseStyles} ${
    isActive ? activeStyles : inactiveStyles
  } ${
    variant === "desktop"
      ? desktopStyles
      : `${mobileStyles} ${
          isActive ? mobileActiveStyles : mobileInactiveStyles
        }`
  }`;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={combinedStyles}
      aria-current={isActive ? "page" : undefined}
      {...(item.external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {item.label}
      {/* Underline effect - altijd zichtbaar bij active, hover bij inactive */}
      {variant === "desktop" && (
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      )}
    </Link>
  );
};

export default NavLink;
