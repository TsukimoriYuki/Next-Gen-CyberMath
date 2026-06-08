"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * y = a·sin x + b·cos x  =  R·sin(x + φ),  R = √(a²+b²).
 * Sliders a, b reshape the wave; the dashed envelope ±R confirms the
 * amplitude is exactly √(a²+b²), and the curve is still a single sine.
 */
export function SineSynthesisLab() {
  return (
    <JsxBoard
      boundingBox={[-0.6, 3.4, 6.8, -3.4]}
      keepAspectRatio={false}
      ariaLabel="y = a sin x + b cos x の合成"
      init={(board) => {
        const b = board;
        const TWO_PI = 2 * Math.PI;

        const aS = b.create(
          "slider",
          [[0.4, 3.0], [3.0, 3.0], [-2.5, 2, 2.5]],
          { name: "a", snapWidth: 0.1, ...sliderStyle(NEON.cyan) },
        );
        const bS = b.create(
          "slider",
          [[0.4, 2.55], [3.0, 2.55], [-2.5, 1, 2.5]],
          { name: "b", snapWidth: 0.1, ...sliderStyle(NEON.violet) },
        );

        const R = () => Math.hypot(aS.Value(), bS.Value());

        // component waves (faint)
        b.create(
          "functiongraph",
          [(x: number) => aS.Value() * Math.sin(x), 0, TWO_PI],
          { strokeColor: NEON.cyan, strokeWidth: 1, dash: 2, strokeOpacity: 0.5 },
        );
        b.create(
          "functiongraph",
          [(x: number) => bS.Value() * Math.cos(x), 0, TWO_PI],
          { strokeColor: NEON.violet, strokeWidth: 1, dash: 2, strokeOpacity: 0.5 },
        );

        // synthesized wave
        b.create(
          "functiongraph",
          [
            (x: number) => aS.Value() * Math.sin(x) + bS.Value() * Math.cos(x),
            0,
            TWO_PI,
          ],
          curveStyle(NEON.magenta, 3),
        );

        // amplitude envelope ±R
        for (const sign of [1, -1]) {
          b.create(
            "line",
            [
              [0, () => sign * R()],
              [1, () => sign * R()],
            ],
            {
              strokeColor: NEON.lime,
              strokeWidth: 1.5,
              dash: 1,
              straightFirst: true,
              straightLast: true,
            },
          );
        }

        b.create("text", [
          -0.5,
          -3.0,
          () => {
            const r = R();
            return `R = √(a²+b²) = ${r.toFixed(3)}`;
          },
        ], textStyle);
      }}
    />
  );
}
