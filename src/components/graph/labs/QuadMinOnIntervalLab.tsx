"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * f(x) = x² − 2a·x + 2 on the FIXED domain 0 ≤ x ≤ 2.
 * Slider a moves the axis x = a. The minimum on [0,2] jumps between the
 * left endpoint, the vertex, and the right endpoint as a leaves the domain.
 */
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export function QuadMinOnIntervalLab() {
  const f = (x: number, a: number) => x * x - 2 * a * x + 2;
  return (
    <JsxBoard
      boundingBox={[-1.3, 6, 3.8, -1.3]}
      keepAspectRatio={false}
      ariaLabel="f(x)=x²−2ax+2 の [0,2] 上の最小値"
      init={(board) => {
        const b = board;

        const a = b.create(
          "slider",
          [[0.2, 5.4], [2.4, 5.4], [-1.5, 1, 3.5]],
          { name: "a", snapWidth: 0.05, ...sliderStyle(NEON.magenta) },
        );

        // domain [0,2] highlighted on the x-axis
        b.create("segment", [[0, 0], [2, 0]], {
          strokeColor: NEON.cyan,
          strokeWidth: 5,
          fixed: true,
        });
        for (const xb of [0, 2]) {
          b.create("line", [[xb, 0], [xb, 1]], {
            strokeColor: NEON.faint,
            strokeWidth: 1,
            dash: 2,
            straightFirst: true,
            straightLast: true,
          });
        }

        // axis x = a
        b.create(
          "line",
          [[() => a.Value(), 0], [() => a.Value(), 1]],
          {
            strokeColor: NEON.magenta,
            strokeWidth: 1.5,
            dash: 1,
            straightFirst: true,
            straightLast: true,
          },
        );

        // parabola
        b.create(
          "functiongraph",
          [(x: number) => f(x, a.Value()), -1.2, 3.6],
          curveStyle(NEON.magenta, 2.5),
        );

        // minimum point on [0,2]
        const mx = () => clamp(a.Value(), 0, 2);
        b.create("point", [mx, () => f(mx(), a.Value())], {
          name: "最小",
          ...pointStyle(NEON.lime),
        });

        b.create("text", [
          -1.2,
          -1.0,
          () => {
            const av = a.Value();
            const x = clamp(av, 0, 2);
            const where = av < 0 ? "x=0" : av > 2 ? "x=2" : "x=a (頂点)";
            return `最小値 = ${f(x, av).toFixed(2)}  (${where})`;
          },
        ], textStyle);
      }}
    />
  );
}
