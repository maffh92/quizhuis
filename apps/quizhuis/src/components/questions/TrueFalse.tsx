import { motion } from 'framer-motion';

interface TrueFalseProps {
  onAnswer: (value: boolean) => void;
  disabled?: boolean;
  selectedValue?: boolean | null;
}

export function TrueFalse({ onAnswer, disabled, selectedValue }: TrueFalseProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        onClick={() => !disabled && onAnswer(true)}
        disabled={disabled}
        className={`
          rounded-xl bg-green-500 px-8 py-8 text-2xl font-bold text-white shadow-lg
          transition-opacity hover:bg-green-600
          ${disabled && selectedValue !== true ? 'opacity-50 cursor-not-allowed' : ''}
          ${selectedValue === true ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''}
        `}
      >
        ✓ Waar
      </motion.button>
      <motion.button
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        onClick={() => !disabled && onAnswer(false)}
        disabled={disabled}
        className={`
          rounded-xl bg-red-500 px-8 py-8 text-2xl font-bold text-white shadow-lg
          transition-opacity hover:bg-red-600
          ${disabled && selectedValue !== false ? 'opacity-50 cursor-not-allowed' : ''}
          ${selectedValue === false ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''}
        `}
      >
        ✗ Niet waar
      </motion.button>
    </div>
  );
}
