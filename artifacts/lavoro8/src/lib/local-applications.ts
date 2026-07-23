// ─── Local storage helpers for applications ────────────────────────────────
export const APPS_KEY = "lavoro8_applications";

export interface StoredApplication {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  cvUrl: string | null;
  status: "pending" | "viewed" | "replied" | "accepted" | "rejected";
  createdAt: string;
  jobTitle: string;
  jobCity: string;
  jobCompany: string;
  jobCategory: string;
  jobCountry: string;
  jobEmail?: string;
}

export function loadApplications(): StoredApplication[] {
  try {
    const raw = localStorage.getItem(APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveApplications(apps: StoredApplication[]) {
  try { localStorage.setItem(APPS_KEY, JSON.stringify(apps)); } catch {}
}

export function addApplication(app: Omit<StoredApplication, "id" | "createdAt" | "status">): StoredApplication {
  const apps = loadApplications();
  const newApp: StoredApplication = {
    ...app,
    id: Date.now(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  saveApplications([newApp, ...apps]);
  return newApp;
}

export function getApplication(id: number): StoredApplication | undefined {
  return loadApplications().find(a => a.id === id);
}
