import { ShieldCheck, X } from "lucide-react";
import { navGroups, bottomNavItem } from "../data/mockData";

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const active = activePage === item.id;
    return (
      <button
        onClick={() => {
          onNavigate(item.id);
          onClose?.();
        }}
        className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors duration-150 ${
          active
            ? "bg-primary/[0.08] text-primary"
            : "text-muted hover:bg-navy/[0.04] hover:text-navy"
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
        )}
        <Icon size={17} strokeWidth={2} className={active ? "text-primary" : "text-muted group-hover:text-navy"} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-navy/30 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[252px] shrink-0 flex-col border-r border-border bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pb-5 pt-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck size={19} className="text-primary" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <p className="font-display text-[14.5px] font-bold text-navy">AI HealthGuard</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-navy lg:hidden">
            <X size={18} />
          </button>
        </div>
        <p className="px-5 pb-5 text-[11px] font-medium tracking-wide text-muted/90">
          Early Detection, Better Tomorrow
        </p>

        <nav className="flex-1 overflow-y-auto px-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted/70">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavButton key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 pb-3">
          <NavButton item={bottomNavItem} />
        </div>

        <div className="mx-3 mb-5 rounded-xl2 border border-border bg-success/[0.06] px-3.5 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-success">
              AI SYSTEM ACTIVE
            </span>
          </div>
          <p className="mt-1 pl-4 text-[11px] text-muted">Models ready for analysis</p>
        </div>
      </aside>
    </>
  );
}
