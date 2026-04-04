"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";

type Ctx = { surfaceRef: React.RefObject<HTMLDivElement | null> };

const GameViewSurfaceContext = createContext<Ctx | null>(null);

export function GameViewSurfaceProvider({ children }: { children: ReactNode }) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => ({ surfaceRef }), []);
  return (
    <GameViewSurfaceContext.Provider value={value}>
      <div
        ref={surfaceRef}
        className="absolute inset-0 touch-none select-none [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
      >
        {children}
      </div>
    </GameViewSurfaceContext.Provider>
  );
}

export function useGameViewSurface() {
  const ctx = useContext(GameViewSurfaceContext);
  if (!ctx) {
    return { surfaceRef: { current: null } as React.RefObject<HTMLDivElement | null> };
  }
  return ctx;
}
