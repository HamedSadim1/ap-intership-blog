/**
 * NotFoundActions - Action buttons for the 404 page.
 *
 * Renders two buttons: "Terug naar home" (primary) and "Bekijk blog posts" (secondary).
 *
 * @example
 * <NotFoundActions />
 */

import { HomeIcon } from "@/app/(site)/components/svgs";
import { Button } from "@/app/(site)/components/ui";

export function NotFoundActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <Button
        href="/"
        variant="primary"
        icon={<HomeIcon className="w-5 h-5" />}
      >
        Terug naar home
      </Button>

      <Button href="/blog" variant="secondary">
        Bekijk blog posts
      </Button>
    </div>
  );
}
