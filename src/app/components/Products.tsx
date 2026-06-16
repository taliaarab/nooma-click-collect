import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    name: 'Babka Chocolat',
    description: 'Notre brioche signature tressée au chocolat noir',
    price: 'CHF 12.50',
    image: 'https://images.unsplash.com/photo-1614610671146-8572a7c0225b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Babkas'
  },
  {
    name: 'Babka Pistache',
    description: 'Brioche tressée à la pistache et fleur d\'oranger',
    price: 'CHF 13.50',
    image: 'https://images.unsplash.com/photo-1588079910782-1177c63bbab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Babkas'
  },
  {
    name: 'Babka Cannelle',
    description: 'Brioche traditionnelle à la cannelle',
    price: 'CHF 11.50',
    image: 'https://images.unsplash.com/photo-1588079904727-bf146896eff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Babkas'
  },
  {
    name: 'Babka Nutella',
    description: 'Brioche généreuse au Nutella',
    price: 'CHF 13.00',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Babkas'
  },
  {
    name: 'Croissant Pur Beurre',
    description: 'Croissant artisanal au beurre AOP',
    price: 'CHF 3.50',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Viennoiseries'
  },
  {
    name: 'Pain au Chocolat',
    description: 'Pain au chocolat aux pépites généreuses',
    price: 'CHF 3.80',
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Viennoiseries'
  },
  {
    name: 'Cookie Chocolat',
    description: 'Cookie maison aux pépites de chocolat',
    price: 'CHF 4.20',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Pâtisseries'
  },
  {
    name: 'Brownie',
    description: 'Brownie fondant au chocolat noir',
    price: 'CHF 4.50',
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Pâtisseries'
  },
  {
    name: 'Tarte Citron',
    description: 'Tarte au citron meringuée',
    price: 'CHF 5.50',
    image: 'https://images.unsplash.com/photo-1571167530149-c9b1b0a0dc43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Pâtisseries'
  },
  {
    name: 'Café Latte',
    description: 'Latte onctueux fait maison',
    price: 'CHF 5.00',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Boissons'
  },
  {
    name: 'Cappuccino',
    description: 'Cappuccino traditionnel italien',
    price: 'CHF 4.80',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Boissons'
  },
  {
    name: 'Thé Maison',
    description: 'Sélection de thés artisanaux',
    price: 'CHF 4.50',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    category: 'Boissons'
  }
];

const categories = ['Tous', 'Babkas', 'Viennoiseries', 'Pâtisseries', 'Boissons'];

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProducts = selectedCategory === 'Tous'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-32 px-4 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-6">Notre carte</div>
          <h2 className="text-5xl md:text-7xl mb-8 text-foreground leading-tight" style={{ fontFamily: "'Chelsea Market', cursive" }}>
            Nos
            <br />
            <span className="text-secondary">Créations</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-12 max-w-2xl leading-relaxed">
            Découvrez notre sélection de babkas et créations artisanales,
            préparées avec amour chaque jour
          </p>

          {/* Filtres de catégories */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 transition-all border ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={index} className="group cursor-pointer bg-white overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative overflow-hidden aspect-[4/3]">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 text-xs uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl mb-3 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                  {product.name}
                </h3>
                <p className="text-primary/70 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <p className="text-2xl text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                    {product.price}
                  </p>
                  <div className="w-8 h-8 border border-primary/20 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/10 transition-all">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
