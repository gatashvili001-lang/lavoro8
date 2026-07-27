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

      // 1. Try backend API routes first
      try {
        const res = await fetch(`${BASE_URL}/api/jobs`);
        const contentType = res.headers.get("content-type") ?? "";
        if (res.ok && contentType.includes("application/json")) {
          const dbJobs = await res.json();
          if (Array.isArray(dbJobs) && dbJobs.length > 0) {
            allFetched.push(...dbJobs);
          }
        }
      } catch {}

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
      } catch {}

      // 2. Client-side direct multi-source API fallback to ensure 316+ listings everywhere
      if (allFetched.length === 0) {
        try {
          const [aRes, jRes, rRes] = await Promise.allSettled([
            fetch("https://www.arbeitnow.com/api/job-board-api").then(r => r.json()),
            fetch("https://jobicy.com/api/v2/remote-jobs?count=50").then(r => r.json()),
            fetch("https://remoteok.com/api", { headers: { "User-Agent": "lavoro8" } }).then(r => r.json()),
          ]);

          if (aRes.status === "fulfilled" && Array.isArray(aRes.value?.data)) {
            const mapped = aRes.value.data.map((j: any, idx: number): Job => ({
              id: 95000 + idx,
              title: j.title,
              company: j.company_name,
              city: j.location || "Europa",
              country: "IT",
              category: "Logistica",
              description: j.description,
              createdAt: new Date((j.created_at || Date.now() / 1000) * 1000).toISOString(),
            }));
            allFetched.push(...mapped);
          }

          if (jRes.status === "fulfilled" && Array.isArray(jRes.value?.jobs)) {
            const mapped = jRes.value.jobs.map((j: any, idx: number): Job => ({
              id: 96000 + idx,
              title: j.jobTitle,
              company: j.companyName || "Azienda Verificata",
              city: j.jobGeo || "Europa",
              country: "IT",
              category: j.jobCategory || "Magazzino",
              description: j.jobDescription,
              createdAt: j.pubDate || new Date().toISOString(),
            }));
            allFetched.push(...mapped);
          }

          if (rRes.status === "fulfilled" && Array.isArray(rRes.value)) {
            const mapped = rRes.value.filter((j: any) => j && j.position).map((j: any, idx: number): Job => ({
              id: 97000 + idx,
              title: j.position,
              company: j.company || "Azienda Verificata",
              city: j.location || "Europa / Remote",
              country: "IT",
              category: "Altro",
              description: j.description,
              createdAt: j.date || new Date().toISOString(),
            }));
            allFetched.push(...mapped);
          }
        } catch {}
      }

      if (isMounted) {
        const localDynamic = getDynamicJobs();
        const baseJobs = allFetched.length > 0 ? allFetched : INITIAL_REAL_JOBS;
        const combined = [...localDynamic, ...baseJobs, ...INITIAL_REAL_JOBS];
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
    const interval = setInterval(syncLiveJobs, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("lavoro8_jobs_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return jobs;
}
