import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { aiInsights, pageMeta } from "../data/mockData";

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta["ai-insights"]} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {aiInsights.map((insight, i) => {
          const isWarning = insight.level === "warning";
          const TrendIcon = isWarning ? TrendingUp : TrendingDown;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-xl2 border border-border bg-white p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ai/[0.1]">
                  <Sparkles size={16} className="text-ai" />
                </div>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                    isWarning ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}
                >
                  <TrendIcon size={11} />
                  {isWarning ? "Watch" : "Stable"}
                </span>
              </div>
              <p className="mt-3 text-[13.5px] font-semibold text-navy">{insight.title}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{insight.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
