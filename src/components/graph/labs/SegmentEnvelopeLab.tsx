"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Family of segments joining (a, 0) and (0, 1 - a) for a in (0,1).
 * The union sweeps the region under the envelope  √x + √y = 1.
 * Faint segments show the family; the slider drives one bold segment;
 * the neon curve is the boundary the segments never cross.
 */
export function SegmentEnvelopeLab() {
  return (
    <JsxBoard
      boundingBox={[-0.2, 1.15, 1.15, -0.2]}
      ariaLabel="線分族 (a,0)-(0,1-a) の通過領域と包絡線"
      init={(board) => {
        const b = board;

        // The family — faint static segments
        const N = 14;
        for (let i = 1; i < N; i++) {
          const a = i / N;
          b.create("segment", [[a, 0], [0, 1 - a]], {
            strokeColor: NEON.faint,
            strokeWidth: 1,
            highlightStrokeColor: NEON.faint,
            fixed: true,
          });
        }

        // Envelope:  x = t², y = (1-t)²  ⇔  √x + √y = 1
        b.create(
          "curve",
          [(t: number) => t * t, (t: number) => (1 - t) * (1 - t), 0, 1],
          { ...curveStyle(NEON.cyan, 3.5) },
        );

        // Active segment driven by the slider
        const a = b.create(
          "slider",
          [[0.18, 1.06], [0.92, 1.06], [0.02, 0.5, 0.98]],
          { name: "a", snapWidth: 0.01, ...sliderStyle(NEON.magenta) },
        );

        const P = b.create("point", [() => a.Value(), 0], {
          name: "(a,0)",
          ...pointStyle(NEON.magenta),
        });
        const Q = b.create("point", [0, () => 1 - a.Value()], {
          name: "(0,1−a)",
          ...pointStyle(NEON.magenta),
        });
        b.create("segment", [P, Q], curveStyle(NEON.magenta, 3));

        // Tangency point of the active line with the envelope: (a², (1-a)²)
        b.create("point", [() => a.Value() ** 2, () => (1 - a.Value()) ** 2], {
          name: "",
          size: 3,
          fillColor: NEON.lime,
          strokeColor: "#0b0f1a",
          strokeWidth: 1,
        });

        b.create("text", [
          0.34,
          0.92,
          () => `√x + √y = 1`,
        ], { ...textStyle, anchorX: "left" });
      }}
    />
  );
}
