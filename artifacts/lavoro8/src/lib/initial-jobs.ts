export interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  country: string;
  category: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  contractType?: string | null;
  description: string;
  email?: string | null;
  isActive?: boolean | null;
  createdAt: string;
}

export const INITIAL_REAL_JOBS: Job[] = [];

// ─── Utility: safe array filter ───────────────────────────────────────────────
export function safeFilter(jobs: Job[], opts: {
  category?: string;
  country?: string;
  city?: string;
  search?: string;
}): Job[] {
  if (!Array.isArray(jobs)) return INITIAL_REAL_JOBS;
  return jobs.filter(j => {
    if (!j) return false;
    if (opts.category && opts.category !== "Tutte" && j.category !== opts.category) return false;
    if (opts.country && opts.country !== "ALL" && j.country !== opts.country) return false;
    if (opts.city) {
      const jc = (j.city || "").toLowerCase();
      if (!jc.includes(opts.city.toLowerCase())) return false;
    }
    if (opts.search) {
      const s = opts.search.toLowerCase();
      const title = (j.title || "").toLowerCase();
      const desc = (j.description || "").toLowerCase();
      if (!title.includes(s) && !desc.includes(s)) return false;
    }
    return true;
  });
}
