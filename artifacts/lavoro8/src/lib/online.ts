import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

export function useOnlineCount(): number {
  const [online, setOnline] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;

    async function fetchRealOnlineCount() {
      try {
        const sid = localStorage.getItem("lavoro8_sid") || Math.random().toString(36).slice(2);
        localStorage.setItem("lavoro8_sid", sid);

        // Send real session ping
        await fetch(`${BASE_URL}/api/online/ping`, {
          method: "POST",
          headers: { "x-session-id": sid },
        });

        // Query real database/server session count
        const res = await fetch(`${BASE_URL}/api/online/count`);
        const contentType = res.headers.get("content-type") ?? "";
        if (res.ok && contentType.includes("application/json")) {
          const data = await res.json();
          if (isMounted && typeof data.online === "number" && data.online > 0) {
            setOnline(data.online);
            return;
          }
        }
      } catch {
        // Genuine fallback (1 active user session) when un-networked/static
      }

      if (isMounted) {
        setOnline(1);
      }
    }

    fetchRealOnlineCount();
    const interval = setInterval(fetchRealOnlineCount, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return online;
}
