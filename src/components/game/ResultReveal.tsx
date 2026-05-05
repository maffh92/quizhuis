import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../../features/quiz/quizStore';
import type { Question, MultipleChoiceContent, BooleanContent, MatchingContent } from '../../features/quiz/types';

function getCorrectAnswer(question: Question): string {
  switch (question.type) {
    case 'multiple-choice': {
      const content = question.content as MultipleChoiceContent;
      const option = content.options.find((o) => o.id === content.correctOptionId);
      return option?.label ?? '?';
    }
    case 'boolean': {
      const content = question.content as BooleanContent;
      return content.correct ? 'Waar' : 'Niet waar';
    }
    case 'matching': {
      const content = question.content as MatchingContent;
      return content.correctPairs
        .map((p) => {
          const item = content.items.find((i) => i.id === p.itemId);
          const target = content.targets.find((t) => t.id === p.targetId);
          return `${item?.label} → ${target?.label}`;
        })
        .join(', ');
    }
    default:
      return '?';
  }
}

export function ResultReveal() {
  const quiz = useQuizStore((s) => s.quiz);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const players = useQuizStore((s) => s.players);
  const answers = useQuizStore((s) => s.answers);
  const revealFinished = useQuizStore((s) => s.revealFinished);

  const question = quiz?.questions[currentQuestionIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      revealFinished();
    }, 4000);
    return () => clearTimeout(timeout);
  }, [revealFinished, currentQuestionIndex]);

  if (!question) return null;

  const correctAnswer = getCorrectAnswer(question);

  // Get scores for this question
  const questionScores = players
    .map((p) => {
      const answer = answers[p.id]?.find((a) => a.questionId === question.id);
      return { player: p, score: answer?.score ?? 0, answered: !!answer };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex w-full max-w-2xl flex-col items-center gap-6"
    >
      <div className="text-center">
        <h3 className="text-lg text-white/60">Het juiste antwoord:</h3>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="mt-2 text-2xl font-bold text-green-300"
        >
          {correctAnswer}
        </motion.p>
      </div>

      <div className="w-full space-y-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
          Scores deze vraag
        </h4>
        {questionScores.map((entry, index) => (
          <motion.div
            key={entry.player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-2"
          >
            <span className="text-white">
              {entry.player.name} {entry.player.isSimulated && '🤖'}
            </span>
            <span className={`font-bold ${entry.score > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {entry.answered ? `+${entry.score}` : 'Geen antwoord'}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
