import { HomeIcon } from "./(site)/components/svgs";
import Button from "./(site)/components/ui/Button";
import GlassCard from "./(site)/components/ui/GlassCard";
import Section from "./(site)/components/ui/Section";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center">
      <Section className="py-24">
        <div className="max-w-2xl mx-auto text-center">
          <GlassCard className="p-12">
            {/* 404 Nummer */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-white">404</h1>
            </div>

            {/* Hoofdtekst */}
            <h2 className="text-3xl font-bold text-white mb-4">
              Pagina niet gevonden
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              Oeps! De pagina die je zoekt bestaat niet of is verplaatst.
            </p>

            {/* Actieknoppen */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

            {/* Extra informatie */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Als je denkt dat dit een fout is, neem dan contact op of probeer
                later opnieuw.
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
