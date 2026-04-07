// English translations for quiz questions
// Keys match question ids (q-001 to q-096)

export const QUESTIONS_EN: Record<string, { question: string; answers: string[]; explanation: string }> = {
  "q-001": {
    question: "Which is the only programming language natively understood by web browsers?",
    answers: ["Python", "JavaScript", "TypeScript", "PHP"],
    explanation: "JavaScript is the only language natively understood by all browsers. TypeScript is transpiled to JS before execution.",
  },
  "q-002": {
    question: "What does JSON.parse() do in JavaScript?",
    answers: ["Converts a JS object to JSON text", "Validates a JSON file", "Converts a JSON string into a JavaScript object", "Sends JSON data to a server"],
    explanation: "JSON.parse() takes a JSON string (text) and converts it into a JavaScript object. The reverse operation is JSON.stringify().",
  },
  "q-003": {
    question: "What is the main difference between TypeScript and JavaScript?",
    answers: ["TypeScript runs faster", "TypeScript adds static typing", "TypeScript is exclusive to Node.js", "TypeScript replaces HTML"],
    explanation: "TypeScript is a superset of JavaScript that adds optional type annotations. The compiler (tsc) converts it to standard JavaScript.",
  },
  "q-004": {
    question: "Which TypeScript keyword declares the expected shape of an object?",
    answers: ["type", "interface", "struct", "class"],
    explanation: "interface is the TypeScript keyword for declaring the shape of an object. type is an alternative, but interface is preferred for objects.",
  },
  "q-005": {
    question: "Which character does Python use to structure code (where JS uses braces)?",
    answers: ["Parentheses ()", "Tabs/spaces (indentation)", "Brackets []", "Semicolons ;"],
    explanation: "Python uses indentation (spaces or tabs) to define code blocks. It is mandatory and part of the syntax.",
  },
  "q-006": {
    question: "Which package manager is associated with Python?",
    answers: ["npm", "cargo", "pip", "gem"],
    explanation: "pip (Pip Installs Packages) is Python's standard package manager, equivalent to npm for JavaScript.",
  },
  "q-007": {
    question: "Is HTML a programming language?",
    answers: ["Yes, it allows creating applications", "No, it is a markup language (structure)", "Yes, but only for forms", "No, it is a styling language"],
    explanation: "HTML is a markup language, not a programming language. It describes the structure of a page (headings, paragraphs, images) without conditional logic.",
  },
  "q-008": {
    question: "Which HTML tag creates the most important heading on a page?",
    answers: ["<title>", "<header>", "<h1>", "<main>"],
    explanation: "<h1> is the level-1 heading, the most important semantically. There should be only one per page. <title> relates to the browser tab.",
  },
  "q-009": {
    question: "What does 'Cascading' mean in CSS?",
    answers: ["Styles are animated", "Rules apply in cascade based on specificity", "CSS downloads in cascade", "Colors are gradients"],
    explanation: "Cascading means multiple rules can apply to the same element, resolved by a priority order (specificity, order of appearance).",
  },
  "q-010": {
    question: "Which CSS property easily aligns elements in rows or columns?",
    answers: ["display: block", "display: flex", "display: inline", "position: absolute"],
    explanation: "display: flex activates the Flexbox model which allows aligning elements horizontally or vertically with justify-content and align-items.",
  },
  "q-011": {
    question: "How many data types does JSON support?",
    answers: ["3 (string, number, boolean)", "4 (string, number, boolean, null)", "6 (string, number, boolean, null, array, object)", "8 (all JavaScript types)"],
    explanation: "JSON supports exactly 6 types: string, number, boolean, null, array and object. It does not support undefined, Date or Function.",
  },
  "q-012": {
    question: "Which JSON file defines the dependencies and scripts of a Node.js project?",
    answers: ["config.json", "project.json", "package.json", "node.json"],
    explanation: "package.json is the central manifest of any Node.js project. It contains dependencies and scripts (dev, build, test).",
  },
  "q-013": {
    question: "In which type of project is a pyproject.toml file commonly found?",
    answers: ["JavaScript projects", "Python projects", "Docker projects", "GitHub Actions projects"],
    explanation: "pyproject.toml is the standard configuration file for modern Python projects, used by Poetry, Ruff, Black and other tools.",
  },
  "q-014": {
    question: "What is the main difference between TOML and JSON for configuration?",
    answers: ["TOML is faster to parse", "TOML allows comments and is more readable", "TOML supports more data types", "TOML is exclusive to Python"],
    explanation: "TOML allows comments (# like this) and doesn't need quotes for keys, making it more readable than JSON for config files.",
  },
  "q-015": {
    question: "Why should you never commit the .env file to Git?",
    answers: ["It is too large", "It contains secrets (API keys, passwords) that must not be shared", "Git does not support this format", "It slows down the repository"],
    explanation: "The .env file contains secrets (API keys, database URLs, passwords). Exposing them in Git is a major security vulnerability. It should be added to .gitignore.",
  },
  "q-016": {
    question: "How do you access a variable from the .env file in Node.js?",
    answers: ["env.VARIABLE_NAME", "import { VARIABLE_NAME } from '.env'", "process.env.VARIABLE_NAME", "config.VARIABLE_NAME"],
    explanation: "In Node.js, environment variables are accessible via the process.env object. Example: process.env.GEMINI_API_KEY.",
  },
  "q-017": {
    question: "What is YAML particularly sensitive to?",
    answers: ["Quotes", "Commas", "Indentation (spaces)", "Uppercase letters"],
    explanation: "YAML uses indentation to structure data. One extra or missing space can completely change the meaning of the file.",
  },
  "q-018": {
    question: "In which context are YAML files most commonly found?",
    answers: ["Databases", "DevOps: Docker, GitHub Actions, Kubernetes", "User interfaces", "Network security"],
    explanation: "YAML is massively used in DevOps for Docker Compose, GitHub Actions, Kubernetes and other infrastructure tool configuration files.",
  },
  "q-019": {
    question: "Which React hook manages local state in a component?",
    answers: ["useEffect", "useState", "useContext", "useRef"],
    explanation: "useState returns a pair [value, setter]. Example: const [count, setCount] = useState(0). useEffect handles side effects after rendering.",
  },
  "q-020": {
    question: "What is JSX in React?",
    answers: ["A separate programming language", "HTML that runs in the browser", "A syntax mixing JavaScript and HTML, transpiled to pure JS", "A CSS framework"],
    explanation: "JSX is syntactic sugar: <Button label='ok' /> is transpiled to React.createElement(Button, { label: 'ok' }). It is not real HTML.",
  },
  "q-021": {
    question: "In Next.js App Router, how do you create a page accessible at the URL /about?",
    answers: ["Create pages/about.tsx", "Create app/about/page.tsx", "Create routes/about.tsx", "Add a route in next.config.ts"],
    explanation: "In App Router, the folder structure defines the routes. app/about/page.tsx → /about. The file MUST be named page.tsx.",
  },
  "q-022": {
    question: "What does 'use client' at the top of a Next.js component mean?",
    answers: ["The component uses Supabase client data", "The component runs in the browser and can use useState/useEffect", "The component is public", "The component is server-side"],
    explanation: "'use client' marks the component as a Client Component. Without this directive, components in app/ are Server Components by default.",
  },
  "q-023": {
    question: "What is the main characteristic that distinguishes Vite from previous build tools?",
    answers: ["It generates Python code", "It uses native ES Modules in the browser, making startup near-instant", "It fully replaces Node.js", "It works without JavaScript"],
    explanation: "Vite leverages native browser ES Modules in development: no need to bundle all the code. Result: startup in ~200ms instead of several seconds.",
  },
  "q-024": {
    question: "Which folder does Vite generate when running npm run build?",
    answers: [".next/", "build/", "dist/", "out/"],
    explanation: "Vite generates a dist/ folder containing the production-optimized files. Next.js uses .next/, and Create React App used build/.",
  },
  "q-025": {
    question: "Flask is described as a 'micro-framework'. What does 'micro' mean here?",
    answers: ["It can only handle small projects", "It imposes few architectural choices and stays minimal", "It is written in few lines of code", "It only handles a single route"],
    explanation: "'Micro' means Flask forces no choices: no imposed ORM, no built-in validation. It provides the essentials of HTTP routing and you add what you need.",
  },
  "q-026": {
    question: "How do you start a Flask server on port 5000?",
    answers: ["python start --port 5000", "flask run --port 5000", "npm start 5000", "node flask.py 5000"],
    explanation: "The command flask run --port 5000 starts the Flask development server on port 5000. You need to have activated the venv and installed Flask first.",
  },
  "q-027": {
    question: "How does Tailwind CSS apply styles to HTML elements?",
    answers: ["Via a single global CSS file", "Via short utility classes directly in the HTML", "Via JavaScript only", "Via global CSS variables"],
    explanation: "Tailwind is 'utility-first': you compose styles with atomic classes (bg-blue-500, flex, p-4) directly in JSX/HTML rather than writing separate CSS.",
  },
  "q-028": {
    question: "What is the main advantage of Tailwind in terms of final CSS file size?",
    answers: ["The CSS file contains all possible classes", "Only classes actually used in the code are included", "Tailwind automatically compresses images", "No CSS file is generated"],
    explanation: "Tailwind automatically purges unused classes at build time. The final CSS only contains classes actually present in the code.",
  },
  "q-029": {
    question: "What is the main role of a bundler?",
    answers: ["Execute JavaScript code", "Bundle many source files into a few optimized files", "Deploy the application to a server", "Manage databases"],
    explanation: "A bundler analyzes your imports/require, creates a dependency graph, and bundles everything into one or a few optimized files for the browser.",
  },
  "q-030": {
    question: "What does 'tree-shaking' done by a bundler mean?",
    answers: ["Animate trees in CSS", "Remove JavaScript code that is never used", "Sort files alphabetically", "Convert images to SVG"],
    explanation: "Tree-shaking removes dead code (functions imported but never called). Result: smaller bundles and faster-loading pages.",
  },
  "q-031": {
    question: "What is the difference between compilation and transpilation?",
    answers: ["They are synonyms", "Compilation produces machine code, transpilation produces source code in another language", "Transpilation is slower", "Compilation only works with Python"],
    explanation: "Compilation produces binary machine code (C → .exe). Transpilation produces source code in another same-level language (TypeScript → JavaScript).",
  },
  "q-032": {
    question: "Why must TypeScript be transpiled before being served in a browser?",
    answers: ["TypeScript is too large", "Browsers don't natively understand TypeScript, only JavaScript", "TypeScript is proprietary to Microsoft", "It improves security"],
    explanation: "Browsers only understand JavaScript. TypeScript must be transpiled to pure JS by the tsc compiler or tools like esbuild (used by Next.js).",
  },
  "q-033": {
    question: "Which command launches Next.js in development mode with automatic reloading?",
    answers: ["npm run build", "npm start", "npm run dev", "npm run prod"],
    explanation: "npm run dev starts the Next.js development server with Hot Module Replacement (HMR): code changes are immediately reflected in the browser.",
  },
  "q-034": {
    question: "What is the correct sequence for deploying a Next.js app to production?",
    answers: ["npm start only", "npm run dev && npm start", "npm run build then npm start", "npm install && npm run dev"],
    explanation: "You must first build (npm run build) to create optimized files in .next/, then npm start launches the production server that serves these files.",
  },
  "q-035": {
    question: "What is a web server fundamentally?",
    answers: ["A very powerful computer", "A program that listens to HTTP requests and returns responses", "A programming language", "An online database"],
    explanation: "A web server is a process that runs continuously, listens on a network port, and responds to HTTP requests with HTML, JSON, files, etc.",
  },
  "q-036": {
    question: "Can two servers listen on the same port at the same time?",
    answers: ["Yes, if the machine has enough RAM", "No, only one service can listen on a port at a time", "Yes, with Docker", "It depends on the operating system"],
    explanation: "A port can only be used by one process at a time. That's why you see 'Port 3000 is already in use' if two servers try to listen on the same port.",
  },
  "q-037": {
    question: "What does the URL http://localhost:3000 mean?",
    answers: ["Connection to a remote server on port 3000", "Connection to your own machine on port 3000", "Connection to Google on port 3000", "Connection to the local database"],
    explanation: "localhost = your own machine (127.0.0.1). :3000 = port 3000. This URL refers to a server running locally on your machine on port 3000.",
  },
  "q-038": {
    question: "On which port does an HTTPS server listen by default?",
    answers: ["80", "8080", "3000", "443"],
    explanation: "HTTP uses port 80 by default, HTTPS uses port 443. That's why you don't have to write the port in the URL when visiting https://mysite.com.",
  },
  "q-039": {
    question: "What does a server return when the requested page doesn't exist?",
    answers: ["Code 200", "Code 500", "Code 404", "Code 301"],
    explanation: "404 Not Found is the HTTP code returned when the requested resource doesn't exist on the server. 200 = success, 500 = server error, 301 = redirect.",
  },
  "q-040": {
    question: "Which HTTP method is used to create a new resource?",
    answers: ["GET", "DELETE", "POST", "PATCH"],
    explanation: "POST is the HTTP method for creating a resource. GET = read, PUT/PATCH = modify, DELETE = delete. This is the REST convention.",
  },
  "q-041": {
    question: "Is REST API a protocol or a convention?",
    answers: ["A strict network protocol", "A convention (architectural style) for organizing web APIs", "A programming language", "A type of database"],
    explanation: "REST (Representational State Transfer) is an architectural style, not a protocol. It's a set of best practices for organizing HTTP-based web APIs.",
  },
  "q-042": {
    question: "In a REST API, what does the request GET /api/users/42 do?",
    answers: ["Creates a user with ID 42", "Deletes user 42", "Retrieves the information of user 42", "Updates user 42"],
    explanation: "GET is the read method. /api/users/42 identifies the resource 'user #42'. This request returns the information of that user in JSON.",
  },
  "q-043": {
    question: "Where does frontend code execute?",
    answers: ["On the server", "In the user's browser", "In the database", "On a CDN"],
    explanation: "Frontend runs in the browser (client). HTML, CSS and JavaScript are downloaded by the browser and executed client-side.",
  },
  "q-044": {
    question: "Why can't the frontend directly access the database?",
    answers: ["For performance reasons", "For security reasons: DB credentials must not be exposed to the browser", "Because browsers don't support SQL", "Because the DB is too far geographically"],
    explanation: "Exposing database credentials to the frontend (browser) would be a major security flaw. The frontend goes through the backend (API) which accesses it securely.",
  },
  "q-045": {
    question: "What does the backend typically handle?",
    answers: ["The user interface and animations", "Business logic, databases, authentication", "Only images and fonts", "CSS and design"],
    explanation: "The backend handles everything server-side and invisible to the user: DB access, authentication, data validation, sending emails, APIs.",
  },
  "q-046": {
    question: "In Next.js, what is an API Route?",
    answers: ["A React page with animations", "An HTTP backend endpoint within the same Next.js project", "A navigation component", "A configuration file"],
    explanation: "API Routes in Next.js (app/api/*/route.ts) allow creating HTTP backend endpoints directly in the project, without a separate server.",
  },
  "q-047": {
    question: "What is the main advantage of using Next.js for full-stack?",
    answers: ["It is free", "Frontend and backend in the same project, shared TypeScript types, no CORS", "It fully replaces the database", "It automatically deploys to AWS"],
    explanation: "Next.js unifies frontend (React pages) and backend (API Routes, Server Components) in a single project with shared TypeScript types and no CORS issues.",
  },
  "q-048": {
    question: "What does Supabase replace in a full-stack architecture?",
    answers: ["The frontend framework", "The entire backend (database, authentication, API)", "The DNS server", "The CDN for images"],
    explanation: "Supabase is a Backend-as-a-Service: it replaces a full backend by providing PostgreSQL, authentication, auto-generated API and file storage.",
  },
  "q-049": {
    question: "What is the advantage of SSR (Server-Side Rendering) for SEO?",
    answers: ["Pages are more colorful", "Google sees the full HTML content from the first response", "The server is faster", "Images are optimized"],
    explanation: "With SSR, the server sends HTML already populated with content. Google can index it immediately. With CSR, Google first sees empty HTML (bad for SEO).",
  },
  "q-050": {
    question: "What is hydration in the context of Next.js/React?",
    answers: ["Adding water to code", "The process by which React adds JS interactivity to a page already rendered in HTML server-side", "Optimizing images for mobile", "Loading data from the database"],
    explanation: "After SSR, the browser receives the static HTML and JS. React 'hydrates' the page by attaching event listeners and making the page interactive, without re-rendering it.",
  },
  "q-051": {
    question: "When is the HTML generated in SSG (Static Site Generation)?",
    answers: ["On every user request", "Once, at build time", "On every deployment and every hour", "Never, it is pure JavaScript"],
    explanation: "In SSG, HTML pages are generated once during the build (npm run build). The static files are then served directly, without executing any server code.",
  },
  "q-052": {
    question: "Which type of site is ideal for SSG?",
    answers: ["A social network with real-time content", "A blog or documentation whose content doesn't change often", "A live chat application", "A dashboard with live data"],
    explanation: "SSG is perfect for sites with relatively stable content: blogs, documentation, showcase sites. For dynamic content, SSR or CSR are preferable.",
  },
  "q-053": {
    question: "In CSR (Client-Side Rendering), what does the HTML initially sent by the server contain?",
    answers: ["All the page content rendered in HTML", "An almost empty HTML file with just a root tag and JS scripts", "Only JSON data", "The page CSS"],
    explanation: "In CSR, the server sends minimal HTML (often just <div id='root'></div>) + the JavaScript bundle. The JS builds the entire page in the browser.",
  },
  "q-054": {
    question: "Which acronym refers to a JavaScript application that never fully reloads the page?",
    answers: ["SSR", "SSG", "SPA", "CDN"],
    explanation: "SPA (Single Page Application) is an application that loads a single HTML page and dynamically updates content via JavaScript, without reloading. CSR is the technique used.",
  },
  "q-055": {
    question: "What does the 'npm install' command do in a project?",
    answers: ["Starts the development server", "Installs all dependencies listed in package.json", "Builds the application for production", "Updates npm itself"],
    explanation: "npm install reads the package.json file and downloads all listed dependencies into node_modules/. It's the first command to run on a cloned project.",
  },
  "q-056": {
    question: "What is the advantage of pnpm over npm?",
    answers: ["pnpm is easier to type", "pnpm is faster and more disk-efficient thanks to a shared store", "pnpm supports more packages", "pnpm is the only one that works with TypeScript"],
    explanation: "pnpm uses a global store where each package is stored only once. Projects use symbolic links to this store, saving a lot of disk space.",
  },
  "q-057": {
    question: "What is the difference between 'dependencies' and 'devDependencies' in package.json?",
    answers: ["There is no difference", "dependencies are for production, devDependencies are development tools excluded from the final build", "devDependencies are more important", "dependencies are optional"],
    explanation: "dependencies are packages needed in production (React, Next.js). devDependencies are development tools (TypeScript, ESLint) not included in the final build.",
  },
  "q-058": {
    question: "What is the purpose of the package-lock.json file?",
    answers: ["Block npm updates", "Lock the exact versions of installed dependencies to ensure reproducibility", "Store package passwords", "Speed up npm install"],
    explanation: "package-lock.json records the exact version of each dependency (and their transitive dependencies). Everyone will install exactly the same versions.",
  },
  "q-059": {
    question: "Should the node_modules folder be committed to Git?",
    answers: ["Yes, to share dependencies", "No, it can be regenerated with npm install and can weigh hundreds of MB", "Yes, but only the main dependencies", "Only when working in a team"],
    explanation: "node_modules must never be committed. It is listed in .gitignore. Anyone can regenerate it with npm install from package.json.",
  },
  "q-060": {
    question: "What happens if you delete node_modules and run npm install?",
    answers: ["The project is permanently lost", "All dependencies are re-downloaded and node_modules is recreated", "You need to reinstall Node.js", "package.json is also deleted"],
    explanation: "npm install reads package.json and re-downloads all dependencies into a new node_modules folder. It's a common operation to resolve issues.",
  },
  "q-061": {
    question: "Why use a venv in Python instead of installing packages globally?",
    answers: ["To go faster", "To isolate each project's dependencies and avoid version conflicts", "Because pip doesn't work globally", "To save disk space"],
    explanation: "Each Python project may need different versions of the same libraries. venv isolates these dependencies: project A can have Flask 2.0 and project B Flask 3.0.",
  },
  "q-062": {
    question: "Which command activates a Python virtual environment on Mac/Linux?",
    answers: ["venv activate", "python activate venv", "source venv/bin/activate", "start venv"],
    explanation: "The command source venv/bin/activate activates the venv on Mac/Linux. The terminal then shows (venv) before the prompt to indicate the environment is active.",
  },
  "q-063": {
    question: "In Next.js App Router, which special file creates an accessible URL?",
    answers: ["index.tsx", "route.tsx", "page.tsx", "view.tsx"],
    explanation: "The page.tsx (or page.js) file is the special file that creates a URL in App Router. app/about/page.tsx → /about. A folder without page.tsx generates no URL.",
  },
  "q-064": {
    question: "How do you create a dynamic route /concepts/javascript in Next.js App Router?",
    answers: ["app/concepts/javascript/page.tsx", "app/concepts/[slug]/page.tsx", "app/concepts/:slug/page.tsx", "app/concepts/dynamic/page.tsx"],
    explanation: "Square brackets [slug] define a dynamic parameter in Next.js App Router. app/concepts/[slug]/page.tsx captures any URL segment after /concepts/.",
  },
  "q-065": {
    question: "What is the convention for generic reusable components in a React project?",
    answers: ["Put them in app/", "Put them in components/ui/", "Put them at the project root", "Put them in public/"],
    explanation: "components/ui/ is the convention for generic components (Button, Card, Input). Business components go in components/[feature]/.",
  },
  "q-066": {
    question: "Should a component in components/ know about the application's routes?",
    answers: ["Yes, for navigation", "No, components must be independent of the app context", "Only the Header component", "Only form components"],
    explanation: "Components in components/ must be independent and reusable. Navigation logic and app context belong to pages in app/.",
  },
  "q-067": {
    question: "A file placed at public/logo.png is accessible at which URL?",
    answers: ["/public/logo.png", "/static/logo.png", "/logo.png", "/assets/logo.png"],
    explanation: "Files in public/ are served directly at the root. public/logo.png is accessible via /logo.png in the browser.",
  },
  "q-068": {
    question: "What type of files are typically placed in the public/ folder?",
    answers: ["React source code", "TypeScript configurations", "Static files: favicon, images, robots.txt, fonts", "Environment variables"],
    explanation: "public/ contains static files served directly: favicon.ico, preview images (og-image), robots.txt, sitemap.xml, downloadable files.",
  },
  "q-069": {
    question: "What is a Git commit?",
    answers: ["A deployment of the application", "A snapshot of the code at a given time with a descriptive message", "A development branch", "A configuration file"],
    explanation: "A commit is a snapshot of the code state at a precise moment, accompanied by a message describing the change. It is the basic unit of Git history.",
  },
  "q-070": {
    question: "Which Git command shows uncommitted modifications?",
    answers: ["git log", "git status", "git diff", "git push"],
    explanation: "git diff shows the differences between the current code and the last commit. git status shows which files have been modified. git log shows commit history.",
  },
  "q-071": {
    question: "What problem does Docker mainly solve?",
    answers: ["JavaScript slowness", "The 'it works on my machine but not elsewhere' problem", "CSS complexity", "Memory leaks in Python"],
    explanation: "Docker creates containers that package the application with its entire environment (dependencies, OS). The container runs identically on any machine.",
  },
  "q-072": {
    question: "What is the difference between a Docker image and a Docker container?",
    answers: ["They are synonyms", "The image is the recipe (Dockerfile), the container is the running instance", "The image is faster", "The container is stored on disk, the image in RAM"],
    explanation: "A Docker image is like a recipe (a built Dockerfile). A container is a running instance of that image. You can have multiple containers from the same image.",
  },
  "q-073": {
    question: "What does CLI stand for?",
    answers: ["Color Line Interface", "Command Line Interface", "Computer Language Interpreter", "Cloud Linux Integration"],
    explanation: "CLI = Command Line Interface. It's a text interface where you type commands in a terminal, as opposed to a GUI (Graphical User Interface) with icons and clicks.",
  },
  "q-074": {
    question: "What is the default shell on Mac?",
    answers: ["bash", "fish", "zsh", "sh"],
    explanation: "Since macOS Catalina (2019), zsh (Z shell) is the default shell on Mac. Before that, it was bash. On Linux, bash is often still the default.",
  },
  "q-075": {
    question: "What is the difference between ESLint and Prettier?",
    answers: ["They are synonyms", "ESLint detects code errors, Prettier formats style (spaces, quotes)", "ESLint is for Python, Prettier for JavaScript", "ESLint is paid, Prettier is free"],
    explanation: "ESLint is a linter (detects logical errors and bad practices). Prettier is a formatter (rewrites style: indentation, quotes, line length). They are complementary.",
  },
  "q-076": {
    question: "When are ESLint and Prettier typically run in a project?",
    answers: ["Only before deployment", "On every file save (VSCode) and during the build", "Only manually", "Only in production"],
    explanation: "The VSCode Prettier extension can format automatically on every save. ESLint signals errors in real-time in the editor. Both can also run in CI/CD.",
  },
  "q-077": {
    question: "What does the 'await' keyword do before an async function?",
    answers: ["Executes the function in parallel", "Waits for the Promise to be resolved before moving to the next line", "Cancels the asynchronous operation", "Repeats the operation until success"],
    explanation: "await suspends the execution of the async function until the Promise is resolved (or rejected). This allows writing asynchronous code as if it were synchronous.",
  },
  "q-078": {
    question: "How do you execute two fetch requests in parallel with async/await?",
    answers: ["await fetch(url1); await fetch(url2)", "await Promise.all([fetch(url1), fetch(url2)])", "async(fetch(url1), fetch(url2))", "parallel(fetch(url1), fetch(url2))"],
    explanation: "Promise.all() launches all Promises in parallel and waits for all to complete. It's much faster than sequential awaits that wait one after another.",
  },
  "q-079": {
    question: "What is the most common use of middleware in a web API?",
    answers: ["Generate CSS", "Verify authentication before accessing a protected resource", "Compress images", "Manage the database"],
    explanation: "Authentication is the most classic middleware use case: verifying that the user has a valid token before allowing access to a protected API.",
  },
  "q-080": {
    question: "What does middleware.ts do in a Next.js project?",
    answers: ["Configures Tailwind styles", "Runs on every HTTP request before Next.js processes it", "Only handles forms", "Compiles TypeScript"],
    explanation: "Next.js middleware.ts runs on the Edge before each request. It can verify authentication, make redirects, modify headers, etc.",
  },
  "q-081": {
    question: "What is the difference between a named export and a default export in JavaScript?",
    answers: ["There is no difference", "Named: import { fn } from '...', Default: import fn from '...' — the default can be renamed", "Named export is faster", "Default export only works with classes"],
    explanation: "Named export: export function foo() → import { foo } from '...'. Default export: export default function → import foo from '...' (name of your choice). A file can have multiple named but only one default.",
  },
  "q-082": {
    question: "What is the @/* alias for in TypeScript configuration of a Next.js project?",
    answers: ["Designate CSS files", "Create shortcuts to the project root to avoid relative paths ../../../", "Configure automated tests", "Identify server components"],
    explanation: "The @/* alias in tsconfig.json maps @ to the project root. Instead of ../../lib/utils, you write @/lib/utils. This makes imports clear and location-independent.",
  },
  "q-083": {
    question: "Which directive is needed in a Next.js component to use useState?",
    answers: ["'use server'", "'use state'", "'use client'", "'use hook'"],
    explanation: "'use client' must be the first line of the file to signal that this component runs client-side (browser). Without it, Next.js treats the component as a Server Component.",
  },
  "q-084": {
    question: "What is the difference between a Server Component and a Client Component in Next.js?",
    answers: ["There is no functional difference", "Server: runs on the server, can be async, no React state. Client: browser, can have useState/useEffect", "Server Component is faster in all cases", "Client Component requires TypeScript"],
    explanation: "Server Components run on the server (no useState, but can fetch directly). Client Components run in the browser (useState, events, but no direct access to secrets).",
  },
  "q-085": {
    question: "Which SQL command retrieves all columns from the 'concepts' table?",
    answers: ["GET * FROM concepts", "FETCH ALL FROM concepts", "SELECT * FROM concepts", "READ * FROM concepts"],
    explanation: "SELECT * FROM table is the basic SQL syntax for reading data. * means 'all columns'. You can replace * with specific column names.",
  },
  "q-086": {
    question: "What does SQL stand for?",
    answers: ["System Query Langue", "Structured Query Language", "Simple Query Logic", "Structured Question List"],
    explanation: "SQL = Structured Query Language. It is the standard language for interacting with relational databases (PostgreSQL, MySQL, SQLite, etc.).",
  },
  "q-087": {
    question: "What is RLS in Supabase?",
    answers: ["Real-time Loading System", "Row Level Security — security policies that control access to each row of data", "Remote Login Service", "React Loading State"],
    explanation: "RLS (Row Level Security) is a PostgreSQL/Supabase feature that applies security rules at the row level. E.g., a user can only see their own data.",
  },
  "q-088": {
    question: "Why are three different Supabase clients used (client, server, admin)?",
    answers: ["For performance", "Because each context (browser, server, admin) has different permissions and authentication mechanisms", "For TypeScript compatibility", "It's a style convention only"],
    explanation: "client.ts = browser (user session). server.ts = Server Components (SSR cookies). admin.ts = bypass RLS with service_role_key (admin operations only, never exposed to client).",
  },
  "q-089": {
    question: "What is the main advantage of an ORM over raw SQL?",
    answers: ["ORM is always more performant", "You manipulate the DB with the application language (TypeScript/Python) instead of writing SQL", "ORM automatically manages backups", "ORM generates the user interface"],
    explanation: "An ORM lets you interact with the DB using the application language. You benefit from TypeScript autocomplete, type validation, and more readable syntax.",
  },
  "q-090": {
    question: "Which TypeScript ORM is most popular in 2025 for Next.js projects?",
    answers: ["SQLAlchemy", "Hibernate", "Prisma", "ActiveRecord"],
    explanation: "Prisma is the most popular TypeScript ORM for Next.js. It generates TypeScript types from the DB schema, offering an excellent developer experience.",
  },
  "q-091": {
    question: "What does LLM stand for?",
    answers: ["Linked Language Module", "Large Language Model", "Local Learning Machine", "Layered Logic Model"],
    explanation: "LLM = Large Language Model. These are AI models (Claude, GPT-4, Gemini) trained on huge amounts of text to understand and generate language.",
  },
  "q-092": {
    question: "What does LiteLLM do in your project infrastructure?",
    answers: ["Generates images with AI", "Acts as a proxy that unifies access to multiple LLMs under a single API", "Trains local models", "Manages user authentication"],
    explanation: "LiteLLM is an LLM API proxy: it receives calls from your applications and redirects them to the right model (Claude, Gemini, GPT...). You can switch models without changing code.",
  },
  "q-093": {
    question: "What is a 'system prompt' in the context of LLMs?",
    answers: ["A prompt that talks about computer systems", "An instruction that defines the role and behavior of the LLM for the entire conversation", "The first question asked to the AI", "An automatically generated prompt"],
    explanation: "The system prompt defines the general context: 'You are a pedagogical tutor who explains tech concepts with simple analogies.' It is sent before user messages.",
  },
  "q-094": {
    question: "What is 'chain-of-thought prompting'?",
    answers: ["Chaining multiple LLMs together", "Asking the LLM to reason step by step before giving its final answer", "Using character chains in the prompt", "Connecting multiple prompts in series"],
    explanation: "Chain-of-thought = asking the LLM to detail its reasoning step by step. This improves response quality on complex tasks: 'Think step by step before answering.'",
  },
  "q-095": {
    question: "Approximately how many words does 1000 tokens represent in English?",
    answers: ["100 words", "500 words", "750 words", "1500 words"],
    explanation: "In English, 1000 tokens ≈ 750 words. In French, it's often less efficient (more tokens for the same content) as French words are on average longer.",
  },
  "q-096": {
    question: "What is the 'context window' of an LLM?",
    answers: ["The window of the LLM application", "The maximum number of tokens the model can process at once", "The text generation speed", "The model's long-term memory"],
    explanation: "The context window is the token limit an LLM can process at once (input + output). GPT-4 Turbo: 128k tokens, Gemini 1.5 Pro: 1M tokens. Beyond that, you need RAG or content chunking.",
  },
};
