import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DIFF_COLOR_MAP: Record<string, string> = {
  A:      "var(--neon-lime)",
  B:      "var(--neon-cyan)",
  C:      "var(--neon-violet)",
  D:      "var(--neon-amber)",
  D_PLUS: "var(--neon-magenta)",
};

export function difficultyColor(difficulty: string): string {
  return DIFF_COLOR_MAP[difficulty] ?? "var(--muted-foreground)";
}
