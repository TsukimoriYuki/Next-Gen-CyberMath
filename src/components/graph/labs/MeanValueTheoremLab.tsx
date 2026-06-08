"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * The Mean Value Theorem. On [a,b] there is at least one c with f'(c) equal
 * to the secant slope (f(b)−f(a))/(b−a): a tangent parallel to the chord.
 * The slider moves b; the green tangent at c stays parallel to the magenta
 * secant. Here f(x)=1.2 sin x + 0.3x, so f'(x)=1.2 cos x + 0.3.
 */
const A = -2;
const f = (x: number) => 1.2 * Math.sin(x) + 0.3 * x;
const df = (x: number) => 1.2 * Math.cos(x) + 0.3;

/** First c in (A,b) with f'(c)=m, by sign-change scan + bisection. */
function findC(bx: number, m: number): number {
  const g = (x: number) => df(x) - m;
  const lo = A;
  const hi = bx;
  const steps = 400;
  const dt = (hi - lo) / steps;
  let prev = g(lo);
  for (let i = 1; i <= steps; i++) {
    const x = lo + i * dt;
    const cur = g(x);
    if (prev * cur <= 0) {
      let p = x - dt;
      let q = x;
      for (let k = 0; k < 40; k++) {
        const mid = (p + q) / 2;
        if (g(p) * g(mid) <= 0) q = mid;
        else p = mid;
      }
      return (p + q) / 2;
    }
    prev = cur;
  }
  return (A + bx) / 2;
}

export function MeanValueTheoremLab() {
  return (
    <JsxBoard
      boundingBox={[-2.6, 3, 3.4, -3.2]}
      keepAspectRatio={false}
      ariaLabel="平均値の定理：弦に平行な接線"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [f, -2.3, 3.2], curveStyle(NEON.cyan, 3));

        const bx = b.create("slider", [[-2.4, 2.6], [0.4, 2.6], [0.6, 2.4, 3.1]], {
          name: "b", snapWidth: 0.05, ...sliderStyle(NEON.amber),
        });

        const pA = b.create("point", [A, f(A)], {
          name: "a", ...pointStyle(NEON.muted), fixed: true,
        });
        const pB = b.create("point", [() => bx.Value(), () => f(bx.Value())], {
          name: "b", ...pointStyle(NEON.muted),
        });
        // secant (chord)
        b.create("line", [pA, pB], {
          strokeColor: NEON.magenta, strokeWidth: 2, dash: 2,
        });

        const slope = () => (f(bx.Value()) - f(A)) / (bx.Value() - A);
        const cx = () => findC(bx.Value(), slope());

        // parallel tangent at c
        b.create(
          "line",
          [
            [() => cx(), () => f(cx())],
            [() => cx() + 1, () => f(cx()) + slope()],
          ],
          {
            strokeColor: NEON.lime, strokeWidth: 2,
            straightFirst: true, straightLast: true,
          },
        );
        b.create("point", [() => cx(), () => f(cx())], {
          name: "c", ...pointStyle(NEON.lime),
        });

        b.create("text", [-2.5, -2.8, () => {
          return `傾き = (f(b)−f(a))/(b−a) = ${slope().toFixed(3)} = f'(c),  c = ${cx().toFixed(3)}`;
        }], textStyle);
      }}
    />
  );
}
