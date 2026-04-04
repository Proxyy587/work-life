"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  hint: string | null;
  setHint: (h: string | null) => void;
};

const InteractionHintContext = createContext<Ctx | null>(null);

export function InteractionHintProvider({ children }: { children: ReactNode }) {
  const [hint, setHintState] = useState<string | null>(null);
  const setHint = useCallback((h: string | null) => {
    setHintState((prev) => (prev === h ? prev : h));
  }, []);
  const value = useMemo(() => ({ hint, setHint }), [hint, setHint]);
  return (
    <InteractionHintContext.Provider value={value}>
      {children}
    </InteractionHintContext.Provider>
  );
}

export function useInteractionHint() {
  const ctx = useContext(InteractionHintContext);
  if (!ctx) {
    return { hint: null as string | null, setHint: () => {} };
  }
  return ctx;
}
