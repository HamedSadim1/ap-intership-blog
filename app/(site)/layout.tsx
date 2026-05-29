import Navbar from "./components/navbar";

/**
 * Site Layout — Wrapper voor alle site pagina's
 *
 * Voegt de navigatiebalk (Navbar) toe aan elke pagina binnen de (site) route group.
 * De Navbar is consistent over alle pagina's en past zich aan op basis van scrollpositie.
 *
 * @param children - De pagina content die tussen de Navbar wordt geplaatst
 * @returns Navbar + pagina content
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
