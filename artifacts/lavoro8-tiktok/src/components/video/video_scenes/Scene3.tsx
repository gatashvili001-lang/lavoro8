import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 4200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center bg-primary"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
        
      {/* Background texture from attached assets generated previously */}
      <motion.div 
        className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/italy-texture.png)` }}
        animate={{ scale: [1.2, 1], rotate: [5, 0] }}
        transition={{ duration: 5, ease: 'easeOut' }}
      />

      <div className="text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotateX: 90 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.2, rotateX: 90 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="text-[25vw] font-display font-black leading-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] text-accent"
        >
          400+
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(10px)' }}
          transition={{ duration: 0.6 }}
          className="mt-4"
        >
          <h2 className="text-[5vw] font-display uppercase tracking-widest text-white drop-shadow-lg leading-tight">
            offerte verificate<br/>in tutta Italia
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
}
