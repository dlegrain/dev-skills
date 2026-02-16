# Quiz Player Component

> Quiz interactif avec timer, auto-advance, feedback visuel, et sauvegarde Supabase.
> Sources : `students_V2/src/components/quiz/QuizPlayer.tsx`, `chatbot-slbo/components/ChatInterface.tsx`

## Quand l'utiliser

- Évaluation/formation avec questions à choix multiples
- Quiz gamifié avec timer et score
- Besoin de sauvegarder les résultats dans Supabase

## Quand NE PAS l'utiliser

- Sondage simple sans score (utiliser un formulaire)
- Quiz statique sans timer (simplifier le composant)

## Contexte

- Timer countdown par question avec auto-advance si temps écoulé
- Feedback visuel immédiat (vert = correct, rouge = incorrect)
- Auto-advance après 1.5s (réponse) ou 2s (timeout)
- Sauvegarde automatique dans Supabase (attempt + réponses individuelles)
- Progress bar + dots indicateurs

## Code

### Types

```typescript
interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
  theme?: string;
  cognitive_level?: string;
}

interface QuizPlayerProps {
  questions: Question[];
  quizId: string;
  userId: string;
  courseSlug: string;
  timePerQuestion: number; // secondes
}

interface AnswerRecord {
  question_id: string;
  selected_answer: number | null;
  is_correct: boolean;
  time_spent: number; // secondes
}
```

### Composant principal

```tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function QuizPlayer({
  questions, quizId, userId, courseSlug, timePerQuestion,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // --- Timer ---
  useEffect(() => {
    if (!quizStarted || isFinished || hasAnswered) return;
    if (timeLeft <= 0) { handleTimeout(); return; }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, isFinished, hasAnswered]);

  // --- Timeout ---
  const handleTimeout = useCallback(() => {
    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    const answer: AnswerRecord = {
      question_id: currentQuestion.id,
      selected_answer: null,
      is_correct: false,
      time_spent: timeSpent,
    };
    setHasAnswered(true);
    setAnswers((prev) => [...prev, answer]);

    setTimeout(() => advanceToNext([...answers, answer]), 2000);
  }, [currentQuestion, answers]);

  // --- Sélection réponse ---
  const handleSelectAnswer = useCallback((optionIndex: number) => {
    if (hasAnswered) return;

    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    const isCorrect = optionIndex === currentQuestion.correct_answer;

    setSelectedAnswer(optionIndex);
    setHasAnswered(true);

    const answer: AnswerRecord = {
      question_id: currentQuestion.id,
      selected_answer: optionIndex,
      is_correct: isCorrect,
      time_spent: timeSpent,
    };
    setAnswers((prev) => [...prev, answer]);

    setTimeout(() => advanceToNext([...answers, answer]), 1500);
  }, [hasAnswered, currentQuestion, answers]);

  // --- Avancer ---
  const advanceToNext = useCallback((currentAnswers: AnswerRecord[]) => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
      setTimeLeft(timePerQuestion);
      questionStartTimeRef.current = Date.now();
    } else {
      submitResults(currentAnswers);
    }
  }, [currentIndex, totalQuestions, timePerQuestion]);

  // --- Soumission ---
  const submitResults = async (finalAnswers: AnswerRecord[]) => {
    setIsFinished(true);
    setIsSubmitting(true);

    const correctCount = finalAnswers.filter((a) => a.is_correct).length;
    const scorePercent = (correctCount / totalQuestions) * 100;

    try {
      const supabase = createClient();

      const { data: attempt, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: userId,
          quiz_id: quizId,
          score: scorePercent,
          total_questions: totalQuestions,
          correct_answers: correctCount,
          started_at: startedAt,
          completed_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) throw error;

      await supabase.from('quiz_answers').insert(
        finalAnswers.map((a) => ({
          attempt_id: attempt.id,
          question_id: a.question_id,
          selected_answer: a.selected_answer,
          is_correct: a.is_correct,
          time_spent: a.time_spent,
        }))
      );

      setIsSubmitting(false);
    } catch (err) {
      console.error('Error submitting results:', err);
      setIsSubmitting(false);
    }
  };

  // ... render (voir section UI ci-dessous)
}
```

### UI — Timer bar

```tsx
const timerPercent = (timeLeft / timePerQuestion) * 100;
const timerColor = timeLeft > 20 ? 'bg-green-500'
  : timeLeft > 10 ? 'bg-orange-400' : 'bg-red-500';

// Progress bar
<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
  <div
    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>

// Timer bar
<div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
  <div
    className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
    style={{ width: `${timerPercent}%` }}
  />
</div>
```

### UI — Options avec feedback

```tsx
{currentQuestion.options.map((option, idx) => {
  let style = 'border-gray-200 bg-white hover:border-indigo-300 cursor-pointer';

  if (hasAnswered) {
    if (idx === currentQuestion.correct_answer) {
      style = 'border-green-400 bg-green-50 text-green-800';
    } else if (idx === selectedAnswer) {
      style = 'border-red-400 bg-red-50 text-red-800';
    } else {
      style = 'border-gray-200 bg-gray-50 text-gray-400';
    }
  }

  return (
    <button
      key={idx}
      onClick={() => handleSelectAnswer(idx)}
      disabled={hasAnswered}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${style}`}
    >
      <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}</span>
      {option}
    </button>
  );
})}
```

### UI — Dots indicateurs

```tsx
<div className="flex justify-center gap-1">
  {questions.map((_, idx) => {
    let color = 'bg-gray-200';
    if (idx < answers.length) {
      color = answers[idx].is_correct ? 'bg-green-500' : 'bg-red-400';
    } else if (idx === currentIndex) {
      color = 'bg-indigo-500';
    }
    return <div key={idx} className={`w-2.5 h-2.5 rounded-full ${color}`} />;
  })}
</div>
```

## Schema Supabase

```sql
create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  quiz_id uuid not null,
  score numeric not null,
  total_questions int not null,
  correct_answers int not null,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

create table quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references quiz_attempts not null,
  question_id uuid not null,
  selected_answer int,
  is_correct boolean not null,
  time_spent int not null,
  created_at timestamptz default now()
);
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/components/quiz-player.md
Crée un composant quiz avec timer et sauvegarde des résultats dans Supabase
```

## Checklist

- [ ] Questions chargées depuis API ou Supabase
- [ ] `timePerQuestion` configuré (30-60s recommandé)
- [ ] Tables `quiz_attempts` et `quiz_answers` créées
- [ ] RLS configuré sur les tables quiz
- [ ] Feedback visuel (couleurs) fonctionne
- [ ] Auto-advance après réponse/timeout

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Timer ne démarre pas | `quizStarted` false | Vérifier `handleStartQuiz` |
| Auto-advance trop rapide | Délai setTimeout bas | Augmenter 1500ms/2000ms |
| Score incorrect | Answers array désynchronisé | Passer `currentAnswers` explicitement |
| Erreur Supabase insert | RLS bloque | Vérifier policies sur quiz_attempts |
