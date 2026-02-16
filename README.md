# diederick-starter

Template de base pour les projets Next.js + Supabase + Gemini, avec une bibliothèque de patterns prêts à l'emploi.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **Supabase** (Auth, PostgreSQL, RLS, pgvector)
- **Google Gemini** (IA principale)
- **OpenAI** (embeddings text-embedding-3-small, 768 dimensions)
- **Langfuse** (observabilité LLM)
- **Pino** (logging structuré)

## Démarrer un nouveau projet

```bash
# Copier le starter dans un nouveau dossier
cp -r ~/diederick-starter mon-nouveau-projet
cd mon-nouveau-projet

# Nettoyer et initialiser
rm -rf .git
git init
npm install

# Configurer l'environnement
cp .env.example .env.local
# → Remplir les valeurs dans .env.local

# Initialiser la base de données
npm run setup-db

# Lancer
npm run dev
```

> Voir [QUICK-START.md](QUICK-START.md) pour un guide pas-à-pas.

## Structure du projet

```
app/                    → Routes et API (App Router)
  api/
    chat/route.ts       → Endpoint chat Gemini
    health/route.ts     → Health check
  layout.tsx            → Layout racine
  page.tsx              → Page d'accueil

components/             → Composants React réutilisables
  ui/                   → Primitives (Button, Card)
  layout/               → Header
  chat/                 → ChatInterface

lib/                    → Logique métier et utilitaires
  supabase/
    client.ts           → Client browser (@supabase/ssr)
    server.ts           → Client serveur (SSR + cookies)
    admin.ts            → Client admin (service_role)
    middleware.ts       → Refresh de session
  ai/
    gemini.ts           → Client Gemini (generateText, generateChatResponse)
    langfuse.ts         → Singleton Langfuse
  embeddings/
    index.ts            → Abstraction embeddings (768 dims)
  logger.ts             → Logger Pino
  utils.ts              → cn() helper

database/
  migrations/
    001_init.sql        → Profils, triggers, RLS
    002_pgvector.sql    → Extension vector, table documents, recherche sémantique

scripts/
  setup-db.mjs          → Script d'initialisation DB

types/
  index.ts              → Types partagés

PATTERNS/               → Bibliothèque de patterns réutilisables (15 patterns)
  api-wrappers/         → Supabase, Gemini, Embeddings, Langfuse, Logger, Google Sheets
  components/           → Chat Interface, Quiz Player, Voice Agent
  recipes/              → API Route, Middleware Auth, Document Ingestion, Tailwind, Docker
  troubleshooting/      → Erreurs courantes et solutions
```

## Utiliser les PATTERNS pendant le dev

Le dossier `PATTERNS/` contient 15 patterns documentés, extraits de 28+ projets. Chaque fichier est un guide copier-coller avec du code réel.

### Avec Cursor (@Docs)

Référencer un pattern directement dans le chat Cursor :

```
@Docs /PATTERNS/api-wrappers/supabase.md
@Docs /PATTERNS/api-wrappers/gemini.md
@Docs /PATTERNS/components/chat-interface.md
@Docs /PATTERNS/recipes/api-route.md
```

Cursor utilisera le contenu du pattern comme contexte pour générer du code adapté à ta stack.

### Avec Claude Code

Demander à Claude de lire un pattern avant d'implémenter :

```
Lis /PATTERNS/recipes/document-ingestion.md puis implémente l'ingestion de documents pour ce projet.
```

### Index rapide des patterns

| Catégorie | Patterns |
|-----------|----------|
| **API Wrappers** | Supabase, Gemini, Embeddings, Langfuse, Logger, Google Sheets |
| **Components** | Chat Interface, Quiz Player, Voice Agent |
| **Recipes** | API Route, Middleware Auth, Document Ingestion, Tailwind Design System, .cursorrules, Docker + Railway |
| **Troubleshooting** | Erreurs courantes et solutions |

> Voir [PATTERNS/README.md](PATTERNS/README.md) pour l'index complet avec liens.

## Conventions

- **Commentaires** en français, **code** en anglais
- **Imports** : toujours `@/` (alias configuré)
- **Composants** : named exports, `'use client'` seulement quand nécessaire
- **Classes CSS** : combiner avec `cn()` de `@/lib/utils`
- **Logs** : `createLogger("module")` — pas de `console.log`
- **Embeddings** : toujours 768 dimensions
- **Supabase** : 3 clients (client/server/admin), RLS sur toutes les tables

## Variables d'environnement

| Variable | Requis | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Oui | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Oui | Clé anonyme Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Oui | Clé service role (admin) |
| `GEMINI_API_KEY` | Oui | Clé API Google Gemini |
| `OPENAI_API_KEY` | Si embeddings | Clé API OpenAI |
| `LANGFUSE_SECRET_KEY` | Optionnel | Clé secrète Langfuse |
| `LANGFUSE_PUBLIC_KEY` | Optionnel | Clé publique Langfuse |
| `LANGFUSE_BASE_URL` | Optionnel | URL Langfuse (défaut: cloud) |
| `LOG_LEVEL` | Optionnel | Niveau de log (défaut: debug en dev, info en prod) |

## Commandes

```bash
npm run dev         # Serveur de développement
npm run build       # Build production
npm run start       # Serveur production
npm run lint        # ESLint
npm run setup-db    # Initialisation base de données
```
