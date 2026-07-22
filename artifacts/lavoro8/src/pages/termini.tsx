import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
import { useSeo } from "@/lib/use-seo";
import { useLang } from "@/lib/lang-context";

export default function TerminiPage() {
  const { tr } = useLang();

  useSeo({
    title: tr("termsSeoTitle"),
    description: tr("termsSeoDescription"),
    path: "/termini",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {tr("homeLink")}
        </Link>

        <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">{tr("termsTitle")}</h1>
              <p className="text-sm text-muted-foreground">{tr("termsUpdated")}</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms1Title")}</h2>
              <p>{tr("terms1Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms2Title")}</h2>
              <p>{tr("terms2Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms3Title")}</h2>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{tr("terms3Item1")}</li>
                <li>{tr("terms3Item2")}</li>
                <li>{tr("terms3Item3")}</li>
                <li>{tr("terms3Item4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms4Title")}</h2>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{tr("terms4Item1")}</li>
                <li>{tr("terms4Item2")}</li>
                <li>{tr("terms4Item3")}</li>
                <li>{tr("terms4Item4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms5Title")}</h2>
              <p>{tr("terms5BodyPart1")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms6Title")}</h2>
              <p>{tr("terms6BodyPre")} <Link href="/pricing" className="text-primary hover:underline">{tr("terms6PricingLinkLabel")}</Link>. {tr("terms6BodyPost")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms7Title")}</h2>
              <p>{tr("terms7Intro")}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{tr("terms7Item1")}</li>
                <li>{tr("terms7Item2")}</li>
                <li>{tr("terms7Item3")}</li>
                <li>{tr("terms7Item4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms8Title")}</h2>
              <p>{tr("terms8Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms9Title")}</h2>
              <p>{tr("terms9Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms10Title")}</h2>
              <p>{tr("terms10Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("terms11Title")}</h2>
              <p>{tr("terms11BodyPre")} <a href="mailto:info@lavoro8.com" className="text-primary hover:underline">info@lavoro8.com</a></p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
