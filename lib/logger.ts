import pino from "pino";

const isServer = typeof window === "undefined";

export const logger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
  ...(isServer && process.env.NODE_ENV !== "production"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      }
    : {}),
});

/**
 * Crée un logger enfant avec un contexte spécifique
 *
 * Usage :
 *   const log = createLogger("api/chat")
 *   log.info({ userId }, "Message reçu")
 */
export function createLogger(module: string) {
  return logger.child({ module });
}
