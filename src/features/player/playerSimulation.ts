import type { Player, PlayerPreset, PresetConfig } from './types';
import type { Question, MultipleChoiceContent, MatchingContent } from '../quiz/types';
import { useQuizStore } from '../quiz/quizStore';

const PRESET_CONFIGS: Record<PlayerPreset, PresetConfig> = {
  solo: { count: 0, accuracyRange: [0, 0], speedRange: [0, 0] },
  klein: { count: 3, accuracyRange: [0.5, 0.8], speedRange: [3, 8] },
  groot: { count: 10, accuracyRange: [0.3, 0.9], speedRange: [2, 12] },
};

const BOT_NAMES = [
  'RoboQuiz', 'SlimBot', 'QuizMaster3000', 'BrainiacBot',
  'TurboTrivia', 'SmartAlec', 'QuizWhiz', 'BotBrain',
  'TriviaTitan', 'SpeedDemon',
];

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function createPlayersForPreset(preset: PlayerPreset, humanPlayer: Player): Player[] {
  const config = PRESET_CONFIGS[preset];
  const players: Player[] = [humanPlayer];

  for (let i = 0; i < config.count; i++) {
    players.push({
      id: `bot-${i}`,
      name: BOT_NAMES[i % BOT_NAMES.length],
      score: 0,
      isSimulated: true,
    });
  }

  return players;
}

function generateBotAnswer(question: Question, accuracy: number): unknown {
  const isCorrect = Math.random() < accuracy;

  switch (question.type) {
    case 'multiple-choice': {
      const content = question.content as MultipleChoiceContent;
      if (isCorrect) return content.correctOptionId;
      const wrongOptions = content.options.filter((o) => o.id !== content.correctOptionId);
      return wrongOptions[Math.floor(Math.random() * wrongOptions.length)]?.id ?? content.correctOptionId;
    }
    case 'boolean': {
      const content = question.content as { correct: boolean };
      return isCorrect ? content.correct : !content.correct;
    }
    case 'matching': {
      const content = question.content as MatchingContent;
      if (isCorrect) {
        return content.correctPairs;
      }
      // Shuffle some pairs for incorrect answer
      const shuffled = [...content.correctPairs];
      if (shuffled.length >= 2) {
        const i = Math.floor(Math.random() * shuffled.length);
        const j = (i + 1) % shuffled.length;
        const temp = shuffled[i].targetId;
        shuffled[i] = { ...shuffled[i], targetId: shuffled[j].targetId };
        shuffled[j] = { ...shuffled[j], targetId: temp };
      }
      return shuffled;
    }
    default:
      return null;
  }
}

/**
 * Schedule simulated player answers during QUESTION_ACTIVE phase.
 * Returns a cleanup function to cancel pending timeouts.
 */
export function scheduleSimulatedAnswers(
  question: Question,
  preset: PlayerPreset,
): () => void {
  const config = PRESET_CONFIGS[preset];
  const timeouts: ReturnType<typeof setTimeout>[] = [];
  const store = useQuizStore.getState();
  const bots = store.players.filter((p) => p.isSimulated);

  for (const bot of bots) {
    const delay = randomInRange(config.speedRange[0], config.speedRange[1]) * 1000;
    const accuracy = randomInRange(config.accuracyRange[0], config.accuracyRange[1]);

    const timeout = setTimeout(() => {
      const currentState = useQuizStore.getState();
      if (currentState.phase !== 'QUESTION_ACTIVE') return;

      const answer = generateBotAnswer(question, accuracy);
      useQuizStore.getState().submitAnswer(bot.id, answer);
    }, delay);

    timeouts.push(timeout);
  }

  return () => {
    for (const t of timeouts) clearTimeout(t);
  };
}
