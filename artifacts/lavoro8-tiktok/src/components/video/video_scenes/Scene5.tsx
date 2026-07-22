import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 8200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center"
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "circOut" }}>

      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,var(--color-bg-dark)_80%)]"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <div className="text-[12vw] font-display font-black tracking-tighter text-white drop-shadow-2xl flex items-center gap-4">
            <motion.span 
              initial={{ rotate: -180, scale: 0 }}
              animate={phase >= 1 ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
              transition={{ type: 'spring', delay: 0.5, stiffness: 200 }}
              className="text-accent"
            >
              8
            </motion.span>
            lavoro8.com
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="mt-8 bg-white/10 backdrop-blur-md px-10 py-6 rounded-full border border-white/20"
        >
          <h2 className="text-[4vw] font-sans font-bold text-white tracking-widest uppercase flex items-center gap-4">
            Trova il tuo lavoro in Europa <span>🇮🇹</span><span>⭐</span>
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
}
