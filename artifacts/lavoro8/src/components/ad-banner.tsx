import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const PUBLISHER_ID = "ca-pub-4337524588583476";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AFFILIATE LINKS — HOW TO ACTIVATE EARNINGS
//
// Each ad below has a comment with the affiliate signup URL.
// After signing up, replace the placeholder URL with your personal affiliate link.
//
// Estimated commissions:
//   • Airalo     — 5-10% per eSIM sale (partners.airalo.com)
//   • Trip.com   — up to 3-5% per booking (active, see FeaturedAd below)
//   • SafetyWing — monthly recurring commission (active, see FeaturedAd below)
// ─────────────────────────────────────────────────────────────────────────────

const SPONSOR_ADS = [
  {
    id: "trip",
    title: "🏨 Alloggi vicino al lavoro",
    desc: "Trip.com — Trova casa o hotel in tutta Italia a prezzi imbattibili",
    cta: "Cerca alloggio →",
    bg: "from-sky-500 to-blue-700",
    url: "https://www.trip.com/hotels/w/home?Allianceid=9177127&SID=323668773&trip_sub1=Lavoro8.com&trip_sub3=D18560026",
    tag: "Offerte esclusive",
  },
  {
    id: "safetywing",
    title: "🩺 Assicurazione sanitaria per l'estero",
    desc: "SafetyWing — Copertura medica flessibile in tutta Europa, attivazione in 5 minuti",
    cta: "Scopri ora →",
    bg: "from-teal-500 to-cyan-600",
    url: "https://safetywing.com/?referenceID=26559928&utm_source=26559928&utm_medium=Ambassador",
    tag: "Copertura immediata",
  },
];

function SponsorBanner({ variant = "horizontal" }: { variant?: "horizontal" | "square" }) {
  const [adIdx] = useState(() => Math.floor(Math.random() * SPONSOR_ADS.length));
  const ad = SPONSOR_ADS[adIdx];

  if (variant === "square") {
    return (
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col justify-between bg-gradient-to-br ${ad.bg} text-white rounded-xl p-5 cursor-pointer hover:opacity-95 transition-opacity h-full min-h-[140px] no-underline`}
      >
        <div>
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 font-medium">{ad.tag}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </div>
          <p className="font-bold text-base leading-tight mb-1">{ad.title}</p>
          <p className="text-xs text-white/80 leading-relaxed">{ad.desc}</p>
        </div>
        <div className="text-xs font-semibold mt-3 text-white/90">{ad.cta}</div>
        <div className="text-[9px] text-white/40 mt-1">Annuncio sponsorizzato</div>
      </a>
    );
  }

  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-gradient-to-r ${ad.bg} text-white rounded-xl px-5 py-4 cursor-pointer hover:opacity-95 transition-opacity no-underline w-full`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-sm">{ad.title}</span>
            <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 hidden sm:inline">{ad.tag}</span>
          </div>
          <p className="text-xs text-white/80 truncate">{ad.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <span className="text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 whitespace-nowrap">
          {ad.cta}
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      </div>
    </a>
  );
}

const TRIP_AD = {
  title: "🏨 Alloggi vicino al lavoro",
  desc: "Trip.com — Trova casa o hotel in tutta Italia a prezzi imbattibili",
  cta: "Cerca alloggio →",
  bg: "from-sky-500 to-blue-700",
  url: "https://www.trip.com/hotels/w/home?Allianceid=9177127&SID=323668773&trip_sub1=Lavoro8.com&trip_sub3=D18560026",
  tag: "Offerte esclusive",
};

const SAFETYWING_AD = {
  title: "🩺 Assicurazione sanitaria per lavoratori all'estero",
  desc: "SafetyWing — Copertura medica flessibile in tutta Europa, attivazione in 5 minuti",
  cta: "Scopri ora →",
  bg: "from-teal-500 to-cyan-600",
  // ACTIVE — real ambassador link
  url: "https://safetywing.com/?referenceID=26559928&utm_source=26559928&utm_medium=Ambassador",
  tag: "Copertura immediata",
};

export function FeaturedAd({ variant = "horizontal", ad: adProp = "trip" }: { variant?: "horizontal" | "square"; ad?: "trip" | "safetywing" }) {
  const ad = adProp === "safetywing" ? SAFETYWING_AD : TRIP_AD;

  if (variant === "square") {
    return (
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col justify-between bg-gradient-to-br ${ad.bg} text-white rounded-2xl p-6 cursor-pointer hover:opacity-95 transition-opacity h-full min-h-[180px] no-underline`}
      >
        <div>
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm bg-white/20 rounded-full px-3 py-1 font-medium">{ad.tag}</span>
            <ExternalLink className="w-4 h-4 opacity-60" />
          </div>
          <p className="font-bold text-xl leading-tight mb-2">{ad.title}</p>
          <p className="text-sm text-white/80 leading-relaxed">{ad.desc}</p>
        </div>
        <div className="text-sm font-semibold mt-4 text-white/90">{ad.cta}</div>
        <div className="text-[10px] text-white/40 mt-1">Annuncio sponsorizzato</div>
      </a>
    );
  }

  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-gradient-to-r ${ad.bg} text-white rounded-2xl px-6 py-6 sm:px-8 sm:py-7 cursor-pointer hover:opacity-95 transition-opacity no-underline w-full shadow-lg`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold text-lg sm:text-xl">{ad.title}</span>
            <span className="text-xs bg-white/20 rounded-full px-2.5 py-1 hidden sm:inline">{ad.tag}</span>
          </div>
          <p className="text-sm text-white/80 truncate">{ad.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <span className="text-sm font-semibold bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2.5 whitespace-nowrap">
          {ad.cta}
        </span>
        <ExternalLink className="w-4 h-4 opacity-60" />
      </div>
    </a>
  );
}

export function AdBanner({ slot, variant = "horizontal" }: { slot: string; variant?: "horizontal" | "square" }) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [adsenseLoaded, setAdsenseLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && Array.isArray(window.adsbygoogle)) {
        setAdsenseLoaded(true);
        if (!pushed.current) {
          pushed.current = true;
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (_) {}
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full my-4">
      {adsenseLoaded ? (
        <div className="flex justify-center">
          <ins
            ref={ref}
            className="adsbygoogle"
            style={{ display: "block", minHeight: "90px", width: "100%" }}
            data-ad-client={PUBLISHER_ID}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <SponsorBanner variant={variant} />
      )}
    </div>
  );
}
