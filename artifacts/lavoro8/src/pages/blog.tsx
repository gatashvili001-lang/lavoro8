import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { useSeo } from "@/lib/use-seo";

export default function BlogPage() {
  const { tr, lang } = useLang();

  useSeo({
    title: "Blog",
    description: "Guide pratiche per trovare lavoro in Italia e in Europa, per ogni nazionalità: documenti, settori più richiesti, stipendi medi e consigli utili.",
    path: "/blog",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {tr("homepageLabel")}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">Blog lavoro8.com</h1>
          <p className="text-muted-foreground">
            Guide pratiche per trovare lavoro in Italia e in Europa, per ogni nazionalità.
          </p>
        </div>

        <div className="grid gap-5">
          {BLOG_POSTS.map((post) => {
            const title = post.title[lang] ?? post.title.it;
            const excerpt = post.excerpt[lang] ?? post.excerpt.it;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="bg-background border rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{post.flag}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString(lang)}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold font-display mb-1.5">{title}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{excerpt}</p>
                  <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                    Leggi di più <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
