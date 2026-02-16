# Langfuse Observability

> Singleton Langfuse avec dégradation gracieuse + wrapper de traçage pour Gemini.
> Sources : `starter_pack/lib/ai/langfuse.ts`, `eval-cosep-v2/lib/langfuse.ts`

## Quand l'utiliser

- Tout projet avec appels LLM à tracer (coût, latence, erreurs)
- Besoin de métriques par utilisateur/module
- Mode anonyme pour données RGPD sensibles

## Quand NE PAS l'utiliser

- Prototype rapide sans besoin de monitoring
- Développement local uniquement (Langfuse se désactive automatiquement si non configuré)

## Contexte

- Singleton : une seule instance Langfuse par process
- Dégradation gracieuse : si les clés manquent, le code continue sans traçage
- `flushAsync()` obligatoire en fin de requête (serverless = pas de garantie de persistence)
- Mode anonyme : trace les tokens/coûts sans stocker le contenu (RGPD)

## Code

### Version minimale (starter_pack)

```typescript
import { Langfuse } from "langfuse";
import { logger } from "@/lib/logger";

let langfuseInstance: Langfuse | null = null;

/**
 * Retourne l'instance Langfuse (singleton).
 * Retourne null si les clés ne sont pas configurées.
 */
export function getLangfuse(): Langfuse | null {
  if (langfuseInstance) return langfuseInstance;

  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const baseUrl = process.env.LANGFUSE_BASE_URL;

  if (!secretKey || !publicKey) {
    logger.warn("Langfuse non configuré — clés manquantes");
    return null;
  }

  langfuseInstance = new Langfuse({
    secretKey,
    publicKey,
    baseUrl: baseUrl || "https://cloud.langfuse.com",
  });

  logger.info("Langfuse initialisé");
  return langfuseInstance;
}
```

### Version complète avec traçage (eval-cosep-v2)

```typescript
import { Langfuse } from 'langfuse';

let langfuseInstance: Langfuse | null = null;

function getLangfuse(): Langfuse | null {
  if (!process.env.LANGFUSE_SECRET_KEY || !process.env.LANGFUSE_PUBLIC_KEY) {
    console.warn('Langfuse credentials not configured. Tracing disabled.');
    return null;
  }

  if (!langfuseInstance) {
    langfuseInstance = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: process.env.LANGFUSE_BASE_URL || 'https://cloud.langfuse.com',
    });
  }

  return langfuseInstance;
}

interface TraceMetadata {
  userId?: string;
  module?: number;
  functionName: string;
  sessionId?: string;
  anonymous?: boolean;    // true = pas de userId ni de contenu (RGPD)
}

/** Estimation tokens : ~4 chars = 1 token (français) */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Wrapper pour tracer un appel LLM avec Langfuse.
 * Mode anonyme : trace uniquement tokens et métriques, pas le contenu.
 */
export async function tracedGenerateContent<T>(
  metadata: TraceMetadata,
  input: string,
  generateFn: () => Promise<T>
): Promise<T> {
  const langfuse = getLangfuse();
  if (!langfuse) return generateFn();

  const startTime = Date.now();

  const trace = langfuse.trace({
    name: metadata.functionName,
    userId: metadata.anonymous ? undefined : metadata.userId,
    metadata: {
      module: metadata.module,
      sessionId: metadata.sessionId,
      anonymous: metadata.anonymous || false,
    },
  });

  try {
    const result = await generateFn();
    const latencyMs = Date.now() - startTime;

    let outputText = '';
    if (typeof result === 'string') {
      outputText = result;
    } else if (result && typeof result === 'object') {
      outputText = JSON.stringify(result);
    }

    const inputTokens = estimateTokens(input);
    const outputTokens = estimateTokens(outputText);

    trace.generation({
      name: metadata.functionName,
      model: 'gemini-2.5-flash',
      input: metadata.anonymous ? undefined : input,
      output: metadata.anonymous ? undefined : outputText,
      usage: {
        input: inputTokens,
        output: outputTokens,
        total: inputTokens + outputTokens,
      },
      metadata: {
        latencyMs,
        estimatedCost: calculateCost(inputTokens, outputTokens),
      },
    });

    await langfuse.flushAsync();
    return result;
  } catch (error: any) {
    trace.generation({
      name: metadata.functionName,
      model: 'gemini-2.5-flash',
      input: metadata.anonymous ? undefined : input,
      level: 'ERROR',
      statusMessage: error.message,
      metadata: { latencyMs: Date.now() - startTime },
    });

    await langfuse.flushAsync();
    throw error;
  }
}

/** Gemini Flash pricing: $0.075/1M input, $0.30/1M output */
function calculateCost(inputTokens: number, outputTokens: number): number {
  return (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.30;
}

/** Flush en fin de requête API */
export async function flushLangfuse(): Promise<void> {
  const langfuse = getLangfuse();
  if (langfuse) await langfuse.flushAsync();
}
```

### Usage dans une API route

```typescript
import { tracedGenerateContent, flushLangfuse } from "@/lib/langfuse";

export async function POST(request: Request) {
  try {
    const result = await tracedGenerateContent(
      {
        functionName: "chatbot-message",
        userId: "user@example.com",
        anonymous: false,
      },
      userMessage,
      () => generateResponse(systemPrompt, context)
    );

    return NextResponse.json({ response: result.text });
  } finally {
    await flushLangfuse(); // Toujours flush en fin de requête
  }
}
```

## Variables d'environnement

```env
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_BASE_URL=https://cloud.langfuse.com  # Optionnel (défaut)
```

## Dépendances

```bash
npm install langfuse
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/langfuse.md
Ajoute le traçage Langfuse à mes appels Gemini
```

## Checklist

- [ ] Clés Langfuse configurées (ou vérifier que la dégradation fonctionne)
- [ ] `flushAsync()` appelé en fin de chaque API route
- [ ] Mode anonyme activé pour les données sensibles
- [ ] Coûts estimés ajustés selon le modèle utilisé

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Pas de traces | Clés manquantes | Vérifier `LANGFUSE_SECRET_KEY` et `LANGFUSE_PUBLIC_KEY` |
| Traces incomplètes | `flushAsync` manquant | Ajouter dans `finally` block |
| Coûts incorrects | Pricing outdated | Mettre à jour `calculateCost` |
| Données RGPD dans traces | Mode anonyme non activé | `anonymous: true` |
