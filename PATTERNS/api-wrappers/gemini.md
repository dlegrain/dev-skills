# Gemini AI Wrapper

> Client singleton Google Gemini avec dual-model, streaming, et extraction de contexte.
> Source : `chatbot-medical-v2/lib/gemini.ts`

## Quand l'utiliser

- Projet chatbot ou RAG avec Google Gemini
- Besoin de streaming pour UX temps réel
- Pré-appel d'extraction de contexte (conversation history → structured data)

## Quand NE PAS l'utiliser

- Appel LLM ponctuel simple (utiliser le SDK directement)
- Projet utilisant OpenAI/Anthropic (adapter le pattern)

## Contexte

- Singleton pour éviter de recréer le client à chaque requête
- Dual-model : un modèle rapide/cheap pour extraction, un modèle complet pour génération
- Safety settings adaptables au domaine (médical = plus permissif sur DANGEROUS_CONTENT)
- Token usage tracking intégré via `usageMetadata`

## Code

### Configuration et Singleton

```typescript
import {
  GoogleGenerativeAI,
  GenerativeModel,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GENERATION_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
const EXTRACTION_MODEL = process.env.GEMINI_EXTRACTION_MODEL || 'gemini-2.0-flash';

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

interface GenerationOptions {
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
  topK?: number;
}

const DEFAULT_OPTIONS: GenerationOptions = {
  temperature: 0.6,
  maxOutputTokens: 1000,
  topP: 0.9,
  topK: 40,
};

// --- Singleton ---
let genAI: GoogleGenerativeAI | null = null;
let generationModel: GenerativeModel | null = null;
let extractionModel: GenerativeModel | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (genAI) return genAI;
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY manquante');
  }
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  return genAI;
}

function getGenerationModel(): GenerativeModel {
  if (generationModel) return generationModel;
  generationModel = getGenAI().getGenerativeModel({
    model: GENERATION_MODEL,
    safetySettings: SAFETY_SETTINGS,
  });
  return generationModel;
}

function getExtractionModel(): GenerativeModel {
  if (extractionModel) return extractionModel;
  extractionModel = getGenAI().getGenerativeModel({
    model: EXTRACTION_MODEL,
    safetySettings: SAFETY_SETTINGS,
  });
  return extractionModel;
}
```

### Génération standard (avec RAG)

```typescript
interface GenerationContext {
  userMessage: string;
  relevantChunks: string[];
  conversationHistory: { role: string; content: string }[];
}

interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface GenerationResult {
  text: string;
  usage: TokenUsage;
}

export async function generateResponse(
  systemPrompt: string,
  context: GenerationContext,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const model = getGenerationModel();
  const genOptions = { ...DEFAULT_OPTIONS, ...options };
  const fullPrompt = buildFullPrompt(systemPrompt, context);

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    generationConfig: {
      temperature: genOptions.temperature,
      maxOutputTokens: genOptions.maxOutputTokens,
      topP: genOptions.topP,
      topK: genOptions.topK,
    },
  });

  const response = result.response;
  const text = response.text();
  const usageMetadata = response.usageMetadata;

  return {
    text: text.trim(),
    usage: {
      promptTokens: usageMetadata?.promptTokenCount ?? 0,
      completionTokens: usageMetadata?.candidatesTokenCount ?? 0,
      totalTokens: usageMetadata?.totalTokenCount ?? 0,
    },
  };
}
```

### Streaming

```typescript
export async function generateResponseStream(
  systemPrompt: string,
  context: GenerationContext,
  onChunk: (chunk: string) => void
): Promise<string> {
  const model = getGenerationModel();
  const fullPrompt = buildFullPrompt(systemPrompt, context);

  const result = await model.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    generationConfig: DEFAULT_OPTIONS,
  });

  let fullResponse = '';
  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      fullResponse += text;
      onChunk(text);
    }
  }

  return fullResponse.trim();
}
```

### Prompt builder (RAG)

```typescript
function buildFullPrompt(
  systemPrompt: string,
  context: GenerationContext
): string {
  const parts: string[] = [systemPrompt];

  if (context.relevantChunks.length > 0) {
    parts.push('\n--- INFORMATIONS DE RÉFÉRENCE ---');
    context.relevantChunks.forEach((chunk) => parts.push(chunk));
    parts.push('--- FIN DES INFORMATIONS ---\n');
  }

  if (context.conversationHistory.length > 0) {
    parts.push('HISTORIQUE RÉCENT :');
    context.conversationHistory.slice(-6).forEach((msg) => {
      const role = msg.role === 'user' ? 'Utilisateur' : 'Assistant';
      parts.push(`${role}: ${msg.content}`);
    });
  }

  parts.push(`MESSAGE ACTUEL : ${context.userMessage}`);
  return parts.join('\n');
}
```

### Réponse simple (sans RAG)

```typescript
export async function generateSimpleResponse(
  userMessage: string,
  systemPrompt: string
): Promise<string> {
  const model = getGenerationModel();

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: `${systemPrompt}\n\nMessage: ${userMessage}` }] },
    ],
    generationConfig: { temperature: 0.5, maxOutputTokens: 150 },
  });

  return result.response.text().trim();
}
```

### Health check

```typescript
export async function checkGeminiModels(): Promise<boolean> {
  try {
    const model = getGenerationModel();
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: 'test' }] }],
      generationConfig: { maxOutputTokens: 5 },
    });
    return !!result.response.text();
  } catch {
    return false;
  }
}
```

## Variables d'environnement

```env
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.5-flash-lite          # Génération (défaut)
GEMINI_EXTRACTION_MODEL=gemini-2.0-flash     # Extraction (défaut)
```

## Dépendances

```bash
npm install @google/generative-ai
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/gemini.md
Crée un wrapper Gemini avec streaming pour mon chatbot RAG
```

## Checklist

- [ ] `GEMINI_API_KEY` configuré
- [ ] Safety settings adaptés au domaine
- [ ] `maxOutputTokens` ajusté selon le use case
- [ ] Error handling avec fallback message

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| `SAFETY` block | Contenu filtré | Ajuster `HarmBlockThreshold` |
| Réponse vide | `maxOutputTokens` trop bas | Augmenter la limite |
| Timeout sur streaming | Connexion lente | Ajouter timeout + retry |
| Token count à 0 | `usageMetadata` undefined | Vérifier version SDK ≥ 0.21 |
