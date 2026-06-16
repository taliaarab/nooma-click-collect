import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Minus, Check } from 'lucide-react';
import { useState } from 'react';

interface MiniBabka {
  id: string;
  name: string;
  color: string;
  image: string;
}

const miniBabkaFlavors: MiniBabka[] = [
  {
    id: 'chocolat',
    name: 'Chocolat',
    color: '#571a18',
    image: 'https://images.unsplash.com/photo-1588079910782-1177c63bbab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
  },
  {
    id: 'pistache',
    name: 'Pistache',
    color: '#5e5627',
    image: 'https://images.unsplash.com/photo-1614610671146-8572a7c0225b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
  },
  {
    id: 'cannelle',
    name: 'Cannelle',
    color: '#822a45',
    image: 'https://images.unsplash.com/photo-1588079904727-bf146896eff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
  },
  {
    id: 'nutella',
    name: 'Nutella',
    color: '#571a18',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
  },
  {
    id: 'framboises',
    name: 'Framboises',
    color: '#efb5c2',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
  },
  {
    id: 'citron',
    name: 'Citron',
    color: '#fdc95a',
    image: 'https://images.unsplash.com/photo-1571167530149-c9b1b0a0dc43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
  }
];

const boxSizes = [
  { size: 4, price: 16.00, label: 'Petite boîte' },
  { size: 6, price: 22.00, label: 'Boîte moyenne' },
  { size: 9, price: 30.00, label: 'Grande boîte' },
  { size: 12, price: 38.00, label: 'Boîte XL' }
];

interface BoxBuilderProps {
  onAddToCart: (box: { name: string; price: number; description: string; image: string }) => void;
}

export function BoxBuilder({ onAddToCart }: BoxBuilderProps) {
  const [selectedSize, setSelectedSize] = useState(boxSizes[1]);
  const [selectedFlavors, setSelectedFlavors] = useState<{ [key: string]: number }>({});

  const getTotalSelected = () => {
    return Object.values(selectedFlavors).reduce((sum, count) => sum + count, 0);
  };

  const incrementFlavor = (flavorId: string) => {
    const total = getTotalSelected();
    if (total < selectedSize.size) {
      setSelectedFlavors(prev => ({
        ...prev,
        [flavorId]: (prev[flavorId] || 0) + 1
      }));
    }
  };

  const decrementFlavor = (flavorId: string) => {
    if (selectedFlavors[flavorId] && selectedFlavors[flavorId] > 0) {
      setSelectedFlavors(prev => {
        const newFlavors = { ...prev };
        newFlavors[flavorId] -= 1;
        if (newFlavors[flavorId] === 0) {
          delete newFlavors[flavorId];
        }
        return newFlavors;
      });
    }
  };

  const handleAddToCart = () => {
    const flavorList = Object.entries(selectedFlavors)
      .map(([id, count]) => {
        const flavor = miniBabkaFlavors.find(f => f.id === id);
        return `${count}x ${flavor?.name}`;
      })
      .join(', ');

    onAddToCart({
      name: `Boîte de ${selectedSize.size} mini babkas`,
      price: selectedSize.price,
      description: flavorList,
      image: 'https://images.unsplash.com/photo-1588079910782-1177c63bbab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    });

    setSelectedFlavors({});
  };

  const isComplete = getTotalSelected() === selectedSize.size;
  const remaining = selectedSize.size - getTotalSelected();

  return (
    <div className="bg-white p-8 md:p-12 mb-16 shadow-sm">
      <div className="mb-12">
        <h3 className="text-4xl md:text-5xl mb-4 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
          Compose ta boîte
        </h3>
        <p className="text-lg text-primary/70">Choisis tes saveurs préférées de mini babkas</p>
      </div>

      {/* Sélection de la taille */}
      <div className="mb-12">
        <h4 className="text-2xl mb-6 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
          1. Choisis ta taille
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {boxSizes.map(box => (
            <button
              key={box.size}
              onClick={() => {
                setSelectedSize(box);
                setSelectedFlavors({});
              }}
              className={`p-6 border transition-all ${
                selectedSize.size === box.size
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-primary/20 hover:border-primary'
              }`}
            >
              <div className="text-3xl mb-2" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                {box.size}
              </div>
              <div className="text-sm mb-2 opacity-80">{box.label}</div>
              <div className="text-lg font-medium">CHF {box.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Compteur de progression */}
      <div className="mb-8 bg-background p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg text-foreground">
            {getTotalSelected()} / {selectedSize.size} sélectionnées
          </span>
          {isComplete && (
            <span className="flex items-center gap-2 text-secondary font-medium">
              <Check className="w-5 h-5" />
              Boîte complète
            </span>
          )}
        </div>
        <div className="w-full bg-foreground/10 h-2 overflow-hidden">
          <div
            className="bg-secondary h-full transition-all duration-300"
            style={{ width: `${(getTotalSelected() / selectedSize.size) * 100}%` }}
          />
        </div>
        {!isComplete && (
          <p className="text-sm text-foreground/60 mt-3">
            Plus que {remaining} mini babka{remaining > 1 ? 's' : ''} à choisir
          </p>
        )}
      </div>

      {/* Sélection des saveurs */}
      <div className="mb-12">
        <h4 className="text-2xl mb-6 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
          2. Choisis tes saveurs
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniBabkaFlavors.map(flavor => {
            const count = selectedFlavors[flavor.id] || 0;
            return (
              <div
                key={flavor.id}
                className={`border overflow-hidden transition-all ${
                  count > 0 ? 'border-primary shadow-lg' : 'border-primary/20'
                }`}
              >
                <div className="relative h-32">
                  <ImageWithFallback
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover"
                  />
                  {count > 0 && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      {count}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h5 className="text-lg mb-3 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                    {flavor.name}
                  </h5>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementFlavor(flavor.id)}
                      disabled={count === 0}
                      className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center text-lg text-primary">{count}</span>
                    <button
                      onClick={() => incrementFlavor(flavor.id)}
                      disabled={getTotalSelected() >= selectedSize.size}
                      className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visualisation de la boîte */}
      {getTotalSelected() > 0 && (
        <div className="bg-background p-8 border border-foreground/10">
          <h4 className="text-2xl mb-6 text-foreground" style={{ fontFamily: "'Chelsea Market', cursive" }}>
            Ta composition
          </h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(selectedFlavors).map(([id, count]) => {
              const flavor = miniBabkaFlavors.find(f => f.id === id);
              if (!flavor || count === 0) return null;
              return (
                <div
                  key={id}
                  className="px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: flavor.color, color: '#ffffff' }}
                >
                  {count}x {flavor.name}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-foreground/10">
            <div>
              <div className="text-sm uppercase tracking-wider text-foreground/60 mb-1">Prix total</div>
              <div className="text-3xl text-foreground" style={{ fontFamily: "'Chelsea Market', cursive" }}>
                CHF {selectedSize.price.toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!isComplete}
              className="group bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-lg font-medium relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter au panier
              </span>
              <div className="absolute inset-0 bg-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
