"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * y = aˣ and its inverse y = logₐx are mirror images across y = x.
 * The slider changes the base a; watch the two curves reflect into each other.
 */
export function ExpLogInverseLab() {
  return (
    <JsxBoard
      boundingBox={[-4, 4, 4, -4]}
      keepAspectRatio
      ariaLabel="y = aˣ と y = logₐx は y = x に関して対称"
      init={(board) => {
        const b = board;
        const aS = b.create("slider", [[-3.6, 3.6], [-1, 3.6], [1.3, 2, 4]], {
          name: "底 a", snapWidth: 0.1, ...sliderStyle(NEON.amber),
        });

        // mirror line y = x
        b.create("line", [[0, 0], [1, 1]], {
          strokeColor: NEON.muted, strokeWidth: 1, dash: 2,
          straightFirst: true, straightLast: true,
        });

        // y = aˣ
        b.create("functiongraph", [(x: number) => Math.pow(aS.Value(), x), -4, 4],
          curveStyle(NEON.cyan, 3));
        // y = logₐ x = ln x / ln a
        b.create(
          "functiongraph",
          [(x: number) => Math.log(x) / Math.log(aS.Value()), 0.02, 4],
          curveStyle(NEON.magenta, 3),
        );

        b.create("text", [-3.9, -3.5, () => `y = ${aS.Value().toFixed(1)}ˣ  と  y = log_${aS.Value().toFixed(1)} x`], textStyle);
      }}
    />
  );
}
