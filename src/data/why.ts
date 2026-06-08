// 「なぜ？」の可視化 — 解説本文中の式変形や定理適用にホバーで開く小さな注釈。
//
// 本文では @@why:<key>|<表示テキスト>@@ というインライントークンで埋め込む。
// 表示テキスト（下線つき）にホバー／タップすると、ここの { title, body } が
// ポップオーバーで開く。body は KaTeX 対応の軽量テキスト（$...$ 可）。
//
// `r` = String.raw（LaTeX のバックスラッシュを保つ）。
const r = String.raw;

export interface WhyNote {
  /** ポップオーバーの見出し（定義・定理名）。 */
  title: string;
  /** 本文（$...$ の KaTeX を含めてよい）。 */
  body: string;
}

export const WHY_NOTES: Record<string, WhyNote> = {
  // ---- 共通の論法 ----
  "haihou": {
    title: "背理法",
    body: r`結論の否定を仮定し、矛盾を導く論法。「$P$ を示す」かわりに「$\neg P$ なら矛盾」を示す。否定が扱いやすい命題（無理数性・存在しないこと）に強い。`,
  },
  "induction": {
    title: "数学的帰納法",
    body: r`すべての自然数 $n$ で $P(n)$ を示すには、$P(1)$（基底）と「$P(k)\Rightarrow P(k+1)$」（帰納段階）の 2 つを示せば十分。ドミノが連鎖的に倒れる原理。`,
  },
  "discriminant": {
    title: "判別式",
    body: r`実係数 2 次方程式 $ax^2+bx+c=0\ (a\neq0)$ の判別式 $D=b^2-4ac$。$D>0$ で異なる 2 実解、$D=0$ で重解、$D<0$ で実解なし。実数解の存在条件を係数だけで判定する。`,
  },
  "vieta": {
    title: "解と係数の関係",
    body: r`$ax^2+bx+c=0$ の 2 解を $\alpha,\beta$ とすると $\alpha+\beta=-\dfrac{b}{a},\ \alpha\beta=\dfrac{c}{a}$。解そのものを求めずに対称式を係数で表せる。`,
  },

  // ---- 三角・幾何 ----
  "addition-sin": {
    title: "正弦の加法定理",
    body: r`$\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$。単位円上の回転、または余弦定理から導かれる、三角関数の和を分解する基本式。`,
  },
  "addition-tan": {
    title: "正接の加法定理",
    body: r`$\tan(\alpha+\beta)=\dfrac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}$。正弦・余弦の加法定理の比として得られる。有理数性の連鎖に使える。`,
  },
  "law-of-cosines": {
    title: "余弦定理",
    body: r`三角形 $ABC$ で $a^2=b^2+c^2-2bc\cos A$。3 辺と 1 角を結ぶ。$\cos A=\dfrac{b^2+c^2-a^2}{2bc}$ の形で角を辺から求めるのにも使う。`,
  },
  "law-of-sines": {
    title: "正弦定理",
    body: r`外接円の半径を $R$ として $\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}=2R$。辺と対角、そして外接円を結ぶ。`,
  },
  "synthesis": {
    title: "三角関数の合成",
    body: r`$a\sin\theta+b\cos\theta=\sqrt{a^2+b^2}\,\sin(\theta+\varphi)$。2 つの波を振幅 $\sqrt{a^2+b^2}$ の 1 つの正弦波にまとめる。最大・最小が即座に分かる。`,
  },
  "inscribed-angle": {
    title: "円周角の定理",
    body: r`同じ弧に対する円周角は等しく、中心角の半分。直径に対する円周角は $90^\circ$（タレスの定理）。`,
  },
  "apollonius": {
    title: "アポロニウスの円",
    body: r`2 定点 $A,B$ からの距離の比 $PA:PB=k\ (k\neq1)$ が一定の点 $P$ の軌跡は円。$k=1$ のときだけ例外的に垂直二等分線（直線）になる。`,
  },

  // ---- 微分・積分 ----
  "derivative-geom": {
    title: "微分係数の幾何的意味",
    body: r`$f'(a)$ は曲線 $y=f(x)$ の点 $(a,f(a))$ における接線の傾き。「接する」を「傾きが一致する」に翻訳する橋渡し。`,
  },
  "tangent-line": {
    title: "接線の方程式",
    body: r`$y=f(x)$ 上の点 $(t,f(t))$ における接線は $y=f'(t)(x-t)+f(t)$。接点 $t$ をパラメータに取ると、通る点の条件が $t$ の方程式になる。`,
  },
  "one-sixth": {
    title: "1/6 公式",
    body: r`放物線と直線（または 2 放物線）が $x=\alpha,\beta$ で交わるとき、囲む面積は $\displaystyle\int_\alpha^\beta a(x-\alpha)(x-\beta)\,dx=\frac{|a|}{6}(\beta-\alpha)^3$。展開せず一発で出せる。`,
  },
  "riemann": {
    title: "区分求積法",
    body: r`$\displaystyle\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}f\!\left(\frac kn\right)=\int_0^1 f(x)\,dx$。幅 $\frac1n$ の長方形の面積和が、$n\to\infty$ で定積分（面積）に収束する。`,
  },
  "even-odd-extreme": {
    title: "極値と増減",
    body: r`$f'(x)$ の符号が正→負に変わる点が極大、負→正が極小。3 次関数が異なる 3 実解をもつ条件は（極大値）×（極小値）$<0$。`,
  },

  // ---- 整数 ----
  "mod": {
    title: "合同式（mod）",
    body: r`$a\equiv b\ (\mathrm{mod}\ m)$ は「$a-b$ が $m$ の倍数」。余りだけで加減乗が計算でき、整数を $m$ 種類に分類して矛盾を突ける。`,
  },
  "mod3-square": {
    title: "平方数の mod 3",
    body: r`どんな整数 $n$ も $n\equiv0,\pm1$。よって $n^2\equiv0$ または $1\ (\mathrm{mod}\ 3)$ のみで、$2$ にはならない。素数の分類で効く。`,
  },
  "pigeonhole": {
    title: "鳩の巣原理",
    body: r`$n+1$ 個を $n$ 個の箱に入れれば、必ずどれかの箱に 2 個以上入る。「3 連続のうち 1 つは 3 の倍数」もこの一種。`,
  },

  // ---- 複素数 ----
  "de-moivre": {
    title: "ド・モアブルの定理",
    body: r`$\bigl(\cos\theta+i\sin\theta\bigr)^n=\cos n\theta+i\sin n\theta$。複素数の累乗を、絶対値の累乗と偏角の定数倍に分ける。`,
  },
  "complex-abs-locus": {
    title: "絶対値と軌跡",
    body: r`$|z-\alpha|=r$ は中心 $\alpha$・半径 $r$ の円、$|z-\alpha|=|z-\beta|$ は 2 点 $\alpha,\beta$ の垂直二等分線。複素数の等式が図形に化ける。`,
  },
  "mobius": {
    title: "一次分数変換",
    body: r`$w=\dfrac{az+b}{cz+d}\ (ad-bc\neq0)$。直線と円の全体を、直線と円の全体へ移す（円円対応）。逆に解いて $z$ を $w$ で表すのが定石。`,
  },

  // ---- ベクトル ----
  "dot-product": {
    title: "内積",
    body: r`$\vec a\cdot\vec b=|\vec a||\vec b|\cos\theta$。直交は $\vec a\cdot\vec b=0$、長さは $|\vec a|^2=\vec a\cdot\vec a$。角度・垂直・長さをすべて内積で扱える。`,
  },
  "linear-independence": {
    title: "1 次独立と係数比較",
    body: r`$\vec a,\vec b$ が 1 次独立なら、$s\vec a+t\vec b=s'\vec a+t'\vec b\Rightarrow s=s',\ t=t'$。位置ベクトルの一意性が交点を決める。`,
  },
  "foot-of-perpendicular": {
    title: "垂線の足",
    body: r`点 $P$ から平面（直線）へ下ろした垂線の足 $H$ は、$\overrightarrow{PH}$ が法線方向で、かつ $H$ が平面上にある点。$\overrightarrow{PH}\cdot(\text{方向})=0$ で決まる。`,
  },

  // ---- 一般手法 ----
  "param-existence": {
    title: "通過領域＝解の存在",
    body: r`点 $(x,y)$ が「ある $t$ で曲線上」にある条件は、$t$ の方程式が（範囲内に）実数解をもつこと。逆像法。境界は重解（判別式 $=0$）。`,
  },
  "minimax": {
    title: "ミニマックス",
    body: r`「最大値を最小にする」最適化。等リップル（各山が等しい高さ）で最適になることが多く、$\cos$ 型のチェビシェフ多項式が典型解を与える。`,
  },
  "char-equation": {
    title: "漸化式の特性方程式",
    body: r`$a_{n+2}=p\,a_{n+1}+q\,a_n$ には $x^2=px+q$ を対応させる。解 $\alpha,\beta$ で $\{a_{n+1}-\alpha a_n\}$ が等比になり、一般項が求まる。`,
  },
};

export function getWhyNote(key: string): WhyNote | undefined {
  return WHY_NOTES[key];
}
