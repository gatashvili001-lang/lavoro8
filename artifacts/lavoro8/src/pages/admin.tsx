import { useState } from "react";
import { NavBar } from "@/components/layout/navbar";
import { useSeo } from "@/lib/use-seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Users, Star, Briefcase, CheckCircle2, Trash2, Clock, TrendingUp, Mail, MessageCircle, Eye, XCircle, Send, Loader2, ChevronDown } from "lucide-react";
import { customFetch } from "@workspace/api-client-react";
import { 
  useListApplications, 
  useAdminListReviews, 
  getAdminListReviewsQueryKey,
  useApproveReview,
  useDeleteReview,
  getListJobsQueryKey,
  useDeleteJob,
  useGetJobStats,
  useListContactMessages,
} from "@workspace/api-client-react";
import { useOnlineCount } from "@/lib/online";
import { useLiveJobs } from "@/lib/dynamic-jobs";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useSeo({
    title: "Admin",
    description: "Pannello di amministrazione lavoro8.com.",
    noindex: true,
  });

  if (!unlocked) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-gradient-to-br from-blue-950 to-blue-900 items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">lavoro8.com — Restricted access</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === "admin2024") setUnlocked(true);
            else alert("Wrong password");
          }} className="space-y-4">
            <Input 
              type="password" 
              placeholder="Admin password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-center tracking-widest"
              autoFocus
            />
            <Button type="submit" className="w-full h-11 text-base font-semibold">Enter Dashboard</Button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className={`bg-background rounded-xl border p-5 flex items-center gap-4 shadow-sm`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold font-display tabular-nums">{value}</p>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
}

import React from "react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:  { label: "Inviata",         color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  viewed:   { label: "Visualizzata",    color: "bg-blue-100 text-blue-800 border-blue-200" },
  replied:  { label: "Risposta inviata",color: "bg-purple-100 text-purple-800 border-purple-200" },
  accepted: { label: "Accettata",       color: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "Non selezionato", color: "bg-red-100 text-red-700 border-red-200" },
};

function AdminApplicationCard({ app }: { app: any }) {
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const qc = useQueryClient();

  const { data: chatData } = useQuery({
    queryKey: ["admin-chat", app.id],
    queryFn: () => customFetch(`/api/applications/${app.id}/messages`),
    enabled: open,
  });

  const sendMutation = useMutation({
    mutationFn: (text: string) =>
      customFetch(`/api/applications/${app.id}/messages`, {
        method: "POST",
        body: JSON.stringify({ text, senderType: "admin" }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-chat", app.id] });
      setReplyText("");
    },
  });

  const statusMutation = useMutation({
    mutationFn: (status: string) =>
      customFetch(`/api/applications/${app.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });

  const cfg = STATUS_LABELS[(app as any).status ?? "pending"] ?? STATUS_LABELS.pending;
  const messages: any[] = (chatData as any)?.messages ?? [];

  return (
    <div className="border rounded-xl bg-background overflow-hidden">
      <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{app.name}</span>
            <a href={`mailto:${app.email}`} className="text-xs text-blue-600 hover:underline" onClick={e => e.stopPropagation()}>{app.email}</a>
            <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color}`}>{cfg.label}</span>
            {(app as any).status === "replied" && <span className="text-xs font-medium text-purple-700">● Risposta</span>}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Job #{app.jobId} · {app.phone || "—"} · {app.createdAt ? new Date(app.createdAt).toLocaleDateString("it-IT") : ""}
          </div>
          {app.cvUrl && (
            <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-0.5 inline-block" onClick={e => e.stopPropagation()}>
              📄 Download CV
            </a>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="border-t px-4 pb-4 space-y-3">
          <div className="flex flex-wrap gap-1.5 pt-3">
            <span className="text-xs font-medium text-muted-foreground mr-1">Stato:</span>
            {["pending","viewed","replied","accepted","rejected"].map(s => (
              <button
                key={s}
                onClick={() => statusMutation.mutate(s)}
                className={`text-xs px-2 py-0.5 rounded-full border font-medium transition-all ${
                  (app as any).status === s ? STATUS_LABELS[s].color + " ring-2 ring-offset-1 ring-primary/30" : "border-muted text-muted-foreground hover:border-primary/50"
                }`}
              >
                {STATUS_LABELS[s].label}
              </button>
            ))}
          </div>

          {app.message && (
            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Messaggio candidato:</p>
              <p className="whitespace-pre-wrap">{app.message}</p>
            </div>
          )}

          {(app as any).jobEmail && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-amber-800">📤 Inoltra candidatura all'azienda</p>
              <p className="text-xs text-amber-700">
                Azienda: <strong>{(app as any).jobCompany}</strong> · Email: <strong>{(app as any).jobEmail}</strong>
              </p>
              <a
                href={`mailto:${(app as any).jobEmail}?subject=${encodeURIComponent(`Candidatura per ${(app as any).jobTitle || "offerta"} — ${app.name}`)}&body=${encodeURIComponent(
                  `Buongiorno,\n\nLe inoltriamo la candidatura ricevuta tramite lavoro8.com per la posizione "${(app as any).jobTitle || "offerta"}" presso ${(app as any).jobCompany || "la vostra azienda"}.\n\nCandidato: ${app.name}\nEmail: ${app.email}\nTelefono: ${app.phone || "—"}\n${app.message ? `Presentazione: ${app.message}\n` : ""}${app.cvUrl ? `CV: ${app.cvUrl}\n` : ""}\nPer contattare il candidato scriva direttamente all'email sopra indicata o al numero di telefono.\n\nCordiali saluti,\nTeam lavoro8.com`
                )}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md transition-colors"
                onClick={e => e.stopPropagation()}
              >
                <Mail className="w-3.5 h-3.5" /> Apri email per {(app as any).jobCompany}
              </a>
            </div>
          )}

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {messages.map((msg: any) => (
              <div key={msg.id} className={`flex ${msg.senderType === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.senderType === "admin" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {msg.senderType !== "admin" && <p className="text-[10px] font-bold mb-0.5 opacity-60">CANDIDATO</p>}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.attachmentUrl && <a href={msg.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-xs underline block mt-1">📎 Allegato</a>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <Textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Rispondi al candidato..."
              className="resize-none min-h-[60px] text-sm"
              onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { if (replyText.trim()) sendMutation.mutate(replyText.trim()); } }}
            />
            <Button
              size="sm"
              className="self-end"
              disabled={!replyText.trim() || sendMutation.isPending}
              onClick={() => { if (replyText.trim()) sendMutation.mutate(replyText.trim()); }}
            >
              {sendMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminDashboard() {
  const queryClient = useQueryClient();
  const [searchApps, setSearchApps] = useState("");
  const onlineCount = useOnlineCount();
  const onlineData = { online: onlineCount };
  
  const { data: applications, isLoading: appsLoading } = useListApplications();
  const { data: reviews, isLoading: reviewsLoading } = useAdminListReviews();
  const jobs = useLiveJobs();
  const jobsLoading = false;
  const { data: stats } = useGetJobStats();
  const { data: contactMessages, isLoading: contactLoading } = useListContactMessages();

  const approveReview = useApproveReview();
  const deleteReview = useDeleteReview();
  const deleteJob = useDeleteJob();

  const handleApproveReview = (id: number) => {
    approveReview.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getAdminListReviewsQueryKey() })
    });
  };

  const handleDeleteReview = (id: number) => {
    if (!confirm("Delete this review permanently?")) return;
    deleteReview.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getAdminListReviewsQueryKey() })
    });
  };

  const handleDeleteJob = (id: number) => {
    if (!confirm("Delete this job listing permanently?")) return;
    deleteJob.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() })
    });
  };

  const filteredApps = applications?.filter(a =>
    !searchApps ||
    a.name?.toLowerCase().includes(searchApps.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchApps.toLowerCase())
  ) ?? [];

  const pendingReviews = reviews?.filter(r => !r.approved).length ?? 0;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">lavoro8.com management panel</p>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200 text-sm px-3 py-1">
            ● Live
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Job listings" value={jobs?.length ?? 0} icon={Briefcase} color="bg-blue-500" />
          <StatCard label="Applications" value={applications?.length ?? 0} icon={Users} color="bg-green-500" />
          <StatCard label="Reviews pending" value={pendingReviews} icon={Clock} color="bg-amber-500" />
          <StatCard label="Total applications" value={stats?.totalApplications ?? 0} icon={TrendingUp} color="bg-purple-500" />
          <StatCard label="🟢 Online ora" value={onlineData?.online ?? 0} icon={Eye} color="bg-emerald-500" />
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="mb-6 h-11">
            <TabsTrigger value="applications" className="gap-2">
              <Users className="w-4 h-4" /> Applications ({applications?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star className="w-4 h-4" /> Reviews ({reviews?.length ?? 0})
              {pendingReviews > 0 && (
                <span className="bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {pendingReviews}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="w-4 h-4" /> Listings ({jobs?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="w-4 h-4" /> Messages ({contactMessages?.length ?? 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications">
            <div className="bg-background rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4 gap-3">
                <h2 className="text-lg font-bold">Job Applications</h2>
                <Input
                  placeholder="Search by name or email..."
                  className="max-w-xs"
                  value={searchApps}
                  onChange={e => setSearchApps(e.target.value)}
                />
              </div>
              {appsLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />)}
                </div>
              ) : filteredApps.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No applications yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredApps.map(app => (
                    <AdminApplicationCard key={app.id} app={app} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-background rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Reviews Moderation</h2>
              {reviewsLoading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />)}
                </div>
              ) : !reviews || reviews.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No reviews yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Author</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Review</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reviews.map(rev => (
                        <TableRow key={rev.id}>
                          <TableCell className="font-medium">{rev.name}</TableCell>
                          <TableCell>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[280px] truncate text-sm" title={rev.body}>{rev.body}</TableCell>
                          <TableCell>
                            <Badge className={rev.approved ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                              {rev.approved ? "Approved" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {!rev.approved && (
                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleApproveReview(rev.id)}>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Approve
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:bg-destructive/10" onClick={() => handleDeleteReview(rev.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="bg-background rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Job Listings</h2>
              {jobsLoading ? (
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />)}
                </div>
              ) : !jobs || jobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No listings yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map(job => (
                        <TableRow key={job.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-GB") : "-"}
                          </TableCell>
                          <TableCell>
                            <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-600 transition-colors">
                              {job.title}
                            </a>
                          </TableCell>
                          <TableCell className="text-sm">{job.city}</TableCell>
                          <TableCell className="text-sm">{job.country ?? "IT"}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">{job.category}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-green-700 font-medium">
                            {job.salaryMin && job.salaryMin > 0 ? `€${job.salaryMin}–€${job.salaryMax}` : "—"}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost" className="h-7 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteJob(job.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="bg-background rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Contact Messages</h2>
              {contactLoading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />)}
                </div>
              ) : !contactMessages || contactMessages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No messages yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactMessages.map(msg => (
                        <TableRow key={msg.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString("en-GB") : "-"}
                          </TableCell>
                          <TableCell className="font-medium">{msg.name}</TableCell>
                          <TableCell>
                            <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline text-sm">{msg.email}</a>
                          </TableCell>
                          <TableCell className="max-w-[400px] text-sm whitespace-pre-wrap">{msg.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
