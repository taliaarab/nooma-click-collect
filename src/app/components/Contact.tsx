export function Contact() {
  return (
    <section id="contact" className="py-32 px-4 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-20 text-center">
          <div className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-6">Nous trouver</div>
          <h2
            className="text-5xl md:text-7xl mb-8 leading-tight"
            style={{ fontFamily: "'Chelsea Market', cursive" }}
          >
            Venez nous
            <br />
            <span className="text-secondary">dire bonjour</span>
          </h2>
        </div>

        {/* Grille de contact */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-20">
          {/* Informations */}
          <div className="space-y-12">
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">Adresse</h3>
              <p className="text-2xl md:text-3xl leading-relaxed">
                Rue des Eaux-Vives
                <br />
                1207 Genève
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">Téléphone</h3>
                <p className="text-xl">+41 22 XXX XX XX</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">Email</h3>
                <p className="text-xl">contact@nooma.ch</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70 mb-4">Horaires</h3>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span>Lun - Ven</span>
                  <span className="text-primary-foreground/80">7h - 19h</span>
                </div>
                <div className="h-px bg-primary-foreground/20" />
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-primary-foreground/80">8h - 19h</span>
                </div>
                <div className="h-px bg-primary-foreground/20" />
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-primary-foreground/80">8h - 14h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h3 className="text-2xl mb-8" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              Envoyez-nous un message
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/70">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-primary-foreground/30 focus:outline-none focus:border-secondary transition-colors text-primary-foreground placeholder:text-primary-foreground/40"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/70">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-primary-foreground/30 focus:outline-none focus:border-secondary transition-colors text-primary-foreground placeholder:text-primary-foreground/40"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/70">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-primary-foreground/30 focus:outline-none focus:border-secondary transition-colors resize-none text-primary-foreground placeholder:text-primary-foreground/40"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className="group bg-secondary text-primary px-8 py-4 hover:bg-secondary/90 transition-all duration-300 font-medium relative overflow-hidden"
              >
                <span className="relative z-10">Envoyer le message</span>
                <div className="absolute inset-0 bg-background/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </form>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="h-96 bg-primary-foreground/10 flex items-center justify-center">
          <p className="text-primary-foreground/50 text-lg">[ Carte interactive à venir ]</p>
        </div>
      </div>
    </section>
  );
}
