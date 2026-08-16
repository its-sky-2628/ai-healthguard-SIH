import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { reportsList, pageMeta } from "../data/mockData";

const riskStyles = {
  Low: "bg-success/10 text-success",
  Moderate: "bg-warning/10 text-warning",
  High: "bg-danger/10 text-danger",
};

export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta.reports} />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-xl2 border border-border bg-white shadow-card"
      >
        <div className="grid grid-cols-12 border-b border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
          <div className="col-span-6">Report</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Risk</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        {reportsList.map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center px-6 py-3.5 hover:bg-bg">
            <div className="col-span-6 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07]">
                <FileText size={15} className="text-primary" />
              </div>
              <p className="truncate text-[13px] font-medium text-navy">{r.name}</p>
            </div>
            <div className="col-span-2 text-[12.5px] text-muted">{r.date}</div>
            <div className="col-span-2">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${riskStyles[r.risk]}`}>
                {r.risk}
              </span>
            </div>
            <div className="col-span-2 text-right">
              <button className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary hover:underline">
                <Download size={13} /> PDF
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
