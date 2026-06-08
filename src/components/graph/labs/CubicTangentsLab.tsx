"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, textStyle } from "./theme";

/**
 * Tangents to y = x³ drawn from a draggable point P = (p, q).
 * A tangent touches at (t, t³) where 2t³ − 3p·t² + q = 0, so the number of
 * tangents = number of real roots of that cubic (1, 2, or 3 by region).
 * Drag P across the curve to feel the count change.
 */
const MAX_T = 3;

// Real roots of g(t) = 2t³ − 3p t² + q on a bounded scan, via sign-change
// detection + bisection. Enough resolution for an interactive sketch.
function tangentPoints(p: number, q: number): number[] {
  const g = (t: number) => 2 * t * t * t - 3 * p * t * t + q;
  const roots: number[] = [];
  const lo = -4;
  const hi = 4;
  const steps = 800;
  const dt = (hi - lo) / steps;
  let prev = g(lo);
  for (let i = 1; i <= steps; i++) {
    const t = lo + i * dt;
    const cur = g(t);
    if (prev === 0) roots.push(t - dt);
    else if (prev * cur < 0) {
      // bisection
      let a = t - dt;
      let bb = t;
      for (let k = 0; k < 40; k++) {
        const m = (a + bb) / 2;
        if (g(a) * g(m) <= 0) bb = m;
        else a = m;
      }
      roots.push((a + bb) / 2);
    }
    prev = cur;
  }
  return roots.slice(0, MAX_T);
}

export function CubicTangentsLab() {
  return (
    <JsxBoard
      boundingBox={[-1.9, 3, 1.9, -3]}
      keepAspectRatio={false}
      ariaLabel="点 P から y = x³ へ引ける接線"
      init={(board) => {
        const b = board;
        const f = (x: number) => x * x * x;

        b.create("functiongraph", [f, -1.6, 1.6], curveStyle(NEON.cyan, 3));

        // Draggable external point.
        const P = b.create("point", [0.55, -1.4], {
          name: "P",
          size: 5,
          fillColor: NEON.magenta,
          strokeColor: "#0b0f1a",
          strokeWidth: 1.5,
          label: {
            cssStyle: "color:#111827;font-family:var(--font-mono,monospace);",
          },
        });

        const rootsAt = () => tangentPoints(P.X(), P.Y());

        // Up to MAX_T tangent lines + tangency markers.
        for (let m = 0; m < MAX_T; m++) {
          const tm = () => {
            const r = rootsAt();
            return r[m] ?? NaN;
          };
          const present = () => {
            const r = rootsAt();
            return r[m] !== undefined && Number.isFinite(r[m]);
          };

          b.create(
            "line",
            [
              [() => tm(), () => f(tm())],
              [() => tm() + 1, () => 3 * tm() * tm() + tm() * tm() * tm()],
            ],
            {
              strokeColor: NEON.lime,
              strokeWidth: 2,
              straightFirst: true,
              straightLast: true,
              visible: present,
            },
          );

          b.create("point", [() => tm(), () => f(tm())], {
            name: "",
            ...pointStyle(NEON.amber),
            visible: present,
            fixed: true,
          });
        }

        // Inert slider-free readout of the tangent count.
        b.create("text", [
          -1.85,
          -2.6,
          () => {
            const c = rootsAt().length;
            return `P から引ける接線: ${c} 本`;
          },
        ], { ...textStyle });
      }}
    />
  );
}
