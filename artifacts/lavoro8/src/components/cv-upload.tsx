import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useLang } from "@/lib/lang-context";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

type CvUploadProps = {
  onUploaded: (objectPath: string) => void;
  onClear: () => void;
};

export function CvUpload({ onUploaded, onClear }: CvUploadProps) {
  const { tr } = useLang();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [fileName, setFileName] = useState("");

  async function handleFile(file: File) {
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setFileName(file.name);

    try {
      const urlRes = await fetch(`${basePath}/api/storage/uploads/request-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
      });

      if (!urlRes.ok) throw new Error("URL request failed");
      const { uploadURL, objectPath } = await urlRes.json();

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      setStatus("done");
      onUploaded(objectPath);
    } catch {
      setStatus("error");
    }
  }

  function handleClear() {
    setStatus("idle");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
    onClear();
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic,.webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {status === "idle" && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground text-center">
            {tr("cvLabel")}
          </span>
        </button>
      )}

      {status === "uploading" && (
        <div className="w-full border rounded-xl p-4 flex items-center gap-3 bg-muted/30">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-sm text-muted-foreground">{tr("cvUploading")}</span>
        </div>
      )}

      {status === "done" && (
        <div className="w-full border border-green-200 rounded-xl p-4 flex items-center justify-between gap-3 bg-green-50">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-700">{tr("cvUploaded")}</p>
              <p className="text-xs text-green-600 truncate max-w-48">{fileName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="w-full border border-destructive/30 rounded-xl p-4 flex items-center justify-between gap-3 bg-destructive/5">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-destructive shrink-0" />
            <span className="text-sm text-destructive">{tr("cvUploadError")}</span>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
