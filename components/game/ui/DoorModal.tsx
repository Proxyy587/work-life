"use client";

import { useGame } from "@/lib/game/GameProvider";

export function DoorModal() {
  const { state, dismissDoor } = useGame();

  if (!state.doorMessage) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <p className="text-sm font-semibold text-white">Door</p>
        <p className="mt-2 text-zinc-300">{state.doorMessage}</p>
        <button
          type="button"
          onClick={dismissDoor}
          className="mt-4 w-full rounded-lg bg-white py-2 text-sm font-semibold text-slate-900"
        >
          OK
        </button>
      </div>
    </div>
  );
}
