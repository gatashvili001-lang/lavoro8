import { NavBar } from "@/components/layout/navbar";
import { useListJobs, useCreateJobAlert } from "@workspace/api-client-react";
import { JobCard } from "@/components/job-card";
import { ExternalJobCard, ExternalJob } from "@/components/external-job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, RefreshCw, ExternalLink, SlidersHorizontal, X, ChevronDown, Send } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "@/lib/lang-context";
import { Link, useSearch } from "wouter";
import { COUNTRY_SLUGS, CATEGORY_SLUGS, CATEGORY_SLUG_LABEL_KEYS } from "@/lib/seo-slugs";
import { CITIES_BY_COUNTRY } from "@/lib/cities";
import { useSeo } from "@/lib/use-seo";
import { INITIAL_REAL_JOBS } from "@/lib/initial-jobs";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const FLAG_CDN = "https://hatscripts.github.io/circle-flags/flags";

const CATEGORIES = ["Tutte", "Magazzino", "Logistica", "Rider", "Ristorante", "Hotel", "Badante", "Colf", "Baby-sitter", "Edilizia", "Agricoltura", "Altro"];

const CATEGORY_KEYS: Record<string, string> = {
  Tutte: "all", Magazzino: "catMagazzino", Logistica: "catLogistica", Rider: "catRider",
  Ristorante: "catRistorante", Hotel: "catHotel", Badante: "catBadante", Colf: "catColf",
  "Baby-sitter": "catBabysitter", Edilizia: "catEdilizia", Agricoltura: "catAgricoltura", Altro: "catAltro",
};

const COUNTRIES = [
  { code: "ALL", flagCode: null,  label: "Tutti i paesi", labelKey: "countryAllLabel" },
  { code: "IT",  flagCode: "it",  label: "Italia", labelKey: "countryItalia" },
  { code: "DE",  flagCode: "de",  label: "Germania", labelKey: "countryGermania" },
  { code: "FR",  flagCode: "fr",  label: "Francia", labelKey: "countryFrancia" },
  { code: "ES",  flagCode: "es",  label: "Spagna", labelKey: "countrySpagna" },
  { code: "PT",  flagCode: "pt",  label: "Portogallo", labelKey: "countryPortogallo" },
  { code: "NL",  flagCode: "nl",  label: "Paesi Bassi", labelKey: "countryPaesiBassi" },
  { code: "BE",  flagCode: "be",  label: "Belgio", labelKey: "countryBelgio" },
  { code: "AT",  flagCode: "at",  label: "Austria", labelKey: "countryAustria" },
  { code: "CH",  flagCode: "ch",  label: "Svizzera", labelKey: "countrySvizzera" },
  { code: "GB",  flagCode: "gb",  label: "Regno Unito", labelKey: "countryRegnoUnito" },
  { code: "PL",  flagCode: "pl",  label: "Polonia", labelKey: "countryPolonia" },
  { code: "RO",  flagCode: "ro",  label: "Romania", labelKey: "countryRomania" },
  { code: "CZ",  flagCode: "cz",  label: "Rep. Ceca", labelKey: "countryRepubblicaCeca" },
  { code: "SK",  flagCode: "sk",  label: "Slovacchia", labelKey: "countrySlovacchia" },
  { code: "HU",  flagCode: "hu",  label: "Ungheria", labelKey: "countryUngheria" },
  { code: "GR",  flagCode: "gr",  label: "Grecia", labelKey: "countryGrecia" },
  { code: "HR",  flagCode: "hr",  label: "Croazia", labelKey: "countryCroazia" },
  { code: "BG",  flagCode: "bg",  label: "Bulgaria", labelKey: "countryBulgaria" },
  { code: "RS",  flagCode: "rs",  label: "Serbia", labelKey: "countrySerbia" },
  { code: "UA",  flagCode: "ua",  label: "Ucraina", labelKey: "countryUcraina" },
  { code: "GE",  flagCode: "ge",  label: "Georgia", labelKey: "countryGeorgia" },
  { code: "TR",  flagCode: "tr",  label: "Turchia", labelKey: "countryTurchia" },
  { code: "AL",  flagCode: "al",  label: "Albania", labelKey: "countryAlbania" },
  { code: "US",  flagCode: "us",  label: "Stati Uniti", labelKey: "countryStatiUniti" },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Più recenti", labelKey: "sortRecent" },
  { value: "salary_desc", label: "Stipendio ↓", labelKey: "sortSalaryDesc" },
  { value: "salary_asc", label: "Stipendio ↑", labelKey: "sortSalaryAsc" },
];

function CountryFlag({ code, size = 18 }: { code: string | null; size?: number }) {
  const [err, setErr] = useState(false);
  if (!code || err) return <span className="text-base leading-none">🌍</span>;
  return (
    <img
      src={`${FLAG_CDN}/${code}.svg`}
      alt={code}
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
      onError={() => setErr(true)}
    />
  );
}

function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function useExternalJobs(params: { search?: string; country?: string; category?: string }) {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.country && params.country !== "ALL") qs.set("country", params.country);
  if (params.category && params.category !== "Tutte") qs.set("category", params.category);

  return useQuery<{ data: ExternalJob[]; total: number }>({
    queryKey: ["external-jobs", params],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/external-jobs?${qs.toString()}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
}

export default function JobsPage() {
  const { tr } = useLang();
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [cityInput, setCityInput] = useState(searchParams.get("city") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "Tutte");
  const [country, setCountry] = useState(searchParams.get("country") || "ALL");

  const searchString = useSearch();
  const selfWrittenQs = useRef<string | null>(null);
  useEffect(() => {
    if (searchString.replace(/^\?/, "") === selfWrittenQs.current) return;
    const p = new URLSearchParams(searchString);
    setCategory(p.get("category") || "Tutte");
    setCountry(p.get("country") || "ALL");
    setSearchInput(p.get("search") || "");
    setCityInput(p.get("city") || "");
  }, [searchString]);
  const [showExternal, setShowExternal] = useState(true);
  const [sort, setSort] = useState("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertSent, setAlertSent] = useState(false);
  const createJobAlert = useCreateJobAlert();

  const search = useDebounce(searchInput, 400);
  const city = useDebounce(cityInput, 400);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJobAlert.mutate(
      { data: { email: alertEmail, category: category !== "Tutte" ? category : undefined, country: country !== "ALL" ? country : undefined } },
      { onSuccess: () => setAlertSent(true) }
    );
  };

  useSeo({
    title: tr("jobsPageTitle"),
    description: tr("jobsPageDescription"),
    path: "/jobs",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (category && category !== "Tutte") params.set("category", category);
    if (country && country !== "ALL") params.set("country", country);
    selfWrittenQs.current = params.toString();
    window.history.replaceState(null, "", `/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  }, [search, city, category, country]);

  const { data: localJobsRaw, isLoading: localLoading } = useListJobs({
    search: search || undefined,
    city: city || undefined,
    category: category !== "Tutte" ? category : undefined,
    country: country !== "ALL" ? country : undefined,
  });

  const { data: extData, isLoading: extLoading, refetch: refetchExt } = useExternalJobs({
    search: search || undefined,
    country: country !== "ALL" ? country : undefined,
    category: category !== "Tutte" ? category : undefined,
  });

  const baseLocalList = (localJobsRaw && localJobsRaw.length > 0) ? localJobsRaw : INITIAL_REAL_JOBS;
  const filteredLocalJobs = baseLocalList.filter(j => {
    if (category && category !== "Tutte" && j.category !== category) return false;
    if (country && country !== "ALL" && j.country !== country) return false;
    if (city && !j.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const localJobs = [...filteredLocalJobs].sort((a, b) => {
    if (sort === "salary_desc") return (b.salaryMax ?? 0) - (a.salaryMax ?? 0);
    if (sort === "salary_asc") {
      const aMin = a.salaryMin ?? 0;
      const bMin = b.salaryMin ?? 0;
      if (aMin === 0 && bMin === 0) return 0;
      if (aMin === 0) return 1;
      if (bMin === 0) return -1;
      return aMin - bMin;
    }
    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
  });

  const externalJobs = extData?.data ?? [];
  const isLoading = localLoading || extLoading;
  const totalLocal = localJobs.length;
  const totalExternal = showExternal ? externalJobs.length : 0;
  const totalAll = totalLocal + totalExternal;

  const reset = useCallback(() => {
    setSearchInput("");
    setCityInput("");
    setCategory("Tutte");
    setCountry("ALL");
    setSort("recent");
  }, []);

  const hasActiveFilters = searchInput || cityInput || category !== "Tutte" || country !== "ALL";
  const sortLabelKey = SORT_OPTIONS.find(o => o.value === sort)?.labelKey ?? "";

  const FilterPanel = () => (
    <div className="bg-background rounded-xl p-5 border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg">{tr("filterJobs")}</h2>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 font-medium"
          >
            <X className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">{tr("search")}</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={tr("jobSearchPlaceholder")}
              className="pl-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">{tr("city")}</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={tr("citySearchPlaceholder")}
              className="pl-9"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            {cityInput && (
              <button
                onClick={() => setCityInput("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {country !== "ALL" && (CITIES_BY_COUNTRY[country]?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 pt-1">
              {CITIES_BY_COUNTRY[country].map(c => (
                <button
                  key={c}
                  onClick={() => setCityInput(cityInput === c ? "" : c)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    cityInput === c
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">{tr("country")}</label>
          <div className="flex flex-col gap-0.5 max-h-52 overflow-y-auto pr-1 rounded-lg">
            {COUNTRIES.map(c => (
              <button
                key={c.code}
                onClick={() => { setCountry(c.code); setCityInput(""); }}
                className={`text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                  country === c.code
                    ? "bg-blue-600 text-white"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <CountryFlag code={c.flagCode} size={18} />
                <span className="truncate">{tr(c.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">{tr("category")}</label>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tr(CATEGORY_KEYS[cat] ?? cat)}
              </button>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={reset}>
          {tr("resetFilters")}
        </Button>
      </div>
    </div>
  );

  const CrawlableJobsHub = () => (
    <div className="bg-background rounded-xl p-5 border shadow-sm mb-6">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground mb-2">{tr("jobsByCountryTitle")}</h2>
        <nav className="flex flex-wrap gap-2" aria-label={tr("jobsByCountryTitle")}>
          {Object.entries(COUNTRY_SLUGS).map(([slug, c]) => (
            <Link
              key={slug}
              href={`/jobs/${slug}`}
              className="text-xs bg-muted/60 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
            >
              {tr(c.labelKey)}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <h2 className="text-sm font-bold text-foreground mb-2">{tr("jobsByCategoryTitle")}</h2>
        <nav className="flex flex-wrap gap-2" aria-label={tr("jobsByCategoryTitle")}>
          {Object.entries(CATEGORY_SLUGS)
            .filter(([slug, label], i, arr) => arr.findIndex(([, l]) => l === label) === i)
            .map(([slug, label]) => (
              <Link
                key={slug}
                href={`/jobs?category=${encodeURIComponent(label)}`}
                className="text-xs bg-muted/60 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
              >
                {tr(CATEGORY_SLUG_LABEL_KEYS[slug] ?? label)}
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-blue-50/30 to-background">
      <NavBar />

      <div className="bg-blue-600 text-white text-xs text-center py-2 px-4">
        <span className="font-semibold">🌍 {tr("aggregatorTagline")} </span>
        {tr("aggregatorSubtagline")}
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters — desktop */}
        <aside className="hidden md:block w-64 shrink-0 space-y-4">
          {FilterPanel()}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-800">{tr("externalOffers")}</span>
              <button
                onClick={() => setShowExternal(v => !v)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showExternal ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${showExternal ? "translate-x-4.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <p className="text-xs text-blue-700">
              {showExternal
                ? `${externalJobs.length} ${tr("offersFromPartners")}`
                : tr("localOnlyListings")}
            </p>
            {showExternal && (
              <button onClick={() => refetchExt()} className="mt-2 text-xs text-blue-600 flex items-center gap-1 hover:text-blue-800">
                <RefreshCw className="w-3 h-3" /> {tr("refresh")}
              </button>
            )}
          </div>

        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <CrawlableJobsHub />

          {/* Header bar */}
          <div className="mb-5 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold font-display">
                {isLoading
                  ? <span className="text-muted-foreground">{tr("loadingJobs")}</span>
                  : <span>{totalAll} <span className="text-muted-foreground font-normal text-lg">{tr("jobsFound").toLowerCase()}</span></span>
                }
              </h1>
              {!isLoading && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="text-green-700 font-medium">{totalLocal}</span> {tr("localCountSuffix")}
                  {showExternal && <> · <span className="text-blue-600 font-medium">{totalExternal}</span> {tr("partnerCountSuffix")}</>}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg bg-background hover:bg-muted transition-colors"
                >
                  <span className="hidden sm:inline">{tr(sortLabelKey)}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-background border rounded-xl shadow-lg z-20 min-w-40 overflow-hidden">
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => { setSort(o.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === o.value ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
                      >
                        {tr(o.labelKey)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(v => !v)}
                className={`md:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${hasActiveFilters ? "bg-blue-600 text-white border-blue-600" : "bg-background hover:bg-muted"}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {tr("filterJobs")}
                {hasActiveFilters && <span className="text-xs bg-white/20 rounded-full px-1.5">•</span>}
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                <ExternalLink className="w-3.5 h-3.5" />
                {tr("externalToOriginal")}
              </div>
            </div>
          </div>

          {/* Mobile filter panel */}
          {mobileFiltersOpen && (
            <div className="md:hidden mb-4 space-y-3">
              {FilterPanel()}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-800">Offerte esterne ({externalJobs.length})</span>
                  <button
                    onClick={() => setShowExternal(v => !v)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showExternal ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${showExternal ? "translate-x-4.5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-52 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {localJobs.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">✓ {tr("verifiedListings")}</span>
                    <span className="text-xs text-muted-foreground">{localJobs.length} {tr("onLavoro8")}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {localJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </>
              )}

              {showExternal && externalJobs.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-3 mt-4">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">🌍 {tr("offersFromPartners2")}</span>
                    <span className="text-xs text-muted-foreground">{externalJobs.length} {tr("jobsFound").toLowerCase()}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {externalJobs.map(job => (
                      <ExternalJobCard key={job.id} job={job} />
                    ))}
                  </div>
                </>
              )}

              {totalAll === 0 && (
                <div className="bg-background rounded-xl p-16 text-center border border-dashed border-muted-foreground/30">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tr("noJobsFound")}</h3>
                  <p className="text-muted-foreground mb-6">{tr("noJobsDesc")}</p>
                  <Button onClick={reset}>{tr("viewAllJobs")}</Button>
                </div>
              )}
            </>
          )}

          {/* Job alert signup */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 text-white p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
              <Send className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-display mb-2">{tr("alertTitle")}</h2>
            <p className="text-white/75 mb-6 max-w-md mx-auto">{tr("alertDesc")}</p>
            {alertSent ? (
              <div className="bg-white/10 rounded-xl px-6 py-4 font-semibold max-w-md mx-auto">
                ✓ {tr("noSpam")}
              </div>
            ) : (
              <form onSubmit={handleAlertSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  placeholder={tr("alertEmailPlaceholder")}
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="h-12 bg-white text-foreground border-none"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="h-12 px-6 font-semibold bg-amber-400 hover:bg-amber-500 text-amber-900 border-0 shrink-0"
                  disabled={createJobAlert.isPending}
                >
                  {createJobAlert.isPending ? "..." : tr("activateAlert")}
                </Button>
              </form>
            )}
            {!alertSent && <p className="text-xs text-white/50 mt-4">{tr("noSpam")}</p>}
          </div>

        </div>
      </main>
    </div>
  );
}
