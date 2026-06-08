"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, textStyle } from "./theme";

/**
 * Ceva's theorem. Drag the interior point P; the cevians AP, BP, CP meet the
 * opposite sides at D, E, F. The product of the three division ratios
 * (BD/DC)·(CE/EA)·(AF/FB) stays equal to 1 for every position of P.
 */
const A: [number, number] = [-2, -1.2];
const B: [number, number] = [2.4, -1.2];
const C: [number, number] = [0.2, 2.3];
const dist = (p: number[], q: number[]) => Math.hypot(p[0] - q[0], p[1] - q[1]);

export function CevaTheoremLab() {
  return (
    <JsxBoard
      boundingBox={[-3.4, 3.1, 3.6, -2.2]}
      keepAspectRatio
      ariaLabel="チェバの定理：3 つの比の積は 1"
      init={(board) => {
        const b = board;
        const pA = b.create("point", A, { name: "A", ...pointStyle(NEON.cyan), fixed: true });
        const pB = b.create("point", B, { name: "B", ...pointStyle(NEON.cyan), fixed: true });
        const pC = b.create("point", C, { name: "C", ...pointStyle(NEON.cyan), fixed: true });

        // triangle sides
        const lBC = b.create("line", [pB, pC], { strokeColor: NEON.muted, strokeWidth: 1.5, straightFirst: false, straightLast: false });
        const lCA = b.create("line", [pC, pA], { strokeColor: NEON.muted, strokeWidth: 1.5, straightFirst: false, straightLast: false });
        const lAB = b.create("line", [pA, pB], { strokeColor: NEON.muted, strokeWidth: 1.5, straightFirst: false, straightLast: false });

        // draggable interior point
        const P = b.create("point", [0.2, -0.1], {
          name: "P", size: 5, fillColor: NEON.amber, strokeColor: "#0b0f1a", strokeWidth: 1.5,
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
        });

        // cevian lines and their feet on the opposite sides
        const lAP = b.create("line", [pA, P], { visible: false });
        const lBP = b.create("line", [pB, P], { visible: false });
        const lCP = b.create("line", [pC, P], { visible: false });
        const D = b.create("intersection", [lAP, lBC, 0], { name: "D", ...pointStyle(NEON.lime), fixed: true });
        const E = b.create("intersection", [lBP, lCA, 0], { name: "E", ...pointStyle(NEON.lime), fixed: true });
        const F = b.create("intersection", [lCP, lAB, 0], { name: "F", ...pointStyle(NEON.lime), fixed: true });

        b.create("segment", [pA, D], curveStyle(NEON.magenta, 1.5));
        b.create("segment", [pB, E], curveStyle(NEON.magenta, 1.5));
        b.create("segment", [pC, F], curveStyle(NEON.magenta, 1.5));

        b.create("text", [-3.3, -1.9, () => {
          const d = [D.X(), D.Y()], e = [E.X(), E.Y()], f = [F.X(), F.Y()];
          const bd_dc = dist(B, d) / dist(d, C);
          const ce_ea = dist(C, e) / dist(e, A);
          const af_fb = dist(A, f) / dist(f, B);
          const prod = bd_dc * ce_ea * af_fb;
          return `(BD/DC)(CE/EA)(AF/FB) = ${prod.toFixed(3)}`;
        }], textStyle);
      }}
    />
  );
}
