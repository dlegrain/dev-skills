# Voice Agent — ElevenLabs Conversational AI

> Widget vocal avec ElevenLabs Conversational AI SDK, token sécurisé, et indicateurs visuels.
> Source : `site-vitrine/components/VoiceAgent.tsx`

## Quand l'utiliser

- Chatbot vocal intégré à un site web
- Agent conversationnel avec voix naturelle
- Besoin d'un bouton start/stop avec feedback visuel

## Quand NE PAS l'utiliser

- Simple text-to-speech (utiliser l'API REST directement)
- Besoin de transcription only (utiliser Whisper)

## Contexte

- ElevenLabs Conversational AI = agent vocal complet (STT + LLM + TTS)
- Token signé côté serveur (ne jamais exposer l'API key côté client)
- `useConversation` hook gère connection/deconnection/status/speaking
- Statuts : `idle` → `connecting` → `connected` (speaking/listening)

## Code

### Composant Voice Agent

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';

export function VoiceAgent() {
  const [conversationStarted, setConversationStarted] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log('Connecté à l\'agent'),
    onDisconnect: () => {
      setConversationStarted(false);
    },
    onError: (message: string) => {
      console.error('Erreur conversation:', message);
    },
    onMessage: (message: unknown) => {
      console.log('Message:', message);
    },
  });

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';

  const handleStart = async () => {
    try {
      // 1. Récupérer un token signé depuis le serveur
      const response = await fetch('/api/voice-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const { signedUrl } = await response.json();

      // 2. Démarrer la session avec le token
      await conversation.startSession({ signedUrl });
      setConversationStarted(true);
    } catch (error) {
      console.error('Erreur démarrage:', error);
    }
  };

  const handleEnd = async () => {
    await conversation.endSession();
    setConversationStarted(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Indicateur de statut */}
      <div className="text-center">
        {!conversationStarted && (
          <p className="text-gray-400 text-sm">Prêt à démarrer</p>
        )}
        {isConnecting && (
          <p className="text-yellow-400 text-sm">Connexion en cours...</p>
        )}
        {isConnected && !conversation.isSpeaking && (
          <p className="text-green-400 text-sm">À l'écoute...</p>
        )}
        {isConnected && conversation.isSpeaking && (
          <p className="text-green-400 text-sm font-medium">Agent parle</p>
        )}
      </div>

      {/* Boutons start/stop */}
      {!conversationStarted ? (
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Démarrer la conversation
        </button>
      ) : (
        <button
          onClick={handleEnd}
          disabled={!isConnected}
          className="px-6 py-3 bg-red-500/20 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          Terminer
        </button>
      )}
    </div>
  );
}
```

### API Route — Token sécurisé

```typescript
// app/api/voice-token/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const agentId = process.env.ELEVENLABS_AGENT_ID;

    if (!apiKey || !agentId) {
      return NextResponse.json(
        { error: 'ElevenLabs non configuré' },
        { status: 500 }
      );
    }

    // Créer un signed URL pour la conversation
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: { 'xi-api-key': apiKey },
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ signedUrl: data.signed_url });
  } catch (error) {
    console.error('Erreur token vocal:', error);
    return NextResponse.json(
      { error: 'Impossible de créer le token' },
      { status: 500 }
    );
  }
}
```

### Variante Netlify Functions

```typescript
// netlify/functions/create-conversation-token.ts
import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
    { headers: { 'xi-api-key': apiKey! } }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ signedUrl: data.signed_url }),
  };
};
```

### Animation audio (optionnel)

```tsx
// Simuler des niveaux audio quand l'agent parle
const [audioLevels, setAudioLevels] = useState<number[]>(Array(12).fill(0));

useEffect(() => {
  if (!conversation.isSpeaking) {
    setAudioLevels(Array(12).fill(0));
    return;
  }

  const interval = setInterval(() => {
    setAudioLevels(Array(12).fill(0).map(() => Math.random()));
  }, 50);

  return () => clearInterval(interval);
}, [conversation.isSpeaking]);

// Rendu des barres audio
<div className="flex items-end gap-1 h-16">
  {audioLevels.map((level, i) => (
    <div
      key={i}
      className="w-2 bg-green-400 rounded-full transition-all duration-75"
      style={{ height: `${Math.max(4, level * 64)}px` }}
    />
  ))}
</div>
```

## Variables d'environnement

```env
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_AGENT_ID=agent_...
```

## Dépendances

```bash
npm install @elevenlabs/react
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/components/voice-agent.md
Ajoute un agent vocal ElevenLabs avec token sécurisé à mon site
```

## Checklist

- [ ] Agent créé dans ElevenLabs Dashboard
- [ ] `ELEVENLABS_API_KEY` et `ELEVENLABS_AGENT_ID` configurés
- [ ] API route pour le signed URL (ne jamais exposer la key côté client)
- [ ] Permissions micro demandées au browser
- [ ] Indicateurs visuels de statut (connecting, listening, speaking)

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Micro non détecté | Permission refusée | Vérifier les permissions navigateur |
| Token expiré | URL signée périmée | Générer un nouveau token à chaque session |
| Pas de son | autoplay bloqué | Démarrer après interaction utilisateur |
| Latence élevée | Serveur loin | Vérifier la région ElevenLabs |
