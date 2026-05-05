import { useEffect, useRef } from 'react';
import { useQuizStore } from './quizStore';

/**
 * Hook that drives the quiz timer with drift compensation.
 * Mount this once in the game component tree.
 */
export function useTimerTick() {
  const tick = useQuizStore((s) => s.tick);
  const running = useQuizStore((s) => s.timer.running);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    if (running) {
      lastTickRef.current = performance.now();
      intervalRef.current = setInterval(() => {
        const now = performance.now();
        const elapsed = now - lastTickRef.current;
        if (elapsed >= 950) {
          lastTickRef.current = now - (elapsed - 1000);
          tick();
        }
      }, 100); // Check frequently, tick every ~1s with drift compensation
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, tick]);
}
