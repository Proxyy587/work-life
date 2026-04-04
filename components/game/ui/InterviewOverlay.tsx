"use client";

import { useGame } from "@/lib/game/GameProvider";
import { HIRE_THRESHOLD } from "@/lib/game/interviewData";

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
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center p-4 pb-8">
        <div className="w-full max-w-lg rounded-2xl border border-emerald-500/30 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
            Offer extended
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">You&apos;re in.</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Final score: {state.interviewScore} (needed {HIRE_THRESHOLD}+). Signing bonus:
            $500 added to balance. Garry Tan would call this &quot;bias to action&quot; —
            you actually showed it.
          </p>
          <p className="mt-3 rounded-lg bg-white/5 p-3 text-sm italic text-zinc-400">
            {state.lastReaction}
          </p>
          <button
            type="button"
            onClick={confirmHiredToOffice}
            className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Enter office — Scene 3
          </button>
        </div>
      </div>
    );
  }

  if (state.interviewResult === "rejected") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center p-4 pb-8">
        <div className="w-full max-w-lg rounded-2xl border border-rose-500/30 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">
            Not this time
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">Loop closed.</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Score: {state.interviewScore} — need {HIRE_THRESHOLD}+ to clear. Theo looked
            disappointed. levelsio would tell you to ship proof, not vibes.
          </p>
          <p className="mt-3 rounded-lg bg-white/5 p-3 text-sm italic text-zinc-400">
            {state.lastReaction}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={retryInterview}
              className="flex-1 rounded-xl bg-sky-600 py-3 text-sm font-bold text-white hover:bg-sky-500"
            >
              Retry interview
            </button>
            <button
              type="button"
              onClick={leaveInterview}
              className="flex-1 rounded-xl border border-white/15 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5"
            >
              Back to bedroom
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[state.interviewIndex];
  if (!q) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center p-4 pb-6">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/92 p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          Question {state.interviewIndex + 1} / {questions.length}
        </p>
        <h2 className="mt-2 text-base font-semibold leading-snug text-white sm:text-lg">
          {q.prompt}
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {q.choices.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => pickAnswer(c.points, c.reaction)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-sm leading-relaxed text-zinc-200 transition hover:border-sky-500/40 hover:bg-sky-950/40"
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        {state.lastReaction ? (
          <p className="mt-4 border-t border-white/10 pt-3 text-sm italic text-zinc-400">
            {state.lastReaction}
          </p>
        ) : null}
      </div>
    </div>
  );
}
