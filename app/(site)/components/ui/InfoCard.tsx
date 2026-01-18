import Link from "next/link";
import { ReactNode } from "react";
import { ExternalLinkIcon } from "../svgs";

/**
 * Props voor InfoCard component
 * @property title - Titel van de kaart
 * @property icon - Optioneel icoon naast de titel
 * @property children - Inhoud/body van de kaart
 * @property link - Optionele externe link met href en label
 * @property className - Extra Tailwind classes (optioneel)
 */
interface InfoCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
}

/**
 * InfoCard - Informatie kaart met titel, icoon en optionele link
 * Ideaal voor het presenteren van secties met gerelateerde informatie
 *
 * @example
 * <InfoCard
 *   title="Over ons"
 *   icon={<BuildingIcon className="w-6 h-6" />}
 *   link={{ href: "https://example.com", label: "Bezoek website" }}
 * >
 *   <p>Beschrijving tekst hier...</p>
 * </InfoCard>
 */
const InfoCard = ({
  title,
  icon,
  children,
  link,
  className = "",
}: InfoCardProps) => {
  return (
    <div
      className={`backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 ${className}`}
    >
      <h2 className="text-white font-semibold text-xl mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="text-white/80 leading-relaxed mb-4">{children}</div>
      {link && (
        <Link
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-medium transition-colors group"
        >
          <span>{link.label}</span>
          <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default InfoCard;
