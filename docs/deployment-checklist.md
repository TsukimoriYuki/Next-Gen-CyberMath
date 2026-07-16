# Deployment Checklist

Cyber Math を Vercel / production 環境へ出す前の設定確認です。

## Environment Variables

Vercel Project Settings の Environment Variables に設定する。

```env
NEXT_PUBLIC_SITE_URL=https://next-gen-cyber-math.vercel.app
DATABASE_URL=postgresql://...
SESSION_SECRET=...
MENTOR_CODE=...
```

確認事項:

- `NEXT_PUBLIC_SITE_URL` は末尾スラッシュなしにする。
- `NEXT_PUBLIC_SITE_URL` は canonical、OGP、sitemap、robots.txt、JSON-LD に使われる。
- production で `localhost` や preview URL を入れない。
- `DATABASE_URL` は production DB を指す。
- 認証・セッション関連のsecretは十分に長い値にする。
- `MENTOR_CODE` は推測されにくい値にする。

## Build

公開前にローカルで実行する。

```bash
npm run qa:public
npm run lint
npx tsc --noEmit
npm run build
```

`qa:public` が `NEXT_PUBLIC_SITE_URL is not set` を warning として出す場合、ローカルQAとしては続行できる。本番公開前には Vercel 側で必ず設定する。

Railway の `npx prisma db push` は正式な migration 導入までの暫定措置とする。

## URL / SEO

production server で確認する。

- canonical が `https://next-gen-cyber-math.vercel.app/...` になっている。
- `og:url` が canonical と同じURLになる。
- Twitter card が出ている。
- `/sitemap.xml` に主要ページと特別講義が含まれる。
- `/robots.txt` が `/sitemap.xml` を指している。
- `/quality`, `/privacy`, `/terms`, `/contact`, `/about`, `/licenses` に到達できる。

## Security Headers

production server で次のヘッダーを確認する。

- `Content-Security-Policy-Report-Only`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`
- `Strict-Transport-Security`

注意:

- CSP は当面 Report-Only のまま運用する。
- KaTeX、MathML、inline SVG、data URI 図解が壊れていないことをブラウザで確認する。
- HSTS は localhost では意味が薄いが、production HTTPS で有効になる設定として確認する。

## Smoke Check

desktop:

- `/`
- `/math`
- `/common-test`
- `/courses`
- `/units`
- `/quality`
- `/privacy`
- `/terms`
- `/contact`
- `/about`
- `/licenses`
- `/common-test/lectures/math-1a-shortcut-formulas`
- `/common-test/lectures/quadratic-case-split-intensive`
- `/common-test/math-1a/section-2`

mobile 390px:

- `/`
- `/common-test`
- `/quality`
- `/common-test/lectures/math-1a-shortcut-formulas`
- `/common-test/math-1a/section-2`

確認項目:

- console error がない。
- raw TeX、`NaN`、`undefined`、`null`、`Invalid Date` が本文に出ない。
- mobile 横スクロールがない。
- footer links が機能する。
- 共通テスト大問ドリルで入力または選択、解答確認、解説表示ができる。
- 特別講義のTOCとドリルが操作できる。
