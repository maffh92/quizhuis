import { useState } from 'react';
import type { Question, MatchingContent, MultipleChoiceContent } from '../../features/quiz/types';
import { MatchingQuestion } from './MatchingQuestion';
import { MultipleChoice } from './MultipleChoice';
import { TrueFalse } from './TrueFalse';
import type { MatchingQuestionData } from '../../types/quiz';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (answer: unknown) => void;
  disabled?: boolean;
}

export function QuestionRenderer({ question, onAnswer, disabled }: QuestionRendererProps) {
  const [selectedMC, setSelectedMC] = useState<string | null>(null);
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null);

  const handleMCAnswer = (optionId: string) => {
    setSelectedMC(optionId);
    onAnswer(optionId);
  };

  const handleBoolAnswer = (value: boolean) => {
    setSelectedBool(value);
    onAnswer(value);
  };

  const handleMatchingAnswer = (pairs: { itemId: string; targetId: string }[]) => {
    onAnswer(pairs);
  };

  switch (question.type) {
    case 'multiple-choice': {
      const content = question.content as MultipleChoiceContent;
      return (
        <MultipleChoice
          options={content.options}
          onAnswer={handleMCAnswer}
          disabled={disabled || selectedMC !== null}
          selectedId={selectedMC}
        />
      );
    }
    case 'boolean': {
      return (
        <TrueFalse
          onAnswer={handleBoolAnswer}
          disabled={disabled || selectedBool !== null}
          selectedValue={selectedBool}
        />
      );
    }
    case 'matching': {
      const content = question.content as MatchingContent;
      const data: MatchingQuestionData = {
        id: question.id,
        question: question.prompt,
        items: content.items,
        targets: content.targets,
        correctPairs: content.correctPairs,
      };
      return (
        <MatchingQuestion
          data={data}
          onComplete={handleMatchingAnswer}
          disabled={disabled}
        />
      );
    }
    default:
      return <div className="text-white">Onbekend vraagtype</div>;
  }
}
