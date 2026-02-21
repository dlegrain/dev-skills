import { cn } from "@/lib/utils";

interface QuizResultsProps {
  correctCount: number;
  totalCount: number;
  onRestart: () => void;
  onGoHome: () => void;
}

export function QuizResults({
  correctCount,
  totalCount,
  onRestart,
  onGoHome,
}: QuizResultsProps) {
  const score = Math.round((correctCount / totalCount) * 100);

  const getMessage = () => {
    if (score >= 90) return { text: "Excellent ! Tu maîtrises ces concepts.", emoji: "🏆" };
    if (score >= 70) return { text: "Bien joué ! Encore un peu de pratique.", emoji: "🎯" };
    if (score >= 50) return { text: "Pas mal ! Continue à réviser.", emoji: "📚" };
    return { text: "Continue à t'entraîner, tu vas y arriver !", emoji: "💪" };
  };

  const { text, emoji } = getMessage();

  const scoreColor =
    score >= 70 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600";

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz terminé !</h2>
      <p className="text-gray-500 mb-6">{text}</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className={cn("text-5xl font-bold mb-1", scoreColor)}>{score}%</div>
        <p className="text-gray-500 text-sm">
          {correctCount} bonne{correctCount > 1 ? "s" : ""} réponse
          {correctCount > 1 ? "s" : ""} sur {totalCount}
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
        >
          Recommencer
        </button>
        <button
          onClick={onGoHome}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Accueil
        </button>
      </div>
    </div>
  );
}
