import { useState, useEffect } from "react";

const SAVED_JOBS_KEY = "lavoro8_saved_jobs_v1";

export interface SavedJobItem {
  id: string | number;
  title: string;
  company: string;
  city: string;
  country: string;
  category: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  contractType?: string | null;
  url?: string;
  isExternal?: boolean;
  savedAt: string;
}

export function getSavedJobs(): SavedJobItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isJobSaved(id: string | number): boolean {
  const saved = getSavedJobs();
  return saved.some(j => String(j.id) === String(id));
}

export function toggleSaveJob(job: {
  id: string | number;
  title: string;
  company: string;
  city?: string | null;
  location?: string | null;
  country?: string | null;
  category?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  contractType?: string | null;
  url?: string;
  isExternal?: boolean;
}): boolean {
  if (typeof window === "undefined") return false;
  const saved = getSavedJobs();
  const exists = saved.some(j => String(j.id) === String(job.id));

  let updated: SavedJobItem[];
  if (exists) {
    updated = saved.filter(j => String(j.id) !== String(job.id));
  } else {
    const newItem: SavedJobItem = {
      id: job.id,
      title: job.title,
      company: job.company || "Azienda Verificata",
      city: job.city || job.location || "Italia",
      country: job.country || "IT",
      category: job.category || "Altro",
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      contractType: job.contractType,
      url: job.url,
      isExternal: job.isExternal || String(job.id).includes("-"),
      savedAt: new Date().toISOString(),
    };
    updated = [newItem, ...saved];
  }

  try {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("lavoro8_saved_jobs_changed"));
  } catch {}

  return !exists;
}

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJobItem[]>(getSavedJobs());

  useEffect(() => {
    function handleChange() {
      setSavedJobs(getSavedJobs());
    }
    window.addEventListener("lavoro8_saved_jobs_changed", handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener("lavoro8_saved_jobs_changed", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return savedJobs;
}
