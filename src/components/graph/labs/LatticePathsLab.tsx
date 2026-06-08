"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Shortest lattice paths on a W×H grid (only right/up moves). The number of
 * such paths is C(W+H, H). Sliders resize the grid and the count updates,
 * making the "choose where the up-moves go" interpretation tangible.
 */
const MAXW = 6;
const MAXH = 5;

function comb(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  r = Math.min(r, n - r);
  let num = 1;
  for (let i = 0; i < r; i++) num = (num * (n - i)) / (i + 1);
  return Math.round(num);
}

export function LatticePathsLab() {
  return (
    <JsxBoard
      boundingBox={[-1.4, 7, 7.6, -1.6]}
      keepAspectRatio
      ariaLabel="格子の最短経路の数"
      init={(board) => {
        const b = board;
        const W = b.create(
          "slider",
          [[0, 6.4], [2.8, 6.4], [1, 4, MAXW]],
          { name: "横 W", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );
        const H = b.create(
          "slider",
          [[4, 6.4], [6.8, 6.4], [1, 3, MAXH]],
          { name: "縦 H", snapWidth: 1, ...sliderStyle(NEON.violet) },
        );

        // grid lines (fixed pool, shown up to current W/H)
        for (let k = 0; k <= MAXW; k++) {
          b.create(
            "segment",
            [[k, 0], [k, () => H.Value()]],
            {
              strokeColor: NEON.faint,
              strokeWidth: 1,
              visible: () => k <= W.Value(),
              fixed: true,
            },
          );
        }
        for (let m = 0; m <= MAXH; m++) {
          b.create(
            "segment",
            [[0, m], [() => W.Value(), m]],
            {
              strokeColor: NEON.faint,
              strokeWidth: 1,
              visible: () => m <= H.Value(),
              fixed: true,
            },
          );
        }

        // lattice points
        for (let k = 0; k <= MAXW; k++) {
          for (let m = 0; m <= MAXH; m++) {
            b.create("point", [k, m], {
              name: "",
              size: 2,
              fillColor: NEON.cyan,
              strokeColor: NEON.cyan,
              visible: () => k <= W.Value() && m <= H.Value(),
              fixed: true,
            });
          }
        }

        // start / goal emphasis
        b.create("point", [0, 0], { name: "S", size: 4, fillColor: NEON.lime, strokeColor: "#0b0f1a", fixed: true });
        b.create("point", [() => W.Value(), () => H.Value()], {
          name: "G",
          size: 4,
          fillColor: NEON.magenta,
          strokeColor: "#0b0f1a",
          fixed: true,
        });

        b.create("text", [
          -1.3,
          -1.2,
          () => {
            const w = Math.round(W.Value());
            const h = Math.round(H.Value());
            return `最短経路 = C(${w + h}, ${h}) = ${comb(w + h, h)} 通り`;
          },
        ], textStyle);
      }}
    />
  );
}
