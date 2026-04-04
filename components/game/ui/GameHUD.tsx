"use client";

import { useGame } from "@/lib/game/GameProvider";
import { HIRE_THRESHOLD } from "@/lib/game/interviewData";

export function GameHUD() {
  const { state, questions } = useGame();

  const phaseLabel =
    state.phase === "bedroom"
      ? "Scene 1 — Bedroom"
      : state.phase === "interview"
        ? "Scene 2 — Interview"
        : "Scene 3 — Office";

  const proxyTip =
    state.phase === "bedroom"
      ? "Proxy: Click the glowing monitor to open your PC. The door is locked for now."
      : state.phase === "interview"
        ? "Proxy: Pick answers that sound like you shipped real work — not buzzwords."
        : "Proxy: Hit Work to earn cash and XP. Rare CEO cameos can pop up.";

  return (
    <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex flex-col gap-2 p-3 sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="pointer-events-auto rounded-xl border border-white/10 bg-slate-950/85 px-3 py-2 shadow-xl backdrop-blur-md sm:px-4">
          <p className="text-[10px] font-medium uppercase tracking-widest text-sky-400">
            Startup Life MVP
          </p>
          <p className="text-sm font-semibold text-white">{phaseLabel}</p>
        </div>
        <div className="pointer-events-auto flex flex-wrap gap-2">
          <div className="rounded-xl border border-white/10 bg-slate-950/85 px-3 py-2 text-right backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-wide text-zinc-500">Balance</p>
            <p className="font-mono text-lg font-bold text-emerald-400">
              ${state.balance.toLocaleString()}
            </p>
          </div>
          {state.phase === "office" ? (
            <div className="rounded-xl border border-white/10 bg-slate-950/85 px-3 py-2 text-right backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                Level / XP
              </p>
              <p className="font-mono text-lg font-bold text-violet-300">
                L{state.level}{" "}
                <span className="text-sm font-normal text-zinc-400">
                  ({state.xp % 100}/100)
                </span>
              </p>
            </div>
          ) : null}
          {state.phase === "interview" &&
          state.interviewIndex < questions.length &&
          !state.interviewResult ? (
            <div className="rounded-xl border border-white/10 bg-slate-950/85 px-3 py-2 text-right backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">Score</p>
              <p className="font-mono text-lg font-bold text-amber-300">
                {state.interviewScore}{" "}
                <span className="text-xs text-zinc-500">/ {HIRE_THRESHOLD}+ hire</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <p className="pointer-events-auto max-w-xl rounded-lg border border-indigo-500/20 bg-indigo-950/40 px-3 py-2 text-xs text-indigo-100 backdrop-blur-sm">
        {proxyTip}
      </p>
    </header>
  );
}
