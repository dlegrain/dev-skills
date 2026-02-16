# Troubleshooting — Erreurs courantes

> Solutions rapides pour les erreurs fréquentes dans les projets Next.js + Supabase + Gemini.

## Supabase

### `cookies()` — cannot be called during prerendering
**Cause** : `cookies()` appelé dans un composant qui est pré-rendu statiquement.
**Solution** :
```typescript
// Forcer le rendu dynamique
export const dynamic = "force-dynamic";
// OU utiliser le client browser dans les Client Components
import { createClient } from "@/lib/supabase/client";
```

### Session non rafraîchie / utilisateur déconnecté
**Cause** : Middleware manquant ou mal configuré.
**Solution** :
- Vérifier que `middleware.ts` est à la RACINE du projet
- Vérifier le `matcher` (ne doit pas exclure les routes API)
- Utiliser `getUser()` au lieu de `getSession()` (sécurité)

### RLS bloque les requêtes
**Cause** : Utilisation du client anon sans policy appropriée.
**Solution** :
- Vérifier les RLS policies dans Supabase Dashboard
- Pour les scripts/admin : utiliser `createAdminClient()` (bypass RLS)
- Ne JAMAIS utiliser admin client côté browser

### `setAll` erreur dans Server Component
**Cause** : Normal. `cookieStore.set()` ne fonctionne pas dans les Server Components (read-only).
**Solution** : L'erreur est catchée silencieusement. Le middleware se charge du refresh.

## Gemini

### `SAFETY` — réponse bloquée
**Cause** : Le contenu est filtré par les safety settings.
**Solution** :
```typescript
// Ajuster le threshold (attention au domaine)
{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH }
```

### Réponse vide
**Cause** : `maxOutputTokens` trop bas ou prompt trop long.
**Solution** :
- Augmenter `maxOutputTokens` (1000 → 2000)
- Réduire la taille du contexte RAG
- Vérifier les logs : `response.text()` retourne quoi ?

### `usageMetadata` undefined
**Cause** : Version du SDK trop ancienne.
**Solution** : `npm install @google/generative-ai@latest` (≥ 0.21)

### Rate limiting (429)
**Cause** : Trop de requêtes par minute.
**Solution** :
- Ajouter un délai entre les requêtes batch
- Utiliser un modèle différent (flash-lite pour extraction)
- Implémenter un queue system

## Embeddings

### Dimension mismatch
**Cause** : Les embeddings en base n'ont pas la même dimension que les nouveaux.
**Solution** :
- Toujours utiliser la même `EMBEDDING_DIMENSION` (768)
- Si changement de modèle → réindexer TOUS les documents
- Vérifier : `select array_length(embedding, 1) from documents limit 1;`

### Similarité toujours basse (< 0.5)
**Cause** : Textes trop courts ou trop génériques.
**Solution** :
- Enrichir le contenu avant embedding (ajouter contexte)
- Baisser le `match_threshold` (0.7 → 0.5)
- Vérifier que les embeddings sont bien des `vector(768)` et pas des `text`

### `\n` dans les embeddings
**Cause** : Les newlines affectent la qualité de l'embedding.
**Solution** : Toujours nettoyer : `text.replace(/\n/g, " ").trim()`

## Langfuse

### Pas de traces dans le dashboard
**Cause** : Clés manquantes ou `flushAsync` non appelé.
**Solution** :
1. Vérifier `LANGFUSE_SECRET_KEY` et `LANGFUSE_PUBLIC_KEY`
2. Ajouter `await flushLangfuse()` dans le `finally` block
3. En serverless, toujours flush avant la fin de la requête

### Traces incomplètes
**Cause** : `flushAsync` appelé trop tôt (avant fin du traitement).
**Solution** : Toujours dans `finally` :
```typescript
try {
  // ...traitement
} finally {
  await flushLangfuse();
}
```

## Pino Logger

### `pino-pretty` not found
**Cause** : Pas installé en dépendance.
**Solution** : `npm install pino-pretty`

### Logs pas colorés en dev
**Cause** : `NODE_ENV` est `production` ou code exécuté côté client.
**Solution** : Vérifier `NODE_ENV` et le guard `isServer`.

## Next.js

### `Error: Dynamic server usage`
**Cause** : Utilisation de `cookies()`, `headers()`, ou `searchParams` dans un composant statique.
**Solution** :
```typescript
export const dynamic = "force-dynamic";
```

### Middleware ne s'exécute pas
**Cause** : Fichier mal placé ou matcher incorrect.
**Solution** :
- `middleware.ts` doit être à la RACINE (même niveau que `app/`)
- Pas dans `app/middleware.ts` !
- Vérifier le `matcher` regex

### Build échoue avec `window is undefined`
**Cause** : Code browser exécuté côté serveur.
**Solution** :
```typescript
const isServer = typeof window === "undefined";
// ou
import dynamic from "next/dynamic";
const Component = dynamic(() => import("./Component"), { ssr: false });
```
