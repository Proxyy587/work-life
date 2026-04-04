"use client";

import { useGame } from "@/lib/game/GameProvider";

export function PcDesktop() {
  const {
    state,
    setPc,
    applyVercel,
    startInterview,
  } = useGame();

  if (!state.showPc) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Computer desktop"
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="ml-2 text-sm font-medium text-zinc-300">
              inbox.local — ProxyOS
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPc(false)}
            className="rounded-lg px-3 py-1 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="grid flex-1 gap-0 overflow-hidden sm:grid-cols-[200px_1fr]">
          <aside className="hidden border-r border-white/10 bg-slate-950/80 p-3 sm:block">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              Apps
            </p>
            <ul className="space-y-1 text-sm text-zinc-300">
              <li className="rounded-md bg-white/10 px-2 py-1.5 text-white">Mail</li>
              <li className="rounded-md px-2 py-1.5 text-zinc-500">Browser (locked)</li>
              <li className="rounded-md px-2 py-1.5 text-zinc-500">Terminal (locked)</li>
            </ul>
          </aside>

          <div className="flex flex-col overflow-y-auto p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={applyVercel}
                disabled={state.appliedVercel}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition enabled:hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state.appliedVercel ? "Applied to Vercel" : "Apply — Vercel (Frontend)"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPc(false);
                  startInterview();
                }}
                disabled={!state.appliedVercel || state.phase !== "bedroom"}
                className="rounded-lg border border-sky-500/50 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300 transition enabled:hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start interview loop
              </button>
            </div>
            <p className="mb-2 text-xs text-zinc-500">
              Notifications double as your inbox. Lakshay might slide into your DMs.
            </p>
            <ul className="space-y-2">
              {state.notifications.map((n) => (
                <li
                  key={n.id}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{n.title}</span>
                    <span className="text-[10px] text-zinc-500">{n.time}</span>
                  </div>
                  <p className="text-xs text-sky-300/90">From: {n.from}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
