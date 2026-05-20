import { describe, test, expect } from 'vitest';
import { createPlayersForPreset, generateBotAnswer } from '../features/player/playerSimulation';
import type { Player } from '../features/player/types';
import type { Question } from '../features/quiz/types';

// --- Fixtures ---

const humanPlayer: Player = { id: 'human', name: 'Player 1', score: 0, isSimulated: false };

const mcQuestion: Question = {
  id: 'mc-1',
  type: 'multiple-choice',
  prompt: 'What is 2+2?',
  timer: 10,
  points: 1000,
  content: {
    options: [
      { id: 'a', label: '3' },
      { id: 'b', label: '4' },
      { id: 'c', label: '5' },
    ],
    correctOptionId: 'b',
  },
};

const boolQuestion: Question = {
  id: 'bool-1',
  type: 'boolean',
  prompt: 'The sky is blue',
  timer: 10,
  points: 1000,
  content: { correct: true },
};

const matchingQuestion: Question = {
  id: 'match-1',
  type: 'matching',
  prompt: 'Match capitals',
  timer: 10,
  points: 900,
  content: {
    items: [
      { id: 'i1', label: 'France' },
      { id: 'i2', label: 'Germany' },
    ],
    targets: [
      { id: 't1', label: 'Paris' },
      { id: 't2', label: 'Berlin' },
    ],
    correctPairs: [
      { itemId: 'i1', targetId: 't1' },
      { itemId: 'i2', targetId: 't2' },
    ],
  },
};

// --- createPlayersForPreset ---

describe('createPlayersForPreset', () => {
  test('solo preset returns only the human player', () => {
    const players = createPlayersForPreset('solo', humanPlayer);
    expect(players).toHaveLength(1);
    expect(players[0]).toEqual(humanPlayer);
  });

  test('klein preset returns human + 3 bots', () => {
    const players = createPlayersForPreset('klein', humanPlayer);
    expect(players).toHaveLength(4);
    expect(players[0]).toEqual(humanPlayer);
    expect(players.filter((p) => p.isSimulated)).toHaveLength(3);
  });

  test('groot preset returns human + 10 bots', () => {
    const players = createPlayersForPreset('groot', humanPlayer);
    expect(players).toHaveLength(11);
    expect(players[0]).toEqual(humanPlayer);
    expect(players.filter((p) => p.isSimulated)).toHaveLength(10);
  });

  test('all bots start with score 0', () => {
    const players = createPlayersForPreset('groot', humanPlayer);
    for (const bot of players.filter((p) => p.isSimulated)) {
      expect(bot.score).toBe(0);
    }
  });

  test('all bots have unique ids', () => {
    const players = createPlayersForPreset('groot', humanPlayer);
    const ids = players.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// --- generateBotAnswer: multiple choice ---

describe('generateBotAnswer - multiple choice', () => {
  test('returns correct answer when random < accuracy', () => {
    const random = () => 0.3; // below accuracy of 0.5
    const answer = generateBotAnswer(mcQuestion, 0.5, random);
    expect(answer).toBe('b'); // correctOptionId
  });

  test('returns a wrong answer when random >= accuracy', () => {
    // First call: accuracy check (0.7 >= 0.5 → incorrect)
    // Second call: pick wrong option index (0.5 * 2 wrong options = index 1)
    let callCount = 0;
    const random = () => {
      callCount++;
      if (callCount === 1) return 0.7; // accuracy check → incorrect
      return 0.5; // wrong option selection
    };
    const answer = generateBotAnswer(mcQuestion, 0.5, random);
    expect(answer).not.toBe('b');
    expect(['a', 'c']).toContain(answer);
  });

  test('returns correct answer at accuracy boundary (random exactly 0)', () => {
    const random = () => 0; // 0 < any positive accuracy
    const answer = generateBotAnswer(mcQuestion, 0.5, random);
    expect(answer).toBe('b');
  });
});

// --- generateBotAnswer: boolean ---

describe('generateBotAnswer - boolean', () => {
  test('returns correct value when random < accuracy', () => {
    const random = () => 0.2;
    const answer = generateBotAnswer(boolQuestion, 0.5, random);
    expect(answer).toBe(true); // content.correct = true
  });

  test('returns incorrect value when random >= accuracy', () => {
    const random = () => 0.8;
    const answer = generateBotAnswer(boolQuestion, 0.5, random);
    expect(answer).toBe(false);
  });
});

// --- generateBotAnswer: matching ---

describe('generateBotAnswer - matching', () => {
  test('returns correct pairs when random < accuracy', () => {
    const random = () => 0.1;
    const answer = generateBotAnswer(matchingQuestion, 0.5, random);
    expect(answer).toEqual([
      { itemId: 'i1', targetId: 't1' },
      { itemId: 'i2', targetId: 't2' },
    ]);
  });

  test('returns shuffled pairs when random >= accuracy', () => {
    // First call: accuracy check (0.9 >= 0.5 → incorrect)
    // Second call: shuffle index selection (0.0 * 2 = index 0)
    let callCount = 0;
    const random = () => {
      callCount++;
      if (callCount === 1) return 0.9;
      return 0.0; // picks index 0, swaps with index 1
    };
    const answer = generateBotAnswer(matchingQuestion, 0.5, random) as { itemId: string; targetId: string }[];

    // Targets should be swapped: i1→t2, i2→t1
    expect(answer).toEqual([
      { itemId: 'i1', targetId: 't2' },
      { itemId: 'i2', targetId: 't1' },
    ]);
  });
});
