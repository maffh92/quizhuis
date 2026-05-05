import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

interface MatchTargetProps {
  id: string;
  label: string;
  matchedItemId: string | null;
  selectedItemId: string | null;
  submitted: boolean;
  onSelect: (id: string) => void;
}

export function MatchTarget({
  id,
  label,
  matchedItemId,
  selectedItemId,
  submitted,
  onSelect,
}: MatchTargetProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled: submitted,
  });

  const isHighlighted = isOver || (selectedItemId !== null && !submitted);

  return (
    <motion.div
      ref={setNodeRef}
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isOver ? 1.05 : 1,
      }}
      whileHover={!submitted && selectedItemId ? { scale: 1.03 } : {}}
      whileTap={!submitted && selectedItemId ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() => onSelect(id)}
      className={`
        relative rounded-xl px-6 py-4 text-center text-lg font-bold
        shadow-lg transition-all duration-200
        ${matchedItemId ? 'bg-white/20 text-white' : 'bg-white/10 text-white/80'}
        ${isHighlighted ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-kahoot-purple' : ''}
        ${isOver ? 'bg-white/30' : ''}
        ${!submitted && selectedItemId ? 'cursor-pointer' : 'cursor-default'}
        border-4 ${matchedItemId ? 'border-white/50' : 'border-white/20'}
      `}
      data-target-id={id}
    >
      {label}
    </motion.div>
  );
}
