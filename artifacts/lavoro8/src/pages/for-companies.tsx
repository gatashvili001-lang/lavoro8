import { useEffect } from "react";
import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  Globe2,
  Zap,
  BarChart3,
  MousePointerClick,
  Building2,
  Crown,
  Clock,
} from "lucide-react";
import { useGetJobStats } from "@workspace/api-client-react";
import { useSeo } from "@/lib/use-seo";
import { useLang } from "@/lib/lang-context";

export default function ForCompaniesPage() {
  const { data: stats } = useGetJobStats();
  const { tr } = useLang();

  const BENEFITS = [
    { icon: Zap, title: tr("benefitFreePostTitle"), desc: tr("benefitFreePostDesc") },
    { icon: MousePointerClick, title: tr("benefit1ClickTitle"), desc: tr("benefit1ClickDesc") },
    { icon: Globe2, title: tr("benefitCoverageTitle"), desc: tr("benefitCoverageDesc") },
    { icon: BarChart3, title: tr("benefitDashboardTitle"), desc: tr("benefitDashboardDesc") },
  ];

  const STEPS = [
    { n: "1", title: tr("companyStep1Title"), desc: tr("companyStep1Desc") },
    { n: "2", title: tr("companyStep2Title"), desc: tr("companyStep2Desc") },
    { n: "3", title: tr("companyStep3Title"), desc: tr("companyStep3Desc") },
  ];

  useSeo({
    title: tr("companiesSeoTitle"),
    description: tr("companiesSeoDescription"),
    path: "/aziende",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {tr("backToHomeLink")}
            </Link>

            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              <Building2 className="w-4 h-4" /> {tr("forCompaniesBadge")}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-display mb-5 leading-tight">
              {tr("companiesHeroTitle")}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mb-8">
              {tr("companiesHeroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="secondary" className="h-12 px-7 font-semibold bg-amber-400 hover:bg-amber-500 text-amber-900 border-0">
                <Link href="/pubblica">{tr("postFreeOfferBtn")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 font-semibold bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
                <Link href="/pricing">
                  <Crown className="w-4 h-4 mr-2" /> {tr("discoverPremiumBtn")}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
              <div>
                <div className="text-2xl font-bold">{stats?.totalJobs ?? "170+"}</div>
                <div className="text-xs text-white/60">{tr("activeListingsLabel")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">23+</div>
                <div className="text-xs text-white/60">{tr("europeanCountriesLabel")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-white/60">{tr("freeToStartLabel")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2-hour response commitment notice */}
        <section className="py-8 px-4 bg-amber-50 border-y border-amber-200">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-900">{tr("employerWarning2hTitle")}</p>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed max-w-2xl">{tr("employerWarning2hDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-10">
              {tr("whyChooseTitle")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-background border rounded-2xl p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-10">
              {tr("howItWorksCompaniesTitle")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-background border rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold font-display mb-5">{tr("premiumIncludesTitle")}</h2>
              <ul className="space-y-3 mb-6">
                {[
                  tr("premiumFeatureUnlimitedAds"),
                  tr("premiumFeaturePriorityVisibility"),
                  tr("premiumFeatureDirectApps"),
                  tr("premiumFeatureDashboard"),
                  tr("premiumFeaturePrioritySupport"),
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full h-11 font-semibold">
                <Link href="/pricing">{tr("seePricesBtn")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-blue-600 text-white text-center">
          <div className="container mx-auto max-w-xl">
            <h2 className="text-2xl font-bold font-display mb-3">{tr("readyToHireTitle")}</h2>
            <p className="text-blue-100 mb-7">
              {tr("readyToHireDesc")}
            </p>
            <Button asChild size="lg" variant="secondary" className="h-12 px-8 font-semibold bg-amber-400 hover:bg-amber-500 text-amber-900 border-0">
              <Link href="/pubblica">{tr("postNowFreeBtn")}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
