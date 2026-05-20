import { motion } from 'framer-motion';
import { useQuizStore } from '../../features/quiz/quizStore';

export function TimerBar() {
  const timer = useQuizStore((s) => s.timer);
  const fraction = timer.total > 0 ? timer.remaining / timer.total : 1;

  const getColor = () => {
    if (fraction > 0.5) return 'bg-green-400';
    if (fraction > 0.25) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white/70">Tijd</span>
        <span className="text-2xl font-bold text-white">{timer.remaining}s</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
        <motion.div
          className={`h-full rounded-full ${getColor()}`}
          animate={{ width: `${fraction * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
