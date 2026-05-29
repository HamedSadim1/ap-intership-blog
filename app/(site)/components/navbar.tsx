"use client";

import { useState } from "react";
import { navbarConfig, NavItem } from "../data";
import { NavLink, NavBrand, MobileMenuButton } from "./ui";

/**
 * Props voor Navbar component
 * @property brandName - Optionele override voor brand naam
 * @property items - Optionele override voor navigatie items
 * @property className - Extra Tailwind classes (optioneel)
 */
interface NavbarProps {
  brandName?: string;
  items?: NavItem[];
  className?: string;
}

/**
 * Navbar - Glasmorphism navigatiebalk
 *
 * Features:
 * - Glass effect passend bij het thema
 * - Responsive met mobiel hamburger menu
 * - Smooth animaties
 * - Volledig configureerbaar via props of data file
 *
 * @example
 * // Standaard met data uit navbar.ts
 * <Navbar />
 *
 * @example
 * // Met custom items
 * <Navbar
 *   brandName="Mijn Site"
 *   items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
 * />
 */
const Navbar = ({
  brandName = navbarConfig.brandName,
  items = navbarConfig.items,
  className = "",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 ${className}`}>
      <div className="max-w-6xl mx-auto ">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <NavBrand>{brandName}</NavBrand>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {items.map((item) => (
                <NavLink key={item.href} item={item} variant="desktop" />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-[max-height,opacity,margin,padding] duration-300 ease-out ${
              isOpen ? "max-h-96 mt-4 pt-4 border-t border-white/10" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  variant="mobile"
                  onClick={closeMenu}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
