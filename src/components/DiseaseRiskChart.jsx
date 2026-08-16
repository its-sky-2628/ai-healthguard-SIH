import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { diseaseDistribution } from "../data/mockData";

const ranges = ["This Month", "Last 3 Months", "This Year"];

export default function DiseaseRiskChart() {
  const [range, setRange] = useState("This Month");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-xl2 border border-border bg-white p-6 shadow-card"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-semibold text-navy">Disease Risk Distribution</h3>
        <div className="relative">
          <button
            onClick={() => setOpenMenu((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-navy/80 hover:bg-bg"
          >
            {range}
            <ChevronDown size={13} className="text-muted" />
          </button>
          {openMenu && (
            <div className="absolute right-0 top-9 z-10 w-40 rounded-lg border border-border bg-white py-1 shadow-card-hover">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRange(r);
                    setOpenMenu(false);
                  }}
                  className={`block w-full px-3 py-1.5 text-left text-[12.5px] hover:bg-bg ${
                    r === range ? "text-primary font-medium" : "text-navy/80"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {diseaseDistribution.map((d, i) => (
          <div key={d.name}>
            <div className="mb-1.5 flex items-center justify-between text-[13px]">
              <span className="font-medium text-navy/85">{d.name}</span>
              <span className="font-semibold text-navy">{d.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-bg">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${d.value}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
