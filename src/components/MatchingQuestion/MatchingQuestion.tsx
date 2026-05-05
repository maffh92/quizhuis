import { useRef } from 'react';
import { DndContext, type DragEndEvent, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import type { MatchingQuestionData } from '../../types/quiz';
import { useMatchingQuestion } from '../../hooks/useMatchingQuestion';
import { MatchItem } from './MatchItem';
import { MatchTarget } from './MatchTarget';
import { MatchLines } from './MatchLines';

interface MatchingQuestionProps {
  data: MatchingQuestionData;
  onComplete?: (pairs: { itemId: string; targetId: string }[]) => void;
  disabled?: boolean;
}

export function MatchingQuestion({ data, onComplete, disabled }: MatchingQuestionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    matches,
    selectedItemId,
    submitted,
    results,
    allMatched,
    score,
    selectItem,
    selectTarget,
    matchItemToTarget,
    removeMatch,
    submit,
    reset,
  } = useMatchingQuestion(data);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      matchItemToTarget(active.id as string, over.id as string);
    }
  };

  const getMatchedItemForTarget = (targetId: string): string | null => {
    for (const [itemId, tId] of matches) {
      if (tId === targetId) return itemId;
    }
    return null;
  };

  const handleItemSelect = (itemId: string) => {
    if (matches.has(itemId)) {
      removeMatch(itemId);
    } else {
      selectItem(itemId);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      {/* Question header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-extrabold text-white md:text-3xl">
          {data.question}
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Verbind elk item links met het juiste antwoord rechts
        </p>
      </motion.div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div ref={containerRef} className="relative">
          <MatchLines
            matches={matches}
            results={results}
            submitted={submitted}
            containerRef={containerRef}
          />

          <div className="grid grid-cols-2 gap-x-16 gap-y-4 md:gap-x-24">
            {/* Left column: Items */}
            <div className="flex flex-col gap-4">
              {data.items.map((item) => (
                <MatchItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  isSelected={selectedItemId === item.id}
                  isMatched={matches.has(item.id)}
                  result={results.get(item.id)}
                  submitted={submitted}
                  onSelect={handleItemSelect}
                />
              ))}
            </div>

            {/* Right column: Targets */}
            <div className="flex flex-col gap-4">
              {data.targets.map((target) => (
                <MatchTarget
                  key={target.id}
                  id={target.id}
                  label={target.label}
                  matchedItemId={getMatchedItemForTarget(target.id)}
                  selectedItemId={selectedItemId}
                  submitted={submitted}
                  onSelect={selectTarget}
                />
              ))}
            </div>
          </div>
        </div>
      </DndContext>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {!submitted ? (
          <motion.button
            whileHover={allMatched ? { scale: 1.05 } : {}}
            whileTap={allMatched ? { scale: 0.95 } : {}}
            onClick={() => {
              submit();
              if (onComplete) {
                const pairs = Array.from(matches.entries()).map(([itemId, targetId]) => ({ itemId, targetId }));
                onComplete(pairs);
              }
            }}
            disabled={!allMatched || disabled}
            className={`
              rounded-xl px-10 py-4 text-lg font-extrabold uppercase tracking-wider
              shadow-lg transition-all duration-300
              ${
                allMatched
                  ? 'cursor-pointer bg-white text-kahoot-purple hover:bg-kahoot-yellow hover:text-kahoot-dark'
                  : 'cursor-not-allowed bg-white/20 text-white/40'
              }
            `}
          >
            Controleer!
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="cursor-pointer rounded-xl bg-white px-10 py-4 text-lg font-extrabold uppercase tracking-wider text-kahoot-purple shadow-lg hover:bg-kahoot-yellow hover:text-kahoot-dark"
          >
            Opnieuw
          </motion.button>
        )}
      </div>

      {/* Results feedback */}
      <AnimatePresence>
        {submitted && score && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`
              mt-6 rounded-2xl p-6 text-center shadow-2xl
              ${score.correct === score.total ? 'bg-green-500/90' : 'bg-kahoot-red/90'}
            `}
          >
            {score.correct === score.total ? (
              <>
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-5xl"
                >
                  🎉
                </motion.div>
                <p className="mt-2 text-2xl font-extrabold text-white">
                  Geweldig! Alles correct!
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-5xl"
                >
                  🤔
                </motion.div>
                <p className="mt-2 text-2xl font-extrabold text-white">
                  {score.correct} van {score.total} correct
                </p>
                <p className="mt-1 text-white/80">Probeer het nog eens!</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
