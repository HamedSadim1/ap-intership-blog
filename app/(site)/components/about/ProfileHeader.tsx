/**
 * ProfileHeader Component
 *
 * Herbruikbare component voor het weergeven van profielinformatie met foto.
 * Gecentreerd ontwerp met profielfoto, naam en rol.
 *
 * @example
 * <ProfileHeader
 *   src="/photo.jpg"
 *   alt="Name"
 *   name="John Doe"
 *   role="Developer"
 * />
 */

import Image from "next/image";
import { GRADIENTS } from "@/lib/utils/styles";

interface ProfileHeaderProps {
  src: string;
  alt: string;
  name: string;
  role: string;
}

export function ProfileHeader({ src, alt, name, role }: ProfileHeaderProps) {
  return (
    <div className="mb-6">
      {/* Profielfoto met glow ring */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-5 group">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full ${GRADIENTS.profileGlow}`} />
        {/* Inner ring */}
        <div className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${GRADIENTS.profileRing}`} />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 128px, 160px"
          className="rounded-full object-cover border-2 border-white/30 shadow-2xl relative z-10"
          priority
        />
      </div>
      <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-purple-200 text-sm font-medium">
        {role}
      </span>
    </div>
  );
}
