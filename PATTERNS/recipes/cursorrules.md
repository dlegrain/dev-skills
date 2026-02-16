# Recipe: .cursorrules

> Fichier de règles Cursor IDE pour standardiser les conventions du projet.
> Source : `starter_pack/.cursorrules`

## Quand l'utiliser

- Tout nouveau projet Next.js
- Collaborer avec Cursor AI en respectant tes conventions
- Garantir la cohérence du code généré par l'IA

## Code

### `.cursorrules` complet

```markdown
# Règles Cursor pour les projets Diederick

## Stack technique
- **Framework** : Next.js 16+ (App Router uniquement, pas de Pages Router)
- **Langage** : TypeScript strict
- **Styling** : Tailwind CSS v4, jamais de CSS modules ni styled-components
- **Base de données** : Supabase (PostgreSQL + Auth + RLS)
- **IA principale** : Google Gemini via @google/generative-ai
- **Embeddings** : OpenAI text-embedding-3-small (768 dimensions)
- **Observabilité** : Langfuse pour le tracing LLM, Pino pour les logs applicatifs
- **Icônes** : lucide-react

## Conventions de code
- Commentaires et messages utilisateur en **français**
- Noms de variables et fonctions en **anglais**
- Utiliser `@/` pour tous les imports (path alias configuré)
- Composants React : named exports (`export function Button`), pas de default exports
- Directive `'use client'` uniquement quand nécessaire (hooks, event handlers)
- Toujours utiliser `cn()` de `@/lib/utils` pour combiner les classes Tailwind

## Architecture Supabase
- **3 clients** : `client.ts` (browser), `server.ts` (SSR), `admin.ts` (service_role)
- Toujours utiliser `@supabase/ssr` pour le SSR, jamais `@supabase/supabase-js` directement côté serveur
- RLS activé sur toutes les tables
- UUIDs pour les primary keys (`gen_random_uuid()`)
- `created_at TIMESTAMPTZ DEFAULT NOW()` sur chaque table
- Trigger `update_updated_at()` sur chaque table modifiable

## Patterns obligatoires
- Logger avec `createLogger("module/name")` — jamais de `console.log` en production
- Validation des variables d'environnement à l'initialisation (throw si manquante)
- API routes : toujours un try/catch avec log de l'erreur
- Embeddings : toujours 768 dimensions, jamais 1536

## Structure de fichiers
app/              → Routes et API (App Router)
components/       → Composants React réutilisables
  ui/             → Primitives (Button, Card, etc.)
  layout/         → Header, Footer, Sidebar
  chat/           → Composants de chat
lib/              → Logique métier et utilitaires
  supabase/       → Clients Supabase (client, server, admin, middleware)
  ai/             → Gemini, Langfuse
  embeddings/     → Abstraction embeddings
  hooks/          → Custom React hooks
database/
  migrations/     → Fichiers SQL numérotés (001_xxx.sql, 002_xxx.sql)
scripts/          → Scripts Node.js (setup-db, ingestion, etc.)
types/            → Types TypeScript partagés

## Ce qu'il ne faut PAS faire
- Ne jamais stocker de clés API dans le code source
- Ne pas utiliser `any` — typer explicitement
- Ne pas mélanger Server Components et Client Components dans le même fichier
- Ne pas utiliser `@supabase/supabase-js` directement dans les Server Components
- Ne pas créer d'embeddings en 1536 dimensions — toujours 768
```

### Installation

Copier le fichier à la racine du projet :

```bash
cp PATTERNS/recipes/cursorrules-template.md .cursorrules
```

## Personnalisation

Adapter selon le projet :
- **Stack** : Changer Gemini → OpenAI si besoin
- **Conventions** : Ajouter des conventions spécifiques au projet
- **Structure** : Adapter si le projet a une structure différente
- **Interdit** : Ajouter des anti-patterns spécifiques au domaine

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/recipes/cursorrules.md
Crée le fichier .cursorrules pour mon nouveau projet Next.js
```
