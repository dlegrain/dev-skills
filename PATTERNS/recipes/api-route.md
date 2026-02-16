# Recipe: API Route avec Error Handling + Logging

> Pattern standard pour les API routes Next.js avec validation, logging structuré, et error handling.
> Source : `starter_pack/app/api/chat/route.ts`

## Quand l'utiliser

- Toute API route Next.js App Router
- Besoin de logs structurés par route
- Validation des inputs + error handling cohérent

## Code

### Pattern de base

```typescript
import { NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const log = createLogger("api/chat");

export async function POST(request: Request) {
  try {
    // 1. Validation des inputs
    const body = await request.json();
    const { messages, systemPrompt } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages requis" },
        { status: 400 }
      );
    }

    // 2. Log de la requête
    log.info({ messageCount: messages.length }, "Requête reçue");

    // 3. Traitement
    const response = await processMessages(messages, systemPrompt);

    // 4. Log de la réponse
    log.info({ responseLength: response.length }, "Réponse envoyée");

    return NextResponse.json({ response });
  } catch (error) {
    // 5. Log d'erreur structuré
    log.error({ error }, "Erreur dans /api/chat");

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
```

### Pattern complet (avec Langfuse + auth)

```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLogger } from "@/lib/logger";
import { tracedGenerateContent, flushLangfuse } from "@/lib/langfuse";
import { generateResponse } from "@/lib/ai/gemini";
import { searchDocuments } from "@/lib/embeddings";

const log = createLogger("api/chat");

export async function POST(request: Request) {
  try {
    // 1. Auth check
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // 2. Validation
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    log.info({ userId: user.id, messageLength: message.length }, "Requête chat");

    // 3. RAG: recherche de documents pertinents
    const chunks = await searchDocuments(message, 5);

    // 4. Génération avec traçage Langfuse
    const result = await tracedGenerateContent(
      { functionName: "chat", userId: user.email ?? user.id },
      message,
      () => generateResponse(
        SYSTEM_PROMPT,
        { userMessage: message, relevantChunks: chunks.map(c => c.content), conversationHistory }
      )
    );

    log.info({ tokens: result.usage.totalTokens }, "Réponse générée");

    return NextResponse.json({
      response: result.text,
      sources: chunks.map(c => ({ content: c.content, similarity: c.similarity })),
    });
  } catch (error) {
    log.error({ error }, "Erreur /api/chat");
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  } finally {
    await flushLangfuse();
  }
}
```

### Pattern streaming (SSE)

```typescript
export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          await generateResponseStream(
            SYSTEM_PROMPT,
            { userMessage: message, relevantChunks: [], conversationHistory: [] },
            (chunk) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            }
          );
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Erreur" })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/recipes/api-route.md
Crée une API route /api/chat avec validation, logging et error handling
```

## Checklist

- [ ] Validation des inputs (type, required, format)
- [ ] Logger créé avec `createLogger("api/route-name")`
- [ ] Try/catch global avec log d'erreur
- [ ] Message d'erreur générique côté client (pas de stack trace)
- [ ] Auth check si route protégée
- [ ] `flushLangfuse()` dans `finally` si traçage activé
