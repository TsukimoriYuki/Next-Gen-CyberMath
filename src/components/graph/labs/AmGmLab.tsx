"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * y = x + 1/x (x>0). Drag the slider; the point rides the curve and the
 * value display confirms the minimum value 2 is reached only at x = 1.
 */
export function AmGmLab() {
  return (
    <JsxBoard
      boundingBox={[-0.6, 6, 5, -0.6]}
      ariaLabel="y = x + 1/x のグラフと最小値"
      init={(board) => {
        const b = board;
        const f = (x: number) => x + 1 / x;

        b.create("functiongraph", [f, 0.08, 5], curveStyle(NEON.cyan, 3));

        // y = 2 reference line (the minimum value)
        b.create("line", [[0, 2], [1, 2]], {
          straightFirst: true,
          straightLast: true,
          strokeColor: NEON.amber,
          strokeWidth: 1.5,
          dash: 2,
        });

        const a = b.create(
          "slider",
          [[1.2, 5.4], [4.4, 5.4], [0.12, 2.2, 4.6]],
          { name: "x", snapWidth: 0.01, ...sliderStyle(NEON.magenta) },
        );

        const P = b.create(
          "point",
          [() => a.Value(), () => f(a.Value())],
          { name: "", ...pointStyle(NEON.magenta) },
        );

        // dashed drop-lines to the axes
        b.create("segment", [[() => a.Value(), 0], P], {
          strokeColor: NEON.muted,
          dash: 1,
          strokeWidth: 1,
        });

        b.create("text", [
          -0.4,
          -0.35,
          () => {
            const x = a.Value();
            return `x + 1/x = ${f(x).toFixed(3)}`;
          },
        ], textStyle);
      }}
    />
  );
}
