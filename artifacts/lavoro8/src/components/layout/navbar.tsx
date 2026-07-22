import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/react";
import { LogOut, Menu, X, Crown } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { useLang } from "@/lib/lang-context";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function NavBar() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { tr } = useLang();

  function handleSignOut() {
    signOut({ redirectUrl: basePath || "/" });
    setMenuOpen(false);
  }

  function isActive(path: string) {
    return location === path || location.startsWith(path + "/");
  }

  const linkCls = (path: string) =>
    `text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-primary border-b-2 border-primary pb-0.5"
        : "text-foreground/70 hover:text-primary"
    }`;

  return (
    <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-display font-bold text-2xl tracking-tight text-primary flex items-center gap-0.5 shrink-0">
          lavoro8<span className="text-amber-500">.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          <Link href="/jobs" className={linkCls("/jobs")}>
            {tr("allJobs")}
          </Link>
          <Link href="/blog" className={linkCls("/blog")}>
            Blog
          </Link>
          {isLoaded && user && (
            <Link href="/profilo" className={linkCls("/profilo")}>
              {tr("myApplications")}
            </Link>
          )}
          <Link href="/pricing" className={`text-sm font-semibold flex items-center gap-1 transition-colors ${isActive("/pricing") ? "text-blue-700" : "text-blue-600 hover:text-blue-800"}`}>
            <Crown className="w-3.5 h-3.5" /> Premium
          </Link>
          <Link href="/aziende" className={linkCls("/aziende")}>
            {tr("companiesNavLabel")}
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/pubblica">{tr("postJob")}</Link>
          </Button>
          {isLoaded && (
            user ? (
              <div className="flex items-center gap-3">
                <Link href="/profilo" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-2 ring-primary/20">
                    {user.firstName?.[0] ?? user.emailAddresses[0]?.emailAddress?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="hidden lg:inline text-sm font-medium">{user.firstName ?? user.emailAddresses[0]?.emailAddress?.split("@")[0]}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  title={tr("signOut")}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/sign-in">{tr("signIn")}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">{tr("signUp")}</Link>
                </Button>
              </div>
            )
          )}
          <LanguageSwitcher />
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-1 shadow-lg">
          <Link
            href="/jobs"
            className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive("/jobs") ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
            onClick={() => setMenuOpen(false)}
          >
            {tr("allJobs")}
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive("/blog") ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/pubblica"
            className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive("/pubblica") ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
            onClick={() => setMenuOpen(false)}
          >
            {tr("postJob")}
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2 transition-colors ${isActive("/pricing") ? "bg-blue-100 text-blue-700" : "text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setMenuOpen(false)}
          >
            <Crown className="w-4 h-4" /> Premium
          </Link>
          <Link
            href="/aziende"
            className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive("/aziende") ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
            onClick={() => setMenuOpen(false)}
          >
            {tr("companiesNavLabel")}
          </Link>
          {isLoaded && user && (
            <Link
              href="/profilo"
              className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive("/profilo") ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
              onClick={() => setMenuOpen(false)}
            >
              {tr("profile")}
            </Link>
          )}
          <div className="py-2 px-3">
            <LanguageSwitcher />
          </div>
          {isLoaded && (
            user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-medium text-destructive text-left py-2.5 px-3 rounded-lg hover:bg-destructive/5 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {tr("signOut")}
              </button>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild variant="outline">
                  <Link href="/sign-in" onClick={() => setMenuOpen(false)}>{tr("signIn")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up" onClick={() => setMenuOpen(false)}>{tr("signUp")}</Link>
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </header>
  );
}
