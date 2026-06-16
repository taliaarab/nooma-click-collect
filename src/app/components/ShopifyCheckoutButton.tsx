import { useState } from 'react';
import { useShopify } from '../../hooks/useShopify';

interface ShopifyCheckoutButtonProps {
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    shopifyVariantId?: string; // ID du variant Shopify
  }>;
  totalPrice: number;
  onCheckoutStart?: () => void;
}

export function ShopifyCheckoutButton({ cartItems, totalPrice, onCheckoutStart }: ShopifyCheckoutButtonProps) {
  const { checkout, isLoading, error } = useShopify();
  const [showInstructions, setShowInstructions] = useState(false);

  const handleCheckout = async () => {
    if (onCheckoutStart) {
      onCheckoutStart();
    }

    // Vérifier si les produits ont des IDs Shopify
    const hasShopifyIds = cartItems.every(item => item.shopifyVariantId);

    if (!hasShopifyIds) {
      setShowInstructions(true);
      return;
    }

    // Convertir les items du panier au format Shopify
    const shopifyItems = cartItems.map(item => ({
      variantId: item.shopifyVariantId!,
      quantity: item.quantity,
    }));

    // Lancer le checkout Shopify
    await checkout(shopifyItems);
  };

  if (showInstructions) {
    return (
      <div className="space-y-4">
        <div className="bg-secondary/10 border border-secondary/30 p-4 rounded text-sm">
          <p className="font-medium mb-2">⚠️ Configuration Shopify requise</p>
          <p className="text-foreground/70 mb-2">
            Pour activer le checkout Shopify, vous devez :
          </p>
          <ol className="list-decimal list-inside space-y-1 text-foreground/70 text-xs">
            <li>Créer les produits dans votre boutique Shopify</li>
            <li>Ajouter les IDs de variants Shopify dans le code</li>
            <li>Configurer vos identifiants dans le fichier .env</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 text-primary underline text-xs"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 p-3 rounded text-sm text-destructive">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isLoading || cartItems.length === 0}
        className="w-full bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Redirection...' : 'Commander sur Shopify'}
      </button>

      <p className="text-xs text-center text-foreground/60 leading-relaxed">
        Vous serez redirigé vers Shopify pour finaliser votre commande
        <br />
        Récupération en boutique - Rue des Eaux-Vives, 1207 Genève
      </p>
    </div>
  );
}
