# Release Checklist

Cyber Math 公開前の最終確認リストです。

## Environment

- [ ] `NEXT_PUBLIC_SITE_URL=https://next-gen-cyber-math.vercel.app`
- [ ] `DATABASE_URL`
- [ ] `SESSION_SECRET`
- [ ] `MENTOR_CODE`
- [ ] その他 production で必要な secret

## Build

- [ ] `npm run qa:public`
- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`

## Public Pages

- [ ] `/`
- [ ] `/math`
- [ ] `/common-test`
- [ ] `/courses`
- [ ] `/units`
- [ ] `/privacy`
- [ ] `/terms`
- [ ] `/contact`
- [ ] `/about`
- [ ] `/quality`
- [ ] `/licenses`

## SEO

- [ ] canonical が本番URL
- [ ] `og:title`, `og:description`, `og:url`
- [ ] Twitter card
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`
- [ ] JSON-LD
- [ ] title が重複しすぎていない
- [ ] description が空でない

## Security

- [ ] security headers
- [ ] CSP Report-Only
- [ ] auth rate limit
- [ ] MENTOR権限の最小ハードニング
- [ ] public pages から admin / mentor 導線が露出しすぎていない

## QA

- [ ] raw TeX が見えない
- [ ] `NaN`, `undefined`, `null`, `Invalid Date` が見えない
- [ ] mobile 390px で横スクロールがない
- [ ] footer links
- [ ] `/quality` の文言
- [ ] 空状態に次アクションがある
- [ ] CTAが行動ベース
- [ ] common-test drill smoke
- [ ] special lecture smoke
- [ ] problem detail smoke

## Keyboard / Accessibility

- [ ] header / footer をTabで移動できる
- [ ] login / register form の入力欄にlabelがある
- [ ] 特別講義TOCの開閉状態が分かる
- [ ] 判別ドリルをキーボードで選べる
- [ ] 共通テスト大問ドリルの入力欄にlabelがある
- [ ] error message が関連フォーム付近に出る
- [ ] MathML / aria-label が代表式に出ている
- [ ] visible focus ring が確認できる

## Lighthouse

- [ ] `/`
- [ ] `/math`
- [ ] `/common-test`
- [ ] `/common-test/lectures/math-1a-shortcut-formulas`
- [ ] `/common-test/lectures/quadratic-case-split-intensive`
- [ ] `/common-test/math-1a/section-2`
- [ ] `/quality`

目標:

- Performance 85+
- Accessibility 90+
- Best Practices 90+
- SEO 90+
- CLS 0.1未満
- LCP 2.5秒未満を目標
- INP 200ms未満を目標

## Release Notes

- [ ] 既知の残課題を記録した
- [ ] 教材方針と監修体制の現状を `/quality` に明記した
- [ ] 本番URLでproduction smoke checkを実施した
