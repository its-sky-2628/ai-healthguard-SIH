import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { healthAlerts } from "../data/mockData";

const styles = {
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  danger: { icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
  success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
};

export default function HealthAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-xl2 border border-border bg-white p-6 shadow-card"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-semibold text-navy">Health Alerts</h3>
        <button className="text-[12px] font-medium text-primary hover:underline">View All</button>
      </div>

      <div className="mt-4 divide-y divide-border">
        {healthAlerts.map((alert) => {
          const s = styles[alert.level];
          const Icon = s.icon;
          return (
            <div key={alert.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                <Icon size={16} className={s.color} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-navy">{alert.title}</p>
                <p className="truncate text-[11.5px] text-muted">{alert.detail}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted/80">{alert.time}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
