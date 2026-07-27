import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Building2, Briefcase, ArrowRight, Tag, Wifi } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/lang-context";
import { BookmarkButton } from "@/components/bookmark-button";

const FLAG_CDN = "https://hatscripts.github.io/circle-flags/flags";

const COUNTRY_FLAG_CODES: Record<string, string> = {
  IT: "it", DE: "de", FR: "fr", ES: "es", PT: "pt",
  NL: "nl", BE: "be", AT: "at", CH: "ch", GB: "gb",
  PL: "pl", RO: "ro", CZ: "cz", SK: "sk", HU: "hu",
  SE: "se", NO: "no", DK: "dk", FI: "fi", GR: "gr",
  HR: "hr", RS: "rs", BG: "bg", UA: "ua", TR: "tr",
  AL: "al", GE: "ge", IE: "ie", LU: "lu", EU: "",
};

export interface ExternalJob {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  category: string;
  contractType: string;
  url: string;
  logo?: string;
  source: string;
  sourceName: string;
  remote: boolean;
  tags: string[];
  postedAt: string;
  description?: string;
}

function CircleFlag({ country, size = 16 }: { country: string; size?: number }) {
  const code = COUNTRY_FLAG_CODES[country];
  if (!code) return <span className="text-sm">🌍</span>;
  return (
    <img
      src={`${FLAG_CDN}/${code}.svg`}
      alt={country}
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function relativeDate(dateStr: string, lang: string): string {
  if (!dateStr) return lang === "it" ? "Oggi" : "Today";
  try {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
    if (days <= 0) return lang === "it" ? "Oggi" : lang === "de" ? "Heute" : lang === "fr" ? "Aujourd'hui" : lang === "es" ? "Hoy" : "Today";
    if (days === 1) return lang === "it" ? "Ieri" : lang === "de" ? "Gestern" : lang === "fr" ? "Hier" : lang === "es" ? "Ayer" : "Yesterday";
    if (days < 7) return lang === "it" ? `${days} giorni fa` : lang === "de" ? `vor ${days} Tagen` : lang === "fr" ? `il y a ${days} jours` : `${days} days ago`;
    return new Date(dateStr).toLocaleDateString(lang || "it", { day: "numeric", month: "short" });
  } catch {
    return lang === "it" ? "Oggi" : "Today";
  }
}

export function ExternalJobCard({ job }: { job: ExternalJob }) {
  const [isMounted, setIsMounted] = useState(false);
  const { lang, tr } = useLang();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!job) return null;

  const title = job.title || "Offerta di lavoro";
  const company = job.company || job.sourceName || "Azienda Verificata";
  const location = job.location || "Europa";
  const country = job.country || "IT";
  const detailPath = `/jobs/ext/${encodeURIComponent(job.id || "1")}`;
  const snippet = job.description
    ? job.description.replace(/<[^>]+>/g, "").slice(0, 120).trim() + "…"
    : null;

  if (!isMounted) {
    return (
      <Card className="flex flex-col h-full border-border bg-background relative overflow-hidden rounded-2xl p-5 shadow-sm">
        <div className="h-5 bg-muted/60 rounded w-3/4 mb-3 animate-pulse" />
        <div className="h-4 bg-muted/40 rounded w-1/2 mb-4 animate-pulse" />
        <div className="h-8 bg-muted/30 rounded w-full mt-auto animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full border-border hover:border-blue-400 bg-background relative overflow-hidden rounded-2xl">
      <div className="absolute top-0 right-0 flex items-center gap-1.5 z-10 p-2">
        <BookmarkButton job={job} />
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
          {job.sourceName || "External"}
        </span>
      </div>

      <CardContent className="p-5 flex-1">
        <div className="flex items-start gap-3 mb-3">
          {job.logo ? (
            <img
              src={job.logo}
              alt={company}
              className="w-10 h-10 rounded-lg object-contain border bg-white p-1 shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
              {company?.[0]?.toUpperCase() ?? "J"}
            </div>
          )}
          <div className="min-w-0 flex-1 pr-10">
            <Link href={detailPath}>
              <h3 className="font-bold text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                {title}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium text-foreground truncate">{company}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{location}</span>
            <CircleFlag country={country} size={16} />
          </div>
          {job.contractType && (
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>{job.contractType}</span>
            </div>
          )}
        </div>

        {snippet && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3 bg-muted/30 p-2 rounded-lg border border-border/40">
            {snippet}
          </p>
        )}

        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {job.tags.slice(0, 3).map((t, idx) => (
              <Badge key={idx} variant="secondary" className="text-[10px] px-2 py-0">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pb-4 pt-3 border-t border-border/40 bg-muted/20 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{relativeDate(job.postedAt, lang)}</span>
        <Link
          href={detailPath}
          className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all"
        >
          {tr("applyNow")} <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
