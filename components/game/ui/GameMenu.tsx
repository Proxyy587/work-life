"use client";

import { useGame } from "@/lib/game/GameProvider";

export function GameMenu() {
  const {
    menuOpen,
    closeMenu,
    lookSensitivity,
    setLookSensitivity,
  } = useGame();

  if (!menuOpen) return null;

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Game menu"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-slate-950/95 p-6 shadow-2xl">
        <h2 className="text-center font-serif text-2xl font-bold text-white">
          Paused
        </h2>
        <p className="mt-1 text-center text-sm text-zinc-500">
          Esc to resume · Startup Life
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={closeMenu}
            className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg transition hover:from-sky-500 hover:to-indigo-500"
          >
            Resume
          </button>

          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Settings
            </p>
            <label className="mt-3 block text-sm text-zinc-300" htmlFor="look-sens">
              Mouse look sensitivity
            </label>
            <input
              id="look-sens"
              type="range"
              min={0.0008}
              max={0.006}
              step={0.0001}
              value={lookSensitivity}
              onChange={(e) => setLookSensitivity(Number.parseFloat(e.target.value))}
              className="mt-2 w-full accent-sky-500"
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Hold <kbd className="rounded bg-zinc-800 px-1">click</kbd> on the game and
              drag to look around — your cursor stays visible when you&apos;re only
              using WASD.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full rounded-xl border border-white/15 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/5"
          >
            Quit to reload
          </button>
        </div>
      </div>
    </div>
  );
}
