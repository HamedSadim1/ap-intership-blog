/**
 * InfoSection Component
 *
 * Wrapper component voor Section met titel en icoon support.
 * Consistent patroon voor content secties met optionele icoon.
 *
 * @example
 * <InfoSection title="About" icon={<Icon />}>
 *   <p>Content here...</p>
 * </InfoSection>
 */

import type { ReactNode } from "react";
import { Section } from "../ui";

interface InfoSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
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
