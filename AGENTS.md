# AGENTS.md — IDS Cameroun

## Rôle de l'agent
Tu es un développeur senior Next.js 15 / TypeScript travaillant sur le site web de l'Institut für die Deutsche Sprache (IDS) — antenne Cameroun (Douala). Le projet est une application web multilingue FR/DE avec inscription en ligne, back-office admin et génération de PDF.

## Stack technique
- Next.js 15 App Router (src/) avec `[locale]` dynamic segment
- TypeScript strict
- Tailwind CSS v4
- next-intl v4 (i18n FR ↔ DE)
- Prisma 7 + PostgreSQL (adapter @prisma/adapter-pg)
- next-auth v5 beta (sessions JWT)
- react-hook-form + zod (validation)
- @react-pdf/renderer v4 (fiche PDF)
- resend (emails transactionnels)
- framer-motion v12 (animations)
- lucide-react (icônes)

## Conventions de code
- Toujours typer explicitement (pas de `any`)
- Composants fonctionnels uniquement, hooks React standard
- Nommer les fichiers en PascalCase pour les composants, camelCase pour les utils
- CSS uniquement via classes Tailwind, pas de style inline sauf framer-motion
- Utiliser `cn()` (lib/utils.ts) pour combiner les classes conditionnelles
- Contenu statique dans src/content/*.json, traduit via messages/fr.json et messages/de.json

## Règles métier critiques
1. Le numéro d'inscription suit le format IDS-YYYY-XXXXXX (6 chiffres zero-padded)
2. Pas d'upload de photo dans le formulaire d'inscription
3. TypeCours et ModeCours : EN_LIGNE dans TypeCours implique automatiquement modeCours = EN_LIGNE
4. Après soumission, envoyer email de confirmation via Resend + générer PDF
5. Les stats en façade (2000+ étudiants, 95% réussite) sont statiques dans les messages i18n
6. Protéger /admin avec role=ADMIN et /espace-etudiant avec role=ETUDIANT via middleware

## Structure des données
- Cours, témoignages, équipe : src/content/*.json (statique, multilingue)
- Inscriptions, users, email logs : PostgreSQL via Prisma
- Images : public/images/{cours,equipe,hero,temoignages,logos}/

## Coordonnées de l'antenne Cameroun (à utiliser partout)
- Adresse : Douala, Akwa — Cameroun / Yaoundé, Bastos — Cameroun
- Téléphone : +237 675 123 456
- Email : info@ids-cameroun.com
- Site : www.ids-cameroun.com
- Horaires : Lun-Sam 8h00-20h00