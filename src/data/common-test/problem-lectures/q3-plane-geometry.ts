import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const geometryProperties = "/courses/math-1a/geometry-properties";

export const CT_Q3_PLANE_GEOMETRY: CommonTestProblemLecture = {
  id: "ct-ia-q3-plane-geometry",
  title: "第3問A 図形の性質：平面図形",
  pdfUrl: "/problem1a/ct_geometry_q3_plane_problem.pdf",
  targetSection: "第3問A",
  subjectLabel: "数学I・数学A",
  concepts: ["図形の性質", "円周角", "接弦定理", "方べき", "相似", "チェバ", "メネラウス", "角の二等分線", "五心"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "30〜35分",
  goals: [
    "円が出たとき、円周角・内接四角形・接弦定理を疑える",
    "角が等しいことから相似な三角形を作れる",
    "相似から辺の比・積の関係へ進められる",
    "直線と円の交点が出たら方べきを疑える",
    "接線が出たら接弦定理と接線の長さの等しさを確認できる",
    "比が連鎖するとき、チェバ・メネラウスの候補を考えられる",
    "図から長さや角を読まず、条件から角・比・積を確定できる",
    "「どの定理を使うべきか」を問題文と図の特徴から判断できる",
  ],
  insights: [
    { expression: "$\\angle BAC$ の二等分線と辺 $BC$ の交点 $D$", reaction: "角の二等分線定理で $BD:DC=AB:AC$ を作る" },
    { expression: "$AD,BE,CF$ が1点 $I$（内心）で交わる", reaction: "チェバの定理 $\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB}=1$ に、既に分かった2つの比を代入して残りを求める" },
    { expression: "座標 $B=(0,0),\\ C=(14,0),\\ A=(5,12)$", reaction: "内心・重心・外心の座標公式にそのまま代入する（図から読み取らない）" },
    { expression: "直線 $AD$ と円 $\\Gamma$ の交点 $K$、点 $D$ に関する方べき", reaction: "$BD\\cdot DC=AD\\cdot DK$（円の内部で交わる弦の方べき）を使う" },
    { expression: "点 $A$ における接線と直線 $AB$ のなす角 $\\theta$", reaction: "接弦定理より、その角は $\\angle ACB$ に等しい" },
    { expression: "$BP:PC,\\ CQ:QA$ が与えられ、直線 $PQ$ と $AB$ の交点 $H$", reaction: "メネラウスの定理で $AH:HB$ を求め、比の符号から $H$ が辺の内側か延長上かを判定する" },
    { expression: "同じ $13,14,15$ の三角形が別の設問にも登場する", reaction: "面積・内接円半径・外接円半径をゼロから計算し直さず、確定済みの値として使い回せないか確認する" },
  ],
  thinkingFlow: [
    "角の二等分線定理で $BD:DC$、$AE:EC$ の比を求める",
    "$AD,BE,CF$ が1点 $I$（内心）で交わることを使い、チェバの定理で $AF:FB$ を求める",
    "ヘロンの公式で面積 $S$ を求め、$r=S/s$、$R=abc/(4S)$ を求める",
    "座標 $B=(0,0),C=(14,0),A=(5,12)$ から、内心・重心・外心の座標を公式に代入して求める",
    "角の二等分線の長さの公式で $AD$ を求め、$BD\\cdot DC=AD\\cdot DK$（方べき）で $DK,AK$ を求める",
    "点 $A$ における接線と $AB$ のなす角 $\\theta$ を、接弦定理で $\\angle ACB$ に移し、余弦定理から $\\tan\\theta$ を求める",
    "メネラウスの定理で $AH:HB$ を求める",
    "比の符号（内分か外分か）を確認し、$H$ が辺のどちら側の延長上にあるかを判定する",
    "最後に、角の対応・比の対応・方べきの積の対応を検算する",
  ],
  explanations: [
    {
      heading: "この講座のゴール",
      body:
        "この講座の目的は、この三角形の穴埋めを埋められることではない。ゴールは、円・角・比・相似・積の関係を見たときに、どの定理を疑うべきかを体で判断できるようになること。\n\n図形のまま感覚で角度や長さを読まない。円が出たら円周角・接弦定理・方べきを、比が出たらチェバ・メネラウス・角の二等分線定理を、それぞれ「形」から自動的に候補として挙げられる状態を目指す。この判断体系ができれば、三角形や辺の数値が変わっても、別の平面図形の問題に同じ手順で対応できる。",
      mathCourseLink: { label: "図形の性質 中核講義：満点までの地図", href: `${geometryProperties}#gp-map-heading` },
    },
    {
      heading: "問題文の解剖",
      body:
        "計算・証明を始める前に、問題文と図から次の情報を拾っておく。\n\n- 円は1つ。三角形 $ABC$ の外接円 $\\Gamma$。\n- 同一円周上の点は $A,B,C$（(3)では新たに交点 $K$ が加わる）。\n- 角の二等分線が3本あり、交点 $D,E,F$ と、その3線が集まる内心 $I$ が与えられている。\n- 接線が1本ある（(3)後半、点 $A$ における接線 $\\ell$）。\n- 弦・割線としては、弦 $BC$ と、$A,K$ を通る直線（点 $D$ で $BC$ と交わる）がある。\n- 等しい角を作れそうな場所は、角の二等分線（角を半分にする）と、接弦定理（接線と弦の角＝円周角）。\n- 相似に使えそうな三角形は、方べきの背景にある $\\triangle ABD$ と $\\triangle AKC$ のような対応。\n- 積の関係が出そうな場所は、点 $D$ に関する方べき（$BD\\cdot DC=AD\\cdot DK$）。\n- 比を追うべき線分は、(1)の $BD:DC,\\ AE:EC,\\ AF:FB$ と、(4)の $BP:PC,\\ CQ:QA,\\ AH:HB$。\n- 図から読んではいけない量は、すべての長さ・角・比。座標 $B=(0,0),C=(14,0),A=(5,12)$ が与えられているので、内心・重心・外心はこの座標から公式で求める。",
      mathCourseLink: { label: "図形の性質 中核講義：道具選びのフロー", href: `${geometryProperties}#gp-flow-heading` },
    },
    {
      heading: "平面図形でまず何を見るべきか",
      body:
        "平面図形の問題では、公式を思い出す前に、次の順番で状況を確認する。\n\n- ① 円があるか。今回は三角形 $ABC$ の外接円 $\\Gamma$ がある。\n- ② 同じ弧を見る角があるか。(3)後半の接弦定理で、接線と弦 $AB$ のなす角を、弦 $AB$ に対するもう一方の円周角 $\\angle ACB$ に移す。\n- ③ 内接四角形があるか。今回は四角形が明示されていないので、この道具は使わない（別の問題ではまず疑う候補にする）。\n- ④ 接線があるか。今回は(3)後半で、点 $A$ における接線 $\\ell$ がある。\n- ⑤ 2直線が円と交わっているか。直線 $AD$ が円 $\\Gamma$ と $A,K$ の2点で交わる。\n- ⑥ 相似になりそうな三角形があるか。方べきの背景にある $\\triangle ABD$ と $\\triangle AKC$ のような対応。\n- ⑦ 比を求めるのか、長さを求めるのか、角を求めるのか。(1)(4)は比、(2)と(3)前半は長さ、(3)後半は角。\n- ⑧ 積の関係を使うのか、比の関係を使うのか。(3)前半は積（方べき）、(1)(4)は比（角の二等分線・チェバ・メネラウス）。\n- ⑨ 補助線が必要か、既存の線だけで足りるか。今回はすべて問題文で線が指定されているので、新しい補助線は不要。",
      mathCourseLink: { label: "図形の性質 中核講義：パターン別ミニ講義", href: `${geometryProperties}#gp-theorems-heading` },
    },
    {
      heading: "使う道具の判断表",
      body:
        "問題文・図の特徴ごとに、最初に疑う道具と目的を対応づけておく。\n\n- 同じ円周上に4点があるとき。円周角・内接四角形をまず疑う。角を等しくするのが目的。\n- 接線があるとき。接弦定理・接線の長さの相等をまず疑う。角と長さをつなぐのが目的（今回の(3)後半）。\n- 円と直線が2点で交わるとき。方べきをまず疑う。積の関係を作るのが目的（今回の(3)前半）。\n- 2つの三角形で角が2組等しいとき。相似をまず疑う。辺の比を作るのが目的。\n- 辺の比が一直線上に並ぶとき。メネラウスをまず疑う。比の連鎖を閉じるのが目的（今回の(4)）。\n- 3本の線が一点で交わるとき。チェバをまず疑う。比の条件を作るのが目的（今回の(1)後半）。\n- 中点・中線があるとき。重心・面積比をまず疑う。比を簡単にするのが目的。\n- 角の二等分線があるとき。角の二等分線定理・内心をまず疑う。辺の比へ変換するのが目的（今回の(1)前半）。",
      mathCourseLink: { label: "図形の性質 中核講義：道具選びのフロー", href: `${geometryProperties}#gp-flow` },
    },
    {
      heading: "標準解答(1) 角の二等分線定理とチェバの定理",
      body:
        "$\\angle BAC$ の二等分線と辺 $BC$ の交点が $D$。角の二等分線定理より、$D$ は $BC$ を「はさむ2辺の比」$AB:AC$ に内分するので\n\n$$BD:DC=AB:AC=13:15$$\n\n$BD+DC=BC=14$ なので、$BD=14\\times\\dfrac{13}{28}=\\dfrac{13}{2}$、$DC=14\\times\\dfrac{15}{28}=\\dfrac{15}{2}$。\n\n同様に、$\\angle ABC$ の二等分線と辺 $CA$ の交点 $E$ についても角の二等分線定理より\n\n$$AE:EC=AB:BC=13:14$$\n\n次に点 $F$（$\\angle ACB$ の二等分線と辺 $AB$ の交点）の比を求める。$AD,BE,CF$ が1点 $I$（内心）で交わることに着目し、チェバの定理\n\n$$\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB}=1$$\n\nに、既に分かった $\\dfrac{BD}{DC}=\\dfrac{13}{15}$、$\\dfrac{CE}{EA}=\\dfrac{14}{13}$（$AE:EC=13:14$ の逆比）を代入すると\n\n$$\\frac{13}{15}\\cdot\\frac{14}{13}\\cdot\\frac{AF}{FB}=1\\ \\Longrightarrow\\ \\frac{14}{15}\\cdot\\frac{AF}{FB}=1\\ \\Longrightarrow\\ \\frac{AF}{FB}=\\frac{15}{14}$$\n\nよって $AF:FB=15:14$。これは角の二等分線定理を点 $F$ に直接使った場合（$AF:FB=CA:CB=15:14$）と一致し、そのまま検算になる。",
      mathCourseLink: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    },
    {
      heading: "標準解答(2) 面積・内接円・外接円と座標",
      body:
        "三辺 $13,14,15$ の三角形は、ヘロンの公式で面積が求まる代表的な形。半周長 $s=\\dfrac{13+14+15}{2}=21$ なので\n\n$$S=\\sqrt{21(21-13)(21-14)(21-15)}=\\sqrt{21\\cdot8\\cdot7\\cdot6}=\\sqrt{7056}=84$$\n\n内接円半径は $S=rs$ より $r=\\dfrac{S}{s}=\\dfrac{84}{21}=4$。外接円半径は $R=\\dfrac{abc}{4S}=\\dfrac{13\\cdot14\\cdot15}{4\\cdot84}=\\dfrac{2730}{336}=\\dfrac{65}{8}$。\n\n座標 $B=(0,0),\\ C=(14,0),\\ A=(5,12)$ を使うと、内心・重心・外心はそれぞれの座標公式にそのまま代入できる（図から長さや位置を読み取る必要はない）。\n\n内心は $I=\\dfrac{aA+bB+cC}{a+b+c}$（$a=BC=14,\\ b=CA=15,\\ c=AB=13$）に代入して\n\n$$I=\\frac{14(5,12)+15(0,0)+13(14,0)}{42}=\\frac{(70+0+182,\\ 168+0+0)}{42}=\\frac{(252,168)}{42}=(6,4)$$\n\n重心は $G=\\dfrac{A+B+C}{3}=\\left(\\dfrac{5+0+14}{3},\\dfrac{12+0+0}{3}\\right)=\\left(\\dfrac{19}{3},4\\right)$。\n\n外心 $O=(x,y)$ は「$B,C$から等距離」「$B,A$から等距離」という2条件から求める。$OB=OC$ より $x=7$（$BC$ の垂直二等分線）。$OB=OA$ より $x^2+y^2=(x-5)^2+(y-12)^2$ を整理して $10x+24y=169$。$x=7$ を代入して $y=\\dfrac{33}{8}$。よって $O=\\left(7,\\dfrac{33}{8}\\right)$。",
      mathCourseLink: { label: "図形の性質：三角形の五心", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" },
    },
    {
      heading: "なぜその方針を選ぶのか",
      body:
        "円周角から始めるのは、角の二等分線や接線が絡む問題では角そのものを直接測れないことが多いから。円周角・接弦定理を使えば、離れた場所にある角を同じ値として移せる。\n\n相似を作る必要があるのは、角が等しいと分かっただけでは長さの関係にならないから。角が2組等しい2つの三角形を相似だと認識して初めて、辺の比・積の関係に進める。\n\n方べきを使うと積の関係が出るのは、方べきの定理自体、相似な三角形（$\\triangle ABD$ と $\\triangle AKC$ のような対応）から出る比の関係を、掛け算の形に整理したものだから。同じ点から円へ伸びる線分の積という形は、角度を経由せず長さだけで完結するので計算が速い。\n\n接線が出たら接弦定理を疑うのは、接線が円と1点でしか交わらないため、円周角の定理をそのままは使えないから。接線と弦のなす角を対応する円周角に移す接弦定理が、唯一の橋渡しになる。\n\n比の問題ではチェバ・メネラウスを候補にするのは、3本の線分の比が絡み、しかも1点に集まる（チェバ）か1直線上に並ぶ（メネラウス）かのどちらかの構造が見えたら、個別に相似を探すより、比の積が1になるという1本の式で一気に処理できるから。",
      mathCourseLink: { label: "図形の性質 中核講義：円が出たらの章", href: `${geometryProperties}#gp-circle-heading` },
    },
    {
      heading: "標準解答(3) 角の二等分線の長さと方べきの定理",
      body:
        "角の二等分線の長さの公式 $AD^2=AB\\cdot AC-BD\\cdot DC$ を使う。(1)より $BD\\cdot DC=\\dfrac{13}{2}\\cdot\\dfrac{15}{2}=\\dfrac{195}{4}$（問題文にも与えられている）。\n\n$$AD^2=13\\times15-\\frac{195}{4}=195-\\frac{195}{4}=\\frac{780-195}{4}=\\frac{585}{4}$$\n\n$585=9\\times65$ なので $\\sqrt{585}=3\\sqrt{65}$。よって $AD=\\dfrac{3\\sqrt{65}}{2}$。\n\n点 $D$ は円 $\\Gamma$ の内部にあり、弦 $BC$ と弦 $AK$ がこの点で交わっている。方べきの定理より\n\n$$BD\\cdot DC=AD\\cdot DK$$\n\nこの式は、$\\triangle ABD$ と $\\triangle AKC$ が相似になることから導かれる比の関係を、積の形に整理したもの。$DK$ について解くと\n\n$$DK=\\frac{BD\\cdot DC}{AD}=\\frac{195/4}{3\\sqrt{65}/2}=\\frac{195}{4}\\times\\frac{2}{3\\sqrt{65}}=\\frac{65}{2\\sqrt{65}}=\\frac{\\sqrt{65}}{2}$$\n\n$D$ は線分 $AK$ の内部にあるので、$AK=AD+DK=\\dfrac{3\\sqrt{65}}{2}+\\dfrac{\\sqrt{65}}{2}=\\dfrac{4\\sqrt{65}}{2}=2\\sqrt{65}$。",
      mathCourseLink: { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" },
    },
    {
      heading: "標準解答(3) 接弦定理でtanθを求める",
      body:
        "点 $A$ における円 $\\Gamma$ の接線 $\\ell$ と、弦 $AB$ のなす角 $\\theta$（鋭角）を考える。接弦定理より、この角は弦 $AB$ に対する円周角のうち、接線と同じ側ではない方の弧（$C$ を含む弧）に対する円周角、つまり $\\angle ACB$ に等しい。\n\n$$\\theta=\\angle ACB$$\n\n$\\angle ACB$ は余弦定理で求められる。$a=BC=14,\\ b=CA=15,\\ c=AB=13$ とすると\n\n$$\\cos C=\\frac{a^2+b^2-c^2}{2ab}=\\frac{14^2+15^2-13^2}{2\\cdot14\\cdot15}=\\frac{196+225-169}{420}=\\frac{252}{420}=\\frac35$$\n\n$\\cos C=\\dfrac35$ なので、$3:4:5$ の直角三角形の比から $\\sin C=\\dfrac45$。よって\n\n$$\\tan\\theta=\\tan C=\\frac{\\sin C}{\\cos C}=\\frac{4/5}{3/5}=\\frac43$$",
      mathCourseLink: { label: "図形の性質：円周角と接弦角", href: "/courses/math-1a/geometry-properties/geometry-properties-inscribed-angle-tangent-chord" },
    },
    {
      heading: "標準解答(4) メネラウスの定理と外分点の判定",
      body:
        "辺 $BC$ 上に $BP:PC=2:3$ となる点 $P$、辺 $CA$ 上に $CQ:QA=3:4$ となる点 $Q$ を取り、直線 $PQ$ と直線 $AB$ の交点を $H$ とする。$P,Q$ はどちらも辺の内側（内分点）だが、1本の直線が三角形の3辺（の延長を含む）をちょうど1回ずつ横切るとき、内分点の個数は必ず0個か2個になる。$P,Q$ の2個がすでに内分点なので、残りの $H$ は必ず外分点（辺 $AB$ の延長上）になると先に予測できる。\n\nメネラウスの定理（三角形 $ABC$ と直線 $PQH$）より\n\n$$\\frac{BP}{PC}\\cdot\\frac{CQ}{QA}\\cdot\\frac{AH}{HB}=1$$\n\nに $\\dfrac{BP}{PC}=\\dfrac23$、$\\dfrac{CQ}{QA}=\\dfrac34$ を代入すると\n\n$$\\frac23\\cdot\\frac34\\cdot\\frac{AH}{HB}=1\\ \\Longrightarrow\\ \\frac12\\cdot\\frac{AH}{HB}=1\\ \\Longrightarrow\\ \\frac{AH}{HB}=2$$\n\nしたがって $AH:HB=2:1$。先に予測した通り $H$ は外分点であり、$B$ を挟んで $A$ と反対側（$B$ 側の延長上）に出る。座標で確認すると、$B=(0,0),A=(5,12)$ に対して $H=(-5,-12)$ となり、たしかに $B$ を挟んで $A$ と反対方向にある。よって、$H$ は辺 $AB$ の $B$ 側の延長上にある。",
      mathCourseLink: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    },
    {
      heading: "捨てるべき方針",
      body:
        "本番では、正しい方針を選ぶだけでなく、遠回りや事故のもとになる方針を捨てる判断も点数になる。\n\n- 図から角や長さを読もうとする。角の二等分線の交点 $D,E,F$ や、内心 $I$・外心 $O$ の位置を図の見た目で確定しない。座標や公式が与えられているときは必ずそれを使う。\n- 円があるのに三平方や余弦定理だけで押し切ろうとする。方べきや円周角・接弦定理を使えば1行で済む関係を、座標や余弦定理の計算だけで無理に処理すると計算量が大きく増える。\n- 相似の対応順を確認せずに比を作る。$\\triangle ABD$ と $\\triangle AKC$ のような対応で、どの辺とどの辺が対応するかを確認しないと、比の分子分母を逆にする。\n- 方べきの2つの積の対応を逆にする。$BD\\cdot DC=AD\\cdot DK$ は「同じ点 $D$ を通る2本の弦」の積であり、無関係な線分どうしを掛けない。\n- 接弦定理の角を取り違える。接線と弦のなす角は、接線と同じ側の弧ではなく、反対側の弧に対する円周角に等しい。\n- チェバ・メネラウスを必要ない場面で乱用する。今回の(1)前半の比は角の二等分線定理だけで求まり、チェバは点 $F$ の比を確定する場面でのみ使う。\n- 補助線を引きすぎて情報を増やしすぎる。今回はすべての線が問題文で指定されているので、新しい補助線は不要。線を増やすとかえって同じ弧・同じ角を見失う。",
      mathCourseLink: { label: "図形の性質 中核講義：ミス回収", href: `${geometryProperties}#gp-mistake-recovery` },
    },
    {
      heading: "別解・見方の比較",
      body:
        "同じ問題でも、着目する道具を変えると見え方や計算量が変わる。\n\n- 別視点A：角追い中心。円周角・内接四角形・接弦定理から角を整理し、相似に持ち込む。使える場面は「角の情報が多く、長さがまだ少ない」とき。今回の(3)後半（接弦定理で $\\tan\\theta$ を求める場面）はこの型そのもの。角を移すだけなので速いが、接線と弦のなす角をどちらの弧の円周角に移すかを間違えやすい。\n- 別視点B：方べき中心。長さや積の関係を先に作り、必要な比を求める。使える場面は「円と直線の交点、接線、割線が絡む」とき。今回の(3)前半（$DK,AK$ を求める場面）はこの型。角を経由せず長さだけで完結するので速いが、どの2本の線分の積を取るか（内部の交点か外部の点か）を間違えやすい。\n- 別視点C：相似中心。相似な三角形を先に探し、対応する辺の比で進める。使える場面は「角が2組等しい三角形が見えている」とき。方べきや接弦定理の裏側にある考え方で、証明の仕組みを理解するには最適だが、本番で毎回相似から組み立て直すのは時間がかかる。今回は方べき・接弦定理を直接使う方が速い。\n- 別視点D：比の定理中心。チェバ・メネラウスで比の連鎖をまとめる。使える場面は「3本の線分が1点に集まる、または1直線上に並ぶ」とき。今回の(1)後半と(4)はこの型そのもので、比を1本の式にまとめられるので最速。ただし、チェバ（1点に集まる）とメネラウスの取り違え、外分点の見落としに注意する。\n\n今回の問題全体では、(1)は比の定理中心（角の二等分線定理→チェバ）、(3)は方べき中心と角追い中心の組み合わせ、(4)は比の定理中心（メネラウス）が最適な組み合わせになる。",
      mathCourseLink: { label: "図形の性質 中核講義", href: geometryProperties },
    },
    {
      heading: "場合が変わったときの対処法",
      body:
        "今回の問題は「1つの三角形に、角の二等分線・外接円・接線・比の連鎖がすべて詰め込まれた」融合型だが、出題形式が変わっても考え方の骨格は同じである。\n\n- 場合A：円が1つだけある。円周角・中心角・内接四角形をまず見る。同じ弧を見る角を探す。\n- 場合B：円が2つある。共通弦・交点・接線を確認する。方べきや相似が出やすい。\n- 場合C：接線がある（今回の(3)後半）。接弦定理、接線の長さが等しいこと、方べきの接線版（$PT^2=PA\\cdot PB$）を疑う。\n- 場合D：割線が2本ある（今回の(3)前半）。方べきを使う。外部点なら「外側×全体」、内部点なら「片側×片側」（今回のように内部の交点 $D$ なら $BD\\cdot DC=AD\\cdot DK$）。\n- 場合E：比を求める（今回の(1)(4)）。相似、角の二等分線定理、チェバ、メネラウス、面積比を候補にする。3本が1点に集まるならチェバ、1直線上に並ぶならメネラウス。\n- 場合F：角を求める（今回の(3)後半）。円周角、接弦定理、内接四角形の対角の和、相似の角対応を候補にする。\n- 場合G：補助線が必要。目的が角なら円や平行線を引く。目的が比なら相似を作る線を引く。目的が長さなら直角・方べき・相似を作る線を引く。引く前に「何を作るための補助線か」を決めてから引く。",
      mathCourseLink: { label: "図形の性質 中核講義：道具選びのフロー", href: `${geometryProperties}#gp-flow-heading` },
    },
    {
      heading: "検算方法",
      body:
        "答えを出したら、次の観点で検算する。\n\n- 角の等しさが同じ弧から来ているか。接弦定理で $\\theta=\\angle ACB$ としたなら、両方とも弦 $AB$ に対する角であることを確認する。\n- 相似の対応順が一貫しているか。$\\triangle ABD$ と $\\triangle AKC$ のような対応で、対応する頂点の順序を最後まで崩していないか確認する。\n- 比の左右が逆になっていないか。$BD:DC=13:15$ であって $15:13$ ではないことを、$AB:AC=13:15$ という対応から再確認する。\n- 方べきの積が同じ点から出た線分になっているか。$BD\\cdot DC=AD\\cdot DK$ は、どちらも点 $D$ を通る2本の弦の積になっているかを確認する。\n- 接弦定理で使った角が接線と弦の角になっているか。$\\theta$ は接線 $\\ell$ と直線 $AB$ のなす角であり、他の辺との角ではないことを確認する。\n- 求めた長さや比が図の大小関係と矛盾していないか。$AC>AB$ なので、角の二等分線の性質から $DC>BD$、$EC:EA$ も $EC$ の方が大きくなっているはず（実際 $DC=7.5>BD=6.5$、$EC:EA=14:13$）。\n- メネラウスで求めた比の符号（内分・外分）が予測と合っているか。$P,Q$ が内分点2つなら $H$ は必ず外分点になるはずで、実際 $AH:HB=2:1$ の外分点として $B$ の外側に出ている。",
      mathCourseLink: { label: "図形の性質 中核講義：判別ドリル", href: `${geometryProperties}#gp-drill` },
    },
    {
      heading: "変形問題への橋渡し",
      body:
        "この講座を読んだ後に対応できるようになってほしい変形パターンは次の通り。\n\n- 円周角から相似を作る問題。\n- 接線と弦から接弦定理を使う問題。\n- 方べきで長さの積を求める問題。\n- 相似と方べきを組み合わせる問題。\n- チェバ・メネラウスで比を求める問題。\n- 内心・外心・重心が絡む問題。\n- 円と三角比が融合する問題。\n- 補助線を自分で引く問題。\n\nつまり、今回の問題は1つの三角形専用の解き方ではなく、「円・角・比・相似・積の関係を見たときに、どの定理を疑うか」を体系的に判断する練習の入口である。",
      mathCourseLink: { label: "図形の性質 中核講義", href: geometryProperties },
    },
    {
      heading: "MATH講座への戻り先",
      body:
        "基礎が不安なところがあれば、MATHタブの対応講座に戻って確認する。\n\n- 円周角の定理・接弦定理が不安なら「円周角と接弦角」で、同じ弧に対する角の等しさと、接線と弦の角の移し方を復習する。\n- 内接四角形が不安なら「内接四角形と円の角」で、対角の和が $180^\\circ$ になることを復習する。\n- 方べきの定理が不安なら「方べきの定理」で、弦どうし・割線・接線それぞれの積の形を復習する。\n- 相似・チェバの定理・メネラウスの定理が不安なら「チェバ・メネラウスの定理」で、相似の対応比から比の連鎖の作り方までを復習する。\n- 角の二等分線・内心・外心・重心が不安なら「三角形の五心」で、それぞれの中心がどの線の交点で、何から等距離かを復習する。",
      mathCourseLink: { label: "図形の性質：円周角と接弦角", href: "/courses/math-1a/geometry-properties/geometry-properties-inscribed-angle-tangent-chord" },
    },
  ],
  mistakes: [
    {
      mistake: "円周角の対応する弧を間違える",
      cause: "同じ弦に対して2つの弧があり、どちら側の弧に対する円周角かを確認せずに角を移している。",
      returnTo: { label: "図形の性質：円周角と接弦角", href: "/courses/math-1a/geometry-properties/geometry-properties-inscribed-angle-tangent-chord" },
    },
    {
      mistake: "内接四角形の対角の和を使い忘れる",
      cause: "円に内接する四角形が見えているのに、対角の和が $180^\\circ$ になることに気づかず、角度を余弦定理などで無理に求めようとしている。",
      returnTo: { label: "図形の性質：内接四角形と円の角", href: "/courses/math-1a/geometry-properties/geometry-properties-cyclic-quadrilateral" },
    },
    {
      mistake: "接弦定理の角を逆に見る",
      cause: "接線と弦のなす角を、接線と同じ側の弧の円周角と一致させてしまい、反対側の弧の円周角に等しいことを見落としている。",
      returnTo: { label: "図形の性質 中核講義：円が出たらの章", href: `${geometryProperties}#gp-circle-heading` },
    },
    {
      mistake: "相似の対応順を間違える",
      cause: "2つの三角形が相似であることは分かっても、どの頂点とどの頂点が対応するかを確認せず、比の分子分母を逆にしている。",
      returnTo: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    },
    {
      mistake: "方べきで外側と全体の積を取り違える",
      cause: "外部点からの2本の割線では「外側の長さ×全体の長さ」を掛けるが、これを別の組み合わせで計算している。",
      returnTo: { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" },
    },
    {
      mistake: "チェバとメネラウスの使い分けを間違える",
      cause: "3本の線分が1点に集まっているのか（チェバ）、1直線上に並んでいるのか（メネラウス）を確認せずに、式の形だけで選んでいる。",
      returnTo: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    },
    {
      mistake: "図から長さを読み取る",
      cause: "座標や比が問題文で与えられているのに、図の見た目で長さや位置を判断しようとしている。",
      returnTo: { label: "図形の性質 中核講義：比が出たらの章", href: `${geometryProperties}#gp-ratio-heading` },
    },
    {
      mistake: "補助線を引きすぎる",
      cause: "「何を作るための補助線か」を決める前に線を引き、かえって同じ弧・同じ角を見失っている。",
      returnTo: { label: "図形の性質 中核講義：道具選びのフロー", href: `${geometryProperties}#gp-flow-heading` },
    },
    {
      mistake: "同じ文字の点が多くて交点を取り違える",
      cause: "$D,E,F$（角の二等分線の交点）と $P,Q,H$（メネラウスの交点）のように、似た役割の点が複数の設問にまたがって登場し、別の設問の点と混同している。",
      returnTo: { label: "図形の性質 中核講義：満点までの地図", href: `${geometryProperties}#gp-map-heading` },
    },
    {
      mistake: "選択肢・判定を雰囲気で選ぶ",
      cause: "$H$ が辺のどちら側の延長上にあるかのような判定を、比の符号（内分・外分）を確認せずに感覚で答えている。",
      returnTo: { label: "図形の性質 中核講義：判別ドリル", href: `${geometryProperties}#gp-drill` },
    },
  ],
  relatedMathCourses: [
    { label: "図形の性質：円周角と接弦角", href: "/courses/math-1a/geometry-properties/geometry-properties-inscribed-angle-tangent-chord" },
    { label: "図形の性質：内接四角形と円の角", href: "/courses/math-1a/geometry-properties/geometry-properties-cyclic-quadrilateral" },
    { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" },
    { label: "図形の性質：チェバ・メネラウスの定理（相似の基礎を含む）", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    { label: "図形の性質：三角形の五心（内心と角の二等分線）", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" },
  ],
  relatedCoreLectures: [{ label: "図形の性質 補助線発見講座", href: geometryProperties }],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第3問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第3問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第3問B 図形の性質：空間図形（同じ13-14-15の三角形を底面に使用）", href: "/common-test/problem-lectures/ct-ia-q3-space-geometry" },
    { label: "第1問後半 図形と計量（同じ三角形）", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement" },
  ],
};
