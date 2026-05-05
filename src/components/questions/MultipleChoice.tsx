import { motion } from 'framer-motion';

interface MultipleChoiceProps {
  options: { id: string; label: string }[];
  onAnswer: (optionId: string) => void;
  disabled?: boolean;
  selectedId?: string | null;
}

const COLORS = [
  'bg-red-500 hover:bg-red-600',
  'bg-blue-500 hover:bg-blue-600',
  'bg-yellow-500 hover:bg-yellow-600',
  'bg-green-500 hover:bg-green-600',
];

export function MultipleChoice({ options, onAnswer, disabled, selectedId }: MultipleChoiceProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;
        const colorClass = COLORS[index % COLORS.length];

        return (
          <motion.button
            key={option.id}
            whileHover={disabled ? undefined : { scale: 1.02 }}
            whileTap={disabled ? undefined : { scale: 0.98 }}
            onClick={() => !disabled && onAnswer(option.id)}
            disabled={disabled}
            className={`
              rounded-xl px-6 py-5 text-lg font-bold text-white shadow-lg
              transition-opacity
              ${colorClass}
              ${disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
              ${isSelected ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''}
            `}
          >
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
}
