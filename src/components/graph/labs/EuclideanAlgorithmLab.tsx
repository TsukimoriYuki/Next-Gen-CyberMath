"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Geometric Euclidean algorithm: tile an a×b rectangle with the largest
 * possible squares, repeatedly. The side of the smallest square equals
 * gcd(a, b). Sliders change a, b; the tiling and the gcd update live.
 */
const MAX = 24;
const PALETTE = [NEON.cyan, NEON.magenta, NEON.violet, NEON.lime, NEON.amber];

function squares(a: number, b: number): { x: number; y: number; s: number }[] {
  let x = 0, y = 0, w = Math.round(a), h = Math.round(b);
  const out: { x: number; y: number; s: number }[] = [];
  let guard = 0;
  while (w > 0 && h > 0 && guard < MAX) {
    const s = Math.min(w, h);
    out.push({ x, y, s });
    if (w >= h) { x += s; w -= s; } else { y += s; h += -s; }
    guard++;
  }
  return out;
}

export function EuclideanAlgorithmLab() {
  return (
    <JsxBoard
      boundingBox={[-1.5, 14, 14, -1.5]}
      keepAspectRatio
      ariaLabel="ユークリッドの互除法の幾何的表現"
      init={(board) => {
        const b = board;
        const A = b.create("slider", [[6, 13.4], [13, 13.4], [2, 8, 13]], {
          name: "a", snapWidth: 1, ...sliderStyle(NEON.cyan),
        });
        const B = b.create("slider", [[6, 12.4], [13, 12.4], [2, 3, 13]], {
          name: "b", snapWidth: 1, ...sliderStyle(NEON.magenta),
        });

        // outer rectangle
        b.create("polygon", [
          [0, 0], [() => A.Value(), 0], [() => A.Value(), () => B.Value()], [0, () => B.Value()],
        ], { borders: { strokeColor: NEON.muted, strokeWidth: 2 }, fillOpacity: 0, vertices: { visible: false } });

        // square pool
        for (let k = 0; k < MAX; k++) {
          const sq = () => squares(A.Value(), B.Value())[k];
          const color = PALETTE[k % PALETTE.length];
          b.create("polygon", [
            [() => (sq() ? sq().x : 0), () => (sq() ? sq().y : 0)],
            [() => (sq() ? sq().x + sq().s : 0), () => (sq() ? sq().y : 0)],
            [() => (sq() ? sq().x + sq().s : 0), () => (sq() ? sq().y + sq().s : 0)],
            [() => (sq() ? sq().x : 0), () => (sq() ? sq().y + sq().s : 0)],
          ], {
            borders: { strokeColor: color, strokeWidth: 1.5 },
            fillColor: color,
            fillOpacity: 0.14,
            vertices: { visible: false },
            visible: () => !!squares(A.Value(), B.Value())[k],
          });
        }

        b.create("text", [-1.4, -1.1, () => {
          const list = squares(A.Value(), B.Value());
          const g = list.length ? list[list.length - 1].s : 0;
          return `gcd(${Math.round(A.Value())}, ${Math.round(B.Value())}) = ${g}  (最小の正方形の一辺)`;
        }], textStyle);
      }}
    />
  );
}
