import { describe, test, expect, beforeEach } from 'vitest';
import { useQuizStore } from '../features/quiz/quizStore';
import type { Quiz } from '../features/quiz/types';
import type { Player } from '../features/player/types';

// --- Fixtures ---

const sampleQuiz: Quiz = {
  id: 'quiz-1',
  title: 'Test Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      prompt: 'What is 2+2?',
      timer: 10,
      points: 1000,
      content: {
        options: [
          { id: 'a', label: '3' },
          { id: 'b', label: '4' },
        ],
        correctOptionId: 'b',
      },
    },
    {
      id: 'q2',
      type: 'boolean',
      prompt: 'The sky is blue',
      timer: 10,
      points: 500,
      content: { correct: true },
    },
  ],
};

const humanPlayer: Player = { id: 'human', name: 'Player 1', score: 0, isSimulated: false };
const botPlayer: Player = { id: 'bot-1', name: 'Bot', score: 0, isSimulated: true };

function setupReadyStore() {
  const store = useQuizStore.getState();
  store.loadQuiz(sampleQuiz);
  store.setPlayers([humanPlayer, botPlayer]);
}

function advanceToActive() {
  setupReadyStore();
  useQuizStore.getState().startQuiz();
  useQuizStore.getState().introFinished();
}

// --- Setup ---

beforeEach(() => {
  useQuizStore.getState().reset();
});

// --- Phase transitions: happy path ---

describe('phase transitions - happy path', () => {
  test('starts in LOBBY', () => {
    expect(useQuizStore.getState().phase).toBe('LOBBY');
  });

  test('LOBBY → QUESTION_INTRO via startQuiz', () => {
    setupReadyStore();
    useQuizStore.getState().startQuiz();
    expect(useQuizStore.getState().phase).toBe('QUESTION_INTRO');
    expect(useQuizStore.getState().currentQuestionIndex).toBe(0);
  });

  test('QUESTION_INTRO → QUESTION_ACTIVE via introFinished', () => {
    setupReadyStore();
    useQuizStore.getState().startQuiz();
    useQuizStore.getState().introFinished();

    const state = useQuizStore.getState();
    expect(state.phase).toBe('QUESTION_ACTIVE');
    expect(state.timer.total).toBe(10);
    expect(state.timer.remaining).toBe(10);
    expect(state.timer.running).toBe(true);
  });

  test('QUESTION_ACTIVE → RESULT_REVEAL via timeExpired', () => {
    advanceToActive();
    useQuizStore.getState().timeExpired();

    const state = useQuizStore.getState();
    expect(state.phase).toBe('RESULT_REVEAL');
    expect(state.timer.running).toBe(false);
  });

  test('RESULT_REVEAL → LEADERBOARD via revealFinished', () => {
    advanceToActive();
    useQuizStore.getState().timeExpired();
    useQuizStore.getState().revealFinished();
    expect(useQuizStore.getState().phase).toBe('LEADERBOARD');
  });

  test('LEADERBOARD → next QUESTION_INTRO via leaderboardFinished', () => {
    advanceToActive();
    useQuizStore.getState().timeExpired();
    useQuizStore.getState().revealFinished();
    useQuizStore.getState().leaderboardFinished();

    const state = useQuizStore.getState();
    expect(state.phase).toBe('QUESTION_INTRO');
    expect(state.currentQuestionIndex).toBe(1);
  });

  test('LEADERBOARD stays on last question (quiz complete)', () => {
    advanceToActive();
    // Advance through both questions
    useQuizStore.getState().timeExpired();
    useQuizStore.getState().revealFinished();
    useQuizStore.getState().leaderboardFinished(); // → question 2

    useQuizStore.getState().introFinished();
    useQuizStore.getState().timeExpired();
    useQuizStore.getState().revealFinished();
    useQuizStore.getState().leaderboardFinished(); // last question — should stay

    const state = useQuizStore.getState();
    expect(state.phase).toBe('LEADERBOARD');
    expect(state.currentQuestionIndex).toBe(1);
  });
});

// --- Phase transition guards ---

describe('phase transitions - guards', () => {
  test('startQuiz does nothing without a quiz loaded', () => {
    useQuizStore.getState().setPlayers([humanPlayer]);
    useQuizStore.getState().startQuiz();
    expect(useQuizStore.getState().phase).toBe('LOBBY');
  });

  test('startQuiz does nothing when not in LOBBY', () => {
    advanceToActive();
    useQuizStore.getState().startQuiz();
    expect(useQuizStore.getState().phase).toBe('QUESTION_ACTIVE');
  });

  test('introFinished does nothing when not in QUESTION_INTRO', () => {
    setupReadyStore();
    useQuizStore.getState().introFinished(); // still in LOBBY
    expect(useQuizStore.getState().phase).toBe('LOBBY');
  });

  test('submitAnswer rejected when not in QUESTION_ACTIVE', () => {
    setupReadyStore();
    useQuizStore.getState().startQuiz(); // QUESTION_INTRO
    useQuizStore.getState().submitAnswer('human', 'b');

    const answers = useQuizStore.getState().answers['human'];
    expect(answers).toHaveLength(0);
  });

  test('timeExpired does nothing when not in QUESTION_ACTIVE', () => {
    setupReadyStore();
    useQuizStore.getState().startQuiz(); // QUESTION_INTRO
    useQuizStore.getState().timeExpired();
    expect(useQuizStore.getState().phase).toBe('QUESTION_INTRO');
  });

  test('revealFinished does nothing when not in RESULT_REVEAL', () => {
    advanceToActive();
    useQuizStore.getState().revealFinished();
    expect(useQuizStore.getState().phase).toBe('QUESTION_ACTIVE');
  });
});

// --- Timer ---

describe('timer', () => {
  test('tick decrements remaining by 1', () => {
    advanceToActive();
    useQuizStore.getState().tick();
    expect(useQuizStore.getState().timer.remaining).toBe(9);
  });

  test('tick at remaining=1 triggers timeExpired', () => {
    advanceToActive();
    // Set timer to 1 remaining
    useQuizStore.setState({ timer: { total: 10, remaining: 1, running: true } });
    useQuizStore.getState().tick();

    const state = useQuizStore.getState();
    expect(state.timer.remaining).toBe(0);
    expect(state.phase).toBe('RESULT_REVEAL');
  });

  test('tick does nothing when timer is not running', () => {
    advanceToActive();
    useQuizStore.setState({ timer: { total: 10, remaining: 5, running: false } });
    useQuizStore.getState().tick();
    expect(useQuizStore.getState().timer.remaining).toBe(5);
  });

  test('tick does nothing when not in QUESTION_ACTIVE', () => {
    setupReadyStore();
    useQuizStore.getState().startQuiz(); // QUESTION_INTRO
    useQuizStore.setState({ timer: { total: 10, remaining: 5, running: true } });
    useQuizStore.getState().tick();
    expect(useQuizStore.getState().timer.remaining).toBe(5);
  });
});

// --- submitAnswer ---

describe('submitAnswer', () => {
  test('records answer and updates player score', () => {
    advanceToActive();
    useQuizStore.getState().submitAnswer('human', 'b'); // correct

    const state = useQuizStore.getState();
    const humanAnswers = state.answers['human'];
    expect(humanAnswers).toHaveLength(1);
    expect(humanAnswers[0].questionId).toBe('q1');
    expect(humanAnswers[0].score).toBeGreaterThan(0);

    const player = state.players.find((p) => p.id === 'human');
    expect(player!.score).toBe(humanAnswers[0].score);
  });

  test('prevents duplicate answers for the same question', () => {
    advanceToActive();
    useQuizStore.getState().submitAnswer('human', 'b');
    useQuizStore.getState().submitAnswer('human', 'a'); // duplicate attempt

    expect(useQuizStore.getState().answers['human']).toHaveLength(1);
  });

  test('all players answered stops timer and transitions to RESULT_REVEAL', async () => {
    advanceToActive();
    useQuizStore.getState().submitAnswer('human', 'b');
    useQuizStore.getState().submitAnswer('bot-1', 'a');

    // The store uses setTimeout(300ms) before calling timeExpired
    expect(useQuizStore.getState().timer.running).toBe(false);

    // Wait for the setTimeout to fire
    await new Promise((r) => setTimeout(r, 400));
    expect(useQuizStore.getState().phase).toBe('RESULT_REVEAL');
  });
});

// --- reset ---

describe('reset', () => {
  test('returns to clean LOBBY state from any phase', () => {
    advanceToActive();
    useQuizStore.getState().submitAnswer('human', 'b');
    useQuizStore.getState().reset();

    const state = useQuizStore.getState();
    expect(state.phase).toBe('LOBBY');
    expect(state.quiz).toBeNull();
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.players).toHaveLength(0);
    expect(state.timer).toEqual({ total: 0, remaining: 0, running: false });
    expect(state.answers).toEqual({});
  });
});
