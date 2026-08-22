import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";

const STAGES = {
  IDLE: "idle",
  UPLOADING: "uploading",
  ANALYZING: "analyzing",
  GENERATING: "generating",
  DONE: "done",
};

const stageLabel = {
  [STAGES.UPLOADING]: "Uploading...",
  [STAGES.ANALYZING]: "Analyzing with AI...",
  [STAGES.GENERATING]: "Generating risk report...",
};

export default function QuickHealthScan() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [stage, setStage] = useState(STAGES.IDLE);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const runFlow = (name) => {
    setFileName(name);
    setStage(STAGES.UPLOADING);
    setProgress(0);

    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 8));
    }, 90);

    setTimeout(() => {
      clearInterval(progressTimer);
      setProgress(100);
      setStage(STAGES.ANALYZING);
    }, 1300);

    setTimeout(() => setStage(STAGES.GENERATING), 2500);
    setTimeout(() => setStage(STAGES.DONE), 3600);
  };

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    runFlow(files[0].name);
  };

  const reset = () => {
    setStage(STAGES.IDLE);
    setFileName(null);
    setProgress(0);
  };

  const busy = stage === STAGES.UPLOADING || stage === STAGES.ANALYZING || stage === STAGES.GENERATING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl2 border border-border bg-white p-6 shadow-card"
    >
      <h3 className="font-display text-[16px] font-semibold text-navy">Quick Health Scan</h3>
      <p className="mt-1 text-[12.5px] text-muted">
        Upload a medical report or scan to begin AI-assisted analysis.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <AnimatePresence mode="wait">
        {stage === STAGES.IDLE && (
          <motion.button
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`mt-5 flex w-full flex-col items-center justify-center rounded-xl2 border-2 border-dashed px-4 py-10 text-center transition ${
              dragOver ? "border-primary bg-primary/[0.04]" : "border-border hover:border-primary/40 hover:bg-bg"
            }`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/[0.08]">
              <UploadCloud size={20} className="text-primary" />
            </div>
            <p className="mt-3 text-[13.5px] font-semibold text-navy">Upload Report</p>
            <p className="mt-1 text-[11.5px] text-muted">PDF • JPG • PNG supported</p>
          </motion.button>
        )}

        {busy && (
          <motion.div
            key="busy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-xl2 border border-border px-5 py-8 text-center"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/[0.08]">
              <Loader2 size={20} className="animate-spin text-primary" />
            </div>
            <p className="mt-3 truncate text-[12.5px] text-muted">{fileName}</p>
            <p className="mt-1 text-[13.5px] font-semibold text-navy">{stageLabel[stage]}</p>
            <div className="mx-auto mt-4 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-bg">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{
                  width:
                    stage === STAGES.UPLOADING
                      ? `${progress}%`
                      : stage === STAGES.ANALYZING
                      ? "75%"
                      : "92%",
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        )}

        {stage === STAGES.DONE && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-xl2 border border-success/20 bg-success/[0.05] px-5 py-6 text-center"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 size={22} className="text-success" />
            </div>
            <p className="mt-3 text-[13.5px] font-semibold text-navy">Analysis Complete</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-[12px]">
              <span className="flex items-center gap-1 text-muted">
                <FileText size={12} /> {fileName}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[12.5px]">
              <span className="rounded-full bg-success/10 px-2.5 py-1 font-semibold text-success">
                Risk Level: High
              </span>
              <span className="text-muted">Confidence: 94.7%</span>
            </div>
            <button
              onClick={reset}
              className="mt-4 text-[12px] font-medium text-primary hover:underline"
            >
              Upload another report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
