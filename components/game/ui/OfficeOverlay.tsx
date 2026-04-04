"use client";

import { useGame } from "@/lib/game/GameProvider";

export function OfficeOverlay() {
  const { state, work, clearOfficeFlavor } = useGame();

  if (state.phase !== "office") return null;

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 p-4 pb-8">
      {state.officeFlavor ? (
        <div className="flex w-full max-w-lg items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-950/40 px-4 py-3 backdrop-blur-md">
          <p className="flex-1 text-sm text-amber-100">{state.officeFlavor}</p>
          <button
            type="button"
            onClick={clearOfficeFlavor}
            className="shrink-0 text-xs text-amber-200/80 underline"
          >
            Dismiss
          </button>
        </div>
      ) : null}
      <div className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-xl backdrop-blur-md">
        <p className="text-center text-xs text-zinc-500">
          Daily work — grind XP, salary hits your balance. CEOs sometimes roam the
          floor (rare flavor text).
        </p>
        <button
          type="button"
          onClick={work}
          className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg transition hover:from-sky-500 hover:to-indigo-500"
        >
          Work session (ship a PR)
        </button>
        <p className="text-center text-[11px] text-zinc-500">
          Proxy says: &quot;You made it past Guillermo &amp; Theo — don&apos;t stop
          now.&quot;
        </p>
      </div>
    </div>
  );
}
