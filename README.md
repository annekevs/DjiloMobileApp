## Cahier des charges final — Application mobile de coaching sportif (React Native)

---

### 1. **Présentation générale**

**Objectif**  
Développer une application mobile de coaching sportif moderne et attractive, inspirée du design Figma DjiloFitness, permettant :
- La souscription à des programmes personnalisés (individuels) ou de groupe (bootcamps), gratuits ou payants
- Le suivi d’activité et la progression des utilisateurs
- L’accès à une communauté interactive (posts, vidéos, conseils nutritionnels)
- La recherche de programmes, salles de sport et équipements
- Un accompagnement personnalisé par un coach

**Technologie**  
- **Frontend** : React Native (Expo)
- **Backend** : Node.js/Firebase
- **Stockage médias** : Firebase Storage ou AWS S3

---

### 2. **Plateformes et supports**

- **Cibles** : Smartphones Android et iOS
- **Responsive** : Interface adaptée à toutes tailles d’écran mobile
- **Accessibilité** : Respect des standards d’accessibilité mobile

---

### 3. **Identité visuelle**

- **Couleur principale** : `#EC5300` (orange vif)
  - Utilisée pour : boutons principaux, barres de navigation, éléments interactifs majeurs, surlignage des CTA
- **Palette secondaire** : blanc ou gris très clair (fonds), noir ou gris foncé (texte), variantes d’orange pour les états survolés/pressés
- **Police recommandée** : *Inter* ou *Montserrat* (moderne, lisible, adaptée au mobile)
- **Design** : Interface dynamique, hiérarchie visuelle claire, icônes simples, illustrations sportives, dark mode natif

---

### 4. **Menu principal et navigation**

Le menu principal (bottom navigation) comprend :
- **Accueil**
- **Suivi d’activité**
- **Recherche**
- **Communauté**
- **Profil**

---

### 5. **Fonctionnalités détaillées**

#### 5.1. **Accueil**
- Mise en avant des programmes recommandés et populaires (gratuits/payant)
- Accès rapide aux séances du jour ou à venir
- Suggestions personnalisées selon le profil utilisateur
- Bannières d’actualités et nouveautés

#### 5.2. **Suivi d’activité**
- Calendrier des séances passées et à venir
- Statistiques d’activité (nombre de séances, progression, temps total, calories estimées)
- Détail des séances réalisées (exercices, durée, intensité, notes)
- Feedback ou validation par le coach
- Historique des performances et progression visuelle

#### 5.3. **Recherche**
- Recherche de programmes d’entraînement (mot-clé, filtres : niveau, objectif, durée, équipement, gratuit/payant)
- Recherche de salles de sport (fiche descriptive, horaires, localisation)
- Recherche d’équipements sportifs (description, conseils d’utilisation)
- Résultats présentés sous forme de cartes imagées et interactives

#### 5.4. **Communauté**
- **Fil d’actualité** : posts, vidéos, conseils nutritionnels, retours d’expérience
- **Création de contenu** : publication de posts (texte, photo, vidéo)
- **Vidéos** : section dédiée aux vidéos d’entraînement, tutoriels, conseils (type YouTube)
- **Conseils nutrition** : articles, vidéos, posts sur la nutrition sportive
- **Commentaires et likes** sur chaque publication
- **Recherche dans la communauté** : par hashtag, thème, utilisateur
- **Modération** : signalement de contenu, gestion des droits de publication

#### 5.5. **Profil**
- Informations personnelles (photo, nom, âge, poids, taille, objectifs)
- Historique des séances et programmes suivis
- Liste des favoris (programmes, salles, équipements, posts communautaires)
- Paramètres du compte (notifications, préférences, langue)
- Gestion des abonnements et paiements (freemium/premium, gestion Stripe/Apple Pay/Google Pay)
- Accès à l’onboarding pour modifier ses objectifs et préférences

---

### 6. **Gestion des programmes et souscriptions**

- **Catalogue de programmes** :  
  - Programmes personnalisés (adaptés à l’utilisateur)
  - Programmes de groupe/bootcamps (sessions collectives, calendrier partagé)
  - Indication claire : gratuit ou payant pour chaque programme
- **Souscription** :  
  - Achat unique ou abonnement récurrent
  - Paiement intégré via l’application
  - Accès immédiat après paiement ou inscription
  - Gestion des annulations et renouvellements automatiques
  - Essai gratuit possible pour certains programmes
- **Accès différencié** :  
  - Contenus gratuits : accès limité, fonctionnalités de base
  - Contenus payants : programmes exclusifs, suivi approfondi, accès à un coach dédié

---

### 7. **Fonctionnalités additionnelles**

- **Notifications** : rappels de séances, nouveaux programmes, messages du coach, interactions communautaires
- **Favoris** : ajout rapide de programmes, salles, équipements, posts ou vidéos communautaires
- **Onboarding personnalisé** : choix du sexe, âge, objectifs, niveau, préférences lors de la première utilisation
- **Support multilingue** : application disponible en plusieurs langues (français, anglais, arabe…)

---

### 8. **Sécurité et confidentialité**

- Stockage sécurisé des données (chiffrement)
- Respect du RGPD (données stockées en Europe)
- Gestion des droits utilisateurs (modération, signalement)
- Authentification sécurisée (email, réseaux sociaux)

---

### 9. **Livrables et jalons**

- **Phase 1 (MVP)** : Accueil, Suivi d’activité, Recherche, Profil, catalogue de programmes gratuits
- **Phase 2** : Ajout de la Communauté, gestion des souscriptions et paiements, notifications, favoris, onboarding avancé
- **Phase 3** : Optimisation, accessibilité, multilingue, sécurité renforcée

---

### 10. **Résumé de l’expérience utilisateur**

1. **Accueil** : Découvrir les nouveautés, recommandations, programmes à la une (gratuits et payants).
2. **Recherche** : Trouver un programme personnalisé, un bootcamp, une salle ou un équipement adapté à ses besoins.
3. **Suivi d’activité** : Visualiser ses progrès, recevoir les retours du coach, planifier ses prochaines séances.
4. **Communauté** : S’inspirer, partager ses réussites, consulter ou poster des vidéos, conseils ou questions.
5. **Profil** : Gérer ses informations, objectifs, favoris, souscriptions et paramètres.

---
