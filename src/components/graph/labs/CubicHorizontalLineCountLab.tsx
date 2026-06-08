"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Counting real roots of x³−3x²+2=k as intersections of y=f(x) with the
 * horizontal line y=k. The extrema (max 2 at x=0, min −2 at x=2) are the
 * thresholds: k>2 or k<−2 gives 1 root, k=±2 gives 2, and −2<k<2 gives 3.
 * Drag k across the extrema to watch the count jump.
 */
const f = (x: number) => x * x * x - 3 * x * x + 2;

export function CubicHorizontalLineCountLab() {
  return (
    <JsxBoard
      boundingBox={[-1.7, 5.2, 3.7, -4.3]}
      keepAspectRatio={false}
      ariaLabel="3次関数と水平線の交点数"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [f, -1.3, 3.4], curveStyle(NEON.cyan, 3));

        b.create("point", [0, 2], { name: "極大", ...pointStyle(NEON.lime), fixed: true });
        b.create("point", [2, -2], { name: "極小", ...pointStyle(NEON.amber), fixed: true });

        const k = b.create("slider", [[-1.3, 4.6], [1.5, 4.6], [-4, 1, 5]], {
          name: "k", snapWidth: 0.05, ...sliderStyle(NEON.magenta),
        });
        b.create("line", [[-1.7, () => k.Value()], [3.7, () => k.Value()]], {
          strokeColor: NEON.magenta, strokeWidth: 2,
          straightFirst: true, straightLast: true,
        });

        b.create("text", [-1.6, -3.5, () => {
          const K = k.Value();
          const lo = -3;
          const hi = 5;
          const N = 2000;
          let prev = f(lo) - K;
          let cnt = 0;
          for (let i = 1; i <= N; i++) {
            const cur = f(lo + ((hi - lo) * i) / N) - K;
            if (prev === 0 || prev * cur < 0) cnt++;
            prev = cur;
          }
          return `y=k=${K.toFixed(2)} → 異なる実数解 ${cnt} 個   （境界は極大 2・極小 −2）`;
        }], textStyle);
      }}
    />
  );
}
