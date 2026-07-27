import React, { useState } from "react";
import { Bell, Send, CheckCircle2, MessageSquare, Mail, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/lang-context";

export function JobAlertWidget() {
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();
  const { lang } = useLang();

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) {
      toast({
        title: "Inserisci la tua Email o Numero WhatsApp",
        description: "Inserisci un indirizzo email o un numero di telefono valido per ricevere gli avvisi.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      toast({
        title: lang === "ka" ? "შეტყობინებები გააქტიურებულია! 🔔" : "Iscrizione completata con successo! 🔔",
        description: lang === "ka" ? "თქვენ მიიღებთ ახალ ვაკანსიებს ელ-ფოსტაზე ან WhatsApp-ზე." : "Riceverai le nuove offerte di lavoro direttamente su Email o WhatsApp.",
      });
    }, 600);
  }

  if (subscribed) {
    return (
      <div className="bg-emerald-600 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-500 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold font-display mb-2">
          {lang === "ka" ? "შეტყობინებები გააქტიურებულია!" : "Sei Iscritto agli Avvisi Lavoro!"}
        </h3>
        <p className="text-emerald-100 max-w-md mx-auto text-sm leading-relaxed">
          {lang === "ka"
            ? "თქვენ მიიღებთ ახალ ვაკანსიებს ყოველდღიურად."
            : `Ti invieremo automaticamente le nuove offerte per "${role || "tutti i ruoli"}" su ${contact}.`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-blue-800/40 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 mb-1">
                <Sparkles className="w-3 h-3" /> Avvisi Gratuiti 24/7
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                {lang === "ka"
                  ? "მიიღეთ ახალი ვაკანსიები WhatsApp-ზე ან ელ-ფოსტაზე"
                  : "Ricevi le nuove offerte di lavoro su WhatsApp o Email"}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-6 max-w-2xl leading-relaxed">
          {lang === "ka"
            ? "არ გამოტოვოთ ახალი ვაკანსიები. მიიღეთ შეტყობინება გამოქვეყნებისთანავე."
            : "Non perdere nemmeno un'opportunità. Inserisci il tuo ruolo preferito e ricevi notifiche quotidiane trasparenti e verificate."}
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder={lang === "ka" ? "პოზიცია / ქალაქი (მაგ. Magazziniere)" : "Ruolo o Città (es. Magazziniere, Roma)"}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-xl text-sm focus-visible:ring-amber-400"
            />
          </div>
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder={lang === "ka" ? "Email ან WhatsApp ნომერი" : "Email o Telefono WhatsApp"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-xl text-sm focus-visible:ring-amber-400"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shrink-0 gap-2 shadow-lg shadow-amber-400/20 transition-all"
          >
            {submitting ? (
              "Iscrizione..."
            ) : (
              <>
                <span>Iscriviti Ora</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-amber-400" /> Notifiche Email
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Direct
          </span>
          <span className="flex items-center gap-1">
            🔒 Privacy Garantita 100% (No Spam)
          </span>
        </div>
      </div>
    </div>
  );
}
