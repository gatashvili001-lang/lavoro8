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

  if (!job || !job.id) return null;

  useEffect(() => {
    setSaved(isJobSaved(job.id));

    function handleChange() {
      setSaved(isJobSaved(job.id));
    }
    window.addEventListener("lavoro8_saved_jobs_changed", handleChange);
    return () => {
      window.removeEventListener("lavoro8_saved_jobs_changed", handleChange);
    };
  }, [job.id]);

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
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border shadow-sm ${
          saved
            ? "bg-amber-500/10 text-amber-700 border-amber-300 hover:bg-amber-500/20"
            : "bg-background text-foreground/80 border-border hover:bg-muted hover:text-foreground"
        } ${className}`}
        title={saved ? "Rimuovi dai salvati" : "Salva offerta"}
      >
        {saved ? (
          <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500/20" />
        ) : (
          <Bookmark className="w-4 h-4 text-muted-foreground" />
        )}
        <span>{saved ? "Offerta Salvata" : "Salva Offerta"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all border shadow-sm flex items-center justify-center ${
        saved
          ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 ring-2 ring-amber-400/20"
          : "bg-white/80 hover:bg-white text-muted-foreground hover:text-foreground border-slate-200"
      } ${className}`}
      title={saved ? "Rimuovi dai salvati" : "Salva offerta"}
    >
      {saved ? (
        <BookmarkCheck className="w-4.5 h-4.5 text-amber-600 fill-amber-500" />
      ) : (
        <Bookmark className="w-4.5 h-4.5 text-slate-500 hover:text-slate-800" />
      )}
    </button>
  );
}
