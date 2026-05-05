export interface MatchPair {
  itemId: string;
  targetId: string;
}

export interface MatchingQuestionData {
  id: string;
  question: string;
  items: { id: string; label: string }[];
  targets: { id: string; label: string }[];
  correctPairs: MatchPair[];
}

export type MatchResult = 'correct' | 'incorrect' | null;

export interface MatchState {
  matches: Map<string, string>; // itemId -> targetId
  selectedItemId: string | null;
  submitted: boolean;
  results: Map<string, boolean>; // itemId -> isCorrect
}
