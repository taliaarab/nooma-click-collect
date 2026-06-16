# Mapping des produits Shopify

Ce fichier vous aide à mapper vos produits avec leurs IDs Shopify.

## Comment trouver vos Variant IDs

1. Connectez-vous à votre Admin Shopify
2. Allez dans **Products**
3. Ouvrez un produit
4. Récupérez l'ID dans l'URL ou via l'API

## Format des IDs

Les Variant IDs Shopify ont ce format :
```
gid://shopify/ProductVariant/123456789
```

## Template de mapping

Copiez ce template et remplissez avec vos vrais IDs Shopify :

### Babkas individuelles

```typescript
{
  id: 1,
  name: 'Babka Chocolat',
  price: 12.50,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
{
  id: 2,
  name: 'Babka Pistache',
  price: 13.50,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
{
  id: 3,
  name: 'Babka Cannelle',
  price: 11.50,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
```

### Pâtisseries

```typescript
{
  id: 4,
  name: 'Croissant',
  price: 3.50,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
{
  id: 5,
  name: 'Pain au Chocolat',
  price: 3.80,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
{
  id: 6,
  name: 'Cookie Chocolat',
  price: 4.20,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
```

### Boissons

```typescript
{
  id: 7,
  name: 'Café Latte',
  price: 5.00,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
{
  id: 8,
  name: 'Cappuccino',
  price: 4.80,
  shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_ID_ICI'
},
```

### Boîtes de mini babkas

Pour le BoxBuilder, vous devrez également créer des produits dans Shopify pour les boîtes :

```typescript
// Tailles de boîtes
Boîte de 4 mini babkas - CHF 16.00
Boîte de 6 mini babkas - CHF 22.00
Boîte de 9 mini babkas - CHF 30.00
Boîte de 12 mini babkas - CHF 38.00
```

**Note importante** : Pour le BoxBuilder, vous devrez créer un produit par combinaison de saveurs OU utiliser des attributs de produit Shopify pour gérer les variations.

## Alternative : Utiliser l'API Shopify Admin

Si vous avez beaucoup de produits, vous pouvez utiliser l'API Admin pour récupérer tous les IDs automatiquement :

```bash
# Installer le CLI Shopify
npm install -g @shopify/cli

# Se connecter
shopify login

# Récupérer les produits
shopify products list
```

## Prochaines étapes

Une fois que vous avez tous vos Variant IDs :

1. Ouvrez `src/app/components/Shop.tsx`
2. Ajoutez le champ `shopifyVariantId` à chaque produit
3. Testez en local avec `pnpm dev`
4. Déployez sur Vercel avec `pnpm deploy`

---

Besoin d'aide ? Consultez le [GUIDE_SHOPIFY.md](./GUIDE_SHOPIFY.md)
