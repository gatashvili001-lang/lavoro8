import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useLang } from "@/lib/lang-context";

type CvUploadProps = {
  onUploaded: (objectPath: string) => void;
  onClear: () => void;
};

export function CvUpload({ onUploaded, onClear }: CvUploadProps) {
  const { tr } = useLang();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!file) return;

    setStatus("uploading");
    setFileName(file.name);
    const isImg = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|heic|gif|bmp)$/i.test(file.name);
    setIsImage(isImg);

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = (reader.result as string) || `file:${file.name}`;
        setPreviewUrl(isImg ? result : null);
        setStatus("done");
        onUploaded(result);
      };
      reader.onerror = () => {
        // Fallback name if reader fails
        setStatus("done");
        onUploaded(`file:${file.name}`);
      };
      reader.readAsDataURL(file);
    } catch {
      setStatus("done");
      onUploaded(`file:${file.name}`);
    }
  }

  function handleClear() {
    setStatus("idle");
    setFileName("");
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    onClear();
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,.gif,.bmp,image/*,application/pdf,application/msword"
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
          className="w-full border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer bg-background"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-foreground text-center">
            {tr("cvLabel") || "Carica CV o Foto (PDF, DOC, JPG, PNG)"}
          </span>
          <span className="text-xs text-muted-foreground text-center">
            Clicca per selezionare il tuo CV o una foto scattata col telefono
          </span>
        </button>
      )}

      {status === "uploading" && (
        <div className="w-full border rounded-xl p-4 flex items-center gap-3 bg-muted/30">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-sm text-muted-foreground">{tr("cvUploading") || "Elaborazione file in corso..."}</span>
        </div>
      )}

      {status === "done" && (
        <div className="w-full border border-green-300 rounded-xl p-3.5 flex items-center justify-between gap-3 bg-green-50/80">
          <div className="flex items-center gap-3 overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="CV Preview" className="w-10 h-10 object-cover rounded-md border shrink-0 bg-white" />
            ) : isImage ? (
              <ImageIcon className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <FileText className="w-5 h-5 text-green-600 shrink-0" />
            )}
            <div className="truncate">
              <p className="text-xs font-bold text-green-800">{tr("cvUploaded") || "✓ File allegato correttamente!"}</p>
              <p className="text-xs text-green-700 truncate font-mono mt-0.5">{fileName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground p-1 shrink-0 rounded-md hover:bg-green-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="w-full border border-red-200 rounded-xl p-4 flex items-center justify-between gap-3 bg-red-50">
          <span className="text-xs text-red-600 font-medium">
            Errore caricamento. Riprova con un altro file o scatta una foto.
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-red-600 hover:text-red-800 text-xs font-bold underline shrink-0"
          >
            Riprova
          </button>
        </div>
      )}
    </div>
  );
}
