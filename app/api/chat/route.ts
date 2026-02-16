import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai/gemini";
import { createLogger } from "@/lib/logger";

const log = createLogger("api/chat");

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages requis" },
        { status: 400 }
      );
    }

    // Convertir le format frontend vers le format Gemini
    const geminiMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: (msg.role === "assistant" ? "model" : "user") as "user" | "model",
        parts: [{ text: msg.content }],
      })
    );

    log.info({ messageCount: messages.length }, "Requête chat reçue");

    const response = await generateChatResponse(
      geminiMessages,
      systemPrompt
    );

    log.info({ responseLength: response.length }, "Réponse chat envoyée");

    return NextResponse.json({ response });
  } catch (error) {
    log.error({ error }, "Erreur dans /api/chat");
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
