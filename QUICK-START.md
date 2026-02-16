# Quick Start

5 étapes pour lancer un nouveau projet depuis le starter.

## 1. Copier le starter

```bash
cp -r ~/diederick-starter mon-nouveau-projet
cd mon-nouveau-projet
rm -rf .git
git init
```

## 2. Installer les dépendances

```bash
npm install
```

## 3. Configurer l'environnement

```bash
cp .env.example .env.local
```

Remplir les valeurs dans `.env.local` :

| Variable | Où la trouver |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (attention: secret) |
| `GEMINI_API_KEY` | Google AI Studio → API Keys |
| `OPENAI_API_KEY` | OpenAI Platform → API Keys (si embeddings) |

## 4. Initialiser la base de données

```bash
npm run setup-db
```

Ce script exécute les migrations dans `database/migrations/` :
- `001_init.sql` : Table profils, triggers, RLS
- `002_pgvector.sql` : Extension vector, table documents, recherche sémantique

## 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir http://localhost:3000 pour vérifier que tout fonctionne.

---

## Et ensuite ?

Utiliser les **PATTERNS** comme référence pendant le dev :

```
# Dans Cursor
@Docs /PATTERNS/api-wrappers/supabase.md    → pour ajouter des requêtes Supabase
@Docs /PATTERNS/components/chat-interface.md → pour un chat IA
@Docs /PATTERNS/recipes/api-route.md         → pour créer une API route

# Dans Claude Code
Lis /PATTERNS/recipes/document-ingestion.md puis implémente l'ingestion.
```

Voir [PATTERNS/README.md](PATTERNS/README.md) pour la liste complète des 15 patterns disponibles.
