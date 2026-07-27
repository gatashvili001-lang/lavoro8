import React, { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isJobSaved, toggleSaveJob } from "@/lib/saved-jobs";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/lang-context";

interface BookmarkButtonProps {
  job: {
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
  };
  variant?: "icon" | "button";
  className?: string;
}

export function BookmarkButton({ job, variant = "icon", className = "" }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const { lang } = useLang();

  const jobId = job?.id;

  useEffect(() => {
    if (!jobId) return;
    setSaved(isJobSaved(jobId));

    function handleChange() {
      if (jobId) setSaved(isJobSaved(jobId));
    }
    window.addEventListener("lavoro8_saved_jobs_changed", handleChange);
    return () => {
      window.removeEventListener("lavoro8_saved_jobs_changed", handleChange);
    };
  }, [jobId]);

  if (!job || !job.id) return null;

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const isNowSaved = toggleSaveJob(job);
    setSaved(isNowSaved);

    if (isNowSaved) {
      toast({
        title: lang === "ka" ? "ვაკანსია შენახულია 🔖" : "Offerta Salvata nei Preferiti 🔖",
        description: lang === "ka" ? "შეგიძლიათ ნახოთ შენახული ვაკანსიები ჰედერში." : "Puoi consultare le tue offerte salvate in qualsiasi momento dal menu.",
      });
    } else {
      toast({
        title: lang === "ka" ? "წაშლილია შენახულებიდან" : "Offerta Rimossa dai Preferiti",
        description: lang === "ka" ? "ვაკანსია ამოღებულია შენახული სიიდან." : "L'offerta è stata rimossa dalla tua lista personale.",
      });
    }
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
          saved
            ? "bg-amber-50 border-amber-300 text-amber-900 shadow-sm"
            : "bg-background border-border text-foreground hover:bg-muted/40"
        } ${className}`}
      >
        {saved ? (
          <>
            <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Salvata</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4 text-muted-foreground" />
            <span>Salva nei Preferiti</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Bookmark job"
      className={`p-2 rounded-xl border transition-all ${
        saved
          ? "bg-amber-50 border-amber-300 text-amber-600 shadow-sm"
          : "bg-background/80 border-border/60 text-muted-foreground hover:text-foreground hover:bg-background"
      } ${className}`}
    >
      {saved ? (
        <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </button>
  );
}
