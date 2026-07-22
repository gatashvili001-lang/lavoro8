import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useUser } from "@clerk/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Briefcase,
  Newspaper,
  Crown,
  Building2,
  UserCircle,
  LogIn,
  UserPlus,
  Warehouse,
  HeartHandshake,
  Sparkles,
  Baby,
  Bike,
  UtensilsCrossed,
  BedDouble,
  HardHat,
  Wheat,
  Info,
  Mail,
  ClipboardList,
} from "lucide-react";
import { useLang } from "@/lib/lang-context";

const CATEGORY_KEYS: Record<string, string> = {
  Magazzino: "catMagazzino", Logistica: "catLogistica", Rider: "catRider",
  Ristorante: "catRistorante", Hotel: "catHotel", Badante: "catBadante", Colf: "catColf",
  "Baby-sitter": "catBabysitter", Edilizia: "catEdilizia", Agricoltura: "catAgricoltura",
};

const CATEGORIES: { key: string; icon: typeof Warehouse }[] = [
  { key: "Magazzino", icon: Warehouse },
  { key: "Logistica", icon: Briefcase },
  { key: "Rider", icon: Bike },
  { key: "Ristorante", icon: UtensilsCrossed },
  { key: "Hotel", icon: BedDouble },
  { key: "Badante", icon: HeartHandshake },
  { key: "Colf", icon: Sparkles },
  { key: "Baby-sitter", icon: Baby },
  { key: "Edilizia", icon: HardHat },
  { key: "Agricoltura", icon: Wheat },
];

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, isLoaded } = useUser();
  const { tr } = useLang();

  function isActive(path: string) {
    return location === path || location.startsWith(path + "/");
  }

  function close() {
    setOpen(false);
  }

  const itemCls = (active: boolean) =>
    `flex items-center gap-3 text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
      active ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-muted"
    }`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Menu"
          className="fixed left-3 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col overflow-y-auto">
        <div className="px-4 pt-5 pb-3 border-b">
          <Link href="/" onClick={close} className="font-display font-bold text-xl tracking-tight text-primary flex items-center gap-0.5">
            lavoro8<span className="text-amber-500">.com</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-3">
          <Link href="/jobs" onClick={close} className={itemCls(isActive("/jobs"))}>
            <Briefcase className="w-4 h-4" /> {tr("allJobs")}
          </Link>
          <Link href="/blog" onClick={close} className={itemCls(isActive("/blog"))}>
            <Newspaper className="w-4 h-4" /> Blog
          </Link>
          <Link href="/pricing" onClick={close} className={itemCls(isActive("/pricing"))}>
            <Crown className="w-4 h-4 text-amber-500" /> Premium
          </Link>
          <Link href="/aziende" onClick={close} className={itemCls(isActive("/aziende"))}>
            <Building2 className="w-4 h-4" /> {tr("companiesNavLabel2")}
          </Link>
          <Link href="/pubblica" onClick={close} className={itemCls(isActive("/pubblica"))}>
            <Briefcase className="w-4 h-4" /> {tr("postJob")}
          </Link>
        </nav>

        <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {tr("categories")}
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-3">
          {CATEGORIES.map(({ key, icon: Icon }) => (
            <Link
              key={key}
              href={`/jobs?category=${encodeURIComponent(key)}`}
              onClick={close}
              className={itemCls(false)}
            >
              <Icon className="w-4 h-4" /> {tr(CATEGORY_KEYS[key] ?? key)}
            </Link>
          ))}
        </nav>

        <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {tr("account")}
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-3">
          {isLoaded && user ? (
            <>
              <Link href="/my-applications" onClick={close} className={itemCls(isActive("/my-applications"))}>
                <ClipboardList className="w-4 h-4" /> {tr("myApplications") || "Le mie candidature"}
              </Link>
              <Link href="/profilo" onClick={close} className={itemCls(isActive("/profilo"))}>
                <UserCircle className="w-4 h-4" /> {tr("profile") || "Profilo"}
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={close} className={itemCls(isActive("/sign-in"))}>
                <LogIn className="w-4 h-4" /> {tr("signIn")}
              </Link>
              <Link href="/sign-up" onClick={close} className={itemCls(isActive("/sign-up"))}>
                <UserPlus className="w-4 h-4" /> {tr("signUp")}
              </Link>
            </>
          )}
        </nav>

        <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {tr("info")}
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-4">
          <Link href="/about" onClick={close} className={itemCls(isActive("/about"))}>
            <Info className="w-4 h-4" /> {tr("about")}
          </Link>
          <Link href="/contact" onClick={close} className={itemCls(isActive("/contact"))}>
            <Mail className="w-4 h-4" /> {tr("contact")}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
