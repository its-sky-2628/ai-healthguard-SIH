import { motion } from "framer-motion";
import { ArrowRight, ScanLine, Sparkles, FileCheck2 } from "lucide-react";

const trustIndicators = [
  { icon: ScanLine, label: "Multi-disease screening" },
  { icon: Sparkles, label: "AI-assisted analysis" },
  { icon: FileCheck2, label: "Explainable results" },
];

export default function HeroSection({ onStartAnalysis }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl2 shadow-hero"
      style={{ background: "linear-gradient(135deg, #111936 0%, #1E3A8A 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-center lg:gap-6 lg:p-10">
        {/* Left */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wider text-ai/90">
            <Sparkles size={12} />
            AI-POWERED
          </span>
          <h1 className="mt-4 font-display text-[26px] font-bold leading-tight text-white sm:text-[30px]">
            Early Disease Detection
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/70">
            Detect potential health risks before symptoms become critical.
          </p>

          <button
            onClick={onStartAnalysis}
            className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
          >
            Start New Analysis
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {trustIndicators.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[12px] text-white/60">
                <Icon size={14} className="text-ai/80" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right visualization */}
        <div className="relative mx-auto flex h-[220px] w-[220px] shrink-0 items-center justify-center sm:h-[240px] sm:w-[240px]">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-6 rounded-full border border-white/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-ai shadow-[0_0_10px_2px_rgba(108,99,255,0.7)]" />
            <span className="absolute bottom-2 right-4 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(49,85,231,0.7)]" />
          </motion.div>

          {/* Human silhouette */}
          <svg
            viewBox="0 0 100 140"
            className="relative h-[150px] w-[110px] opacity-90"
            fill="none"
          >
            <defs>
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3155E7" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="16" r="13" stroke="url(#bodyGrad)" strokeWidth="1.6" />
            <path
              d="M30 42c0-10 9-16 20-16s20 6 20 16v10l6 34-4 40h-10l-4-34h-16l-4 34H28l-4-40 6-34V42z"
              stroke="url(#bodyGrad)"
              strokeWidth="1.6"
            />
            <circle cx="50" cy="58" r="3.2" fill="#6C63FF" fillOpacity="0.9">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <path d="M42 58h16M50 50v16" stroke="#F04438" strokeWidth="1.1" strokeOpacity="0.7" />
          </svg>

          {/* scanning line */}
          <div className="absolute inset-x-6 top-6 h-[150px] overflow-hidden rounded-md">
            <div className="h-6 w-full animate-scan bg-gradient-to-b from-transparent via-ai/25 to-transparent" />
          </div>
        </div>
      </div>

      {/* Floating confidence card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative mx-7 mb-7 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.07] px-5 py-3.5 backdrop-blur-sm sm:absolute sm:bottom-8 sm:right-9 sm:mx-0 sm:mb-0 sm:w-[190px] sm:flex-col sm:items-start sm:gap-0.5"
      >
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-white/50">AI MODEL CONFIDENCE</p>
          <p className="font-display text-[22px] font-bold text-white">94.7%</p>
        </div>
        <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10.5px] font-semibold text-success sm:mt-1.5">
          High Confidence
        </span>
      </motion.div>
    </motion.div>
  );
}
