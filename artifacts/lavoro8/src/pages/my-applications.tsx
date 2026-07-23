import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { useSeo } from "@/lib/use-seo";
import { useAuth } from "@clerk/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle2, XCircle, MessageCircle, Eye, ChevronRight, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { loadApplications, StoredApplication } from "@/lib/local-applications";

type AppStatus = "pending" | "viewed" | "replied" | "accepted" | "rejected";

const STATUS_CONFIG: Record<AppStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending:  { label: "Inviata",         icon: Clock,         color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  viewed:   { label: "Visualizzata",    icon: Eye,           color: "bg-blue-100 text-blue-800 border-blue-200" },
  replied:  { label: "Risposta",        icon: MessageCircle, color: "bg-purple-100 text-purple-800 border-purple-200" },
  accepted: { label: "Accettata!",      icon: CheckCircle2,  color: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "Non selezionato", icon: XCircle,       color: "bg-red-100 text-red-700 border-red-200" },
};

export default function MyApplicationsPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [, navigate] = useLocation();
  const [applications, setApplications] = useState<StoredApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({ title: "Le mie candidature | Lavoro8", description: "Monitora lo stato delle tue candidature", noindex: true });

  useEffect(() => {
    // Load from localStorage
    setApplications(loadApplications());
    setLoading(false);
  }, []);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="p-8 max-w-sm w-full text-center space-y-4">
            <Briefcase className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-xl font-bold">Accedi per vedere le candidature</h1>
            <p className="text-sm text-muted-foreground">Devi essere loggato per monitorare le tue candidature.</p>
            <Button onClick={() => navigate("/sign-in")} className="w-full">Accedi</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-display">Le mie candidature</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitora lo stato e chatta con le aziende</p>
        </div>

        {applications.length === 0 ? (
          <Card className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="font-semibold text-muted-foreground">Nessuna candidatura ancora</p>
            <p className="text-sm text-muted-foreground mt-1">Candidati a un'offerta per vederla qui</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/jobs")}>
              Cerca lavoro
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {applications.map(app => {
              const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.pending;
              const Icon = cfg.icon;
              const hasReply = app.status === "replied" || app.status === "accepted";
              return (
                <Card
                  key={app.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/my-applications/${app.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm leading-tight">{app.jobTitle}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{app.jobCompany} · {app.jobCity}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color}`}>
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                        {hasReply && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                            <MessageCircle className="w-3 h-3" />
                            Nuovo messaggio
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
