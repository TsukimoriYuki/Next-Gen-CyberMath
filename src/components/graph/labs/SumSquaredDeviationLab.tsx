"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * f(t)=Σ(xᵢ−t)² as a function of the "center" t. For the data {2,4,4,6,9}
 * (mean 5) this is a convex parabola minimized exactly at t = mean, where the
 * value equals n·(variance). Slide t to feel that the balance point that
 * minimizes total squared deviation is the mean.
 */
const DATA = [2, 4, 4, 6, 9];
const n = DATA.length;
const sum = DATA.reduce((a, b) => a + b, 0);
const sum2 = DATA.reduce((a, b) => a + b * b, 0);
const mean = sum / n;
const f = (t: number) => n * t * t - 2 * sum * t + sum2;

export function SumSquaredDeviationLab() {
  return (
    <JsxBoard
      boundingBox={[-0.8, 172, 10.8, -28]}
      keepAspectRatio={false}
      ariaLabel="二乗偏差の和を最小にする中心"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [f, 0, 10], curveStyle(NEON.cyan, 3));

        // data dots on the t-axis
        for (const x of DATA) {
          b.create("point", [x, 0], {
            name: "", size: 3, fillColor: NEON.amber, strokeColor: "#0b0f1a", fixed: true,
          });
        }
        // mean line (the minimizer)
        b.create("line", [[mean, -28], [mean, 172]], {
          strokeColor: NEON.lime, strokeWidth: 1.5, dash: 2,
          straightFirst: true, straightLast: true,
        });

        const t = b.create("slider", [[0.4, 158], [4.4, 158], [0, 2.5, 10]], {
          name: "t", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });
        b.create("point", [() => t.Value(), () => f(t.Value())], {
          name: "", ...pointStyle(NEON.magenta),
        });

        b.create("text", [-0.7, -18, () => {
          const v = f(t.Value());
          return `f(t)=Σ(xᵢ−t)² = ${v.toFixed(1)}   （最小は t=平均=${mean} で ${f(mean).toFixed(0)} ＝ n×分散）`;
        }], textStyle);
      }}
    />
  );
}
