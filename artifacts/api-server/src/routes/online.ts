import { Router } from "express";

const router = Router();

const sessions = new Map<string, number>();

const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

function cleanup() {
  const now = Date.now();
  for (const [id, ts] of sessions) {
    if (now - ts > ACTIVE_WINDOW_MS) sessions.delete(id);
  }
}

router.post("/online/ping", (req, res) => {
  const sid = (req.headers["x-session-id"] as string) || req.ip || "anon";
  sessions.set(sid, Date.now());
  cleanup();
  res.json({ online: sessions.size });
});

router.get("/online/count", (_req, res) => {
  cleanup();
  res.json({ online: sessions.size });
});

export default router;
