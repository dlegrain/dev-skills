"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Show welcome message on first open
  useEffect(() => {
    if (open && !welcomed) {
      setMessages([{ role: "assistant", content: t("chat.welcome") }]);
      setWelcomed(true);
    }
  }, [open, welcomed, t]);

  // Reset welcome when lang changes so it re-shows in new lang
  useEffect(() => {
    setWelcomed(false);
    setMessages([]);
  }, [lang]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const systemPrompt =
        lang === "en"
          ? "You are a concise and pedagogical assistant helping a developer learn tech concepts (JavaScript, React, Next.js, Docker, SQL, APIs, AI, etc.). Keep answers short (3-5 sentences max). Use plain text only — no markdown, no bullet points, no headers. Use an analogy when useful. Answer in English."
          : "Tu es un assistant pédagogique concis aidant un développeur à apprendre les concepts tech (JavaScript, React, Next.js, Docker, SQL, APIs, IA, etc.). Garde tes réponses courtes (3-5 phrases max). Utilise du texte simple uniquement — pas de markdown, pas de listes, pas de titres. Utilise une analogie si utile. Réponds en français.";

      // Filter out the welcome message (assistant-first) — Gemini requires history to start with user
      const apiMessages = next.filter((m, i) => !(i === 0 && m.role === "assistant"));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, systemPrompt }),
      });

      if (!res.ok) throw new Error("error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg font-medium text-sm transition-all",
          open
            ? "bg-gray-800 text-white"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        )}
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        {open ? t("chat.close") : t("chat.open")}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[360px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div>
              <p className="font-semibold text-sm">{t("chat.title")}</p>
              <p className="text-xs text-indigo-100">{t("chat.subtitle")}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "ml-auto bg-indigo-500 text-white"
                    : "mr-auto bg-gray-100 text-gray-800"
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-gray-100 rounded-xl px-3 py-2">
                <p className="text-sm text-gray-400 animate-pulse">{t("chat.thinking")}</p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 shrink-0">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t("chat.placeholder")}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
