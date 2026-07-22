import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const JOBS = [
  { emoji: '📦', name: 'Magazzino', salary: '1.300€', color: 'bg-blue-600', rotate: -6 },
  { emoji: '🛵', name: 'Rider', salary: '1.200€', color: 'bg-orange-500', rotate: 4 },
  { emoji: '🍕', name: 'Ristorazione', salary: '1.400€', color: 'bg-red-600', rotate: -4 },
  { emoji: '🏨', name: 'Hotel', salary: '1.300€', color: 'bg-emerald-600', rotate: 6 },
  { emoji: '🏠', name: 'Badante', salary: '1.100€', color: 'bg-purple-600', rotate: -5 },
  { emoji: '🔨', name: 'Edilizia', salary: '1.600€', color: 'bg-amber-500', rotate: 5 },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 6200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-8"
      initial={{ x: '100%', skewX: -10 }}
      animate={{ x: 0, skewX: 0 }}
      exit={{ x: '-100%', skewX: 10 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
        
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        {JOBS.map((job, i) => (
          <motion.div
            key={i}
            className={`${job.color} p-6 rounded-3xl shadow-2xl flex items-center gap-6 transform border-4 border-white/10`}
            initial={{ opacity: 0, scale: 0, y: 100, rotate: 0 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1, y: 0, rotate: job.rotate } : { opacity: 0, scale: 0, y: 100, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 150, delay: i * 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-[5vw]">{job.emoji}</div>
            <div className="flex flex-col">
              <span className="text-[3vw] font-display uppercase tracking-wide font-bold">{job.name}</span>
              <span className="text-[2.5vw] font-sans font-bold text-white/90">{job.salary}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
