import { motion } from "framer-motion";
import { Star, Stethoscope, CalendarPlus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { doctorsList, pageMeta } from "../data/mockData";

export default function Doctors() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta.doctors} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {doctorsList.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="flex flex-col items-center rounded-xl2 border border-border bg-white p-6 text-center shadow-card transition hover:shadow-card-hover"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-ai text-[15px] font-semibold text-white">
              {doc.name.split(" ").slice(-2).map((n) => n[0]).join("")}
            </div>
            <p className="mt-3 text-[13.5px] font-semibold text-navy">{doc.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted">
              <Stethoscope size={12} /> {doc.specialty}
            </p>
            <p className="mt-0.5 text-[11.5px] text-muted/80">{doc.hospital}</p>
            <div className="mt-2 flex items-center gap-1 text-[12px] font-medium text-navy">
              <Star size={12} className="fill-warning text-warning" />
              {doc.rating}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary/[0.08] py-2 text-[12px] font-semibold text-primary transition hover:bg-primary hover:text-white">
              <CalendarPlus size={13} /> Book Appointment
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
