import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { medicalHistory, pageMeta } from "../data/mockData";

const styles = {
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  danger: { icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
  success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
};

export default function MedicalHistory() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta["medical-history"]} />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl2 border border-border bg-white p-6 shadow-card"
      >
        <div className="relative space-y-6 before:absolute before:left-[17px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {medicalHistory.map((h) => {
            const s = styles[h.level];
            const Icon = s.icon;
            return (
              <div key={h.id} className="relative flex gap-4 pl-0">
                <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${s.bg}`}>
                  <Icon size={16} className={s.color} />
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-[11px] font-medium text-muted">{h.date}</p>
                  <p className="mt-0.5 text-[13.5px] font-semibold text-navy">{h.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">{h.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
