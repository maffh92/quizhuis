import { motion } from 'framer-motion';
import { useQuizStore } from '../../features/quiz/quizStore';
import { QuestionRenderer } from '../questions/QuestionRenderer';
import { TimerBar } from './TimerBar';

interface QuestionActiveProps {
  humanPlayerId: string;
}

export function QuestionActive({ humanPlayerId }: QuestionActiveProps) {
  const quiz = useQuizStore((s) => s.quiz);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const submitAnswer = useQuizStore((s) => s.submitAnswer);
  const answers = useQuizStore((s) => s.answers);

  const question = quiz?.questions[currentQuestionIndex];
  if (!question) return null;

  const hasAnswered = answers[humanPlayerId]?.some((a) => a.questionId === question.id) ?? false;

  const handleAnswer = (answer: unknown) => {
    submitAnswer(humanPlayerId, answer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex w-full max-w-3xl flex-col gap-6"
    >
      <TimerBar />

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">{question.prompt}</h2>
      </div>

      <div className="mt-4">
        <QuestionRenderer
          question={question}
          onAnswer={handleAnswer}
          disabled={hasAnswered}
        />
      </div>

      {hasAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-semibold text-green-300"
        >
          ✓ Antwoord ingediend! Wachten op andere spelers...
        </motion.div>
      )}
    </motion.div>
  );
}
