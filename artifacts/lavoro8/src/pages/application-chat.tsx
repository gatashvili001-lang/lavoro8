import { useState, useRef, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { useSeo } from "@/lib/use-seo";
import { useAuth } from "@clerk/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Paperclip, Clock, Eye, MessageCircle, CheckCircle2, XCircle, Loader2, Briefcase, Building2 } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { CvUpload } from "@/components/cv-upload";

type AppStatus = "pending" | "viewed" | "replied" | "accepted" | "rejected";

interface ApplicationMessage {
  id: number;
  applicationId: number;
  senderType: string;
  text: string;
  attachmentUrl: string | null;
  createdAt: string;
}

interface ApplicationDetail {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  cvUrl: string | null;
  status: AppStatus;
  createdAt: string;
  jobTitle?: string;
  jobCity?: string;
  jobCompany?: string;
  jobCategory?: string;
  jobCountry?: string;
}

const STATUS_CONFIG: Record<AppStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending:  { label: "Inviata — in attesa",    icon: Clock,         color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  viewed:   { label: "Visualizzata dall'azienda", icon: Eye,         color: "bg-blue-100 text-blue-800 border-blue-200" },
  replied:  { label: "L'azienda ha risposto",  icon: MessageCircle, color: "bg-purple-100 text-purple-800 border-purple-200" },
  accepted: { label: "Candidatura accettata!", icon: CheckCircle2,  color: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "Non selezionato",        icon: XCircle,       color: "bg-red-100 text-red-700 border-red-200" },
};

const TIMELINE: { status: AppStatus; label: string }[] = [
  { status: "pending",  label: "Inviata" },
  { status: "viewed",   label: "Vista" },
  { status: "replied",  label: "Risposta" },
  { status: "accepted", label: "Accettata" },
];

function statusOrder(s: AppStatus) {
  const idx: Record<AppStatus, number> = { pending: 0, viewed: 1, replied: 2, accepted: 3, rejected: 3 };
  return idx[s] ?? 0;
}

export default function ApplicationChatPage() {
  const [, params] = useRoute("/my-applications/:id");
  const [, navigate] = useLocation();
  const id = Number(params?.id);
  const { isSignedIn, isLoaded } = useAuth();
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const [attachUrl, setAttachUrl] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useSeo({ title: "Chat candidatura | Lavoro8", description: "Comunicazione con l'azienda", noindex: true });

  const { data, isLoading } = useQuery<{ application: ApplicationDetail; messages: ApplicationMessage[] }>({
    queryKey: ["application-chat", id],
    queryFn: () => customFetch(`/api/applications/${id}/messages`),
    enabled: !!isSignedIn && !!id,
    refetchInterval: 15000,
    retry: false,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages.length]);

  const sendMutation = useMutation({
    mutationFn: (body: { text: string; attachmentUrl?: string }) =>
      customFetch(`/api/applications/${id}/messages`, { method: "POST", body: JSON.stringify({ ...body, senderType: "applicant" }) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["application-chat", id] });
      qc.invalidateQueries({ queryKey: ["my-applications"] });
      setText("");
      setAttachUrl(null);
      setShowUpload(false);
    },
  });

  const handleSend = () => {
    const t = text.trim();
    if (!t) return;
    sendMutation.mutate({ text: t, attachmentUrl: attachUrl ?? undefined });
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const app = data?.application;
  const messages = data?.messages ?? [];
  const cfg = app ? (STATUS_CONFIG[app.status] ?? STATUS_CONFIG.pending) : STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;
  const currentOrder = app ? statusOrder(app.status) : 0;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 max-w-2xl mx-auto w-full flex flex-col px-4 py-4 gap-4">

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/my-applications")} className="gap-1 -ml-1">
            <ArrowLeft className="w-4 h-4" /> Le mie candidature
          </Button>
        </div>

        {app && (
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{app.jobTitle ?? "Posizione"}</p>
                <p className="text-sm text-muted-foreground">{app.jobCompany} · {app.jobCity}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {cfg.label}
                  </span>
                </div>
              </div>
            </div>

            {app.status !== "rejected" && (
              <div className="mt-4 flex items-center gap-1">
                {TIMELINE.map((step, i) => {
                  const done = currentOrder >= i;
                  const active = currentOrder === i;
                  return (
                    <div key={step.status} className="flex items-center flex-1">
                      <div className={`flex flex-col items-center flex-1 ${i === TIMELINE.length - 1 ? "" : ""}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                          done ? "bg-primary border-primary text-white" : "bg-background border-muted-foreground/30 text-muted-foreground"
                        } ${active ? "ring-2 ring-primary/30" : ""}`}>
                          {i + 1}
                        </div>
                        <span className={`text-[10px] mt-1 font-medium ${done ? "text-primary" : "text-muted-foreground"}`}>{step.label}</span>
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-1 mb-4 rounded transition-all ${currentOrder > i ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              Candidatura inviata {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
            </div>
          </Card>
        )}

        <div className="flex-1 flex flex-col gap-2 min-h-[200px] max-h-[400px] overflow-y-auto rounded-xl border bg-muted/30 p-3">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 gap-2">
              <MessageCircle className="w-10 h-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Nessun messaggio ancora.</p>
              <p className="text-xs text-muted-foreground">Puoi scrivere all'azienda qui sotto.</p>
            </div>
          ) : (
            messages.map(msg => {
              const isApplicant = msg.senderType === "applicant";
              return (
                <div key={msg.id} className={`flex ${isApplicant ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    isApplicant
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-white border text-foreground rounded-bl-sm"
                  }`}>
                    {!isApplicant && (
                      <p className="text-[10px] font-semibold mb-1 text-primary/70 uppercase tracking-wide">Azienda</p>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    {msg.attachmentUrl && (
                      <a
                        href={msg.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 mt-1.5 text-xs underline ${isApplicant ? "text-primary-foreground/80" : "text-primary"}`}
                      >
                        <Paperclip className="w-3 h-3" /> Allegato
                      </a>
                    )}
                    <p className={`text-[10px] mt-1 ${isApplicant ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>
                      {format(new Date(msg.createdAt), "HH:mm")}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        <Card className="p-3 space-y-2">
          {showUpload && (
            <div className="pb-2 border-b">
              <CvUpload onUploaded={(url) => { setAttachUrl(url); setShowUpload(false); }} onClear={() => setAttachUrl(null)} />
            </div>
          )}
          {attachUrl && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded px-2 py-1">
              <Paperclip className="w-3 h-3" /> Allegato pronto
              <button className="ml-auto text-destructive" onClick={() => setAttachUrl(null)}>✕</button>
            </div>
          )}
          <Textarea
            placeholder="Scrivi un messaggio all'azienda..."
            value={text}
            onChange={e => setText(e.target.value)}
            className="resize-none min-h-[80px] text-sm border-0 bg-muted/50 focus-visible:ring-0"
            onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend(); }}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => setShowUpload(s => !s)}
            >
              <Paperclip className="w-3.5 h-3.5" /> Allega file
            </Button>
            <Button
              onClick={handleSend}
              disabled={!text.trim() || sendMutation.isPending}
              className="ml-auto gap-1.5"
              size="sm"
            >
              {sendMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Invia
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">Ctrl+Enter per inviare</p>
        </Card>
      </main>
    </div>
  );
}
