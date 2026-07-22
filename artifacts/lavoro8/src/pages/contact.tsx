import { useState } from "react";
import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";
import { useCreateContactMessage } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { tr } = useLang();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const createContactMessage = useCreateContactMessage();

  useSeo({
    title: tr("contactTitle"),
    description: tr("contactPageDescription"),
    path: "/contact",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContactMessage.mutate({ data: { name, email, message } }, {
      onSuccess: () => setSent(true),
      onError: () => toast({ variant: "destructive", description: tr("contactSendError") }),
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {tr("homepageLabel")}
        </Link>

        <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">{tr("contactTitle")}</h1>
              <p className="text-sm text-muted-foreground">{tr("contactSubtitle")}</p>
            </div>
          </div>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center text-green-800">
              {tr("contactFormSent")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">{tr("contactFormName")}</label>
                <Input required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{tr("contactFormEmail")}</label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{tr("contactFormMessage")}</label>
                <Textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" /> {tr("contactFormSend")}
              </Button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t text-sm text-muted-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {tr("contactEmailLabel")}: <a href="mailto:info@lavoro8.com" className="text-primary hover:underline">info@lavoro8.com</a>
          </div>
        </div>
      </main>
    </div>
  );
}
