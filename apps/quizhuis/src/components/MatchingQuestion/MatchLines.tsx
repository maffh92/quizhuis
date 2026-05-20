import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MatchLinesProps {
  matches: Map<string, string>;
  results: Map<string, boolean>;
  submitted: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  itemId: string;
}

const MATCH_COLORS = ['#e21b3c', '#1368ce', '#26890c', '#ffa602'];

export function MatchLines({ matches, results, submitted, containerRef }: MatchLinesProps) {
  const [lines, setLines] = useState<Line[]>([]);

  const calculateLines = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const newLines: Line[] = [];
    for (const [itemId, targetId] of matches) {
      const itemEl = container.querySelector(`[data-item-id="${itemId}"]`);
      const targetEl = container.querySelector(`[data-target-id="${targetId}"]`);
      if (!itemEl || !targetEl) continue;

      const itemRect = itemEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      newLines.push({
        x1: itemRect.right - containerRect.left,
        y1: itemRect.top + itemRect.height / 2 - containerRect.top,
        x2: targetRect.left - containerRect.left,
        y2: targetRect.top + targetRect.height / 2 - containerRect.top,
        itemId,
      });
    }
    setLines(newLines);
  }, [matches, containerRef]);

  useEffect(() => {
    calculateLines();
    window.addEventListener('resize', calculateLines);
    // Recalculate after layout animations settle
    const timeout = setTimeout(calculateLines, 100);
    return () => {
      window.removeEventListener('resize', calculateLines);
      clearTimeout(timeout);
    };
  }, [calculateLines]);

  if (lines.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      style={{ overflow: 'visible' }}
    >
      {lines.map((line, i) => {
        const isCorrect = submitted ? results.get(line.itemId) : undefined;
        const colorIndex = parseInt(line.itemId.replace(/\D/g, ''), 10) % MATCH_COLORS.length;
        let strokeColor = MATCH_COLORS[colorIndex];
        if (submitted) {
          strokeColor = isCorrect ? '#4ade80' : '#f87171';
        }

        return (
          <motion.line
            key={`${line.itemId}-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={strokeColor}
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        );
      })}
    </svg>
  );
}
