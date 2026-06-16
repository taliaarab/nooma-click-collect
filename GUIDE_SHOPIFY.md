# Guide d'intégration Shopify & Déploiement Vercel

Ce guide vous explique comment configurer votre boutique Shopify et déployer votre page Click & Collect sur Vercel.

---

## 📦 Partie 1 : Configuration Shopify

### Étape 1 : Créer une application personnalisée dans Shopify

1. **Connectez-vous à votre Admin Shopify**
   - Allez sur `https://votre-boutique.myshopify.com/admin`

2. **Accédez aux paramètres d'applications**
   - Cliquez sur **Settings** (Paramètres) en bas à gauche
   - Cliquez sur **Apps and sales channels** (Applications et canaux de vente)
   - Cliquez sur **Develop apps** (Développer des applications)

3. **Créez une nouvelle application**
   - Cliquez sur **Create an app** (Créer une application)
   - Nom de l'application : `NOOMA Click & Collect`
   - Cliquez sur **Create app**

4. **Configurez les permissions Storefront API**
   - Cliquez sur **Configure Storefront API scopes**
   - Activez les permissions suivantes :
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_write_checkouts`
     - ✅ `unauthenticated_read_checkouts`
   - Cliquez sur **Save**

5. **Installez l'application**
   - Cliquez sur **Install app**
   - Confirmez l'installation

6. **Récupérez votre Storefront Access Token**
   - Dans l'onglet **API credentials**
   - Copiez le **Storefront API access token**
   - ⚠️ **Conservez ce token en sécurité !**

### Étape 2 : Créer vos produits dans Shopify

1. **Allez dans Products** (Produits)
   - Admin Shopify → **Products** → **Add product**

2. **Créez vos produits** (exemples basés sur votre site)
   - Babka Chocolat - CHF 12.50
   - Babka Pistache - CHF 13.50
   - Babka Cannelle - CHF 11.50
   - Boîte de 4 mini babkas - CHF 16.00
   - Boîte de 6 mini babkas - CHF 22.00
   - Boîte de 9 mini babkas - CHF 30.00
   - Boîte de 12 mini babkas - CHF 38.00

3. **Pour chaque produit :**
   - Ajoutez un titre, description, prix
   - Ajoutez une image
   - Assurez-vous que le produit est **disponible sur le Storefront API**
     - Dans la section **Sales channels**, activez **Online Store**

4. **Récupérez les IDs de variants**
   - Pour chaque produit créé, notez son **Variant ID**
   - Vous en aurez besoin pour mapper les produits dans votre code

---

## 🔧 Partie 2 : Configuration de votre projet

### Étape 1 : Créer le fichier .env

1. **À la racine de votre projet**, créez un fichier `.env`

2. **Ajoutez vos identifiants Shopify** :

```env
VITE_SHOPIFY_DOMAIN=votre-boutique.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=votre_token_storefront_ici
```

⚠️ **Remplacez** :
- `votre-boutique` par le nom de votre boutique Shopify
- `votre_token_storefront_ici` par le token récupéré à l'étape 1.6

### Étape 2 : Mapper les produits avec Shopify

1. **Ouvrez** `src/app/components/Shop.tsx`

2. **Pour chaque produit**, ajoutez le champ `shopifyVariantId` :

```typescript
const products: Product[] = [
  {
    id: 1,
    name: 'Babka Chocolat',
    description: 'Notre babka signature au chocolat noir',
    price: 12.50,
    image: '...',
    category: 'babka',
    shopifyVariantId: 'gid://shopify/ProductVariant/VOTRE_VARIANT_ID' // ← Ajoutez ceci
  },
  // ... autres produits
];
```

3. **Comment trouver le Variant ID** :
   - Dans Shopify Admin → Products
   - Ouvrez un produit
   - Copiez l'ID dans l'URL (ex: `/products/123456789`)
   - Le Variant ID format complet : `gid://shopify/ProductVariant/123456789`

### Étape 3 : Mettre à jour l'interface Product

Dans `Shop.tsx`, mettez à jour l'interface :

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'babka' | 'patisserie' | 'boisson';
  shopifyVariantId?: string; // ← Ajoutez cette ligne
}
```

---

## 🚀 Partie 3 : Déploiement sur Vercel

### Méthode 1 : Depuis GitHub (Recommandée)

1. **Créez un repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - NOOMA Click & Collect"
   git branch -M main
   git remote add origin https://github.com/votre-username/nooma-click-collect.git
   git push -u origin main
   ```

2. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur **Add New** → **Project**

3. **Importez votre repository GitHub**
   - Sélectionnez votre repository `nooma-click-collect`
   - Cliquez sur **Import**

4. **Configurez les variables d'environnement**
   - Dans **Environment Variables**, ajoutez :
     - `VITE_SHOPIFY_DOMAIN` = `votre-boutique.myshopify.com`
     - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` = `votre_token`

5. **Déployez**
   - Cliquez sur **Deploy**
   - Attendez la fin du déploiement (2-3 minutes)

6. **Votre site est en ligne ! 🎉**
   - URL : `https://votre-projet.vercel.app`

### Méthode 2 : Depuis la ligne de commande

1. **Installez Vercel CLI**
   ```bash
   pnpm add -g vercel
   ```

2. **Connectez-vous**
   ```bash
   vercel login
   ```

3. **Déployez**
   ```bash
   vercel
   ```

4. **Ajoutez les variables d'environnement**
   ```bash
   vercel env add VITE_SHOPIFY_DOMAIN
   vercel env add VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
   ```

5. **Déployez en production**
   ```bash
   vercel --prod
   ```

---

## 🔗 Partie 4 : Intégration dans votre site Shopify principal

### Option A : Lien direct depuis le menu

1. **Dans Shopify Admin**
   - Allez dans **Online Store** → **Navigation**
   - Modifiez votre menu principal
   - Ajoutez un lien :
     - **Nom** : Click & Collect
     - **URL** : `https://votre-projet.vercel.app`

### Option B : iFrame dans une page

1. **Créez une nouvelle page**
   - Shopify Admin → **Online Store** → **Pages**
   - Cliquez sur **Add page**
   - Titre : `Click & Collect`

2. **Ajoutez un iFrame** (en mode HTML) :
   ```html
   <iframe 
     src="https://votre-projet.vercel.app" 
     width="100%" 
     height="1200px" 
     frameborder="0"
     style="border: none;">
   </iframe>
   ```

3. **Publiez la page**

---

## 🧪 Tester votre intégration

### Test local (avant déploiement)

1. **Démarrez le serveur de développement**
   ```bash
   pnpm dev
   ```

2. **Ouvrez** `http://localhost:5173`

3. **Testez le panier**
   - Ajoutez des produits au panier
   - Cliquez sur "Commander sur Shopify"
   - Vous devriez être redirigé vers le checkout Shopify

### Test en production

1. **Ouvrez votre URL Vercel**
   - `https://votre-projet.vercel.app`

2. **Testez une commande complète**
   - Ajoutez des produits
   - Passez au checkout
   - Complétez une commande test

---

## ✅ Checklist finale

Avant de mettre en ligne :

- [ ] ✅ Application Shopify créée et configurée
- [ ] ✅ Token Storefront API récupéré
- [ ] ✅ Produits créés dans Shopify
- [ ] ✅ Variant IDs ajoutés dans le code
- [ ] ✅ Fichier `.env` créé avec les bonnes valeurs
- [ ] ✅ Déployé sur Vercel
- [ ] ✅ Variables d'environnement ajoutées sur Vercel
- [ ] ✅ Test de commande réussi
- [ ] ✅ Lien ajouté dans le menu Shopify

---

## 🆘 Dépannage

### "Configuration Shopify requise"

➡️ Vérifiez que tous les produits ont un `shopifyVariantId` dans `Shop.tsx`

### "Erreur lors de la création du checkout"

➡️ Vérifiez votre token Storefront API dans `.env` et sur Vercel

### La page est blanche après déploiement

➡️ Vérifiez les variables d'environnement sur Vercel

### Les produits ne se chargent pas

➡️ Vérifiez que les produits sont disponibles sur le Storefront API dans Shopify

---

## 📧 Support

Pour toute question : contact@nooma.ch

---

**Fait avec ❤️ pour NOOMA Babkery**
