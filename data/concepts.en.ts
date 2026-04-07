// English overrides for concept text fields (shortDef, longDef, analogy)
// examples stay in FR/code form — mostly language-agnostic anyway
export const CONCEPTS_EN: Record<string, { shortDef: string; longDef: string; analogy: string }> = {
  "c-001": {
    shortDef: "The only language natively understood by web browsers.",
    longDef: "JavaScript is a dynamic, interpreted programming language created in 1995. It is the only language browsers understand natively (alongside HTML and CSS). It makes web pages interactive: animations, forms, data fetching. With Node.js, it also runs server-side. TypeScript is an extension of JavaScript.",
    analogy: "If HTML is the skeleton of a page and CSS its clothing, JavaScript is its muscles — it allows action and reaction.",
  },
  "c-002": {
    shortDef: "JavaScript with static types to catch errors before runtime.",
    longDef: "TypeScript has been developed by Microsoft since 2012. It extends JavaScript by adding type annotations. The compiler (tsc) transpiles it into plain JavaScript. Typing lets code editors detect bugs before running the code and offer autocompletion. All .ts or .tsx files are TypeScript.",
    analogy: "It's like writing with a real-time grammar checker — it flags errors before you hit send.",
  },
  "c-003": {
    shortDef: "Versatile, highly readable language — popular for AI, web, and data.",
    longDef: "Python is an interpreted, dynamically typed language designed for readability. Its syntax uses indentation as structure. Widely used in data science, AI/ML, scripting, and web development (Flask, FastAPI, Django). It doesn't run in the browser but server-side or locally. Its package manager is pip.",
    analogy: "Python is like plain English: close to natural language, easy to read, accessible to beginners.",
  },
  "c-004": {
    shortDef: "Markup language that structures the content of a web page.",
    longDef: "HyperText Markup Language defines the semantic structure of pages via tags (<div>, <p>, <h1>, <img>…). HTML is not a programming language — it has no conditional logic. It describes what a page contains. HTML5 introduced semantic elements like <article>, <nav>, <section>.",
    analogy: "HTML is the architect's blueprint of a house: it describes which rooms exist and where, without specifying decoration or functionality.",
  },
  "c-005": {
    shortDef: "Style language that controls the visual appearance of HTML elements.",
    longDef: "Cascading Style Sheets styles HTML elements: colors, fonts, spacing, layout (flexbox, grid), animations. 'Cascading' means rules apply in cascade by specificity. Tailwind CSS is a framework that replaces manual CSS files with utility classes.",
    analogy: "CSS is the web page's stylist: it picks colors, font sizes, and element layout.",
  },
  "c-006": {
    shortDef: "Universal text format for exchanging structured data between applications.",
    longDef: "JavaScript Object Notation is a text data format derived from JavaScript object syntax. It supports 6 types: string, number, boolean, null, array, object. JSON has become the web's standard data exchange format. It's also used for configuration (package.json, tsconfig.json).",
    analogy: "JSON is like an administrative form: named fields with values, structured in a universally understandable way.",
  },
  "c-007": {
    shortDef: "Human-readable configuration format used in Python and Rust projects.",
    longDef: "Tom's Obvious, Minimal Language is a configuration format designed to be simple to read. It uses [section] headers and key = value pairs. Less verbose than JSON (no quotes for keys) and more structured than YAML. Used in pyproject.toml (Python), Cargo.toml (Rust), and many tools.",
    analogy: "TOML is like an improved .ini file: easy to read, well-structured, without YAML's complexity or JSON's braces.",
  },
  "c-008": {
    shortDef: "Text file that stores a project's sensitive environment variables.",
    longDef: "A .env file contains KEY=value pairs: API keys, database URLs, secrets. This file must never be committed to Git (listed in .gitignore). In development, dotenv (Node.js) or python-dotenv (Python) load these variables at startup. In production, variables are injected directly by the platform (Vercel, Railway).",
    analogy: "The .env file is like your house keys: you need it to run the app, but you don't share it with anyone.",
  },
  "c-009": {
    shortDef: "Readable serialization format massively used for DevOps configuration.",
    longDef: "YAML Ain't Markup Language is an indentation-based format. It's very readable but sensitive to spaces. Widely used for: GitHub Actions, Docker Compose, Kubernetes. Types are automatically inferred (true becomes boolean). Comments are possible with #.",
    analogy: "YAML is like JSON but written like a shopping list: no braces, no commas, just indentation for structure.",
  },
  "c-010": {
    shortDef: "JavaScript library for building interfaces from reusable components.",
    longDef: "React has been developed by Meta since 2013. It introduces the concept of components: JavaScript functions that return JSX (HTML in JS). React manages a virtual DOM and only updates the parts of the page that changed. Hooks (useState, useEffect) manage state. React is a UI library, not a complete framework.",
    analogy: "React is like Lego: you build small reusable bricks (components), then assemble them to create the complete page.",
  },
  "c-011": {
    shortDef: "Full-stack React framework that adds routing, server rendering, and API routes.",
    longDef: "Next.js is developed by Vercel. It builds on top of React to offer: file-system-based routing (App Router), server (SSR) and static (SSG) rendering, Server Components, API Routes (HTTP endpoints in the same project), image optimization.",
    analogy: "If React is a car engine, Next.js is the complete car with bodywork, GPS, and dashboard.",
  },
  "c-012": {
    shortDef: "Ultra-fast build tool for modern JavaScript projects (React, Vue…).",
    longDef: "Vite uses the browser's native ES Modules in development to avoid bundling all code on every change. In production, it uses Rollup to create an optimized bundle. It's the successor to Create React App. It offers near-instant Hot Module Replacement (HMR).",
    analogy: "Vite (which means 'fast' in French) is like serving dishes individually: you only wait for what you need, not for the whole kitchen to be ready.",
  },
  "c-013": {
    shortDef: "Minimalist Python micro-framework for creating servers and APIs quickly.",
    longDef: "Flask is a Python micro-framework. 'Micro' means it forces no architectural choices: no imposed ORM, no built-in validation. It provides the essentials: URL routing, HTTP request handling, Jinja2 templates. Perfect for simple REST APIs or prototypes.",
    analogy: "Flask is like a minimalist toolkit: you have the essentials, and you add other tools only when needed.",
  },
  "c-014": {
    shortDef: "Utility CSS framework that applies styling via short classes directly in HTML.",
    longDef: "Tailwind CSS is utility-first: instead of semantic classes (.card, .btn-primary), you compose styles with atomic classes (flex, p-4, bg-blue-500, rounded-lg). Tailwind v4 uses @import 'tailwindcss' in globals.css. It only generates CSS that's actually used, resulting in very small bundles.",
    analogy: "Tailwind is like applying makeup directly with precise colors, rather than using predefined 'looks'. You control every detail.",
  },
  "c-015": {
    shortDef: "Tool that groups all project files into optimized files for the browser.",
    longDef: "A bundler analyzes your code's imports to create a dependency graph, then groups everything into a bundle. It applies transformations: TypeScript transpilation, minification, tree-shaking (removing unused code), code splitting. Main bundlers: Webpack (legacy), Vite/Rollup (modern), esbuild (ultra-fast).",
    analogy: "The bundler is like a chef who takes all your separate ingredients (files), prepares them (optimizes), and presents them as one dish (bundle) ready to serve.",
  },
  "c-016": {
    shortDef: "Conversion of source code from one language (or version) to another equivalent language.",
    longDef: "Transpilation produces source code in another language, not machine code. Examples: TypeScript → JavaScript (via tsc or esbuild), JSX → pure JavaScript (via Babel), ES2022+ → ES5 (for browser compatibility). The resulting code is functionally equivalent but in a format the target can execute. Next.js transpiles automatically.",
    analogy: "It's like translating a book from French to English: the meaning stays identical, but the format changes to be understood by the target.",
  },
  "c-017": {
    shortDef: "The distinction between the local development environment and production online.",
    longDef: "In development (dev), the server reloads automatically on every change (HMR), errors are detailed, code isn't optimized. In production (prod), code is bundled, minified, optimized. Environment variables differ. Commands: npm run dev (development) vs npm run build && npm start (production).",
    analogy: "Dev is like rehearsing a play backstage: you can stop, correct, restart. Prod is the public performance.",
  },
  "c-018": {
    shortDef: "Program that listens for HTTP requests on a port and returns responses.",
    longDef: "A web server is a process that runs continuously, listens on a network port, and responds to HTTP requests. It can serve static files (HTML, CSS), execute code (Node.js, Python), and return data (JSON). Common servers: Express/Fastify (Node.js), Flask/FastAPI (Python), Nginx (proxy). Next.js includes its own server.",
    analogy: "A web server is like a restaurant waiter: it waits for your order (request), prepares it (executes code), and brings it to you (returns a response).",
  },
  "c-019": {
    shortDef: "Number identifying a specific service on a machine, from 0 to 65535.",
    longDef: "A port is an integer between 0 and 65535. Each network service listens on a port: HTTP = 80, HTTPS = 443, PostgreSQL = 5432, Next.js dev = 3000. The URL http://localhost:3000 means: connect to the local machine, service on port 3000. Two applications cannot listen on the same port simultaneously.",
    analogy: "Ports are like apartments in a building: the building is your computer, and each apartment (port) houses a different service.",
  },
  "c-020": {
    shortDef: "Communication protocol between a client (browser) and a web server.",
    longDef: "HyperText Transfer Protocol is the web's communication protocol. An HTTP request includes: a method (GET, POST, PUT, DELETE), a URL, headers, an optional body. The response includes: a status code (200 OK, 404 Not Found, 500 Server Error), headers, a body. HTTPS adds TLS encryption. In production, HTTPS is mandatory.",
    analogy: "HTTP is like a standardized order form: you fill in what you want (request), send it, and receive what you asked for (response).",
  },
  "c-021": {
    shortDef: "Communication interface between applications via HTTP, with standardized conventions.",
    longDef: "REST (Representational State Transfer) is an architectural style for web APIs. Resources are identified by URLs (/users, /products/42). CRUD operations map to HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (delete). Responses are in JSON. REST is stateless: each request contains all necessary information.",
    analogy: "A REST API is like a standardized menu: each dish (resource) has a fixed name, and you use the same actions (order, modify, cancel) for all restaurants.",
  },
  "c-022": {
    shortDef: "The part of an application that runs in the browser and is visible to the user.",
    longDef: "The frontend (client-side) is everything the user sees: HTML, CSS, JavaScript running in the browser. The frontend communicates with the backend via HTTP requests. Frontend technologies: React, Vue, Angular. Next.js blurs the boundary by allowing server code in the same project via Server Components.",
    analogy: "The frontend is a store's facade: it's what the customer sees, touches, and interacts with. What happens in the kitchen (backend) is invisible.",
  },
  "c-023": {
    shortDef: "The server side that handles business logic, database, and authentication.",
    longDef: "The backend runs on a server, invisible to the user. It handles: database access, authentication, data validation, complex calculations. The frontend cannot directly access the database for security reasons. In Next.js, API Routes and Server Components execute server-side.",
    analogy: "The backend is a restaurant's kitchen: the customer doesn't see it, but that's where everything is prepared, stored, and secured.",
  },
  "c-024": {
    shortDef: "Developer or application that covers both frontend and backend.",
    longDef: "A full-stack developer masters both sides. Next.js is a quintessential full-stack framework: React pages (frontend) coexist with API Routes and Server Components (backend) in the same repository. Benefits: no CORS, shared TypeScript types, simplified deployment.",
    analogy: "A full-stack developer is like an architect-contractor who designs the building AND oversees construction: they see the entire project.",
  },
  "c-025": {
    shortDef: "HTML is generated on the server for each request, then sent ready to the browser.",
    longDef: "With SSR, the server executes React code, generates complete HTML, and sends it to the browser. The browser receives an already-rendered page, which is excellent for SEO and initial display speed. React then 'hydrates' the page (adds interactivity). In Next.js, Server Components use SSR by default.",
    analogy: "SSR is like ordering a meal at a restaurant: the chef prepares everything in the kitchen (server), and you receive the finished plate (browser).",
  },
  "c-026": {
    shortDef: "HTML pages are generated once at build time and served as static files.",
    longDef: "With SSG, pages are generated at build time (npm run build), not on each request. The result is a set of static HTML files served by a CDN with no server. This is the fastest and cheapest solution. Ideal for: blogs, documentation, showcase sites. In Next.js, pages with generateStaticParams() are generated statically.",
    analogy: "SSG is like printing a book: it's prepared once, then distributed to all readers. Perfect for content that doesn't change often.",
  },
  "c-027": {
    shortDef: "The browser receives an empty HTML and builds the entire page by executing JavaScript.",
    longDef: "With CSR, the server sends minimal HTML with <div id='root'>. The browser downloads the JS bundle, executes it, and React builds the DOM. This is the Single Page Application (SPA) approach. Advantages: smooth navigation. Disadvantages: poor SEO (empty HTML), slow initial display.",
    analogy: "CSR is like receiving flat-pack furniture (Ikea): you receive the parts (JS bundle) and assemble everything yourself at home (in the browser).",
  },
  "c-028": {
    shortDef: "JavaScript package managers that install and manage a project's dependencies.",
    longDef: "npm (Node Package Manager) is Node.js's default package manager. It downloads libraries from npmjs.com and places them in node_modules/. pnpm is a faster, more disk-efficient alternative: it uses a global store and symlinks. Essential commands: npm install, npm run dev, npm install react.",
    analogy: "npm is like a garden center: you order plants (packages) delivered to your garden (node_modules). The catalog is npmjs.com.",
  },
  "c-029": {
    shortDef: "Central configuration file for a Node.js project: dependencies and scripts.",
    longDef: "package.json is the manifest of every JavaScript/Node.js project. It contains: project name and version, dependencies (dependencies for prod, devDependencies for dev), scripts (dev, build, test). The package-lock.json file locks exact installed versions to guarantee reproducibility.",
    analogy: "package.json is like a recipe's ingredient list: it lists everything you need to reproduce the project exactly.",
  },
  "c-030": {
    shortDef: "Folder containing all installed libraries of a Node.js project.",
    longDef: "node_modules/ is automatically generated by npm install. It can contain hundreds of folders (direct dependencies + their transitive dependencies). This folder must never be committed to Git (.gitignore). It can be deleted and regenerated with npm install. Its size can reach several hundred MB.",
    analogy: "node_modules is like your attic: you store all the tools (libraries) you need there, but you don't need to look at their contents daily.",
  },
  "c-031": {
    shortDef: "Python virtual environment that isolates a project's dependencies from other projects.",
    longDef: "In Python, pip installs packages globally by default, creating conflicts between projects. venv creates an isolated virtual environment: a folder with its own Python version and packages. It must be activated before working (source venv/bin/activate on Mac/Linux). requirements.txt lists dependencies (equivalent to package.json).",
    analogy: "venv is like an isolated bubble for each Python project: libraries installed in one bubble don't disturb the others.",
  },
  "c-032": {
    shortDef: "Next.js convention where the app/ folder structure directly defines URLs.",
    longDef: "The App Router (Next.js 13+) uses the file system to define routes. app/page.tsx → /, app/about/page.tsx → /about, app/concepts/[slug]/page.tsx → /concepts/:slug. Layouts (layout.tsx) define shared structure. Special files: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx.",
    analogy: "The App Router is like an org chart turned into URLs: the folder tree becomes the page tree.",
  },
  "c-033": {
    shortDef: "Convention for storing reusable React components, separate from pages.",
    longDef: "The components/ folder contains reusable UI components, independent of a specific page. Two popular sub-conventions: components/ui/ (generic components: Button, Card, Input) and components/[feature]/ (business components). This separation promotes reusability. Components in components/ don't know the app's routes.",
    analogy: "components/ is like a toolbox: you store your reusable tools (buttons, cards, forms) to use on any page.",
  },
  "c-034": {
    shortDef: "Folder for static files directly accessible via URL (images, icons, fonts).",
    longDef: "The public/ folder in Next.js contains static files served directly by the web server. A public/logo.png file is accessible via the URL /logo.png. Ideal for: favicons, robots.txt, sitemap.xml, downloadable files. Next.js automatically optimizes images imported via <Image />, but public/ files can also be referenced directly.",
    analogy: "public/ is like a store's shop window: files are directly exposed to the world, without transformation or protection.",
  },
  "c-035": {
    shortDef: "Version control system that records the history of code changes.",
    longDef: "Git is a distributed version control system created by Linus Torvalds. It allows: saving code snapshots (commits), reverting to a previous version, working in parallel on branches, collaborating. Each Git repo has a complete history. Fundamental commands: git init, git add, git commit, git push, git pull, git branch, git merge.",
    analogy: "Git is like save points in a video game: you can progress, test things, and go back to a save point if things go wrong.",
  },
  "c-036": {
    shortDef: "Containerization tool that packages an application with its entire execution environment.",
    longDef: "Docker creates containers: isolated, reproducible environments. A Dockerfile describes how to build the image (OS, dependencies, code). An image can run identically on any machine. Solves the 'works on my machine' problem. docker-compose.yml manages multiple containers together.",
    analogy: "Docker is like a standardized shipping container: whatever you put inside, the container always has the same shape and can be transported anywhere.",
  },
  "c-037": {
    shortDef: "Command-line interface for interacting with the computer via text.",
    longDef: "CLI (Command Line Interface) is a text interface where you type commands. The terminal (Shell: bash, zsh, PowerShell) executes these commands. Essential for developers: launching servers (npm run dev), installing dependencies, managing Git, navigating folders. On Mac, the default shell is zsh.",
    analogy: "The terminal is like a racing car's steering wheel: less intuitive than a touchscreen GPS, but much more powerful and precise for those who master it.",
  },
  "c-038": {
    shortDef: "Tools that automatically analyze and format code to maintain consistent quality.",
    longDef: "ESLint is a linter: it statically analyzes code to detect errors and bad practices (unused variable, missing import). Prettier is a formatter: it rewrites code according to style rules (spaces, quotes, commas). Used together, they guarantee consistent code across the whole team.",
    analogy: "ESLint is like a spell checker, Prettier like a style checker: together, they ensure your code is error-free and pleasant to read.",
  },
  "c-039": {
    shortDef: "JavaScript syntax for handling long operations (network, DB) readably.",
    longDef: "JavaScript is single-threaded but non-blocking thanks to asynchronous programming. async/await is syntactic sugar over Promises. An async function always returns a Promise. await suspends execution until the Promise resolves, without blocking the thread. Used for: network requests (fetch), database access, file reading.",
    analogy: "async/await is like sending a letter and waiting for the reply in a café: you keep drinking your coffee (other tasks), but when the reply arrives (await), you read it immediately.",
  },
  "c-040": {
    shortDef: "Intermediate function that runs between the request and response to process or block.",
    longDef: "Middleware is a function that receives a request, can modify or block it, then passes it to the next handler. It's a chain of processing. Uses: authentication (verify JWT token), logging, CORS, rate limiting. In Next.js, middleware.ts runs on every request before rendering.",
    analogy: "Middleware is like a nightclub bouncer: it examines each person (request) before letting them in or turning them away.",
  },
  "c-041": {
    shortDef: "Mechanism for sharing code between JavaScript and TypeScript files.",
    longDef: "ES modules allow organizing code into separate files. export exposes functions, classes, or constants. import uses them in another file. Two styles: named exports (export function foo()) and default export (export default function). In TypeScript with the @/* alias, import { cn } from '@/lib/utils' resolves to lib/utils.ts from the root.",
    analogy: "Modules are like labeled storage boxes: you put your tools in boxes (export), and you borrow tools from another box when you need them (import).",
  },
  "c-042": {
    shortDef: "JavaScript function that returns JSX, representing part of the user interface.",
    longDef: "A React component is a function that accepts props (parameters) and returns JSX. Components are React's building blocks: composable, reusable, they encapsulate their logic. In Next.js: Server Components (run on server, async, no local state) and Client Components (browser, useState/useEffect, require 'use client').",
    analogy: "A React component is like a rubber stamp: you configure it once (props), and you can apply it as many times as you want.",
  },
  "c-043": {
    shortDef: "Query language for interacting with relational databases.",
    longDef: "Structured Query Language is the standard for querying and manipulating relational databases. The 4 CRUD operations: SELECT (read), INSERT (create), UPDATE (modify), DELETE (delete). Data is organized in tables with relationships (JOIN). SQL is declarative: you describe what you want, not how to get it.",
    analogy: "SQL is like talking to an ultra-organized librarian: 'Give me all books by this author published after 2020, sorted by date'.",
  },
  "c-044": {
    shortDef: "Open source Backend-as-a-Service based on PostgreSQL with auth, storage, and real-time API.",
    longDef: "Supabase is an open source alternative to Firebase. It provides: hosted PostgreSQL, authentication (email, OAuth), file storage, auto-generated REST API, Edge functions. Three clients are pre-configured: client.ts (browser), server.ts (Server Components), admin.ts (bypass RLS).",
    analogy: "Supabase is like a furnished apartment: instead of building your own database, auth, and API, everything is already there and ready to use.",
  },
  "c-045": {
    shortDef: "Abstraction layer that allows manipulating a database with object code rather than SQL.",
    longDef: "Object-Relational Mapping translates SQL queries into object code. Instead of SELECT * FROM users WHERE id = 1, you write prisma.user.findUnique({ where: { id: 1 } }). Popular ORMs in JavaScript/TypeScript: Prisma (type-safe), Drizzle (lightweight). In Python: SQLAlchemy.",
    analogy: "An ORM is like a real-time translator: you speak your language (TypeScript), it translates to SQL for the database, and returns the response in your language.",
  },
  "c-046": {
    shortDef: "Large Language Model — AI model trained on billions of texts to generate language.",
    longDef: "LLMs (GPT-4, Claude, Gemini, Llama) are transformer neural networks trained on billions of words. They predict the most probable next token. They can answer questions, generate code, summarize, translate, reason. Limitations: knowledge cutoff, hallucinations, limited context window.",
    analogy: "An LLM is like a librarian who has read every book in the world and can answer all your questions, but may sometimes convincingly make up details.",
  },
  "c-047": {
    shortDef: "The art of writing precise instructions to get the best response from an LLM.",
    longDef: "The prompt is the instruction sent to the LLM. Prompt engineering optimizes these instructions. Key techniques: system prompt (general role and context), few-shot prompting (examples of desired output), chain-of-thought (ask to reason step by step), structured output (ask for JSON). Prompt quality directly impacts response quality.",
    analogy: "Prompting is like giving instructions to a highly skilled but literal intern: the more precise and structured you are, the better the result.",
  },
  "c-048": {
    shortDef: "Basic unit the LLM uses to process text — roughly 3/4 of an English word.",
    longDef: "LLMs don't see whole words but tokens: sub-words or characters. In English, 1 token ≈ 4 characters. The 'context window' defines the maximum number of tokens an LLM can process at once. LLM APIs charge by token count (input + output). 1000 tokens ≈ 750 English words.",
    analogy: "A token is like a coin for the LLM: each word has a cost in 'coins'. The context window is your maximum wallet.",
  },
};
