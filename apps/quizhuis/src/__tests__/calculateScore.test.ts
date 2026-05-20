import { describe, test, expect } from 'vitest';
import { calculateScore } from '../features/quiz/quizStore';
import type { Question } from '../features/quiz/types';

// --- Fixtures ---

function mcQuestion(points = 1000, timer = 20): Question {
  return {
    id: 'mc-1',
    type: 'multiple-choice',
    prompt: 'What is 2+2?',
    timer,
    points,
    content: {
      options: [
        { id: 'a', label: '3' },
        { id: 'b', label: '4' },
        { id: 'c', label: '5' },
      ],
      correctOptionId: 'b',
    },
  };
}

function boolQuestion(points = 1000, timer = 20): Question {
  return {
    id: 'bool-1',
    type: 'boolean',
    prompt: 'The sky is blue',
    timer,
    points,
    content: { correct: true },
  };
}

function matchingQuestion(points = 900, timer = 20): Question {
  return {
    id: 'match-1',
    type: 'matching',
    prompt: 'Match the capitals',
    timer,
    points,
    content: {
      items: [
        { id: 'i1', label: 'France' },
        { id: 'i2', label: 'Germany' },
        { id: 'i3', label: 'Spain' },
      ],
      targets: [
        { id: 't1', label: 'Paris' },
        { id: 't2', label: 'Berlin' },
        { id: 't3', label: 'Madrid' },
      ],
      correctPairs: [
        { itemId: 'i1', targetId: 't1' },
        { itemId: 'i2', targetId: 't2' },
        { itemId: 'i3', targetId: 't3' },
      ],
    },
  };
}

// --- Multiple Choice ---

describe('calculateScore - multiple choice', () => {
  test('correct answer with full time gives full points', () => {
    expect(calculateScore(mcQuestion(), 'b', 20)).toBe(1000);
  });

  test('correct answer with half time gives half points', () => {
    expect(calculateScore(mcQuestion(), 'b', 10)).toBe(500);
  });

  test('correct answer with 1s remaining', () => {
    expect(calculateScore(mcQuestion(), 'b', 1)).toBe(50);
  });

  test('wrong answer gives 0', () => {
    expect(calculateScore(mcQuestion(), 'a', 20)).toBe(0);
  });

  test('zero time remaining gives 0 even if correct', () => {
    expect(calculateScore(mcQuestion(), 'b', 0)).toBe(0);
  });

  test('rounds fractional scores', () => {
    // 1000 * (7/20) = 350 exactly, but test an odd fraction
    expect(calculateScore(mcQuestion(1000, 30), 'b', 7)).toBe(233); // 1000 * 7/30 = 233.33 → 233
  });
});

// --- Boolean ---

describe('calculateScore - boolean', () => {
  test('correct answer with full time gives full points', () => {
    expect(calculateScore(boolQuestion(), true, 20)).toBe(1000);
  });

  test('correct answer with half time gives half points', () => {
    expect(calculateScore(boolQuestion(), true, 10)).toBe(500);
  });

  test('wrong answer gives 0', () => {
    expect(calculateScore(boolQuestion(), false, 20)).toBe(0);
  });

  test('zero time remaining gives 0 even if correct', () => {
    expect(calculateScore(boolQuestion(), true, 0)).toBe(0);
  });
});

// --- Matching ---

describe('calculateScore - matching', () => {
  test('all pairs correct with full time gives full points', () => {
    const answer = [
      { itemId: 'i1', targetId: 't1' },
      { itemId: 'i2', targetId: 't2' },
      { itemId: 'i3', targetId: 't3' },
    ];
    expect(calculateScore(matchingQuestion(), answer, 20)).toBe(900);
  });

  test('2 of 3 pairs correct with full time gives 2/3 of points', () => {
    const answer = [
      { itemId: 'i1', targetId: 't1' },
      { itemId: 'i2', targetId: 't2' },
      { itemId: 'i3', targetId: 't1' }, // wrong
    ];
    expect(calculateScore(matchingQuestion(), answer, 20)).toBe(600);
  });

  test('1 of 3 correct with half time', () => {
    const answer = [
      { itemId: 'i1', targetId: 't1' }, // correct
      { itemId: 'i2', targetId: 't3' }, // wrong
      { itemId: 'i3', targetId: 't2' }, // wrong
    ];
    // 1 * (900/3) * (10/20) = 1 * 300 * 0.5 = 150
    expect(calculateScore(matchingQuestion(), answer, 10)).toBe(150);
  });

  test('all pairs wrong gives 0', () => {
    const answer = [
      { itemId: 'i1', targetId: 't2' },
      { itemId: 'i2', targetId: 't3' },
      { itemId: 'i3', targetId: 't1' },
    ];
    expect(calculateScore(matchingQuestion(), answer, 20)).toBe(0);
  });

  test('empty answer array gives 0', () => {
    expect(calculateScore(matchingQuestion(), [], 20)).toBe(0);
  });

  test('zero time remaining gives 0 even if all correct', () => {
    const answer = [
      { itemId: 'i1', targetId: 't1' },
      { itemId: 'i2', targetId: 't2' },
      { itemId: 'i3', targetId: 't3' },
    ];
    expect(calculateScore(matchingQuestion(), answer, 0)).toBe(0);
  });

  test('extra pairs beyond what exists do not add score', () => {
    const answer = [
      { itemId: 'i1', targetId: 't1' },
      { itemId: 'i2', targetId: 't2' },
      { itemId: 'i3', targetId: 't3' },
      { itemId: 'i99', targetId: 't99' }, // garbage
    ];
    expect(calculateScore(matchingQuestion(), answer, 20)).toBe(900);
  });
});
