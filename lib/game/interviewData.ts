import type { InterviewQuestion } from "./types";

export const VERCEL_INTERVIEW: InterviewQuestion[] = [
  {
    id: "bg",
    prompt: "Guillermo: Walk us through what you've been building lately.",
    choices: [
      {
        id: "a",
        label: "I shipped a few side projects and wrote about what broke in production.",
        points: 3,
        reaction: "Guillermo nods. Theo: \"Concrete. I like it.\"",
      },
      {
        id: "b",
        label: "I'm passionate about technology and synergy.",
        points: 0,
        reaction:
          "Theo: \"That's not a personality — that's a LinkedIn bio.\" Guillermo sighs.",
      },
      {
        id: "c",
        label: "Mostly tutorials, but I'm a fast learner.",
        points: 1,
        reaction: "Garry Tan (observing): \"Honesty points. Now show momentum.\"",
      },
      {
        id: "d",
        label: "I've been grinding LeetCode 6 hours a day.",
        points: 1,
        reaction: "Theo: \"Cool. What did you ship to users?\"",
      },
    ],
  },
  {
    id: "why",
    prompt: "Theo: Why Vercel specifically?",
    choices: [
      {
        id: "a",
        label: "Your developer experience is the product — I want to make that loop tighter.",
        points: 3,
        reaction: "Guillermo: \"That's the thesis.\"",
      },
      {
        id: "b",
        label: "Big name, looks good on resume.",
        points: 0,
        reaction: "Theo: \"Hard pass energy. Next question.\"",
      },
      {
        id: "c",
        label: "I deploy everything to the edge because Lakshay told me to.",
        points: 2,
        reaction: "Lakshay texts you: \"lmao they're gonna ask follow-ups.\"",
      },
      {
        id: "d",
        label: "I love front-end frameworks in general.",
        points: 1,
        reaction: "levelsio (cameo): \"Pick a lane. Ship.\"",
      },
    ],
  },
  {
    id: "ship",
    prompt: "Guillermo: You have one week — ship fast or ship perfect?",
    choices: [
      {
        id: "a",
        label: "Ship fast, measure, iterate. Perfect is the enemy of deployed.",
        points: 3,
        reaction: "Guillermo smiles. Theo: \"Welcome to the religion.\"",
      },
      {
        id: "b",
        label: "Perfect first — brand risk if we move sloppy.",
        points: 1,
        reaction: "Guillermo: \"Quality matters — but velocity is a habit.\"",
      },
      {
        id: "c",
        label: "Whatever the KPI deck says.",
        points: 0,
        reaction: "Garry Tan shakes his head slightly.",
      },
      {
        id: "d",
        label: "I'd ask Proxy what they'd do.",
        points: 2,
        reaction: "Proxy (in your head): \"That's actually smart. Also hire me as advisor.\"",
      },
    ],
  },
];

export const HIRE_THRESHOLD = 6;
