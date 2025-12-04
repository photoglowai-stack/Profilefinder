# ProfileFinder.ai

AI-powered profile search tool for dating apps, social media monitoring, facial recognition, and fidelity testing.

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Vercel (https://vercel.com)
- Git installé localement

### Étapes de déploiement

1. **Initialiser Git (si ce n'est pas déjà fait)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Créer un repository sur GitHub**
   - Allez sur https://github.com/new
   - Créez un nouveau repository
   - Suivez les instructions pour pousser votre code

3. **Déployer sur Vercel**
   
   **Option A : Via l'interface Vercel**
   - Allez sur https://vercel.com/photoglows-projects
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Vite
   - Cliquez sur "Deploy"

   **Option B : Via CLI Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

4. **Configuration automatique**
   - Vercel utilisera automatiquement le fichier `vercel.json`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Framework: Vite

## 🛠️ Développement local

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 📦 Technologies utilisées

- **React** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Motion** - Animations
- **Lucide React** - Icônes

## 🌐 URLs

- **Production**: Sera disponible après déploiement sur Vercel
- **Local**: http://localhost:3000

## 📝 Notes importantes

- Le projet utilise React Router pour la navigation
- Le fichier `vercel.json` configure les rewrites pour le SPA routing
- Toutes les routes redirigent vers `index.html` pour le routing côté client