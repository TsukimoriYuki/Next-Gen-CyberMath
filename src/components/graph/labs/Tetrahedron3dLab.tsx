"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * A regular tetrahedron rendered as a rotating 2-D shadow. The four vertices
 * (±1,±1,±1) with an even number of minus signs are mutually equidistant
 * (edge = 2√2), so all six edges are equal however you spin it. The angle
 * between two position vectors from the centroid is arccos(−1/3) ≈ 109.47°.
 */
const S = 1.15;
const V: [number, number, number][] = (
  [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ] as [number, number, number][]
).map(([x, y, z]) => [x * S, y * S, z * S] as [number, number, number]);

const rad = (d: number) => (d * Math.PI) / 180;

/** Rotate about the vertical axis by φ, then project with a slight tilt. */
function project(v: [number, number, number], phi: number): [number, number] {
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  const x = v[0] * c + v[2] * s;
  const z = -v[0] * s + v[2] * c;
  const y = v[1];
  return [x, y * 0.92 + z * 0.42];
}

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
];

export function Tetrahedron3dLab() {
  return (
    <JsxBoard
      boundingBox={[-2.6, 2.6, 2.6, -2.6]}
      keepAspectRatio
      ariaLabel="正四面体（回転する空間ベクトルの影）"
      init={(board) => {
        const b = board;

        const phi = b.create("slider", [[-2.4, 2.3], [0.2, 2.3], [0, 35, 360]], {
          name: "回転 φ°", snapWidth: 1, ...sliderStyle(NEON.violet),
        });

        const colors = [NEON.cyan, NEON.magenta, NEON.lime, NEON.amber];
        const pts = V.map((v, i) =>
          b.create(
            "point",
            [
              () => project(v, rad(phi.Value()))[0],
              () => project(v, rad(phi.Value()))[1],
            ],
            { name: `P${i + 1}`, ...pointStyle(colors[i]), fixed: true },
          ),
        );

        for (const [i, j] of EDGES) {
          b.create("segment", [pts[i], pts[j]], {
            strokeColor: NEON.muted,
            strokeWidth: 1.8,
          });
        }

        b.create("text", [-2.5, -2.35,
          "正四面体：全6辺＝2√2（一定）。重心からの2ベクトルの成す角 = arccos(−1/3) ≈ 109.47°",
        ], { ...textStyle, fontSize: 12 });
      }}
    />
  );
}
