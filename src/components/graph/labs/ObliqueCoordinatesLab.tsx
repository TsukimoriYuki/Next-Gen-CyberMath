"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Oblique coordinates from a basis {e₁, e₂}. Drag the basis tips; the grid of
 * lines along e₁ and e₂ warps. A point P = s·e₁ + t·e₂ rides the grid. When
 * e₁ ∥ e₂ the grid collapses to a line — the basis becomes linearly dependent.
 */
const R = 3;
const L = 6;

export function ObliqueCoordinatesLab() {
  return (
    <JsxBoard
      boundingBox={[-6, 6, 6, -6]}
      keepAspectRatio
      ariaLabel="1次独立と斜交座標"
      init={(board) => {
        const b = board;
        const e1 = b.create("point", [2, 0.4], {
          name: "e₁", size: 5, fillColor: NEON.cyan, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#34e7e4;font-family:var(--font-mono,monospace);" },
        });
        const e2 = b.create("point", [0.6, 2], {
          name: "e₂", size: 5, fillColor: NEON.magenta, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#f472d6;font-family:var(--font-mono,monospace);" },
        });
        const sS = b.create("slider", [[-5.6, 5.6], [-3, 5.6], [-2, 1.5, 2]], {
          name: "s", snapWidth: 0.1, ...sliderStyle(NEON.lime),
        });
        const tS = b.create("slider", [[-5.6, 5.2], [-3, 5.2], [-2, 1, 2]], {
          name: "t", snapWidth: 0.1, ...sliderStyle(NEON.amber),
        });

        // grid lines: through k·e1 along e2, and through k·e2 along e1
        for (let kk = -R; kk <= R; kk++) {
          const k = kk;
          b.create("line", [
            [() => k * e1.X() - L * e2.X(), () => k * e1.Y() - L * e2.Y()],
            [() => k * e1.X() + L * e2.X(), () => k * e1.Y() + L * e2.Y()],
          ], { strokeColor: NEON.cyan, strokeWidth: k === 0 ? 1.8 : 0.8, strokeOpacity: k === 0 ? 0.9 : 0.4, straightFirst: false, straightLast: false });
          b.create("line", [
            [() => k * e2.X() - L * e1.X(), () => k * e2.Y() - L * e1.Y()],
            [() => k * e2.X() + L * e1.X(), () => k * e2.Y() + L * e1.Y()],
          ], { strokeColor: NEON.magenta, strokeWidth: k === 0 ? 1.8 : 0.8, strokeOpacity: k === 0 ? 0.9 : 0.4, straightFirst: false, straightLast: false });
        }

        b.create("arrow", [[0, 0], e1], { strokeColor: NEON.cyan, strokeWidth: 2.5 });
        b.create("arrow", [[0, 0], e2], { strokeColor: NEON.magenta, strokeWidth: 2.5 });

        // P = s e1 + t e2
        b.create("point", [
          () => sS.Value() * e1.X() + tS.Value() * e2.X(),
          () => sS.Value() * e1.Y() + tS.Value() * e2.Y(),
        ], { name: "P", size: 5, fillColor: NEON.lime, strokeColor: "#0b0f1a",
          label: { cssStyle: "color:#b6f24a;font-family:var(--font-mono,monospace);" } });

        b.create("text", [-5.9, -5.5, () => {
          const det = e1.X() * e2.Y() - e1.Y() * e2.X();
          const dep = Math.abs(det) < 0.15 ? "  ⚠ e₁∥e₂ → 1次従属" : "";
          return `det(e₁,e₂) = ${det.toFixed(2)}${dep}`;
        }], textStyle);
      }}
    />
  );
}
