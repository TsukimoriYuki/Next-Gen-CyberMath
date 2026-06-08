"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * The n-th roots of unity ζ_k = e^{2πik/n} sit at the vertices of a regular
 * n-gon inscribed in the unit circle. Slider n redraws the polygon; a single
 * parametric curve traces the edges so any n works.
 */
const MAX = 12;

export function RootsOfUnityLab() {
  return (
    <JsxBoard
      boundingBox={[-1.5, 1.5, 1.5, -1.5]}
      ariaLabel="1 の n 乗根と正 n 角形"
      init={(board) => {
        const b = board;

        b.create("circle", [[0, 0], 1], {
          strokeColor: NEON.muted,
          strokeWidth: 1.5,
          fillOpacity: 0,
          dash: 2,
        });

        const n = b.create(
          "slider",
          [[-1.3, 1.35], [1.0, 1.35], [2, 5, MAX]],
          { name: "n", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        const N = () => Math.round(n.Value());
        const ang = (k: number) => (2 * Math.PI * k) / N();

        // Polygon edges as one parametric curve: t in [0, N] visits each vertex.
        b.create(
          "curve",
          [
            (t: number) => {
              const j = Math.floor(t);
              const frac = t - j;
              const a0 = ang(j);
              const a1 = ang(j + 1);
              return Math.cos(a0) * (1 - frac) + Math.cos(a1) * frac;
            },
            (t: number) => {
              const j = Math.floor(t);
              const frac = t - j;
              const a0 = ang(j);
              const a1 = ang(j + 1);
              return Math.sin(a0) * (1 - frac) + Math.sin(a1) * frac;
            },
            0,
            () => N(),
          ],
          {
            strokeColor: NEON.magenta,
            strokeWidth: 2.5,
            fillColor: NEON.magenta,
            fillOpacity: 0.1,
          },
        );

        // Vertex pool (the actual roots), shown up to n.
        for (let k = 0; k < MAX; k++) {
          b.create(
            "point",
            [() => Math.cos(ang(k)), () => Math.sin(ang(k))],
            {
              name: "",
              ...pointStyle(k === 0 ? NEON.lime : NEON.cyan),
              visible: () => k < N(),
              fixed: true,
            },
          );
        }

        b.create("text", [
          -1.45,
          -1.3,
          () => `ζ_k = e^(2πik/${N()}),  k = 0 … ${N() - 1}`,
        ], textStyle);
      }}
    />
  );
}
