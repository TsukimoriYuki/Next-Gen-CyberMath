"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Probability recurrence on a triangle. A point starts at A and each step moves
 * to one of the other two vertices with probability 1/2. Let aₙ=P(at A after n
 * steps); then aₙ₊₁=(1−aₙ)/2, so aₙ = 1/3 + (2/3)(−1/2)ⁿ → 1/3. By symmetry the
 * other two share (1−aₙ)/2 each. Slide n: the disk radii (probabilities)
 * oscillate toward the uniform 1/3.
 */
const A: [number, number] = [0, 1.7];
const B: [number, number] = [-1.6, -1.1];
const C: [number, number] = [1.6, -1.1];

function aOf(n: number): number {
  return 1 / 3 + (2 / 3) * Math.pow(-1 / 2, n);
}

export function ProbStateTransitionLab() {
  return (
    <JsxBoard
      boundingBox={[-3, 3, 3, -3]}
      keepAspectRatio
      ariaLabel="確率漸化式：3頂点を動く点の確率分布"
      init={(board) => {
        const b = board;
        b.create("polygon", [A, B, C], {
          borders: { strokeColor: NEON.muted, strokeWidth: 1.5 },
          fillOpacity: 0,
          vertices: { visible: false },
        });

        const n = b.create("slider", [[-2.7, 2.6], [0.6, 2.6], [0, 3, 20]], {
          name: "n（ステップ）", snapWidth: 1, ...sliderStyle(NEON.violet),
        });
        const pa = () => aOf(Math.round(n.Value()));
        const po = () => (1 - pa()) / 2; // 他の 2 頂点それぞれ

        const disk = (
          pos: [number, number],
          prob: () => number,
          color: string,
          label: string,
        ) => {
          b.create("circle", [pos, () => 0.18 + prob() * 1.0], {
            strokeColor: color, strokeWidth: 2,
            fillColor: color, fillOpacity: 0.18,
          });
          b.create("point", pos, { name: label, ...pointStyle(color), fixed: true });
        };
        disk(A, pa, NEON.magenta, "A");
        disk(B, po, NEON.cyan, "B");
        disk(C, po, NEON.cyan, "C");

        b.create("text", [-2.9, -2.6, () => {
          const N = Math.round(n.Value());
          return `n=${N}: aₙ=P(A)=${pa().toFixed(3)}, P(B)=P(C)=${po().toFixed(3)} → 1/3 へ`;
        }], textStyle);
      }}
    />
  );
}
