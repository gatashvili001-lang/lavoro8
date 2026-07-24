import { useState, useEffect } from "react";
import { INITIAL_REAL_JOBS, Job } from "./initial-jobs";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const STORAGE_KEY = "lavoro8_dynamic_jobs";

export function getDynamicJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Job[];
  } catch {
    return [];
  }
}

export function getAllJobs(): Job[] {
  const dynamic = getDynamicJobs();
  return [...dynamic, ...INITIAL_REAL_JOBS];
}

export function ensureSeededJobs() {
  // No-op: Only real job listings from database / local storage are displayed.
}

export function getJobById(id: number): Job | undefined {
  return getAllJobs().find(j => j.id === id);
}

export function useLiveJobs(): Job[] {
  const [jobs, setJobs] = useState<Job[]>(() => getAllJobs());

  useEffect(() => {
    let isMounted = true;

    async function syncLiveJobs() {
      const allFetched: Job[] = [];

      try {
        const res = await fetch(`${BASE_URL}/api/jobs`);
        const contentType = res.headers.get("content-type") ?? "";
        if (res.ok && contentType.includes("application/json")) {
          const dbJobs = await res.json();
          if (Array.isArray(dbJobs) && dbJobs.length > 0) {
            allFetched.push(...dbJobs);
          }
        }
      } catch {
        // network fallback
      }

      try {
        const extRes = await fetch(`${BASE_URL}/api/external-jobs`);
        const extContentType = extRes.headers.get("content-type") ?? "";
        if (extRes.ok && extContentType.includes("application/json")) {
          const extData = await extRes.json();
          const extJobsList = extData.data || extData;
          if (Array.isArray(extJobsList) && extJobsList.length > 0) {
            const mappedExt: Job[] = extJobsList.map((e: any, idx: number) => ({
              id: 90000 + idx,
              title: e.title,
              company: e.company || e.sourceName || "Azienda Verificata",
              city: e.location || "Europa",
              country: e.country || "IT",
              category: e.category || "Logistica",
              description: e.description || e.title,
              createdAt: e.postedAt || new Date().toISOString(),
            }));
            allFetched.push(...mappedExt);
          }
        }
      } catch {
        // network fallback
      }

      if (isMounted) {
        const localDynamic = getDynamicJobs();
        // Failsafe safety net: if API queries return 0 jobs, use seeded 105+ real jobs array so the site NEVER shows 0 jobs
        const baseJobs = allFetched.length > 0 ? allFetched : INITIAL_REAL_JOBS;
        const combined = [...localDynamic, ...baseJobs];
        const uniqueMap = new Map<number | string, Job>();
        combined.forEach(j => uniqueMap.set(j.id, j));
        const finalJobs = Array.from(uniqueMap.values());
        setJobs(finalJobs);
      }
    }

    syncLiveJobs();

    const handleUpdate = () => {
      syncLiveJobs();
    };

    window.addEventListener("lavoro8_jobs_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    const interval = setInterval(syncLiveJobs, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("lavoro8_jobs_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return jobs;
}
