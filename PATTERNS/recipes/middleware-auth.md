# Recipe: Middleware Supabase Auth

> Middleware Next.js pour rafraîchir la session Supabase + protection de routes.
> Sources : `starter_pack/middleware.ts`, `students_V2/src/lib/supabase/middleware.ts`

## Quand l'utiliser

- Tout projet Next.js + Supabase Auth
- Besoin de protéger des routes (admin, dashboard)
- Session cookies à rafraîchir automatiquement

## Code

### Middleware de base (rafraîchissement session)

```typescript
// middleware.ts (racine du projet)
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

### Middleware avec protection de routes

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes publiques (pas besoin d'auth)
const PUBLIC_ROUTES = ["/", "/login", "/auth/callback"];

// Routes admin
const ADMIN_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

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
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Route publique → passer
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return supabaseResponse;
  }

  // Pas connecté → rediriger vers login
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // Route admin → vérifier le rôle
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/recipes/middleware-auth.md
Configure le middleware Supabase avec protection des routes admin
```

## Checklist

- [ ] `middleware.ts` à la racine du projet (pas dans `app/`)
- [ ] Matcher exclut les fichiers statiques
- [ ] `getUser()` appelé (pas `getSession()` — sécurité)
- [ ] Routes publiques listées
- [ ] Redirection vers `/login` avec `redirectTo`
