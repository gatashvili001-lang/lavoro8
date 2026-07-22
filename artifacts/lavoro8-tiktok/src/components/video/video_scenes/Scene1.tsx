import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}>
        
      {/* Italy Colors Slash */}
      <motion.div className="absolute top-[10%] left-[-10%] w-[120%] h-[30vh] -rotate-6 flex flex-col"
        initial={{ y: '-100%' }}
        animate={phase >= 1 ? { y: 0 } : { y: '-100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
        <div className="h-1/3 bg-[#009246] opacity-80 mix-blend-overlay"></div>
        <div className="h-1/3 bg-white opacity-20 mix-blend-overlay"></div>
        <div className="h-1/3 bg-[#CE2B37] opacity-80 mix-blend-overlay"></div>
      </motion.div>

      <div className="text-center px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        >
          <h1 className="text-[12vw] font-display font-black tracking-tighter text-white uppercase leading-[0.85] drop-shadow-2xl">
            Cerchi lavoro<br/>
            <span className="text-primary">in Italia?</span> <span className="inline-block" style={{ transform: 'translateY(-10%)' }}>🇮🇹</span>
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
}
