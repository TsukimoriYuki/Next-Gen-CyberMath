// サイバー計算特訓（シャトルラン）の無限問題生成。
// Math.random はこのモジュールに隔離し、React の render では呼ばない
// （イベントハンドラ／エフェクトからのみ呼ぶこと）。

export interface Challenge {
  kind: string;
  /** 設問の KaTeX（$ なし）。 */
  prompt: string;
  /** 選択肢の KaTeX（$ なし）。 */
  choices: string[];
  answerIndex: number;
}

export const CORRECT_PER_STAGE = 5;

/** ステージごとの 1 問の制限時間（秒）。上がるほど短くなる。 */
export function timeForStage(stage: number): number {
  return Math.max(4, 15 - 1.5 * (stage - 1));
}

function ri(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function nz(min: number, max: number): number {
  let v = 0;
  while (v === 0) v = ri(min, max);
  return v;
}
/** 符号つき定数項（+3 / -3）。 */
function sgn(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}
/** 先頭係数つきの単項（1→x, -1→-x, 3→3x）。 */
function lead(a: number, v: string): string {
  if (a === 1) return v;
  if (a === -1) return `-${v}`;
  return `${a}${v}`;
}
/** 符号つき x の項（0→省略, 1→+x, -1→-x, 3→+3x）。 */
function xterm(n: number): string {
  if (n === 0) return "";
  if (n === 1) return "+x";
  if (n === -1) return "-x";
  return `${sgn(n)}x`;
}
/** 符号つき定数項（0→省略）。 */
function cterm(n: number): string {
  return n === 0 ? "" : sgn(n);
}

/** 正解＋ダミーから重複を除いた 4 択を作り、シャッフルする。 */
function assemble(
  kind: string,
  prompt: string,
  correct: string,
  distractors: string[],
): Challenge {
  const uniq: string[] = [correct];
  for (const d of distractors) {
    if (uniq.length >= 4) break;
    if (!uniq.includes(d)) uniq.push(d);
  }
  let pad = 1;
  while (uniq.length < 4) {
    const c = `${correct}\\quad(${pad})`;
    if (!uniq.includes(c)) uniq.push(c);
    pad++;
  }
  for (let i = uniq.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniq[i], uniq[j]] = [uniq[j], uniq[i]];
  }
  return { kind, prompt, choices: uniq, answerIndex: uniq.indexOf(correct) };
}

// ---- 各ジェネレータ ----------------------------------------------------

/** 平方完成：y=x²+bx+c の頂点。 */
function genCompleteSquare(level: number): Challenge {
  const k = nz(-level, level); // 軸 x=-k（b=2k）
  const b = 2 * k;
  const c = ri(-level, level);
  const vx = -k;
  const vy = c - k * k;
  const prompt = `y=x^2${xterm(b)}${cterm(c)}\\ \\text{ の頂点}`;
  const correct = `(${vx},\\ ${vy})`;
  return assemble("平方完成", prompt, correct, [
    `(${k},\\ ${vy})`,
    `(${vx},\\ ${c})`,
    `(${vx},\\ ${c + k * k})`,
    `(${k},\\ ${c})`,
  ]);
}

/** 因数分解：x²+(p+q)x+pq。 */
function genFactor(level: number): Challenge {
  const p = nz(-level, level);
  let q = nz(-level, level);
  let guard = 0;
  while (p + q === 0 && guard++ < 50) q = nz(-level, level);
  const b = p + q;
  const c = p * q;
  const prompt = `x^2${xterm(b)}${cterm(c)}\\ \\text{ を因数分解}`;
  const correct = `(x${sgn(p)})(x${sgn(q)})`;
  return assemble("因数分解", prompt, correct, [
    `(x${sgn(-p)})(x${sgn(-q)})`,
    `(x${sgn(p)})(x${sgn(q + 1)})`,
    `(x${sgn(p - 1)})(x${sgn(q)})`,
    `(x${sgn(q)})(x${sgn(-p)})`,
  ]);
}

/** 展開：(x+a)(x+b)。 */
function genExpand(level: number): Challenge {
  const a = nz(-level, level);
  let b = nz(-level, level);
  let guard = 0;
  while (a + b === 0 && guard++ < 50) b = nz(-level, level);
  const mid = a + b;
  const last = a * b;
  const prompt = `(x${sgn(a)})(x${sgn(b)})\\ \\text{ を展開}`;
  const correct = `x^2${xterm(mid)}${cterm(last)}`;
  return assemble("展開", prompt, correct, [
    `x^2${xterm(mid)}${cterm(-last)}`,
    `x^2${xterm(last)}${cterm(mid)}`,
    `x^2${xterm(-mid)}${cterm(last)}`,
    `x^2${xterm(mid)}${cterm(last + 1)}`,
  ]);
}

/** 微分係数：f(x)=ax²+bx+c の f'(k)。 */
function genDerivative(level: number): Challenge {
  const a = nz(1, Math.max(2, level));
  const b = nz(-level, level);
  const c = ri(-level, level);
  const k = nz(-level, level);
  const val = 2 * a * k + b;
  const prompt = `f(x)=${lead(a, "x^2")}${xterm(b)}${cterm(c)},\\quad f'(${k})`;
  return assemble("微分係数", prompt, `${val}`, [
    `${a * k + b}`,
    `${2 * a * k}`,
    `${val + 1}`,
    `${val - 1}`,
    `${2 * a + b}`,
  ]);
}

/** 約数の個数：n=2^a·3^b。 */
function genDivisorCount(level: number): Challenge {
  const a = ri(1, level >= 6 ? 4 : 3);
  const b = ri(1, level >= 6 ? 3 : 2);
  const n = 2 ** a * 3 ** b;
  const count = (a + 1) * (b + 1);
  const prompt = `${n}\\ \\text{ の正の約数の個数}`;
  return assemble("約数の個数", prompt, `${count}`, [
    `${a * b}`,
    `${count + 1}`,
    `${count - 1}`,
    `${a + b + 2}`,
    `${(a + 1) * b}`,
  ]);
}

const GENERATORS = [
  genCompleteSquare,
  genFactor,
  genExpand,
  genDerivative,
  genDivisorCount,
];

/** ステージに応じた数値レンジで、ランダムな種類の問題を 1 問生成する。 */
export function nextChallenge(stage: number): Challenge {
  const level = Math.min(9, 3 + stage);
  const gen = GENERATORS[Math.floor(Math.random() * GENERATORS.length)];
  return gen(level);
}
