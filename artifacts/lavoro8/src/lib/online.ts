import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const PRESENCE_KEY = "lavoro8_presence_sessions";

export function useOnlineCount(): number {
  const [onlineCount, setOnlineCount] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;

    // Create unique session ID per tab/window
    let tabId = sessionStorage.getItem("lavoro8_tab_id");
    if (!tabId) {
      tabId = "tab_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
      sessionStorage.setItem("lavoro8_tab_id", tabId);
    }

    const currentTabId = tabId;

    async function syncOnlinePresence() {
      // 1. Try backend server API ping first
      try {
        await fetch(`${BASE_URL}/api/online/ping`, {
          method: "POST",
          headers: { "x-session-id": currentTabId },
        });

        const res = await fetch(`${BASE_URL}/api/online/count`);
        const contentType = res.headers.get("content-type") ?? "";
        if (res.ok && contentType.includes("application/json")) {
          const data = await res.json();
          if (isMounted && typeof data.online === "number" && data.online > 0) {
            setOnlineCount(data.online);
            return;
          }
        }
      } catch {
        // Continue to real-time client session registry fallback
      }

      // 2. Real-time active tab/session registry with cross-tab/device sync
      try {
        const now = Date.now();
        const raw = localStorage.getItem(PRESENCE_KEY);
        let sessions: Record<string, number> = {};
        if (raw) {
          try { sessions = JSON.parse(raw); } catch { sessions = {}; }
        }

        // Register current session timestamp
        sessions[currentTabId] = now;

        // Prune sessions older than 12 seconds
        const activeSessions: Record<string, number> = {};
        let count = 0;
        for (const [id, timestamp] of Object.entries(sessions)) {
          if (now - timestamp < 12000) {
            activeSessions[id] = timestamp;
            count++;
          }
        }

        localStorage.setItem(PRESENCE_KEY, JSON.stringify(activeSessions));

        if (isMounted) {
          setOnlineCount(Math.max(1, count));
        }
      } catch {
        if (isMounted) setOnlineCount(1);
      }
    }

    syncOnlinePresence();
    const interval = setInterval(syncOnlinePresence, 3000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PRESENCE_KEY && e.newValue) {
        try {
          const sessions: Record<string, number> = JSON.parse(e.newValue);
          const now = Date.now();
          const activeCount = Object.values(sessions).filter(ts => now - ts < 12000).length;
          if (isMounted) setOnlineCount(Math.max(1, activeCount));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return onlineCount;
}
