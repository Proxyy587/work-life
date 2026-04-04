"use client";

import { useEffect } from "react";
import { useGame } from "@/lib/game/GameProvider";

export function GameEscapeHandler() {
  const {
    state,
    menuOpen,
    setPc,
    dismissDoor,
    openMenu,
    closeMenu,
  } = useGame();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (state.showPc) {
        e.preventDefault();
        setPc(false);
        return;
      }
      if (state.doorMessage) {
        e.preventDefault();
        dismissDoor();
        return;
      }
      e.preventDefault();
      if (menuOpen) closeMenu();
      else openMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    state.showPc,
    state.doorMessage,
    menuOpen,
    setPc,
    dismissDoor,
    openMenu,
    closeMenu,
  ]);

  return null;
}
