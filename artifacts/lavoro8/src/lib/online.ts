import { useState, useEffect } from "react";

export function useOnlineCount() {
  const [online, setOnline] = useState(() => {
    // Generate base number around 34-48
    const base = 38;
    const now = Date.now();
    const cycle = Math.sin(now / 7000) * 8;
    return Math.max(24, Math.round(base + cycle));
  });

  useEffect(() => {
    const updateCount = () => {
      const base = 38;
      const now = Date.now();
      const cycle = Math.sin(now / 7000) * 8;
      const jitter = Math.floor(Math.random() * 5) - 2;
      setOnline(Math.max(24, Math.round(base + cycle + jitter)));
    };

    updateCount();
    const interval = setInterval(updateCount, 3000);
    return () => clearInterval(interval);
  }, []);

  return online;
}
