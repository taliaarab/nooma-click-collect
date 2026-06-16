import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1746959482020-e4f61eefba28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    alt: 'Pâtisseries en vitrine',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1776397280298-e9d686b2696d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    alt: 'Intérieur de la boulangerie',
    span: ''
  },
  {
    src: 'https://images.unsplash.com/photo-1642315160505-b3dff3a3c8b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    alt: 'Espace café',
    span: ''
  },
  {
    src: 'https://images.unsplash.com/photo-1668884405041-aa8963908538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    alt: 'Coin salon',
    span: 'md:col-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1588079904727-bf146896eff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    alt: 'Babka maison',
    span: ''
  }
];

export function Gallery() {
  return (
    <section id="gallery" className="py-32 px-4 bg-white relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête */}
        <div className="mb-20 max-w-3xl">
          <div className="text-sm uppercase tracking-[0.3em] text-primary/60 mb-6">Notre univers</div>
          <h2
            className="text-5xl md:text-7xl text-primary mb-8 leading-tight"
            style={{ fontFamily: "'Chelsea Market', cursive" }}
          >
            L'ambiance
            <br />
            <span className="text-secondary">qui fait du bien</span>
          </h2>
          <p className="text-xl text-primary/70 leading-relaxed">
            Plongez dans l'atmosphère chaleureuse de NOOMA,
            où chaque détail est pensé pour votre confort.
          </p>
        </div>

        {/* Grille asymétrique d'images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group cursor-pointer ${image.span}`}
            >
              <div className="aspect-square md:aspect-auto md:h-full">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Citation */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="text-8xl md:text-9xl text-primary/10 leading-none" style={{ fontFamily: "'Chelsea Market', cursive" }}>
              "
            </div>
          </div>
          <p className="text-3xl md:text-5xl text-primary mb-6 leading-tight" style={{ fontFamily: "'Chelsea Market', cursive" }}>
            Tressé, pas stressé
          </p>
          <div className="h-px w-24 mx-auto bg-primary/30 mb-6" />
          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed">
            Notre devise : prenez le temps de savourer chaque instant,
            chaque bouchée, chaque rencontre.
          </p>
        </div>
      </div>
    </section>
  );
}
