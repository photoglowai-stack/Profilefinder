# Audit SEO/wording — termes à risque SafeSearch

## Objectif et périmètre
- Identifier les mots-clés et formulations présents sur le site susceptibles d’activer SafeSearch ou d’être considérés comme inappropriés.
- Focus sur les contenus visibles (SEO, structured data, sections marketing, vidéos UGC).

## Zones sensibles repérées
| Gravité | Emplacement | Termes/expressions à risque | Pourquoi c’est risqué | Recommandation de reformulation |
| --- | --- | --- | --- | --- |
| Élevée | `src/components/SEOBlogSection.tsx` (articles SEO) | « Pornstar by face », « AI porn finder », « reverse image search porn », « porn image search », « name that pornstar », « Adult Search » | Terminologie explicite liée au porno ⇒ forte probabilité de déclassement SafeSearch et blocage publicitaire. | Remplacer par des formulations neutres (« recherche d’images sensibles », « contenus explicites »), ou supprimer la thématique adulte des articles SEO. |
| Élevée | `src/components/StructuredData.tsx` (FAQ & ld+json) | « OnlyFans finder », « pornstar by face search », « porn image search », « AI porn finder », « search pornstar by face » | Les données structurées sont lues par les moteurs : ces mots-clés peuvent marquer le domaine comme site adulte. | Réduire le champ lexical adulte : « recherche de profils créateurs », « détection de contenus sensibles », retirer toute mention « porn/pornstar/OnlyFans » des FAQ et keywords. |
| Élevée | `src/components/ToolComparison.tsx` (bloc comparatif) | « OnlyFans finder », « pornstar by face search » | Réaffirme du vocabulaire adulte dans un bloc global ⇒ renforce le signal site adulte. | Utiliser « recherche de profils créateurs » / « recherche de comptes sociaux » ; supprimer « pornstar ». |
| Moyenne | `src/components/SEOHead.tsx` (meta keywords) | « cheating apps », « how to catch a cheater », « cheater ai » | Lexique « cheater/cheating » peut être perçu comme incitation à surveiller/espionner ; possible filtrage qualité sur certains réseaux. | Préférer « vérification de relation », « détection d’activité suspecte » ; retirer « cheating apps ». |
| Moyenne | `src/lib/content.ts` (SEO longue traîne + FAQ) | Multiples occurrences de « cheater », « cheating apps », « catch a cheater », « define a cheater » (sections SEO/FAQ Fidelity Test & Dating Search) | Répétition intensive du champ lexical « cheater » peut déclencher des signaux négatifs (espionnage, contenu sensible). | Alléger la fréquence : remplacer par « comportements suspects », « vérification de fidélité », « analyse de confiance ». |
| Moyenne | `src/components/UGCSection.tsx` (vidéos UGC) | URLs et hashtags vidéo : « Cheater.mp4 », « #catchingcheaters », « #betrayal », « #breakups » | Les titres/hashtags apparaissent dans l’URL et peuvent être interprétés comme contenu sensible ou conflictuel. | Renommer/auto-héberger les assets avec des noms neutres (« testimony-01.mp4 ») et supprimer les hashtags liés à infidélité/rupture. |

## Synthèse des risques
- **Signal site adulte très fort** : mots-clés explicites (porn/pornstar/OnlyFans) présents dans les articles SEO, données structurées et comparatif d’outils.
- **Signal surveillance/espionnage** : répétition du champ lexical « cheater/cheating apps » dans les meta keywords et contenus longue traîne.
- **Propagation via SEO technique** : les données `ld+json` exposent ces termes aux moteurs, renforçant le classement « contenu adulte » même si la surface visible est réduite.

## Plan d’assainissement prioritaire
1) **Purger le vocabulaire adulte** (SEOBlogSection, StructuredData, ToolComparison) en remplaçant « porn/pornstar/OnlyFans » par des formulations neutres ou en supprimant les sections dédiées.
2) **Assainir les meta keywords** (SEOHead) et le wording SEO longue traîne (content.ts) pour passer de « cheating apps/cheater » à un vocabulaire « sécurité/fiabilité relationnelle ».
3) **Renommer les assets UGC** avec des noms/hashtags neutres et mettre à jour les URLs si possible.
4) **Réévaluer la stratégie SEO** pour privilégier des requêtes B2C « vérification de profil », « recherche d’identité » plutôt que des requêtes adult/infidélité.
