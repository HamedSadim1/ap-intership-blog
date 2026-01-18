/**
 * Navbar Data - Navigatie configuratie
 * Pas deze waarden aan om de navigatie te updaten
 */

/** Type voor navigatie items */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Navigatie links */
export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
];

/** Navbar configuratie */
export const navbarConfig = {
  /** Logo/brand tekst */
  brandName: "Stageblog",
  /** Navigatie items */
  items: navItems,
};
