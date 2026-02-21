import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page introuvable</h1>
      <p className="text-gray-500 mb-6">Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
