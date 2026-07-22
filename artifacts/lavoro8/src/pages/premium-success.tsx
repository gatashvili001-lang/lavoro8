import { NavBar } from "@/components/layout/navbar";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/lang-context";

export default function PremiumSuccessPage() {
  const { tr } = useLang();
  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-green-50/40 to-background">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            {tr("premiumSuccessTitle") || "Payment successful!"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {tr("premiumSuccessDesc") || "Welcome to Premium! Your subscription is now active. You can post unlimited jobs and manage applications from your dashboard."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/publish-job"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Post a job <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 border border-border hover:bg-muted text-foreground font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse jobs
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
