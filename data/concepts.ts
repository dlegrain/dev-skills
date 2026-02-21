import { Concept } from "@/types/learning";

export const CONCEPTS: Concept[] = [
  // ── LANGAGES ──────────────────────────────────────────────────────────────
  {
    id: "c-001",
    slug: "javascript",
    name: "JavaScript",
    category: "langages",
    shortDef: "Le seul langage nativement compris par les navigateurs web.",
    longDef:
      "JavaScript est un langage de programmation dynamique et interprété, créé en 1995. Il est le seul langage que les navigateurs comprennent nativement (avec HTML et CSS). Il rend les pages web interactives : animations, formulaires, fetch de données. Avec Node.js, il tourne aussi côté serveur. TypeScript est une extension de JavaScript.",
    analogy:
      "Si HTML est le squelette d'une page et CSS ses vêtements, JavaScript est ses muscles — il permet d'agir et de réagir.",
    examples: [
      "Afficher dans la console : console.log('Bonjour')",
      "Modifier la page : document.getElementById('titre').textContent = 'Nouveau'",
      "Requête réseau : fetch('/api/data').then(r => r.json())",
      "Événement : button.addEventListener('click', () => alert('Cliqué!'))",
    ],
    relatedConcepts: ["typescript", "react", "nodejs"],
    tags: ["langage", "web", "front", "dynamique"],
  },
  {
    id: "c-002",
    slug: "typescript",
    name: "TypeScript",
    category: "langages",
    shortDef:
      "JavaScript avec des types statiques pour détecter les erreurs avant l'exécution.",
    longDef:
      "TypeScript est développé par Microsoft depuis 2012. Il étend JavaScript en ajoutant des annotations de type. Le compilateur (tsc) le transpile en JavaScript pur. Le typage permet aux éditeurs de code de détecter des bugs avant même d'exécuter le code et d'offrir l'autocomplétion. Tous les fichiers .ts ou .tsx sont du TypeScript.",
    analogy:
      "C'est comme écrire un texte avec un correcteur grammatical en temps réel — il te signale les erreurs avant que tu envoies le message.",
    examples: [
      "Type simple : const age: number = 42",
      "Interface : interface User { id: number; name: string }",
      "Fonction typée : function add(a: number, b: number): number { return a + b }",
      "Type union : type Status = 'active' | 'inactive' | 'pending'",
    ],
    relatedConcepts: ["javascript", "nextjs", "build"],
    tags: ["langage", "typage", "compilation"],
  },
  {
    id: "c-003",
    slug: "python",
    name: "Python",
    category: "langages",
    shortDef:
      "Langage polyvalent très lisible, populaire pour l'IA, le web et la data.",
    longDef:
      "Python est un langage interprété et dynamiquement typé, conçu pour la lisibilité. Sa syntaxe utilise l'indentation comme structure. Très utilisé en data science, IA/ML, scripting et développement web (Flask, FastAPI, Django). Il ne s'exécute pas dans le navigateur mais côté serveur ou en local. Son gestionnaire de paquets est pip.",
    analogy:
      "Python c'est comme de l'anglais simple : proche du langage naturel, facile à lire, accessible aux débutants.",
    examples: [
      "Print : print('Bonjour le monde')",
      "Liste en compréhension : carres = [x**2 for x in range(10)]",
      "Fonction : def saluer(nom: str) -> str: return f'Bonjour {nom}'",
      "Import Flask : from flask import Flask; app = Flask(__name__)",
    ],
    relatedConcepts: ["flask", "fastapi", "pip", "venv"],
    tags: ["langage", "scripting", "ia", "data"],
  },
  {
    id: "c-004",
    slug: "html",
    name: "HTML",
    category: "langages",
    shortDef:
      "Langage de balisage qui structure le contenu d'une page web.",
    longDef:
      "HyperText Markup Language définit la structure sémantique des pages via des balises (<div>, <p>, <h1>, <img>…). HTML n'est pas un langage de programmation : il n'a pas de logique conditionnelle. Il décrit ce que contient une page. HTML5 a introduit des éléments sémantiques comme <article>, <nav>, <section>.",
    analogy:
      "HTML est le plan d'architecte d'une maison : il décrit quelles pièces existent et où elles se situent, sans préciser la décoration ni le fonctionnement.",
    examples: [
      "Structure : <!DOCTYPE html><html><head></head><body></body></html>",
      "Titre : <h1>Mon titre principal</h1>",
      "Lien : <a href='/contact'>Contactez-moi</a>",
      "Formulaire : <form><input type='text' /><button type='submit'>Envoyer</button></form>",
    ],
    relatedConcepts: ["css", "javascript"],
    tags: ["langage", "web", "structure", "balisage"],
  },
  {
    id: "c-005",
    slug: "css",
    name: "CSS",
    category: "langages",
    shortDef:
      "Langage de style qui contrôle l'apparence visuelle des éléments HTML.",
    longDef:
      "Cascading Style Sheets permet de styliser les éléments HTML : couleurs, polices, espacement, mise en page (flexbox, grid), animations. 'Cascading' signifie que les règles s'appliquent en cascade selon la spécificité. Tailwind CSS est un framework qui remplace l'écriture de fichiers CSS manuels par des classes utilitaires.",
    analogy:
      "CSS est le styliste de la page web : il choisit les couleurs, la taille des polices et la disposition des éléments.",
    examples: [
      "Couleur : body { background-color: #f0f0f0; color: #333; }",
      "Flexbox : .container { display: flex; justify-content: center; }",
      "Media query : @media (max-width: 768px) { .nav { display: none; } }",
      "Animation : @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }",
    ],
    relatedConcepts: ["html", "tailwind"],
    tags: ["langage", "style", "design", "web"],
  },

  // ── FORMATS DE FICHIERS ───────────────────────────────────────────────────
  {
    id: "c-006",
    slug: "json",
    name: "JSON",
    category: "formats-fichiers",
    shortDef:
      "Format texte universel pour échanger des données structurées entre applications.",
    longDef:
      "JavaScript Object Notation est un format de données textuel dérivé de la syntaxe des objets JavaScript. Il supporte 6 types : string, number, boolean, null, array, object. JSON est devenu le standard d'échange de données sur le web. Il est aussi utilisé pour la configuration (package.json, tsconfig.json).",
    analogy:
      "JSON est comme un formulaire administratif : des champs nommés avec des valeurs, structuré de façon universellement compréhensible.",
    examples: [
      "Objet simple : { \"nom\": \"Diederick\", \"age\": 30, \"actif\": true }",
      "Tableau : { \"projets\": [\"dashboard\", \"dev-skills\"] }",
      "Parser en JS : const data = JSON.parse(texte)",
      "Sérialiser : const texte = JSON.stringify(data, null, 2)",
    ],
    relatedConcepts: ["api-rest", "package-json"],
    tags: ["format", "données", "config", "api"],
  },
  {
    id: "c-007",
    slug: "toml",
    name: "TOML",
    category: "formats-fichiers",
    shortDef:
      "Format de configuration lisible pour les humains, utilisé dans les projets Python et Rust.",
    longDef:
      "Tom's Obvious, Minimal Language est un format de configuration conçu pour être simple à lire. Il utilise des sections entre crochets [section] et des paires clé = valeur. Il est moins verbeux que JSON (pas de guillemets pour les clés) et plus structuré que YAML. Utilisé dans pyproject.toml (Python), Cargo.toml (Rust), et de nombreux outils.",
    analogy:
      "TOML est comme un fichier .ini amélioré : facile à lire, bien structuré, sans la complexité de YAML ni les accolades de JSON.",
    examples: [
      "[project]\nname = \"mon-projet\"\nversion = \"1.0.0\"",
      "[dependencies]\nflask = \">=3.0\"",
      "pyproject.toml : utilisé par Poetry, Ruff, Black pour la config Python",
      "Cargo.toml : gestionnaire de paquets Rust",
    ],
    relatedConcepts: ["yaml", "json", "python"],
    tags: ["format", "config", "python", "rust"],
  },
  {
    id: "c-008",
    slug: "env-file",
    name: "Fichier .env",
    category: "formats-fichiers",
    shortDef:
      "Fichier texte qui stocke les variables d'environnement sensibles d'un projet.",
    longDef:
      "Un fichier .env contient des paires CLE=valeur : clés API, URLs de base de données, secrets. Ce fichier ne doit jamais être commité dans Git (listé dans .gitignore). En développement, dotenv (Node.js) ou python-dotenv (Python) chargent ces variables au démarrage. En production, les variables sont injectées directement par la plateforme (Vercel, Railway).",
    analogy:
      "Le .env est comme le trousseau de clés de ta maison : tu en as besoin pour faire fonctionner l'application, mais tu ne le prêtes à personne.",
    examples: [
      "DATABASE_URL=postgresql://user:password@localhost:5432/mydb",
      "NEXT_PUBLIC_API_URL=https://api.monsite.fr",
      "GEMINI_API_KEY=AIza...votre_vraie_clé",
      "Chargement : process.env.GEMINI_API_KEY (Node.js)",
    ],
    relatedConcepts: ["gitignore", "api-rest"],
    tags: ["format", "sécurité", "config", "secrets"],
  },
  {
    id: "c-009",
    slug: "yaml",
    name: "YAML",
    category: "formats-fichiers",
    shortDef:
      "Format de sérialisation lisible, utilisé massivement pour la configuration DevOps.",
    longDef:
      "YAML Ain't Markup Language est un format basé sur l'indentation. Il est très lisible mais sensible aux espaces. Très utilisé pour : GitHub Actions, Docker Compose, Kubernetes. Les types sont inférés automatiquement (true devient booléen). Les commentaires sont possibles avec #.",
    analogy:
      "YAML c'est du JSON mais écrit comme une liste de courses : sans accolades, sans virgules, en utilisant juste l'indentation pour structurer.",
    examples: [
      "docker-compose.yml : version: '3'\nservices:\n  web:\n    image: nginx",
      "GitHub Actions : on: push\njobs:\n  build:\n    runs-on: ubuntu-latest",
      "Clé-valeur : nom: Diederick\nage: 30",
      "Tableau : langages:\n  - Python\n  - JavaScript",
    ],
    relatedConcepts: ["docker", "json", "toml"],
    tags: ["format", "config", "devops", "docker"],
  },

  // ── FRAMEWORKS & BIBLIOTHÈQUES ─────────────────────────────────────────────
  {
    id: "c-010",
    slug: "react",
    name: "React",
    category: "frameworks",
    shortDef:
      "Bibliothèque JavaScript pour construire des interfaces à base de composants réutilisables.",
    longDef:
      "React est développé par Meta depuis 2013. Il introduit le concept de composant : une fonction JavaScript qui retourne du JSX (HTML dans JS). React gère un DOM virtuel et ne met à jour que les parties de la page qui ont changé. Les hooks (useState, useEffect) permettent de gérer l'état. React est une bibliothèque UI, pas un framework complet.",
    analogy:
      "React c'est comme des Lego : tu construis des petites briques réutilisables (composants), puis tu les assembles pour créer la page complète.",
    examples: [
      "Composant : function Button({ label }) { return <button>{label}</button> }",
      "useState : const [count, setCount] = useState(0)",
      "useEffect : useEffect(() => { document.title = count + ' clics' }, [count])",
      "JSX : return <div className='card'><h1>Titre</h1></div>",
    ],
    relatedConcepts: ["nextjs", "javascript", "typescript", "vite"],
    tags: ["framework", "ui", "composants", "frontend"],
  },
  {
    id: "c-011",
    slug: "nextjs",
    name: "Next.js",
    category: "frameworks",
    shortDef:
      "Framework React full-stack qui ajoute le routage, le rendu serveur, et les API routes.",
    longDef:
      "Next.js est développé par Vercel. Il construit au-dessus de React pour offrir : le routage basé sur le système de fichiers (App Router), le rendu serveur (SSR) et statique (SSG), les Server Components, les API Routes (endpoints HTTP dans le même projet), l'optimisation d'images. C'est le framework de la majorité de tes projets.",
    analogy:
      "Si React est le moteur d'une voiture, Next.js est la voiture complète avec la carrosserie, le GPS et le tableau de bord.",
    examples: [
      "Route : app/categories/[slug]/page.tsx → /categories/react",
      "Server Component : async function Page() { const data = await fetch(...) }",
      "API Route : app/api/quiz/route.ts avec export async function GET()",
      "Layout partagé : app/layout.tsx wrape toutes les pages",
    ],
    relatedConcepts: ["react", "ssr", "ssg", "typescript"],
    tags: ["framework", "fullstack", "react", "ssr"],
  },
  {
    id: "c-012",
    slug: "vite",
    name: "Vite",
    category: "frameworks",
    shortDef:
      "Outil de build ultra-rapide pour les projets JavaScript modernes (React, Vue…).",
    longDef:
      "Vite utilise les ES Modules natifs du navigateur en développement pour éviter de bundler tout le code à chaque changement. En production, il utilise Rollup pour créer un bundle optimisé. C'est le successeur de Create React App. Il offre un Hot Module Replacement (HMR) quasi-instantané. Ton dashboard-commercial l'utilise.",
    analogy:
      "Vite (qui signifie 'rapide' en français) c'est comme servir les plats individuellement : tu n'attends que ce dont tu as besoin, pas que toute la cuisine soit prête.",
    examples: [
      "Démarrage : npm create vite@latest mon-projet -- --template react-ts",
      "Dev server : npm run dev → démarre en ~200ms",
      "Build : npm run build → génère dist/ avec fichiers optimisés",
      "HMR : modification d'un fichier → rechargement instantané du module uniquement",
    ],
    relatedConcepts: ["react", "bundler", "npm", "csr"],
    tags: ["build", "dev-server", "bundler", "rapide"],
  },
  {
    id: "c-013",
    slug: "flask",
    name: "Flask",
    category: "frameworks",
    shortDef:
      "Micro-framework web Python minimaliste pour créer des serveurs et APIs rapidement.",
    longDef:
      "Flask est un micro-framework Python. 'Micro' signifie qu'il ne force aucun choix architectural : pas d'ORM imposé, pas de validation intégrée. Il fournit l'essentiel : routing des URLs, gestion des requêtes HTTP, templates Jinja2. Parfait pour des APIs REST simples ou des prototypes. Ton projet 'articles' l'utilise.",
    analogy:
      "Flask c'est comme une trousse à outils minimaliste : tu as l'essentiel, et tu ajoutes les autres outils seulement quand tu en as besoin.",
    examples: [
      "App minimale : from flask import Flask; app = Flask(__name__)",
      "@app.route('/') → def index(): return 'Bonjour'",
      "Route avec paramètre : @app.route('/user/<int:id>')",
      "Démarrage : flask run --port 5000",
    ],
    relatedConcepts: ["python", "api-rest", "serveur"],
    tags: ["framework", "python", "backend", "api"],
  },
  {
    id: "c-014",
    slug: "tailwind",
    name: "Tailwind CSS",
    category: "frameworks",
    shortDef:
      "Framework CSS utilitaire qui applique le style via des classes courtes directement dans le HTML.",
    longDef:
      "Tailwind CSS est un framework utility-first : au lieu de classes sémantiques (.card, .btn-primary), on compose le style avec des classes atomiques (flex, p-4, bg-blue-500, rounded-lg). Tailwind v4 utilise @import 'tailwindcss' dans globals.css. Il génère uniquement le CSS utilisé, résultant en des bundles très légers.",
    analogy:
      "Tailwind c'est comme se maquiller directement avec des couleurs précises, plutôt que d'appliquer des 'looks' prédéfinis. Tu contrôles chaque détail.",
    examples: [
      "Bouton : <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>",
      "Card : <div className='border border-gray-200 rounded-xl p-6 shadow-sm bg-white'>",
      "Responsive : <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>",
      "Dark mode : <p className='text-gray-900 dark:text-white'>",
    ],
    relatedConcepts: ["css", "nextjs"],
    tags: ["css", "design", "utility-first", "framework"],
  },

  // ── BUILD & COMPILATION ────────────────────────────────────────────────────
  {
    id: "c-015",
    slug: "bundler",
    name: "Bundler",
    category: "build",
    shortDef:
      "Outil qui regroupe tous les fichiers d'un projet en fichiers optimisés pour le navigateur.",
    longDef:
      "Un bundler analyse les imports de ton code pour créer un graphe de dépendances, puis regroupe tout en un bundle. Il applique des transformations : transpilation TypeScript, minification, tree-shaking (suppression du code inutilisé), splitting de code. Les principaux bundlers : Webpack (historique), Vite/Rollup (moderne), esbuild (ultra-rapide).",
    analogy:
      "Le bundler est comme un chef cuisinier qui prend tous tes ingrédients séparés (fichiers), les prépare (optimise), et les présente en un seul plat (bundle) prêt à servir.",
    examples: [
      "Webpack : webpack.config.js avec entry, output, loaders",
      "Vite : utilise esbuild en dev, Rollup en prod",
      "Next.js : utilise Turbopack en développement",
      "Output : dist/bundle.js (tout le JS) + dist/style.css (tout le CSS)",
    ],
    relatedConcepts: ["vite", "nextjs", "transpilation"],
    tags: ["build", "optimisation", "compilation"],
  },
  {
    id: "c-016",
    slug: "transpilation",
    name: "Transpilation",
    category: "build",
    shortDef:
      "Conversion de code source d'un langage (ou version) vers un autre langage équivalent.",
    longDef:
      "La transpilation produit du code source dans un autre langage, pas du code machine. Exemples : TypeScript → JavaScript (via tsc ou esbuild), JSX → JavaScript pur (via Babel), ES2022+ → ES5 (pour compatibilité navigateur). Le code résultant est fonctionnellement équivalent mais dans un format que la cible peut exécuter. Next.js transpile automatiquement.",
    analogy:
      "C'est comme traduire un livre du français vers l'anglais : le sens reste identique, mais le format change pour être compris par la cible.",
    examples: [
      "TypeScript → JS : tsc index.ts → index.js",
      "JSX → JS : <Button /> devient React.createElement(Button, null)",
      "ES2022 → ES5 : const → var, arrow functions → function classique",
      "Next.js transpile TypeScript et JSX automatiquement au build",
    ],
    relatedConcepts: ["typescript", "bundler", "javascript"],
    tags: ["build", "typescript", "compilation"],
  },
  {
    id: "c-017",
    slug: "dev-vs-prod",
    name: "Dev vs Production",
    category: "build",
    shortDef:
      "La distinction entre l'environnement de développement local et la production en ligne.",
    longDef:
      "En développement (dev), le serveur recharge automatiquement à chaque changement (HMR), les erreurs sont détaillées, le code n'est pas optimisé. En production (prod), le code est bundlé, minifié, optimisé. Les variables d'environnement sont différentes. Commandes : npm run dev (développement) vs npm run build && npm start (production).",
    analogy:
      "Dev c'est comme répéter une pièce de théâtre dans les coulisses : tu peux t'arrêter, corriger, recommencer. Prod c'est la représentation publique.",
    examples: [
      "npm run dev → Next.js en mode développement avec HMR",
      "npm run build → compile tout, vérifie les types, optimise",
      "NODE_ENV=production → active les optimisations",
      ".env.local (dev) vs variables injectées sur Vercel (prod)",
    ],
    relatedConcepts: ["bundler", "nextjs", "env-file"],
    tags: ["build", "environnement", "optimisation", "déploiement"],
  },

  // ── SERVEURS & RÉSEAU ─────────────────────────────────────────────────────
  {
    id: "c-018",
    slug: "serveur",
    name: "Serveur web",
    category: "serveurs-reseau",
    shortDef:
      "Programme qui écoute des requêtes HTTP sur un port et retourne des réponses.",
    longDef:
      "Un serveur web est un processus qui tourne en permanence, écoute sur un port réseau, et répond aux requêtes HTTP. Il peut servir des fichiers statiques (HTML, CSS), exécuter du code (Node.js, Python), et retourner des données (JSON). Les serveurs courants : Express/Fastify (Node.js), Flask/FastAPI (Python), Nginx (proxy). Next.js inclut son propre serveur.",
    analogy:
      "Un serveur web est comme un serveur de restaurant : il attend ta commande (requête), la prépare (exécute du code) et te l'apporte (retourne une réponse).",
    examples: [
      "Express : app.listen(3000, () => console.log('Serveur sur port 3000'))",
      "Flask : app.run(port=5000)",
      "Next.js : npm run dev → démarre sur http://localhost:3000",
      "Nginx : proxy inverse qui redirige le port 80 vers ton serveur Node.js",
    ],
    relatedConcepts: ["port", "http", "api-rest"],
    tags: ["réseau", "backend", "http", "process"],
  },
  {
    id: "c-019",
    slug: "port",
    name: "Port réseau",
    category: "serveurs-reseau",
    shortDef:
      "Numéro qui identifie un service précis sur une machine, de 0 à 65535.",
    longDef:
      "Un port est un entier entre 0 et 65535. Chaque service réseau écoute sur un port : HTTP = 80, HTTPS = 443, PostgreSQL = 5432, Next.js dev = 3000. L'URL http://localhost:3000 signifie : connexion à la machine locale, service sur le port 3000. Deux applications ne peuvent pas écouter sur le même port simultanément (conflits de ports). Tu as organisé tes projets par plages de ports.",
    analogy:
      "Les ports sont comme les appartements d'un immeuble : l'immeuble est ton ordinateur, et chaque appartement (port) héberge un service différent.",
    examples: [
      "localhost:3000 → Next.js dev server",
      "localhost:5432 → PostgreSQL",
      "Tes projets : 5100-5199 (démo), 6000-6099 (prod), 7100-7199 (admin)",
      "Conflit : 'Port 3000 is already in use' → lsof -ti:3000 | xargs kill",
    ],
    relatedConcepts: ["serveur", "http"],
    tags: ["réseau", "configuration", "serveur"],
  },
  {
    id: "c-020",
    slug: "http",
    name: "HTTP & HTTPS",
    category: "serveurs-reseau",
    shortDef:
      "Protocole de communication entre un client (navigateur) et un serveur web.",
    longDef:
      "HyperText Transfer Protocol est le protocole de communication du web. Une requête HTTP comporte : une méthode (GET, POST, PUT, DELETE), une URL, des headers, un body optionnel. La réponse comporte : un code de statut (200 OK, 404 Not Found, 500 Server Error), des headers, un body. HTTPS ajoute le chiffrement TLS. En production, HTTPS est obligatoire.",
    analogy:
      "HTTP est comme un formulaire de commande standardisé : tu remplis ce que tu veux (requête), tu l'envoies, et tu reçois ce que tu as demandé (réponse).",
    examples: [
      "GET /api/users → récupère la liste des utilisateurs",
      "POST /api/users avec body JSON → crée un utilisateur",
      "200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Error",
      "Header : Content-Type: application/json",
    ],
    relatedConcepts: ["api-rest", "serveur", "port"],
    tags: ["réseau", "protocole", "web", "api"],
  },
  {
    id: "c-021",
    slug: "api-rest",
    name: "API REST",
    category: "serveurs-reseau",
    shortDef:
      "Interface de communication entre applications via HTTP, avec des conventions standardisées.",
    longDef:
      "REST (Representational State Transfer) est un style architectural pour les APIs web. Les ressources sont identifiées par des URLs (/users, /products/42). Les opérations CRUD correspondent aux méthodes HTTP : GET (lire), POST (créer), PUT/PATCH (modifier), DELETE (supprimer). Les réponses sont en JSON. REST est stateless : chaque requête contient toutes les informations nécessaires.",
    analogy:
      "Une API REST est comme un menu standardisé : chaque plat (ressource) a un nom fixe, et tu utilises les mêmes actions (commander, modifier, annuler) pour tous les restaurants.",
    examples: [
      "GET /api/concepts → liste tous les concepts",
      "GET /api/concepts/javascript → récupère un concept précis",
      "POST /api/quiz/results avec body → sauvegarde un résultat",
      "fetch('/api/concepts').then(r => r.json()).then(data => console.log(data))",
    ],
    relatedConcepts: ["http", "json", "serveur"],
    tags: ["api", "http", "communication", "json"],
  },

  // ── FRONTEND / BACKEND / FULL-STACK ───────────────────────────────────────
  {
    id: "c-022",
    slug: "frontend",
    name: "Frontend",
    category: "frontend-backend",
    shortDef:
      "La partie d'une application qui s'exécute dans le navigateur et est visible par l'utilisateur.",
    longDef:
      "Le frontend (côté client) est tout ce que l'utilisateur voit : HTML, CSS, JavaScript qui s'exécutent dans le navigateur. Le frontend communique avec le backend via des requêtes HTTP. Technologies frontend : React, Vue, Angular. Next.js brouille la frontière en permettant du code serveur dans le même projet via les Server Components.",
    analogy:
      "Le frontend est la façade d'un magasin : c'est ce que le client voit, touche, et avec quoi il interagit. Ce qui se passe en cuisine (backend) est invisible.",
    examples: [
      "React component → s'exécute dans le navigateur",
      "fetch('/api/data') → appel vers le backend depuis le frontend",
      "CSS animation → visible uniquement côté client",
      "'use client' dans Next.js → marque un composant comme frontend",
    ],
    relatedConcepts: ["backend", "react", "javascript", "ssr"],
    tags: ["architecture", "client", "navigateur", "ui"],
  },
  {
    id: "c-023",
    slug: "backend",
    name: "Backend",
    category: "frontend-backend",
    shortDef:
      "La partie serveur qui gère la logique métier, la base de données, et l'authentification.",
    longDef:
      "Le backend s'exécute sur un serveur, invisible pour l'utilisateur. Il gère : l'accès aux bases de données, l'authentification, la validation des données, les calculs complexes. Le frontend ne peut pas accéder directement à la base de données pour des raisons de sécurité. Dans Next.js, les API Routes et Server Components sont exécutés côté serveur.",
    analogy:
      "Le backend est la cuisine d'un restaurant : le client ne la voit pas, mais c'est là que tout est préparé, stocké et sécurisé.",
    examples: [
      "API Route Next.js : export async function GET() { const data = await db.query() }",
      "Flask : @app.route('/api/users') def get_users(): return jsonify(users)",
      "Accès DB : await supabase.from('concepts').select('*')",
      "Auth middleware : vérifie le token JWT avant de répondre",
    ],
    relatedConcepts: ["frontend", "api-rest", "bases-de-donnees", "serveur"],
    tags: ["architecture", "serveur", "logique-metier", "securite"],
  },
  {
    id: "c-024",
    slug: "fullstack",
    name: "Full-stack",
    category: "frontend-backend",
    shortDef:
      "Développeur ou application qui couvre à la fois le frontend et le backend.",
    longDef:
      "Un développeur full-stack maîtrise les deux côtés. Next.js est un framework full-stack par excellence : les pages React (frontend) coexistent avec les API Routes et Server Components (backend) dans le même dépôt. L'avantage : pas de CORS, types TypeScript partagés, déploiement simplifié.",
    analogy:
      "Un développeur full-stack est comme un architecte-entrepreneur qui conçoit le bâtiment ET supervise la construction : il voit la totalité du projet.",
    examples: [
      "Next.js : app/page.tsx (frontend) + app/api/route.ts (backend) dans le même projet",
      "Types partagés : interface Concept {} utilisé côté frontend ET backend",
      "Supabase : remplace un backend entier (auth, DB, storage)",
      "Vercel : déploie le full-stack Next.js en une commande",
    ],
    relatedConcepts: ["frontend", "backend", "nextjs"],
    tags: ["architecture", "fullstack", "nextjs"],
  },

  // ── RENDU WEB ─────────────────────────────────────────────────────────────
  {
    id: "c-025",
    slug: "ssr",
    name: "SSR — Server-Side Rendering",
    category: "rendu-web",
    shortDef:
      "Le HTML est généré sur le serveur à chaque requête, puis envoyé prêt au navigateur.",
    longDef:
      "Avec SSR, le serveur exécute le code React, génère le HTML complet, et l'envoie au navigateur. Le navigateur reçoit une page déjà rendue, ce qui est excellent pour le SEO et la vitesse d'affichage initiale. Ensuite, React 'hydrate' la page (ajoute l'interactivité). Dans Next.js, les Server Components utilisent SSR par défaut.",
    analogy:
      "SSR c'est comme commander un plat au restaurant : le cuisinier prépare tout en cuisine (serveur), et tu reçois le plat terminé dans ton assiette (navigateur).",
    examples: [
      "Next.js page SSR : async function Page() { const data = await fetchFreshData() }",
      "Avantage SEO : Google voit le contenu directement dans le HTML",
      "Avantage perf : affichage immédiat sans attendre le JS",
      "Utilisation : pages avec données qui changent souvent",
    ],
    relatedConcepts: ["ssg", "csr", "nextjs", "react"],
    tags: ["rendu", "performance", "seo", "serveur"],
  },
  {
    id: "c-026",
    slug: "ssg",
    name: "SSG — Static Site Generation",
    category: "rendu-web",
    shortDef:
      "Les pages HTML sont générées une seule fois au build et servies comme fichiers statiques.",
    longDef:
      "Avec SSG, les pages sont générées au moment du build (npm run build), pas à chaque requête. Le résultat est un ensemble de fichiers HTML statiques servis par un CDN sans serveur. C'est la solution la plus rapide et la moins chère. Idéal pour : blogs, documentation, sites vitrines. Dans Next.js, les pages avec generateStaticParams() sont générées statiquement.",
    analogy:
      "SSG c'est comme imprimer un livre : il est préparé une fois, puis distribué à tous les lecteurs. Parfait pour un contenu qui ne change pas souvent.",
    examples: [
      "Blog Next.js : articles Markdown → HTML au build",
      "generateStaticParams() → génère les routes dynamiques au build",
      "CDN : les fichiers HTML distribués depuis des serveurs proches",
      "Cette app dev-skills utilise SSG pour les pages de concepts",
    ],
    relatedConcepts: ["ssr", "csr", "nextjs"],
    tags: ["rendu", "statique", "performance", "cdn"],
  },
  {
    id: "c-027",
    slug: "csr",
    name: "CSR — Client-Side Rendering",
    category: "rendu-web",
    shortDef:
      "Le navigateur reçoit un HTML vide et construit toute la page en exécutant JavaScript.",
    longDef:
      "Avec CSR, le serveur envoie un HTML minimal avec <div id='root'>. Le navigateur télécharge le bundle JS, l'exécute, et React construit le DOM. C'est l'approche des Single Page Applications (SPA). Avantages : navigation fluide. Inconvénients : mauvais SEO (HTML vide), affichage initial lent. Vite avec React crée des SPAs CSR par défaut.",
    analogy:
      "CSR c'est comme recevoir des meubles en kit (Ikea) : tu reçois les pièces (JS bundle) et tu assembles tout toi-même chez toi (dans le navigateur).",
    examples: [
      "React (Vite) : index.html avec <div id='root'> vide + bundle.js",
      "'use client' dans Next.js → composant rendu côté client",
      "SPA : URL change sans rechargement de page (react-router)",
      "Problème SEO : Google voit parfois <div id='root'></div> vide",
    ],
    relatedConcepts: ["ssr", "ssg", "react", "vite"],
    tags: ["rendu", "client", "spa", "javascript"],
  },

  // ── PAQUETS & DÉPENDANCES ─────────────────────────────────────────────────
  {
    id: "c-028",
    slug: "npm",
    name: "npm / pnpm",
    category: "paquets-dependances",
    shortDef:
      "Gestionnaires de paquets JavaScript qui installent et gèrent les dépendances d'un projet.",
    longDef:
      "npm (Node Package Manager) est le gestionnaire de paquets par défaut de Node.js. Il télécharge les bibliothèques depuis npmjs.com et les place dans node_modules/. pnpm est une alternative plus rapide et économe en espace disque : il utilise un store global et des liens symboliques. Commandes essentielles : npm install, npm run dev, npm install react.",
    analogy:
      "npm est comme une jardinerie : tu commandes des plantes (paquets) livrées dans ton jardin (node_modules). Le catalogue est npmjs.com.",
    examples: [
      "npm install → installe toutes les dépendances de package.json",
      "npm install react → ajoute React comme dépendance",
      "npm run dev → exécute le script 'dev' de package.json",
      "pnpm install → même chose mais plus rapide, moins d'espace disque",
    ],
    relatedConcepts: ["package-json", "node-modules", "pip"],
    tags: ["paquets", "javascript", "node", "gestionnaire"],
  },
  {
    id: "c-029",
    slug: "package-json",
    name: "package.json",
    category: "paquets-dependances",
    shortDef:
      "Fichier de configuration central d'un projet Node.js : dépendances et scripts.",
    longDef:
      "package.json est le manifeste de tout projet JavaScript/Node.js. Il contient : le nom et version du projet, les dépendances (dependencies pour la prod, devDependencies pour le dev), les scripts (dev, build, test). Le fichier package-lock.json verrouille les versions exactes installées pour garantir la reproductibilité.",
    analogy:
      "package.json est comme la liste d'ingrédients d'une recette : il liste tout ce dont tu as besoin pour reproduire exactement le projet.",
    examples: [
      "\"scripts\": { \"dev\": \"next dev\", \"build\": \"next build\" }",
      "\"dependencies\": { \"react\": \"^19.0.0\", \"next\": \"^16.0.0\" }",
      "\"devDependencies\": { \"typescript\": \"^5.0.0\" }",
      "npm run dev → exécute le script 'dev' défini dans package.json",
    ],
    relatedConcepts: ["npm", "node-modules"],
    tags: ["config", "node", "dépendances", "scripts"],
  },
  {
    id: "c-030",
    slug: "node-modules",
    name: "node_modules",
    category: "paquets-dependances",
    shortDef:
      "Dossier contenant toutes les bibliothèques installées d'un projet Node.js.",
    longDef:
      "node_modules/ est généré automatiquement par npm install. Il peut contenir des centaines de dossiers (dépendances directes + leurs dépendances transitives). Ce dossier ne doit jamais être commité sur Git (.gitignore). Il peut être supprimé et régénéré avec npm install. Sa taille peut atteindre plusieurs centaines de Mo.",
    analogy:
      "node_modules est comme ton grenier : tu y entreposes tous les outils (bibliothèques) dont tu as besoin, mais tu n'as pas besoin de regarder leur contenu au quotidien.",
    examples: [
      "ls node_modules → peut afficher 500+ dossiers",
      ".gitignore doit contenir : node_modules/",
      "rm -rf node_modules && npm install → réinstalle tout proprement",
      "pnpm : un seul exemplaire de chaque paquet partagé entre tous tes projets",
    ],
    relatedConcepts: ["npm", "package-json"],
    tags: ["node", "dépendances", "fichiers"],
  },
  {
    id: "c-031",
    slug: "venv",
    name: "venv (Python)",
    category: "paquets-dependances",
    shortDef:
      "Environnement virtuel Python qui isole les dépendances d'un projet des autres projets.",
    longDef:
      "En Python, pip installe les paquets globalement par défaut, ce qui crée des conflits entre projets. venv crée un environnement virtuel isolé : un dossier avec sa propre version de Python et ses propres paquets. Il faut l'activer avant de travailler (source venv/bin/activate sur Mac/Linux). requirements.txt liste les dépendances (équivalent de package.json).",
    analogy:
      "venv est comme une bulle isolée pour chaque projet Python : les bibliothèques installées dans une bulle ne perturbent pas les autres bulles.",
    examples: [
      "python -m venv venv → crée le dossier venv/",
      "source venv/bin/activate → active le venv (Mac/Linux)",
      "pip install flask → installe Flask dans le venv actif",
      "pip freeze > requirements.txt → génère la liste des dépendances",
    ],
    relatedConcepts: ["python", "pip", "node-modules"],
    tags: ["python", "environnement", "isolation", "dépendances"],
  },

  // ── STRUCTURE DE PROJET ───────────────────────────────────────────────────
  {
    id: "c-032",
    slug: "app-router",
    name: "App Router (Next.js)",
    category: "structure-projet",
    shortDef:
      "Convention de Next.js où la structure du dossier app/ définit directement les URLs.",
    longDef:
      "L'App Router (Next.js 13+) utilise le système de fichiers pour définir les routes. app/page.tsx → /, app/about/page.tsx → /about, app/concepts/[slug]/page.tsx → /concepts/:slug. Les layouts (layout.tsx) définissent une structure partagée. Les fichiers spéciaux : page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx.",
    analogy:
      "L'App Router est comme un organigramme transformé en URLs : l'arborescence des dossiers devient l'arborescence des pages.",
    examples: [
      "app/page.tsx → /",
      "app/categories/[slug]/page.tsx → /categories/langages",
      "app/layout.tsx → wrape toutes les pages (header, footer)",
      "app/quiz/loading.tsx → spinner affiché pendant le chargement",
    ],
    relatedConcepts: ["nextjs", "ssr", "react"],
    tags: ["nextjs", "routing", "structure", "fichiers"],
  },
  {
    id: "c-033",
    slug: "components-folder",
    name: "Dossier components/",
    category: "structure-projet",
    shortDef:
      "Convention de rangement des composants React réutilisables, séparés des pages.",
    longDef:
      "Le dossier components/ contient les composants UI réutilisables, indépendants d'une page spécifique. Deux sous-conventions populaires : components/ui/ (composants génériques : Button, Card, Input) et components/[feature]/ (composants métier). Cette séparation favorise la réutilisabilité. Les composants dans components/ ne connaissent pas les routes de l'application.",
    analogy:
      "components/ est comme une boîte à outils : tu y ranges tes outils réutilisables (boutons, cartes, formulaires) pour les utiliser dans n'importe quelle page.",
    examples: [
      "components/ui/button.tsx → Button réutilisable partout",
      "components/ui/card.tsx → Card avec variantes",
      "components/learning/concept-card.tsx → carte spécifique aux concepts",
      "components/layout/header.tsx → en-tête partagé",
    ],
    relatedConcepts: ["react", "nextjs", "app-router"],
    tags: ["structure", "composants", "réutilisabilité"],
  },
  {
    id: "c-034",
    slug: "public-folder",
    name: "Dossier public/",
    category: "structure-projet",
    shortDef:
      "Dossier pour les fichiers statiques directement accessibles par URL (images, icônes, fonts).",
    longDef:
      "Le dossier public/ dans Next.js contient les fichiers statiques servis directement par le serveur web. Un fichier public/logo.png est accessible via l'URL /logo.png. Idéal pour : les favicons, les robots.txt, les sitemap.xml, les fichiers téléchargeables. Next.js optimise automatiquement les images importées via <Image />, mais les fichiers de public/ peuvent aussi être référencés directement.",
    analogy:
      "public/ est comme la vitrine d'un magasin : les fichiers sont exposés directement au monde, sans transformation ni protection.",
    examples: [
      "public/favicon.ico → /favicon.ico dans le navigateur",
      "public/og-image.png → image d'aperçu pour les réseaux sociaux",
      "<img src='/logo.png' /> → accède au fichier public/logo.png",
      "public/robots.txt → instructions pour les robots de recherche",
    ],
    relatedConcepts: ["nextjs", "app-router"],
    tags: ["structure", "statique", "fichiers", "nextjs"],
  },

  // ── OUTILS DEV ────────────────────────────────────────────────────────────
  {
    id: "c-035",
    slug: "git",
    name: "Git",
    category: "outils-dev",
    shortDef:
      "Système de contrôle de version qui enregistre l'historique des modifications du code.",
    longDef:
      "Git est un système de gestion de versions distribué créé par Linus Torvalds. Il permet de : sauvegarder des snapshots du code (commits), revenir à une version précédente, travailler en parallèle sur des branches, collaborer. Chaque repo Git a un historique complet. Commandes fondamentales : git init, git add, git commit, git push, git pull, git branch, git merge.",
    analogy:
      "Git est comme les sauvegardes d'un jeu vidéo : tu peux avancer, tester des choses, et revenir à un point de sauvegarde si ça se passe mal.",
    examples: [
      "git add . && git commit -m 'feat: ajoute le quiz'",
      "git branch feature/flashcards → crée une branche",
      "git log --oneline → affiche l'historique des commits",
      "git diff → montre les modifications non commitées",
    ],
    relatedConcepts: ["cli"],
    tags: ["versionning", "collaboration", "outil"],
  },
  {
    id: "c-036",
    slug: "docker",
    name: "Docker",
    category: "outils-dev",
    shortDef:
      "Outil de conteneurisation qui empaquette une application avec tout son environnement d'exécution.",
    longDef:
      "Docker crée des conteneurs : des environnements isolés et reproductibles. Un Dockerfile décrit comment construire l'image (OS, dépendances, code). Une image peut tourner de façon identique sur n'importe quelle machine. Résout le problème 'ça marche sur ma machine'. docker-compose.yml permet de gérer plusieurs conteneurs ensemble. Tes projets openwebui et litellm tournent en Docker.",
    analogy:
      "Docker est comme une boîte de transport standardisée (conteneur maritime) : peu importe ce que tu mets dedans, la boîte a toujours la même forme et peut être transportée n'importe où.",
    examples: [
      "Dockerfile : FROM node:20 → COPY . . → RUN npm install → CMD ['npm', 'start']",
      "docker build -t mon-app . → construit l'image",
      "docker run -p 3000:3000 mon-app → lance le conteneur",
      "docker-compose up → lance app + PostgreSQL ensemble",
    ],
    relatedConcepts: ["yaml", "port", "serveur", "cli"],
    tags: ["conteneur", "déploiement", "environnement", "devops"],
  },
  {
    id: "c-037",
    slug: "cli",
    name: "CLI / Terminal",
    category: "outils-dev",
    shortDef:
      "Interface en ligne de commande pour interagir avec l'ordinateur via du texte.",
    longDef:
      "CLI (Command Line Interface) est une interface textuelle où tu tapes des commandes. Le terminal (Shell : bash, zsh, PowerShell) exécute ces commandes. Indispensable pour les développeurs : lancer des serveurs (npm run dev), installer des dépendances, gérer Git, naviguer dans les dossiers. Sur Mac, le shell par défaut est zsh.",
    analogy:
      "Le terminal est comme le volant d'une voiture de course : moins intuitif qu'un GPS tactile, mais bien plus puissant et précis pour qui le maîtrise.",
    examples: [
      "cd /Users/diederick/dev-skills → naviguer dans le dossier",
      "ls -la → liste les fichiers avec les détails",
      "npm run dev → lance le serveur de développement",
      "git status → vérifier l'état du repo",
    ],
    relatedConcepts: ["git", "npm", "docker"],
    tags: ["outil", "terminal", "commandes", "productivité"],
  },
  {
    id: "c-038",
    slug: "eslint",
    name: "ESLint & Prettier",
    category: "outils-dev",
    shortDef:
      "Outils qui analysent et formatent automatiquement le code pour maintenir une qualité constante.",
    longDef:
      "ESLint est un linter : il analyse le code statiquement pour détecter des erreurs et mauvaises pratiques (variable non utilisée, import manquant). Prettier est un formateur : il réécrit le code selon des règles de style (espaces, guillemets, virgules). Utilisés ensemble, ils garantissent un code cohérent dans toute l'équipe.",
    analogy:
      "ESLint est comme un correcteur d'orthographe, Prettier comme un correcteur de style : ensemble, ils s'assurent que ton code est sans fautes et agréable à lire.",
    examples: [
      "npm run lint → vérifie le code avec ESLint",
      "npx prettier --write . → formate tous les fichiers",
      "VSCode extension Prettier : formatage automatique à la sauvegarde",
      "eslint.config.mjs : configure les règles ESLint du projet",
    ],
    relatedConcepts: ["typescript", "nextjs", "cli"],
    tags: ["qualité", "outil", "formatage", "linting"],
  },

  // ── CONCEPTS PROGRAMMATION ────────────────────────────────────────────────
  {
    id: "c-039",
    slug: "async-await",
    name: "async / await",
    category: "concepts-programmation",
    shortDef:
      "Syntaxe JavaScript pour gérer des opérations longues (réseau, DB) de façon lisible.",
    longDef:
      "JavaScript est single-thread mais non-bloquant grâce à la programmation asynchrone. async/await est du sucre syntaxique sur les Promises. Une fonction async retourne toujours une Promise. await suspend l'exécution jusqu'à ce que la Promise soit résolue, sans bloquer le thread. Utilisé pour : les requêtes réseau (fetch), l'accès à la base de données, la lecture de fichiers.",
    analogy:
      "async/await c'est comme envoyer une lettre et attendre la réponse dans un café : tu continues à boire ton café (autres tâches), mais quand la réponse arrive (await), tu la lis immédiatement.",
    examples: [
      "async function getData() { const res = await fetch('/api/data'); return res.json() }",
      "try/catch : try { const data = await getData() } catch (err) { console.error(err) }",
      "Parallèle : const [a, b] = await Promise.all([fetchA(), fetchB()])",
      "Server Component : async function Page() { const data = await db.query() }",
    ],
    relatedConcepts: ["javascript", "api-rest"],
    tags: ["javascript", "asynchrone", "promise", "syntaxe"],
  },
  {
    id: "c-040",
    slug: "middleware",
    name: "Middleware",
    category: "concepts-programmation",
    shortDef:
      "Fonction intermédiaire qui s'exécute entre la requête et la réponse pour traiter ou bloquer.",
    longDef:
      "Le middleware est une fonction qui reçoit une requête, peut la modifier ou la bloquer, puis la passe au handler suivant. C'est une chaîne de traitements. Utilisations : authentification (vérifier le token JWT), logging, CORS, rate limiting. Dans Next.js, middleware.ts s'exécute sur chaque requête avant le rendu.",
    analogy:
      "Le middleware est comme le videur d'une boîte de nuit : il examine chaque personne (requête) avant de la laisser entrer ou de la refuser.",
    examples: [
      "Express auth : app.use((req, res, next) => { if (!req.headers.auth) return res.status(401).send(); next() })",
      "Next.js middleware.ts : vérifie la session avant chaque page protégée",
      "CORS middleware : ajoute les headers Access-Control-Allow-Origin",
      "Logger middleware : enregistre chaque requête avec son temps de réponse",
    ],
    relatedConcepts: ["api-rest", "http", "nextjs", "backend"],
    tags: ["backend", "sécurité", "http", "pattern"],
  },
  {
    id: "c-041",
    slug: "import-export",
    name: "Import / Export (modules)",
    category: "concepts-programmation",
    shortDef:
      "Mécanisme pour partager du code entre fichiers JavaScript et TypeScript.",
    longDef:
      "Les modules ES permettent d'organiser le code en fichiers séparés. export expose des fonctions, classes ou constantes. import les utilise dans un autre fichier. Deux styles : named exports (export function foo()) et default export (export default function). En TypeScript avec l'alias @/*, import { cn } from '@/lib/utils' résout vers lib/utils.ts depuis la racine.",
    analogy:
      "Les modules sont comme des boîtes de rangement étiquetées : tu mets tes outils dans des boîtes (export), et tu empruntes les outils d'une autre boîte quand tu en as besoin (import).",
    examples: [
      "Named export : export function cn() { ... } → import { cn } from '@/lib/utils'",
      "Default export : export default function Page() {} → import Page from './page'",
      "Re-export : export { Button, Card } from '@/components/ui'",
      "Alias TypeScript : @/* → résout depuis la racine du projet",
    ],
    relatedConcepts: ["typescript", "javascript", "node-modules"],
    tags: ["javascript", "modules", "organisation", "syntaxe"],
  },
  {
    id: "c-042",
    slug: "composant-react",
    name: "Composant React",
    category: "concepts-programmation",
    shortDef:
      "Fonction JavaScript qui retourne du JSX, représentant une partie de l'interface utilisateur.",
    longDef:
      "Un composant React est une fonction qui accepte des props (paramètres) et retourne du JSX. Les composants sont la brique de base de React : composables, réutilisables, ils encapsulent leur logique. Dans Next.js : Server Components (exécutés sur le serveur, async, pas d'état local) et Client Components (navigateur, useState/useEffect, nécessitent 'use client').",
    analogy:
      "Un composant React est comme un tampon encreur : tu le configures une fois (props), et tu peux l'appliquer autant de fois que tu veux.",
    examples: [
      "Composant : function Badge({ label }: { label: string }) { return <span>{label}</span> }",
      "Avec état : function Counter() { const [n, setN] = useState(0); return <button onClick={() => setN(n+1)}>{n}</button> }",
      "'use client' : requis pour useState, useEffect, event handlers",
      "Composition : <Card><CardHeader><CardTitle>Titre</CardTitle></CardHeader></Card>",
    ],
    relatedConcepts: ["react", "nextjs", "typescript"],
    tags: ["react", "composant", "ui", "pattern"],
  },

  // ── BASES DE DONNÉES ──────────────────────────────────────────────────────
  {
    id: "c-043",
    slug: "sql",
    name: "SQL",
    category: "bases-de-donnees",
    shortDef:
      "Langage de requête pour interagir avec les bases de données relationnelles.",
    longDef:
      "Structured Query Language est le standard pour interroger et manipuler les bases de données relationnelles. Les 4 opérations CRUD : SELECT (lire), INSERT (créer), UPDATE (modifier), DELETE (supprimer). Les données sont organisées en tables avec des relations (JOIN). SQL est déclaratif : tu décris ce que tu veux, pas comment l'obtenir.",
    analogy:
      "SQL est comme parler à un bibliothécaire ultra-organisé : 'Donne-moi tous les livres de cet auteur publiés après 2020, triés par date'.",
    examples: [
      "SELECT * FROM concepts WHERE category = 'langages' ORDER BY name",
      "INSERT INTO progress (concept_id, mastery) VALUES ('c-001', 'learning')",
      "JOIN : SELECT c.name, p.mastery FROM concepts c JOIN progress p ON c.id = p.concept_id",
      "Supabase : await supabase.from('concepts').select('*').eq('category', 'langages')",
    ],
    relatedConcepts: ["supabase", "orm"],
    tags: ["base-de-données", "requête", "relationnel"],
  },
  {
    id: "c-044",
    slug: "supabase",
    name: "Supabase",
    category: "bases-de-donnees",
    shortDef:
      "Backend-as-a-Service open source basé sur PostgreSQL avec auth, stockage et API temps réel.",
    longDef:
      "Supabase est une alternative open source à Firebase. Il fournit : PostgreSQL hébergé, authentification (email, OAuth), stockage de fichiers, API REST auto-générée, fonctions Edge. Dans le starter diederick, trois clients sont préconfigurés : client.ts (navigateur), server.ts (Server Components), admin.ts (bypass RLS). Ton monitoring dashboard le surveille.",
    analogy:
      "Supabase est comme un appartement meublé : au lieu de construire ta propre base de données, auth et API, tout est déjà là et prêt à utiliser.",
    examples: [
      "Query : const { data } = await supabase.from('users').select('id, name')",
      "Auth : await supabase.auth.signInWithPassword({ email, password })",
      "Realtime : supabase.channel('changes').on('postgres_changes', ...).subscribe()",
      "RLS : Row Level Security → politiques de sécurité au niveau des lignes",
    ],
    relatedConcepts: ["sql", "api-rest", "backend"],
    tags: ["base-de-données", "saas", "postgresql", "auth"],
  },
  {
    id: "c-045",
    slug: "orm",
    name: "ORM",
    category: "bases-de-donnees",
    shortDef:
      "Couche d'abstraction qui permet de manipuler une base de données avec du code objet plutôt qu'en SQL.",
    longDef:
      "Object-Relational Mapping traduit les requêtes SQL en code objet. Au lieu de SELECT * FROM users WHERE id = 1, on écrit prisma.user.findUnique({ where: { id: 1 } }). Les ORMs populaires en JavaScript/TypeScript : Prisma (type-safe), Drizzle (léger). En Python : SQLAlchemy. Les ORMs accélèrent le développement mais peuvent générer des requêtes sous-optimales.",
    analogy:
      "Un ORM est comme un traducteur en temps réel : tu parles ton langage (TypeScript), il traduit en SQL pour la base de données, et te retourne la réponse dans ton langage.",
    examples: [
      "Prisma : const user = await prisma.user.findUnique({ where: { id: 1 } })",
      "Prisma schema : model User { id Int @id @default(autoincrement()); name String }",
      "Drizzle : await db.select().from(users).where(eq(users.id, 1))",
      "Migrations : prisma migrate dev → synchronise le schéma avec la DB",
    ],
    relatedConcepts: ["sql", "supabase", "typescript"],
    tags: ["base-de-données", "abstraction", "typescript"],
  },

  // ── INTELLIGENCE ARTIFICIELLE ─────────────────────────────────────────────
  {
    id: "c-046",
    slug: "llm",
    name: "LLM",
    category: "intelligence-artificielle",
    shortDef:
      "Large Language Model — modèle d'IA entraîné sur des milliards de textes pour générer du langage.",
    longDef:
      "Les LLMs (GPT-4, Claude, Gemini, Llama) sont des réseaux de neurones transformers entraînés sur des milliards de mots. Ils prédisent le prochain token le plus probable. Ils peuvent répondre à des questions, générer du code, résumer, traduire, raisonner. Limites : knowledge cutoff, hallucinations, fenêtre de contexte limitée. Dans tes projets, Gemini est utilisé via lib/ai/gemini.ts.",
    analogy:
      "Un LLM est comme un bibliothécaire qui a lu tous les livres du monde et peut répondre à toutes tes questions, mais peut parfois inventer des détails de façon convaincante.",
    examples: [
      "Claude (Anthropic), GPT-4 (OpenAI), Gemini (Google), Llama (Meta)",
      "Appel API : await generateText('Explique le SSR en une phrase')",
      "Modèles locaux : Llama 3, Mistral — hébergés sur ta machine via Ollama",
      "LiteLLM dans tes projets : proxy qui unifie l'accès aux différents LLMs",
    ],
    relatedConcepts: ["prompt", "token-ia", "api-rest"],
    tags: ["ia", "llm", "génératif", "nlp"],
  },
  {
    id: "c-047",
    slug: "prompt",
    name: "Prompt engineering",
    category: "intelligence-artificielle",
    shortDef:
      "L'art de rédiger des instructions précises pour obtenir la meilleure réponse d'un LLM.",
    longDef:
      "Le prompt est l'instruction envoyée au LLM. Le prompt engineering optimise ces instructions. Techniques clés : system prompt (rôle et contexte général), few-shot prompting (exemples de la sortie souhaitée), chain-of-thought (demander de raisonner étape par étape), structured output (demander du JSON). La qualité du prompt a un impact direct sur la qualité de la réponse.",
    analogy:
      "Le prompt c'est comme donner des instructions à un stagiaire très compétent mais littéral : plus tu es précis et structuré, meilleur sera le résultat.",
    examples: [
      "System prompt : 'Tu es un tuteur pédagogique. Explique les concepts tech avec des analogies simples.'",
      "Few-shot : 'Voici comment je veux la réponse : [exemple]. Maintenant explique [concept].'",
      "Chain-of-thought : 'Réfléchis étape par étape avant de répondre.'",
      "Structured output : 'Réponds uniquement en JSON avec les champs: definition, analogy, examples'",
    ],
    relatedConcepts: ["llm", "token-ia"],
    tags: ["ia", "prompt", "llm", "technique"],
  },
  {
    id: "c-048",
    slug: "token-ia",
    name: "Token (IA)",
    category: "intelligence-artificielle",
    shortDef:
      "Unité de base que le LLM utilise pour traiter le texte — environ 3/4 d'un mot en français.",
    longDef:
      "Les LLMs ne voient pas les mots entiers mais des tokens : des sous-mots ou caractères. En anglais, 1 token ≈ 4 caractères. La 'context window' définit le nombre max de tokens qu'un LLM peut traiter en une fois (8k, 32k, 128k tokens selon les modèles). Les API LLM facturent au nombre de tokens (input + output). 1000 tokens ≈ 750 mots anglais.",
    analogy:
      "Un token est comme une pièce de monnaie pour le LLM : chaque mot a un coût en 'pièces'. La context window est ton portefeuille maximum.",
    examples: [
      "'Bonjour' = ~2 tokens, 'Hello' = 1 token (français moins efficace en tokens)",
      "Context window : Gemini 1.5 Pro = 1M tokens, GPT-4 Turbo = 128k tokens",
      "Coût : Gemini Flash = ~$0.0001/1k tokens, GPT-4o = ~$0.005/1k tokens",
      "RAG : technique pour travailler malgré les limites de contexte",
    ],
    relatedConcepts: ["llm", "prompt"],
    tags: ["ia", "llm", "coût", "technique"],
  },
];
