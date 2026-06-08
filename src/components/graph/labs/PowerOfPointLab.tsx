"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Power of a point. P is a draggable point inside the circle. Two lines run
 * through P (one fixed, one rotated by the slider), each cutting the circle
 * at two points. The product PA·PB equals PC·PD because both equal
 * |R² − OP²| — independent of the line's direction.
 */
const R = 2;
const rad = (d: number) => (d * Math.PI) / 180;

// the two intersection distances along a line through P with given direction
function hits(px: number, py: number, dx: number, dy: number): [number[], number[]] {
  // t² + 2t(px·dx+py·dy) + (px²+py²−R²) = 0
  const b = 2 * (px * dx + py * dy);
  const c = px * px + py * py - R * R;
  const disc = Math.max(0, b * b - 4 * c);
  const t1 = (-b + Math.sqrt(disc)) / 2;
  const t2 = (-b - Math.sqrt(disc)) / 2;
  return [[px + t1 * dx, py + t1 * dy], [px + t2 * dx, py + t2 * dy]];
}

export function PowerOfPointLab() {
  return (
    <JsxBoard
      boundingBox={[-3, 3, 3, -3]}
      keepAspectRatio
      ariaLabel="方べきの定理：PA·PB = PC·PD"
      init={(board) => {
        const b = board;
        b.create("circle", [[0, 0], R], { strokeColor: NEON.muted, strokeWidth: 1.5, fillOpacity: 0, dash: 2 });

        const ang = b.create("slider", [[-2.7, 2.7], [0.3, 2.7], [10, 70, 170]], {
          name: "θ°", snapWidth: 1, ...sliderStyle(NEON.violet),
        });

        // draggable interior point P
        const P = b.create("point", [0.6, 0.3], {
          name: "P", size: 5, fillColor: NEON.amber, strokeColor: "#0b0f1a", strokeWidth: 1.5,
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });

        // line 1: fixed horizontal through P ; line 2: rotated by θ
        const mk = (dirFn: () => [number, number], color: string) => {
          const A = b.create("point", [() => hits(P.X(), P.Y(), dirFn()[0], dirFn()[1])[0][0], () => hits(P.X(), P.Y(), dirFn()[0], dirFn()[1])[0][1]], { name: "", size: 3, fillColor: color, strokeColor: "#0b0f1a", fixed: true });
          const Bp = b.create("point", [() => hits(P.X(), P.Y(), dirFn()[0], dirFn()[1])[1][0], () => hits(P.X(), P.Y(), dirFn()[0], dirFn()[1])[1][1]], { name: "", size: 3, fillColor: color, strokeColor: "#0b0f1a", fixed: true });
          b.create("segment", [A, Bp], curveStyle(color, 2));
        };
        mk(() => [1, 0], NEON.cyan);
        mk(() => [Math.cos(rad(ang.Value())), Math.sin(rad(ang.Value()))], NEON.magenta);

        b.create("text", [-2.9, -2.7, () => {
          const power = Math.abs(R * R - (P.X() * P.X() + P.Y() * P.Y()));
          return `PA·PB = PC·PD = |R² − OP²| = ${power.toFixed(3)}`;
        }], textStyle);
      }}
    />
  );
}
