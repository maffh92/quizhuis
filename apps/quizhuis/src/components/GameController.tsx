import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../features/quiz/quizStore';
import { useTimerTick } from '../features/quiz/useTimerTick';
import { createPlayersForPreset, scheduleSimulatedAnswers } from '../features/player/playerSimulation';
import type { PlayerPreset } from '../features/player/types';
import type { Quiz } from '../features/quiz/types';
import { Lobby } from './game/Lobby';
import { QuestionIntro } from './game/QuestionIntro';
import { QuestionActive } from './game/QuestionActive';
import { ResultReveal } from './game/ResultReveal';
import { Leaderboard } from './game/Leaderboard';

const HUMAN_PLAYER = {
  id: 'human-1',
  name: 'Jij',
  score: 0,
  isSimulated: false,
};

export function GameController() {
  const phase = useQuizStore((s) => s.phase);
  const quiz = useQuizStore((s) => s.quiz);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const loadQuiz = useQuizStore((s) => s.loadQuiz);
  const setPlayers = useQuizStore((s) => s.setPlayers);
  const reset = useQuizStore((s) => s.reset);

  const [preset, setPreset] = useState<PlayerPreset>('solo');
  const [isHost] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('mode') !== 'player';
  });

  const cleanupRef = useRef<(() => void) | null>(null);

  // Activate timer ticks
  useTimerTick();

  // Load quiz on mount
  useEffect(() => {
    fetch('/quizzes/quiz-1.json')
      .then((res) => res.json())
      .then((data: Quiz) => loadQuiz(data))
      .catch(console.error);
  }, [loadQuiz]);

  // Schedule bot answers when question becomes active
  useEffect(() => {
    if (phase === 'QUESTION_ACTIVE' && quiz && preset !== 'solo') {
      const question = quiz.questions[currentQuestionIndex];
      if (question) {
        cleanupRef.current = scheduleSimulatedAnswers(question, preset);
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [phase, currentQuestionIndex, quiz, preset]);

  const handleSelectPreset = (selectedPreset: PlayerPreset) => {
    setPreset(selectedPreset);
    const players = createPlayersForPreset(selectedPreset, { ...HUMAN_PLAYER, score: 0 });
    setPlayers(players);
  };

  const handleReset = () => {
    reset();
    fetch('/quizzes/quiz-1.json')
      .then((res) => res.json())
      .then((data: Quiz) => loadQuiz(data))
      .catch(console.error);
  };

  // Apply theme
  useEffect(() => {
    if (quiz?.theme?.primary) {
      document.documentElement.style.setProperty('--quiz-primary', quiz.theme.primary);
    }
    return () => {
      document.documentElement.style.removeProperty('--quiz-primary');
    };
  }, [quiz?.theme?.primary]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
      {/* Header */}
      <header className="absolute top-4 left-4">
        <h1 className="text-2xl font-black tracking-tight text-white">
          Quiz<span className="text-kahoot-yellow">Huis</span>
        </h1>
      </header>

      {/* Phase content */}
      <AnimatePresence mode="wait">
        {phase === 'LOBBY' && (
          <Lobby key="lobby" onSelectPreset={handleSelectPreset} />
        )}
        {phase === 'QUESTION_INTRO' && (
          <QuestionIntro key={`intro-${currentQuestionIndex}`} />
        )}
        {phase === 'QUESTION_ACTIVE' && (
          <QuestionActive key={`active-${currentQuestionIndex}`} humanPlayerId={HUMAN_PLAYER.id} />
        )}
        {phase === 'RESULT_REVEAL' && (
          <ResultReveal key={`reveal-${currentQuestionIndex}`} />
        )}
        {phase === 'LEADERBOARD' && (
          <Leaderboard
            key={`leaderboard-${currentQuestionIndex}`}
            isHost={isHost}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      {/* Reset button (host only, always visible) */}
      {isHost && phase !== 'LOBBY' && (
        <button
          onClick={handleReset}
          className="absolute bottom-4 right-4 cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm text-white/50 hover:bg-white/20 hover:text-white"
        >
          ↺ Reset
        </button>
      )}
    </div>
  );
}
