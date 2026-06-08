"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Cobweb plot for a linear recurrence a_{n+1} = r·a_n + 1. The staircase
 * between y = f(x) and y = x converges to the fixed point x* = 1/(1−r)
 * (the root of the characteristic equation) when |r| < 1, diverges otherwise.
 */
export function SpiderWebPlotLab() {
  return (
    <JsxBoard
      boundingBox={[-1, 6, 6, -1]}
      keepAspectRatio
      ariaLabel="漸化式のクモの巣グラフ"
      init={(board) => {
        const b = board;
        const rS = b.create("slider", [[0.2, 5.6], [2.4, 5.6], [-1.1, 0.5, 1.1]], {
          name: "r", snapWidth: 0.05, ...sliderStyle(NEON.magenta),
        });
        const a1 = b.create("slider", [[3, 5.6], [5.6, 5.6], [-0.5, 4.5, 5.5]], {
          name: "a₁", snapWidth: 0.1, ...sliderStyle(NEON.cyan),
        });

        const f = (x: number) => rS.Value() * x + 1;

        // y = x and y = f(x)
        b.create("line", [[0, 0], [1, 1]], {
          strokeColor: NEON.muted, strokeWidth: 1, dash: 2, straightFirst: true, straightLast: true,
        });
        b.create("functiongraph", [(x: number) => f(x), -1, 6], curveStyle(NEON.violet, 2.5));

        // fixed point
        b.create("point", [() => 1 / (1 - rS.Value()), () => 1 / (1 - rS.Value())], {
          name: "x*", size: 3, fillColor: NEON.lime, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#b6f24a;font-family:var(--font-mono,monospace);" },
        });

        // cobweb polyline via updateDataArray
        const cob = b.create("curve", [[0], [0]], {
          strokeColor: NEON.cyan,
          strokeWidth: 2,
        }) as unknown as {
          updateDataArray?: () => void;
          dataX: number[];
          dataY: number[];
        };
        cob.updateDataArray = function (this: { dataX: number[]; dataY: number[] }) {
          let x = a1.Value();
          const xs = [x];
          const ys = [0];
          for (let i = 0; i < 14; i++) {
            const y = f(x);
            xs.push(x); ys.push(y); // vertical to curve
            xs.push(y); ys.push(y); // horizontal to y=x
            x = y;
            if (Math.abs(x) > 50) break;
          }
          this.dataX = xs;
          this.dataY = ys;
        };
        b.update();

        b.create("text", [-0.9, -0.6, () => {
          const r = rS.Value();
          const conv = Math.abs(r) < 1 ? "収束" : "発散";
          return `a_{n+1}=${r.toFixed(2)}·a_n+1   x*=${(1 / (1 - r)).toFixed(2)}   (${conv})`;
        }], textStyle);
      }}
    />
  );
}
