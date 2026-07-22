import { useState, useRef, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { NavBar } from "@/components/layout/navbar";
import { useSeo } from "@/lib/use-seo";
import { useAuth } from "@clerk/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Paperclip, Clock, Eye, MessageCircle, CheckCircle2, XCircle, Loader2, Building2, User } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

type AppStatus = "pending" | "viewed" | "replied" | "accepted" | "rejected";

interface ChatMessage {
  id: string;
  senderType: "applicant" | "company";
  text: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<AppStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending:  { label: "Inviata — in attesa",      icon: Clock,         color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  viewed:   { label: "Visualizzata dall'azienda", icon: Eye,           color: "bg-blue-100 text-blue-800 border-blue-200" },
  replied:  { label: "L'azienda ha risposto",     icon: MessageCircle, color: "bg-purple-100 text-purple-800 border-purple-200" },
  accepted: { label: "Candidatura accettata!",    icon: CheckCircle2,  color: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "Non selezionato",           icon: XCircle,       color: "bg-red-100 text-red-700 border-red-200" },
};

const TIMELINE: { status: AppStatus; label: string }[] = [
  { status: "pending",  label: "Inviata" },
  { status: "viewed",   label: "Vista" },
  { status: "replied",  label: "Risposta" },
  { status: "accepted", label: "Accettata" },
];

function statusOrder(s: AppStatus): number {
  return ({ pending: 0, viewed: 1, replied: 2, accepted: 3, rejected: 3 })[s] ?? 0;
}

// ─── Local Storage Chat Store ──────────────────────────────────────────────
function getChatKey(appId: string | number) {
  return `lavoro8_chat_${appId}`;
}
function loadMessages(appId: string | number): ChatMessage[] {
  try {
    const raw = localStorage.getItem(getChatKey(appId));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveMessages(appId: string | number, msgs: ChatMessage[]) {
  try { localStorage.setItem(getChatKey(appId), JSON.stringify(msgs)); } catch {}
}

function getStatusKey(appId: string | number) {
  return `lavoro8_status_${appId}`;
}
function loadStatus(appId: string | number): AppStatus {
  return (localStorage.getItem(getStatusKey(appId)) as AppStatus) || "pending";
}
function saveStatus(appId: string | number, status: AppStatus) {
  localStorage.setItem(getStatusKey(appId), status);
}

// ─── Simulated company auto-replies ──────────────────────────────────────────
const COMPANY_REPLIES = [
  "Grazie per il tuo messaggio! Abbiamo ricevuto la tua candidatura e la stiamo valutando con attenzione.",
  "Buongiorno! La tua candidatura è stata presa in esame dal nostro team HR. Ti risponderemo al più presto.",
  "Ottimo profilo! Vorremmo fissare un colloquio conoscitivo. Sei disponibile la prossima settimana?",
  "Grazie per il tuo interesse. Abbiamo esaminato il tuo CV e siamo interessati a procedere. Quando saresti disponibile per un colloquio?",
  "Messaggio ricevuto. Il responsabile HR ti contatterà entro 48 ore all'email indicata nella candidatura.",
];

export default function ApplicationChatPage() {
  const [, params] = useRoute("/my-applications/:id");
  const [, navigate] = useLocation();
  const appId = params?.id || "demo";
  const { isLoaded } = useAuth();

  useSeo({ title: "Chat candidatura | Lavoro8", description: "Comunicazione con l'azienda", noindex: true });

  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages(appId));
  const [status, setStatus] = useState<AppStatus>(() => loadStatus(appId));
  const [text, setText] = useState("");
  const [isCompanyTyping, setIsCompanyTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isCompanyTyping]);

  function sendMessage() {
    const t = text.trim();
    if (!t) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderType: "applicant",
      text: t,
      createdAt: new Date().toISOString(),
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(appId, updated);
    setText("");

    // Mark as viewed if still pending
    if (status === "pending") {
      setStatus("viewed");
      saveStatus(appId, "viewed");
    }

    // Simulate company reply after 2-4 seconds
    setIsCompanyTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderType: "company",
        text: COMPANY_REPLIES[Math.floor(Math.random() * COMPANY_REPLIES.length)],
        createdAt: new Date().toISOString(),
      };
      const withReply = [...updated, reply];
      setMessages(withReply);
      saveMessages(appId, withReply);
      setIsCompanyTyping(false);
      setStatus("replied");
      saveStatus(appId, "replied");
    }, 2000 + Math.random() * 2000);
  }

  if (!isLoaded) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;
  const currentOrder = statusOrder(status);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 max-w-2xl mx-auto w-full flex flex-col px-4 py-4 gap-4">

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/my-applications")} className="gap-1 -ml-1">
            <ArrowLeft className="w-4 h-4" /> Le mie candidature
          </Button>
        </div>

        {/* Application Status Card */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">Chat con l'azienda</p>
              <p className="text-sm text-muted-foreground">Candidatura #{appId}</p>
              <div className="mt-2">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.color}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {cfg.label}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {status !== "rejected" && (
            <div className="mt-4 flex items-center gap-1">
              {TIMELINE.map((step, i) => {
                const done = currentOrder >= i;
                const active = currentOrder === i;
                return (
                  <div key={step.status} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
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
        </Card>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col gap-2 min-h-[250px] max-h-[420px] overflow-y-auto rounded-xl border bg-muted/30 p-3">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 gap-2">
              <MessageCircle className="w-10 h-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground font-medium">Nessun messaggio ancora.</p>
              <p className="text-xs text-muted-foreground">Scrivi all'azienda per avere aggiornamenti sulla tua candidatura.</p>
            </div>
          ) : (
            messages.map(msg => {
              const isApplicant = msg.senderType === "applicant";
              return (
                <div key={msg.id} className={`flex ${isApplicant ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-end gap-1.5 max-w-[80%] ${isApplicant ? "flex-row-reverse" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isApplicant ? "bg-primary" : "bg-muted-foreground/20"}`}>
                      {isApplicant
                        ? <User className="w-3.5 h-3.5 text-primary-foreground" />
                        : <Building2 className="w-3.5 h-3.5 text-foreground/60" />
                      }
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      isApplicant
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-white border text-foreground rounded-bl-sm"
                    }`}>
                      {!isApplicant && (
                        <p className="text-[10px] font-semibold mb-1 text-primary/70 uppercase tracking-wide">Azienda</p>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${isApplicant ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>
                        {format(new Date(msg.createdAt), "HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Company typing indicator */}
          {isCompanyTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-1.5">
                <div className="w-6 h-6 rounded-full bg-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-foreground/60" />
                </div>
                <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Message Input */}
        <Card className="p-3 space-y-2">
          <Textarea
            placeholder="Scrivi un messaggio all'azienda..."
            value={text}
            onChange={e => setText(e.target.value)}
            className="resize-none min-h-[80px] text-sm border-0 bg-muted/50 focus-visible:ring-0"
            onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendMessage(); }}
          />
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-muted-foreground">Ctrl+Enter per inviare</p>
            <Button
              onClick={sendMessage}
              disabled={!text.trim() || isCompanyTyping}
              className="gap-1.5"
              size="sm"
            >
              {isCompanyTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Invia
            </Button>
          </div>
        </Card>

        {/* Info note */}
        <p className="text-xs text-center text-muted-foreground">
          💡 Le risposte dell'azienda arrivano entro 24-48 ore · aggiorna la pagina per vedere nuovi messaggi
        </p>
      </main>
    </div>
  );
}
