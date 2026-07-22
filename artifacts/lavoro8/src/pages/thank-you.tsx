import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { CheckCircle2, Search } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";

export default function ThankYouPage() {
  const { tr } = useLang();

  useSeo({
    title: tr("applicationSent"),
    description: "La tua candidatura è stata inviata con successo su lavoro8.com.",
    path: "/grazie",
    noindex: true,
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-xl flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-9 h-9 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-2">{tr("applicationSent")}</h1>
        <p className="text-muted-foreground mb-8">{tr("applicationSentDesc")}</p>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Search className="w-4 h-4" />
          {tr("allJobs")}
        </Link>
      </main>
    </div>
  );
}
