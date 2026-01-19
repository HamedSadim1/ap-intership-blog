/**
 * ContentParagraphs Component
 *
 * Renders een array van paragrafen met automatische spacing.
 * Herbruikbaar patroon voor multi-paragraph content.
 *
 * @example
 * <ContentParagraphs paragraphs={["First para", "Second para"]} />
 */

interface ContentParagraphsProps {
  paragraphs: string[];
}

export function ContentParagraphs({ paragraphs }: ContentParagraphsProps) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`text-white/80 leading-relaxed ${
            index < paragraphs.length - 1 ? "mb-4" : ""
          }`}
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}
