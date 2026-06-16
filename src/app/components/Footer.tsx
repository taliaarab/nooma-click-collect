import { Instagram } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 px-4 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <h3 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              NOOMA
            </h3>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
              Babkery, coffee & more
              <br />
              Eaux-Vives, Genève
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-lg hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/click-collect" className="text-lg hover:text-secondary transition-colors">
                  Click & Collect
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-lg hover:text-secondary transition-colors">
                  Nos produits
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-lg hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-6">Suivez-nous</h4>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 text-lg hover:text-secondary transition-colors group"
              >
                <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center group-hover:border-secondary transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; 2026 NOOMA. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
