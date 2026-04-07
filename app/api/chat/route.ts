import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai/gemini";
import { createLogger } from "@/lib/logger";

const log = createLogger("api/chat");

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages required" },
        { status: 400 }
      );
    }

    // Convertir le format frontend vers le format Gemini
    // Gemini requires history to start with "user" — strip leading assistant/model messages
    const filtered = [...messages];
    while (filtered.length > 0 && filtered[0].role === "assistant") {
      filtered.shift();
    }

    const geminiMessages = filtered.map(
      (msg: { role: string; content: string }) => ({
        role: (msg.role === "assistant" ? "model" : "user") as "user" | "model",
        parts: [{ text: msg.content }],
      })
    );

    if (geminiMessages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    log.info({ messageCount: messages.length }, "Chat request received");

    const response = await generateChatResponse(
      geminiMessages,
      systemPrompt
    );

    log.info({ responseLength: response.length }, "Chat response sent");

    return NextResponse.json({ response });
  } catch (error) {
    log.error({ error }, "Error in /api/chat");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
