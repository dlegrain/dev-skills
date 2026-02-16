# Supabase Trio Pattern

> 3 clients Supabase pour 3 contextes : Browser, Server, Admin.
> Source : `starter_pack/lib/supabase/`

## Quand l'utiliser

- Tout projet Next.js App Router avec Supabase
- Besoin d'authentification côté client ET serveur
- Opérations admin (bypass RLS) depuis des scripts ou API routes

## Quand NE PAS l'utiliser

- Projet sans authentification (un seul client suffit)
- Pages Router (utiliser `createPagesServerClient`)

## Contexte

- `@supabase/ssr` gère les cookies automatiquement
- Le middleware rafraîchit la session à chaque requête
- `setAll` dans Server Component throw silencieusement (normal, le middleware s'en charge)
- Admin client désactive `autoRefreshToken` et `persistSession` (pas de session utilisateur)

## Architecture

```
lib/supabase/
├── client.ts      → Browser (Client Components)
├── server.ts      → Server Components, Route Handlers
├── admin.ts       → Scripts, opérations bypass RLS
└── middleware.ts   → Rafraîchissement session

middleware.ts        → Point d'entrée Next.js middleware
```

## Code

### `lib/supabase/client.ts` — Client Browser

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Variables Supabase manquantes : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont requises"
    );
  }

  return createBrowserClient(url, anonKey);
}
```

### `lib/supabase/server.ts` — Client Server

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll est appelé depuis un Server Component —
            // on ignore l'erreur car le middleware rafraîchira la session
          }
        },
      },
    }
  );
}
```

### `lib/supabase/admin.ts` — Client Admin (bypass RLS)

```typescript
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Variables Supabase admin manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requises"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
```

### `lib/supabase/middleware.ts` — Rafraîchissement session

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Rafraîchir la session — ne pas supprimer cette ligne
  await supabase.auth.getUser();

  return supabaseResponse;
}
```

### `middleware.ts` — Point d'entrée

```typescript
import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## Variables d'environnement

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Uniquement côté serveur
```

## Dépendances

```bash
npm install @supabase/ssr @supabase/supabase-js
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/supabase.md
Crée les fichiers Supabase client/server/admin pour mon projet Next.js
```

## Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` configuré
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configuré
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configuré (si admin nécessaire)
- [ ] `middleware.ts` à la racine du projet
- [ ] Matcher middleware exclut les fichiers statiques

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| `cookies()` undefined | Appelé hors Server Component | Utiliser `client.ts` dans les Client Components |
| Session non rafraîchie | Middleware manquant | Vérifier `middleware.ts` à la racine |
| RLS bloque les requêtes | Mauvais client utilisé | Utiliser `admin.ts` pour bypass RLS |
| `setAll` erreur silencieuse | Normal dans Server Components | Le middleware gère le refresh |
