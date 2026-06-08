"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Absolute-value definite integral. For g(x)=x²−x=x(x−1) the sign flips at
 * x=0 and x=1. The dashed cyan curve is g; the solid magenta curve is |g|,
 * the "folded-up" version whose area to the x-axis is the integral of |g|.
 * The slider sweeps the upper limit b; the readout shows ∫_{-1}^{b}|g| dx,
 * reaching 11/6 at b=2.
 */
const g = (x: number) => x * x - x;
const ag = (x: number) => Math.abs(g(x));

export function AbsValueIntegralLab() {
  return (
    <JsxBoard
      boundingBox={[-1.6, 2.4, 2.6, -0.9]}
      keepAspectRatio={false}
      ariaLabel="絶対値を含む定積分の符号領域"
      init={(board) => {
        const b = board;

        // sign-change guides at x=0 and x=1
        for (const gx of [0, 1]) {
          b.create("line", [[gx, -0.9], [gx, 2.4]], {
            strokeColor: NEON.faint, strokeWidth: 1, dash: 1,
            straightFirst: true, straightLast: true,
          });
        }

        b.create("functiongraph", [g, -1.3, 2.3], {
          strokeColor: NEON.cyan, strokeWidth: 2, dash: 2,
        });
        b.create("functiongraph", [ag, -1.3, 2.3], curveStyle(NEON.magenta, 3));

        const ub = b.create("slider", [[-1.3, 2.05], [0.7, 2.05], [-1, 2, 2]], {
          name: "上端 b", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });

        // accumulated area under |g| from -1 to b
        const region = b.create("curve", [[0], [0]], {
          strokeWidth: 0,
          fillColor: NEON.amber,
          fillOpacity: 0.22,
        }) as unknown as {
          dataX: number[];
          dataY: number[];
          updateDataArray: () => void;
        };
        region.updateDataArray = function () {
          const B = ub.Value();
          const lo = -1;
          const N = 60;
          const xs: number[] = [lo];
          const ys: number[] = [0];
          for (let i = 0; i <= N; i++) {
            const x = lo + ((B - lo) * i) / N;
            xs.push(x);
            ys.push(ag(x));
          }
          xs.push(B);
          ys.push(0);
          this.dataX = xs;
          this.dataY = ys;
        };
        b.update();

        b.create("text", [-1.55, -0.7, () => {
          const B = ub.Value();
          const N = 400;
          const lo = -1;
          const h = (B - lo) / N;
          let s = 0;
          for (let i = 0; i < N; i++) s += ag(lo + h * (i + 0.5)) * h;
          return `∫_{-1}^{b} |x²−x| dx = ${s.toFixed(3)}   （b=2 で 11/6 ≈ 1.833）`;
        }], { ...textStyle, fontSize: 13 });
      }}
    />
  );
}
