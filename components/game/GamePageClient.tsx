"use client";

import dynamic from "next/dynamic";

const GameShell = dynamic(() => import("./GameShell"), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh items-center justify-center bg-slate-950 text-sm text-zinc-400">
      Loading scene…
    </div>
  ),
});

export default function GamePageClient() {
  return <GameShell />;
}
