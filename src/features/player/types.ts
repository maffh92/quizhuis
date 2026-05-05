export interface Player {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  isSimulated: boolean;
}

export interface PlayerAnswer {
  questionId: string;
  answer: unknown;
  timeRemaining: number;
  score: number;
}

export type PlayerPreset = 'solo' | 'klein' | 'groot';

export interface PresetConfig {
  count: number;
  accuracyRange: [number, number]; // [min, max] 0-1
  speedRange: [number, number]; // [min, max] seconds
}
