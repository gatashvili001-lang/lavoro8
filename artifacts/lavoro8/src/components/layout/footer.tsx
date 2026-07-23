import { Link } from "wouter";
import { ShieldCheck, Lock, CheckCircle, Mail, MapPin, Building2, Phone } from "lucide-react";
import { useLang } from "@/lib/lang-context";

export function Footer() {
  const { tr } = useLang();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Business Details */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl font-extrabold text-white tracking-tight">
              lavoro<span className="text-amber-400">8</span>.com
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              La piattaforma pan-europea per magazzinieri, rider, camerieri e operai. Candidatura 100% gratuita per tutti i lavoratori.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                lavoro8.com S.r.l.
              </div>
              <p>P.IVA / C.F.: <span className="text-slate-200">IT09876543210</span></p>
              <p>REA: <span className="text-slate-200">MI-2649102</span> · Cap. Soc. €50.000 i.v.</p>
              <div className="flex items-center gap-1.5 pt-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Via Monte Napoleone 8, 20121 Milano (MI)
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:supporto@lavoro8.com" className="hover:text-white transition-colors">supporto@lavoro8.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cerca Lavoro</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/jobs" className="hover:text-amber-400 transition-colors">Tutte le Offerte di Lavoro</Link></li>
              <li><Link href="/jobs?category=Magazzino" className="hover:text-amber-400 transition-colors">Offerte Magazzino & Logistica</Link></li>
              <li><Link href="/jobs?category=Rider" className="hover:text-amber-400 transition-colors">Offerte Rider & Consegne</Link></li>
              <li><Link href="/jobs?category=Ristorante" className="hover:text-amber-400 transition-colors">Ristorazione & Hotel</Link></li>
              <li><Link href="/jobs?country=IT" className="hover:text-amber-400 transition-colors">Lavoro in Italia 🇮🇹</Link></li>
              <li><Link href="/jobs?country=DE" className="hover:text-amber-400 transition-colors">Lavoro in Germania 🇩🇪</Link></li>
              <li><Link href="/jobs?country=CH" className="hover:text-amber-400 transition-colors">Lavoro in Svizzera 🇨🇭</Link></li>
            </ul>
          </div>

          {/* Business & Employers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Aziende & Datori</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/publish-job" className="hover:text-amber-400 transition-colors">Pubblica Annuncio di Lavoro</Link></li>
              <li><Link href="/for-companies" className="hover:text-amber-400 transition-colors">Servizi per le Aziende</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">Piani e Listino Prezzi</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Area Riservata Aziende</Link></li>
            </ul>
          </div>

          {/* Trust, Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sicurezza e Note Legali</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/trust-safety" className="text-amber-400 font-semibold hover:underline flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Sicurezza e Trasparenza
                </Link>
              </li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Informativa Privacy (GDPR)</Link></li>
              <li><Link href="/termini" className="hover:text-amber-400 transition-colors">Termini e Condizioni di Servizio</Link></li>
              <li><Link href="/refunds" className="hover:text-amber-400 transition-colors">Politica di Rimborso</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">Chi Siamo</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contatti e Supporto</Link></li>
            </ul>

            <div className="pt-2">
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-[11px] space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  Conforme GDPR UE 2016/679
                </div>
                <p className="text-slate-400 leading-snug">
                  Tutte le candidature sono trasmesse in modo crittografato (SSL 256-bit). Candidarsi è sempre gratuito per il lavoratore.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} lavoro8.com S.r.l. — Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Connessione Sicura SSL</span>
            <span>·</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Annunci Verificati</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
