"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Pascal's triangle of C(n,k). A slider walks through the interior cells;
 * the chosen cell and its two "parents" are ringed, illustrating the
 * addition rule  C(n,k) = C(n−1,k−1) + C(n−1,k).
 */
const ROWS = 6;

function comb(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  r = Math.min(r, n - r);
  let num = 1;
  for (let i = 0; i < r; i++) num = (num * (n - i)) / (i + 1);
  return Math.round(num);
}

const pos = (i: number, j: number): [number, number] => [
  (j - i / 2) * 1.15,
  -i * 1.0,
];

// interior cells (have two parents): i = 2..ROWS, j = 1..i-1
const INTERIOR: { i: number; j: number }[] = [];
for (let i = 2; i <= ROWS; i++) {
  for (let j = 1; j <= i - 1; j++) INTERIOR.push({ i, j });
}

export function PascalTriangleLab() {
  return (
    <JsxBoard
      boundingBox={[-4.6, 1.6, 4.6, -7]}
      keepAspectRatio
      ariaLabel="パスカルの三角形と組合せの加法定理"
      init={(board) => {
        const b = board;
        const sel = b.create(
          "slider",
          [[-4, 1.1], [1, 1.1], [0, 7, INTERIOR.length - 1]],
          { name: "cell", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        const cur = () => INTERIOR[Math.round(sel.Value())];
        const isSel = (i: number, j: number) => {
          const c = cur();
          return c.i === i && c.j === j;
        };
        const isParent = (i: number, j: number) => {
          const c = cur();
          return c.i - 1 === i && (c.j - 1 === j || c.j === j);
        };

        // number labels
        for (let i = 0; i <= ROWS; i++) {
          for (let j = 0; j <= i; j++) {
            const [x, y] = pos(i, j);
            b.create("text", [x, y, () => `${comb(i, j)}`], {
              anchorX: "middle",
              anchorY: "middle",
              fontSize: 15,
              cssStyle:
                "color:#aeb8d4;font-family:var(--font-mono,monospace);font-weight:600;",
            });
          }
        }

        // highlight rings (selected + two parents)
        for (let i = 0; i <= ROWS; i++) {
          for (let j = 0; j <= i; j++) {
            const [x, y] = pos(i, j);
            const active = () => isSel(i, j) || isParent(i, j);
            b.create("circle", [[x, y], 0.42], {
              strokeColor: () => (isSel(i, j) ? NEON.lime : NEON.magenta),
              strokeWidth: 2,
              strokeOpacity: () => (active() ? 1 : 0),
              fillColor: () => (isSel(i, j) ? NEON.lime : NEON.magenta),
              fillOpacity: () => (active() ? 0.14 : 0),
              fixed: true,
              highlight: false,
            });
          }
        }

        b.create("text", [
          -4.5,
          -6.4,
          () => {
            const c = cur();
            const child = comb(c.i, c.j);
            const p1 = comb(c.i - 1, c.j - 1);
            const p2 = comb(c.i - 1, c.j);
            return `C(${c.i},${c.j}) = C(${c.i - 1},${c.j - 1}) + C(${c.i - 1},${c.j}) :  ${child} = ${p1} + ${p2}`;
          },
        ], textStyle);
      }}
    />
  );
}
