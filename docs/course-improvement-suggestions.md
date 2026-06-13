# 講座コンテンツ 教育品質改善レポート

> 実施日: 2026-06-14  
> 対象: `docs/course-audit-report.md` の改善候補 12 件  
> 実施者: Claude Code (claude-sonnet-4-6)

---

## 改善方針

- 既存のレッスン構造（slug, id, type定義）は変更しない
- 各レッスンに 1〜2 ブロック追加のみ（`commonMistake`, `concept`, `workedExample`, `strategy` のいずれか）
- 数式ルール: `$...

 のみ使用（表示数学記号禁止）
- `\\` エスケープ維持（LaTeX コマンドはすべて二重バックスラッシュ）

---

## 実施した改善（12 件）

### High 優先度（3 件）

| ファイル | レッスン | 追加ブロック | 内容 |
|---|---|---|---|
| `math-2bc/trigonometric-functions.ts` | `trig-identities-basic` | `commonMistake` | `sin(α+β)≠sinα+sinβ` の反例（30°代入）と理由（三角関数は線形でない）、入試パターン（75°）を追加。サマリーにも注意点を追記 |
| `math-2bc/calculus-2.ts` | `area-between-curves` | `workedExample` | 区間途中で上下が入れ替わる例（y=x³-x と y=x）を追加。交点が3つある場合の区間分割の実演 |
| `math-2bc/vectors.ts` | `inner-product-basic` | `concept` | なす角の範囲 `0°≤θ≤180°` の定義と理由。cosθの符号から鋭角・直角・鈍角を判定する整理を追加 |

### Medium 優先度（5 件）

| ファイル | レッスン | 追加ブロック | 内容 |
|---|---|---|---|
| `math-1a/figures-and-measurement.ts` | `sine-law-cosine-law` | `concept` | 「定理の選び方：判断フロー」。3パターン（辺と向かいの角のセット/2辺とその間の角/3辺既知）を① ② ③ の形で整理 |
| `math-2bc/sequences.ts` | `recurrence-linear-standard` | `concept` | 「なぜ固定点αで変形できるのか」。特性方程式の意味（固定点＝変化しない点）と、等比型への変形の仕組みを説明 |
| `math-2bc/exponential-logarithmic-functions.ts` | `logarithm-basic` | `concept` | 「指数との対応で見る特別な値」。`log_a 1=0`、`log_a a=1`、`log_a a^n=n` を指数の形で直感的に説明 |
| `math-1a/data-analysis.ts` | `correlation-scatter-basic` | `concept` | 「相関係数が −1 から 1 の範囲にある理由」。r=1/-1/0 の散布図イメージと、目安（|r|≥0.7 強相関）を追加 |
| `math-2bc/complex-equations.ts` | `complex-numbers-basic` | `concept` | 「複素数の絶対値」。`|a+bi|=√(a²+b²)` の定義と `|z₁z₂|=|z₁||z₂|` の具体例で確認 |

### Low 優先度（4 件）

| ファイル | レッスン | 追加ブロック | 内容 |
|---|---|---|---|
| `math-1a/counting-probability.ts` | `conditional-probability-basic` | `concept` | 「樹形図で条件付き確率を整理する」。赤白玉の不放回抽出例で、条件の枝だけを切り出す直感的説明 |
| `math-2bc/plane-curves.ts` | `conic-foci-and-asymptotes` | `concept` | 「焦点を持つ意味：反射の法則と定義条件」。楕円・双曲線の焦点定義（距離の和/差が一定）と反射の法則の応用 |
| `math-2bc/statistics.ts` | `normal-distribution-basic` | `workedExample` | 「例2：正規分布表の読み方」。標準化 → 表から引き算 の3ステップを N(60,100) の例で実演 |
| `math-2bc/sequences.ts` | `mathematical-induction` | `concept` | 「入試答案の書き方」。[i][ii][iii] の構成、帰納法の仮定の明記、結論の書き方を入試フォーマットで提示 |

---

## 今回あえて追加しなかったもの

| 項目 | 理由 |
|---|---|
| 加法定理の幾何的証明（単位円を使った完全証明） | 大規模追記になるため。証明の骨格はなぜ sinα+β≠sinα+sinβ かの反例で代替 |
| 複素数の極形式（arg/絶対値の完全な扱い） | 極形式は数III（複素数平面）の内容。数IIB の complex-equations.ts では絶対値の導入にとどめた |
| 正規分布の曲線式の証明 | 高校範囲外のため。分布表の読み方の例題追加で代替 |
| 相関係数の式（コーシー・シュワルツ不等式） | 高校範囲を超えるため。直感的な説明（r=1/-1 の散布図）で代替 |

---

## 検証結果

```
npx tsc --noEmit       → エラー 0 件
node scripts/check-control-chars.mjs → mid-line tabs=0  form feeds=0  backspaces=0
npx next build         → ビルド成功（全ルート正常生成）
```

---

## 変更ファイル一覧

```
src/data/courses/math-2bc/trigonometric-functions.ts  (+1 commonMistake, summary更新)
src/data/courses/math-2bc/calculus-2.ts               (+1 workedExample)
src/data/courses/math-2bc/vectors.ts                  (+1 concept)
src/data/courses/math-1a/figures-and-measurement.ts   (+1 concept)
src/data/courses/math-2bc/sequences.ts                (+2 concept: 漸化式・帰納法)
src/data/courses/math-2bc/exponential-logarithmic-functions.ts  (+1 concept)
src/data/courses/math-1a/data-analysis.ts             (+1 concept)
src/data/courses/math-2bc/complex-equations.ts        (+1 concept, summary更新)
src/data/courses/math-1a/counting-probability.ts      (+1 concept)
src/data/courses/math-2bc/plane-curves.ts             (+1 concept)
src/data/courses/math-2bc/statistics.ts               (+1 workedExample)
```

合計: **11 ファイル、13 ブロック追加**
