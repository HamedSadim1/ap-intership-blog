"use client";

import { useEffect, useState } from "react";

/**
 * Interface voor een heading in de blog post
 * @property level - H2 = 2, H3 = 3, etc. (bepaalt de indentatie)
 * @property text - De tekst van de heading
 * @property id - Unieke ID voor anchor links (bijv. "inleiding")
 */
interface Heading {
  level: number;
  text: string;
  id: string;
}

/**
 * Props voor TableOfContents component
 * @property headings - Array van alle headings uit de markdown content
 */
interface TableOfContentsProps {
  headings: Heading[];
}

/**
 * Table of Contents (Inhoudsopgave) component voor blog posts
 *
 * FUNCTIONALITEIT:
 * 1. Toont alle headings (H2, H3, etc.) uit de blog post
 * 2. Highlight de actieve heading terwijl je scrollt (IntersectionObserver)
 * 3. Klikken op een heading scrollt smooth naar die sectie
 * 4. Sticky positie - blijft zichtbaar tijdens scrollen
 *
 * GEBRUIK:
 * <TableOfContents headings={extractedHeadings} />
 */
export function TableOfContents({ headings }: TableOfContentsProps) {
  // State: houdt de ID bij van de heading die momenteel in beeld is
  const [activeId, setActiveId] = useState<string>("");

  /**
   * STAP 1: Intersection Observer Setup
   *
   * Deze useEffect draait één keer bij component mount en set up een
   * Intersection Observer die detecteert welke heading momenteel zichtbaar is.
   *
   * WERKING:
   * - Observer kijkt naar alle headings in de DOM
   * - Als een heading in beeld komt (isIntersecting = true)
   * - Update activeId state naar die heading ID
   * - Dit triggert re-render met nieuwe active styling
   */
  useEffect(() => {
    // Maak een nieuwe Intersection Observer aan
    const observer = new IntersectionObserver(
      (entries) => {
        // Loop door alle observed elements die zijn veranderd
        entries.forEach((entry) => {
          // Als het element IN beeld is
          if (entry.isIntersecting) {
            // Markeer dit element als actief
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // rootMargin: -20% van top, -35% van bottom
        // Dit betekent: element is "actief" als het tussen 20% en 65% van viewport is
        // Hierdoor wordt de heading gemarkeerd als je er net langs scrollt
        rootMargin: "-20% 0% -35% 0%",
      },
    );

    // STAP 2: Observeer alle headings
    // Loop door alle headings en voeg ze toe aan de observer
    headings.forEach(({ id }) => {
      // Zoek het DOM element met deze ID
      const element = document.getElementById(id);
      if (element) {
        // Start met observeren van dit element
        observer.observe(element);
      }
    });

    // CLEANUP: Stop met observeren bij component unmount
    // Dit voorkomt memory leaks
    return () => observer.disconnect();
  }, [headings]); // Re-run als headings array verandert

  /**
   * STAP 3: Vroege return als er geen headings zijn
   * Render niets als de blog post geen headings heeft
   */
  if (headings.length === 0) {
    return null;
  }

  /**
   * STAP 4: Click Handler voor smooth scrolling
   *
   * Wanneer gebruiker op een TOC link klikt:
   * 1. Voorkom default anchor behavior (instant jump)
   * 2. Vind het target element
   * 3. Bereken correcte scroll positie (met offset voor header)
   * 4. Scroll smooth naar die positie
   *
   * @param e - React MouseEvent om preventDefault te kunnen aanroepen
   * @param id - ID van het target element (bijv. "inleiding")
   */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Voorkom default anchor link gedrag (pagina zou instant jumpen)
    e.preventDefault();

    // Zoek het DOM element waar we naartoe willen scrollen
    const element = document.getElementById(id);
    if (element) {
      // Offset van 100px voor de fixed navbar bovenaan
      const offset = 100;

      // Bereken positie van element relatief aan viewport top
      const elementPosition = element.getBoundingClientRect().top;

      // Bereken absolute scroll positie (huidige scroll + element positie - offset)
      const offsetPosition = elementPosition + window.scrollY - offset;

      // Scroll smooth naar de berekende positie
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Smooth scroll animatie (niet instant)
      });
    }
  };

  /**
   * STAP 5: Render de inhoudsopgave
   */
  return (
    <nav className="toc sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Glassmorphism container met blur en semi-transparante achtergrond */}
      <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl">
        {/* Header sectie met icoon en titel */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/20">
          <span className="text-xl">📑</span>
          <h3 className="text-base font-bold text-white uppercase tracking-wide">
            Inhoudsopgave
          </h3>
        </div>

        {/* Lijst van alle headings */}
        <ul className="space-y-2.5">
          {headings.map(({ level, text, id }) => (
            <li
              key={id}
              // Inline style voor indentatie gebaseerd op heading level
              // H2 (level 2) = 0rem, H3 (level 3) = 0.75rem, H4 = 1.5rem, etc.
              style={{ marginLeft: `${(level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`
                  group flex items-center gap-2 text-sm transition-all duration-200
                  hover:translate-x-1 cursor-pointer
                  ${
                    // Als dit de actieve heading is: cyan kleur + bold
                    activeId === id
                      ? "text-cyan-300 font-semibold"
                      : // Anders: semi-transparant wit, hover = volledig wit
                        "text-white/70 hover:text-white"
                  }
                `}
              >
                {/* Kleine ronde bullet die groter wordt bij actieve heading */}
                <span
                  className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${
                    activeId === id
                      ? "bg-cyan-300 scale-125" // Actief: cyan + 25% groter
                      : "bg-white/30 group-hover:bg-white/60" // Inactief: semi-transparant
                  }
                `}
                />

                {/* Heading text */}
                <span className="flex-1">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
