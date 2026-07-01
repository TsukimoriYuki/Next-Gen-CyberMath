import type { ExamSet } from "../exam-sets";

export const STANDARD_PRIVATE_MATH_1A_001: ExamSet = {
  id: "standard-private-math-1a-001",
  categoryId: "standard-private",
  subjectId: "math-1a",
  subjectTitle: "数学I・A",
  roundTitle: "第1回",
  title: "中堅私立模試 数学I・A 第1回",
  description:
    "産近甲龍・日東駒専レベルの本番難化回を想定した回です。第1問から処理量の多い小問を並べ、第2問の二次関数では文字 a を含む多段階の場合分け、第4問では0を含む整数の数え上げと条件付き確率まで一気に問います。",
  targetLevel: "産近甲龍・日東駒専レベルの難化回",
  durationMin: 60,
  totalScore: 100,
  expectedAverage: "35〜45点",
  format: "全問穴埋め・選択肢なし・式入力なし",
  status: "available",
  source: "manual-unreviewed",
  manualReviewed: false,
  qualityNote:
    "手動作成の私大標準レベル演習です。共通テスト本番模試とは別物で、第三者による内容監修は未了です。",
  sections: [
    {
      id: "section-1",
      title: "第1問 小問集合",
      points: 25,
      description:
        "倍数を含む場合の数、包除原理、平均と分散からの逆算、余りの条件、絶対値の不等式を扱う。",
      problems: [
        {
          id: "s1-1",
          title: "(1) 倍数と場合の数",
          body: [
            "0, 1, 2, 3, 4, 5 の6個の数字から異なる4個を選んで並べ、4桁の整数を作る。ただし、千の位に0を置くことはできない。",
            "このとき、3の倍数は全部で $\\text{[ア]}$ 個ある。さらに、そのうち6の倍数であるものは $\\text{[イ]}$ 個ある。",
          ],
          blanks: [
            { label: "ア", answer: "96", points: 3 },
            { label: "イ", answer: "52", points: 3 },
          ],
          explanation:
            "3の倍数は、選んだ4個の数字の和が3の倍数になればよい。和が3の倍数になる4数の組は5通りあり、そのうち0を含む組が4通り、0を含まない組が1通り。0を含む組は千の位に0を置けないので $4!-3!=18$ 通り、0を含まない組は $4!=24$ 通り。よって $4\\times18+1\\times24=96$ 個。6の倍数はこのうち一の位が偶数になるもので、各組ごとに数えると52個。",
        },
        {
          id: "s1-2",
          title: "(2) 3つの集合と包除原理",
          body: [
            "40人の生徒に、3種類の検定 X, Y, Z を受けてもらった。合格者数は X が24人、Y が20人、Z が18人であった。",
            "また、X と Y の両方に合格した生徒は10人、Y と Z の両方は8人、Z と X の両方は9人、3つすべてに合格した生徒は4人であった。",
            "少なくとも1つの検定に合格した生徒は $\\text{[ウ]}$ 人、どの検定にも合格しなかった生徒は $\\text{[エ]}$ 人である。また、ちょうど2つの検定に合格した生徒は $\\text{[オ]}$ 人である。",
          ],
          blanks: [
            { label: "ウ", answer: "39", points: 2 },
            { label: "エ", answer: "1", points: 1 },
            { label: "オ", answer: "15", points: 2 },
          ],
          explanation:
            "包除原理より、少なくとも1つに合格した生徒は $24+20+18-10-8-9+4=39$ 人。よって、どの検定にも合格しなかった生徒は $40-39=1$ 人。ちょうど2つに合格した生徒は、2つの共通部分の和から3つの共通部分の3倍を引いて $(10+8+9)-3\\times4=15$ 人。",
        },
        {
          id: "s1-3",
          title: "(3) 平均・分散と未知数",
          body: [
            "5個のデータ $a, b, 6, 9, 12$ がある。これらの平均値が8、分散が10であり、$a<b$ である。",
            "このとき、$a+b=\\text{[カ]}$ であり、$a=\\text{[キ]}$, $b=\\text{[ク]}$ である。",
          ],
          blanks: [
            { label: "カ", answer: "13", points: 2 },
            { label: "キ", answer: "3", points: 2 },
            { label: "ク", answer: "10", points: 2 },
          ],
          explanation:
            "平均が8なので合計は40、よって $a+b=40-(6+9+12)=13$。分散が10なので偏差の2乗の和は $10\\times5=50$。既知の3数の偏差2乗和は $(6-8)^2+(9-8)^2+(12-8)^2=4+1+16=21$ だから $(a-8)^2+(b-8)^2=29$。これと $a+b=13$ を連立すると $ab=30$ となり、$a, b$ は $t^2-13t+30=0$ の解 $t=3, 10$。$a<b$ より $a=3$, $b=10$。",
        },
        {
          id: "s1-4",
          title: "(4) 整数の余り条件",
          body: [
            "$1$ 以上 $500$ 以下の整数 $n$ のうち、6で割ると4余り、かつ8で割ると6余るものを考える。",
            "このような $n$ は全部で $\\text{[ケ]}$ 個あり、その中で最大のものは $\\text{[コ]}$ である。",
          ],
          blanks: [
            { label: "ケ", answer: "20", points: 2 },
            { label: "コ", answer: "478", points: 2 },
          ],
          explanation:
            "$n\\equiv4\\pmod{6}$ かつ $n\\equiv6\\pmod{8}$ を考える。6と8の最小公倍数24で見ると、$n\\equiv6\\pmod{8}$ を満たすのは24で割った余りが $6, 14, 22$ のいずれか。このうち6で割って4余るのは22だけなので $n\\equiv22\\pmod{24}$。$1$〜$500$ では $22, 46, \\ldots, 478$ の20個で、最大は478。",
        },
        {
          id: "s1-5",
          title: "(5) 絶対値を含む不等式",
          body: [
            "不等式 $|x-2|+|2x+1|\\leq5$ を解くと、$-\\dfrac{\\text{[サ]}}{\\text{[シ]}}\\leq x\\leq\\text{[ス]}$ となる。",
          ],
          blanks: [
            { label: "サ", answer: "4", points: 2 },
            { label: "シ", answer: "3", points: 1 },
            { label: "ス", answer: "2", points: 1 },
          ],
          explanation:
            "絶対値の中身が0になる $x=2$ と $x=-\\dfrac{1}{2}$ で場合分けする。$x\\geq2$ では $(x-2)+(2x+1)=3x-1\\leq5$ より $x\\leq2$ となり $x=2$ のみ。$-\\dfrac{1}{2}\\leq x<2$ では $(2-x)+(2x+1)=x+3\\leq5$ より常に成立。$x<-\\dfrac{1}{2}$ では $(2-x)+(-2x-1)=1-3x\\leq5$ より $x\\geq-\\dfrac{4}{3}$。あわせて $-\\dfrac{4}{3}\\leq x\\leq2$。",
        },
      ],
    },
    {
      id: "section-2",
      title: "第2問 二次関数",
      points: 35,
      description:
        "文字 a を含む関数を固定区間で考える。軸と区間の位置関係による多段階の場合分けで、最大値・最小値・その差・解の配置を調べる。",
      problems: [
        {
          id: "s2-1",
          title: "(1) 平方完成と頂点",
          body: [
            "$a$ を実数の定数とし、関数 $f(x)=x^2-2ax+4a$ を区間 $0\\leq x\\leq4$ で考える。",
            "平方完成すると $f(x)=(x-a)^2-a^2+\\text{[ア]}a$ となる。また、頂点の $y$ 座標 $-a^2+\\text{[ア]}a$ が最大になるのは $a=\\text{[イ]}$ のときである。",
          ],
          blanks: [
            { label: "ア", answer: "4", points: 2 },
            { label: "イ", answer: "2", points: 2 },
          ],
          explanation:
            "$x^2-2ax+4a=(x-a)^2-a^2+4a$ なので $\\text{[ア]}=4$。頂点の $y$ 座標 $-a^2+4a=-(a-2)^2+4$ は $a=2$ のとき最大値4をとる。",
        },
        {
          id: "s2-2",
          title: "(2) 最小値 m(a)",
          body: [
            "区間 $0\\leq x\\leq4$ における $f(x)=x^2-2ax+4a$ の最小値を $m(a)$ とする。軸は直線 $x=a$ である。",
            "$a<\\text{[ウ]}$ のとき $m(a)=\\text{[エ]}a$ である。",
            "$\\text{[ウ]}\\leq a\\leq\\text{[オ]}$ のとき $m(a)=-a^2+\\text{[カ]}a$ である。",
            "$a>\\text{[オ]}$ のとき $m(a)=\\text{[キ]}-\\text{[ク]}a$ である。",
          ],
          blanks: [
            { label: "ウ", answer: "0", points: 2 },
            { label: "エ", answer: "4", points: 2 },
            { label: "オ", answer: "4", points: 2 },
            { label: "カ", answer: "4", points: 2 },
            { label: "キ", answer: "16", points: 2 },
            { label: "ク", answer: "4", points: 2 },
          ],
          explanation:
            "下に凸の放物線なので、最小値は軸と区間の位置関係で決まる。軸 $x=a$ が区間の左外（$a<0$）なら区間で増加し、最小は左端 $x=0$：$f(0)=4a$。軸が区間内（$0\\leq a\\leq4$）なら最小は頂点：$-a^2+4a$。軸が右外（$a>4$）なら区間で減少し、最小は右端 $x=4$：$f(4)=16-8a+4a=16-4a$。",
        },
        {
          id: "s2-3",
          title: "(3) 最大値 M(a)",
          body: [
            "同じ関数・区間における最大値を $M(a)$ とする。下に凸の放物線では、最大値は区間の両端のうち軸から遠い方の端点でとる。区間の中点は $x=2$ である。",
            "$a<\\text{[ケ]}$ のとき $M(a)=\\text{[コ]}-\\text{[サ]}a$ である。",
            "$a\\geq\\text{[ケ]}$ のとき $M(a)=\\text{[シ]}a$ である。",
          ],
          blanks: [
            { label: "ケ", answer: "2", points: 2 },
            { label: "コ", answer: "16", points: 2 },
            { label: "サ", answer: "4", points: 2 },
            { label: "シ", answer: "4", points: 2 },
          ],
          explanation:
            "最大値は軸から遠い端点でとる。中点 $x=2$ より軸 $a$ が小さい（$a<2$）なら遠い端点は $x=4$ で $M(a)=f(4)=16-4a$。$a>2$ なら遠い端点は $x=0$ で $M(a)=f(0)=4a$。$a=2$ では両端点とも値が8で等しいので、どちらの式を使ってもよい。",
        },
        {
          id: "s2-4",
          title: "(4) 最大値と最小値の差",
          body: [
            "$M(a)-m(a)=12$ を満たす $a$ の値は、小さい順に $\\text{[ス]}-\\text{[セ]}\\sqrt{\\text{[ソ]}}$ と $\\text{[タ]}\\sqrt{\\text{[チ]}}$ である。",
          ],
          blanks: [
            { label: "ス", answer: "4", points: 1 },
            { label: "セ", answer: "2", points: 2 },
            { label: "ソ", answer: "3", points: 1 },
            { label: "タ", answer: "2", points: 2 },
            { label: "チ", answer: "3", points: 1 },
          ],
          explanation:
            "区間を $a<0$, $0\\leq a<2$, $2\\leq a\\leq4$, $a>4$ に分けて $D(a)=M(a)-m(a)$ を求める。$0\\leq a<2$ では $D=(16-4a)-(4a-a^2)=(a-4)^2$、$2\\leq a\\leq4$ では $D=4a-(4a-a^2)=a^2$。$(a-4)^2=12$ より $a=4-2\\sqrt{3}\\,(\\approx0.54)$ で $0\\leq a<2$ に適合。$a^2=12$ より $a=2\\sqrt{3}\\,(\\approx3.46)$ で $2\\leq a\\leq4$ に適合。$a<0$ では $D=16-8a=12$ から $a=\\dfrac{1}{2}$、$a>4$ では $D=8a-16=12$ から $a=\\dfrac{25}{8}$ となり、いずれも範囲外。よって $a=4-2\\sqrt{3},\\ 2\\sqrt{3}$。",
        },
        {
          id: "s2-5",
          title: "(5) 解の配置",
          body: [
            "方程式 $f(x)=0$、すなわち $x^2-2ax+4a=0$ が、区間 $0\\leq x\\leq4$ に少なくとも1つの実数解をもつような $a$ の範囲は、$a\\leq\\text{[ツ]}$ または $a\\geq\\text{[テ]}$ である。",
          ],
          blanks: [
            { label: "ツ", answer: "0", points: 2 },
            { label: "テ", answer: "4", points: 2 },
          ],
          explanation:
            "判別式を4で割った $\\dfrac{D}{4}=a^2-4a=a(a-4)$ が0以上、すなわち $a\\leq0$ または $a\\geq4$ のときだけ実数解をもつ（$0<a<4$ では実数解なし）。$a\\leq0$ のとき $f(0)=4a\\leq0$ かつ $f(4)=16-4a>0$ なので区間内で符号が変わり解をもつ。$a\\geq4$ のとき $f(0)=4a>0$ かつ $f(4)=16-4a\\leq0$ なのでやはり区間内に解をもつ。よって $a\\leq0$ または $a\\geq4$。",
        },
      ],
    },
    {
      id: "section-3",
      title: "第3問 図形と計量",
      points: 20,
      description:
        "三角形の3辺から、余弦定理・正弦定理・面積・外接円・内接円・角の二等分線へと公式を順につないで求める。",
      problems: [
        {
          id: "s3-1",
          title: "(1) $\\cos A$ と $\\sin A$",
          body: [
            "三角形 ABC において、$AB=5$, $BC=6$, $CA=4$ とする。$\\angle A$ の二等分線と辺 BC の交点を D とする。",
            "$\\cos A=\\dfrac{\\text{[ア]}}{\\text{[イ]}}$、$\\sin A=\\dfrac{\\text{[ウ]}\\sqrt{\\text{[エ]}}}{\\text{[オ]}}$ である。",
          ],
          blanks: [
            { label: "ア", answer: "1", points: 1 },
            { label: "イ", answer: "8", points: 1 },
            { label: "ウ", answer: "3", points: 1 },
            { label: "エ", answer: "7", points: 1 },
            { label: "オ", answer: "8", points: 1 },
          ],
          explanation:
            "$\\angle A$ の対辺は $BC=6$。余弦定理より $\\cos A=\\dfrac{AB^2+CA^2-BC^2}{2\\cdot AB\\cdot CA}=\\dfrac{25+16-36}{2\\cdot5\\cdot4}=\\dfrac{5}{40}=\\dfrac{1}{8}$。$\\sin A>0$ なので $\\sin A=\\sqrt{1-\\dfrac{1}{64}}=\\dfrac{\\sqrt{63}}{8}=\\dfrac{3\\sqrt{7}}{8}$。",
        },
        {
          id: "s3-2",
          title: "(2) 面積",
          body: ["三角形 ABC の面積 $S$ は $S=\\dfrac{\\text{[カ]}\\sqrt{\\text{[キ]}}}{\\text{[ク]}}$ である。"],
          blanks: [
            { label: "カ", answer: "15", points: 2 },
            { label: "キ", answer: "7", points: 1 },
            { label: "ク", answer: "4", points: 1 },
          ],
          explanation:
            "$S=\\dfrac{1}{2}\\cdot AB\\cdot CA\\cdot\\sin A=\\dfrac{1}{2}\\cdot5\\cdot4\\cdot\\dfrac{3\\sqrt{7}}{8}=\\dfrac{60\\sqrt{7}}{16}=\\dfrac{15\\sqrt{7}}{4}$。",
        },
        {
          id: "s3-3",
          title: "(3) 外接円の半径",
          body: ["三角形 ABC の外接円の半径 $R$ は $R=\\dfrac{\\text{[ケ]}\\sqrt{\\text{[コ]}}}{\\text{[サ]}}$ である。"],
          blanks: [
            { label: "ケ", answer: "8", points: 2 },
            { label: "コ", answer: "7", points: 1 },
            { label: "サ", answer: "7", points: 1 },
          ],
          explanation:
            "正弦定理 $\\dfrac{BC}{\\sin A}=2R$ より $R=\\dfrac{6}{2\\cdot\\frac{3\\sqrt{7}}{8}}=\\dfrac{6\\cdot8}{6\\sqrt{7}}=\\dfrac{8}{\\sqrt{7}}=\\dfrac{8\\sqrt{7}}{7}$。$R=\\dfrac{abc}{4S}$ を使っても同じ結果になる。",
        },
        {
          id: "s3-4",
          title: "(4) 内接円の半径",
          body: ["三角形 ABC の内接円の半径 $r$ は $r=\\dfrac{\\sqrt{\\text{[シ]}}}{\\text{[ス]}}$ である。"],
          blanks: [
            { label: "シ", answer: "7", points: 2 },
            { label: "ス", answer: "2", points: 1 },
          ],
          explanation:
            "半周長は $s=\\dfrac{5+6+4}{2}=\\dfrac{15}{2}$。$S=rs$ より $r=\\dfrac{S}{s}=\\dfrac{15\\sqrt{7}/4}{15/2}=\\dfrac{\\sqrt{7}}{2}$。",
        },
        {
          id: "s3-5",
          title: "(5) 角の二等分線",
          body: [
            "$\\angle A$ の二等分線 AD の長さは $AD=\\dfrac{\\text{[セ]}}{\\text{[ソ]}}$ であり、線分 CD の長さは $CD=\\dfrac{\\text{[タ]}}{\\text{[チ]}}$ である。",
          ],
          blanks: [
            { label: "セ", answer: "10", points: 1 },
            { label: "ソ", answer: "3", points: 1 },
            { label: "タ", answer: "8", points: 1 },
            { label: "チ", answer: "3", points: 1 },
          ],
          explanation:
            "角の二等分線は対辺を隣り合う2辺の比に分けるので $BD:DC=AB:AC=5:4$。よって $CD=\\dfrac{4}{9}\\cdot BC=\\dfrac{4}{9}\\cdot6=\\dfrac{8}{3}$。二等分線の長さは $AD^2=AB\\cdot AC\\left(1-\\left(\\dfrac{BC}{AB+AC}\\right)^2\\right)=20\\left(1-\\left(\\dfrac{6}{9}\\right)^2\\right)=20\\cdot\\dfrac{5}{9}=\\dfrac{100}{9}$ より $AD=\\dfrac{10}{3}$。",
        },
      ],
    },
    {
      id: "section-4",
      title: "第4問 場合の数と確率",
      points: 20,
      description:
        "0を含む数字から4桁の整数を作り、偶数・5の倍数・3の倍数の個数を数え上げ、最後に条件付き確率を求める。",
      problems: [
        {
          id: "s4-1",
          title: "(1) 整数の総数",
          body: [
            "0, 1, 2, 3, 4, 5, 6 の7個の数字から異なる4個を選んで並べ、4桁の整数を作る。ただし、千の位に0を置くことはできない。",
            "このとき、作ることのできる4桁の整数は全部で $\\text{[ア]}$ 個である。",
          ],
          blanks: [{ label: "ア", answer: "720", points: 3 }],
          explanation:
            "千の位は0以外の6通り。残りの3つの位には、残った6個の数字（0を含む）から異なる3個を並べるので $6\\cdot5\\cdot4=120$ 通り。よって $6\\times120=720$ 個。",
        },
        {
          id: "s4-2",
          title: "(2) 偶数の個数",
          body: ["作った4桁の整数のうち、偶数であるものは $\\text{[イ]}$ 個である。"],
          blanks: [{ label: "イ", answer: "420", points: 4 }],
          explanation:
            "一の位が偶数（0, 2, 4, 6）になればよい。一の位が0のとき、千の位は0以外の6通り、間の2つの位は残り5個から $5\\cdot4=20$ 通りなので $6\\times20=120$ 個。一の位が2, 4, 6のいずれか（3通り）のとき、千の位は0とその数字を除く5通り、間の2つは残り5個から $5\\cdot4=20$ 通りなので1つあたり $100$ 個、計 $300$ 個。あわせて $120+300=420$ 個。",
        },
        {
          id: "s4-3",
          title: "(3) 5の倍数の個数",
          body: ["作った4桁の整数のうち、5の倍数であるものは $\\text{[ウ]}$ 個である。"],
          blanks: [{ label: "ウ", answer: "220", points: 4 }],
          explanation:
            "一の位が0または5になればよい。一の位が0のとき $6\\cdot5\\cdot4=120$ 個。一の位が5のとき、千の位は0と5を除く5通り、間の2つは残り5個から $5\\cdot4=20$ 通りなので $5\\times20=100$ 個。あわせて $120+100=220$ 個。",
        },
        {
          id: "s4-4",
          title: "(4) 3の倍数の個数",
          body: ["作った4桁の整数のうち、3の倍数であるものは $\\text{[エ]}$ 個である。"],
          blanks: [{ label: "エ", answer: "264", points: 4 }],
          explanation:
            "3の倍数は、選んだ4個の数字の和が3の倍数になるとき。0〜6から選ぶ4数で和が3の倍数になる組は13通りあり、そのうち0を含む組が8通り、0を含まない組が5通り。0を含む組は千の位に0を置けないので $4!-3!=18$ 通り、0を含まない組は $4!=24$ 通り。よって $8\\times18+5\\times24=144+120=264$ 個。",
        },
        {
          id: "s4-5",
          title: "(5) 条件付き確率",
          body: [
            "作った4桁の整数が3の倍数であると分かっているとき、それが6の倍数である条件付き確率は $\\dfrac{\\text{[オ]}}{\\text{[カ]}}$ である。",
          ],
          blanks: [
            { label: "オ", answer: "13", points: 3 },
            { label: "カ", answer: "22", points: 2 },
          ],
          explanation:
            "条件付き確率の分母は「3の倍数」の個数264。分子は「6の倍数」、すなわち3の倍数かつ偶数であるものの個数で、各組について一の位を偶数にする並べ方を数えると156個。よって求める確率は $\\dfrac{156}{264}=\\dfrac{13}{22}$。",
        },
      ],
    },
  ],
};
