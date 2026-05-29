import { ChevronDownIcon } from "@/app/(site)/components/svgs";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface MobileTocToggleProps {
  headings: Heading[];
}

/**
 * MobileTocToggle — Collapsible inhoudsopgave voor mobiele schermen
 *
 * Gebruikt native `<details>` element voor toegankelijke toggle-functionaliteit.
 * Automatisch verborgen op `lg:` breakpoint ten gunste van de desktop sidebar TOC.
 */
export function MobileTocToggle({ headings }: MobileTocToggleProps) {
  if (headings.length === 0) return null;

  return (
    <details className="lg:hidden mb-8 group">
      <summary className="bg-white/15 rounded-xl p-4 border border-white/20 cursor-pointer text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-colors list-none">
        <span>📑</span>
        <span>Inhoudsopgave</span>
        <ChevronDownIcon className="w-4 h-4 ml-auto transition-transform group-open:rotate-180" />
      </summary>
      <nav className="mt-2 bg-white/10 rounded-xl p-4 border border-white/10">
        <ul className="space-y-2">
          {headings.map(({ level, text, id }) => (
            <li key={id} style={{ marginLeft: `${(level - 2) * 0.75}rem` }}>
              <a
                href={`#${id}`}
                className="text-white/70 hover:text-white text-sm transition-colors block py-1"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
