import React, { useState } from "react";
import { getEnrichedDescription } from "@/lib/enrich-description";
import { Globe, CheckCircle2, Sparkles } from "lucide-react";

interface JobDescriptionWidgetProps {
  title: string;
  company?: string | null;
  city?: string | null;
  category?: string | null;
  description?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  contractType?: string | null;
  defaultLang?: string;
}

const LANG_OPTIONS = [
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export function JobDescriptionWidget({
  title,
  company,
  city,
  category,
  description,
  salaryMin,
  salaryMax,
  contractType,
  defaultLang = "it",
}: JobDescriptionWidgetProps) {
  const [activeLang, setActiveLang] = useState<string>(defaultLang || "it");

  const htmlContent = getEnrichedDescription(
    title,
    company,
    city,
    category,
    description,
    salaryMin,
    salaryMax,
    contractType,
    activeLang
  );

  return (
    <div className="bg-background rounded-2xl border shadow-sm p-6 md:p-8">
      {/* Header & Language selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-4">
        <h3 className="font-display text-xl font-bold flex items-center gap-2 text-foreground">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Descrizione dell'offerta
        </h3>

        {/* Translation Widget Chips */}
        <div className="flex flex-wrap items-center gap-1.5 bg-muted/40 p-1.5 rounded-xl border">
          <span className="text-xs font-semibold text-muted-foreground px-2 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-primary" />
            Traduzione:
          </span>
          {LANG_OPTIONS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setActiveLang(l.code)}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg transition-all ${
                activeLang === l.code
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      </div>

      {activeLang !== "it" && (
        <div className="mb-4 text-xs bg-blue-50 border border-blue-200 text-blue-800 px-3.5 py-2 rounded-xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Traduzione automatica istantanea in <strong>{LANG_OPTIONS.find(l => l.code === activeLang)?.name}</strong>. Il CV finale verrà generato in Italiano.
          </span>
        </div>
      )}

      {/* Description Content */}
      <div
        className="text-muted-foreground leading-relaxed text-[15px] prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
