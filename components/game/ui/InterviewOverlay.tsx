"use client";

import { useGame } from "@/lib/game/GameProvider";
import { HIRE_THRESHOLD } from "@/lib/game/interviewData";

function Portrait({
  name,
  short,
  gradient,
  side,
}: {
  name: string;
  short: string;
  gradient: string;
  side: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${side === "left" ? "order-1" : "order-3"}`}
    >
      <div
        className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-amber-200/50 bg-gradient-to-br shadow-lg sm:h-24 sm:w-24 ${gradient}`}
      >
        <span className="font-serif text-xl font-bold text-white/95 drop-shadow-md sm:text-2xl">
          {short}
        </span>
      </div>
      <p className="max-w-[5.5rem] text-center font-serif text-[10px] font-semibold leading-tight text-amber-100/90 sm:text-xs">
        {name}
      </p>
    </div>
  );
}

export function InterviewOverlay() {
  const {
    state,
    questions,
    pickAnswer,
    leaveInterview,
    confirmHiredToOffice,
    retryInterview,
  } = useGame();

  if (state.phase !== "interview") return null;

  if (state.interviewResult === "hired") {
    return (
      <div className="pointer-events-auto absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent p-3 pb-6 sm:p-6 sm:pb-10">
        <div className="mx-auto w-full max-w-3xl border-2 border-amber-200/35 bg-slate-950/96 shadow-[0_0_40px_rgba(251,191,36,0.12)] backdrop-blur-md">
          <div className="border-b border-amber-500/25 bg-gradient-to-r from-amber-950/50 via-slate-900/80 to-amber-950/50 px-4 py-2">
            <p className="text-center font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
              Offer extended
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <h2 className="font-serif text-2xl font-bold text-amber-50 sm:text-3xl">
              You&apos;re in.
            </h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-slate-300 sm:text-base">
              Final score: {state.interviewScore} (needed {HIRE_THRESHOLD}+). Signing bonus:
              $500 credited. Garry Tan would call this bias to action — you showed it.
            </p>
            <p className="mt-4 border-l-2 border-amber-500/40 bg-black/25 py-2 pl-3 font-serif text-sm italic text-slate-400">
              {state.lastReaction}
            </p>
            <button
              type="button"
              onClick={confirmHiredToOffice}
              className="mt-5 w-full border border-amber-400/40 bg-gradient-to-r from-amber-600 to-orange-600 py-3.5 font-serif text-sm font-bold tracking-wide text-white shadow-lg transition hover:from-amber-500 hover:to-orange-500 sm:text-base"
            >
              Enter office — Scene 3
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.interviewResult === "rejected") {
    return (
      <div className="pointer-events-auto absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 pb-6 sm:p-6 sm:pb-10">
        <div className="mx-auto w-full max-w-3xl border-2 border-rose-400/35 bg-slate-950/96 shadow-[0_0_36px_rgba(244,63,94,0.12)] backdrop-blur-md">
          <div className="border-b border-rose-500/25 bg-gradient-to-r from-rose-950/40 via-slate-900/80 to-rose-950/40 px-4 py-2">
            <p className="text-center font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-200/90">
              Loop closed
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <h2 className="font-serif text-2xl font-bold text-rose-50 sm:text-3xl">
              Not this time
            </h2>
            <p className="mt-2 font-serif text-sm text-slate-300 sm:text-base">
              Score: {state.interviewScore} — need {HIRE_THRESHOLD}+. Theo looked rough.
              levelsio would say: ship proof, not vibes.
            </p>
            <p className="mt-4 border-l-2 border-rose-500/40 bg-black/25 py-2 pl-3 font-serif text-sm italic text-slate-400">
              {state.lastReaction}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={retryInterview}
                className="flex-1 border border-sky-500/40 bg-sky-700 py-3 font-serif text-sm font-bold text-white hover:bg-sky-600"
              >
                Retry interview
              </button>
              <button
                type="button"
                onClick={leaveInterview}
                className="flex-1 border border-white/20 bg-white/5 py-3 font-serif text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Back to bedroom
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[state.interviewIndex];
  if (!q) return null;

  return (
    <div className="pointer-events-auto absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/35 to-transparent p-2 pb-4 sm:p-4 sm:pb-8">
      <div className="mx-auto w-full max-w-5xl border-2 border-amber-200/30 bg-slate-950/95 shadow-[0_-12px_48px_rgba(0,0,0,0.55)] backdrop-blur-md">
        <div className="flex items-stretch gap-2 border-b border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-2 py-1.5 sm:gap-4 sm:px-4 sm:py-2">
          <span className="self-center font-serif text-[10px] uppercase tracking-[0.18em] text-amber-200/70 sm:text-[11px]">
            Interview — {state.interviewIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="flex items-start gap-2 p-3 sm:gap-5 sm:p-5">
          <Portrait
            side="left"
            name="Guillermo Rauch"
            short="GR"
            gradient="from-zinc-800 to-zinc-950"
          />

          <div className="order-2 min-w-0 flex-1">
            <p className="font-serif text-sm font-medium leading-relaxed text-slate-100 sm:text-base sm:leading-relaxed">
              {q.prompt}
            </p>
            {state.lastReaction ? (
              <p className="mt-3 border-l-2 border-sky-500/50 py-1 pl-3 font-serif text-xs italic text-slate-400 sm:text-sm">
                {state.lastReaction}
              </p>
            ) : null}

            <ul className="mt-4 space-y-2 sm:mt-5">
              {q.choices.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => pickAnswer(c.points, c.reaction)}
                    className="group flex w-full items-start gap-3 border border-amber-900/40 bg-gradient-to-r from-slate-900/90 to-slate-900/50 px-3 py-2.5 text-left transition hover:border-amber-400/50 hover:from-amber-950/40 hover:to-slate-900/80 sm:px-4 sm:py-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-amber-500/40 bg-amber-950/60 font-serif text-xs font-bold text-amber-200 group-hover:border-amber-300 group-hover:text-amber-50">
                      {i + 1}
                    </span>
                    <span className="font-serif text-xs leading-relaxed text-slate-200 sm:text-sm sm:leading-relaxed">
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Portrait
            side="right"
            name="Theo"
            short="T"
            gradient="from-blue-700 to-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
