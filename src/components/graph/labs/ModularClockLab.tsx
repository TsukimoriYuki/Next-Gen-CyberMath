"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Modular arithmetic on a clock of m positions (0..m−1). Counting k steps
 * around the circle lands on k mod m. Sliders change the modulus m and the
 * value k; the pointer shows the residue k ≡ (k mod m) (mod m).
 */
const MAX = 12;
const Rad = 1.2;

export function ModularClockLab() {
  const posOf = (i: number, m: number): [number, number] => {
    const ang = Math.PI / 2 - (2 * Math.PI * i) / m;
    return [Rad * Math.cos(ang), Rad * Math.sin(ang)];
  };
  return (
    <JsxBoard
      boundingBox={[-1.9, 1.9, 1.9, -1.9]}
      keepAspectRatio
      ariaLabel="合同式：時計で見る k mod m"
      init={(board) => {
        const b = board;
        const m = b.create("slider", [[-1.7, 1.75], [-0.3, 1.75], [2, 7, MAX]], {
          name: "法 m", snapWidth: 1, ...sliderStyle(NEON.violet),
        });
        const k = b.create("slider", [[0.2, 1.75], [1.7, 1.75], [0, 10, 120]], {
          name: "k", snapWidth: 1, ...sliderStyle(NEON.cyan),
        });

        b.create("circle", [[0, 0], Rad], { strokeColor: NEON.muted, strokeWidth: 1.5, fillOpacity: 0, dash: 2 });

        // position markers 0..m-1
        for (let i = 0; i < MAX; i++) {
          const res = () => Math.round(k.Value()) % Math.round(m.Value());
          b.create("point", [() => posOf(i, m.Value())[0], () => posOf(i, m.Value())[1]], {
            name: () => (i < Math.round(m.Value()) ? `${i}` : ""),
            size: () => (i === 0 ? 3 : 2),
            fillColor: () => (i === res() ? NEON.lime : NEON.muted),
            strokeColor: () => (i === res() ? NEON.lime : NEON.muted),
            visible: () => i < Math.round(m.Value()),
            label: { cssStyle: "color:#aeb8d4;font-family:var(--font-mono,monospace);", offset: [6, 6] },
            fixed: true,
          });
        }

        // pointer to the residue position
        b.create("segment", [[0, 0],
          [() => posOf(Math.round(k.Value()) % Math.round(m.Value()), m.Value())[0],
           () => posOf(Math.round(k.Value()) % Math.round(m.Value()), m.Value())[1]]],
          curveStyle(NEON.lime, 2.5));

        b.create("text", [-1.85, -1.6, () => {
          const mv = Math.round(m.Value()), kv = Math.round(k.Value());
          return `${kv} ≡ ${kv % mv} (mod ${mv})`;
        }], textStyle);
      }}
    />
  );
}
