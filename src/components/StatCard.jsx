import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatCard({ label, value, suffix = "", delta, direction, icon: Icon, padZero, delay = 0 }) {
  const [display, setDisplay] = useState(0);
  const isDown = direction === "down";

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  const formatted = Number.isInteger(value)
    ? Math.round(display).toString().padStart(padZero ? 2 : 0, "0")
    : display.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-xl2 border border-border bg-white p-5 shadow-card transition hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.07]">
          <Icon size={15} className="text-primary" />
        </div>
      </div>
      <p className="mt-3 font-display text-[26px] font-bold text-navy">
        {formatted}
        {suffix}
      </p>
      <div className={`mt-1.5 flex items-center gap-1 text-[11.5px] font-medium ${isDown ? "text-danger" : "text-success"}`}>
        {isDown ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
        <span>{delta} this month</span>
      </div>
    </motion.div>
  );
}
