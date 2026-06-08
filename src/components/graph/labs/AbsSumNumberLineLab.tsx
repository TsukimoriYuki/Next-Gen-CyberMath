"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * |x−1|+|x+2| as a sum of distances on the number line. The two anchors sit
 * at −2 and 1; the magenta/cyan segments are the distances from x to each
 * anchor. While x stays between the anchors the sum is constant (= 3, the
 * distance between them); outside, it grows. The cyan curve is f(x), a V with
 * a flat bottom on [−2,1].
 */
const f = (x: number) => Math.abs(x - 1) + Math.abs(x + 2);

export function AbsSumNumberLineLab() {
  return (
    <JsxBoard
      boundingBox={[-5.6, 8, 5.6, -2.3]}
      keepAspectRatio={false}
      ariaLabel="絶対値の和は距離の和（数直線）"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [f, -5, 5], curveStyle(NEON.cyan, 3));

        b.create("point", [-2, 0], { name: "−2", ...pointStyle(NEON.amber), fixed: true });
        b.create("point", [1, 0], { name: "1", ...pointStyle(NEON.amber), fixed: true });

        const s = b.create("slider", [[-5, 7.4], [3, 7.4], [-5, -0.5, 5]], {
          name: "x", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });
        const P = b.create("point", [() => s.Value(), 0], { name: "x", ...pointStyle(NEON.magenta) });
        const G = b.create("point", [() => s.Value(), () => f(s.Value())], {
          name: "", size: 3, fillColor: NEON.lime, strokeColor: "#0b0f1a",
        });
        b.create("segment", [P, G], { strokeColor: NEON.muted, dash: 2, strokeWidth: 1 });

        // the two distances along the axis
        b.create("segment", [P, [-2, 0]], { strokeColor: NEON.magenta, strokeWidth: 3 });
        b.create("segment", [P, [1, 0]], { strokeColor: NEON.cyan, strokeWidth: 3 });

        b.create("text", [-5.5, -1.5, () => {
          const x = s.Value();
          return `f(x)=|x−1|+|x+2| = ${f(x).toFixed(2)}   （−2≤x≤1 で最小値 3 ＝ 2 点間の距離）`;
        }], textStyle);
      }}
    />
  );
}
