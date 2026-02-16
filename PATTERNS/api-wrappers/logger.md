# Logger Pino

> Logger structuré avec pino-pretty en dev et JSON en prod.
> Source : `starter_pack/lib/logger.ts`

## Quand l'utiliser

- Tout projet Next.js (remplace `console.log`)
- Besoin de logs structurés (JSON en prod pour agrégation)
- Logs par module avec contexte

## Quand NE PAS l'utiliser

- Script one-shot (`console.log` suffit)
- Client-side uniquement (pino n'est pas fait pour le browser)

## Contexte

- `pino-pretty` uniquement en dev côté serveur (coloré, lisible)
- JSON en production (compatible DataDog, CloudWatch, etc.)
- `LOG_LEVEL` configurable via env
- `createLogger("module")` crée un child logger avec contexte

## Code

### `lib/logger.ts`

```typescript
import pino from "pino";

const isServer = typeof window === "undefined";

export const logger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
  ...(isServer && process.env.NODE_ENV !== "production"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      }
    : {}),
});

/**
 * Crée un logger enfant avec un contexte spécifique
 *
 * Usage :
 *   const log = createLogger("api/chat")
 *   log.info({ userId }, "Message reçu")
 */
export function createLogger(module: string) {
  return logger.child({ module });
}
```

### Usage

```typescript
import { createLogger } from "@/lib/logger";

const log = createLogger("api/chat");

// Log structuré avec contexte
log.info({ userId, messageCount: 5 }, "Requête chat reçue");

// Niveaux : trace, debug, info, warn, error, fatal
log.error({ error }, "Erreur dans /api/chat");

// Le module apparaît automatiquement dans chaque log
// → 14:30:25 INFO (api/chat): Requête chat reçue { userId: "abc", messageCount: 5 }
```

## Variables d'environnement

```env
LOG_LEVEL=debug  # trace, debug, info, warn, error, fatal
```

## Dépendances

```bash
npm install pino pino-pretty
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/logger.md
Configure le logger Pino pour mon projet Next.js
```

## Checklist

- [ ] `pino` et `pino-pretty` installés
- [ ] `lib/logger.ts` créé
- [ ] Remplacer `console.log` par `logger.info` / `createLogger`
- [ ] `LOG_LEVEL` dans `.env` si besoin

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| `pino-pretty` pas trouvé | Pas installé | `npm install pino-pretty` |
| Logs pas colorés | Pas en dev ou côté client | Vérifier `NODE_ENV` et `isServer` |
| Trop de logs | LOG_LEVEL trop bas | Mettre `LOG_LEVEL=info` en prod |
| Erreur `window is undefined` | Logger importé côté client | Vérifier `isServer` guard |
