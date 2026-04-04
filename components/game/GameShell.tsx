"use client";

import { GameProvider } from "@/lib/game/GameProvider";
import { GameCanvas } from "./GameCanvas";
import { DoorModal } from "./ui/DoorModal";
import { GameHUD } from "./ui/GameHUD";
import { InterviewOverlay } from "./ui/InterviewOverlay";
import { OfficeOverlay } from "./ui/OfficeOverlay";
import { PcDesktop } from "./ui/PcDesktop";

function GameInner() {
  return (
    <>
      <GameCanvas />
      <GameHUD />
      <PcDesktop />
      <InterviewOverlay />
      <OfficeOverlay />
      <DoorModal />
      <div className="pointer-events-none absolute bottom-2 right-3 z-20 text-[10px] text-zinc-600">
        Drag to orbit · Click desk PC · Click door
      </div>
    </>
  );
}

export default function GameShell() {
  return (
    <GameProvider>
      <div className="relative h-dvh w-full overflow-hidden bg-slate-950">
        <GameInner />
      </div>
    </GameProvider>
  );
}
