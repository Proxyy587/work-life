"use client";

import { GameProvider } from "@/lib/game/GameProvider";
import { GameCanvas } from "./GameCanvas";
import { InteractionHintProvider } from "./InteractionHintContext";
import { GameEscapeHandler } from "./GameEscapeHandler";
import { DoorModal } from "./ui/DoorModal";
import { GameHUD } from "./ui/GameHUD";
import { GameMenu } from "./ui/GameMenu";
import { InterviewOverlay } from "./ui/InterviewOverlay";
import { OfficeOverlay } from "./ui/OfficeOverlay";
import { PcDesktop } from "./ui/PcDesktop";

function GameInner() {
  return (
    <>
      <GameEscapeHandler />
      <GameCanvas />
      <GameHUD />
      <GameMenu />
      <PcDesktop />
      <InterviewOverlay />
      <OfficeOverlay />
      <DoorModal />
      <div className="pointer-events-none absolute bottom-2 right-3 z-20 max-w-[12rem] text-right text-[10px] leading-snug text-zinc-500">
        WASD · Click-drag look · E · Esc menu
      </div>
    </>
  );
}

export default function GameShell() {
  return (
    <GameProvider>
      <InteractionHintProvider>
        <div className="relative h-dvh w-full overflow-hidden bg-slate-950">
          <GameInner />
        </div>
      </InteractionHintProvider>
    </GameProvider>
  );
}
