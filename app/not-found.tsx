import { HomeIcon } from "./(site)/components/svgs";
import Button from "./(site)/components/ui/Button";
import GlassCard from "./(site)/components/ui/GlassCard";
import Section from "./(site)/components/ui/Section";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center">
      <Section className="py-24">
        <div className="max-w-2xl mx-auto text-center">
          <GlassCard className="p-12 md:p-16">
            {/* Emoji Illustratie */}
            <div className="mb-6 text-8xl animate-bounce">🔍</div>

            {/* 404 Nummer met gradient */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                404
              </h1>
            </div>

            {/* Hoofdtekst */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pagina niet gevonden
            </h2>

            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
              Oeps! De pagina die je zoekt bestaat niet of is verplaatst.
            </p>

            {/* Actieknoppen */}
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

            {/* Extra informatie - VERBETERDE ZICHTBAARHEID */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <p className="text-base text-white/90 leading-relaxed">
                  💡 <strong className="text-white">Hulp nodig?</strong>
                  <br />
                  Als je denkt dat dit een fout is,{" "}
                  <a
                    href="mailto:hamid.sadim@outlook.com"
                    className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-300/30 hover:decoration-cyan-200 transition-colors cursor-pointer"
                  >
                    neem contact op
                  </a>{" "}
                  of probeer later opnieuw.
                </p>
              </div>
            </div>

            {/* Snelle links */}
            <div className="mt-10">
              <p className="text-sm text-gray-300 mb-4">Populaire pagina&apos;s:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors cursor-pointer"
                >
                  🏠 Home
                </Link>
                <Link
                  href="/blog"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors cursor-pointer"
                >
                  📝 Blog
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors cursor-pointer"
                >
                  👤 Over Mij
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
