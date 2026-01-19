/**
 * About Data - Alle content voor de About pagina
 * WPL Stage Portfolio - AP Hogeschool
 */

/** Header configuratie */
export const aboutHeaderData = {
  title: "Over Mij",
  subtitle: "Student Graduaat Programmeren aan AP Hogeschool",
};

/** Profielfoto configuratie */
export const profilePhotoData = {
  src: "/profile.png",
  alt: "Hamed Sadim",
  name: "Hamed Sadim",
  role: "Stagiair bij Adomate",
};

/** Persoonlijke info sectie */
export const personalInfoData = {
  title: "Wie ben ik?",
  paragraphs: [
    "Ik ben Hamed Sadim, een gepassioneerde student Graduaat Programmeren aan AP Hogeschool. Momenteel volg ik mijn WPL (Werkplekleren) stage waar ik mijn theoretische kennis omzet in praktische ervaring.",
    "Dit portfolio documenteert mijn reis door de stageperiode, met reflecties op mijn groei, uitdagingen en behaalde leerdoelen.",
  ],
};

/** Stagebedrijf informatie */
export const companyData = {
  title: "Stagebedrijf: Adomate",
  description:
    "Adomate is een geautomatiseerd, AI-ondersteund reclamebureau uit Gent dat continue, prestatiegerichte advertenties levert aan groeiende merken. Tijdens mijn stage werk ik aan innovatieve oplossingen binnen hun tech stack.",
  link: {
    href: "https://www.adomate.com/",
    label: "Bezoek Adomate.com",
  },
};

/** Leerdoelen */
export const learningGoalsData = {
  title: "Mijn Leerdoelen",
  goals: [
    {
      title: "Technische Vaardigheden",
      description:
        "Verdiepen in moderne web technologieën en frameworks die in de praktijk worden gebruikt.",
    },
    {
      title: "Professionele Groei",
      description:
        "Ontwikkelen van communicatie, samenwerking en probleemoplossend vermogen in een teamomgeving.",
    },
    {
      title: "Zelfreflectie",
      description:
        "Bewust reflecteren op mijn leerproces en persoonlijke ontwikkeling documenteren.",
    },
    {
      title: "Praktijkervaring",
      description:
        "Theorie omzetten naar praktijk en leren van real-world projecten en uitdagingen.",
    },
  ],
};

/** Links sectie */
export const linksData = {
  title: "Links",
  links: [
    {
      href: "https://hamedsadim-portfolio.vercel.app/",
      label: "Mijn Portfolio",
      external: true,
      variant: "primary" as const,
    },
    {
      href: "/blog",
      label: "Stage Verslagen",
      external: false,
      variant: "secondary" as const,
    },
  ],
};
