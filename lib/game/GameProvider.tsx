"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { HIRE_THRESHOLD, VERCEL_INTERVIEW } from "./interviewData";
import type { GameNotification, GamePhase } from "./types";

type State = {
  phase: GamePhase;
  balance: number;
  appliedVercel: boolean;
  interviewIndex: number;
  interviewScore: number;
  hired: boolean;
  interviewResult: null | "hired" | "rejected";
  lastReaction: string;
  xp: number;
  level: number;
  showPc: boolean;
  doorMessage: string | null;
  officeFlavor: string | null;
  notifications: GameNotification[];
};

type Action =
  | { type: "TRY_DOOR" }
  | { type: "SET_PC"; open: boolean }
  | { type: "APPLY_VERCEL" }
  | { type: "START_INTERVIEW" }
  | {
      type: "PICK_ANSWER";
      points: number;
      reaction: string;
    }
  | { type: "WORK" }
  | { type: "DISMISS_DOOR" }
  | { type: "CLEAR_OFFICE_FLAVOR" }
  | { type: "PUSH_NOTIFICATION"; notification: GameNotification }
  | { type: "LEAVE_INTERVIEW" }
  | { type: "CONFIRM_HIRED_TO_OFFICE" };

const initialNotifications: GameNotification[] = [
  {
    id: "welcome-proxy",
    from: "Proxy",
    title: "Hey — I'm your co-pilot",
    body: "Click the desk PC to check mail. Apply when you're ready. The door's locked for now — we're shipping MVP first.",
    time: "now",
  },
  {
    id: "lakshay-1",
    from: "Lakshay",
    title: "bro",
    body: "have u seen Vercel's roles?? u literally deploy everything there already",
    time: "2m ago",
  },
];

const initialState: State = {
  phase: "bedroom",
  balance: 0,
  appliedVercel: false,
  interviewIndex: 0,
  interviewScore: 0,
  hired: false,
  interviewResult: null,
  lastReaction: "",
  xp: 0,
  level: 1,
  showPc: false,
  doorMessage: null,
  officeFlavor: null,
  notifications: initialNotifications,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TRY_DOOR":
      return {
        ...state,
        doorMessage: "This area is yet to unlocked.",
      };
    case "DISMISS_DOOR":
      return { ...state, doorMessage: null };
    case "SET_PC":
      return { ...state, showPc: action.open };
    case "APPLY_VERCEL":
      if (state.appliedVercel) return state;
      return {
        ...state,
        appliedVercel: true,
        notifications: [
          {
            id: `applied-${Date.now()}`,
            from: "Vercel Careers",
            title: "Application received",
            body: "Thanks for applying. Our team will review — expect a loop soon.",
            time: "just now",
          },
          ...state.notifications,
        ],
      };
    case "START_INTERVIEW":
      return {
        ...state,
        phase: "interview",
        interviewIndex: 0,
        interviewScore: 0,
        interviewResult: null,
        lastReaction: "You sit down. Two silhouettes look up from their laptops.",
      };
    case "PICK_ANSWER": {
      const nextIndex = state.interviewIndex + 1;
      const score = state.interviewScore + action.points;
      const isDone = nextIndex >= VERCEL_INTERVIEW.length;
      if (isDone) {
        const hired = score >= HIRE_THRESHOLD;
        return {
          ...state,
          interviewIndex: nextIndex,
          interviewScore: score,
          lastReaction: action.reaction,
          hired,
          interviewResult: hired ? "hired" : "rejected",
          balance: hired ? state.balance + 500 : state.balance,
          xp: hired ? state.xp + 50 : state.xp,
          officeFlavor: hired
            ? "Guillermo: \"Welcome aboard. Ship something small today.\""
            : null,
        };
      }
      return {
        ...state,
        interviewIndex: nextIndex,
        interviewScore: score,
        lastReaction: action.reaction,
      };
    }
    case "LEAVE_INTERVIEW":
      return {
        ...state,
        phase: "bedroom",
        interviewResult: null,
        interviewIndex: 0,
        interviewScore: 0,
      };
    case "CONFIRM_HIRED_TO_OFFICE":
      return {
        ...state,
        phase: "office",
        interviewResult: null,
      };
    case "WORK": {
      const addXp = 25;
      const pay = 40 + state.level * 5;
      const xp = state.xp + addXp;
      const levelUpEvery = 100;
      const newLevel = Math.floor(xp / levelUpEvery) + 1;
      const leveled = newLevel > state.level;
      const roll = Math.random();
      let flavor: string | null = null;
      if (roll < 0.12) {
        const pool = [
          "Guillermo passes by: \"Nice diff. Don't let CI get lonely.\"",
          "Theo drops a sticker on your desk. \"Ship it.\"",
          "levelsio DM: \"landing page or it didn't happen\"",
          "Garry Tan (all-hands zoom): \"Bias to action.\"",
          "Lakshay: \"bro they're posting again u good?\"",
          "Proxy: \"That's XP. Keep the streak.\"",
        ];
        flavor = pool[Math.floor(Math.random() * pool.length)] ?? null;
      } else if (leveled) {
        flavor = `Level ${newLevel}! Proxy: \"You're glowing — in a professional way.\"`;
      }
      return {
        ...state,
        xp,
        level: newLevel,
        balance: state.balance + pay,
        officeFlavor: flavor,
      };
    }
    case "CLEAR_OFFICE_FLAVOR":
      return { ...state, officeFlavor: null };
    case "PUSH_NOTIFICATION":
      return {
        ...state,
        notifications: [action.notification, ...state.notifications],
      };
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  questions: typeof VERCEL_INTERVIEW;
  tryDoor: () => void;
  dismissDoor: () => void;
  setPc: (open: boolean) => void;
  applyVercel: () => void;
  startInterview: () => void;
  pickAnswer: (points: number, reaction: string) => void;
  work: () => void;
  clearOfficeFlavor: () => void;
  retryInterview: () => void;
  leaveInterview: () => void;
  confirmHiredToOffice: () => void;
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tryDoor = useCallback(() => dispatch({ type: "TRY_DOOR" }), []);
  const dismissDoor = useCallback(() => dispatch({ type: "DISMISS_DOOR" }), []);
  const setPc = useCallback(
    (open: boolean) => dispatch({ type: "SET_PC", open }),
    [],
  );
  const applyVercel = useCallback(() => dispatch({ type: "APPLY_VERCEL" }), []);
  const startInterview = useCallback(
    () => dispatch({ type: "START_INTERVIEW" }),
    [],
  );
  const pickAnswer = useCallback((points: number, reaction: string) => {
    dispatch({ type: "PICK_ANSWER", points, reaction });
  }, []);
  const work = useCallback(() => dispatch({ type: "WORK" }), []);
  const clearOfficeFlavor = useCallback(
    () => dispatch({ type: "CLEAR_OFFICE_FLAVOR" }),
    [],
  );
  const retryInterview = useCallback(() => {
    dispatch({ type: "START_INTERVIEW" });
  }, []);
  const leaveInterview = useCallback(() => dispatch({ type: "LEAVE_INTERVIEW" }), []);
  const confirmHiredToOffice = useCallback(
    () => dispatch({ type: "CONFIRM_HIRED_TO_OFFICE" }),
    [],
  );

  const value = useMemo(
    () => ({
      state,
      questions: VERCEL_INTERVIEW,
      tryDoor,
      dismissDoor,
      setPc,
      applyVercel,
      startInterview,
      pickAnswer,
      work,
      clearOfficeFlavor,
      retryInterview,
      leaveInterview,
      confirmHiredToOffice,
    }),
    [
      state,
      tryDoor,
      dismissDoor,
      setPc,
      applyVercel,
      startInterview,
      pickAnswer,
      work,
      clearOfficeFlavor,
      retryInterview,
      leaveInterview,
      confirmHiredToOffice,
    ],
  );

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
