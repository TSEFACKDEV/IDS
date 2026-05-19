# CLAUDE.md — Directives de développement IDS Cameroun

## Design system
Le design suit strictement les maquettes fournies :
- Couleurs principales : Rouge #CC0000, Noir #0A0A0A, Blanc #FFFFFF, Or/Jaune #F5A623
- Police : system-ui avec fallback sans-serif
- Palette étendue : rouge-50 à rouge-900 via Tailwind custom config
- Coins : rounded-lg (8px) standard, rounded-xl (16px) pour les cartes hero
- Ombres : shadow-sm uniquement, jamais de glow ou d'ombre colorée
- Animations : transition-all duration-300, hover:scale-[1.02] pour les cartes de cours

## Palettes Tailwind custom à ajouter dans tailwind.config
ids-red: { 50: '#FFF0F0', 100: '#FFD6D6', 500: '#CC0000', 600: '#AA0000', 700: '#880000' }
ids-gold: { 400: '#F5A623', 500: '#E09000' }

## Composants UI réutilisables (src/components/ui/)
- Button : variantes primary (rouge), secondary (outline), ghost
- Badge : niveaux A1-A2 (vert), B1-B2 (bleu), C1-C2 (rouge), examens (or)
- Card : hover lift, border subtile, pas de shadow lourde
- SectionTitle : trait rouge dessous (border-b-2 border-ids-red-500 w-12)

## Pages et leurs composants
### Accueil (app/[locale]/page.tsx)
Hero → Services (5 icônes) → CoursSection (5 cartes) → Stats (fond noir) → APropos snippet → FAQ accordion → Témoignages carousel → Footer

### Inscription (app/[locale]/inscription/)
Formulaire 3 étapes :
1. Informations personnelles (StepPersonnel)
2. Formation + Disponibilités (StepFormation + StepDisponibilite)  
3. Récapitulatif + Engagement (StepRecap)
Progress bar animée, validation zod par étape, soumission → API route → email + PDF

### Admin (app/[locale]/admin/) — protégé ADMIN
Tableau de bord : stats agrégées, liste inscriptions filtrables, détail étudiant, gestion statuts

## i18n — règles strictes
- Toutes les chaînes UI dans messages/fr.json et messages/de.json
- Contenu cours/témoignages bilingue dans src/content/*.json avec structure { fr: {}, de: {} }
- Switcher de langue dans le Header, conserve la route courante
- Locale par défaut : fr, fallback sur fr si clé manquante en de

## API routes
- POST /api/inscription : créer inscription, générer numéroAuto, envoyer email, retourner PDF URL
- GET /api/pdf/[id] : générer et streamer la fiche PDF (protégé : owner ou ADMIN)
- /api/auth/[...nextauth] : next-auth session handling

## Corrections à appliquer avant tout développement
1. Ajouter `url = env("DATABASE_URL")` dans prisma/schema.prisma datasource
2. Supprimer l'enum ModeCours ou le dériver automatiquement de TypeCours
3. Ajouter middleware.ts combinant next-intl + next-auth
4. Vérifier la compatibilité next@16.2.6 (non standard — probablement next@15.2.6)