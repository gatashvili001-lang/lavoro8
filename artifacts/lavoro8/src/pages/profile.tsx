import { useUser, useClerk, Show } from "@clerk/react";
import { NavBar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useLocation } from "wouter";
import {
  MapPin, Building2, Calendar, Briefcase, LogOut, User,
  Pencil, Settings, FileText, MessageSquare, Flag, X, CheckCircle,
  ChevronRight, ExternalLink, ArrowLeft, Star, Camera,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useLang } from "@/lib/lang-context";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CvUpload } from "@/components/cv-upload";
import { useSeo } from "@/lib/use-seo";
import { loadApplications } from "@/lib/local-applications";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function useProfileSeo() {
  const { tr } = useLang();
  useSeo({
    title: tr("myProfileTitle"),
    description: tr("myProfileDescription"),
    noindex: true,
  });
}

type MyApplication = {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  cvUrl: string | null;
  status: string;
  createdAt: string;
  jobTitle: string | null;
  jobCity: string | null;
  jobCompany: string | null;
  jobCategory: string | null;
};

type Tab = "applications" | "settings";
type SettingsSection = "main" | "edit" | "cv" | "feedback" | "report";

function timeAgo(dateStr: string, tr: (k: string) => string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return tr("timeToday");
  if (diff === 1) return tr("timeYesterday");
  if (diff < 30) return `${diff} ${tr("timeDaysAgo")}`;
  if (diff < 365) return `${Math.floor(diff / 30)} ${tr("timeMonthsAgo")}`;
  return `${Math.floor(diff / 365)} ${tr("timeYearsAgo")}`;
}

const STATUS_COLORS: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800 border-yellow-200",
  viewed:   "bg-blue-100 text-blue-800 border-blue-200",
  replied:  "bg-purple-100 text-purple-800 border-purple-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};
const STATUS_LABELS: Record<string, string> = {
  pending:  "In attesa",
  viewed:   "Visualizzata",
  replied:  "✉️ Risposta ricevuta!",
  accepted: "✅ Accettata!",
  rejected: "Non selezionato",
};

function ApplicationCard({ app }: { app: MyApplication }) {
  const { tr } = useLang();
  const [, navigate] = useLocation();
  const status = app.status ?? "pending";
  const statusColor = STATUS_COLORS[status] ?? STATUS_COLORS.pending;
  const statusLabel = STATUS_LABELS[status] ?? "In attesa";
  const hasNewMessage = status === "replied" || status === "accepted";

  return (
    <div
      className="bg-background rounded-xl border p-5 hover:shadow-md transition-all hover:border-primary/30 group cursor-pointer"
      onClick={() => navigate(`/my-applications/${app.id}`)}
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-xl">
          {app.jobCategory === "Rider" ? "🛵" :
           app.jobCategory === "Ristorante" ? "🍽️" :
           app.jobCategory === "Hotel" ? "🏨" :
           app.jobCategory === "Edilizia" ? "🏗️" :
           app.jobCategory === "Magazzino" ? "📦" :
           app.jobCategory === "Logistica" ? "🚛" : "💼"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
            {app.jobTitle ?? tr("listingRemoved")}
          </p>
          <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
            {app.jobCompany && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />{app.jobCompany}
              </span>
            )}
            {app.jobCity && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />{app.jobCity}
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${statusColor}`}>
            {statusLabel}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs gap-1 border-primary/30 hover:bg-primary/5 text-primary font-semibold"
          onClick={(e) => { e.stopPropagation(); navigate(`/my-applications/${app.id}`); }}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Chat con l'Azienda
        </Button>
      </div>
    </div>
  );
}

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const { tr } = useLang();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState((user?.unsafeMetadata?.phone as string) ?? "");
  const [newEmail, setNewEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [emailStep, setEmailStep] = useState<"idle" | "code">("idle");
  const [verifyCode, setVerifyCode] = useState("");
  const [pendingEmailId, setPendingEmailId] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    setError("");
    try {
      await user?.setProfileImage({ file });
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? tr("photoUploadError"));
    } finally {
      setPhotoUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      await user?.update({ firstName, lastName });
      await user?.updateMetadata({ unsafeMetadata: { ...user.unsafeMetadata, phone } });
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 1200);
    } catch (e: any) {
      setError(e?.errors?.[0]?.message ?? tr("genericError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleAddEmail() {
    if (!newEmail.trim()) return;
    const trimmed = newEmail.trim().toLowerCase();
    const alreadyLinked = user?.emailAddresses.some(
      e => e.emailAddress.toLowerCase() === trimmed
    );
    if (alreadyLinked) {
      setError(tr("emailAlreadyLinked"));
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await user?.createEmailAddress({ email: newEmail.trim() });
      setPendingEmailId(res?.id ?? null);
      await res?.prepareVerification({ strategy: "email_code" });
      setEmailStep("code");
    } catch (e: any) {
      const msg = e?.errors?.[0]?.longMessage ?? e?.errors?.[0]?.message ?? tr("genericError");
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleVerifyEmail() {
    if (!pendingEmailId || !verifyCode.trim()) return;
    setSaving(true);
    setError("");
    try {
      const emailObj = user?.emailAddresses.find(e => e.id === pendingEmailId);
      await emailObj?.attemptVerification({ code: verifyCode.trim() });
      await user?.update({ primaryEmailAddressId: pendingEmailId });
      setEmailStep("idle");
      setNewEmail("");
      setVerifyCode("");
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 1200);
    } catch (e: any) {
      setError(e?.errors?.[0]?.message ?? tr("invalidCode"));
    } finally {
      setSaving(false);
    }
  }

  const currentEmail = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-sm p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg font-display">{tr("editProfile")}</h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo upload */}
        <div className="flex items-center gap-4 mb-5 p-3 bg-muted/30 rounded-xl border">
          <div className="relative shrink-0">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="foto" className="w-14 h-14 rounded-xl object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                {(user?.firstName?.[0] ?? user?.emailAddresses[0]?.emailAddress?.[0] ?? "U").toUpperCase()}
              </div>
            )}
            {photoUploading && (
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium mb-0.5">{tr("photoProfile")}</p>
            <p className="text-xs text-muted-foreground">{tr("photoFormat")}</p>
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => photoInputRef.current?.click()}
            disabled={photoUploading}
            className="shrink-0"
          >
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            {photoUploading ? "..." : tr("changePicture")}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">{tr("firstName")}</label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">{tr("lastName")}</label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">{tr("phone")}</label>
            <Input type="tel" placeholder="+39 333 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2 mt-5 mb-5">
          <Button variant="outline" className="flex-1" onClick={onClose}>{tr("cancel")}</Button>
          <Button className="flex-1" onClick={handleSave} disabled={saving}>
            {saved ? <><CheckCircle className="w-4 h-4 mr-1" /> {tr("savedLabel")}</> : saving ? "..." : tr("saveChanges")}
          </Button>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{tr("changeEmail")}</p>
          <p className="text-xs text-muted-foreground mb-2">
            {tr("currentEmail")}: <span className="font-medium text-foreground">{currentEmail}</span>
          </p>

          {emailStep === "idle" && (
            <div className="flex gap-2">
              <Input type="email" placeholder={tr("newEmail")} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="flex-1 text-sm" />
              <Button size="sm" variant="outline" onClick={handleAddEmail} disabled={saving || !newEmail.trim()}>
                {saving ? "..." : tr("send")}
              </Button>
            </div>
          )}

          {emailStep === "code" && (
            <div className="space-y-2">
              <p className="text-xs text-blue-600">{tr("emailCodeSent")} {newEmail}</p>
              <div className="flex gap-2">
                <Input placeholder={tr("verificationCode")} value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} className="flex-1 text-sm" />
                <Button size="sm" onClick={handleVerifyEmail} disabled={saving || !verifyCode.trim()}>
                  {saving ? "..." : tr("verify")}
                </Button>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-destructive mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { tr } = useLang();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [section, setSection] = useState<SettingsSection>("main");
  const [cvPath, setCvPath] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [reportText, setReportText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const menuItems = [
    { id: "edit" as SettingsSection, icon: Pencil, label: tr("editProfile"), desc: tr("editProfileDesc") },
    { id: "cv" as SettingsSection, icon: FileText, label: tr("myCV"), desc: tr("cvUploadDesc") },
    { id: "feedback" as SettingsSection, icon: MessageSquare, label: tr("feedback"), desc: tr("feedbackDesc") },
    { id: "report" as SettingsSection, icon: Flag, label: tr("report"), desc: tr("reportDesc") },
  ];

  if (section === "edit") {
    return <EditProfileModal onClose={() => setSection("main")} />;
  }

  if (section === "cv") {
    return (
      <div className="space-y-4">
        <button type="button" onClick={() => setSection("main")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-medium">
          <ArrowLeft className="w-4 h-4" /> {tr("settings")}
        </button>
        <h3 className="font-bold font-display text-lg">{tr("myCV")}</h3>
        <p className="text-sm text-muted-foreground">{tr("cvSectionDesc")}</p>
        {cvPath ? (
          <div className="p-4 border border-green-200 bg-green-50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">{tr("cvUploaded")}</span>
            </div>
            <a href={`${basePath}/api/storage/objects/${cvPath.replace(/^\/objects\//, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> {tr("openLabel")}
            </a>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground p-4 border border-dashed rounded-xl text-center">{tr("noCvUploaded")}</p>
        )}
        <CvUpload onUploaded={(path) => setCvPath(path)} onClear={() => setCvPath(null)} />
      </div>
    );
  }

  if (section === "feedback") {
    return (
      <div className="space-y-4">
        <button type="button" onClick={() => setSection("main")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-medium">
          <ArrowLeft className="w-4 h-4" /> {tr("settings")}
        </button>
        <h3 className="font-bold font-display text-lg">{tr("feedbackTitle")}</h3>
        <p className="text-sm text-muted-foreground">{tr("feedbackHelpsUs")}</p>
        {feedbackSent ? (
          <div className="flex items-center gap-2 text-green-600 font-medium p-4 bg-green-50 rounded-xl">
            <CheckCircle className="w-5 h-5" /> {tr("thanksForFeedback")}
          </div>
        ) : (
          <>
            <Textarea placeholder={tr("feedbackPlaceholder")} className="min-h-[120px] resize-none" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
            <Button className="w-full" disabled={!feedbackText.trim()} onClick={() => { setFeedbackSent(true); setFeedbackText(""); }}>
              <Star className="w-4 h-4 mr-2" /> {tr("submitFeedback")}
            </Button>
          </>
        )}
      </div>
    );
  }

  if (section === "report") {
    return (
      <div className="space-y-4">
        <button type="button" onClick={() => setSection("main")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-medium">
          <ArrowLeft className="w-4 h-4" /> {tr("settings")}
        </button>
        <h3 className="font-bold font-display text-lg">{tr("reportTitle")}</h3>
        <p className="text-sm text-muted-foreground">{tr("reportSectionDesc")}</p>
        {reportSent ? (
          <div className="flex items-center gap-2 text-green-600 font-medium p-4 bg-green-50 rounded-xl">
            <CheckCircle className="w-5 h-5" /> {tr("reportSent")}
          </div>
        ) : (
          <>
            <Textarea placeholder={tr("reportPlaceholder")} className="min-h-[120px] resize-none" value={reportText} onChange={(e) => setReportText(e.target.value)} />
            <Button variant="destructive" className="w-full" disabled={!reportText.trim()} onClick={() => { setReportSent(true); setReportText(""); }}>
              {tr("submitReport")}
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Language selector */}
      <div className="bg-background border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b bg-muted/30">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tr("language")}</p>
        </div>
        <div className="p-4">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Menu items */}
      <div className="bg-background border rounded-xl overflow-hidden">
        {menuItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors text-left ${
              idx < menuItems.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="bg-background border rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: basePath || "/" })}
          className="w-full flex items-center gap-3 px-4 py-4 hover:bg-destructive/5 transition-colors text-left text-destructive"
        >
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <LogOut className="w-4 h-4 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{tr("logout")}</p>
            <p className="text-xs text-muted-foreground/70">{tr("logoutDesc")}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function ProfileContent() {
  const { user } = useUser();
  const { tr } = useLang();
  const [tab, setTab] = useState<Tab>("applications");
  const [editOpen, setEditOpen] = useState(false);

  useProfileSeo();

  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setApplications(loadApplications() as any[]);
    setIsLoading(false);
  }, []);

  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : user?.emailAddresses[0]?.emailAddress?.split("@")[0] ?? tr("userLabel");

  const initials = user?.firstName
    ? (user.firstName[0] + (user.lastName?.[0] ?? "")).toUpperCase()
    : (user?.emailAddresses[0]?.emailAddress?.[0] ?? "U").toUpperCase();

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "applications", label: tr("myApplicationsTitle"), icon: Briefcase },
    { id: "settings", label: tr("settings"), icon: Settings },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}

      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Card */}
        <div className="bg-background rounded-2xl border shadow-sm overflow-hidden mb-5">
          {/* Gradient header */}
          <div className="h-20 bg-gradient-to-r from-primary to-blue-700 relative">
            <div className="absolute -bottom-8 left-6">
              <div className="relative w-16 h-16">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={displayName}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-background shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-white border-4 border-background flex items-center justify-center text-primary text-2xl font-bold shadow-sm">
                    {initials}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-10 px-6 pb-5 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold font-display text-foreground leading-tight">{displayName}</h1>
              <p className="text-muted-foreground text-sm mt-0.5">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)} className="shrink-0 flex items-center gap-1.5 h-8">
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tr("editProfile")}</span>
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-t">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
                  tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
                {t.id === "applications" && applications && applications.length > 0 && (
                  <span className="bg-primary text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {applications.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {tab === "applications" && (
          <div>
            {isLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />)}
              </div>
            )}
            {!isLoading && applications?.length === 0 && (
              <div className="bg-background rounded-2xl border p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  💼
                </div>
                <h3 className="text-lg font-semibold mb-2">{tr("noApplications")}</h3>
                <p className="text-muted-foreground mb-6 text-sm">{tr("noApplicationsDesc")}</p>
                <Button asChild>
                  <Link href="/jobs">{tr("searchJobs")}</Link>
                </Button>
              </div>
            )}
            {!isLoading && applications && applications.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground mb-3 font-medium">
                  {applications.length} {applications.length !== 1 ? tr("applicationsSentPlural") : tr("applicationsSentSingular")}
                </p>
                <div className="space-y-3">
                  {applications.map(app => <ApplicationCard key={app.id} app={app} />)}
                </div>
              </>
            )}
          </div>
        )}

        {tab === "settings" && <SettingsPanel />}
      </main>
    </div>
  );
}

export default function ProfilePage() {
  const { tr } = useLang();
  return (
    <>
      <Show when="signed-in">
        <ProfileContent />
      </Show>
      <Show when="signed-out">
        <div className="min-h-[100dvh] flex flex-col">
          <NavBar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 text-3xl">
                👤
              </div>
              <h1 className="text-2xl font-bold mb-2">{tr("loginRequiredTitle")}</h1>
              <p className="text-muted-foreground mb-6">{tr("loginRequiredProfileDescription")}</p>
              <div className="flex gap-3 justify-center">
                <Button asChild variant="outline"><Link href="/sign-in">{tr("signIn")}</Link></Button>
                <Button asChild><Link href="/sign-up">{tr("signUp")}</Link></Button>
              </div>
            </div>
          </main>
        </div>
      </Show>
    </>
  );
}
