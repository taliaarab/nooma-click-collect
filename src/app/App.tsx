import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Plus, Minus, ShoppingCart, X, Check } from 'lucide-react';

const flavors = [
  { id: 'chocolat', name: 'Chocolat', color: '#571a18', image: 'https://images.unsplash.com/photo-1588079910782-1177c63bbab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { id: 'pistache', name: 'Pistache', color: '#5e5627', image: 'https://images.unsplash.com/photo-1614610671146-8572a7c0225b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { id: 'cannelle', name: 'Cannelle', color: '#822a45', image: 'https://images.unsplash.com/photo-1588079904727-bf146896eff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { id: 'nutella', name: 'Nutella', color: '#3d1f0a', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { id: 'framboises', name: 'Framboises', color: '#c94070', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { id: 'citron', name: 'Citron', color: '#c8960a', image: 'https://images.unsplash.com/photo-1571167530149-c9b1b0a0dc43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
];

const boxSizes = [
  { size: 4, price: 16, label: 'Petite boîte' },
  { size: 6, price: 22, label: 'Boîte moyenne' },
  { size: 9, price: 30, label: 'Grande boîte' },
  { size: 12, price: 38, label: 'Boîte XL' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export default function App() {
  const [selectedSize, setSelectedSize] = useState(boxSizes[1]);
  const [selectedFlavors, setSelectedFlavors] = useState<{ [key: string]: number }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const totalSelected = Object.values(selectedFlavors).reduce((s, c) => s + c, 0);
  const remaining = selectedSize.size - totalSelected;
  const isComplete = totalSelected === selectedSize.size;

  const increment = (id: string) => {
    if (totalSelected < selectedSize.size) {
      setSelectedFlavors(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  const decrement = (id: string) => {
    if ((selectedFlavors[id] || 0) > 0) {
      setSelectedFlavors(prev => {
        const next = { ...prev, [id]: prev[id] - 1 };
        if (next[id] === 0) delete next[id];
        return next;
      });
    }
  };

  const addToCart = () => {
    const desc = Object.entries(selectedFlavors)
      .map(([id, count]) => `${count}x ${flavors.find(f => f.id === id)?.name}`)
      .join(', ');
    setCart(prev => [...prev, {
      id: Date.now().toString(),
      name: `Boîte de ${selectedSize.size} mini babkas`,
      price: selectedSize.price,
      description: desc,
      quantity: 1,
    }]);
    setSelectedFlavors({});
    setCartOpen(true);
  };

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div style={{ fontFamily: "'Urbanist', sans-serif", background: '#f5f0e8', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ background: '#80a4b3', padding: '40px 20px' }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
          Commander en ligne
        </div>
        <h1 style={{ fontFamily: "'Chelsea Market', cursive", fontSize: 'clamp(2.5rem, 10vw, 5rem)', color: 'white', lineHeight: 1.1, margin: '0 0 12px 0' }}>
          Click &<br /><span style={{ color: '#ead6b3' }}>Collect</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', margin: 0, lineHeight: 1.6 }}>
          Commandez en ligne et récupérez vos produits en boutique.
        </p>
      </div>

      {/* Builder */}
      <div style={{ padding: '24px 16px' }}>
        <div style={{ background: 'white', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>

          <h2 style={{ fontFamily: "'Chelsea Market', cursive", fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', color: '#571a18', margin: '0 0 6px 0' }}>
            Compose ta boîte
          </h2>
          <p style={{ color: 'rgba(87,26,24,0.6)', marginBottom: '32px', fontSize: '0.9rem' }}>
            Choisis tes saveurs préférées de mini babkas
          </p>

          {/* Tailles */}
          <h3 style={{ fontFamily: "'Chelsea Market', cursive", fontSize: '1.2rem', color: '#571a18', marginBottom: '12px' }}>
            1. Choisis ta taille
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
            {boxSizes.map(box => (
              <button key={box.size} onClick={() => { setSelectedSize(box); setSelectedFlavors({}); }}
                style={{ padding: '14px 10px', border: `2px solid ${selectedSize.size === box.size ? '#571a18' : 'rgba(87,26,24,0.2)'}`, background: selectedSize.size === box.size ? '#571a18' : 'white', color: selectedSize.size === box.size ? 'white' : '#571a18', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ fontFamily: "'Chelsea Market', cursive", fontSize: '1.6rem' }}>{box.size}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{box.label}</div>
                <div style={{ fontWeight: 600, marginTop: '4px' }}>CHF {box.price}</div>
              </button>
            ))}
          </div>

          {/* Progression */}
          <div style={{ background: '#f5f0e8', padding: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#571a18', fontSize: '0.9rem' }}>{totalSelected} / {selectedSize.size} sélectionnées</span>
              {isComplete && <span style={{ color: '#5e5627', fontWeight: 500, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Check size={14} /> Complète !</span>}
            </div>
            <div style={{ background: 'rgba(87,26,24,0.1)', height: '6px' }}>
              <div style={{ background: '#ead6b3', height: '6px', width: `${(totalSelected / selectedSize.size) * 100}%`, transition: 'width 0.3s' }} />
            </div>
            {!isComplete && <p style={{ fontSize: '0.8rem', color: 'rgba(87,26,24,0.5)', margin: '8px 0 0 0' }}>Plus que {remaining} babka{remaining > 1 ? 's' : ''} à choisir</p>}
          </div>

          {/* Saveurs */}
          <h3 style={{ fontFamily: "'Chelsea Market', cursive", fontSize: '1.2rem', color: '#571a18', marginBottom: '12px' }}>
            2. Choisis tes saveurs
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {flavors.map(flavor => {
              const count = selectedFlavors[flavor.id] || 0;
              return (
                <div key={flavor.id} style={{ border: `2px solid ${count > 0 ? '#571a18' : 'rgba(87,26,24,0.15)'}`, overflow: 'hidden', transition: 'all 0.2s', position: 'relative' }}>
                  <div style={{ position: 'relative' }}>
                    <ImageWithFallback src={flavor.image} alt={flavor.name} style={{ width: '100%', height: '90px', objectFit: 'cover', display: 'block' }} />
                    {count > 0 && (
                      <div style={{ position: 'absolute', top: '6px', right: '6px', background: '#571a18', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {count}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px', background: 'white' }}>
                    <div style={{ fontFamily: "'Chelsea Market', cursive", color: '#571a18', fontSize: '0.9rem', marginBottom: '6px' }}>{flavor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => decrement(flavor.id)} disabled={count === 0}
                        style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: '#ead6b3', color: '#571a18', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: count === 0 ? 0.3 : 1 }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ flex: 1, textAlign: 'center', color: '#571a18', fontWeight: 600 }}>{count}</span>
                      <button onClick={() => increment(flavor.id)} disabled={totalSelected >= selectedSize.size}
                        style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: '#571a18', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: totalSelected >= selectedSize.size ? 0.3 : 1 }}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Récap */}
          {totalSelected > 0 && (
            <div style={{ background: '#f5f0e8', padding: '16px', border: '1px solid rgba(87,26,24,0.1)' }}>
              <h4 style={{ fontFamily: "'Chelsea Market', cursive", color: '#571a18', marginBottom: '10px', fontSize: '1.1rem' }}>Ta composition</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {Object.entries(selectedFlavors).map(([id, count]) => {
                  const f = flavors.find(f => f.id === id);
                  return f && count > 0 ? (
                    <span key={id} style={{ padding: '3px 10px', background: f.color, color: 'white', fontSize: '0.8rem' }}>
                      {count}x {f.name}
                    </span>
                  ) : null;
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(87,26,24,0.1)', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(87,26,24,0.5)' }}>Total</div>
                  <div style={{ fontFamily: "'Chelsea Market', cursive", fontSize: '1.8rem', color: '#571a18' }}>CHF {selectedSize.price}</div>
                </div>
                <button onClick={addToCart} disabled={!isComplete}
                  style={{ background: '#571a18', color: 'white', border: 'none', padding: '12px 20px', fontSize: '0.95rem', cursor: isComplete ? 'pointer' : 'not-allowed', opacity: isComplete ? 1 : 0.3, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Urbanist', sans-serif" }}>
                  <Plus size={16} /> Ajouter au panier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bouton panier flottant */}
      {cart.length > 0 && (
        <button onClick={() => setCartOpen(true)}
          style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#571a18', color: 'white', border: 'none', width: '56px', height: '56px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 100, position: 'fixed' as any }}>
          <ShoppingCart size={22} />
          <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ead6b3', color: '#571a18', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
            {totalItems}
          </span>
        </button>
      )}

      {/* Panier */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(87,26,24,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f0e8' }}>
              <h3 style={{ fontFamily: "'Chelsea Market', cursive", color: '#571a18', margin: 0, fontSize: '1.4rem' }}>Mon Panier</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#571a18' }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: '#f5f0e8', padding: '12px', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 600, color: '#571a18', marginBottom: '4px', fontSize: '0.9rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(87,26,24,0.6)', marginBottom: '6px' }}>{item.description}</div>
                  <div style={{ color: '#571a18', fontWeight: 600 }}>CHF {item.price}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid rgba(87,26,24,0.1)', background: '#f5f0e8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(87,26,24,0.5)' }}>Total</span>
                <span style={{ fontFamily: "'Chelsea Market', cursive", fontSize: '1.8rem', color: '#571a18' }}>CHF {totalPrice}</span>
              </div>
              <button style={{ width: '100%', background: '#571a18', color: 'white', border: 'none', padding: '14px', fontSize: '1rem', cursor: 'pointer', fontFamily: "'Urbanist', sans-serif" }}>
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
