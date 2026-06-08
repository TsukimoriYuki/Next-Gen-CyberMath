// Shared palette + element styles for JSXGraph labs (Light Cyber / white board).
// Hues match the site accents but are darkened for AA contrast on white, so
// curves, points and KaTeX-style text labels stay crisp and readable.
export const NEON = {
  cyan: "#0891b2",
  magenta: "#c0228f",
  violet: "#6d28d9",
  lime: "#4d7c0f",
  amber: "#b45309",
  muted: "#64748b",
  faint: "#cbd5e1",
} as const;

/** Near-black ink for text labels on the white board (≒ #111). */
export const INK = "#111827";

export const curveStyle = (color: string, width = 3) => ({
  strokeColor: color,
  strokeWidth: width,
  highlightStrokeColor: color,
  // Glow is intentionally dropped on the light theme — it smears on white.
  shadow: { enabled: false },
});

export const pointStyle = (color: string) => ({
  size: 4,
  fillColor: color,
  strokeColor: "#0b0f1a",
  strokeWidth: 1.5,
  highlightFillColor: color,
  label: { cssStyle: `color:${INK};font-family:var(--font-mono,monospace);` },
});

export const sliderStyle = (color: string) => ({
  strokeColor: color,
  fillColor: color,
  point1: { strokeColor: NEON.muted },
  point2: { strokeColor: NEON.muted },
  baseline: { strokeColor: NEON.muted, strokeWidth: 1 },
  highline: { strokeColor: color, strokeWidth: 3 },
  label: { cssStyle: `color:${INK};font-family:var(--font-mono,monospace);` },
});

export const textStyle = {
  cssStyle: `color:${INK};font-family:var(--font-mono,monospace);font-size:14px;`,
  fontSize: 14,
  anchorX: "left" as const,
};
