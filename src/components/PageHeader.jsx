import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 className="font-display text-[22px] font-bold text-navy sm:text-[24px]">{title}</h1>
      <p className="mt-1 text-[13.5px] text-muted">{subtitle}</p>
    </motion.div>
  );
}
