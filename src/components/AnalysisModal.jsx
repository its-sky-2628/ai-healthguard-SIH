import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { analysisTypes } from "../data/mockData";

export default function AnalysisModal({ open, onClose }) {
  const [selected, setSelected] = useState("full");
  const [stage, setStage] = useState("select"); // select | processing | done

  const handleClose = () => {
    onClose();
    setTimeout(() => setStage("select"), 300);
  };

  const handleContinue = () => {
    setStage("processing");
    setTimeout(() => setStage("done"), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl2 bg-white p-6 shadow-hero"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[16px] font-semibold text-navy">
                {stage === "done" ? "Analysis Complete" : "Select Analysis Type"}
              </h3>
              <button onClick={handleClose} className="text-muted hover:text-navy">
                <X size={18} />
              </button>
            </div>

            {stage === "select" && (
              <>
                <div className="mt-5 space-y-2">
                  {analysisTypes.map((t) => {
                    const Icon = t.icon;
                    const active = selected === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setSelected(t.id)}
                        className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                          active ? "border-primary bg-primary/[0.05]" : "border-border hover:bg-bg"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            active ? "border-primary" : "border-border"
                          }`}
                        >
                          {active && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </span>
                        <Icon size={16} className={active ? "text-primary" : "text-muted"} />
                        <span className={`text-[13.5px] font-medium ${active ? "text-navy" : "text-navy/80"}`}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleContinue}
                  className="mt-6 w-full rounded-lg bg-primary py-3 text-[13.5px] font-semibold text-white transition hover:bg-primary-dark"
                >
                  Continue
                </button>
              </>
            )}

            {stage === "processing" && (
              <div className="flex flex-col items-center py-10 text-center">
                <Loader2 size={28} className="animate-spin text-primary" />
                <p className="mt-4 text-[13.5px] font-medium text-navy">Running AI-assisted analysis...</p>
                <p className="mt-1 text-[12px] text-muted">This will only take a moment.</p>
              </div>
            )}

            {stage === "done" && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 size={24} className="text-success" />
                </div>
                <p className="mt-4 text-[14px] font-semibold text-navy">Risk Level: Low</p>
                <p className="mt-1 text-[12.5px] text-muted">Model Confidence: 94.7%</p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full rounded-lg border border-border py-2.5 text-[13px] font-medium text-navy hover:bg-bg"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
