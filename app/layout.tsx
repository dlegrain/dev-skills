import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { AppHeader } from "@/components/layout/AppHeader";
import { ChatBot } from "@/components/chat/ChatBot";

export const metadata: Metadata = {
  title: "Dev Skills — Master tech concepts",
  description:
    "Training tool to master web development concepts: JavaScript, Python, React, Next.js, Docker, SQL and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <AppHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
            Dev Skills — {new Date().getFullYear()}
          </footer>
          <ChatBot />
        </LangProvider>
      </body>
    </html>
  );
}
