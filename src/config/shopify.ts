// Configuration Shopify
// Les variables d'environnement sont définies dans le fichier .env à la racine du projet

export const shopifyConfig = {
  // Votre domaine Shopify (ex: votre-boutique.myshopify.com)
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'VOTRE-BOUTIQUE.myshopify.com',

  // Votre Storefront Access Token
  // Pour l'obtenir: Admin Shopify → Settings → Apps and sales channels → Develop apps
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'VOTRE_STOREFRONT_ACCESS_TOKEN',
};
