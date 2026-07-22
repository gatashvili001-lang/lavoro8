import { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import { LANGUAGES } from "@/lib/i18n";
import { ChevronDown, Check } from "lucide-react";

const CDN = "https://hatscripts.github.io/circle-flags/flags";

function FlagImg({ code, size = 28 }: { code: string; size?: number }) {
  const [err, setErr] = useState(false);
  const lang = LANGUAGES.find(l => l.flagImg === code) ?? LANGUAGES.find(l => l.code === (code as any));
  if (err) {
    return <span className="text-xl leading-none">{lang?.flag ?? "🏳️"}</span>;
  }
  return (
    <img
      src={`${CDN}/${code}.svg`}
      alt={code}
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
      onError={() => setErr(true)}
    />
  );
}

export function LanguageSwitcher() {
  const { lang, setLang, currentLang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border bg-background hover:bg-muted transition-colors"
        aria-label="Change language"
      >
        <FlagImg code={currentLang.flagImg} size={22} />
        <span className="text-xs font-bold uppercase tracking-wider text-foreground hidden sm:inline">
          {currentLang.code.toUpperCase()}
        </span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-background border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b bg-muted/40">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tr("languageSwitcherLabel")}</p>
          </div>
          <div className="max-h-80 overflow-y-auto py-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-muted transition-colors text-left ${
                  lang === l.code ? "bg-primary/5" : ""
                }`}
              >
                <FlagImg code={l.flagImg} size={26} />
                <span className={`flex-1 text-sm ${lang === l.code ? "font-semibold text-primary" : "text-foreground"}`}>
                  {l.label}
                </span>
                {lang === l.code && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
