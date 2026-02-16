import OpenAI from "openai";
import { logger } from "@/lib/logger";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSION = 768;

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY manquante pour les embeddings");
  }

  openaiClient = new OpenAI({ apiKey });
  return openaiClient;
}

/**
 * Génère un embedding pour un texte donné
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const input = text.replace(/\n/g, " ").trim();

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input,
    dimensions: EMBEDDING_DIMENSION,
  });

  logger.debug({ model: EMBEDDING_MODEL, dimensions: EMBEDDING_DIMENSION }, "Embedding généré");

  return response.data[0].embedding;
}

/**
 * Génère des embeddings en batch
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const openai = getOpenAI();
  const inputs = texts.map((t) => t.replace(/\n/g, " ").trim());

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: inputs,
    dimensions: EMBEDDING_DIMENSION,
  });

  logger.debug(
    { model: EMBEDDING_MODEL, count: texts.length, dimensions: EMBEDDING_DIMENSION },
    "Embeddings batch générés"
  );

  return response.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

/**
 * Dimensions utilisées — utile pour vérifier la compatibilité avec pgvector
 */
export const embeddingDimension = EMBEDDING_DIMENSION;
