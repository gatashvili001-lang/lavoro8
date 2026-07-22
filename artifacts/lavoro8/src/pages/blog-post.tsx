import { useEffect, type ReactElement } from "react";
import { NavBar } from "@/components/layout/navbar";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Languages, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-posts";
import NotFound from "@/pages/not-found";
import { useSeo } from "@/lib/use-seo";

const SITE_URL = "https://lavoro8.com";

function renderBody(body: string) {
  const lines = body.split("\n");
  const blocks: ReactElement[] = [];
  let listItems: { key: string; content: (string | ReactElement)[] }[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1 my-3">
          {listItems.map((item) => (
            <li key={item.key}>{item.content}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const parseInline = (line: string) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part));
  };

  lines.forEach((line, i) => {
    const headingMatch = line.match(/^\*\*(.+?)\*\*$/);
    const bulletMatch = line.match(/^[•\-]\s*(.+)$/);

    if (headingMatch) {
      flushList();
      blocks.push(
        <h2 key={`h2-${i}`} className="text-lg md:text-xl font-bold font-display mt-6 mb-2">
          {headingMatch[1]}
        </h2>
      );
    } else if (bulletMatch) {
      listItems.push({ key: `li-${i}`, content: parseInline(bulletMatch[1]) });
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={`p-${i}`} className="mb-3">
          {parseInline(line)}
        </p>
      );
    }
  });
  flushList();

  return blocks;
}

function getRelatedPosts(currentSlug: string, category: string) {
  const sameCat = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  return [...sameCat, ...others].slice(0, 3);
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { tr, lang, setLang } = useLang();
  const post = slug ? getBlogPost(slug) : undefined;

  useSeo({
    title: post ? (post.title[lang] ?? post.title.it ?? "") : tr("articleNotFoundSeo"),
    description: post ? (post.excerpt[lang] ?? post.excerpt.it ?? "") : undefined,
    path: post ? `/blog/${post.slug}` : undefined,
    noindex: !post,
    type: "article",
  });

  useEffect(() => {
    if (!post) return;

    const title = post.title[lang] ?? post.title.it ?? "";
    const description = post.excerpt[lang] ?? post.excerpt.it;
    const url = `${SITE_URL}/blog/${post.slug}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: lang,
      articleSection: post.category,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      url,
      image: `${SITE_URL}/opengraph.jpg`,
      publisher: {
        "@type": "Organization",
        name: "lavoro8.com",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/opengraph.jpg`,
        },
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    script.dataset.blogSchema = "true";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post, lang]);

  if (!post) return <NotFound />;

  const showingOrigin = lang === post.originLang;
  const title = post.title[lang] ?? post.title.it;
  const body = post.body[lang] ?? post.body.it ?? "";
  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <Link href="/blog" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Blog
        </Link>

        <article className="bg-background border rounded-2xl shadow-sm p-6 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{post.flag}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(lang)}
              </time>
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold font-display mb-6">{title}</h1>

          {!showingOrigin && post.body[post.originLang] && (
            <button
              onClick={() => setLang(post.originLang)}
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5 hover:bg-primary/10 transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              Leggi in {post.originLabel}
            </button>
          )}

          <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
            {renderBody(body)}
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Pronto a candidarti?</p>
            <Link href="/jobs" className="text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors">
              Vedi tutti gli annunci →
            </Link>
          </div>
        </article>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold font-display mb-4">Articoli correlati</h2>
            <div className="grid gap-4">
              {relatedPosts.map((related) => {
                const relTitle = related.title[lang] ?? related.title.it;
                const relExcerpt = related.excerpt[lang] ?? related.excerpt.it;
                return (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <div className="bg-background border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer flex gap-4 items-start">
                      <span className="text-xl shrink-0">{related.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {related.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-1 leading-snug">{relTitle}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{relExcerpt}</p>
                        <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 mt-2">
                          Leggi <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ link */}
        <div className="mt-6 p-5 bg-blue-50 rounded-2xl flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Hai altre domande?</p>
            <p className="text-xs text-muted-foreground">Consulta le nostre risposte alle domande più frequenti.</p>
          </div>
          <Link href="/faq" className="shrink-0 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors">
            FAQ →
          </Link>
        </div>
      </main>
    </div>
  );
}
