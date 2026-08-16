import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";
import QuickHealthScan from "../components/QuickHealthScan";
import { recentScans, pageMeta } from "../data/mockData";

const riskStyles = {
  Low: "bg-success/10 text-success",
  Moderate: "bg-warning/10 text-warning",
  High: "bg-danger/10 text-danger",
};

export default function HealthScan() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta["health-scan"]} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <QuickHealthScan />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-xl2 border border-border bg-white p-6 shadow-card lg:col-span-2"
        >
          <h3 className="font-display text-[16px] font-semibold text-navy">Recent Scans</h3>
          <div className="mt-4 divide-y divide-border">
            {recentScans.map((s) => (
              <div key={s.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07]">
                  <FileText size={16} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-navy">{s.name}</p>
                  <p className="text-[11.5px] text-muted">{s.type} • {s.date}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${riskStyles[s.risk]}`}>
                  {s.risk} Risk
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
