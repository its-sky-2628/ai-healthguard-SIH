import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { diseaseRisks } from "../data/mockData";

const levelStyles = {
  Low: "text-success bg-success/10",
  Moderate: "text-warning bg-warning/10",
  High: "text-danger bg-danger/10",
};

export default function RiskOverview() {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const pct = 0.92;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex h-full flex-col rounded-xl2 border border-border bg-white p-6 shadow-card"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-semibold text-navy">AI Risk Overview</h3>
        <button className="text-[12px] font-medium text-primary hover:underline">View All</button>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative flex h-[132px] w-[132px] items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#EDF1F8" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#16B364"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - pct) }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-[26px] font-bold text-navy">92%</span>
            <span className="text-[10.5px] text-muted">Overall Risk</span>
            <span className="mt-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-success">
              LOW RISK
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {diseaseRisks.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-[13px]">
            <span className="text-navy/80">{d.name}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${levelStyles[d.level]}`}>
              {d.level}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-lg bg-success/[0.06] p-3">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
        <div>
          <p className="text-[12.5px] font-semibold text-navy">No critical risks detected</p>
          <p className="text-[11.5px] text-muted">Keep maintaining your healthy lifestyle.</p>
        </div>
      </div>
    </motion.div>
  );
}
