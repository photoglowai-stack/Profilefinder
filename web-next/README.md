# ProfileFinder - Web Application (Next.js 14)

> 🔍 Suite d'outils OSINT/AI pour la détection de profils en ligne

## 📋 Table des Matières

- [Stack Technique](#-stack-technique)
- [Installation](#-installation)
- [Architecture](#-architecture)
- [Routes & Pages](#-routes--pages)
- [Composants](#-composants)
- [Système de Paiement](#-système-de-paiement)
- [Theming & Design System](#-theming--design-system)
- [Développement](#-développement)
- [Déploiement](#-déploiement)

---

## 🛠 Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 14.2.x | Framework React (App Router) |
| **React** | 18.x | UI Library |
| **TypeScript** | 5.x | Type Safety |
| **Tailwind CSS** | 3.4.x | Styling |
| **Framer Motion** | 11.x | Animations |
| **Lucide React** | 0.4.x | Icons |
| **Three.js** | r128 | WebGL Backgrounds |

---

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/photoglowai-stack/Profilefinder.git
cd Profilefinder/web-next

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
npm start
```

**Variables d'environnement** (`.env.local`) :
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_API_URL=https://api.profilefinder.ai
```

---

## 🏗 Architecture

```
web-next/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing Page (/)
│   ├── layout.tsx                # Root Layout
│   ├── globals.css               # Global Styles
│   ├── providers.tsx             # Context Providers
│   │
│   ├── dashboard/                # Premium Dashboard (/dashboard)
│   ├── dating-search/            # Dating Search Tool (/dating-search)
│   ├── face-trace/               # Face Recognition (/face-trace)
│   ├── activity-tracker/         # Instagram Tracker (/activity-tracker)
│   ├── fidelity-test/            # Partner Check (/fidelity-test/analysis)
│   │
│   ├── payment/                  # Payment Pages
│   │   ├── page.tsx              # Main Payment (/payment)
│   │   ├── success/              # Success Page (/payment/success)
│   │   ├── facetrace/            # FaceTrace Payment
│   │   ├── fidelity/             # Fidelity Payment
│   │   ├── chat-analysis/        # Chat Analysis Payment
│   │   └── instagram/            # Instagram Payment
│   │
│   └── results/                  # Single Report Results
│       ├── dating/               # Dating Results
│       ├── face-trace/           # FaceTrace Results
│       └── fidelity/             # Fidelity Results
│
├── components/
│   ├── pages/                    # Full Page Components
│   │   ├── PaymentPage.tsx       # Main Payment (legacy)
│   │   ├── PaymentPageNew.tsx    # Refactored Payment
│   │   ├── DashboardPage.tsx     # Premium Dashboard
│   │   ├── FaceTracePaymentPage.tsx
│   │   ├── FidelityCheckPaymentPage.tsx
│   │   ├── ChatAnalysisPaymentPage.tsx
│   │   └── results/              # Result Pages
│   │
│   ├── payment/                  # Payment System
│   │   ├── paymentConfig.ts      # Stripe Config & Prices
│   │   ├── PlanSelector.tsx      # Plan Selection UI
│   │   └── FaceTraceResultsPreview.tsx
│   │
│   ├── ui/                       # Reusable UI Components
│   │   ├── button.tsx            # Shadcn Button
│   │   ├── DatingResultsPreview.tsx
│   │   ├── FaceTraceResultsPreview.tsx
│   │   ├── FidelityCheckResultsPreview.tsx
│   │   ├── ChatAnalysisResultsPreview.tsx
│   │   └── AIWorkingPreview.tsx
│   │
│   ├── forms/                    # Form Components
│   ├── layouts/                  # Layout Components
│   ├── analysis/                 # Analysis Components
│   │
│   └── [Landing Components]      # Hero, FAQ, Footer, etc.
│
├── lib/                          # Utilities
│   ├── utils.ts                  # Helper Functions
│   └── ServiceContext.tsx        # Global Service State
│
├── styles/                       # Additional Styles
├── public/                       # Static Assets
└── assets/                       # Images & Media
```

---

## 🛤 Routes & Pages

### Public Routes
| Route | Description | Component |
|-------|-------------|-----------|
| `/` | Landing Page | `app/page.tsx` |
| `/dating-search` | Dating App Search Tool | `DatingSearchPage` |
| `/face-trace` | Reverse Image Search | `FaceTracePage` |
| `/activity-tracker` | Instagram Monitoring | `ActivityTrackerPage` |
| `/fidelity-test/analysis` | Partner Check | `FidelityTestPage` |

### Payment Routes
| Route | Description | Plan Type |
|-------|-------------|-----------|
| `/payment` | Main Payment (contextual) | Both |
| `/payment/facetrace` | FaceTrace Standalone | Single/Sub |
| `/payment/fidelity` | Fidelity Standalone | Single/Sub |
| `/payment/chat-analysis` | Chat Analysis Standalone | Single/Sub |
| `/payment/success` | Post-Payment Success | - |

### Protected Routes (Post-Payment)
| Route | Access | Description |
|-------|--------|-------------|
| `/dashboard` | Premium Subscription | All-Access Hub |
| `/results/dating` | Single Purchase | Dating Report |
| `/results/face-trace` | Single Purchase | FaceTrace Report |
| `/results/fidelity` | Single Purchase | Fidelity Report |

---

## 🧩 Composants

### Landing Page Components
| Component | File | Description |
|-----------|------|-------------|
| `HeroAntigravity` | `components/HeroAntigravity.tsx` | Hero section with service tabs |
| `HowItWorks` | `components/HowItWorks.tsx` | Features grid |
| `Testimonials` | `components/Testimonials.tsx` | User reviews |
| `FAQ` | `components/FAQ.tsx` | Accordion FAQ |
| `Footer` | `components/Footer.tsx` | Site footer |
| `CTASection` | `components/CTASection.tsx` | Call-to-action |

### Payment Components
| Component | File | Description |
|-----------|------|-------------|
| `PlanSelector` | `payment/PlanSelector.tsx` | Subscription vs Single choice |
| `DatingResultsPreview` | `ui/DatingResultsPreview.tsx` | Blurred dating results |
| `FaceTraceResultsPreview` | `ui/FaceTraceResultsPreview.tsx` | Blurred face matches |
| `FidelityCheckResultsPreview` | `ui/FidelityCheckResultsPreview.tsx` | Blurred Tinder profile |
| `ChatAnalysisResultsPreview` | `ui/ChatAnalysisResultsPreview.tsx` | Blurred chat analysis |

---

## 💳 Système de Paiement

### Configuration (`paymentConfig.ts`)

```typescript
// Plans
SUBSCRIPTION_CONFIG = {
  price: 19.99,           // €/month
  features: [...],        // All 5 services
}

PAYMENT_CONFIG[service] = {
  singleReportPrice: 14.99,  // One-time
  resultPage: '/results/...',
}

// Stripe Price IDs
STRIPE_PRICES = {
  subscription: 'price_xxx',
  singleReport: {
    dating: 'price_xxx',
    faceTrace: 'price_xxx',
    // ...
  }
}
```

### Flow de Paiement
```
1. User lands on /payment?service=dating
2. PlanSelector shows: Subscription (hero) + Single Report
3. User selects plan
4. Stripe Checkout with correct priceId
5. Redirect to /payment/success?plan=xxx&service=xxx
6. Success page redirects to:
   - /dashboard (subscription)
   - /results/{service} (single)
```

---

## 🎨 Theming & Design System

### Colors by Service
| Service | Primary | Secondary | Gradient |
|---------|---------|-----------|----------|
| **Dating** | `#f43f5e` | `#f97316` | Rose → Orange |
| **FaceTrace** | `#06b6d4` | `#3b82f6` | Cyan → Blue |
| **Following** | `#8b5cf6` | `#6366f1` | Violet → Indigo |
| **Fidelity** | `#dc2626` | `#f97316` | Red → Orange |
| **Chat** | `#a855f7` | `#ec4899` | Purple → Pink |

### Design Principles
- **Glassmorphism**: `bg-white/5 backdrop-blur-xl border-white/10`
- **Dark Mode**: `bg-gray-900`, `text-white`
- **Animations**: Framer Motion for transitions
- **WebGL**: Three.js particle backgrounds on payment pages

---

## 💻 Développement

### Scripts NPM
```bash
npm run dev       # Development server (port 3001)
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint check
```

### Ajouter une nouvelle page de service

1. Créer la route: `app/new-service/page.tsx`
2. Créer le composant: `components/pages/NewServicePage.tsx`
3. Ajouter la config: `payment/paymentConfig.ts`
4. Créer la preview: `ui/NewServiceResultsPreview.tsx`
5. Créer la page résultat: `app/results/new-service/page.tsx`

### Conventions de Code
- Composants: PascalCase (`PaymentPage.tsx`)
- Hooks: camelCase avec `use` prefix (`useService`)
- Utils: camelCase (`getPaymentConfig`)
- Routes: kebab-case (`/face-trace`)

---

## 🚢 Déploiement

### Vercel (Recommandé)
```bash
# CLI
npx vercel --prod

# Ou via GitHub integration
# Push to main → Auto-deploy
```

### Variables Vercel
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_API_URL
```

### Build Optimizations
- Images: Next.js Image Optimization (install `sharp`)
- Fonts: Local Google Fonts (Inter)
- Bundle: Tree-shaking enabled

---

## 📝 TODO / Known Issues

- [ ] Intégrer Stripe Checkout réel
- [ ] Ajouter authentification (NextAuth)
- [ ] API backend pour résultats
- [ ] Tests E2E (Playwright)
- [ ] Analytics (Posthog/Mixpanel)

---

## 📞 Support

- **Email**: dev@profilefinder.ai
- **GitHub Issues**: Pour bugs et features

---

*Last updated: January 2026*
