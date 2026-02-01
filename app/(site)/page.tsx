import type { Metadata } from "next";
import Hero from "./components/hero";

/**
 * Metadata for home page
 */
export const metadata: Metadata = {
  title: "Stage Portfolio | Home",
  description:
    "Welkom op mijn stage portfolio. Ontdek mijn ervaringen, projecten en groei tijdens mijn stage.",
  openGraph: {
    title: "Stage Portfolio",
    description:
      "Welkom op mijn stage portfolio. Ontdek mijn ervaringen, projecten en groei tijdens mijn stage.",
    type: "website",
  },
};

/**
 * Home Page
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden flex flex-col">
      <Hero />
    </div>
  );
}
