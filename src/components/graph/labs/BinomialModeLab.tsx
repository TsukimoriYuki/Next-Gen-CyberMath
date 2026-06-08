"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Binomial distribution and its mode. Bars show P(X=k)=C(n,k)p^k(1-p)^{n-k}.
 * Slide n and p; the magenta marker sits on the most likely k, which jumps as
 * (n+1)p crosses an integer — the same threshold the ratio p_k/p_{k-1} crosses 1.
 */
const MAXN = 15;
const SCALE = 10;

function binom(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return r;
}

export function BinomialModeLab() {
  return (
    <JsxBoard
      boundingBox={[-1.5, 5, 16.5, -1.4]}
      keepAspectRatio={false}
      ariaLabel="二項分布の棒グラフと最頻値"
      init={(board) => {
        const b = board;
        const nS = b.create("slider", [[1, 4.5], [6, 4.5], [3, 10, MAXN]], {
          name: "n", snapWidth: 1, ...sliderStyle(NEON.cyan),
        });
        const pS = b.create("slider", [[9, 4.5], [14.5, 4.5], [0.1, 0.5, 0.9]], {
          name: "p", snapWidth: 0.02, ...sliderStyle(NEON.violet),
        });

        const N = () => Math.round(nS.Value());
        const prob = (k: number) => {
          const n = N();
          const p = pS.Value();
          return binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        };
        const mode = () => Math.min(N(), Math.floor((N() + 1) * pS.Value()));

        for (let k = 0; k <= MAXN; k++) {
          b.create("segment", [[k, 0], [k, () => prob(k) * SCALE]], {
            strokeColor: NEON.cyan,
            strokeWidth: 9,
            visible: () => N() >= k,
          });
        }
        // 最頻値のマーカー
        b.create("point", [() => mode(), () => prob(mode()) * SCALE], {
          name: "", ...pointStyle(NEON.magenta),
        });

        b.create("text", [-1.4, -1.0, () => {
          const m = mode();
          return `n=${N()}, p=${pS.Value().toFixed(2)} → 最頻値 k=${m}（⌊(n+1)p⌋）, P(X=${m})=${prob(m).toFixed(3)}`;
        }], textStyle);
      }}
    />
  );
}
