export type GamePhase = "bedroom" | "interview" | "office";

export type GameNotification = {
  id: string;
  from: string;
  title: string;
  body: string;
  time: string;
};

export type InterviewQuestion = {
  id: string;
  prompt: string;
  choices: { id: string; label: string; points: number; reaction: string }[];
};

export const INTERVIEWERS = [
  { id: "guillermo", name: "Guillermo Rauch", role: "CEO", color: "#000000" },
  { id: "theo", name: "Theo", role: "Engineer", color: "#0070f3" },
] as const;

export const CAST = {
  proxy: "Proxy",
  lakshay: "Lakshay",
  levelsio: "levelsio",
  garry: "Garry Tan",
} as const;
