/**
 * HelpCard - Help information card for the 404 page.
 *
 * Displays a contact prompt with email link for users who think
 * the 404 error is a mistake.
 *
 * @example
 * <HelpCard />
 */

import { SITE_EMAIL } from "@/lib/constants";

export function HelpCard() {
  return (
    <div className="mt-8 pt-8 border-t border-white/20">
      <div className="bg-white/10 rounded-xl p-6">
        <p className="text-base text-white/90 leading-relaxed">
          💡 <strong className="text-white">Hulp nodig?</strong>
          <br />
          Als je denkt dat dit een fout is,{" "}
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-300/30 hover:decoration-cyan-200 transition-colors cursor-pointer"
          >
            neem contact op
          </a>{" "}
          of probeer later opnieuw.
        </p>
      </div>
    </div>
  );
}
