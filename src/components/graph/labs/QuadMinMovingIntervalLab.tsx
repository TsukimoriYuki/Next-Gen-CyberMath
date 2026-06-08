"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * FIXED parabola f(x) = x² − 2x (vertex at x = 1, min −1).
 * Slider t slides the width-1 interval [t, t+1]. The minimum on the interval
 * is at the right end (t+1<1), the vertex (t≤1≤t+1), or the left end (t>1).
 */
export function QuadMinMovingIntervalLab() {
  const f = (x: number) => x * x - 2 * x;
  // minimizer of f on [t, t+1]
  const argmin = (t: number) => (t + 1 < 1 ? t + 1 : t > 1 ? t : 1);
  return (
    <JsxBoard
      boundingBox={[-1.7, 4, 3.7, -2]}
      keepAspectRatio={false}
      ariaLabel="f(x)=x²−2x の動く区間 [t,t+1] 上の最小値"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [f, -1.6, 3.6], curveStyle(NEON.cyan, 3));

        const t = b.create(
          "slider",
          [[0.2, 3.5], [2.4, 3.5], [-1.2, -0.3, 2.2]],
          { name: "t", snapWidth: 0.05, ...sliderStyle(NEON.magenta) },
        );

        // moving interval [t, t+1] on the x-axis
        b.create(
          "segment",
          [[() => t.Value(), 0], [() => t.Value() + 1, 0]],
          { strokeColor: NEON.magenta, strokeWidth: 5 },
        );
        for (const which of [0, 1]) {
          b.create(
            "line",
            [
              [() => t.Value() + which, 0],
              [() => t.Value() + which, 1],
            ],
            {
              strokeColor: NEON.faint,
              strokeWidth: 1,
              dash: 2,
              straightFirst: true,
              straightLast: true,
            },
          );
        }

        // minimum point on the interval
        const mx = () => argmin(t.Value());
        b.create("point", [mx, () => f(mx())], {
          name: "最小",
          ...pointStyle(NEON.lime),
        });

        b.create("text", [
          -1.6,
          -1.6,
          () => {
            const tv = t.Value();
            const x = argmin(tv);
            const where =
              tv + 1 < 1 ? "x=t+1" : tv > 1 ? "x=t" : "x=1 (頂点)";
            return `最小値 = ${f(x).toFixed(2)}  (${where})`;
          },
        ], textStyle);
      }}
    />
  );
}
