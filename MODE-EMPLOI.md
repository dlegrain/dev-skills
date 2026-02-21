# Mode d'emploi — diederick-starter

## C'est quoi ?

Un template personnel pour lancer n'importe quel nouveau projet web sans repartir de zéro.

Deux choses fusionnées en un seul dossier :

1. **Un projet Next.js prêt à l'emploi** — toute la stack déjà câblée (Supabase, Gemini, embeddings, Langfuse, Pino, Tailwind v4, TypeScript strict)
2. **15 patterns réutilisables** dans `PATTERNS/` — du code réel extrait de 28+ projets, documenté, copier-coller ready

## Lancer un nouveau projet

```bash
cp -r ~/diederick-starter mon-nouveau-projet
cd mon-nouveau-projet
rm -rf .git && git init
npm install
cp .env.example .env.local   # remplir les clés API
npm run setup-db              # créer les tables Supabase
npm run dev                   # http://localhost:3000
```

Ensuite : supprimer ce dont tu n'as pas besoin, ajouter ce qui manque.

## Utiliser les PATTERNS pendant le dev

Le dossier `PATTERNS/` est ta documentation personnelle. Au lieu de fouiller dans tes anciens projets pour retrouver comment tu avais fait tel truc, tu pointes ton IA vers le bon fichier.

### Dans Cursor

Utiliser `@Docs` pour donner le contexte d'un pattern à Cursor :

```
@Docs /PATTERNS/api-wrappers/supabase.md
Crée-moi une API route pour lister les utilisateurs avec pagination.
```

```
@Docs /PATTERNS/components/chat-interface.md
Ajoute un chat widget dans la page dashboard.
```

```
@Docs /PATTERNS/recipes/document-ingestion.md
Implémente l'ingestion de PDFs avec chunking et embeddings.
```

Cursor génère du code qui suit tes conventions parce qu'il a le pattern complet comme contexte.

### Dans Claude Code

Même principe, demander à Claude de lire le pattern d'abord :

```
Lis /PATTERNS/api-wrappers/gemini.md puis ajoute un endpoint de résumé de texte.
```

```
Lis /PATTERNS/recipes/middleware-auth.md puis protège les routes /dashboard/*.
```

## Quel pattern utiliser ?

| Tu veux... | Pattern |
|---|---|
| Requêtes Supabase (client/server/admin) | `PATTERNS/api-wrappers/supabase.md` |
| Appels Gemini (chat, streaming, extraction) | `PATTERNS/api-wrappers/gemini.md` |
| Recherche sémantique (embeddings + vector) | `PATTERNS/api-wrappers/embeddings.md` |
| Observabilité LLM | `PATTERNS/api-wrappers/langfuse.md` |
| Logging structuré | `PATTERNS/api-wrappers/logger.md` |
| Connecter Google Sheets | `PATTERNS/api-wrappers/google-sheets.md` |
| Chat IA (widget + messages) | `PATTERNS/components/chat-interface.md` |
| Quiz interactif (timer, Supabase) | `PATTERNS/components/quiz-player.md` |
| Agent vocal (ElevenLabs) | `PATTERNS/components/voice-agent.md` |
| Créer une API route propre | `PATTERNS/recipes/api-route.md` |
| Middleware auth Supabase | `PATTERNS/recipes/middleware-auth.md` |
| Ingestion de documents (chunking) | `PATTERNS/recipes/document-ingestion.md` |
| Design system Tailwind | `PATTERNS/recipes/tailwind-design-system.md` |
| Config .cursorrules | `PATTERNS/recipes/cursorrules.md` |
| Déployer avec Docker + Railway | `PATTERNS/recipes/docker-railway.md` |
| Debugger une erreur courante | `PATTERNS/troubleshooting/common-errors.md` |

## Structure rapide

```
app/                → Routes et pages (App Router)
components/         → Composants React (ui, layout, chat)
lib/                → Logique métier (supabase, ai, embeddings, logger)
database/           → Migrations SQL
scripts/            → Scripts utilitaires
PATTERNS/           → Bibliothèque de patterns (ce que tu lis, pas ce que tu exécutes)
```

## Rappels

- Commentaires en français, code en anglais
- Imports : toujours `@/`
- Logs : `createLogger("module")`, jamais `console.log`
- Supabase : 3 clients (client/server/admin), RLS sur toutes les tables
- Embeddings : toujours 768 dimensions
