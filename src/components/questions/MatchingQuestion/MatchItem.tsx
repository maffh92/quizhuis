import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

interface MatchItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  isMatched: boolean;
  result: boolean | undefined;
  submitted: boolean;
  onSelect: (id: string) => void;
}

const COLORS = [
  { bg: 'bg-kahoot-red', border: 'border-kahoot-red' },
  { bg: 'bg-kahoot-blue', border: 'border-kahoot-blue' },
  { bg: 'bg-kahoot-green', border: 'border-kahoot-green' },
  { bg: 'bg-kahoot-yellow', border: 'border-kahoot-yellow' },
];

export function MatchItem({
  id,
  label,
  isSelected,
  isMatched,
  result,
  submitted,
  onSelect,
}: MatchItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: submitted,
  });

  const colorIndex =
    parseInt(id.replace(/\D/g, ''), 10) % COLORS.length;
  const color = COLORS[colorIndex];

  const getBorderStyle = () => {
    if (submitted && result === true) return 'border-4 border-green-400';
    if (submitted && result === false) return 'border-4 border-red-400';
    if (isSelected) return 'border-4 border-white';
    if (isMatched) return `border-4 ${color.border}`;
    return 'border-4 border-white/30';
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: isDragging ? 0.6 : 1,
        x: 0,
        scale: isSelected ? 1.05 : 1,
      }}
      whileHover={!submitted ? { scale: 1.03 } : {}}
      whileTap={!submitted ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() => onSelect(id)}
      className={`
        relative cursor-pointer select-none rounded-xl px-6 py-4 text-center
        text-lg font-bold text-white shadow-lg
        transition-colors duration-200
        ${color.bg} ${getBorderStyle()}
        ${isDragging ? 'z-50 shadow-2xl' : ''}
        ${submitted ? 'cursor-default' : 'active:cursor-grabbing'}
      `}
      data-item-id={id}
    >
      {label}
      {submitted && result === true && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm"
        >
          ✓
        </motion.span>
      )}
      {submitted && result === false && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm"
        >
          ✗
        </motion.span>
      )}
    </motion.div>
  );
}
