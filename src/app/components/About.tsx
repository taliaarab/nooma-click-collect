export function About() {
  return (
    <section id="about" className="py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* En-tête fragmenté */}
        <div className="mb-24 text-center">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight"
            style={{ fontFamily: "'Chelsea Market', cursive" }}
          >
            Tressé,
            <br />
            <span className="text-secondary">pas stressé.</span>
          </h2>
          <div className="h-px w-24 mx-auto bg-foreground/30 mb-8" />
        </div>

        {/* Grille de contenu */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-4">Le lieu</h3>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                NOOMA s'installe aux Eaux-Vives comme un nouveau lieu de vie gourmand,
                à la croisée de la boulangerie et du café de quartier.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-4">L'esprit</h3>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                Pensé comme une adresse conviviale et inspirante, où se mêlent saveurs,
                partage et quotidien.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 shadow-sm">
            <div className="mb-6">
              <span className="text-6xl md:text-7xl" style={{ fontFamily: "'Chelsea Market', cursive" }}>❤️</span>
            </div>
            <h3 className="text-3xl md:text-4xl text-primary mb-6" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              La babka
            </h3>
            <p className="text-lg text-primary/80 leading-relaxed mb-6">
              Au cœur de notre identité : cette brioche tressée d'origine polonaise,
              popularisée au Moyen-Orient.
            </p>
            <p className="text-base text-primary/70 leading-relaxed">
              Elle incarne à elle seule le savoir-faire, la générosité et l'authenticité
              portés par NOOMA.
            </p>
          </div>
        </div>

        {/* Valeurs */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center group">
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-foreground" />
              </div>
            </div>
            <h4 className="text-2xl md:text-3xl text-foreground mb-4" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              Chaleur
            </h4>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Un lieu où l'on se sent<br />comme à la maison
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-secondary" />
              </div>
            </div>
            <h4 className="text-2xl md:text-3xl text-foreground mb-4" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              Convivialité
            </h4>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Partage et moments<br />gourmands au quotidien
            </p>
          </div>

          <div className="text-center group">
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/10 flex items-center justify-center group-hover:bg-muted/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-muted" />
              </div>
            </div>
            <h4 className="text-2xl md:text-3xl text-foreground mb-4" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              Gourmandise
            </h4>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Savoir-faire artisanal<br />et authenticité
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
