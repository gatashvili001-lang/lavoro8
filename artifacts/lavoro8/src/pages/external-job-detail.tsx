import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Briefcase, ExternalLink, ArrowLeft, Clock, Globe, Tag } from "lucide-react";
import { ExternalJob } from "@/components/external-job-card";
import { useSeo } from "@/lib/use-seo";
import { useLang } from "@/lib/lang-context";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const SITE_URL = "https://lavoro8.com";

const COUNTRY_FLAGS: Record<string, string> = {
  IT: "🇮🇹", DE: "🇩🇪", FR: "🇫🇷", ES: "🇪🇸", PT: "🇵🇹",
  NL: "🇳🇱", BE: "🇧🇪", AT: "🇦🇹", CH: "🇨🇭", GB: "🇬🇧",
  PL: "🇵🇱", RO: "🇷🇴", CZ: "🇨🇿", SK: "🇸🇰", HU: "🇭🇺",
  SE: "🇸🇪", NO: "🇳🇴", DK: "🇩🇰", FI: "🇫🇮", GR: "🇬🇷",
  HR: "🇭🇷", RS: "🇷🇸", BG: "🇧🇬", UA: "🇺🇦", TR: "🇹🇷",
  AL: "🇦🇱", GE: "🇬🇪", IE: "🇮🇪", LU: "🇱🇺", EU: "🌍",
};

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function ExternalJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { tr } = useLang();
  const [job, setJob] = useState<ExternalJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/external-jobs/${encodeURIComponent(id)}`)
      .then(r => {
        if (!r.ok) throw new Error(tr("extJobNotFound"));
        return r.json();
      })
      .then(d => { setJob(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [id]);

  const flag = job?.country ? (COUNTRY_FLAGS[job.country] ?? "🌍") : "🌍";
  const daysAgo = job ? Math.floor((Date.now() - new Date(job.postedAt).getTime()) / 86400000) : 0;
  const descriptionText = job?.description ? htmlToText(job.description) : null;

  useSeo({
    title: job ? `${job.title} — ${job.location}` : tr("extJobAdNotFound"),
    description: job
      ? `${job.title} ${tr("extJobAt")} ${job.company} ${tr("extJobIn")} ${job.location}. ${(descriptionText ?? "").slice(0, 140)}`
      : tr("extJobUnavailable"),
    path: job ? `/jobs/ext/${job.id}` : undefined,
    noindex: !job,
    type: "article",
  });

  useEffect(() => {
    if (!job) return;

    const url = `${SITE_URL}/jobs/ext/${job.id}`;

    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: descriptionText || job.title,
      datePosted: job.postedAt,
      employmentType: job.contractType || undefined,
      hiringOrganization: job.company ? {
        "@type": "Organization",
        name: job.company,
        logo: job.logo || undefined,
      } : undefined,
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
          addressCountry: job.country || undefined,
        },
      },
      url,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    script.dataset.jobSchema = "true";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [job, descriptionText]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-blue-50/30 to-background">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={() => setLocation("/jobs")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {tr("backToOffers")}
        </button>

        {loading && (
          <div className="space-y-4">
            <div className="h-48 bg-muted animate-pulse rounded-2xl" />
            <div className="h-64 bg-muted animate-pulse rounded-2xl" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-semibold mb-4">{error}</p>
            <Button variant="outline" onClick={() => setLocation("/jobs")}>
              {tr("backToOffers")}
            </Button>
          </div>
        )}

        {job && (
          <div className="space-y-6">
            {/* Header card */}
            <div className="bg-background rounded-2xl border shadow-sm p-6 md:p-8">
              <div className="flex items-start gap-5 mb-6">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-20 h-20 rounded-xl object-contain border bg-white p-2 shrink-0 shadow-sm"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shrink-0">
                    {job.company?.[0] ?? "J"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200 text-xs">
                      🌍 {job.sourceName}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                      {job.category}
                    </Badge>
                    {job.remote && (
                      <Badge className="bg-teal-100 text-teal-700 border border-teal-200 text-xs">
                        {tr("remoteLabel")}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold font-display mb-1">{job.title}</h1>
                  <div className="text-lg font-semibold text-muted-foreground">{job.company}</div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <MapPin className="w-3.5 h-3.5" /> {tr("locationLabel")}
                  </div>
                  <div className="font-semibold text-sm">{job.location}</div>
                </div>
                <div className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Globe className="w-3.5 h-3.5" /> {tr("countryLabel")}
                  </div>
                  <div className="font-semibold text-sm">{flag} {job.country}</div>
                </div>
                <div className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Briefcase className="w-3.5 h-3.5" /> {tr("contractLabel")}
                  </div>
                  <div className="font-semibold text-sm">{job.contractType}</div>
                </div>
                <div className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3.5 h-3.5" /> {tr("publishedLabel")}
                  </div>
                  <div className="font-semibold text-sm">
                    {daysAgo === 0 ? tr("timeToday") : daysAgo === 1 ? tr("timeYesterday") : `${daysAgo} ${tr("timeDaysAgo")}`}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {job.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-3 py-1 border border-blue-100 font-medium">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Apply CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={job.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full h-12 text-base gap-2" size="lg">
                    {tr("applyNow")} <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground self-center text-center sm:text-left max-w-xs">
                  {tr("applicationCompletedOn")} (<strong>{job.sourceName}</strong>)
                </p>
              </div>
            </div>

            {/* Description */}
            {descriptionText && (
              <div className="bg-background rounded-2xl border shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold font-display mb-4">{tr("jobDescriptionLabel")}</h2>
                <div className="prose prose-sm max-w-none text-foreground">
                  {descriptionText.split("\n").map((line, i) => (
                    <p key={i} className="mb-2 text-muted-foreground leading-relaxed">
                      {line || <br />}
                    </p>
                  ))}
                </div>
              </div>
            )}


            {/* Bottom CTA */}
            <div className="bg-blue-600 text-white rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{tr("interestedInOffer")}</h3>
              <p className="text-blue-100 mb-4 text-sm">
                {tr("applicationCompletedOnPortal")} {job.sourceName}. {tr("freeAndFast")}
              </p>
              <a href={job.source} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="gap-2 bg-white text-blue-700 hover:bg-blue-50">
                  {tr("goToApplication")} <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
