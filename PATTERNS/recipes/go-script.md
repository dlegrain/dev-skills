# Script `go` — Lancement rapide d'un projet

Script shell placé à la racine de chaque projet. Lance le serveur, ouvre le navigateur, gère le port.

## Usage

```bash
chmod +x go
./go
```

## Le script

```bash
#!/bin/bash

PROJECT_NAME="XXX"
PORT=XXX

echo "🚀 Lancement de $PROJECT_NAME sur le port $PORT..."

# Kill tout processus existant sur ce port
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances..."
  npm install
fi

# Lancement
PORT=$PORT npm start &
SERVER_PID=$!

sleep 3

open "http://localhost:$PORT"

echo "✅ $PROJECT_NAME lancé sur http://localhost:$PORT"
echo "   Ctrl+C pour arrêter"

trap "kill $SERVER_PID 2>/dev/null" INT TERM EXIT

wait $SERVER_PID
```

## À personnaliser

| Variable | Exemple |
|----------|---------|
| `PROJECT_NAME` | `"mon-projet"` |
| `PORT` | `3000` |

## Notes

- `npm start` lance le build de production. Remplacer par `npm run dev` pour le dev.
- Le `trap` assure que le process est tué proprement avec Ctrl+C.
- `sleep 3` laisse le temps au serveur de démarrer avant d'ouvrir le navigateur.
