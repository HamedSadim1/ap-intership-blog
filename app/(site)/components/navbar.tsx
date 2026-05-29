"use client";

import { useState, useEffect } from "react";
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

/** Scroll threshold in pixels voor glass overgang */
const SCROLL_THRESHOLD = 10;

/**
 * Navbar - Glasmorphism navigatiebalk met shadcn/ui Sheet voor mobiel menu
 *
 * Features:
 * - Scroll-aware: wordt opaquer met schaduw bij scrollen
 * - Glass effect passend bij het thema
 * - shadcn/ui Sheet voor mobiel menu (scroll lock, Escape key, focus trapping inbegrepen)
 * - Fade-in animatie op initial load
 * - Volledig configureerbaar via props of data file
 */
const Navbar = ({
  brandName = navbarConfig.brandName,
  items = navbarConfig.items,
  className = "",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection — voegt shadow/opacity toe zodra gebruiker scrolt
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`relative z-50 px-4 transition-all duration-500 ease-out ${className}`}
    >
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div
          className={`backdrop-blur-xl border border-white/20 rounded-2xl px-6 transition-all duration-500 ease-out ${
            isScrolled
              ? "bg-white/20 shadow-2xl shadow-black/20 py-3"
              : "bg-white/10 shadow-lg py-4"
          }`}
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
          className="w-[280px] max-w-[85vw] border-l border-white/20 bg-white/10 backdrop-blur-2xl text-white p-6 pt-16"
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
