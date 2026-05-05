import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../../features/quiz/quizStore';

export function QuestionIntro() {
  const quiz = useQuizStore((s) => s.quiz);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const introFinished = useQuizStore((s) => s.introFinished);

  const question = quiz?.questions[currentQuestionIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      introFinished();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [introFinished, currentQuestionIndex]);

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-medium text-white/50"
      >
        Vraag {currentQuestionIndex + 1} van {quiz?.questions.length}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl text-center text-3xl font-black text-white md:text-4xl"
      >
        {question.prompt}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 text-white/40"
      >
        <span>⏱️ {question.timer}s</span>
        <span>•</span>
        <span>💎 {question.points} punten</span>
      </motion.div>
    </motion.div>
  );
}
