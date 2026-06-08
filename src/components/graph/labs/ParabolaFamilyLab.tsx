"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Family  y = x² − 2t·x  (= (x−t)² − t²).  As t varies the vertex
 * (t, −t²) traces the parabola y = −x². The slider moves the whole curve;
 * the locus of vertices is drawn as the neon boundary.
 */
export function ParabolaFamilyLab() {
  return (
    <JsxBoard
      boundingBox={[-3.4, 3, 3.4, -5]}
      ariaLabel="放物線族 y = x² − 2tx と頂点の軌跡"
      init={(board) => {
        const b = board;

        // Locus of vertices: y = -x²
        b.create("functiongraph", [(x: number) => -x * x, -3.4, 3.4], {
          ...curveStyle(NEON.cyan, 3),
          dash: 0,
        });

        const t = b.create(
          "slider",
          [[-3, 2.5], [2, 2.5], [-2.6, 1, 2.6]],
          { name: "t", snapWidth: 0.01, ...sliderStyle(NEON.magenta) },
        );

        // Moving parabola
        b.create(
          "functiongraph",
          [(x: number) => x * x - 2 * t.Value() * x, -3.4, 3.4],
          curveStyle(NEON.magenta, 2.5),
        );

        // Vertex point (t, -t²)
        b.create("point", [() => t.Value(), () => -(t.Value() ** 2)], {
          name: "頂点",
          ...pointStyle(NEON.lime),
        });

        b.create("text", [
          -3.2,
          -4.4,
          () => {
            const tv = t.Value();
            return `頂点 (${tv.toFixed(2)}, ${(-(tv * tv)).toFixed(2)})`;
          },
        ], textStyle);
      }}
    />
  );
}
