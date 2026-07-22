import React, { useState } from "react";
import { Link } from "wouter";
import { formatJobSalary } from "@/lib/format";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Briefcase, ArrowRight, Clock, Sparkles } from "lucide-react";
import { Job } from "@workspace/api-client-react";
import { useLang } from "@/lib/lang-context";

const FLAG_CDN = "https://hatscripts.github.io/circle-flags/flags";

const COUNTRY_FLAG_CODES: Record<string, string> = {
  IT: "it", DE: "de", FR: "fr", ES: "es", PT: "pt",
  NL: "nl", BE: "be", AT: "at", CH: "ch", GB: "gb",
  PL: "pl", RO: "ro", CZ: "cz", SK: "sk", HU: "hu",
  SE: "se", NO: "no", DK: "dk", FI: "fi", GR: "gr",
  HR: "hr", RS: "rs", BG: "bg", UA: "ua", RU: "ru",
  TR: "tr", AL: "al", GE: "ge", LU: "lu", IE: "ie",
};

const CATEGORY_COLORS: Record<string, string> = {
  Magazzino: "bg-amber-100 text-amber-800 border-amber-200",
  Logistica: "bg-blue-100 text-blue-800 border-blue-200",
  Rider: "bg-orange-100 text-orange-800 border-orange-200",
  Ristorante: "bg-red-100 text-red-800 border-red-200",
  Hotel: "bg-purple-100 text-purple-800 border-purple-200",
  Badante: "bg-rose-100 text-rose-800 border-rose-200",
  Colf: "bg-teal-100 text-teal-800 border-teal-200",
  "Baby-sitter": "bg-pink-100 text-pink-800 border-pink-200",
  Edilizia: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Agricoltura: "bg-green-100 text-green-800 border-green-200",
  Altro: "bg-gray-100 text-gray-700 border-gray-200",
};

function CircleFlag({ country, size = 18 }: { country?: string | null; size?: number }) {
  const [err, setErr] = useState(false);
  const code = country ? COUNTRY_FLAG_CODES[country] : null;
  if (!code || err) return <span className="text-sm">🌍</span>;
  return (
    <img
      src={`${FLAG_CDN}/${code}.svg`}
      alt={country || "flag"}
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
      onError={() => setErr(true)}
    />
  );
}

function relativeDate(dateStr?: string | null, lang: string = "it"): string {
  if (!dateStr) return lang === "it" ? "Oggi" : "Today";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return lang === "it" ? "Oggi" : "Today";
    const days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days <= 0) return lang === "it" ? "Oggi" : lang === "de" ? "Heute" : lang === "fr" ? "Aujourd'hui" : lang === "es" ? "Hoy" : "Today";
    if (days === 1) return lang === "it" ? "Ieri" : lang === "de" ? "Gestern" : lang === "fr" ? "Hier" : lang === "es" ? "Ayer" : "Yesterday";
    if (days < 7) return lang === "it" ? `${days} giorni fa` : lang === "de" ? `vor ${days} Tagen` : lang === "fr" ? `il y a ${days} jours` : `${days} days ago`;
    return date.toLocaleDateString(lang || "it", { day: "numeric", month: "short" });
  } catch (_) {
    return lang === "it" ? "Oggi" : "Today";
  }
}

export function JobCard({ job }: { job: Job }) {
  const { tr, lang } = useLang();
  const catColor = CATEGORY_COLORS[job.category ?? "Altro"] ?? CATEGORY_COLORS.Altro;
  const hasSalary = Boolean(job.salaryMin && job.salaryMin > 0);
  const daysOld = job.createdAt ? Math.floor((Date.now() - new Date(job.createdAt).getTime()) / 86400000) : 999;
  const isNew = daysOld <= 2;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group flex flex-col h-full border-border hover:border-primary/30 bg-background relative">
      {isNew && (
        <div className="absolute -top-2 -right-2 z-10">
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" /> NEW
          </span>
        </div>
      )}

      <CardContent className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 flex-1">
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <Badge className={`shrink-0 text-[11px] font-semibold border ${catColor} bg-opacity-80`}>
            {job.category || "Altro"}
          </Badge>
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
          {job.company && (
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary/60 shrink-0" />
              <span className="font-semibold text-foreground truncate">{job.company}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" />
            <span className="truncate">{job.city || "Italia"}</span>
            {job.country && (
              <span className="flex items-center gap-1 ml-1 shrink-0">
                <CircleFlag country={job.country} size={14} />
                <span className="text-xs">{job.country}</span>
              </span>
            )}
          </div>
          {job.contractType && (
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-primary/60 shrink-0" />
              <span>{job.contractType}</span>
            </div>
          )}
        </div>

        {hasSalary && (
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
            <span className="text-sm font-bold text-green-700">
              {formatJobSalary(job.salaryMin, job.country)} – {formatJobSalary(job.salaryMax, job.country)}
            </span>
            <span className="text-xs text-green-600">{tr("perMonthLabel")}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pb-4 pt-3 border-t border-border/40 bg-muted/20 flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{relativeDate(job.createdAt, lang)}</span>
        </div>
        <Link
          href={`/jobs/${job.id}`}
          className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
        >
          {tr("applyNow")} <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
