# 講座コンテンツ品質監査レポート

> 実施日: 2026-06-14  
> 対象: `src/data/courses/` 以下の全 TypeScript 講座データファイル  
> 実施者: Claude Code (claude-sonnet-4-6)

---

## 修正済み項目

| 種類 | ファイル | 修正内容 | 修正件数 |
|---|---|---|---|
| LaTeX エスケープ崩れ | `math-1a/counting-probability.ts` | `\times`,`\frac`,`\mathrm`,`\overline`,`\cdot` 等 → `\\` 化 | 259 |
| LaTeX エスケープ崩れ | `math-1a/data-analysis.ts` | `\bar`,`\frac`,`\sum`,`\sigma` 等 → `\\` 化 | 46 |
| LaTeX エスケープ崩れ | `math-1a/figures-and-measurement.ts` | `\sin`,`\cos`,`\tan`,`\frac`,`\text`,`\vec` 等 → `\\` 化 | 604 |
| LaTeX エスケープ崩れ | `math-1a/integers.ts` | `\times`,`\gcd`,`\pmod`,`\equiv` 等 → `\\` 化 | 178 |
| LaTeX エスケープ崩れ | `math-1a/numbers-and-expressions.ts` | `\sqrt`,`\frac`,`\pm`,`\leq` 等 → `\\` 化 | 159 |
| LaTeX エスケープ崩れ | `math-1a/quadratic.ts` | `\to` 1件 → `\\to` | 1 |
| LaTeX エスケープ崩れ | `math-1a/sets-and-logic.ts` | `\cap`,`\cup`,`\subset`,`\forall`,`\exists` 等 → `\\` 化 | 133 |
| LaTeX エスケープ崩れ | `math-2bc/calculus-2.ts` | `\frac`,`\lim`,`\to`,`\int`,`\leq` 等 → `\\` 化 | 109 |
| LaTeX エスケープ崩れ | `math-2bc/complex-equations.ts` | `\sin`,`\cos`,`\theta`,`\sqrt`,`\frac` 等 → `\\` 化 | 329 |
| LaTeX エスケープ崩れ | `math-2bc/exponential-logarithmic-functions.ts` | `\log`,`\ln`,`\leq`,`\geq`,`\frac` 等 → `\\` 化 | 298 |
| LaTeX エスケープ崩れ | `math-2bc/expression-proof.ts` | `\leq`,`\geq`,`\sum`,`\frac`,`\sqrt` 等 → `\\` 化 | 156 |
| LaTeX エスケープ崩れ | `math-2bc/geometry-equations.ts` | `\vec`,`\overrightarrow`,`\sin`,`\cos` 等 → `\\` 化 | 144 |
| LaTeX エスケープ崩れ | `math-2bc/plane-curves.ts` | `\sin`,`\cos`,`\theta`,`\frac`,`\sqrt` 等 → `\\` 化 | 268 |
| LaTeX エスケープ崩れ | `math-2bc/sequences.ts` | `\sum`,`\frac`,`\lim`,`\infty`,`\cdots` 等 → `\\` 化 | 217 |
| LaTeX エスケープ崩れ | `math-2bc/statistics.ts` | `\bar`,`\sigma`,`\frac`,`\sum`,`\sqrt` 等 → `\\` 化 | 217 |
| LaTeX エスケープ崩れ | `math-2bc/trigonometric-functions.ts` | `\sin`,`\cos`,`\tan`,`\theta`,`\pi`,`\frac` 等 → `\\` 化 | 976 |
| LaTeX エスケープ崩れ | `math-2bc/vectors.ts` | `\vec`,`\overrightarrow`,`\cdot`,`\times`,`\cos` 等 → `\\` 化 | 612 |
| **合計** | **17 ファイル** | | **4,706 件** |
| 重複タブ削除 | `src/app/math/page.tsx` | 「講座集」カード（`/courses` への重複リンク）を削除。「講座」カードの説明文をマージして統一 | 1 |
| 未使用インポート削除 | `src/app/math/page.tsx` | `BookOpen` アイコン（重複カード削除後に不要）をインポートから除去 | 1 |

### LaTeX 修正の技術的詳細

TypeScript の文字列リテラルでは以下のエスケープ解釈が行われます。

| 元の記述 | TypeScript が解釈した値 | 修正後 | 実行時の値 |
|---|---|---|---|
| `\frac` | U+000C（フォームフィード）+ `rac` | `\\frac` | `\frac`（正常） |
| `\times` | U+0009（タブ）+ `imes` | `\\times` | `\times`（正常） |
| `\theta` | U+0009（タブ）+ `heta` | `\\theta` | `\theta`（正常） |
| `\text` | U+0009（タブ）+ `ext` | `\\text` | `\text`（正常） |
| `\bar` | U+0008（バックスペース）+ `ar` | `\\bar` | `\bar`（正常） |
| `\beta` | U+0008（バックスペース）+ `eta` | `\\beta` | `\beta`（正常） |
| `\lim` | `lim`（バックスラッシュ消失） | `\\lim` | `\lim`（正常） |
| `\sin` | `sin`（バックスラッシュ消失） | `\\sin` | `\sin`（正常） |

`\f`（フォームフィード）・`\t`（タブ）・`\b`（バックスペース）の3種が最も重大で、ブラウザで KaTeX がレンダリングしようとすると制御文字が含まれた文字列がそのまま表示され、数式が完全に壊れていました。

---

## 検出した改善候補

| 優先度 | ファイル | 箇所 | 改善提案 |
|---|---|---|---|
| High | `math-2bc/trigonometric-functions.ts` | 加法定理のブロック | 証明の流れ（単位円を使った幾何的証明）が省かれているため初学者が「なぜ成り立つか」を追えない。証明の骨格を1ブロック追加すると理解が深まる |
| High | `math-2bc/calculus-2.ts` | 積分の面積計算 | `|f(x)-g(x)|` のように場合分けが必要なケース（2曲線が交差する例）の説明がない。初学者がよくはまる箇所 |
| High | `math-2bc/vectors.ts` | 内積の応用 | `cos θ` を求めた後、角度の範囲（0°≤θ≤180°）の理由についての説明が薄い。別解として `sin θ` で判断する方法も言及があると良い |
| Medium | `math-1a/figures-and-measurement.ts` | 正弦定理・余弦定理の使い分け | 「どちらを使うか」の判断フロー（既知量と求める量のパターン）が明示されていない。比較表があると有効 |
| Medium | `math-2bc/sequences.ts` | 漸化式の解き方 | 特性方程式法の導出過程（なぜ特性方程式を立てるのか）が省略されている。受験生がつまずくポイント |
| Medium | `math-2bc/exponential-logarithmic-functions.ts` | 対数の性質 | `log_a 1 = 0` の説明が定義から導出されているが、指数との対応で見せる方が初学者には直感的 |
| Medium | `math-1a/data-analysis.ts` | 相関係数 | `r` の範囲が `-1 ≤ r ≤ 1` になる理由（コーシー・シュワルツ不等式）が説明なし。理由が分からないまま公式だけ使う形になっている |
| Medium | `math-2bc/complex-equations.ts` | 複素数の極形式 | `|z₁z₂| = |z₁||z₂|` および `arg(z₁z₂) = arg z₁ + arg z₂` の証明が省略。受験で問われる整合性の確認に必要 |
| Low | `math-1a/counting-probability.ts` | 条件付き確率 | 樹形図を使った説明を追記すると直感的理解の補助になる |
| Low | `math-2bc/plane-curves.ts` | 楕円・双曲線の焦点 | 焦点を持つ意味（反射の法則との関係）への言及があると受験問題への応用意識が高まる |
| Low | `math-2bc/statistics.ts` | 正規分布 | 標準正規分布表の読み方の例題が少ない。実際の入試問題形式に近い演習問題があると良い |
| Low | `math-2bc/expression-proof.ts` | 数学的帰納法 | 「何を示すか」を先に書いてから証明を展開する記述スタイルの例が少ない。入試答案の形式に沿った例が欲しい |

---

## 今回あえて修正しなかったもの

| 項目 | 理由 |
|---|---|
| `math-3c/` 以下のファイル（limits / differential-calculus / integral-calculus / complex-plane / curves） | LaTeX エスケープが最初から正しく `\\frac` 等で記述されており修正不要。コンテンツ量も多いため全体の品質確認は Phase 別に行うことを推奨 |
| `math-2bc/trigonometric-functions.ts` の加法定理証明の全面追記 | 大規模リライトになるため改善候補として記録するにとどめた。既存の構造（概念→例題→よくあるミス→確認問題）は適切 |
| `relatedPracticeLinks` が空の講座 | Phase 19/20 以降の課題として認識済み。問題スラッグとの対応付けは別タスクで実施予定 |
| `math-1a/sets-and-logic.ts` の記号定義の拡充 | 記号（`∀`, `∃`, `⊂`）の意味は現在のブロックで説明されているが、より丁寧な記述を求めるなら中級者ブロックとして別講座化することを検討 |

---

## 検証結果

```
npx tsc --noEmit  → エラー 0 件
npx next build    → ビルド成功（全ルート正常生成）
LaTeX 再スキャン  → 残存エラー 0 件（fix script 2回目で 0 件を確認）
制御文字スキャン  → フォームフィード 0 / タブ（行中） 0 / バックスペース 0
display math 検索 → $$ ... $$ パターン 0 件
Phase補完予定タグ → 0 件
```
