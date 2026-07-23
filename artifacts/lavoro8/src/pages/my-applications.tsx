import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useSeo } from "@/lib/use-seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle2, XCircle, MessageCircle, Eye, ChevronRight, MapPin, Building2, ShieldCheck } from "lucide-react";
import { loadApplications, StoredApplication } from "@/lib/local-applications";

type AppStatus = "pending" | "viewed" | "reviewing" | "replied" | "accepted" | "rejected";

const STATUS_CONFIG: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending:    { label: "Inviata",                   icon: Clock,         color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  viewed:     { label: "Visualizzata dall'azienda", icon: Eye,           color: "bg-blue-100 text-blue-800 border-blue-300" },
  reviewing:  { label: "In valutazione",            icon: Clock,         color: "bg-amber-100 text-amber-900 border-amber-300" },
  replied:    { label: "✉️ Risposta dall'azienda",   icon: MessageCircle, color: "bg-purple-100 text-purple-800 border-purple-300 font-bold" },
  accepted:   { label: "✅ Candidatura Accettata",   icon: CheckCircle2,  color: "bg-green-100 text-green-800 border-green-300 font-bold" },
  rejected:   { label: "Non selezionato",           icon: XCircle,       color: "bg-gray-100 text-gray-700 border-gray-300" },
};

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recente";
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return "Recente";
  }
}

export default function MyApplicationsPage() {
  const [, navigate] = useLocation();
  const [applications, setApplications] = useState<StoredApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({ title: "Le mie candidature | lavoro8.com", description: "Monitora lo stato delle tue candidature e chatta con le aziende in tempo reale", noindex: true });

  useEffect(() => {
    setApplications(loadApplications());
    setLoading(false);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Le mie candidature</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Monitora lo stato delle domande inviate e chatta direttamente con i datori di lavoro
            </p>
          </div>
          <Badge variant="outline" className="bg-background px-3 py-1 text-xs">
            {applications.length} {applications.length === 1 ? "candidatura" : "candidature"}
          </Badge>
        </div>

        {applications.length === 0 ? (
          <Card className="p-12 text-center bg-background shadow-sm border">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              💼
            </div>
            <h3 className="text-lg font-bold text-foreground">Nessuna candidatura inviata</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              Non hai ancora inviato candidature. Cerca tra le offerte disponibili e candidati in 1 click!
            </p>
            <Button className="mt-5" onClick={() => navigate("/jobs")}>
              Sfoglia offerte di lavoro
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map(app => {
              const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.pending;
              const Icon = cfg.icon;
              const hasChat = true; // Always enable direct chat thread!

              return (
                <Card
                  key={app.id}
                  className="p-5 bg-background border hover:border-primary/40 transition-all hover:shadow-md group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 text-xl font-bold">
                        {app.jobCategory === "Magazzino" ? "📦" :
                         app.jobCategory === "Logistica" ? "🚛" :
                         app.jobCategory === "Rider" ? "🛵" :
                         app.jobCategory === "Ristorante" ? "🍽️" :
                         app.jobCategory === "Hotel" ? "🏨" : "💼"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                          {app.jobTitle || "Candidatura Lavoro"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                          {app.jobCompany && (
                            <span className="flex items-center gap-1 font-medium text-foreground">
                              <Building2 className="w-3.5 h-3.5 text-primary" /> {app.jobCompany}
                            </span>
                          )}
                          {app.jobCity && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> {app.jobCity}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3.5 h-3.5" /> {formatDate(app.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {cfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Contact / Chat action section */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="text-xs text-muted-foreground">
                      Candidato: <span className="font-semibold text-foreground">{app.name}</span> ({app.email})
                    </div>
                    <Button
                      size="sm"
                      className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      onClick={() => navigate(`/my-applications/${app.id}`)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Apri Chat con l'Azienda
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
