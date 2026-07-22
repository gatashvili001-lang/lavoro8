import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PROPS = [
  "Gratis per i candidati",
  "Candidatura in 1 click",
  "23 lingue disponibili"
];

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 4200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-dark"
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 90, opacity: 0 }}
      transition={{ duration: 0.8, ease: "backOut" }}>

      <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-12 z-10">
        {PROPS.map((prop, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
            initial={{ x: -100, opacity: 0 }}
            animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: i * 0.4 }}
          >
            <motion.div 
              className="text-[6vw] bg-accent text-bg-dark rounded-full w-[10vw] h-[10vw] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
              initial={{ scale: 0, rotate: -180 }}
              animate={phase >= 1 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ type: 'spring', delay: (i * 0.4) + 0.3 }}
            >
              ✅
            </motion.div>
            <span className="text-[4.5vw] font-display uppercase tracking-wide">{prop}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
