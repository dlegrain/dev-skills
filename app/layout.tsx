import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Skills — Maîtrise les concepts tech",
  description:
    "Outil d'entraînement pour maîtriser les concepts du développement web : JavaScript, Python, React, Next.js, Docker, SQL et bien plus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link
              href="/"
              className="text-base font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              🧠 Dev Skills
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/quiz"
                className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Quiz
              </Link>
              <Link
                href="/flashcards"
                className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Flashcards
              </Link>
              <Link
                href="/progress"
                className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Progression
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
          Dev Skills — {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
