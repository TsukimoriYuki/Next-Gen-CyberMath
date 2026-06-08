"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Grouped sequence. The natural numbers 1,2,3,… are split into groups whose
 * g-th group has g terms: |1|2 3|4 5 6|7 8 9 10|… The cumulative count up to
 * group g is the triangular number T_g=g(g+1)/2. Slide N to see which group g
 * and position j inside it the N-th term falls into.
 */
const ROWS = 7;

// 第 N 項が属する群 g と群内位置 j を返す。
function locate(N: number): { g: number; j: number } {
  const g = Math.ceil((Math.sqrt(8 * N + 1) - 1) / 2);
  const prev = ((g - 1) * g) / 2;
  return { g, j: N - prev };
}
function cellPos(g: number, j: number): [number, number] {
  const x = -(g - 1) / 2 + (j - 1);
  const y = ROWS - g + 1;
  return [x, y];
}

export function GroupedSequenceLab() {
  return (
    <JsxBoard
      boundingBox={[-5, 9, 5, -1.4]}
      keepAspectRatio
      ariaLabel="群数列の第N項の位置"
      init={(board) => {
        const b = board;

        // 各群を区切り表示（番号入りのマス）
        for (let g = 1; g <= ROWS; g++) {
          const prev = ((g - 1) * g) / 2;
          for (let j = 1; j <= g; j++) {
            const [x, y] = cellPos(g, j);
            b.create("text", [x - 0.18, y, `${prev + j}`], {
              fontSize: 11,
              cssStyle: "color:#475569;font-family:var(--font-mono,monospace);",
              fixed: true,
            });
          }
        }

        const total = (ROWS * (ROWS + 1)) / 2;
        const s = b.create("slider", [[-4.6, -0.7], [3, -0.7], [1, 5, total]], {
          name: "N", snapWidth: 1, ...sliderStyle(NEON.violet),
        });

        // N の位置に乗る強調マーカー
        const mk = b.create(
          "point",
          [
            () => cellPos(locate(Math.round(s.Value())).g, locate(Math.round(s.Value())).j)[0],
            () => cellPos(locate(Math.round(s.Value())).g, locate(Math.round(s.Value())).j)[1],
          ],
          { name: "", size: 9, fillColor: "transparent", strokeColor: NEON.magenta, strokeWidth: 2.5 },
        );
        b.create("point", [() => mk.X(), () => mk.Y()], { name: "", ...pointStyle(NEON.cyan) });

        b.create("text", [-4.9, 8.4, () => {
          const N = Math.round(s.Value());
          const { g, j } = locate(N);
          return `第 ${N} 項 → 第 ${g} 群 の 第 ${j} 項（値 ${N}）`;
        }], textStyle);
      }}
    />
  );
}
