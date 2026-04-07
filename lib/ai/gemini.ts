import { GoogleGenerativeAI } from "@google/generative-ai";
import { createLogger } from "@/lib/logger";

const log = createLogger("ai/gemini");

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (genAI) return genAI;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY manquante");
  }

  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

/**
 * Appel simple à Gemini avec un prompt
 */
export async function generateText(
  prompt: string,
  model: string = "gemini-2.5-flash"
): Promise<string> {
  const ai = getGenAI();
  const geminiModel = ai.getGenerativeModel({ model });

  log.debug({ model, promptLength: prompt.length }, "Appel Gemini");

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();

  log.debug({ model, responseLength: text.length }, "Réponse Gemini reçue");

  return text;
}

/**
 * Appel avec historique de conversation (chat)
 */
export async function generateChatResponse(
  messages: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>,
  systemInstruction?: string,
  model: string = "gemini-2.5-flash"
): Promise<string> {
  const ai = getGenAI();
  const geminiModel = ai.getGenerativeModel({
    model,
    ...(systemInstruction ? { systemInstruction } : {}),
  });

  const chat = geminiModel.startChat({
    history: messages.slice(0, -1),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.parts[0].text);

  return result.response.text();
}
