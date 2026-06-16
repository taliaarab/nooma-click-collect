import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/src/imports/Capture_d_e_cran_2026-05-20_a__16.46.50.png"
          alt="Arcade NOOMA"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/70" />
      </div>

      <div className="relative z-10 text-center px-4 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 inline-block">
            <div className="text-sm uppercase tracking-[0.3em] text-background/90 mb-6 font-medium">
              Genève · Eaux-Vives
            </div>
            <div className="mb-6">
              <img
                src="/src/imports/Capture_d_e_cran_2026-05-20_a__17.04.43.png"
                alt="NOOMA"
                className="mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-4xl"
              />
            </div>
            <div className="h-px w-32 mx-auto bg-background/40 mb-6" />
            <p className="text-2xl md:text-4xl mb-8 tracking-wide" style={{ fontFamily: "'Chelsea Market', cursive", color: '#ffffff' }}>
              babkery, coffee & more
            </p>
          </div>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-background/90 leading-relaxed">
            Là où la babka rencontre<br className="hidden md:block" />
            la convivialité genevoise
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/click-collect"
              className="group bg-background text-primary px-10 py-4 hover:bg-background/90 transition-all duration-300 font-medium inline-block border-2 border-background relative overflow-hidden"
            >
              <span className="relative z-10">Commander en ligne</span>
              <div className="absolute inset-0 bg-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
            <Link
              to="/produits"
              className="group bg-transparent text-background border-2 border-background px-10 py-4 hover:bg-background hover:text-primary transition-all duration-300 font-medium inline-block"
            >
              Découvrir la carte
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-background/70" />
        </div>
      </div>
    </section>
  );
}
