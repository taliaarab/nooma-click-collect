import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useState } from 'react';
import { BoxBuilder } from './BoxBuilder';
import { ShopifyCheckoutButton } from './ShopifyCheckoutButton';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'babka' | 'patisserie' | 'boisson';
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Babka Chocolat',
    description: 'Notre babka signature au chocolat noir',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1588079910782-1177c63bbab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'babka'
  },
  {
    id: 2,
    name: 'Babka Pistache',
    description: 'Babka onctueuse à la pistache',
    price: 13.50,
    image: 'https://images.unsplash.com/photo-1614610671146-8572a7c0225b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'babka'
  },
  {
    id: 3,
    name: 'Babka Cannelle',
    description: 'Babka traditionnelle à la cannelle',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1588079904727-bf146896eff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'babka'
  },
  {
    id: 4,
    name: 'Croissant',
    description: 'Croissant pur beurre artisanal',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'patisserie'
  },
  {
    id: 5,
    name: 'Pain au Chocolat',
    description: 'Pain au chocolat aux pépites généreuses',
    price: 3.80,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'patisserie'
  },
  {
    id: 6,
    name: 'Cookie Chocolat',
    description: 'Cookie maison aux pépites de chocolat',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'patisserie'
  },
  {
    id: 7,
    name: 'Café Latte',
    description: 'Latte onctueux fait maison',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'boisson'
  },
  {
    id: 8,
    name: 'Cappuccino',
    description: 'Cappuccino traditionnel',
    price: 4.80,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'boisson'
  }
];

export function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'babka' | 'patisserie' | 'boisson'>('all');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const addCustomBoxToCart = (box: { name: string; price: number; description: string; image: string }) => {
    const customProduct: Product = {
      id: Date.now(), // ID unique basé sur le timestamp
      name: box.name,
      description: box.description,
      price: box.price,
      image: box.image,
      category: 'babka'
    };
    setCart(prevCart => [...prevCart, { ...customProduct, quantity: 1 }]);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="shop" className="py-10 px-4 bg-background">
      <div className="w-full max-w-full" style={{ maxWidth: '80vw', margin: '0 auto' }}>
        <div className="mb-20">
          <div className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-6">Commander en ligne</div>
          <h2 className="text-5xl md:text-7xl mb-8 text-foreground leading-tight" style={{ fontFamily: "'Chelsea Market', cursive" }}>
            Click &
            <br />
            <span className="text-secondary">Collect</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Commandez en ligne et récupérez vos produits en boutique.
            Simple, rapide, délicieux.
          </p>
        </div>

        {/* Box Builder */}
        <BoxBuilder onAddToCart={addCustomBoxToCart} />

        <div className="mb-16">
          <div className="h-px w-full bg-foreground/10 mb-12" />
          <h3 className="text-4xl md:text-5xl mb-6 text-foreground" style={{ fontFamily: "'Chelsea Market', cursive" }}>
            Ou choisis à l'unité
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Sélectionne tes produits préférés parmi notre sélection
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 border transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground'
            }`}
          >
            Tout
          </button>
          <button
            onClick={() => setSelectedCategory('babka')}
            className={`px-6 py-3 border transition-all ${
              selectedCategory === 'babka'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground'
            }`}
          >
            Babkas
          </button>
          <button
            onClick={() => setSelectedCategory('patisserie')}
            className={`px-6 py-3 border transition-all ${
              selectedCategory === 'patisserie'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground'
            }`}
          >
            Pâtisseries
          </button>
          <button
            onClick={() => setSelectedCategory('boisson')}
            className={`px-6 py-3 border transition-all ${
              selectedCategory === 'boisson'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground'
            }`}
          >
            Boissons
          </button>
        </div>

        {/* Grille de produits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white overflow-hidden hover:shadow-xl transition-all duration-500 group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-lg mb-2 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                  {product.name}
                </h3>
                <p className="text-sm text-primary/70 mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                  <span className="text-xl text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                    CHF {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton panier flottant */}
        {cart.length > 0 && (
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-5 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 z-40 border-4 border-background"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground w-8 h-8 flex items-center justify-center text-sm font-medium shadow-lg">
                {getTotalItems()}
              </span>
            )}
          </button>
        )}

        {/* Panneau panier */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end">
            <div className="bg-white w-full max-w-md h-full md:h-auto md:max-h-[90vh] md:m-4 overflow-hidden flex flex-col shadow-2xl">
              <div className="bg-background border-b border-foreground/10 p-6 flex items-center justify-between">
                <h3 className="text-2xl text-foreground" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                  Mon Panier
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-foreground hover:text-secondary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <p className="text-center text-primary/60 py-12">Votre panier est vide</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 bg-background p-4 border border-foreground/10">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-foreground mb-1 font-medium">{item.name}</h4>
                          <p className="text-sm text-foreground/70 mb-3">CHF {item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-secondary text-secondary-foreground w-8 h-8 flex items-center justify-center hover:bg-secondary/80 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-foreground font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-secondary text-secondary-foreground w-8 h-8 flex items-center justify-center hover:bg-secondary/80 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-foreground/10 p-6 bg-background">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-sm uppercase tracking-wider text-foreground/60">Total</span>
                    <span className="text-3xl text-foreground" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                      CHF {getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <ShopifyCheckoutButton
                    cartItems={cart}
                    totalPrice={getTotalPrice()}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
