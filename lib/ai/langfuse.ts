import { Langfuse } from "langfuse";
import { logger } from "@/lib/logger";

let langfuseInstance: Langfuse | null = null;

/**
 * Retourne l'instance Langfuse (singleton).
 * Retourne null si les clés ne sont pas configurées — permet de
 * fonctionner sans Langfuse en développement.
 */
export function getLangfuse(): Langfuse | null {
  if (langfuseInstance) return langfuseInstance;

  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const baseUrl = process.env.LANGFUSE_BASE_URL;

  if (!secretKey || !publicKey) {
    logger.warn("Langfuse non configuré — clés manquantes");
    return null;
  }

  langfuseInstance = new Langfuse({
    secretKey,
    publicKey,
    baseUrl: baseUrl || "https://cloud.langfuse.com",
  });

  logger.info("Langfuse initialisé");
  return langfuseInstance;
}
