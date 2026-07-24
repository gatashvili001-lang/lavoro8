import { useState, useEffect } from "react";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";
import { useToast } from "@/hooks/use-toast";
import {
  FileText, Download, Plus, Trash2, User, Briefcase, GraduationCap,
  Award, Globe, Phone, Mail, MapPin, CheckCircle, Printer, Sparkles, ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

interface Experience {
  id: string;
  role: string;
  company: string;
  city: string;
  period: string;
  desc: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

const STORAGE_KEY = "lavoro8_cv_builder_data";

export default function CvBuilderPage() {
  const { tr } = useLang();
  const { toast } = useToast();

  useSeo({
    title: "Crea il tuo CV Europeo (Europass) Gratis — lavoro8.com",
    description: "Crea il tuo Curriculum Vitae in formato Europass in pochi minuti. Download immediato in PDF gratis per candidarsi in Italia ed Europa.",
    path: "/crea-cv",
  });

  // Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("Patente B");
  const [languages, setLanguages] = useState("Italiano (Madrelingua), Inglese (B2)");
  const [summary, setSummary] = useState("");

  // Skills
  const [skills, setSkills] = useState<string[]>([
    "Patentino Muletto / Carrellista",
    "Gestione Magazzino & Scanner",
    "Assistenza Anziani & Cura Persona",
    "Servizio di Sala & Bar",
    "Precisione & Puntualità",
  ]);
  const [newSkill, setNewSkill] = useState("");

  // Experiences
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "exp-1",
      role: "Magazziniere Carrellista",
      company: "DHL Express Hub",
      city: "Piacenza",
      period: "2022 – Presente",
      desc: "Carico/scarico merci, movimentazione bancali con muletto e gestione bolle di accompagnamento.",
    },
  ]);

  // Education
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "edu-1",
      degree: "Diploma di Scuola Superiore / Qualifica Professionale",
      school: "Istituto Tecnico",
      year: "2018",
    },
  ]);

  // Load from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.firstName) setFirstName(data.firstName);
        if (data.lastName) setLastName(data.lastName);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.city) setCity(data.city);
        if (data.birthDate) setBirthDate(data.birthDate);
        if (data.drivingLicense) setDrivingLicense(data.drivingLicense);
        if (data.languages) setLanguages(data.languages);
        if (data.summary) setSummary(data.summary);
        if (Array.isArray(data.skills)) setSkills(data.skills);
        if (Array.isArray(data.experiences)) setExperiences(data.experiences);
        if (Array.isArray(data.educations)) setEducations(data.educations);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  const saveDraft = () => {
    try {
      const payload = {
        firstName, lastName, email, phone, city, birthDate, drivingLicense, languages, summary, skills, experiences, educations
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      toast({ title: "Bozza salvata", description: "I tuoi dati sono stati salvati sul tuo dispositivo." });
    } catch {
      // ignore
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: "exp-" + Date.now(),
        role: "Nuovo Ruolo Lavorativo",
        company: "Nome Azienda",
        city: "Città",
        period: "2021 – 2023",
        desc: "Descrizione delle mansioni svolte e responsabilità principali.",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: "edu-" + Date.now(),
        degree: "Qualifica / Attestato",
        school: "Nome Istituto / Ente",
        year: "2020",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handlePrint = () => {
    saveDraft();
    window.print();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <div className="print:hidden">
        <NavBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header navigation bar */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-1 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Torna alla Home
            </Link>
            <h1 className="text-3xl font-bold font-display text-foreground flex items-center gap-2">
              <FileText className="w-7 h-7 text-primary" />
              Crea il tuo CV Europeo Gratis
            </h1>
            <p className="text-sm text-muted-foreground">Compila i tuoi dati e scarica istantaneamente il tuo Curriculum Vitae in PDF.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={saveDraft} className="gap-1.5">
              Salva Bozza
            </Button>
            <Button onClick={handlePrint} className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold">
              <Download className="w-4 h-4" /> Scarica CV in PDF
            </Button>
          </div>
        </div>

        {/* Layout Grid: Form (Left) & Europass Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Form Section */}
          <div className="print:hidden lg:col-span-6 space-y-6">

            {/* 1. Dati Personali */}
            <div className="bg-background rounded-2xl border p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2 border-b pb-3">
                <User className="w-5 h-5 text-primary" /> Dati Personali
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Nome *</label>
                  <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="es. Mario" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Cognome *</label>
                  <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="es. Rossi" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Email *</label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="mario.rossi@gmail.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Telefono / WhatsApp *</label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+39 340 1234567" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Città ed Indirizzo *</label>
                  <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Milano (MI)" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Patente di Guida</label>
                  <Input value={drivingLicense} onChange={e => setDrivingLicense(e.target.value)} placeholder="Patente B / Auto propria" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Lingue Parlate</label>
                <Input value={languages} onChange={e => setLanguages(e.target.value)} placeholder="Italiano (Madrelingua), Inglese (B1), Georgiano" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Presentazione Sintetica</label>
                <Textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="Breve sintesi del tuo profilo professionale e disponibilità lavorativa..." className="mt-1 min-h-[70px]" />
              </div>
            </div>

            {/* 2. Esperienze Lavorative */}
            <div className="bg-background rounded-2xl border p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Esperienze Lavorative
                </h2>
                <Button size="sm" variant="outline" onClick={addExperience} className="gap-1 h-8 text-xs">
                  <Plus className="w-3.5 h-3.5" /> Aggiungi
                </Button>
              </div>

              {experiences.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-xl bg-muted/20 relative space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Esperienza #{index + 1}</span>
                    {experiences.length > 1 && (
                      <button onClick={() => removeExperience(exp.id)} className="text-destructive hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={exp.role} onChange={e => updateExperience(exp.id, "role", e.target.value)} placeholder="Ruolo / Mansione" />
                    <Input value={exp.company} onChange={e => updateExperience(exp.id, "company", e.target.value)} placeholder="Nome Azienda" />
                    <Input value={exp.city} onChange={e => updateExperience(exp.id, "city", e.target.value)} placeholder="Città" />
                    <Input value={exp.period} onChange={e => updateExperience(exp.id, "period", e.target.value)} placeholder="Periodo (es. 2021-2023)" />
                  </div>
                  <Textarea value={exp.desc} onChange={e => updateExperience(exp.id, "desc", e.target.value)} placeholder="Descrizione mansioni e risultati..." className="min-h-[60px]" />
                </div>
              ))}
            </div>

            {/* 3. Istruzione & Formazione */}
            <div className="bg-background rounded-2xl border p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> Istruzione & Attestati
                </h2>
                <Button size="sm" variant="outline" onClick={addEducation} className="gap-1 h-8 text-xs">
                  <Plus className="w-3.5 h-3.5" /> Aggiungi
                </Button>
              </div>

              {educations.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-xl bg-muted/20 relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Istruzione #{index + 1}</span>
                    {educations.length > 1 && (
                      <button onClick={() => removeEducation(edu.id)} className="text-destructive hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input value={edu.degree} onChange={e => updateEducation(edu.id, "degree", e.target.value)} placeholder="Titolo di studio / Attestato" className="col-span-2" />
                    <Input value={edu.year} onChange={e => updateEducation(edu.id, "year", e.target.value)} placeholder="Anno" />
                  </div>
                  <Input value={edu.school} onChange={e => updateEducation(edu.id, "school", e.target.value)} placeholder="Istituto / Ente formativo" />
                </div>
              ))}
            </div>

            {/* 4. Competenze & Qualifiche */}
            <div className="bg-background rounded-2xl border p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2 border-b pb-3">
                <Award className="w-5 h-5 text-primary" /> Competenze & Qualifiche
              </h2>
              <div className="flex gap-2">
                <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Aggiungi una competenza (es. HACCP, Muletto)..." />
                <Button onClick={addSkill} size="sm" variant="secondary" className="shrink-0 font-semibold">
                  Aggiungi
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map(s => (
                  <Badge key={s} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200">
                    {s}
                    <button onClick={() => removeSkill(s)} className="text-muted-foreground hover:text-destructive">×</button>
                  </Badge>
                ))}
              </div>
            </div>

          </div>

          {/* Right Europass Preview & Printable Sheet */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-white rounded-2xl border shadow-xl p-8 text-slate-800 space-y-6 print:shadow-none print:border-none print:p-0 print:m-0" id="europass-cv-printable">
              
              {/* Europass Header Bar */}
              <div className="border-b-2 border-blue-900 pb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-blue-900 uppercase tracking-tight">
                    {firstName || "NOME"} {lastName || "COGNOME"}
                  </h2>
                  <p className="text-sm font-semibold text-blue-700 mt-1 uppercase tracking-wide">
                    {experiences[0]?.role || "CURRICULUM VITAE EUROPASS"}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono">
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-bold">EUROPASS FORMAT</span>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                {email && (
                  <div className="flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="truncate">{email}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{phone}</span>
                  </div>
                )}
                {city && (
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{city}</span>
                  </div>
                )}
                {drivingLicense && (
                  <div className="flex items-center gap-1.5 font-medium">
                    <Award className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{drivingLicense}</span>
                  </div>
                )}
              </div>

              {/* Summary */}
              {summary && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b pb-1">Profilo Professionale</h3>
                  <p className="text-xs text-slate-600 leading-relaxed italic">{summary}</p>
                </div>
              )}

              {/* Work Experiences */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b pb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Esperienza Professionale
                </h3>
                <div className="space-y-3">
                  {experiences.map(exp => (
                    <div key={exp.id} className="text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{exp.role} — <span className="text-blue-800">{exp.company}</span> ({exp.city})</span>
                        <span className="text-[11px] text-slate-500 font-mono">{exp.period}</span>
                      </div>
                      <p className="text-slate-600 leading-normal">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b pb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Istruzione e Formazione
                </h3>
                <div className="space-y-2">
                  {educations.map(edu => (
                    <div key={edu.id} className="text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{edu.degree}</span>
                        <span className="text-slate-500 ml-1">({edu.school})</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Languages */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">Competenze Principali</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map(s => (
                      <span key={s} className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">Conoscenze Linguistiche</h3>
                  <p className="text-xs text-slate-700 font-medium">{languages}</p>
                </div>
              </div>

              {/* GDPR Disclaimer */}
              <div className="pt-4 border-t text-[10px] text-slate-400 leading-tight">
                Autorizzo il trattamento dei miei dati personali presenti nel curriculum vitae ai sensi del Decreto Legislativo 30 giugno 2003, n. 196 e del GDPR (Regolamento UE 2016/679).
              </div>
            </div>
          </div>

        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
