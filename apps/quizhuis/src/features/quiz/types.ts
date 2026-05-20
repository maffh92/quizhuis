export type QuestionType = 'matching' | 'multiple-choice' | 'boolean';

export interface MatchingContent {
  items: { id: string; label: string }[];
  targets: { id: string; label: string }[];
  correctPairs: { itemId: string; targetId: string }[];
}

export interface MultipleChoiceContent {
  options: { id: string; label: string }[];
  correctOptionId: string;
}

export interface BooleanContent {
  correct: boolean;
}

export type QuestionContent = MatchingContent | MultipleChoiceContent | BooleanContent;

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  timer: number; // seconds
  points: number; // basePoints
  content: QuestionContent;
}

export interface Quiz {
  id: string;
  title: string;
  theme?: { primary: string };
  questions: Question[];
}

export type Phase =
  | 'LOBBY'
  | 'QUESTION_INTRO'
  | 'QUESTION_ACTIVE'
  | 'RESULT_REVEAL'
  | 'LEADERBOARD';
