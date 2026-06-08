"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Signed-area accumulation = position from velocity. With v(t)=3t²−6t, the
 * integral x(T)=∫₀ᵀ v dt = T³−3T² accumulates area with sign: where v<0
 * (here 0<t<2) the area is subtracted, so the point can return to the origin
 * (x(3)=0). Drag T to watch the shaded swept area and the running value.
 */
const v = (t: number) => 3 * t * t - 6 * t;

export function SignedAreaAccumulationLab() {
  return (
    <JsxBoard
      boundingBox={[-0.7, 9.5, 3.5, -4.6]}
      keepAspectRatio={false}
      ariaLabel="符号付き面積の累積（速度から位置）"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [v, -0.3, 3.3], curveStyle(NEON.cyan, 3));

        const T = b.create("slider", [[0.3, 8.6], [2.3, 8.6], [0, 2.2, 3]], {
          name: "T", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });

        // swept region between the curve and the x-axis, from 0 to T
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
          const t = T.Value();
          const N = 60;
          const xs: number[] = [0];
          const ys: number[] = [0];
          for (let i = 0; i <= N; i++) {
            const x = (t * i) / N;
            xs.push(x);
            ys.push(v(x));
          }
          xs.push(t);
          ys.push(0);
          this.dataX = xs;
          this.dataY = ys;
        };
        b.update();

        b.create("point", [() => T.Value(), 0], {
          name: "T", ...pointStyle(NEON.magenta),
        });

        b.create("text", [-0.6, -3.7, () => {
          const t = T.Value();
          const val = t * t * t - 3 * t * t;
          return `x(T)=∫₀ᵀ v dt = T³−3T² = ${val.toFixed(2)}   （0<t<2 では v<0 ＝ 面積はマイナス）`;
        }], textStyle);
      }}
    />
  );
}
