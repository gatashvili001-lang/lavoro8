import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { useCreateReview, useCreateJobAlert } from "@workspace/api-client-react";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase, Star, CheckCircle, UserCheck, Building2, Zap, ArrowRight, Mail, ShieldCheck, Lock, Send, Euro } from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { JobAlertWidget } from "@/components/job-alert-widget";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/lib/lang-context";
import { useOnlineCount } from "@/lib/online";
import { useLiveJobs } from "@/lib/dynamic-jobs";
import { COUNTRY_SLUGS, CATEGORY_SLUGS, MAJOR_COUNTRY_SLUGS, comboSlug, CATEGORY_SLUG_LABEL_KEYS } from "@/lib/seo-slugs";
import heroBackground from "@/assets/hero-handshake-dark.jpg";

const CATEGORIES = [
  { name: "Magazzino", key: "catMagazzino", icon: "📦", light: "bg-amber-50 hover:bg-amber-100 border-amber-200" },
  { name: "Logistica", key: "catLogistica", icon: "🚛", light: "bg-blue-50 hover:bg-blue-100 border-blue-200" },
  { name: "Rider", key: "catRider", icon: "🛵", light: "bg-orange-50 hover:bg-orange-100 border-orange-200" },
  { name: "Ristorante", key: "catRistorante", icon: "🍽️", light: "bg-red-50 hover:bg-red-100 border-red-200" },
  { name: "Hotel", key: "catHotel", icon: "🏨", light: "bg-purple-50 hover:bg-purple-100 border-purple-200" },
  { name: "Badante", key: "catBadante", icon: "👵", light: "bg-rose-50 hover:bg-rose-100 border-rose-200" },
  { name: "Colf", key: "catColf", icon: "🧹", light: "bg-teal-50 hover:bg-teal-100 border-teal-200" },
  { name: "Baby-sitter", key: "catBabysitter", icon: "👶", light: "bg-pink-50 hover:bg-pink-100 border-pink-200" },
  { name: "Edilizia", key: "catEdilizia", icon: "🏗️", light: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200" },
  { name: "Agricoltura", key: "catAgricoltura", icon: "🌾", light: "bg-green-50 hover:bg-green-100 border-green-200" },
  { name: "Altro", key: "catAltro", icon: "💼", light: "bg-gray-50 hover:bg-gray-100 border-gray-200" },
] as const;

export default function Home() {
  const { tr } = useLang();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [minSalary, setMinSalary] = useState("0");
  const [contractType, setContractType] = useState("ALL");
  const [, setLocation] = useLocation();

  const jobs = useLiveJobs();
  const onlineCount = useOnlineCount();
  const jobsLoading = false;
  const statsLoading = false;
  const reviews: { id: number; name: string; body: string; rating: number; createdAt: string }[] = [];
  const reviewsLoading = false;
  const stats = { totalJobs: jobs.length, active: jobs.length, totalApplications: 3, topCities: [{ city: "Milano" }] };
  const onlineData = { online: onlineCount };

  const queryClient = useQueryClient();
  const createReview = useCreateReview();
  const { toast } = useToast();

  const [revName, setRevName] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revBody, setRevBody] = useState("");

  const createJobAlert = useCreateJobAlert();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const HOW_IT_WORKS = [
    { step: "1", title: tr("step1Title"), desc: tr("step1Desc"), icon: UserCheck },
    { step: "2", title: tr("step2Title"), desc: tr("step2Desc"), icon: Search },
    { step: "3", title: tr("step3Title"), desc: tr("step3Desc"), icon: Zap },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (minSalary && minSalary !== "0") params.set("minSalary", minSalary);
    if (contractType && contractType !== "ALL") params.set("contractType", contractType);
    setLocation(`/jobs?${params.toString()}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    createJobAlert.mutate({ data: { email: newsletterEmail } }, {
      onSuccess: () => {
        setNewsletterSent(true);
        setNewsletterEmail("");
        toast({ description: tr("newsletterConfirmed") });
      },
      onError: () => toast({ variant: "destructive", description: tr("applicationError") }),
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden py-20 px-4"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(8, 12, 22, 0.5) 0%, rgba(8, 12, 22, 0.62) 60%, rgba(8, 12, 22, 0.72) 100%), url(${heroBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
          }}
        >

          {/* Ambient Glow Gradient */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/30 via-amber-500/20 to-emerald-500/30 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            {/* Live strict presence badge */}
            <div className="inline-flex items-center gap-2.5 bg-slate-950/60 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 mb-6 shadow-xl backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{onlineCount} {tr("onlineNow")}</span>
              <span className="text-white/30">•</span>
              <span>🌍 {jobs.length} {tr("heroJobsLive")}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight text-white drop-shadow-sm">
              {tr("heroTitle")}{" "}
              <span className="text-amber-400 underline decoration-amber-400/30 underline-offset-8">{tr("heroHighlight")}</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
              {tr("heroSubtitle")}
            </p>

            <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-xl p-3.5 rounded-3xl flex flex-col gap-2.5 shadow-2xl border border-white/40 ring-1 ring-black/5">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder={tr("searchPlaceholder")}
                    className="pl-10 border-none bg-transparent shadow-none text-base h-12 focus-visible:ring-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="w-px bg-border hidden md:block self-stretch my-2" />
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder={tr("cityPlaceholder")}
                    className="pl-10 border-none bg-transparent shadow-none text-base h-12 focus-visible:ring-0"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8 text-base shrink-0">
                  {tr("searchBtn")}
                </Button>
              </div>

              {/* Advanced Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 w-full sm:w-1/2">
                  <Euro className="w-4 h-4 text-emerald-600 shrink-0" />
                  <select
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="bg-transparent border-none outline-none w-full cursor-pointer text-slate-800 font-semibold text-xs"
                  >
                    <option value="0">Stipendio: Tutti</option>
                    <option value="1000">Min. €1.000 / mese</option>
                    <option value="1500">Min. €1.500 / mese</option>
                    <option value="2000">Min. €2.000 / mese</option>
                    <option value="2500">Min. €2.500 / mese</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 w-full sm:w-1/2">
                  <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                    className="bg-transparent border-none outline-none w-full cursor-pointer text-slate-800 font-semibold text-xs"
                  >
                    <option value="ALL">Contratto: Tutti</option>
                    <option value="Tempo indeterminato">Tempo Indeterminato</option>
                    <option value="Tempo determinato">Tempo Determinato</option>
                    <option value="Full-time">Full-Time</option>
                    <option value="Part-time">Part-Time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm text-white/70">
              <span>{tr("searchByCategory")}</span>
              {CATEGORIES.map(c => (
                <Link
                  key={c.name}
                  href={`/jobs?category=${encodeURIComponent(c.name)}`}
                  className="text-white font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  {c.icon} {tr(c.key)}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 mt-4 text-xs text-white/80">
              <span className="font-medium text-white/60">Filtra per paese:</span>
              {[
                { code: "IT", name: "Italia 🇮🇹" },
                { code: "DE", name: "Germania 🇩🇪" },
                { code: "FR", name: "Francia 🇫🇷" },
                { code: "ES", name: "Spagna 🇪🇸" },
                { code: "CH", name: "Svizzera 🇨🇭" },
                { code: "US", name: "Stati Uniti 🇺🇸" },
                { code: "NL", name: "Olanda 🇳🇱" },
                { code: "PL", name: "Polonia 🇵🇱" },
                { code: "EU", name: "Tutta Europa 🇪🇺" },
              ].map((c) => (
                <Link
                  key={c.code}
                  href={`/jobs?country=${c.code}`}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full border border-white/20 transition-all font-medium"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-border">
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold font-display text-primary tabular-nums">
                  {jobs.length}
                </p>
                <p className="text-sm font-medium text-muted-foreground mt-1">{tr("activeJobs")}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold font-display text-primary tabular-nums">
                  50+
                </p>
                <p className="text-sm font-medium text-muted-foreground mt-1">Aziende Partner</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold font-display text-primary">
                  {statsLoading ? <span className="inline-block w-16 h-8 bg-muted rounded animate-pulse" /> : (stats?.topCities?.[0]?.city || "Milano")}
                </p>
                <p className="text-sm font-medium text-muted-foreground mt-1">{tr("topCity")}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold font-display text-emerald-600 tabular-nums flex items-center justify-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  {onlineCount}
                </p>
                <p className="text-sm font-medium text-muted-foreground mt-1">online ora</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted by companies */}
        <section className="py-10 px-4 border-b bg-background">
          <div className="container mx-auto max-w-4xl">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              {tr("trustedByLabel")}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: "Magazzino", key: "catMagazzino" as const, emoji: "📦" },
                { name: "Logistica", key: "catLogistica" as const, emoji: "🚛" },
                { name: "Ristorante", key: "catRistorante" as const, emoji: "🍽️" },
                { name: "Hotel", key: "catHotel" as const, emoji: "🏨" },
                { name: "Badante", key: "catBadante" as const, emoji: "🤝" },
                { name: "Edilizia", key: "catEdilizia" as const, emoji: "🏗️" },
              ].map(c => (
                <Link
                  key={c.name}
                  href={`/jobs?category=${encodeURIComponent(c.name)}`}
                  className="flex items-center gap-2 font-bold text-muted-foreground text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all"
                >
                  <span className="text-xl">{c.emoji}</span>
                  <span>{tr(c.key)}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-green-600" /> {tr("gdprCompliant")}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Lock className="w-4 h-4 text-green-600" /> {tr("secureConnection")}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <CheckCircle className="w-4 h-4 text-green-600" /> {tr("verifiedListings")}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Building2 className="w-4 h-4 text-green-600" /> {tr("activeInCountries")}
              </div>
            </div>
          </div>
        </section>


        {/* Come Funziona → Live Jobs Preview */}
        <section className="py-20 px-4 bg-background" id="come-funziona">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-display mb-3">{tr("howItWorksTitle")}</h2>
              <p className="text-muted-foreground text-base">{tr("liveJobsSubtitle")}</p>
            </div>

            {/* Steps row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {[
                { n: "1", icon: UserCheck, label: tr("step1Title") },
                { n: "2", icon: Search, label: tr("step2Title") },
                { n: "3", icon: Zap, label: tr("step3Title") },
              ].map((s, i, arr) => (
                <div key={s.n} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {s.n}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{s.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Live job cards */}
            {jobsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[1,2,3].map(i => <div key={i} className="h-44 bg-muted rounded-xl animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {(jobs || []).slice(0, 6).map(job => <JobCard key={job.id} job={job} />)}
              </div>
            )}

            <div className="text-center mt-8 flex gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/jobs">{tr("viewAll")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sign-up">{tr("startFree")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categorie */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold font-display mb-8 text-center">{tr("browseByCategory")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.name}
                  href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                  className={`border rounded-xl p-6 text-left transition-all group ${cat.light}`}
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <div className="font-bold text-base font-display group-hover:text-primary transition-colors">{tr(cat.key)}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">
                    {jobs?.filter(j => j.category === cat.name).length ?? 0} {tr("listings")}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ultimi Annunci */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  {tr("latestJobs")}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">{tr("updatedRealTime")}</p>
              </div>
              <Button variant="link" className="text-primary font-semibold" onClick={() => setLocation("/jobs")}>
                {tr("viewAll")} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {jobsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
            ) : jobs && jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.slice(0, 6).map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{tr("noJobsNow")}</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Datori di Lavoro */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="text-primary-foreground/60 text-sm font-semibold uppercase tracking-widest mb-2">{tr("forEmployers")}</div>
                <h2 className="text-3xl font-bold font-display mb-3">{tr("hiringTitle")}</h2>
                <p className="text-primary-foreground/80 text-lg max-w-lg">
                  {tr("hiringSubtitle")}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {[tr("freePosting"), tr("directApplications"), tr("noBureaucracy"), tr("cvReview2h")].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base font-semibold">
                  <Link href="/pubblica">
                    <Building2 className="w-5 h-5 mr-2" />
                    {tr("postListing")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Recensioni */}
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold font-display mb-8 text-center flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-primary fill-primary" />
              {tr("testimonialsTitle")}
            </h2>

            {reviewsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {reviews.slice(0, 6).map(review => (
                  <div key={review.id} className="bg-background border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-1 mb-3 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-primary" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">"{review.body}"</p>
                    <p className="font-semibold text-sm">— {review.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 mb-12 bg-muted/20 rounded-xl border border-dashed">
                <p className="text-muted-foreground text-lg">{tr("beFirstReview")}</p>
              </div>
            )}

            <div className="max-w-xl mx-auto bg-background border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6 font-display">{tr("leaveReview")}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createReview.mutate({ data: { name: revName, rating: revRating, body: revBody } }, {
                    onSuccess: () => {
                      toast({ description: tr("reviewSent") });
                      setRevName(""); setRevRating(5); setRevBody("");
                    },
                    onError: () => toast({ variant: "destructive", description: tr("reviewError") }),
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">{tr("reviewName")}</label>
                  <Input required value={revName} onChange={e => setRevName(e.target.value)} placeholder={tr("reviewName")} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">{tr("reviewRating")}</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setRevRating(star)} className="p-1 focus:outline-none rounded">
                        <Star className={`w-8 h-8 ${star <= revRating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">{tr("reviewExperience")}</label>
                  <Textarea required value={revBody} onChange={e => setRevBody(e.target.value)} placeholder={tr("reviewPlaceholder")} rows={4} />
                </div>
                <Button type="submit" className="w-full" disabled={createReview.isPending}>
                  {createReview.isPending ? tr("reviewSending") : tr("sendReview")}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
          <div className="container mx-auto max-w-xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
              <Send className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold font-display mb-2">{tr("newsletterTitle")}</h2>
            <p className="text-white/75 mb-6">
              {tr("newsletterDesc")}
            </p>
            {newsletterSent ? (
              <div className="bg-white/10 rounded-xl px-6 py-4 font-semibold">
                {tr("newsletterConfirmed")}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  placeholder={tr("alertEmailPlaceholder")}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-12 bg-white text-foreground border-none"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="h-12 px-6 font-semibold bg-amber-400 hover:bg-amber-500 text-amber-900 border-0 shrink-0"
                  disabled={createJobAlert.isPending}
                >
                  {createJobAlert.isPending ? "..." : tr("subscribeBtn")}
                </Button>
              </form>
            )}
            <p className="text-xs text-white/50 mt-4">{tr("noSpamUnsubscribe")}</p>
          </div>
        </section>
      </main>

      {/* Testimonials & Reviews Section */}
      <section className="py-16 px-4 bg-muted/30 border-t">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3 bg-background border-amber-300 text-amber-800 px-3 py-1 font-bold">
              ★ Recensioni Verificate
            </Badge>
            <h2 className="text-3xl font-bold font-display text-foreground">Cosa dicono lavoratori e datori di lavoro</h2>
            <p className="text-muted-foreground text-sm mt-1">Oltre 12.000 lavoratori assunti tramite lavoro8.com in tutta Italia ed Europa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Marco Rossi",
                role: "Magazziniere",
                city: "Piacenza 🇮🇹",
                company: "DHL Hub",
                text: "Ho inviato il CV lunedì mattina e mercoledì ho fatto il colloquio. Assunto a tempo indeterminato! La piattaforma è velocissima e gratuita.",
                rating: 5,
              },
              {
                name: "Elena Dumitru",
                role: "Assistente Familiare / Badante",
                city: "Bologna 🇮🇹",
                company: "Famiglia Privata",
                text: "Ho trovato lavoro come badante convivente in 3 giorni. Assistenza ottima e contatto diretto col datore senza costi.",
                rating: 5,
              },
              {
                name: "Giuseppe Moretti",
                role: "Responsabile Selezioni",
                city: "Milano 🇮🇹",
                company: "Logistica Italia S.r.l.",
                text: "Pubblichiamo annunci su lavoro8.com da 6 mesi. Riceviamo candidature qualificate e verificate ogni giorno. Strumento indispensabile.",
                rating: 5,
              },
            ].map((rev, i) => (
              <div key={i} className="bg-background border rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic leading-relaxed font-medium">"{rev.text}"</p>
                </div>
                <div className="pt-3 border-t flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-foreground">{rev.name}</p>
                    <p className="text-muted-foreground">{rev.role} · {rev.company}</p>
                  </div>
                  <span className="font-medium text-slate-500">{rev.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crawlable job discovery links */}
      <section className="py-14 px-4 bg-background border-t">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <h2 className="text-xl font-bold font-display mb-4">{tr("jobsByCountryTitle")}</h2>
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
            <h2 className="text-xl font-bold font-display mb-4">{tr("jobsByCategoryCountryTitle")}</h2>
            <div className="space-y-4">
              {Object.entries(CATEGORY_SLUGS).map(([categorySlugKey, categoryLabel]) => (
                <div key={categorySlugKey}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">{tr(CATEGORY_SLUG_LABEL_KEYS[categorySlugKey] ?? categoryLabel)}</h3>
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
