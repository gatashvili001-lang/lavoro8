import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { JobCard } from "@/components/job-card";
import { ExternalJobCard, ExternalJob } from "@/components/external-job-card";
import { Button } from "@/components/ui/button";
import { useListJobs } from "@workspace/api-client-react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { COUNTRY_SLUGS, CATEGORY_SLUGS, CITY_LANDING_PAGES, MAJOR_COUNTRY_SLUGS, comboSlug, CATEGORY_SLUG_LABEL_KEYS } from "@/lib/seo-slugs";
import NotFound from "@/pages/not-found";
import { useSeo } from "@/lib/use-seo";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const FLAG_CDN = "https://hatscripts.github.io/circle-flags/flags";

function useExternalJobs(params: { country?: string; category?: string }) {
  const qs = new URLSearchParams();
  if (params.country) qs.set("country", params.country);
  if (params.category) qs.set("category", params.category);

  return useQuery<{ data: ExternalJob[]; total: number }>({
    queryKey: ["external-jobs-landing", params],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/external-jobs?${qs.toString()}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
}

export function JobsLandingContent({
  countryCode,
  countryLabel,
  countryFlag,
  city,
  category,
  path,
}: {
  countryCode: string;
  countryLabel: string;
  countryFlag: string;
  city?: string;
  category?: string;
  path?: string;
}) {
  const { tr } = useLang();

  const { data: localJobsRaw, isLoading: localLoading } = useListJobs({
    country: countryCode,
    city: city || undefined,
    category: category || undefined,
  });

  const { data: extData, isLoading: extLoading } = useExternalJobs({
    country: countryCode,
    category: category || undefined,
  });

  const localJobs = localJobsRaw ?? [];
  const externalJobs = (extData?.data ?? []).filter(
    (j) => !city || (j.location || (j as any).city)?.toLowerCase().includes(city.toLowerCase())
  );
  const isLoading = localLoading || extLoading;
  const total = localJobs.length + externalJobs.length;

  const heading = [category, tr("seoJobsIn"), city ? `${city}, ${countryLabel}` : countryLabel]
    .filter(Boolean)
    .join(" ");

  const seoDescription = `${total} ${tr("jobsFound").toLowerCase()}: ${heading}. ${tr("footerTagline")}`;
  useSeo({
    title: heading,
    description: seoDescription,
    path,
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-blue-50/30 to-background">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/jobs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {tr("allJobs")}
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <img
            src={`${FLAG_CDN}/${countryFlag}.svg`}
            alt={countryLabel}
            width={36}
            height={36}
            className="rounded-full object-cover shrink-0"
          />
          <h1 className="text-2xl md:text-3xl font-bold font-display">{heading}</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          {isLoading ? tr("loadingJobs") : `${total} ${tr("jobsFound").toLowerCase()}`}
        </p>


        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-52 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : total === 0 ? (
          <div className="bg-background rounded-xl p-16 text-center border border-dashed border-muted-foreground/30 mt-4">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-foreground mb-2">{tr("noJobsFound")}</h3>
            <p className="text-muted-foreground mb-6">{tr("noJobsDesc")}</p>
            <Link href="/jobs"><Button>{tr("viewAllJobs")}</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {localJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {externalJobs.map((job) => (
              <ExternalJobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-sm font-bold text-foreground mb-2">{tr("jobsByCountryTitle")}</h2>
          <nav className="flex flex-wrap gap-2" aria-label={tr("jobsByCountryTitle")}>
            {Object.entries(COUNTRY_SLUGS).map(([slug, c]) => (
              <Link
                key={slug}
                href={`/jobs/${slug}`}
                className="flex items-center gap-1.5 text-xs bg-muted/60 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
              >
                <MapPin className="w-3 h-3" /> {tr(c.labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-bold text-foreground mb-2">{tr("jobsByCategoryCountryTitle")}</h2>
          <div className="space-y-3">
            {Object.entries(CATEGORY_SLUGS).map(([categorySlugKey, categoryLabel]) => (
              <div key={categorySlugKey}>
                <h3 className="text-xs font-semibold text-muted-foreground mb-1.5">{tr(CATEGORY_SLUG_LABEL_KEYS[categorySlugKey] ?? categoryLabel)}</h3>
                <nav className="flex flex-wrap gap-2" aria-label={tr(CATEGORY_SLUG_LABEL_KEYS[categorySlugKey] ?? categoryLabel)}>
                  {MAJOR_COUNTRY_SLUGS.map((countrySlug) => (
                    <Link
                      key={countrySlug}
                      href={`/jobs/${comboSlug(categorySlugKey, countrySlug)}`}
                      className="text-xs bg-muted/60 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
                    >
                      {tr(CATEGORY_SLUG_LABEL_KEYS[categorySlugKey] ?? categoryLabel)} {tr(COUNTRY_SLUGS[countrySlug].labelKey)}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-bold text-foreground mb-2">{tr("jobsByCityTitle")}</h2>
          <nav className="flex flex-wrap gap-2" aria-label={tr("jobsByCityTitle")}>
            {CITY_LANDING_PAGES.map((cityPage) => (
              <Link
                key={`${cityPage.countrySlug}-${cityPage.citySlug}`}
                href={`/jobs/${cityPage.countrySlug}/${cityPage.citySlug}`}
                className="flex items-center gap-1.5 text-xs bg-muted/60 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
              >
                <MapPin className="w-3 h-3" /> {tr(cityPage.cityLabelKey)}
              </Link>
            ))}
          </nav>
        </div>

      </main>
    </div>
  );
}

export default function JobsCountryCityLandingPage() {
  const { country, city } = useParams<{ country: string; city: string }>();
  const c = COUNTRY_SLUGS[country?.toLowerCase() ?? ""];
  if (!c) return <NotFound />;

  const cityName = decodeURIComponent(city)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

  return (
    <JobsLandingContent
      countryCode={c.code}
      countryLabel={c.label}
      countryFlag={c.flag}
      city={cityName}
      path={`/jobs/${country}/${city}`}
    />
  );
}
