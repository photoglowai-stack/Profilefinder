# Audit Frontend – problèmes visuels/animations

## 1) Barre de stats invisible
- Le composant `StatsBar` ne renvoie rien : `return null;` alors que le contenu est préparé (`statsBar`). Résultat : aucune barre de stats n'est affichée ni animée sur la landing page.
- **Impact UX** : trou visuel entre sections + perte de réassurance chiffrée.
- **Pistes** : rendre le JSX conditionnel, animer l'apparition (motion.div) et gérer l'état par service sélectionné.

## 2) Avatars du widget introuvables
- Le widget flottant référence `/assets/avatars/widget-man.png` et `/assets/avatars/widget-woman.png`, mais le dossier `src/assets/avatars` n'existe pas dans le repo.
- **Impact UX** : cartes de sélection genre affichent un cadre vide/alt text, ce qui casse l'effet premium et l'animation de sélection.
- **Pistes** : ajouter les assets manquants ou pointer vers des URLs existantes; prévoir un fallback SVG pour éviter les images cassées.

## 3) Payment screen : background WebGL non bridé
- Le fond animé charge Three.js depuis un CDN et lance une animation `requestAnimationFrame` permanente sans prise en compte du `prefers-reduced-motion` ni cleanup complet.
- **Impacts** : consommation CPU/GPU sur mobile, absence de fallback si le script CDN échoue, mémoire non libérée (pas de `dispose()` sur géométrie/material/renderer).
- **Pistes** :
  - Bypasser l'animation quand `window.matchMedia('(prefers-reduced-motion: reduce)')` est vrai.
  - Ajouter un timeout/fallback (canvas statique) si le script ne se charge pas.
  - `dispose()` des ressources Three.js dans le cleanup pour éviter les leaks.
