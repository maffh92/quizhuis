import { create } from 'zustand';
import type { Phase, Quiz, Question } from './types';
import type { Player, PlayerAnswer } from '../player/types';

interface TimerState {
  total: number;
  remaining: number;
  running: boolean;
}

export interface QuizState {
  phase: Phase;
  quiz: Quiz | null;
  currentQuestionIndex: number;
  players: Player[];
  timer: TimerState;
  answers: Record<string, PlayerAnswer[]>; // playerId -> answers[]

  // Actions
  loadQuiz: (quiz: Quiz) => void;
  setPlayers: (players: Player[]) => void;
  startQuiz: () => void;
  introFinished: () => void;
  tick: () => void;
  submitAnswer: (playerId: string, answer: unknown) => void;
  timeExpired: () => void;
  revealFinished: () => void;
  leaderboardFinished: () => void;
  reset: () => void;
}

function getCurrentQuestion(state: QuizState): Question | null {
  if (!state.quiz) return null;
  return state.quiz.questions[state.currentQuestionIndex] ?? null;
}

function calculateScore(question: Question, answer: unknown, timeRemaining: number): number {
  const { points, timer: totalTime, type, content } = question;

  if (type === 'matching') {
    const matchingContent = content as { items: { id: string }[]; correctPairs: { itemId: string; targetId: string }[] };
    const pairs = answer as { itemId: string; targetId: string }[];
    const totalPairs = matchingContent.correctPairs.length;
    let correctCount = 0;

    for (const pair of pairs) {
      const isCorrect = matchingContent.correctPairs.some(
        (cp) => cp.itemId === pair.itemId && cp.targetId === pair.targetId
      );
      if (isCorrect) correctCount++;
    }

    const scorePerPair = (points / totalPairs) * (timeRemaining / totalTime);
    return Math.round(correctCount * scorePerPair);
  }

  if (type === 'multiple-choice') {
    const mcContent = content as { correctOptionId: string };
    if (answer === mcContent.correctOptionId) {
      return Math.round(points * (timeRemaining / totalTime));
    }
    return 0;
  }

  if (type === 'boolean') {
    const boolContent = content as { correct: boolean };
    if (answer === boolContent.correct) {
      return Math.round(points * (timeRemaining / totalTime));
    }
    return 0;
  }

  return 0;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  phase: 'LOBBY',
  quiz: null,
  currentQuestionIndex: 0,
  players: [],
  timer: { total: 0, remaining: 0, running: false },
  answers: {},

  loadQuiz: (quiz) => set({ quiz }),

  setPlayers: (players) => {
    const answers: Record<string, PlayerAnswer[]> = {};
    for (const p of players) {
      answers[p.id] = [];
    }
    set({ players, answers });
  },

  startQuiz: () => {
    const state = get();
    if (state.phase !== 'LOBBY' || !state.quiz) return;
    set({ phase: 'QUESTION_INTRO', currentQuestionIndex: 0 });
  },

  introFinished: () => {
    const state = get();
    if (state.phase !== 'QUESTION_INTRO') return;
    const question = getCurrentQuestion(state);
    if (!question) return;
    set({
      phase: 'QUESTION_ACTIVE',
      timer: { total: question.timer, remaining: question.timer, running: true },
    });
  },

  tick: () => {
    const state = get();
    if (state.phase !== 'QUESTION_ACTIVE' || !state.timer.running) return;
    const remaining = state.timer.remaining - 1;
    if (remaining <= 0) {
      set({ timer: { ...state.timer, remaining: 0, running: false } });
      get().timeExpired();
    } else {
      set({ timer: { ...state.timer, remaining } });
    }
  },

  submitAnswer: (playerId, answer) => {
    const state = get();
    if (state.phase !== 'QUESTION_ACTIVE') return;
    const question = getCurrentQuestion(state);
    if (!question) return;

    // Prevent duplicate answers for the same question
    const existing = state.answers[playerId] ?? [];
    if (existing.some((a) => a.questionId === question.id)) return;

    const score = calculateScore(question, answer, state.timer.remaining);
    const playerAnswer: PlayerAnswer = {
      questionId: question.id,
      answer,
      timeRemaining: state.timer.remaining,
      score,
    };

    const updatedAnswers = {
      ...state.answers,
      [playerId]: [...existing, playerAnswer],
    };

    // Update player score
    const updatedPlayers = state.players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + score } : p
    );

    set({ answers: updatedAnswers, players: updatedPlayers });

    // Check if all players have answered
    const allAnswered = updatedPlayers.every((p) =>
      updatedAnswers[p.id]?.some((a) => a.questionId === question.id)
    );
    if (allAnswered) {
      set({ timer: { ...state.timer, running: false } });
      // Small delay before reveal to feel natural
      setTimeout(() => get().timeExpired(), 300);
    }
  },

  timeExpired: () => {
    const state = get();
    if (state.phase !== 'QUESTION_ACTIVE') return;
    set({ phase: 'RESULT_REVEAL', timer: { ...state.timer, running: false } });
  },

  revealFinished: () => {
    const state = get();
    if (state.phase !== 'RESULT_REVEAL') return;
    set({ phase: 'LEADERBOARD' });
  },

  leaderboardFinished: () => {
    const state = get();
    if (state.phase !== 'LEADERBOARD' || !state.quiz) return;
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= state.quiz.questions.length) {
      // Quiz is done — stay on leaderboard as final state
      return;
    }
    set({ phase: 'QUESTION_INTRO', currentQuestionIndex: nextIndex });
  },

  reset: () =>
    set({
      phase: 'LOBBY',
      quiz: null,
      currentQuestionIndex: 0,
      players: [],
      timer: { total: 0, remaining: 0, running: false },
      answers: {},
    }),
}));
