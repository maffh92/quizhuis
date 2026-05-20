import { useState, useCallback, useMemo } from 'react';
import type { MatchingQuestionData } from '../types/quiz';

export function useMatchingQuestion(data: MatchingQuestionData) {
  const [matches, setMatches] = useState<Map<string, string>>(new Map());
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Map<string, boolean>>(new Map());

  const allMatched = useMemo(
    () => matches.size === data.items.length,
    [matches.size, data.items.length],
  );

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    results.forEach((isCorrect) => {
      if (isCorrect) correct++;
    });
    return { correct, total: data.items.length };
  }, [submitted, results, data.items.length]);

  const selectItem = useCallback(
    (itemId: string) => {
      if (submitted) return;
      setSelectedItemId((prev) => (prev === itemId ? null : itemId));
    },
    [submitted],
  );

  const selectTarget = useCallback(
    (targetId: string) => {
      if (submitted || !selectedItemId) return;

      setMatches((prev) => {
        const next = new Map(prev);
        // Remove any existing match to this target
        for (const [key, val] of next) {
          if (val === targetId) next.delete(key);
        }
        next.set(selectedItemId, targetId);
        return next;
      });
      setSelectedItemId(null);
    },
    [submitted, selectedItemId],
  );

  const matchItemToTarget = useCallback(
    (itemId: string, targetId: string) => {
      if (submitted) return;
      setMatches((prev) => {
        const next = new Map(prev);
        // Remove any existing match to this target
        for (const [key, val] of next) {
          if (val === targetId) next.delete(key);
        }
        next.set(itemId, targetId);
        return next;
      });
      setSelectedItemId(null);
    },
    [submitted],
  );

  const removeMatch = useCallback(
    (itemId: string) => {
      if (submitted) return;
      setMatches((prev) => {
        const next = new Map(prev);
        next.delete(itemId);
        return next;
      });
    },
    [submitted],
  );

  const submit = useCallback(() => {
    if (!allMatched) return;
    const newResults = new Map<string, boolean>();
    for (const [itemId, targetId] of matches) {
      const isCorrect = data.correctPairs.some(
        (p) => p.itemId === itemId && p.targetId === targetId,
      );
      newResults.set(itemId, isCorrect);
    }
    setResults(newResults);
    setSubmitted(true);
  }, [allMatched, matches, data.correctPairs]);

  const reset = useCallback(() => {
    setMatches(new Map());
    setSelectedItemId(null);
    setSubmitted(false);
    setResults(new Map());
  }, []);

  return {
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
  };
}
