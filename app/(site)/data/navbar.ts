/**
 * Navbar Data - Navigatie configuratie
 * Pas deze waarden aan om de navigatie te updaten
 */

/** Type voor navigatie items */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  iconName?: "home" | "blog" | "user";
}

/** Navigatie links */
export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    iconName: "home",
  },
  {
    label: "Blog",
    href: "/blog",
    iconName: "blog",
  },
  {
    label: "About",
    href: "/about",
    iconName: "user",
  },
];

/** Navbar configuratie */
export const navbarConfig = {
  /** Logo/brand tekst */
  brandName: "Stageblog",
  /** Navigatie items */
  items: navItems,
};
