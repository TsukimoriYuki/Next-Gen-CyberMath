# Performance Checklist

Cyber Math の公開前 Lighthouse / Core Web Vitals 確認手順です。

## 前提

- `npm run build` を通したあと、`npm run start -- -p 3011` などの production server で確認する。
- 本番URL確認では `NEXT_PUBLIC_SITE_URL=https://next-gen-cyber-math.vercel.app` を設定する。
- 未ログイン状態で測る。復習キュー、履歴、マイページなどは空状態も確認対象にする。
- Chrome DevTools Lighthouse を mobile / desktop の両方で実行する。

## 最低確認ページ

- `/`
- `/math`
- `/common-test`
- `/common-test/lectures/math-1a-shortcut-formulas`
- `/common-test/lectures/quadratic-case-split-intensive`
- `/common-test/math-1a/section-2`
- `/quality`

## 目標値

- Performance: 85 以上
- Accessibility: 90 以上
- Best Practices: 90 以上
- SEO: 90 以上
- CLS: 0.1 未満
- LCP: 2.5 秒未満を目標
- INP: 200 ms 未満を目標
- TBT: 300 ms 未満を目標

## 手動測定手順

1. `npm run build` を実行する。
2. `npm run start -- -p 3011` で production server を起動する。
3. Chrome DevTools の Lighthouse を開く。
4. Mode は Navigation、Device は Mobile と Desktop をそれぞれ選ぶ。
5. Categories は Performance / Accessibility / Best Practices / SEO を有効にする。
6. 対象ページを1つずつ測定し、下のテンプレートへ記録する。
7. スコアが目標未満の場合、該当項目を `docs/release-checklist.md` の残課題へ転記する。

## 記録テンプレート

| Date | Route | Device | Performance | Accessibility | Best Practices | SEO | LCP | CLS | INP/TBT | Notes |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 2026-06-29 | `/` | Mobile |  |  |  |  |  |  |  |  |

## 手動表示確認

- ファーストビューで主要CTAが見える。
- 数式やKaTeXがページ全体を横に押し広げない。
- MathML / KaTeX / SVG図解が表示される。
- footer links、品質方針、問い合わせ、ライセンスへ到達できる。
- console error がない。
- `raw TeX`、`NaN`、`undefined`、`null`、`Invalid Date` が本文に出ない。

## LHCIを導入する場合

依存追加が許容される段階で、次の方針にする。

- `lighthouserc.js` を追加する。
- `collect.url` に最低確認ページを移す。
- `npm run lhci` を追加する。
- Vercel Preview ではなく production build のローカルサーバーに対して測る。
