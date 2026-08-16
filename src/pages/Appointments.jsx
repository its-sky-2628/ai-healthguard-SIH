import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { appointmentsList, pageMeta } from "../data/mockData";

export default function Appointments() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta.appointments} />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl2 border border-border bg-white p-6 shadow-card"
      >
        <div className="divide-y divide-border">
          {appointmentsList.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                <CalendarDays size={17} className="text-primary" />
              </div>
              <div className="min-w-[160px] flex-1">
                <p className="text-[13.5px] font-semibold text-navy">{a.doctor}</p>
                <p className="text-[12px] text-muted">{a.specialty}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-muted">
                <Clock size={13} />
                {a.date} • {a.time}
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  a.status === "Upcoming" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
