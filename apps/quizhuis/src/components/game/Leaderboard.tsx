import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../../features/quiz/quizStore';

interface LeaderboardProps {
  isHost: boolean;
  onReset?: () => void;
}

export function Leaderboard({ isHost, onReset }: LeaderboardProps) {
  const players = useQuizStore((s) => s.players);
  const quiz = useQuizStore((s) => s.quiz);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const leaderboardFinished = useQuizStore((s) => s.leaderboardFinished);

  const isLastQuestion = quiz
    ? currentQuestionIndex >= quiz.questions.length - 1
    : false;

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Auto-advance after 5 seconds for non-final leaderboards (host can also click)
  useEffect(() => {
    if (isLastQuestion) return;
    const timeout = setTimeout(() => {
      leaderboardFinished();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLastQuestion, leaderboardFinished]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex w-full max-w-lg flex-col items-center gap-6"
    >
      <h2 className="text-3xl font-black text-white">
        {isLastQuestion ? '🏆 Eindstand' : '📊 Tussenstand'}
      </h2>

      <div className="w-full space-y-3">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center justify-between rounded-xl px-5 py-4
              ${index === 0 ? 'bg-yellow-500/30 ring-2 ring-yellow-400' : 'bg-white/10'}
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white/50">#{index + 1}</span>
              <span className="text-lg font-bold text-white">
                {player.name} {player.isSimulated && '🤖'}
              </span>
            </div>
            <span className="text-xl font-bold text-white">{player.score}</span>
          </motion.div>
        ))}
      </div>

      {isHost && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isLastQuestion ? onReset : leaderboardFinished}
          className="mt-4 cursor-pointer rounded-xl bg-blue-500 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-400"
        >
          {isLastQuestion ? '🔄 Opnieuw spelen' : 'Volgende vraag →'}
        </motion.button>
      )}
    </motion.div>
  );
}
