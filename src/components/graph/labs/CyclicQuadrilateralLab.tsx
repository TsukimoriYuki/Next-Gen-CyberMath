"use client";

import { JsxBoard, type JxgElement } from "../JsxBoard";
import { NEON, pointStyle, textStyle } from "./theme";

/**
 * A quadrilateral inscribed in a circle. Drag the four vertices around the
 * circle: the opposite interior angles always sum to 180° (∠A+∠C = ∠B+∠D =
 * 180°). This is why cos D = −cos B for a cyclic quadrilateral.
 */
const R = 2;

function interiorAngle(P: JxgElement, Q: JxgElement, S: JxgElement): number {
  const v1 = [P.X() - Q.X(), P.Y() - Q.Y()];
  const v2 = [S.X() - Q.X(), S.Y() - Q.Y()];
  const d = v1[0] * v2[0] + v1[1] * v2[1];
  const m = Math.hypot(v1[0], v1[1]) * Math.hypot(v2[0], v2[1]);
  return (Math.acos(Math.max(-1, Math.min(1, d / m))) * 180) / Math.PI;
}

export function CyclicQuadrilateralLab() {
  return (
    <JsxBoard
      boundingBox={[-3.3, 3.3, 3.3, -3.3]}
      keepAspectRatio
      ariaLabel="円に内接する四角形の対角の和"
      init={(board) => {
        const b = board;
        const circle = b.create("circle", [[0, 0], R], {
          strokeColor: NEON.muted, strokeWidth: 1.5, dash: 2, fillOpacity: 0,
        });
        const mk = (deg: number, name: string, color: string) =>
          b.create(
            "glider",
            [R * Math.cos((deg * Math.PI) / 180), R * Math.sin((deg * Math.PI) / 180), circle],
            { name, ...pointStyle(color) },
          );
        const A = mk(40, "A", NEON.cyan);
        const B = mk(110, "B", NEON.magenta);
        const C = mk(200, "C", NEON.cyan);
        const D = mk(300, "D", NEON.magenta);

        b.create("polygon", [A, B, C, D], {
          borders: { strokeColor: NEON.violet, strokeWidth: 2 },
          fillColor: NEON.violet, fillOpacity: 0.06, vertices: { visible: false },
        });

        b.create("text", [-3.2, -3.0, () => {
          const aA = interiorAngle(D, A, B);
          const aB = interiorAngle(A, B, C);
          const aC = interiorAngle(B, C, D);
          const aD = interiorAngle(C, D, A);
          return `∠A+∠C=${(aA + aC).toFixed(1)}°,  ∠B+∠D=${(aB + aD).toFixed(1)}°  （内接四角形は対角の和 180°）`;
        }], textStyle);
      }}
    />
  );
}
