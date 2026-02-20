"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../data/navbar";
import { HomeIcon, BlogIcon, UserIcon } from "../svgs";
import {
  cn,
  TRANSITION_CLASSES,
  ROUNDED_CLASSES,
  GLASS_CLASSES,
} from "@/lib/utils/styles";

/**
 * Props voor NavLink component
 */
interface NavLinkProps {
  item: NavItem;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
}

/**
 * NavLink - Navigationele link met active state styling
 * Gebruikt shared style utilities volgens DRY principe
 */
const NavLink = ({ item, variant = "desktop", onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  // Render icon
  const renderIcon = () => {
    const iconClassName = "w-5 h-5";
    switch (item.iconName) {
      case "home":
        return <HomeIcon className={iconClassName} />;
      case "blog":
        return <BlogIcon className={iconClassName} />;
      case "user":
        return <UserIcon className={iconClassName} />;
      default:
        return null;
    }
  };

  // Style configuration
  const baseStyles = cn(
    "font-medium cursor-pointer",
    TRANSITION_CLASSES.colors,
  );
  const activeStyles = "text-white";
  const inactiveStyles = "text-white/60 hover:text-white";

  const combinedStyles = cn(
    baseStyles,
    isActive ? activeStyles : inactiveStyles,
    variant === "desktop"
      ? "relative group"
      : cn(
          "px-4 py-2",
          ROUNDED_CLASSES.sm,
          isActive ? GLASS_CLASSES.light : "hover:bg-white/10",
        ),
  );

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={combinedStyles}
      aria-current={isActive ? "page" : undefined}
      scroll={false}
      {...(item.external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      <span className="flex items-center gap-2">
        {renderIcon()}
        <span>{item.label}</span>
      </span>
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
