"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * The derivative as the slope of the tangent. For f(x) = x³/3 − x the slope
 * is f'(x) = x² − 1. Slide the point of tangency; the tangent line and the
 * slope value update, and the slope is zero exactly at the extrema x = ±1.
 */
export function TangentSlopeLab() {
  const f = (x: number) => (x * x * x) / 3 - x;
  const df = (x: number) => x * x - 1;
  return (
    <JsxBoard
      boundingBox={[-3, 3.2, 3, -3.2]}
      keepAspectRatio={false}
      ariaLabel="接線の傾き = 微分係数"
      init={(board) => {
        const b = board;
        b.create("functiongraph", [f, -3, 3], curveStyle(NEON.cyan, 3));

        const t = b.create("slider", [[-2.6, 2.7], [-0.4, 2.7], [-2.2, 0.6, 2.2]], {
          name: "x", snapWidth: 0.05, ...sliderStyle(NEON.magenta),
        });

        // tangent line: through (t, f(t)) with slope f'(t)
        b.create(
          "line",
          [
            [() => t.Value(), () => f(t.Value())],
            [() => t.Value() + 1, () => f(t.Value()) + df(t.Value())],
          ],
          { strokeColor: NEON.lime, strokeWidth: 2, straightFirst: true, straightLast: true },
        );
        b.create("point", [() => t.Value(), () => f(t.Value())], {
          name: "", ...pointStyle(NEON.magenta), fixed: true,
        });

        b.create("text", [-2.9, -2.8, () => {
          const x = t.Value();
          return `傾き f'(${x.toFixed(2)}) = ${df(x).toFixed(3)}`;
        }], textStyle);
      }}
    />
  );
}
