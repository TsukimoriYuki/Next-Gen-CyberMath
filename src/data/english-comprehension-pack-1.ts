import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_1: ComprehensionProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 問題 P1-1: 教科書レベル / 海洋プラスチック汚染 / 約90語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "plastic-ocean-pollution",
    title: "Plastic Pollution and the Marine Environment",
    level: "TEXTBOOK",
    tags: ["説明文", "環境・海洋汚染", "教科書", "約90語"],
    passage: `Every year, millions of tonnes of plastic waste enter the world's oceans. Much of this plastic breaks down into tiny fragments called microplastics, which are consumed by fish and other marine creatures. Scientists warn that microplastics can cause serious harm to marine ecosystems and may eventually enter the human food chain through the seafood we eat.

To address this crisis, many countries have introduced bans on single-use plastics such as straws and bags. Reducing plastic consumption and improving waste management are considered essential steps toward protecting ocean life.`,

    questions: [
      {
        questionText:
          "According to the passage, what happens to plastic that enters the ocean?",
        options: [
          "It dissolves completely in salt water within a few years.",
          "It is swept by ocean currents and naturally deposited on beaches.",
          "It breaks into small fragments called microplastics that can harm marine life.",
          "It sinks to the ocean floor where it remains permanently harmless.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落の第2文が直接の根拠です。

"Much of this plastic breaks down into tiny fragments called microplastics, which are consumed by fish and other marine creatures."
（プラスチックの多くはマイクロプラスチックと呼ばれる小さな断片に分解され、それが魚やその他の海洋生物に食べられる。）

→ C「マイクロプラスチックと呼ばれる小さな断片に分解され、海洋生物に害をもたらす」が正解。

【引っかけ分析】
・A「塩水に完全に溶解する」: 本文は「分解される（breaks down）」と述べていますが、「溶ける（dissolves）」ではありません。プラスチックは化学的に溶解しません。
・B「海岸に自然堆積する」: このような記述は本文にありません。
・D「海底で無害のまま残る」: 本文は "cause serious harm" と害があると述べており、逆です。

【構文解析：関係代名詞の継続用法】
"Much of this plastic breaks down into tiny fragments called microplastics, which are consumed by fish"
→ ", which" は継続用法（非制限用法）の関係代名詞。先行詞は "microplastics"（またはその断片）。
→ ", which are consumed" = "and they are consumed"（そしてそれらは食べられる）と言い換え可能。
→ "called microplastics" は過去分詞句で "tiny fragments" を修飾。`,
        syntaxAnalysis: [
          {
            text: "Much of this plastic",
            role: "S",
            translation: "このプラスチックの多くは（Much of = 〜の多くは：量を表す表現）",
          },
          {
            text: "breaks down",
            role: "V",
            translation: "分解される（break down = 句動詞「分解する・崩壊する」。ここは自動詞用法）",
          },
          {
            text: "into tiny fragments called microplastics",
            role: "M",
            translation: "マイクロプラスチックと呼ばれる小さな断片に（into = 変化の方向を示す前置詞。called = 過去分詞で fragments を後置修飾）",
          },
          {
            text: ", which are consumed by fish and other marine creatures",
            role: "M",
            translation: "それらは魚やその他の海洋生物に食べられる（関係代名詞の継続用法：先行詞 microplastics を補足説明。by = 受動態の動作主）",
          },
        ],
      },
      {
        questionText:
          "Why are microplastics described as a concern for humans?",
        options: [
          "They cause direct skin irritation for people who swim in the ocean.",
          "They may enter the human food chain through the seafood we consume.",
          "They reduce the oxygen levels in coastal drinking water supplies.",
          "They damage fishing nets, making it harder to catch seafood.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落の第3文が根拠です。

"Scientists warn that microplastics can cause serious harm to marine ecosystems and may eventually enter the human food chain through the seafood we eat."
（科学者たちは、マイクロプラスチックが海洋生態系に深刻な害をもたらし、私たちが食べる魚介類を通じて最終的には人間の食物連鎖に入り込む可能性があると警告している。）

→ B「私たちが食べる魚介類を通じて人間の食物連鎖に入る可能性がある」が正解。

【引っかけ分析】
・A「皮膚への直接的な刺激」: 本文に記述なし。
・C「飲料水の酸素レベルを下げる」: 本文に記述なし。
・D「漁網を傷つける」: 本文に記述なし。

【語彙ポイント】
・"warn that ..."（〜と警告する）: warn + that節 の形。
・"eventually"（最終的には・いずれは）: 時間をかけて結果的に〜する。
・"food chain"（食物連鎖）: 生態系における捕食-被食の連鎖関係。`,
      },
      {
        questionText:
          "According to the passage, which of the following is one response that many countries have taken to the plastic pollution crisis?",
        options: [
          "Funding the development of new biodegradable plastic alternatives.",
          "Building large floating barriers to collect plastic from the ocean.",
          "Banning single-use plastic items such as straws and bags.",
          "Restricting the amount of seafood people are allowed to consume annually.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第1文が直接の根拠です。

"many countries have introduced bans on single-use plastics such as straws and bags"
（多くの国がストローやバッグなどの使い捨てプラスチックの禁止を導入した。）

→ C「ストローやバッグなどの使い捨てプラスチックを禁止する」がそのまま言い換えです。

【引っかけ分析】
・A「生分解性プラスチックの開発支援」: 本文に記述なし。
・B「浮きバリアの建設」: 本文に記述なし。海洋プラスチック除去の現実の取り組みとして存在しますが、本文には出てきません。
・D「魚介類の消費制限」: 本文は「海洋生物を守るための廃棄物管理」を述べており、消費制限には触れていません。

【語彙ポイント】
・"single-use plastics"（使い捨てプラスチック）: 一度使用したら廃棄されるプラスチック製品。
・"ban on"（〜に対する禁止）: "introduce a ban on"（〜の禁止を導入する）で使われる。
・"waste management"（廃棄物管理）: ゴミの収集・処理・リサイクルに関する行政・業務。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 P1-2: 共通テストレベル / リモートワークと都市変容 / 約135語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "remote-work-urban-change",
    title: "Remote Work and the Reshaping of Urban Centres",
    level: "COMMON_TEST",
    tags: ["論説文", "リモートワーク・都市変容", "共通テスト", "約135語"],
    passage: `The widespread adoption of remote work following the global pandemic has triggered a significant restructuring of residential and commercial patterns in cities worldwide. As employees gained the freedom to work from any location, many chose to relocate from expensive urban centres to more affordable suburban or rural areas, a phenomenon that economists have termed "the great migration."

This shift has had mixed consequences for cities. Central business districts, once defined by the daily influx of office workers, have experienced declining footfall and rising commercial vacancy rates. Some city authorities have responded by converting underused office buildings into residential housing to meet growing demand.

However, proponents of urban life argue that cities retain irreplaceable advantages — cultural institutions, professional networks, and the creative energy generated by density — that no rural broadband connection can replicate.`,

    questions: [
      {
        questionText:
          "What does the 'great migration' refer to in the first paragraph?",
        options: [
          "The movement of businesses from rural areas into urban centres.",
          "A government initiative encouraging workers to leave expensive cities.",
          "The trend of workers relocating from expensive cities to suburban or rural areas.",
          "The global expansion of remote work technology into developing nations.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落の後半で "the great migration" が定義されています。

"many chose to relocate from expensive urban centres to more affordable suburban or rural areas, a phenomenon that economists have termed 'the great migration.'"
（多くの人が高価な都市中心部からより手頃な郊外・地方へ移住することを選んだ。この現象を経済学者たちは「グレート・マイグレーション（大移動）」と呼んでいる。）

→ C「高価な都市から郊外・地方への移住トレンド」がそのまま言い換え。

【引っかけ分析】
・A「企業が地方から都市へ移動する」: 方向が逆。人々が「都市から地方へ」移動しています。
・B「政府の奨励策」: 本文は政府政策ではなく、個人の自由な選択（"chose to relocate"）について述べています。
・D「途上国へのリモートワーク技術の拡大」: 本文に記述なし。

【構文解析：同格の名詞句】
"many chose to relocate from ... to ..., a phenomenon that economists have termed 'the great migration'"
→ "a phenomenon ..." はコンマの後の同格句。直前の節全体（多くが移住した事実）を "a phenomenon" として受けて説明。
→ "economists have termed A B"（経済学者たちはAをBと呼んでいる）: term は「〜と呼ぶ・称する」という動詞。`,
      },
      {
        questionText:
          "According to the passage, how have some city authorities responded to the decline in office use?",
        options: [
          "By offering tax incentives to attract new businesses to city centres.",
          "By reducing public transport services to cut operating costs.",
          "By converting unused office buildings into residential housing.",
          "By passing laws that require employees to return to city offices.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落の最終文が根拠です。

"Some city authorities have responded by converting underused office buildings into residential housing to meet growing demand."
（一部の都市当局は、増大する需要を満たすために、使われていないオフィスビルを住宅に転換することで対応した。）

→ C「使われていないオフィスビルを住宅に転換する」が正解。

【引っかけ分析】
・A「税制優遇による企業誘致」: 本文に記述なし。
・B「公共交通の削減」: 本文に記述なし。
・D「オフィス復帰を義務付ける法律」: 本文では "responded by converting"（転換することで対応）と述べており、強制帰還とは逆方向の対応です。

【構文：by -ing の手段表現】
"responded by converting underused office buildings into residential housing"
→ "respond by doing"（〜することによって対応する）: by + 動名詞が手段を示す。
→ "convert A into B"（AをBに転換する）: 重要熟語。
→ "to meet growing demand"（増大する需要を満たすために）: 不定詞の目的用法。`,
      },
      {
        questionText:
          "What do advocates of urban life claim cities offer that cannot be replaced?",
        options: [
          "Lower living costs compared to suburban and rural areas.",
          "Proximity to national and international transport hubs.",
          "Cultural institutions, professional networks, and the energy of dense environments.",
          "Government offices and centralised administrative infrastructure.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と構文解析】
正解は C。第3段落が根拠です。

核心文: "cities retain irreplaceable advantages — cultural institutions, professional networks, and the creative energy generated by density — that no rural broadband connection can replicate."

この文の構造を分解します：

S（主語）: cities
V（述語）: retain（保持する）
O（目的語）: irreplaceable advantages（代替不可能な優位性）
M（同格修飾）: — cultural institutions, professional networks, and the creative energy generated by density —（ダッシュで挟まれた同格説明 = advantages の具体的内容）
M（関係節）: that no rural broadband connection can replicate（どんな地方のブロードバンドも複製できない）

→ C「文化機関、専門家ネットワーク、高密度環境のエネルギー」が正解。

【引っかけ分析】
・A「低い生活費」: 本文は都市は「高価（expensive）」と述べており、生活費の安さは郊外・地方の優位性。
・B「交通ハブへのアクセス」: 本文に記述なし。
・D「政府機関・行政インフラ」: 本文に記述なし。

【語彙ポイント】
・"irreplaceable"（代替不可能な）: "ir-"（否定接頭辞）+ "replaceable"（代替可能な）。
・"density"（密集度・高密度）: 都市特有の人口密度の高さから生まれる創造的エネルギー。
・"replicate"（複製する・再現する）: "reproduce" とほぼ同義。`,
        syntaxAnalysis: [
          {
            text: "cities",
            role: "S",
            translation: "都市は（第3段落全体の主語）",
          },
          {
            text: "retain",
            role: "V",
            translation: "保持している（retain = 「失わずに保ち続ける」。hold / keep と区別）",
          },
          {
            text: "irreplaceable advantages",
            role: "O",
            translation: "代替不可能な優位性を（irreplaceable = ir-（否定）+ replaceable）",
          },
          {
            text: "— cultural institutions, professional networks, and the creative energy generated by density —",
            role: "M",
            translation: "文化機関、専門家ネットワーク、そして高密度から生まれる創造的エネルギー（ダッシュによる同格説明：advantages の具体的内容を列挙。generated by density = 密度によって生み出された、過去分詞の後置修飾）",
          },
          {
            text: "that no rural broadband connection can replicate",
            role: "M",
            translation: "どんな地方のブロードバンド接続も複製できない（関係代名詞節。that = which。no + 名詞 = 「どんな〜も…ない」という全否定）",
          },
        ],
      },
    ],
  },
];
