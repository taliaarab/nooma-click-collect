import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-medium" style={{ fontFamily: "'Chelsea Market', cursive" }}>NOOMA</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-secondary transition-colors">
              Accueil
            </Link>
            <Link to="/click-collect" className="text-foreground hover:text-secondary transition-colors">
              Click & Collect
            </Link>
            <Link to="/produits" className="text-foreground hover:text-secondary transition-colors">
              Nos produits
            </Link>
            <button onClick={() => handleNavClick('gallery')} className="text-foreground hover:text-secondary transition-colors">
              Galerie
            </button>
            <button onClick={() => handleNavClick('contact')} className="text-foreground hover:text-secondary transition-colors">
              Contact
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link to="/" onClick={() => setIsOpen(false)} className="block w-full text-left text-foreground hover:text-secondary transition-colors py-2">
              Accueil
            </Link>
            <Link to="/click-collect" onClick={() => setIsOpen(false)} className="block w-full text-left text-foreground hover:text-secondary transition-colors py-2">
              Click & Collect
            </Link>
            <Link to="/produits" onClick={() => setIsOpen(false)} className="block w-full text-left text-foreground hover:text-secondary transition-colors py-2">
              Nos produits
            </Link>
            <button onClick={() => { handleNavClick('gallery'); setIsOpen(false); }} className="block w-full text-left text-foreground hover:text-secondary transition-colors py-2">
              Galerie
            </button>
            <button onClick={() => { handleNavClick('contact'); setIsOpen(false); }} className="block w-full text-left text-foreground hover:text-secondary transition-colors py-2">
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
