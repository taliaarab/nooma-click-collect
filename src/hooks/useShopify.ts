import { useState, useCallback } from 'react';
import { ShopifyService, CartItem } from '../services/shopify';

export function useShopify() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (items: CartItem[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const checkoutUrl = await ShopifyService.checkout(items);

      // Rediriger vers la page de checkout Shopify
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }

      return checkoutUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('Erreur checkout:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const products = await ShopifyService.fetchAllProducts();
      return products;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('Erreur récupération produits:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    checkout,
    fetchProducts,
    isLoading,
    error,
  };
}
