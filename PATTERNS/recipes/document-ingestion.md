# Recipe: Document Ingestion (Chunking + Embedding + Supabase)

> Script complet pour ingérer des documents : lecture → chunking intelligent → embedding → insertion Supabase.
> Source : `chatbot-slbo/scripts/ingest-documents.ts`

## Quand l'utiliser

- Alimenter une base de connaissances RAG
- Indexer des PDFs, docs texte, transcriptions
- Préparer les données pour la recherche sémantique

## Quand NE PAS l'utiliser

- Documents qui changent souvent (utiliser un pipeline temps réel)
- Moins de 5 documents (insertion manuelle suffit)

## Code

### Types

```typescript
interface DocumentChunk {
  content: string;
  source: string;        // Identifiant du document source
  page: number | null;
  section: string;
  metadata: Record<string, unknown>;
}
```

### Stratégies de chunking

#### 1. Par sections (documents structurés)

```typescript
function chunkBySection(content: string, source: string): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const lines = content.split('\n');
  const sectionStarts: { index: number; title: string }[] = [];

  // Détecter les titres de section
  let charIndex = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    // Adapter le pattern selon le format du document
    if (/^(#{1,3}\s|[IVX]+\.\s|\d+\.\s|[A-Z]\.\s)/.test(trimmed)) {
      sectionStarts.push({ index: charIndex, title: trimmed });
    }
    charIndex += line.length + 1;
  }

  // Extraire le contenu de chaque section
  for (let i = 0; i < sectionStarts.length; i++) {
    const start = sectionStarts[i].index;
    const end = i < sectionStarts.length - 1
      ? sectionStarts[i + 1].index
      : content.length;
    const sectionContent = content.slice(start, end).trim();

    if (sectionContent.length > 2000) {
      // Section trop longue → sous-découper
      const subChunks = splitIntoChunks(sectionContent, 2000);
      subChunks.forEach((sub, idx) => {
        chunks.push({
          content: sub,
          source,
          page: null,
          section: `${sectionStarts[i].title} (partie ${idx + 1})`,
          metadata: { partIndex: idx },
        });
      });
    } else if (sectionContent.length > 100) {
      chunks.push({
        content: sectionContent,
        source,
        page: null,
        section: sectionStarts[i].title,
        metadata: {},
      });
    }
  }

  // Fallback si aucune section détectée
  if (chunks.length === 0) {
    return splitIntoChunks(content, 2000).map((chunk, idx) => ({
      content: chunk,
      source,
      page: null,
      section: `Section ${idx + 1}`,
      metadata: {},
    }));
  }

  return chunks;
}
```

#### 2. Par taille fixe (texte non structuré)

```typescript
/**
 * Découpe un texte en chunks de taille max.
 * Priorité de coupure : paragraphe > phrase > force
 */
function splitIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length + 2 <= maxLength) {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    } else {
      if (currentChunk) chunks.push(currentChunk);

      if (paragraph.length > maxLength) {
        // Paragraphe trop long → couper par phrases
        const sentences = paragraph.split(/(?<=[.!?])\s+/);
        currentChunk = '';

        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length + 1 <= maxLength) {
            currentChunk += (currentChunk ? ' ' : '') + sentence;
          } else {
            if (currentChunk) chunks.push(currentChunk);
            if (sentence.length > maxLength) {
              // Force cut
              for (let i = 0; i < sentence.length; i += maxLength) {
                chunks.push(sentence.slice(i, i + maxLength));
              }
              currentChunk = '';
            } else {
              currentChunk = sentence;
            }
          }
        }
      } else {
        currentChunk = paragraph;
      }
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}
```

### Script d'ingestion complet

```typescript
// scripts/ingest-documents.ts
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Validation des variables d'environnement
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Variables manquantes: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// --- Embedding ---
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replace(/\n/g, ' ').trim(),
    dimensions: 768,
  });
  return response.data[0].embedding;
}

// --- Insertion ---
async function insertChunk(chunk: DocumentChunk, embedding: number[]) {
  const { error } = await supabase
    .from('documents')  // Adapter le nom de la table
    .insert({
      content: chunk.content,
      embedding,
      source: chunk.source,
      page: chunk.page,
      section: chunk.section,
      metadata: chunk.metadata,
    });

  if (error) throw new Error(`Erreur Supabase: ${error.message}`);
}

// --- Main ---
async function main() {
  console.log('Démarrage de l\'ingestion...\n');

  const dataDir = path.join(process.cwd(), 'data');
  let totalChunks = 0;

  // Lister les fichiers à ingérer
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));

  for (const file of files) {
    console.log(`Traitement de ${file}...`);
    const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
    const chunks = chunkBySection(content, file.replace(/\.\w+$/, ''));

    console.log(`  → ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      process.stdout.write(`  Embedding ${i + 1}/${chunks.length}...\r`);
      const embedding = await generateEmbedding(chunks[i].content);
      await insertChunk(chunks[i], embedding);
    }

    console.log(`  ✅ ${chunks.length} chunks insérés`);
    totalChunks += chunks.length;
  }

  console.log(`\n✅ Total : ${totalChunks} chunks insérés`);
}

main().catch((err) => {
  console.error('Erreur:', err);
  process.exit(1);
});
```

### Exécution

```bash
# Avec ts-node
npx ts-node scripts/ingest-documents.ts

# Avec tsx (plus rapide)
npx tsx scripts/ingest-documents.ts
```

## Schema Supabase

```sql
create extension if not exists vector;

create table documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(768),
  source text not null,
  page int,
  section text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Index après insertion initiale
create index on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/recipes/document-ingestion.md
Crée un script d'ingestion pour alimenter ma base RAG depuis des fichiers texte
```

## Checklist

- [ ] Dossier `data/` avec les fichiers à ingérer
- [ ] Table `documents` créée avec colonne `vector(768)`
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Stratégie de chunking adaptée au format des documents
- [ ] Max chunk size ≤ 2000 chars (~500 tokens)
- [ ] Index `ivfflat` créé après la première ingestion

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Chunks trop gros | maxLength trop élevé | Baisser à 1500-2000 |
| Chunks trop petits | Sections courtes | Merger les sections < 100 chars |
| Embedding timeout | Trop de requêtes | Ajouter `await sleep(100)` entre les appels |
| Doublons en base | Script relancé | Vider la table avant ou ajouter un check |
