import { NavBar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCreateJob } from "@workspace/api-client-react";
import { useLocation } from "wouter";
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
import { CheckCircle, Zap, Star, Crown, Rocket, Lock, Clock } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useLang } from "@/lib/lang-context";
import { PremiumModal } from "@/components/premium-modal";
import { useSeo } from "@/lib/use-seo";

const CATEGORIES = [
  { value: "Magazzino", labelKey: "catMagazzino", emoji: "📦" },
  { value: "Logistica", labelKey: "catLogistica", emoji: "🚛" },
  { value: "Rider", labelKey: "catRider", emoji: "🛵" },
  { value: "Ristorante", labelKey: "catRistorante", emoji: "🍽️" },
  { value: "Hotel", labelKey: "catHotel", emoji: "🏨" },
  { value: "Edilizia", labelKey: "catEdilizia", emoji: "🏗️" },
  { value: "Agricoltura", labelKey: "catAgricoltura", emoji: "🌾" },
  { value: "Baby-sitter", labelKey: "catBabysitter", emoji: "👶" },
  { value: "Badante", labelKey: "catBadanteFull", emoji: "" },
  { value: "Altro", labelKey: "catAltro", emoji: "💼" },
];

const CONTRACT_TYPES = [
  { value: "Tempo Determinato", labelKey: "contractTempoDeterminato" },
  { value: "Tempo Indeterminato", labelKey: "contractTempoIndeterminato" },
  { value: "Part-time", labelKey: "contractPartTime" },
  { value: "Stagionale", labelKey: "contractStagionale" },
  { value: "A chiamata", labelKey: "contractAChiamata" },
  { value: "Apprendistato", labelKey: "contractApprendistato" },
];

const COUNTRIES = [
  { code: "IT", flag: "🇮🇹", labelKey: "countryItalia" },
  { code: "DE", flag: "🇩🇪", labelKey: "countryGermania" },
  { code: "FR", flag: "🇫🇷", labelKey: "countryFrancia" },
  { code: "ES", flag: "🇪🇸", labelKey: "countrySpagna" },
  { code: "PT", flag: "🇵🇹", labelKey: "countryPortogallo" },
  { code: "NL", flag: "🇳🇱", labelKey: "countryPaesiBassi" },
  { code: "BE", flag: "🇧🇪", labelKey: "countryBelgio" },
  { code: "AT", flag: "🇦🇹", labelKey: "countryAustria" },
  { code: "CH", flag: "🇨🇭", labelKey: "countrySvizzera" },
  { code: "GB", flag: "🇬🇧", labelKey: "countryRegnoUnito" },
  { code: "PL", flag: "🇵🇱", labelKey: "countryPolonia" },
  { code: "RO", flag: "🇷🇴", labelKey: "countryRomania" },
  { code: "CZ", flag: "🇨🇿", labelKey: "countryRepubblicaCeca" },
  { code: "SK", flag: "🇸🇰", labelKey: "countrySlovacchia" },
  { code: "HU", flag: "🇭🇺", labelKey: "countryUngheria" },
  { code: "GR", flag: "🇬🇷", labelKey: "countryGrecia" },
  { code: "HR", flag: "🇭🇷", labelKey: "countryCroazia" },
  { code: "BG", flag: "🇧🇬", labelKey: "countryBulgaria" },
  { code: "RS", flag: "🇷🇸", labelKey: "countrySerbia" },
  { code: "UA", flag: "🇺🇦", labelKey: "countryUcraina" },
  { code: "GE", flag: "🇬🇪", labelKey: "countryGeorgia" },
  { code: "TR", flag: "🇹🇷", labelKey: "countryTurchia" },
  { code: "AL", flag: "🇦🇱", labelKey: "countryAlbania" },
];

function buildFormSchema(tr: (key: string) => string) {
  return z.object({
    title: z.string().min(3, tr("adTitleMinError")),
    city: z.string().min(2, tr("cityRequiredError")),
    country: z.string().min(1, tr("selectCountryError")),
    category: z.string().min(1, tr("selectCategoryError")),
    salaryMin: z.coerce.number().min(0, tr("salaryPositiveError")),
    salaryMax: z.coerce.number().min(0, tr("salaryPositiveError")),
    description: z.string().min(20, tr("descriptionMinError")),
    company: z.string().optional(),
    contractType: z.string().optional(),
  }).refine(data => data.salaryMax >= data.salaryMin, {
    message: tr("salaryMaxError"),
    path: ["salaryMax"],
  });
}

type PricingPeriod = "monthly" | "yearly";
type ModalType = "employer" | "seeker" | null;

// Features included in free vs what's LOCKED behind premium — keys resolved via tr() at render time

export default function PublishJobPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const createMutation = useCreateJob();
  const [premiumModal, setPremiumModal] = useState<ModalType>(null);
  const [period, setPeriod] = useState<PricingPeriod>("monthly");
  const { tr } = useLang();
  const [descLen, setDescLen] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  useSeo({
    title: tr("publishJobSeoTitle"),
    description: tr("publishJobSeoDescription"),
    path: "/pubblica",
  });

  const formSchema = useMemo(() => buildFormSchema(tr), [tr]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/stripe/subscription`)
      .then(res => res.ok ? res.json() : { active: false })
      .then(data => setIsPremium(Boolean(data.active)))
      .catch(() => setIsPremium(false));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      city: "",
      country: "IT",
      category: "",
      salaryMin: 1200,
      salaryMax: 1500,
      description: "",
      company: "",
      contractType: "Tempo Determinato",
    },
  });

  const FREE_FEATURES = [
    tr("freeFeatureVisible"), tr("freeFeatureUnlimited"), tr("freeFeature30days"), tr("freeFeatureInstant"),
  ];

  const PREMIUM_LOCKED = [
    { label: tr("lockedFeatured"), desc: tr("lockedFeaturedDesc") },
    { label: tr("lockedBadge"), desc: tr("lockedBadgeDesc") },
    { label: tr("locked60days"), desc: tr("locked60daysDesc") },
    { label: tr("lockedSupport"), desc: tr("lockedSupportDesc") },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutation.mutate({ data: { ...values, featured: isPremium } }, {
      onSuccess: (job) => {
        toast({
          title: tr("publishedSuccess"),
          description: isPremium ? tr("publishedSuccessPremium") : tr("publishedSuccessStandard"),
        });
        setLocation(`/jobs/${job.id}`);
      },
      onError: () => {
        toast({
          title: tr("error"),
          description: tr("publishError"),
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <PremiumModal type={premiumModal} period={period} onClose={() => setPremiumModal(null)} />
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-4 h-4" />
            {tr("freeNoCard")}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-2">
            {tr("publishJob")}
          </h1>
          <p className="text-muted-foreground">
            {tr("publishReach")}
          </p>
        </div>

        {/* 2-hour response warning */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">{tr("employerWarning2hTitle")}</p>
            <p className="text-sm text-amber-700 mt-0.5 leading-relaxed">{tr("employerWarning2hDesc")}</p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-background border rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 md:p-8 border-b bg-muted/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-display">{tr("adDetails")}</h2>
              <p className="text-muted-foreground text-sm mt-0.5">{tr("adDetailsDesc")}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> {tr("freeBadge")}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">

                {/* Section 1 */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("basicInfo")}</p>

                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tr("adTitleLabel")}</FormLabel>
                      <FormControl>
                        <Input placeholder={tr("adTitlePlaceholder")} className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("category")} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11"><SelectValue placeholder={tr("selectCategoryPlaceholder")} /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map(cat => <SelectItem key={cat.value} value={cat.value}>{cat.emoji ? `${cat.emoji} ` : ""}{tr(cat.labelKey)}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="contractType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("contractTypeLabel")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11"><SelectValue placeholder={tr("contractTypePlaceholder")} /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CONTRACT_TYPES.map(ct => <SelectItem key={ct.value} value={ct.value}>{tr(ct.labelKey)}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("country")} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11"><SelectValue placeholder={tr("countryPlaceholder")} /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map(c => (
                              <SelectItem key={c.code} value={c.code}>{c.flag} {tr(c.labelKey)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("city")} *</FormLabel>
                        <FormControl>
                          <Input placeholder={tr("cityPlaceholderExample")} className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("companyLabel")} <span className="text-muted-foreground font-normal text-xs">{tr("optionalLabel")}</span></FormLabel>
                        <FormControl>
                          <Input placeholder={tr("companyPlaceholder")} className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Section 2: Salary */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("monthlySalaryLabel")}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="salaryMin" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("minSalaryLabel")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">€</span>
                            <Input type="number" className="h-11 pl-7" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="salaryMax" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tr("maxSalaryLabel")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">€</span>
                            <Input type="number" className="h-11 pl-7" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Section 3: Description */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("descriptionLabel")}</p>
                    <span className={`text-xs font-medium ${descLen < 50 ? "text-muted-foreground" : descLen < 150 ? "text-amber-600" : "text-green-600"}`}>
                      {descLen < 50 ? tr("addMoreDetails") : descLen < 150 ? tr("goodContinue") : tr("excellentDesc")}
                    </span>
                  </div>
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={tr("descPlaceholder")}
                          className="min-h-[160px] resize-y"
                          {...field}
                          onChange={(e) => { field.onChange(e); setDescLen(e.target.value.length); }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Included in free — quick reminder */}
                <div className="bg-muted/40 rounded-xl p-4 grid grid-cols-2 gap-2">
                  {FREE_FEATURES.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 text-base font-semibold"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {tr("publishingInProgress")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Rocket className="w-5 h-5" />
                      {tr("publishBtnFree")}
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Premium upsell — AFTER the form, clearly optional */}
        {isPremium ? (
          <div className="border-2 border-amber-300 rounded-2xl p-6 bg-amber-50/50 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-bold font-display text-base text-amber-900">{tr("premiumAccountActive")}</p>
              <p className="text-sm text-amber-700 mt-0.5">
                {tr("premiumAccountActiveDesc")}
              </p>
            </div>
          </div>
        ) : (
        <div className="border-2 border-dashed border-amber-300 rounded-2xl p-6 bg-amber-50/50">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-bold font-display text-base text-amber-900">{tr("wantMoreVisibility")}</p>
              <p className="text-sm text-amber-700 mt-0.5">
                {tr("wantMoreVisibilityDesc")}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 mb-5">
            {PREMIUM_LOCKED.map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-amber-900">{item.label}</span>
                  <span className="text-xs text-amber-700 ml-2">— {item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Period toggle */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="inline-flex items-center bg-white border rounded-lg p-1 gap-1">
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  period === "monthly" ? "bg-amber-500 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                €7{tr("monthly")}
              </button>
              <button
                type="button"
                onClick={() => setPeriod("yearly")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                  period === "yearly" ? "bg-amber-500 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                €5{tr("monthly")}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${period === "yearly" ? "bg-white/20" : "bg-green-100 text-green-700"}`}>
                  {tr("yearlyDiscount")}
                </span>
              </button>
            </div>
            {period === "yearly" && (
              <span className="text-xs text-green-700 font-semibold">{tr("annualSaving")}</span>
            )}
          </div>

          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold w-full sm:w-auto"
            onClick={() => setPremiumModal("employer")}
          >
            <Star className="w-4 h-4 mr-2" />
            {tr("activatePremiumBtn")} — €{period === "monthly" ? "7" : "5"}{tr("monthly")}
          </Button>
        </div>
        )}

        {/* Job seeker alert upsell */}
        <div className="mt-4 border-2 border-dashed border-blue-200 rounded-2xl p-5 bg-blue-50/50 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900 text-sm">{tr("areYouWorker")}</p>
              <p className="text-xs text-blue-700">{tr("receiveOffersAlert")}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100 shrink-0" onClick={() => setPremiumModal("seeker")}>
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            {tr("activateAlertBtn")}
          </Button>
        </div>

      </main>
    </div>
  );
}
