import Link from "next/link";
import { ReactNode } from "react";

/**
 * Props voor NavBrand component
 * @property href - Link URL (default: "/")
 * @property children - Brand tekst of logo
 * @property className - Extra Tailwind classes (optioneel)
 */
interface NavBrandProps {
  href?: string;
  children: ReactNode;
  className?: string;
}

/**
 * NavBrand - Logo/brand link voor navigatie
 *
 * @example
 * <NavBrand>Stageblog</NavBrand>
 *
 * @example
 * <NavBrand href="/home">
 *   <Image src="/logo.png" alt="Logo" />
 * </NavBrand>
 */
const NavBrand = ({ href = "/", children, className = "" }: NavBrandProps) => {
  return (
    <Link
      href={href}
      className={`text-xl font-bold text-white hover:text-white/80 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavBrand;
