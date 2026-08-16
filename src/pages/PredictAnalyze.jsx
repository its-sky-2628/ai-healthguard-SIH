import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { analysisTypes, pageMeta } from "../data/mockData";

export default function PredictAnalyze({ onStartAnalysis }) {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta["predict-analyze"]} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {analysisTypes.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              onClick={onStartAnalysis}
              className="group flex items-start gap-4 rounded-xl2 border border-border bg-white p-6 text-left shadow-card transition hover:shadow-card-hover hover:border-primary/30"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-navy">{t.label}</p>
                <p className="mt-1 text-[12.5px] text-muted">{t.desc}</p>
              </div>
              <ArrowRight size={16} className="mt-1 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
