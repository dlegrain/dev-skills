#!/bin/bash

PROJECT_NAME="Dev Skills"
PORT=7113

echo "🚀 Lancement de $PROJECT_NAME sur le port $PORT..."

# Kill tout processus existant sur ce port
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances..."
  npm install
fi

# Lancement
PORT=$PORT npm run dev &
SERVER_PID=$!

sleep 3

open "http://localhost:$PORT"

echo "✅ $PROJECT_NAME lancé sur http://localhost:$PORT"
echo "   Ctrl+C pour arrêter"

trap "kill $SERVER_PID 2>/dev/null" INT TERM EXIT

wait $SERVER_PID
