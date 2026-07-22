import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Lang, t, COUNTRY_LANG, LANGUAGES } from "./i18n";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: string) => string;
  currentLang: typeof LANGUAGES[0];
};

const LangContext = createContext<LangContextType>({
  lang: "it",
  setLang: () => {},
  tr: (k) => k,
  currentLang: { code: "it", label: "Italiano", flag: "🇮🇹", flagImg: "it" },
});

function getBrowserLang(): Lang {
  const browser = navigator.language.slice(0, 2).toLowerCase() as Lang;
  const valid = Object.keys(t) as Lang[];
  return valid.includes(browser) ? browser : "it";
}

async function detectLangFromIp(): Promise<Lang | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    const cc: string = data.country_code ?? "";
    return COUNTRY_LANG[cc] ?? null;
  } catch {
    return null;
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const urlLang = new URLSearchParams(window.location.search).get("lang") as Lang | null;
    if (urlLang && urlLang in t) {
      localStorage.setItem("lavoro_lang", urlLang);
      return urlLang;
    }
    const saved = localStorage.getItem("lavoro_lang") as Lang | null;
    if (saved && saved in t) return saved;
    return getBrowserLang();
  });

  const [autoDetected, setAutoDetected] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lavoro_lang");
    if (saved) return;
    if (autoDetected) return;
    detectLangFromIp().then((detected) => {
      if (detected) {
        setLangState(detected);
      }
      setAutoDetected(true);
    });
  }, [autoDetected]);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lavoro_lang", l);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState(window.history.state, "", url);
  }

  function tr(key: string): string {
    return t[lang]?.[key] ?? t["en"]?.[key] ?? t["it"]?.[key] ?? key;
  }

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = lang;
    if (LANGUAGES.find((l) => l.code === lang)?.dir === "rtl") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, tr, currentLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
