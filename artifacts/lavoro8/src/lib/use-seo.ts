import { useEffect } from "react";
import { LANGUAGES } from "./i18n";

const SITE_URL = "https://lavoro8.com";
const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;

export type SeoOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: string;
};

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, attrName, attrValue] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (attrName && attrValue) el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function clearHreflangLinks() {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
}

function setHreflangLinks(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  const entries: { hreflang: string; href: string }[] = [
    { hreflang: "x-default", href: url },
    ...LANGUAGES.map((l) => ({
      hreflang: l.code,
      href: `${url}${separator}lang=${l.code}`,
    })),
  ];

  for (const { hreflang, href } of entries) {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  }
}

export function useSeo({ title, description, path, image, noindex, type }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes("lavoro8.com") ? title : `${title} — lavoro8.com`;
    document.title = fullTitle;

    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    const langParam = new URLSearchParams(window.location.search).get("lang");
    const hasValidLang = LANGUAGES.some((l) => l.code === langParam);
    const canonicalUrl = hasValidLang
      ? `${url}${url.includes("?") ? "&" : "?"}lang=${langParam}`
      : url;
    const ogImage = image ?? DEFAULT_IMAGE;

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }

    setMeta('meta[name="robots"]', "content", noindex ? "noindex, follow" : "index, follow");
    setLink("canonical", canonicalUrl);
    clearHreflangLinks();
    if (!noindex) setHreflangLinks(url);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:type"]', "content", type ?? "website");
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:image"]', "content", ogImage);
  }, [title, description, path, image, noindex, type]);
}
