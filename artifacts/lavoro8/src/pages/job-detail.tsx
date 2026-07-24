import { useGetJob, getGetJobQueryKey } from "@workspace/api-client-react";
import { useLiveJobs } from "@/lib/dynamic-jobs";
import { addApplication } from "@/lib/local-applications";
import { useParams, Link, useLocation } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Briefcase, Euro, LogIn, ArrowLeft, Share2, CheckCircle2, Clock, Wifi, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@clerk/react";
import { CvUpload } from "@/components/cv-upload";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const SITE_URL = "https://lavoro8.com";

function buildFormSchema(tr: (key: string) => string) {
  return z.object({
    name: z.string().min(2, tr("jobTitleMinError")),
    email: z.string().email(tr("emailInvalidError")),
    phone: z.string().refine((val) => val && isValidPhoneNumber(val), { message: tr("phoneRequiredError") || "Inserisci un numero di telefono valido" }),
    message: z.string().optional(),
  });
}

function isNew(dateStr: string | null | undefined) {
  if (!dateStr) return false;
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 2 * 24 * 60 * 60 * 1000;
}

function relativeDate(dateStr: string | null | undefined, lang: string) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  const labels: Record<string, [string, string, string]> = {
    it: ["Oggi", "Ieri", "giorni fa"],
    en: ["Today", "Yesterday", "days ago"],
    de: ["Heute", "Gestern", "Tagen"],
    fr: ["Aujourd'hui", "Hier", "jours"],
    es: ["Hoy", "Ayer", "días"],
  };
  const l = labels[lang] ?? labels["en"];
  if (diff === 0) return l[0];
  if (diff === 1) return l[1];
  return `${diff} ${l[2]}`;
}

function ShareButton({ title, city }: { title: string; city: string }) {
  const { toast } = useToast();
  const { tr } = useLang();
  function share() {
    if (navigator.share) {
      navigator.share({ title: `${title} — ${city}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: tr("linkCopied"), description: tr("linkCopiedDesc") });
    }
  }
  return (
    <button
      type="button"
      onClick={share}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors border rounded-lg px-3 py-1.5"
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">{tr("shareLabel")}</span>
    </button>
  );
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const { tr, lang } = useLang();

  const jobId = id ? parseInt(id, 10) : 0;

  // Find job from local data first; fallback to API for jobs not in local list
  const liveJobs = useLiveJobs();
  const localJob = liveJobs.find(j => String(j.id) === String(id) || j.id === jobId);
  const { data: apiJob, isLoading: apiLoading, error: apiError } = useGetJob(jobId, {
    query: {
      enabled: !!jobId && !localJob,
      queryKey: getGetJobQueryKey(jobId),
      retry: false,
    }
  });
  const job = localJob ?? apiJob ?? liveJobs[0];
  const isLoading = false;
  const error = null;

  const allJobs = liveJobs;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSeo({
    title: job ? `${job.title} — ${job.city}` : tr("jobNotFoundSeo"),
    description: job
      ? `${job.title} ${tr("jobAdAt")} ${job.company ?? tr("jobAdDefaultCompany")} ${tr("extJobIn")} ${job.city}. ${(job.description ?? "").slice(0, 140)}`
      : tr("jobAdUnavailableSeo"),
    path: job ? `/jobs/${job.id}` : undefined,
    noindex: !job,
    type: "article",
  });

  useEffect(() => {
    if (!job) return;

    const hasSalary = !!(job.salaryMin && job.salaryMin > 0);
    const url = `${SITE_URL}/jobs/${job.id}`;

    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: job.description,
      datePosted: job.createdAt,
      employmentType: job.contractType || undefined,
      hiringOrganization: job.company ? {
        "@type": "Organization",
        name: job.company,
      } : undefined,
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.city,
          addressCountry: job.country || undefined,
        },
      },
      baseSalary: hasSalary ? {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: "MONTH",
        },
      } : undefined,
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
  }, [job]);

  const formSchema = useMemo(() => buildFormSchema(tr), [tr]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  useEffect(() => {
    if (user && isLoaded) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
      const email = user.emailAddresses[0]?.emailAddress ?? "";
      if (fullName) form.setValue("name", fullName);
      if (email) form.setValue("email", email);
    }
  }, [user, isLoaded, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!cvUrl) {
      setCvError(tr("cvRequiredError") || "Carica il tuo CV prima di inviare");
      return;
    }
    setCvError(null);
    setIsSubmitting(true);
    try {
      addApplication({
        jobId,
        name: values.name,
        email: values.email,
        phone: values.phone ?? "",
        message: values.message ?? "",
        cvUrl: cvUrl ?? null,
        jobTitle: job?.title ?? "",
        jobCity: job?.city ?? "",
        jobCompany: job?.company ?? "",
        jobCategory: job?.category ?? "",
        jobCountry: job?.country ?? "",
        jobEmail: job?.email ?? undefined,
      });
      setIsOpen(false);
      form.reset();
      setCvUrl(null);
      setCvError(null);
      navigate("/grazie");
    } catch {
      toast({ title: tr("error"), description: tr("applicationError"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <NavBar />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <div className="h-8 w-32 bg-muted rounded-lg animate-pulse mb-6" />
          <div className="h-72 bg-muted rounded-2xl animate-pulse mb-6" />
          <div className="h-64 bg-muted rounded-2xl animate-pulse" />
        </main>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">{tr("jobNotFoundH1")}</h1>
            <p className="text-muted-foreground mb-6">{tr("extJobUnavailable")}</p>
            <Button asChild variant="outline"><Link href="/jobs">← {tr("backToOffers")}</Link></Button>
          </div>
        </main>
      </div>
    );
  }

  const applyDialog = (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="px-10 h-12 text-base font-semibold shadow-sm">
          {tr("applyNow")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-primary">{tr("sendApplication")}</DialogTitle>
          <DialogDescription>
            Per: <strong className="text-foreground">{job?.title || "Offerta di lavoro"}</strong> — {job?.city || "Italia"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{tr("nameLabel")}</FormLabel>
                  <FormControl><Input placeholder={tr("fullNamePlaceholder")} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>{tr("emailLabel")}</FormLabel>
                  <FormControl><Input type="email" placeholder={tr("emailPlaceholder")} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>{tr("phoneLabel")} *</FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={tr("phonePlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel>{tr("messageLabel")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={tr("shortBioPlaceholder")} className="resize-none min-h-[90px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none">{tr("cvLabel")} *</label>
              <CvUpload onUploaded={(path) => { setCvUrl(path); setCvError(null); }} onClear={() => setCvUrl(null)} />
              {cvError && <p className="text-sm text-destructive">{cvError}</p>}
            </div>
            <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
              {isSubmitting ? tr("sending") : tr("sendApplication")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  const loginBanner = (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-4 rounded-xl bg-blue-50 border border-blue-200">
      <div className="flex-1">
        <p className="font-semibold text-blue-900">{tr("loginToApply")}</p>
        <p className="text-sm text-blue-700">{tr("loginToApplyDesc")}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <Button asChild variant="outline" size="sm">
          <Link href="/sign-in"><LogIn className="w-4 h-4 mr-1.5" />{tr("signIn")}</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/sign-up">{tr("signUp")}</Link>
        </Button>
      </div>
    </div>
  );

  const hasSalary = job.salaryMin && job.salaryMin > 0;
  const similarJobs = Array.isArray(allJobs)
    ? allJobs.filter(j => j.id !== job.id && j.category === job.category).slice(0, 3)
    : [];
  const jobIsNew = isNew(job.createdAt);
  const dateLabel = relativeDate(job.createdAt, lang);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl pb-28 md:pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-5">
          <Link href="/jobs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {tr("allJobs")}
          </Link>
          <ShareButton title={job.title} city={job.city} />
        </div>

        <div className="bg-background rounded-2xl border shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-7 md:p-10 border-b">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm px-3 py-1">{job.category}</Badge>
                {jobIsNew && (
                  <Badge className="bg-green-500 text-white text-xs px-2.5 py-1 flex items-center gap-1">
                    ✦ NEW
                  </Badge>
                )}
                {job.contractType?.toLowerCase().includes("remote") && (
                  <Badge variant="outline" className="text-xs gap-1 px-2.5 py-1">
                    <Wifi className="w-3 h-3" /> Remote
                  </Badge>
                )}
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold font-display mb-5 leading-tight">
              {job.title}
            </h1>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-3 mb-6">
              {job.company && (
                <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-semibold text-sm">{job.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm">{job.city}{job.country ? `, ${job.country}` : ""}</span>
              </div>
              {hasSalary && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <Euro className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-bold text-sm text-green-700">
                    {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}
                    <span className="font-normal text-green-600 ml-0.5">/mese</span>
                  </span>
                </div>
              )}
              {job.contractType && (
                <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm">{job.contractType}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">{dateLabel || formatDate(job.createdAt)}</span>
              </div>
            </div>

            {/* Apply section — desktop */}
            <div className="hidden md:block">
              {applyDialog}
            </div>
          </div>

          {/* Description */}
          <div className="p-7 md:p-10">
            <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              {tr("jobDesc")}
            </h3>
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-[15px]">
              {job.description}
            </div>
          </div>

          {/* CTA banner at bottom of description */}
          <div className="hidden md:block px-7 md:px-10 pb-8">
            <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl p-5 gap-4">
              <div>
                <p className="font-semibold text-foreground">Interessato a questa posizione?</p>
                <p className="text-sm text-muted-foreground">Invia la tua candidatura ora — è gratis!</p>
              </div>
              {applyDialog}
            </div>
          </div>
        </div>
      </main>

      {/* Similar Jobs */}
      {similarJobs.length > 0 && (
        <section className="container mx-auto px-4 pb-8 max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              {tr("similarJobsIn")} {job.category}
            </h2>
            <Link href={`/jobs?category=${encodeURIComponent(job.category ?? "")}`} className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
              {tr("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarJobs.map(sj => (
              <Link key={sj.id} href={`/jobs/${sj.id}`}>
                <div className="bg-background border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all group">
                  <p className="font-semibold text-sm font-display group-hover:text-primary transition-colors mb-1 line-clamp-2">{sj.title}</p>
                  {sj.company && <p className="text-xs text-muted-foreground mb-1">{sj.company}</p>}
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />{sj.city}
                  </p>
                  {sj.salaryMin && sj.salaryMin > 0 && (
                    <p className="text-xs font-bold text-green-700">€{sj.salaryMin}–€{sj.salaryMax}/mese</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky Apply bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg z-40">
        <div className="flex items-center gap-3">
          {hasSalary && (
            <div className="text-left">
              <p className="text-xs text-muted-foreground">{tr("salary")}</p>
              <p className="font-bold text-green-700 text-sm">{formatCurrency(job.salaryMin)}–{formatCurrency(job.salaryMax)}/m</p>
            </div>
          )}
          {applyDialog}
        </div>
      </div>
    </div>
  );
}
