"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Inscribed-angle theorem. B, C are fixed on a circle; A slides on the major
 * arc. The inscribed angle ∠BAC stays constant and equals half the central
 * angle ∠BOC, no matter where A sits on its arc.
 */
const R = 2.4;
const rad = (d: number) => (d * Math.PI) / 180;
const on = (deg: number): [number, number] => [R * Math.cos(rad(deg)), R * Math.sin(rad(deg))];

function angleAt(v: number[], p: number[], q: number[]): number {
  const a = [p[0] - v[0], p[1] - v[1]];
  const b = [q[0] - v[0], q[1] - v[1]];
  const dot = a[0] * b[0] + a[1] * b[1];
  const m = Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]);
  return Math.acos(Math.max(-1, Math.min(1, dot / m))) * 180 / Math.PI;
}

export function InscribedAngleLab() {
  const B = on(210);
  const C = on(330);
  const O = [0, 0];
  return (
    <JsxBoard
      boundingBox={[-3, 3.1, 3, -3.1]}
      keepAspectRatio
      ariaLabel="円周角の定理：円周角は中心角の半分"
      init={(board) => {
        const b = board;
        b.create("circle", [[0, 0], R], { strokeColor: NEON.muted, strokeWidth: 1.5, fillOpacity: 0, dash: 2 });
        b.create("point", [0, 0], { name: "O", size: 2, fillColor: NEON.muted, strokeColor: NEON.muted, fixed: true });

        const t = b.create("slider", [[-2.7, 2.8], [0.4, 2.8], [25, 95, 155]], {
          name: "A位置°", snapWidth: 1, ...sliderStyle(NEON.cyan),
        });

        const pB = b.create("point", B, { name: "B", ...pointStyle(NEON.lime), fixed: true });
        const pC = b.create("point", C, { name: "C", ...pointStyle(NEON.lime), fixed: true });
        const pA = b.create("point", [() => on(t.Value())[0], () => on(t.Value())[1]], {
          name: "A", ...pointStyle(NEON.magenta), fixed: true,
        });

        // inscribed angle ∠BAC
        b.create("segment", [pA, pB], curveStyle(NEON.magenta, 2));
        b.create("segment", [pA, pC], curveStyle(NEON.magenta, 2));
        // central angle ∠BOC
        b.create("segment", [[0, 0], pB], curveStyle(NEON.cyan, 1.5));
        b.create("segment", [[0, 0], pC], curveStyle(NEON.cyan, 1.5));

        b.create("text", [-2.9, -2.7, () => {
          const A = on(t.Value());
          const insc = angleAt(A, B, C);
          const cent = angleAt(O, B, C);
          return `円周角 ∠BAC = ${insc.toFixed(1)}°   中心角 ∠BOC = ${cent.toFixed(1)}°  (= 2×円周角)`;
        }], textStyle);
      }}
    />
  );
}
