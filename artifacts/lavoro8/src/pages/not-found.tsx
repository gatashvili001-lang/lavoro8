import { NavBar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Home, Briefcase, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";

export default function NotFound() {
  const { tr } = useLang();

  useSeo({
    title: tr("pageNotFoundTitle"),
    description: tr("pageNotFoundDesc"),
    noindex: true,
  });

  const QUICK_LINKS = [
    { href: "/jobs", icon: Briefcase, label: tr("searchJobs"), desc: tr("browseListingsDesc") },
    { href: "/pubblica", icon: Search, label: tr("postJob"), desc: tr("postJobDesc") },
    { href: "/", icon: Home, label: tr("backToHome"), desc: tr("homepageLabel") },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg">
          <div className="relative mb-6">
            <p className="text-[120px] md:text-[160px] font-bold font-display text-primary/10 leading-none select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold font-display mb-3">
            {tr("pageNotFoundTitle")}
          </h1>
          <p className="text-muted-foreground mb-8 text-base leading-relaxed">
            {tr("pageNotFoundDesc")}
          </p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {QUICK_LINKS.map(link => (
              <Link key={link.href} href={link.href}>
                <div className="flex items-center gap-4 p-4 bg-background border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all text-left group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              {tr("backToHome")}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
