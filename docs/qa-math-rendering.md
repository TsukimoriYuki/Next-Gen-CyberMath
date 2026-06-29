# Math Rendering QA

図形教材と共通テスト演習を更新した後に、実ブラウザで raw TeX、壊れた数値、横スクロールを確認するためのメモ。

## 対象ページ

- `/common-test/lectures/geometry-measurement-intensive`
- `/common-test/lectures/geometry-properties-intensive`
- `/common-test/lectures/quadratic-case-split-intensive`
- `/common-test/lectures/probability-counting-intensive`
- `/common-test/lectures/math-1a-shortcut-formulas`
- `/common-test/math-1a/section-2`
- `/common-test/math-1a/section-4`
- 追加した通常講座、代表問題詳細ページ

## 目視確認

- KaTeX がカード幅や画面幅を押し広げていない。
- PC の特別講義目次が画面内で縦スクロールできる。
- スマホの目次パネル、判別ドリル選択肢、復習導線が横スクロールしない。
- 図解の強調線とラベルが問題の意図と矛盾していない。
- 正答表示、解説、解き方、よくあるミスに `$...$` や `\frac` が出ていない。

## ブラウザコンソール用スキャン

ページを開いた状態で DevTools console に貼り付ける。
KaTeX のアクセシビリティ用 MathML と非表示テキストは除外して、実際に見える本文だけを調べる。

```js
(() => {
  const root = document.body.cloneNode(true);
  root
    .querySelectorAll(
      "script,style,noscript,.katex-mathml,[aria-hidden='true'],[hidden]",
    )
    .forEach((el) => el.remove());

  const text = root.innerText || "";
  const patterns = [
    /\$[^$\n]{1,120}\$/,
    /\\(?:frac|dfrac|sin|cos|tan|sqrt|le|ge|theta|angle|triangle|mathrm|cdot)/,
    /\b(?:NaN|undefined|null|Invalid Date)\b/,
    /0\s*\/\s*0/,
  ];
  const hits = patterns
    .flatMap((pattern) => [...text.matchAll(new RegExp(pattern, "g"))])
    .map((match) => match[0]);

  console.table({
    rawHits: hits.length,
    katexErrors: document.querySelectorAll(".katex-error").length,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  });
  if (hits.length) console.log([...new Set(hits)].slice(0, 30));
})();
```

## 修正方針

- 本文、選択肢、解説、復習導線は `MathText` を通す。
- 見出し、ボタン、カードタイトルには raw TeX を入れない。必要なら日本語・Unicode 記号で言い換える。
- SVG ラベルは plain text として扱い、厳密な式は図の下の本文に逃がす。
- 長い数式はページ全体ではなく数式ブロックだけが横スクロールするようにする。
