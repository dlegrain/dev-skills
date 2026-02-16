# Recipe: Docker + Railway Deploy

> Dockerfile Next.js optimisé pour Railway avec support Python optionnel.
> Source : `ressourcerie-menuiserie/Dockerfile`

## Quand l'utiliser

- Déploiement sur Railway (ou tout PaaS Docker)
- Next.js avec dépendances Python (scripts d'analyse, ML)
- Besoin d'un container reproductible

## Quand NE PAS l'utiliser

- Déploiement Vercel (zero-config, pas de Docker nécessaire)
- Projet sans dépendances spéciales

## Code

### Dockerfile basique (Next.js only)

```dockerfile
FROM node:20-slim

WORKDIR /app

# Installer les dépendances
COPY package.json package-lock.json ./
RUN npm ci

# Copier le code
COPY . .

# Variables nécessaires au build (injectées par Railway)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Build
RUN npm run build

# Démarrer
CMD ["npm", "start"]
```

### Dockerfile avec Python (multi-runtime)

```dockerfile
FROM node:20-slim

# Installer Python (pour scripts d'analyse ou ML)
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Installer les dépendances Python
COPY requirements.txt .
RUN pip3 install --break-system-packages -r requirements.txt

# Installer les dépendances Node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copier le reste du code
COPY . .

# Variables nécessaires au build Next.js (injectées par Railway)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Build Next.js
RUN npm run build

# Démarrer
CMD ["npm", "start"]
```

### Dockerfile optimisé (multi-stage)

```dockerfile
# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# Stage 2: Run
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copier uniquement le nécessaire
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

Pour le multi-stage, ajouter dans `next.config.ts` :

```typescript
const nextConfig = {
  output: 'standalone',
};
```

### Configuration Railway

```toml
# railway.toml (optionnel)
[build]
builder = "dockerfile"
dockerfilePath = "Dockerfile"

[deploy]
healthcheckPath = "/"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
```

### Variables Railway

Dans le dashboard Railway, configurer :

```
# Build args (pour NEXT_PUBLIC_*)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Runtime env vars
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIza...
OPENAI_API_KEY=sk-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/recipes/docker-railway.md
Crée un Dockerfile optimisé pour déployer mon projet Next.js sur Railway
```

## Checklist

- [ ] `Dockerfile` à la racine du projet
- [ ] Toutes les `NEXT_PUBLIC_*` en `ARG` pour le build
- [ ] `npm ci` (pas `npm install`) pour reproducibilité
- [ ] `.dockerignore` configuré (node_modules, .next, .env*)
- [ ] Variables configurées dans Railway Dashboard

## `.dockerignore`

```
node_modules
.next
.env*
.git
*.md
```

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Build échoue | `NEXT_PUBLIC_*` manquantes | Ajouter les `ARG` dans Dockerfile |
| Image trop grosse | Pas de multi-stage | Utiliser le Dockerfile optimisé |
| Python scripts fail | pip sans `--break-system-packages` | Ajouter le flag (Node 20 slim) |
| Port non détecté | Railway attend 3000 | `ENV PORT=3000` + `EXPOSE 3000` |
