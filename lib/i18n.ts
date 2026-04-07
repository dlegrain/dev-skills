export type Lang = "fr" | "en";

export const I18N: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home":        { fr: "Accueil",     en: "Home" },
  "nav.quiz":        { fr: "Quiz",         en: "Quiz" },
  "nav.flashcards":  { fr: "Flashcards",   en: "Flashcards" },
  "nav.progress":    { fr: "Progression",  en: "Progress" },
  "nav.concepts":    { fr: "concepts",     en: "concepts" },

  // Home
  "home.title":      { fr: "Maîtrise les concepts tech", en: "Master tech concepts" },
  "home.subtitle":   {
    fr: "concepts à apprendre, en quiz ou en flashcards. Suis ta progression et deviens capable de les réexpliquer à d'autres.",
    en: "concepts to learn, via quiz or flashcards. Track your progress and become able to explain them to others.",
  },
  "home.start-quiz": { fr: "Commencer un quiz", en: "Start a quiz" },
  "home.flashcards": { fr: "Mode flashcards",   en: "Flashcard mode" },
  "home.global-progress": { fr: "Progression globale", en: "Overall progress" },
  "home.mastered-of":     { fr: "concepts maîtrisés", en: "concepts mastered" },
  "home.in-progress":     { fr: "en apprentissage",   en: "in progress" },
  "home.categories":      { fr: "catégories",          en: "categories" },

  // Quiz
  "quiz.global-title":   { fr: "Quiz global",           en: "Global Quiz" },
  "quiz.global-sub":     { fr: "Teste tes connaissances sur l'ensemble des concepts", en: "Test your knowledge across all concepts" },
  "quiz.by-category":    { fr: "Quiz par catégorie :",  en: "Quiz by category:" },
  "quiz.nb-questions":   { fr: "Nombre de questions :", en: "Number of questions:" },
  "quiz.all":            { fr: "Tout",                  en: "All" },
  "quiz.start":          { fr: "Démarrer le quiz",      en: "Start quiz" },
  "quiz.question-of":    { fr: "Question",              en: "Question" },
  "quiz.correct":        { fr: "✓ Correct ! ",          en: "✓ Correct! " },
  "quiz.incorrect":      { fr: "✗ Pas tout à fait. ",   en: "✗ Not quite. " },
  "quiz.available":      { fr: "questions disponibles", en: "questions available" },

  // Quiz results
  "results.title":   { fr: "Quiz terminé !", en: "Quiz finished!" },
  "results.restart": { fr: "Recommencer",   en: "Restart" },
  "results.home":    { fr: "Accueil",        en: "Home" },
  "results.score-90": { fr: "Excellent ! Tu maîtrises ces concepts.", en: "Excellent! You've mastered these concepts." },
  "results.score-70": { fr: "Bien joué ! Encore un peu de pratique.", en: "Well done! A bit more practice will help." },
  "results.score-50": { fr: "Pas mal ! Continue à réviser.",          en: "Not bad! Keep reviewing." },
  "results.score-0":  { fr: "Continue à t'entraîner, tu vas y arriver !", en: "Keep practicing, you'll get there!" },
  "results.correct-answers": { fr: "bonne(s) réponse(s) sur", en: "correct answer(s) out of" },

  // Flashcards
  "fc.title":       { fr: "Flashcards",                  en: "Flashcards" },
  "fc.subtitle":    { fr: "Clique sur la carte pour voir la définition", en: "Click the card to see the definition" },
  "fc.card-of":     { fr: "Carte",                       en: "Card" },
  "fc.shuffle":     { fr: "🔀 Mélanger",                  en: "🔀 Shuffle" },
  "fc.prev":        { fr: "← Précédente",                en: "← Previous" },
  "fc.next":        { fr: "Suivante →",                  en: "Next →" },
  "fc.click-see":   { fr: "Clique pour voir la définition", en: "Click to see the definition" },
  "fc.click-hide":  { fr: "Clique pour voir le nom",     en: "Click to see the name" },
  "fc.analogy":     { fr: "Analogie",                    en: "Analogy" },
  "fc.empty":       { fr: "Aucune carte dans cette catégorie.", en: "No cards in this category." },
  "fc.cards-in-cat":{ fr: "carte(s) dans cette catégorie", en: "card(s) in this category" },

  // Mastery
  "mastery.unknown":  { fr: "Inconnu",          en: "Unknown" },
  "mastery.learning": { fr: "En apprentissage", en: "Learning" },
  "mastery.mastered": { fr: "Maîtrisé",         en: "Mastered" },
  "mastery.my-level": { fr: "Mon niveau :",     en: "My level:" },

  // Progress page
  "progress.title":    { fr: "Ma progression",     en: "My Progress" },
  "progress.subtitle": { fr: "concepts sur",        en: "concepts across" },
  "progress.cats":     { fr: "catégories",          en: "categories" },
  "progress.overview": { fr: "Vue d'ensemble",      en: "Overview" },
  "progress.mastered": { fr: "Maîtrisés",           en: "Mastered" },
  "progress.learning": { fr: "En apprentissage",    en: "Learning" },
  "progress.not-seen": { fr: "Non vus",             en: "Not seen" },
  "progress.mastered-of": { fr: "concepts maîtrisés", en: "concepts mastered" },
  "progress.by-cat":   { fr: "Par catégorie",       en: "By category" },
  "progress.recent":   { fr: "Récemment vus",       en: "Recently seen" },
  "progress.reset":    { fr: "Réinitialiser ma progression", en: "Reset my progress" },
  "progress.reset-confirm": { fr: "Réinitialiser toute ta progression ?", en: "Reset all your progress?" },
  "progress.confirm":  { fr: "Confirmer",           en: "Confirm" },
  "progress.cancel":   { fr: "Annuler",             en: "Cancel" },
  "progress.loading":  { fr: "Chargement…",         en: "Loading…" },

  // Category page
  "cat.home":          { fr: "Accueil",              en: "Home" },
  "cat.quiz-cat":      { fr: "Quiz sur cette catégorie", en: "Quiz on this category" },
  "cat.flashcards":    { fr: "Flashcards",           en: "Flashcards" },

  // Concept page
  "concept.full-explanation": { fr: "Explication complète",  en: "Full explanation" },
  "concept.analogy":           { fr: "Analogie",              en: "Analogy" },
  "concept.examples":          { fr: "Exemples concrets",     en: "Concrete examples" },
  "concept.related":           { fr: "Concepts liés",         en: "Related concepts" },
  "concept.quiz-cat":          { fr: "Quiz sur cette catégorie", en: "Quiz on this category" },
  "concept.back-to":           { fr: "← Retour à",            en: "← Back to" },

  // Category concept list
  "cat-list.mastery":  { fr: "Niveau",  en: "Level" },

  // Chatbot
  "chat.title":       { fr: "Assistant IA",              en: "AI Assistant" },
  "chat.subtitle":    { fr: "Pose tes questions sur les concepts tech", en: "Ask questions about tech concepts" },
  "chat.placeholder": { fr: "Ex : C'est quoi la différence entre SSR et SSG ?", en: "E.g. What's the difference between SSR and SSG?" },
  "chat.thinking":    { fr: "En train de réfléchir…",    en: "Thinking…" },
  "chat.error":       { fr: "Désolé, une erreur est survenue. Réessaie.", en: "Sorry, something went wrong. Try again." },
  "chat.welcome":     {
    fr: "Bonjour ! Je suis ton assistant pour apprendre les concepts du dev. Pose-moi n'importe quelle question sur les concepts tech : JavaScript, React, Docker, SQL, APIs… Je suis là pour t'aider !",
    en: "Hi! I'm your assistant for learning dev concepts. Ask me anything about tech: JavaScript, React, Docker, SQL, APIs… I'm here to help!",
  },
  "chat.close":       { fr: "Fermer",  en: "Close" },
  "chat.open":        { fr: "Chat IA", en: "AI Chat" },

  // 404
  "404.title":   { fr: "Page introuvable",                         en: "Page not found" },
  "404.message": { fr: "Cette page n'existe pas ou a été déplacée.", en: "This page doesn't exist or has been moved." },
  "404.home":    { fr: "Retour à l'accueil",                       en: "Back to home" },
};

export function t(key: string, lang: Lang): string {
  return I18N[key]?.[lang] ?? key;
}
