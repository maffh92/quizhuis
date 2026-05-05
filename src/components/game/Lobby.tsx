import { motion } from 'framer-motion';
import { useQuizStore } from '../../features/quiz/quizStore';
import type { PlayerPreset } from '../../features/player/types';

interface LobbyProps {
  onSelectPreset: (preset: PlayerPreset) => void;
}

const PRESETS: { key: PlayerPreset; label: string; description: string }[] = [
  { key: 'solo', label: '🎯 Solo', description: 'Geen bots, speel alleen' },
  { key: 'klein', label: '👥 Klein', description: '3 gesimuleerde spelers' },
  { key: 'groot', label: '🏟️ Groot', description: '10 gesimuleerde spelers' },
];

export function Lobby({ onSelectPreset }: LobbyProps) {
  const quiz = useQuizStore((s) => s.quiz);
  const players = useQuizStore((s) => s.players);
  const startQuiz = useQuizStore((s) => s.startQuiz);

  if (!quiz) {
    return (
      <div className="flex flex-col items-center gap-4 text-white">
        <p className="text-lg text-white/60">Quiz wordt geladen...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-black text-white md:text-5xl">{quiz.title}</h1>
        <p className="mt-2 text-white/60">{quiz.questions.length} vragen</p>
      </div>

      {/* Preset selection */}
      <div className="w-full max-w-md">
        <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-white/50">
          Spelers
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {PRESETS.map((preset) => (
            <motion.button
              key={preset.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectPreset(preset.key)}
              className="cursor-pointer rounded-xl bg-white/10 px-4 py-4 text-center backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <span className="block text-2xl">{preset.label.split(' ')[0]}</span>
              <span className="mt-1 block text-xs text-white/60">{preset.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Player list */}
      {players.length > 0 && (
        <div className="w-full max-w-md rounded-xl bg-white/5 p-4">
          <p className="mb-2 text-sm text-white/50">{players.length} speler(s) klaar:</p>
          <div className="flex flex-wrap gap-2">
            {players.map((p) => (
              <span key={p.id} className="rounded-lg bg-white/10 px-3 py-1 text-sm text-white">
                {p.name} {p.isSimulated && '🤖'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Start button */}
      <motion.button
        whileHover={players.length > 0 ? { scale: 1.05 } : {}}
        whileTap={players.length > 0 ? { scale: 0.95 } : {}}
        onClick={startQuiz}
        disabled={players.length === 0}
        className={`
          rounded-xl px-12 py-5 text-xl font-extrabold uppercase tracking-wider shadow-lg
          ${
            players.length > 0
              ? 'cursor-pointer bg-green-500 text-white hover:bg-green-400'
              : 'cursor-not-allowed bg-white/20 text-white/40'
          }
        `}
      >
        Start Quiz!
      </motion.button>
    </motion.div>
  );
}
