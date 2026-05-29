"use client";

import { useState } from "react";
import { navbarConfig, NavItem } from "../data";
import { NavLink, NavBrand, MobileMenuButton } from "./ui";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
 * Navbar - Navigatiebalk met shadcn/ui Sheet voor mobiel menu
 *
 * Bewust statisch (geen scroll-state) om flicker door backdrop-filter te voorkomen.
 * Gebruikt will-change: transform voor GPU compositor layer.
 *
 * Features:
 * - Glass effect met transparante achtergrond (geen backdrop-blur — veroorzaakt scroll flicker)
 * - shadcn/ui Sheet voor mobiel menu (scroll lock, Escape key, focus trapping inbegrepen)
 * - Volledig configureerbaar via props of data file
 */
const Navbar = ({
  brandName = navbarConfig.brandName,
  items = navbarConfig.items,
  className = "",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`relative z-50 px-4 ${className}`}
      style={{ willChange: "transform" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="border border-white/20 rounded-2xl px-6 bg-white/15 shadow-lg py-4"
        >
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
            <MobileMenuButton
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </div>

      {/* shadcn/ui Sheet — scroll lock, Escape key, focus trapping, click-outside inbegrepen */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-70 max-w-[85vw] border-l border-white/20 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 text-white p-6 pt-16"
        >
          <nav className="flex flex-col gap-3 mt-4">
            {items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                variant="mobile"
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
