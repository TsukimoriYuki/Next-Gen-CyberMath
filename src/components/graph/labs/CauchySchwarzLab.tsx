"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, textStyle } from "./theme";

/**
 * Cauchy–Schwarz for two plane vectors: |a·b| ≤ |a||b|, with equality iff
 * a ∥ b. Drag the tips; the readout shows |a·b| and |a||b| (and the gap, which
 * equals the parallelogram area |a||b|sinθ ≥ 0).
 */
export function CauchySchwarzLab() {
  return (
    <JsxBoard
      boundingBox={[-5, 5, 5, -5]}
      keepAspectRatio
      ariaLabel="コーシー・シュワルツの不等式とベクトル"
      init={(board) => {
        const b = board;
        const O: [number, number] = [0, 0];

        const A = b.create("point", [3, 1], {
          name: "a", size: 5, fillColor: NEON.cyan, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });
        const B = b.create("point", [1, 3], {
          name: "b", size: 5, fillColor: NEON.magenta, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });
        const C = b.create("point", [() => A.X() + B.X(), () => A.Y() + B.Y()], { visible: false });

        b.create("arrow", [O, A], { strokeColor: NEON.cyan, strokeWidth: 2.5 });
        b.create("arrow", [O, B], { strokeColor: NEON.magenta, strokeWidth: 2.5 });
        // parallelogram (area = |a||b| sinθ)
        b.create("polygon", [O, A, C, B], {
          borders: { strokeColor: NEON.muted, strokeWidth: 1, dash: 2 },
          fillColor: NEON.violet, fillOpacity: 0.14, vertices: { visible: false },
        });

        b.create("text", [-4.9, -4.0, () => {
          const dot = A.X() * B.X() + A.Y() * B.Y();
          const prod = Math.hypot(A.X(), A.Y()) * Math.hypot(B.X(), B.Y());
          return `|a·b| = ${Math.abs(dot).toFixed(2)}   ≤   |a||b| = ${prod.toFixed(2)}`;
        }], textStyle);
        b.create("text", [-4.9, -4.6, () => {
          const area = Math.abs(A.X() * B.Y() - A.Y() * B.X());
          return `平行四辺形の面積 |a||b|sinθ = ${area.toFixed(2)}  (0 で等号＝平行)`;
        }], { ...textStyle, cssStyle: "color:#6d28d9;font-family:var(--font-mono,monospace);font-size:13px;" });
      }}
    />
  );
}
