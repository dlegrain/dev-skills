import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diederick Starter",
  description: "Template de base Next.js + Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
