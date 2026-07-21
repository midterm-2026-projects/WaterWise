import { useState } from "react";
import { FiChevronDown, FiDroplet, FiLogOut, FiUser } from "react-icons/fi";

export default function Header({
  accountName = "WaterWise User",
  activeRole,
  activeRoleLabel,
  notificationSlot,
  onLogout,
  subtitle = "Sucol Water System",
  title = "WaterWise",
}) {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-sky-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:min-h-[72px] sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-lg shadow-sky-200/70">
            <FiDroplet aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-lg">
              {title}
            </h1>
            <p className="hidden text-xs font-medium text-slate-500 sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeRole && (
            <span className="hidden rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold capitalize text-sky-700 sm:inline-flex">
              {activeRole.replace("-", " ")}
            </span>
          )}
          {notificationSlot}
          {onLogout && (
            <div className="relative">
              <button
                aria-expanded={isAccountOpen}
                aria-label="Open account menu"
                className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-[#0284C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] sm:px-3"
                onClick={() => setIsAccountOpen((isOpen) => !isOpen)}
                type="button"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-[#0284C7]">
                  <FiUser aria-hidden="true" className="h-4 w-4" />
                </span>
                <FiChevronDown aria-hidden="true" className={`hidden h-4 w-4 transition sm:block ${isAccountOpen ? "rotate-180" : ""}`} />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-[calc(100%+0.65rem)] z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-bold text-[#0F172A]">{accountName}</p>
                    <p className="mt-1 text-xs font-semibold text-sky-600">{activeRoleLabel}</p>
                  </div>
                  <button
                    className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    onClick={onLogout}
                    type="button"
                  >
                    <FiLogOut aria-hidden="true" className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
