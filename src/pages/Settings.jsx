import { motion } from "framer-motion";
import { User, Bell, ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { pageMeta } from "../data/mockData";

const sections = [
  {
    icon: User,
    title: "Profile",
    fields: [
      { label: "Full Name", value: "Shreyansh Yadav" },
      { label: "Team", value: "Team Innovators" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    toggles: ["Health alerts", "Weekly summary reports", "Appointment reminders"],
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    toggles: ["Two-factor authentication", "Share data with connected doctors"],
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader {...pageMeta.settings} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-xl2 border border-border bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.08]">
                  <Icon size={16} className="text-primary" />
                </div>
                <h3 className="font-display text-[15px] font-semibold text-navy">{section.title}</h3>
              </div>

              {section.fields && (
                <div className="mt-4 space-y-3">
                  {section.fields.map((f) => (
                    <div key={f.label}>
                      <label className="text-[11.5px] font-medium text-muted">{f.label}</label>
                      <input
                        defaultValue={f.value}
                        className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-[13px] text-navy outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  ))}
                </div>
              )}

              {section.toggles && (
                <div className="mt-4 space-y-3">
                  {section.toggles.map((t, idx) => (
                    <div key={t} className="flex items-center justify-between">
                      <span className="text-[13px] text-navy/85">{t}</span>
                      <ToggleSwitch defaultOn={idx !== 1} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ToggleSwitch({ defaultOn }) {
  return (
    <button
      role="switch"
      aria-checked={defaultOn}
      className={`relative h-5 w-9 rounded-full transition ${defaultOn ? "bg-primary" : "bg-border"}`}
      onClick={(e) => {
        const el = e.currentTarget;
        const checked = el.getAttribute("aria-checked") === "true";
        el.setAttribute("aria-checked", String(!checked));
        el.classList.toggle("bg-primary", !checked);
        el.classList.toggle("bg-border", checked);
        const knob = el.firstChild;
        knob.style.transform = !checked ? "translateX(16px)" : "translateX(2px)";
      }}
    >
      <span
        className="absolute top-[2px] h-4 w-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: defaultOn ? "translateX(16px)" : "translateX(2px)" }}
      />
    </button>
  );
}
