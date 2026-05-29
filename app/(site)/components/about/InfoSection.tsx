/**
 * InfoSection — Sectie wrapper met titel en optioneel icoon
 *
 * Wrapper rond Section component die een consistente titel-header toevoegt.
 * Gebruikt op de About pagina voor persoonlijke info, stagebedrijf,
 * leerdoelen, contact en links secties.
 *
 * @param title - Sectie titel
 * @param icon - Optioneel icoon naast de titel (bv. BuildingIcon)
 * @param children - Inhoud van de sectie
 * @param variant - Doorgegeven aan Section component (default: "glass")
 *
 * @example
 * <InfoSection title="Over mij" icon={<BuildingIcon />}>
 *   <p>Content</p>
 * </InfoSection>
 */

import type { ReactNode } from "react";
import { Section } from "../ui";

interface InfoSectionProps {
  /** Sectie titel */
  title: string;
  /** Optioneel icoon naast de titel */
  icon?: ReactNode;
  /** Inhoud van de sectie */
  children: ReactNode;
  /** Doorgegeven aan Section component (default: "glass") */
  variant?: "glass" | "solid" | "ghost";
}

export function InfoSection({
  title,
  icon,
  children,
  variant = "glass",
}: InfoSectionProps) {
  return (
    <Section variant={variant}>
      <div className={`${icon ? "flex items-center gap-3" : ""} mb-4`}>
        {icon}
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </Section>
  );
}
