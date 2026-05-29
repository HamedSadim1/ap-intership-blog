/**
 * QuickLinks - Popular page links for the 404 page.
 *
 * Displays a list of quick navigation links to popular pages (Home, Blog, About).
 *
 * @example
 * <QuickLinks />
 */

import Link from "next/link";

const links = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/blog", label: "Blog", icon: "📝" },
  { href: "/about", label: "Over Mij", icon: "👤" },
] as const;

export function QuickLinks() {
  return (
    <div className="mt-10">
      <p className="text-sm text-gray-300 mb-4">
        Populaire pagina&apos;s:
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors cursor-pointer"
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
