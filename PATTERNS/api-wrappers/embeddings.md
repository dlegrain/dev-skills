# OpenAI Embeddings + Vector Search

> Embeddings OpenAI text-embedding-3-small (768 dims) avec batch support et pgvector search.
> Sources : `starter_pack/lib/embeddings/`, `chatbot-medical-v2/lib/embeddings.ts`

## Quand l'utiliser

- Tout projet RAG (Retrieval-Augmented Generation)
- Recherche sémantique dans une base de documents
- Indexation de documents pour chatbot

## Quand NE PAS l'utiliser

- Recherche full-text simple (utiliser `tsvector` PostgreSQL)
- Documents < 10 (recherche par mots-clés suffit)

## Contexte

- `text-embedding-3-small` : meilleur rapport qualité/prix OpenAI
- 768 dimensions : bon compromis performance/qualité (max 1536)
- Compatible pgvector + cosine similarity dans Supabase
- Singleton client OpenAI pour éviter recréation

## Code

### Version concise (starter_pack)

```typescript
import OpenAI from "openai";
import { logger } from "@/lib/logger";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSION = 768;

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY manquante pour les embeddings");
  }

  openaiClient = new OpenAI({ apiKey });
  return openaiClient;
}

/** Génère un embedding pour un texte donné */
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const input = text.replace(/\n/g, " ").trim();

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input,
    dimensions: EMBEDDING_DIMENSION,
  });

  logger.debug({ model: EMBEDDING_MODEL, dimensions: EMBEDDING_DIMENSION }, "Embedding généré");
  return response.data[0].embedding;
}

/** Génère des embeddings en batch */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const openai = getOpenAI();
  const inputs = texts.map((t) => t.replace(/\n/g, " ").trim());

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: inputs,
    dimensions: EMBEDDING_DIMENSION,
  });

  logger.debug(
    { model: EMBEDDING_MODEL, count: texts.length, dimensions: EMBEDDING_DIMENSION },
    "Embeddings batch générés"
  );

  return response.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

export const embeddingDimension = EMBEDDING_DIMENSION;
```

### Version complète (chatbot-medical-v2)

Ajoute : validation de dimension, normalizeVector, input validation, document embedding alias.

```typescript
/** Vérification de la dimension retournée */
const embedding = response.data[0].embedding;
if (embedding.length !== EMBEDDING_DIMENSION) {
  console.warn(`Dimension inattendue: ${embedding.length} (attendu: ${EMBEDDING_DIMENSION})`);
}

/** Normalise un vecteur (norme = 1) */
export function normalizeVector(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (magnitude === 0) return vector;
  return vector.map((val) => val / magnitude);
}

/** Health check */
export async function checkEmbeddingModel(): Promise<boolean> {
  try {
    const embedding = await generateEmbedding('test');
    return embedding.length === EMBEDDING_DIMENSION;
  } catch {
    return false;
  }
}
```

### Vector Search (SQL Supabase)

```sql
-- Créer l'extension pgvector
create extension if not exists vector;

-- Table documents avec embedding
create table documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(768),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Index pour recherche rapide
create index on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Fonction de recherche sémantique
create or replace function match_documents(
  query_embedding vector(768),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from documents d
  where 1 - (d.embedding <=> query_embedding) > match_threshold
  order by d.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

### Appel depuis TypeScript

```typescript
import { createClient } from "@/lib/supabase/server";
import { generateEmbedding } from "@/lib/embeddings";

export async function searchDocuments(query: string, limit = 5) {
  const supabase = await createClient();
  const embedding = await generateEmbedding(query);

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: limit,
  });

  if (error) throw error;
  return data;
}
```

## Variables d'environnement

```env
OPENAI_API_KEY=sk-...
```

## Dépendances

```bash
npm install openai
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/embeddings.md
Crée le système d'embeddings + vector search pour mon projet RAG
```

## Checklist

- [ ] `OPENAI_API_KEY` configuré
- [ ] Extension `pgvector` activée dans Supabase
- [ ] Table avec colonne `vector(768)`
- [ ] Index `ivfflat` créé (après insertion de données)
- [ ] Fonction `match_documents` créée
- [ ] Dimension identique entre indexation et recherche (768)

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Dimension mismatch | Modèle ou dimension changé | Réindexer tous les documents |
| Similarité toujours basse | Textes trop courts | Enrichir le contenu avant embedding |
| Batch timeout | Trop de textes | Limiter à 100 textes par batch |
| Index ivfflat lent | Pas assez de `lists` | Augmenter `lists` (√n recommandé) |
| Résultats incohérents | `\n` dans le texte | Nettoyer avec `.replace(/\n/g, " ")` |
