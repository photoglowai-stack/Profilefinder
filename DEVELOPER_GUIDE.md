# 🔧 Guide Développeur - ProfileFinder

> Documentation technique complète pour les développeurs

---

## Table des Matières

1. [Quick Start](#1-quick-start)
2. [Architecture Détaillée](#2-architecture-détaillée)
3. [Conventions de Code](#3-conventions-de-code)
4. [Système de Composants](#4-système-de-composants)
5. [Gestion d'État](#5-gestion-détat)
6. [Système de Paiement](#6-système-de-paiement)
7. [Theming & Styles](#7-theming--styles)
8. [Tests](#8-tests)
9. [Déploiement](#9-déploiement)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Quick Start

```bash
# Installation
cd web-next
npm install

# Développement (port 3001 si 3000 occupé)
npm run dev

# Build production
npm run build

# Vérifier les types TypeScript
npx tsc --noEmit

# Linting
npm run lint
```

### Variables d'environnement requises

Créer `.env.local` :
```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# API Backend (optionnel)
NEXT_PUBLIC_API_URL=http://localhost:3002
```

---

## 2. Architecture Détaillée

### Structure des dossiers

```
web-next/
│
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx            # Layout racine (fonts, metadata)
│   ├── page.tsx              # Landing page (/)
│   ├── providers.tsx         # Context providers wrapper
│   ├── globals.css          # Tailwind + styles globaux
│   │
│   ├── [service]/           # Pages services
│   │   └── page.tsx
│   │
│   ├── payment/             # Tunnel de paiement
│   │   ├── page.tsx         # Page principale contextuelle
│   │   ├── success/         # Confirmation post-paiement
│   │   └── [service]/       # Pages dédiées par service
│   │
│   ├── dashboard/           # Hub premium (abonnés)
│   └── results/             # Résultats single-purchase
│
├── components/
│   ├── pages/               # Composants page entière
│   ├── ui/                  # Composants réutilisables (shadcn)
│   ├── forms/               # Formulaires de saisie
│   ├── payment/             # Logique paiement
│   ├── layouts/             # Layouts partagés
│   └── [features]/          # Composants par feature
│
├── lib/                     # Utilitaires
│   ├── utils.ts             # Helpers (cn, etc.)
│   ├── ServiceContext.tsx   # State global services
│   ├── content.ts           # Contenu statique
│   └── serviceColors.ts     # Couleurs par service
│
├── styles/                  # CSS additionnels
├── public/                  # Assets statiques
└── assets/                  # Images importées
```

### Flux de données

```
User Action
    ↓
ServiceContext (état global)
    ↓
Component (props + hooks)
    ↓
API/Stripe (actions async)
    ↓
Result Page / Dashboard
```

---

## 3. Conventions de Code

### Nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Composants | PascalCase | `PaymentPage.tsx` |
| Hooks | camelCase + use | `useService()` |
| Utils | camelCase | `getPaymentConfig()` |
| Types | PascalCase + Type/Props | `ServiceType`, `ButtonProps` |
| Routes | kebab-case | `/face-trace` |
| CSS Classes | kebab-case | `.payment-card` |

### Structure d'un composant

```tsx
"use client"; // Si client-side

// 1. Imports (groupés par catégorie)
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLib } from 'external-lib';
import { useService } from '@/lib/ServiceContext';
import { Button } from '@/components/ui/button';

// 2. Types
interface ComponentProps {
    variant?: 'primary' | 'secondary';
    onAction?: () => void;
}

// 3. Sous-composants privés (optionnel)
function SubComponent() { ... }

// 4. Composant principal (export nommé)
export function MyComponent({ variant = 'primary', onAction }: ComponentProps) {
    // 4a. Hooks en premier
    const [state, setState] = useState(false);
    const { selectedService } = useService();

    // 4b. Effects
    useEffect(() => { ... }, []);

    // 4c. Handlers
    const handleClick = () => { ... };

    // 4d. Render
    return (
        <div className="...">
            ...
        </div>
    );
}

// 5. Export default (pour lazy loading)
export default MyComponent;
```

### Imports absolus

Utiliser `@/` pour les imports depuis la racine :

```tsx
// ✅ Bon
import { Button } from '@/components/ui/button';
import { useService } from '@/lib/ServiceContext';

// ❌ Éviter
import { Button } from '../../../components/ui/button';
```

---

## 4. Système de Composants

### Composants UI (shadcn/ui)

Basés sur Radix UI + Tailwind. Localisation : `components/ui/`

```tsx
// Utilisation
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
    Click me
</Button>
```

Variants disponibles : `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

### Composants de Preview

Chaque service a son propre composant de preview blurré :

| Service | Composant | Description |
|---------|-----------|-------------|
| Dating | `DatingResultsPreview` | Cartes profil floutées |
| FaceTrace | `FaceTraceResultsPreview` | Grille de matches |
| Fidelity | `FidelityCheckResultsPreview` | Profil Tinder |
| Chat | `ChatAnalysisResultsPreview` | Interface chat |

Structure commune :
```tsx
export function [Service]ResultsPreview() {
    return (
        <div className="relative">
            {/* Contenu flouté */}
            <div style={{ filter: 'blur(4px)' }}>
                ...
            </div>
            
            {/* Overlay cadenas */}
            <div className="absolute inset-0 flex items-center justify-center">
                <LockIcon />
            </div>
        </div>
    );
}
```

---

## 5. Gestion d'État

### ServiceContext

État global léger pour le service sélectionné :

```tsx
// lib/ServiceContext.tsx
interface ServiceContextType {
    selectedService: ServiceType;      // 'dating' | 'faceTrace' | ...
    setSelectedService: (s) => void;
    colors: ServiceColors;              // Couleurs du service actif
    searchTarget: string;               // Nom recherché
    setSearchTarget: (n) => void;
}
```

Usage :
```tsx
const { selectedService, setSelectedService, colors } = useService();
```

### État local vs global

| Scope | Solution | Exemple |
|-------|----------|---------|
| Composant seul | `useState` | Toggle, input |
| Page entière | `useState` + props | Formulaire multi-step |
| App entière | `ServiceContext` | Service actif |
| Persisté | `sessionStorage` | Données recherche |

---

## 6. Système de Paiement

### Configuration (`paymentConfig.ts`)

```typescript
// Types de plans
type PlanType = 'subscription' | 'single';

// Config par service
PAYMENT_CONFIG[service] = {
    title: 'Dating Search',
    singleReportPrice: 14.99,
    singleReportOriginalPrice: 29.99,
    resultPage: '/results/dating',
    accentColors: { primary, secondary, gradient },
    features: [...],
}

// Subscription globale
SUBSCRIPTION_CONFIG = {
    price: 19.99,
    features: [...], // Tous les services
}
```

### Intégration Stripe

```typescript
// 1. Obtenir le price ID
const priceId = getStripePrice(service, planType);

// 2. Créer la session Checkout (côté serveur)
const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: planType === 'subscription' ? 'subscription' : 'payment',
    success_url: getSuccessUrl(service, planType),
    cancel_url: `${origin}/payment`,
});

// 3. Rediriger
window.location.href = session.url;
```

### Flow complet

```
1. /payment?service=dating
   └── PlanSelector affiche les 2 options

2. User sélectionne → onClick
   └── handlePayment() avec priceId correct

3. Stripe Checkout
   └── success_url: /payment/success?plan=xxx&service=xxx

4. /payment/success
   └── Countdown 5s → redirect

5. Destination finale:
   ├── Subscription → /dashboard
   └── Single → /results/{service}
```

---

## 7. Theming & Styles

### Palette de couleurs par service

```typescript
// lib/serviceColors.ts
const SERVICE_COLORS = {
    dating: {
        primary: '#f43f5e',     // Rose
        secondary: '#f97316',   // Orange
        gradient: 'from-rose-500 to-orange-500',
    },
    faceTrace: {
        primary: '#06b6d4',     // Cyan
        secondary: '#3b82f6',   // Blue
        gradient: 'from-cyan-500 to-blue-600',
    },
    // ...
}
```

### Classes Tailwind communes

```css
/* Glassmorphism */
.glass-card {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl;
}

/* Dark mode container */
.dark-container {
    @apply bg-gray-900 text-white;
}

/* Gradient text */
.gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r;
}

/* Hover scale */
.hover-lift {
    @apply transition-transform hover:scale-[1.02] hover:-translate-y-1;
}
```

### Animations Framer Motion

```tsx
// Fade in from bottom
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>

// Hover scale
<motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
>

// Staggered children
<motion.div variants={container} initial="hidden" animate="show">
    {items.map((item, i) => (
        <motion.div key={i} variants={item} />
    ))}
</motion.div>
```

---

## 8. Tests

### À implémenter

```bash
# Structure recommandée
__tests__/
├── components/
│   └── PlanSelector.test.tsx
├── pages/
│   └── payment.test.tsx
└── utils/
    └── paymentConfig.test.ts
```

### Outils recommandés

- **Jest** : Test runner
- **React Testing Library** : Tests composants
- **Playwright** : Tests E2E

---

## 9. Déploiement

### Vercel (recommandé)

```bash
# Via CLI
npx vercel --prod

# Variables à configurer dans Vercel Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
```

### Vérifications pre-deploy

```bash
# 1. Build sans erreurs
npm run build

# 2. Pas d'erreurs TypeScript
npx tsc --noEmit

# 3. Lint propre
npm run lint

# 4. Test manuel des routes principales
```

---

## 10. Troubleshooting

### Problème : Site ne réagit pas aux clics

**Cause** : Cache corrompu ou WebGL overlay
**Solution** :
```bash
rm -rf .next node_modules/.cache
npm run build
npm run dev
```

### Problème : 404 sur chunks JavaScript

**Cause** : Incohérence de build
**Solution** :
```bash
rm -rf .next
npm run build
```

### Problème : Styles non appliqués

**Cause** : Tailwind n'est pas configuré
**Solution** : Vérifier `tailwind.config.ts` inclut tous les paths :
```ts
content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
]
```

### Problème : useService() throws error

**Cause** : Composant hors du `ServiceProvider`
**Solution** : Vérifier que `providers.tsx` wrap bien l'app

---

## Contacts

- **Repo** : https://github.com/photoglowai-stack/Profilefinder
- **Issues** : Utiliser GitHub Issues

---

*Dernière mise à jour : Janvier 2026*
