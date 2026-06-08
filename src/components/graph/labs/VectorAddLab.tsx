"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Vector addition by the parallelogram rule. Drag the tips A and B; the sum
 * a + b = OC is the diagonal of the parallelogram OACB. The slider scales b.
 */
export function VectorAddLab() {
  return (
    <JsxBoard
      boundingBox={[-5, 5, 5, -5]}
      keepAspectRatio
      ariaLabel="ベクトルの和（平行四辺形の法則）"
      init={(board) => {
        const b = board;
        const O: [number, number] = [0, 0];
        const kS = b.create("slider", [[-4.6, 4.5], [-2, 4.5], [-1.5, 1, 2]], {
          name: "k (b 倍)", snapWidth: 0.1, ...sliderStyle(NEON.amber),
        });

        const A = b.create("point", [3, 1], {
          name: "A", size: 4, fillColor: NEON.cyan, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });
        const B = b.create("point", [1, 3], {
          name: "B", size: 4, fillColor: NEON.magenta, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });
        // scaled b
        const Bk = b.create("point", [() => kS.Value() * B.X(), () => kS.Value() * B.Y()], {
          visible: false,
        });
        const C = b.create("point", [() => A.X() + Bk.X(), () => A.Y() + Bk.Y()], {
          name: "C", size: 4, fillColor: NEON.lime, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });

        b.create("arrow", [O, A], { strokeColor: NEON.cyan, strokeWidth: 2.5 });
        b.create("arrow", [O, Bk], { strokeColor: NEON.magenta, strokeWidth: 2.5 });
        b.create("arrow", [O, C], { strokeColor: NEON.lime, strokeWidth: 3 });
        // parallelogram sides
        b.create("segment", [A, C], { strokeColor: NEON.magenta, strokeWidth: 1, dash: 2 });
        b.create("segment", [Bk, C], { strokeColor: NEON.cyan, strokeWidth: 1, dash: 2 });

        b.create("text", [-4.9, -4.5, () => {
          const cx = A.X() + kS.Value() * B.X();
          const cy = A.Y() + kS.Value() * B.Y();
          return `a + ${kS.Value().toFixed(1)}b = (${cx.toFixed(1)}, ${cy.toFixed(1)})`;
        }], textStyle);
      }}
    />
  );
}
