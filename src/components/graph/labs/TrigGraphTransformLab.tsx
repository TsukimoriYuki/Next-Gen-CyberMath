"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * y = a·sin(b·x + c) + d. Sliders expose amplitude a, period 2π/b, phase
 * shift −c/b, and vertical shift d. The faint reference y = sin x shows what
 * each parameter changes.
 */
export function TrigGraphTransformLab() {
  return (
    <JsxBoard
      boundingBox={[-0.6, 4.2, 7, -4.2]}
      keepAspectRatio={false}
      ariaLabel="y = a sin(bx + c) + d のグラフ変形"
      init={(board) => {
        const b = board;
        const TWO_PI = 2 * Math.PI;
        const aS = b.create("slider", [[0.4, 3.6], [3.0, 3.6], [-3, 2, 3]], {
          name: "a", snapWidth: 0.1, ...sliderStyle(NEON.cyan),
        });
        const bS = b.create("slider", [[0.4, 3.15], [3.0, 3.15], [0.5, 2, 4]], {
          name: "b", snapWidth: 0.5, ...sliderStyle(NEON.magenta),
        });
        const cS = b.create("slider", [[4, 3.6], [6.6, 3.6], [-3.14, 0, 3.14]], {
          name: "c", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });
        const dS = b.create("slider", [[4, 3.15], [6.6, 3.15], [-2, 0, 2]], {
          name: "d", snapWidth: 0.1, ...sliderStyle(NEON.amber),
        });

        // reference y = sin x
        b.create("functiongraph", [(x: number) => Math.sin(x), 0, TWO_PI], {
          strokeColor: NEON.faint,
          strokeWidth: 1.5,
          dash: 2,
        });

        // transformed curve
        b.create(
          "functiongraph",
          [
            (x: number) =>
              aS.Value() * Math.sin(bS.Value() * x + cS.Value()) + dS.Value(),
            0,
            TWO_PI,
          ],
          curveStyle(NEON.cyan, 3),
        );

        b.create("text", [
          -0.5,
          -3.7,
          () => {
            const period = TWO_PI / bS.Value();
            return `振幅 ${Math.abs(aS.Value()).toFixed(1)}  周期 ${period.toFixed(2)}  位相 ${(-cS.Value() / bS.Value()).toFixed(2)}`;
          },
        ], textStyle);
      }}
    />
  );
}
