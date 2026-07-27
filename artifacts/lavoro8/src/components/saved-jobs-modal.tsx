import React from "react";
import { Link } from "wouter";
import { useSavedJobs, toggleSaveJob } from "@/lib/saved-jobs";
import { BookmarkCheck, Trash2, ExternalLink, MapPin, Building2, Briefcase, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/lang-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SavedJobsModal({ children }: { children?: React.ReactNode }) {
  const savedJobs = useSavedJobs();
  const { lang } = useLang();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button
            type="button"
            className="relative flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span className="hidden sm:inline">Offerte Salvate</span>
            {savedJobs.length > 0 && (
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[11px] px-1.5 py-0.2 rounded-full tabular-nums">
                {savedJobs.length}
              </span>
            )}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6 rounded-3xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold font-display flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-foreground">
              <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>{lang === "ka" ? "შენახული ვაკანსიები" : "Offerte Salvate"}</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                {savedJobs.length}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedJobs.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                <BookmarkCheck className="w-8 h-8 opacity-40" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-1">
                {lang === "ka" ? "შენახული ვაკანსიები არ არის" : "Nessuna Offerta Salvata"}
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-6">
                {lang === "ka"
                  ? "დააჭირეთ სანიშნეს (🔖) ღილაკს ვაკანსიის ბარათზე მის შესანახად."
                  : "Clicca sull'icona Bookmark (🔖) su qualsiasi annuncio per salvarlo e rivederlo qui in seguito."}
              </p>
              <Button asChild size="sm">
                <Link href="/jobs">Esplora le Offerte</Link>
              </Button>
            </div>
          ) : (
            savedJobs.map((j) => (
              <div
                key={j.id}
                className="bg-background rounded-2xl border p-4 hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[11px] font-semibold">
                      {j.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-red-500" /> {j.city}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm line-clamp-1 hover:text-primary transition-colors">
                    {j.isExternal ? (
                      <Link href={`/jobs/ext/${j.id}`}>{j.title}</Link>
                    ) : (
                      <Link href={`/jobs/${j.id}`}>{j.title}</Link>
                    )}
                  </h4>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" /> {j.company}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Button asChild size="sm" className="h-9 text-xs gap-1">
                    {j.isExternal ? (
                      <Link href={`/jobs/ext/${j.id}`}>
                        Vedi Annuncio <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <Link href={`/jobs/${j.id}`}>
                        Candidati <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
                    onClick={() => toggleSaveJob(j)}
                    title="Rimuovi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
