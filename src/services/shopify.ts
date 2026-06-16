import Client from 'shopify-buy';
import { shopifyConfig } from '../config/shopify';

// Initialiser le client Shopify
export const shopifyClient = Client.buildClient({
  domain: shopifyConfig.domain,
  storefrontAccessToken: shopifyConfig.storefrontAccessToken,
});

// Types pour les produits et le panier
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  images: Array<{ src: string }>;
  variants: Array<{
    id: string;
    title: string;
    price: { amount: string };
  }>;
}

export interface CartItem {
  variantId: string;
  quantity: number;
}

// Service Shopify
export const ShopifyService = {
  // Créer un checkout
  async createCheckout() {
    try {
      const checkout = await shopifyClient.checkout.create();
      return checkout;
    } catch (error) {
      console.error('Erreur lors de la création du checkout:', error);
      throw error;
    }
  },

  // Ajouter des produits au checkout
  async addLineItems(checkoutId: string, lineItems: CartItem[]) {
    try {
      const checkout = await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
      return checkout;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de produits:', error);
      throw error;
    }
  },

  // Récupérer un checkout
  async fetchCheckout(checkoutId: string) {
    try {
      const checkout = await shopifyClient.checkout.fetch(checkoutId);
      return checkout;
    } catch (error) {
      console.error('Erreur lors de la récupération du checkout:', error);
      throw error;
    }
  },

  // Récupérer tous les produits
  async fetchAllProducts() {
    try {
      const products = await shopifyClient.product.fetchAll();
      return products;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw error;
    }
  },

  // Récupérer un produit par ID
  async fetchProduct(productId: string) {
    try {
      const product = await shopifyClient.product.fetch(productId);
      return product;
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      throw error;
    }
  },

  // Créer un checkout et rediriger vers Shopify
  async checkout(items: CartItem[]) {
    try {
      // Créer un nouveau checkout
      const checkout = await this.createCheckout();

      // Ajouter les produits
      const updatedCheckout = await this.addLineItems(checkout.id, items);

      // Retourner l'URL du checkout
      return updatedCheckout.webUrl;
    } catch (error) {
      console.error('Erreur lors du checkout:', error);
      throw error;
    }
  },
};
