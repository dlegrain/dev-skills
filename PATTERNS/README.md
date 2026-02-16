# Diederick Patterns

Bibliothèque de patterns réutilisables extraits de 28+ projets Next.js.

## Usage avec @Docs (Cursor)

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/supabase.md
@Docs ~/repo-starter/PATTERNS/api-wrappers/gemini.md
@Docs ~/repo-starter/PATTERNS/components/chat-interface.md
```

## Index des patterns

### API Wrappers (Haute priorité)

| Pattern | Fichier | Source |
|---------|---------|--------|
| Supabase Trio (client/server/admin/middleware) | [api-wrappers/supabase.md](api-wrappers/supabase.md) | starter_pack |
| Gemini AI (singleton, streaming, extraction) | [api-wrappers/gemini.md](api-wrappers/gemini.md) | chatbot-medical-v2 |
| OpenAI Embeddings + Vector Search | [api-wrappers/embeddings.md](api-wrappers/embeddings.md) | starter_pack, chatbot-medical-v2 |
| Langfuse Observability | [api-wrappers/langfuse.md](api-wrappers/langfuse.md) | starter_pack, eval-cosep-v2 |
| Logger Pino | [api-wrappers/logger.md](api-wrappers/logger.md) | starter_pack |

| Google Sheets API (JWT, CRUD) | [api-wrappers/google-sheets.md](api-wrappers/google-sheets.md) | listing clients (CRM) |

### Components (Haute priorité)

| Pattern | Fichier | Source |
|---------|---------|--------|
| Chat Interface (widget + messages) | [components/chat-interface.md](components/chat-interface.md) | chatbot-medical-v2, chatbot-slbo |
| Quiz Player (timer, auto-advance, Supabase) | [components/quiz-player.md](components/quiz-player.md) | students_V2, eval-cosep-v2 |
| Voice Agent (ElevenLabs Conversational AI) | [components/voice-agent.md](components/voice-agent.md) | site-vitrine |

### Recipes (Workflows complets)

| Recipe | Fichier | Source |
|--------|---------|--------|
| API Route avec error handling + logging | [recipes/api-route.md](recipes/api-route.md) | starter_pack |
| Middleware Supabase Auth | [recipes/middleware-auth.md](recipes/middleware-auth.md) | starter_pack |
| Document Ingestion (chunking + embedding) | [recipes/document-ingestion.md](recipes/document-ingestion.md) | chatbot-slbo |
| Tailwind Design System | [recipes/tailwind-design-system.md](recipes/tailwind-design-system.md) | ressourcerie-menuiserie |
| .cursorrules (conventions Cursor IDE) | [recipes/cursorrules.md](recipes/cursorrules.md) | starter_pack |
| Docker + Railway Deploy | [recipes/docker-railway.md](recipes/docker-railway.md) | ressourcerie-menuiserie |

### Troubleshooting

| Problème | Fichier |
|----------|---------|
| Erreurs courantes et solutions | [troubleshooting/common-errors.md](troubleshooting/common-errors.md) |

## Stats

- **15 patterns** documentés
- **28+ projets** scannés
- **6 API wrappers** + **3 components** + **6 recipes**
- Code réel extrait, copier-coller ready

## Stack technique

- **Framework** : Next.js 14-16 (App Router)
- **Auth/DB** : Supabase + @supabase/ssr
- **LLM** : Google Gemini (@google/generative-ai)
- **Embeddings** : OpenAI text-embedding-3-small (768 dims)
- **Observability** : Langfuse
- **Logging** : Pino + pino-pretty
- **Styling** : Tailwind CSS v4
- **Language** : TypeScript strict
