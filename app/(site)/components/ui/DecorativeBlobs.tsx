/**
 * Props voor een individuele blob
 * @property className - Tailwind classes voor positie, grootte en kleur
 */
interface BlobProps {
  className?: string;
}

/**
 * Props voor DecorativeBlobs component
 * @property blobs - Array van blob configuraties (optioneel, gebruikt defaults)
 */
interface DecorativeBlobsProps {
  blobs?: BlobProps[];
}

/** Standaard blob configuraties voor de achtergrond */
const defaultBlobs: BlobProps[] = [
  { className: "top-10 -left-20 w-80 h-80 bg-blue-400/20" },
  { className: "top-1/3 -right-32 w-96 h-96 bg-purple-400/15" },
  { className: "bottom-10 left-1/4 w-72 h-72 bg-pink-400/15" },
  { className: "-bottom-20 right-1/3 w-64 h-64 bg-cyan-400/10" },
  { className: "top-2/3 left-0 w-48 h-48 bg-yellow-300/10" },
];

/**
 * DecorativeBlobs - Decoratieve achtergrond elementen.
 *
 * Gebruikt SOLID kleuren zonder blur om scroll-flicker te voorkomen.
 *
 * @example
 * // Met standaard blobs
 * <DecorativeBlobs />
 *
 * @example
 * // Met custom blobs
 * <DecorativeBlobs blobs={[{ className: "top-10 left-20 w-40 h-40 bg-blue-500/20" }]} />
 */
const DecorativeBlobs = ({ blobs = defaultBlobs }: DecorativeBlobsProps) => {
  return (
    <>
      {/* Grid overlay voor extra diepte */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${blob.className}`}
        />
      ))}
    </>
  );
};

export default DecorativeBlobs;
