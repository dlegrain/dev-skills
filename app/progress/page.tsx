import { ProgressDashboard } from "@/components/progress/ProgressDashboard";
import { CATEGORIES, CONCEPTS } from "@/lib/data-helpers";

export default function ProgressPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Ma progression</h1>
      <p className="text-gray-500 mb-8">
        Suivi de tes {CONCEPTS.length} concepts sur 13 catégories
      </p>
      <ProgressDashboard categories={CATEGORIES} concepts={CONCEPTS} />
    </div>
  );
}
