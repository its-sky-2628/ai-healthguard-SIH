import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-navy/[0.04] hover:text-navy lg:hidden"
        >
          <Menu size={19} />
        </button>
        <div className="relative hidden max-w-sm flex-1 sm:block">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search patients, reports, diseases..."
            className="w-full rounded-lg border border-border bg-bg py-2.5 pl-9 pr-3 text-[13px] text-navy placeholder:text-muted/80 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-navy/[0.04] hover:text-navy">
          <Bell size={18} strokeWidth={2} />
          <span className="absolute right-1.5 top-1.5 flex h-[7px] w-[7px] items-center justify-center rounded-full bg-danger ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-border" />

        <button className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-1.5 transition hover:bg-navy/[0.04] sm:pr-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-ai text-[12px] font-semibold text-white">
            SY
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-[13px] font-semibold text-navy">Shreyansh Yadav</p>
            <p className="text-[11px] text-muted">Team Innovators</p>
          </div>
          <ChevronDown size={15} className="hidden text-muted sm:block" />
        </button>
      </div>
    </header>
  );
}
