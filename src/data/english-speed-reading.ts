import type { SpeedReadingProblem } from "@/lib/english-types";
import { SPEED_READING_PACK_1 } from "./english-speed-reading-pack-1";
import { SPEED_READING_PACK_2 } from "./english-speed-reading-pack-2";
import { SPEED_READING_PACK_3 } from "./english-speed-reading-pack-3";
import { SPEED_READING_PACK_4 } from "./english-speed-reading-pack-4";
import { SPEED_READING_PACK_5 } from "./english-speed-reading-pack-5";
import { SPEED_READING_PACK_6 } from "./english-speed-reading-pack-6";
import { SPEED_READING_PACK_7 } from "./english-speed-reading-pack-7";
import { SPEED_READING_PRIVATE_PACK_1 } from "./english-speed-reading-private-pack-1";

export const SPEED_READING_PROBLEMS: SpeedReadingProblem[] = [
  ...SPEED_READING_PACK_1,
  ...SPEED_READING_PACK_2,
  ...SPEED_READING_PACK_3,
  ...SPEED_READING_PACK_4,
  ...SPEED_READING_PACK_5,
  ...SPEED_READING_PACK_6,
  ...SPEED_READING_PACK_7,
  ...SPEED_READING_PRIVATE_PACK_1,
  // ────────────────────────────────────────────────────────────────────────
  // 問題 1: 共通テストレベル / AIと環境問題 / 約130語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "ai-and-environment",
    title: "Artificial Intelligence and the Climate Crisis",
    level: "COMMON_TEST",
    timeLimit: 60,
    tags: ["論説文", "AI", "環境問題", "共通テスト", "約130語"],
    passage: `Artificial intelligence is increasingly being used to address environmental challenges. Machine learning algorithms can analyze vast amounts of climate data, predict weather patterns, and optimize energy consumption in buildings and factories. For example, an AI system developed by a major technology company reduced cooling energy use at its data centers by approximately 40 percent.

However, there is a significant paradox: training large AI models consumes enormous amounts of energy. A single training run for a sophisticated language model can emit as much carbon dioxide as five cars over their entire lifetimes. Critics argue that the environmental cost of developing AI far outweighs its benefits in combating climate change.

Proponents counter that once trained, AI systems can be deployed repeatedly with minimal additional energy, and that their long-term applications in managing renewable energy grids will ultimately reduce global emissions far more than the initial training costs.`,

    questions: [
      {
        questionText:
          "Which of the following best describes the main argument of the passage?",
        options: [
          "AI is unambiguously the most effective solution to climate change.",
          "AI presents both environmental benefits and costs, making its net impact debatable.",
          "The energy cost of training AI models proves it is harmful to the environment.",
          "AI technology has no significant impact on global carbon emissions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と構文解析】
正解は B。本文は AI が環境問題にメリット（エネルギー最適化・気候データ解析）をもたらす一方で、トレーニングに莫大なエネルギーを消費するというデメリットも指摘し、最終段落で擁護側の反論を提示する「両面提示型」の論説構造をとっています。

・A は "unambiguously（疑いなく）" が過言。本文は反論も丁寧に紹介しています。
・C は批判派（Critics argue...）の主張の一部に過ぎず、著者自身の結論ではありません。
・D は "no significant impact" が本文と矛盾。

【重要構文】
"Critics argue that ... far outweighs its benefits" — SVOC 構造。
  主語: the environmental cost of developing AI
  述語: far outweighs（はるかに上回る）
  目的語: its benefits
"far" は比較級を強調する副詞で「はるかに・格段に」の意味。

【語彙ポイント】
・"paradox"（逆説）: 期待と反対の事実が成立する状況。"significant paradox" で「重大な矛盾」。
・"proponents counter that ..."（支持者は〜と反論する）: "counter" は動詞で「反論する」。`,
      },
      {
        questionText:
          "According to the passage, the AI system mentioned in the first paragraph was used to do which of the following?",
        options: [
          "Predict weather patterns in urban areas.",
          "Optimize factory production schedules.",
          "Reduce energy used for cooling data centers.",
          "Develop new sources of renewable energy.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落の "an AI system ... reduced cooling energy use at its data centers by approximately 40 percent" が直接の根拠です。

【引っかけポイント】
・A「天気予報」と B「工場スケジュール」は同段落の "predict weather patterns" "optimize energy consumption in ... factories" から来ていますが、これらは AI の一般的な用途の列挙であり、「その例（For example）」として挙げられたデータセンターの話ではありません。
・"For example" 以下が設問の対象であることを見抜く必要があります。これが共通テスト頻出の「具体例の読み取り」問題です。

【構文】
"reduced cooling energy use ... by approximately 40 percent" — "by" は差の量を示す前置詞。
「約40パーセントだけ（分だけ）削減した」という意味。"reduce A by B" の形を押さえましょう。`,
      },
      {
        questionText:
          "What do supporters of AI claim in the final paragraph?",
        options: [
          "AI training costs will decrease significantly in the near future.",
          "The long-term benefits of AI in energy management will offset its training costs.",
          "AI systems require more energy when deployed than during training.",
          "Renewable energy alone is sufficient to power AI training processes.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と論理構造】
正解は B。最終段落の論理構造を丁寧に追うことが重要です。

"Proponents counter that
  (1) once trained, AI systems can be deployed repeatedly with minimal additional energy,
  and that
  (2) their long-term applications in managing renewable energy grids will ultimately reduce global emissions far more than the initial training costs."

(1) 一度訓練されたら繰り返し展開でき、追加エネルギーはほぼゼロ
(2) 再生可能エネルギー管理への長期応用が、最終的には訓練コスト以上の排出削減をもたらす

選択肢 B は (1)+(2) をまとめた「長期的メリットがコストを相殺する」という主張と一致します。

【引っかけ】
・A「コストが近い将来大幅に下がる」は本文に記述なし（将来予測ではなく、現状の展開コストの低さを主張しています）。
・C は本文と逆（展開時のエネルギーは最小限と述べている）。

【語彙】
・"ultimately"（最終的には）: long-term の視点を示すキーワード。
・"offset"（相殺する）≒ "outweigh" の逆向き：こちらが上回ることを示す。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 2: 国公立大学レベル / 認知心理学（記憶のメカニズム） / 約165語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "memory-reconstruction",
    title: "The Reconstructive Nature of Human Memory",
    level: "NATIONAL_UNI",
    timeLimit: 60,
    tags: ["論説文", "認知心理学", "記憶", "国公立大", "約165語"],
    passage: `Contrary to popular belief, human memory does not function like a video recorder that faithfully captures and replays past events. Instead, cognitive psychologists describe memory as a fundamentally reconstructive process, whereby individuals actively rebuild their recollections using existing knowledge, expectations, and contextual cues rather than retrieving a fixed, stored copy.

This understanding was pioneered by Frederic Bartlett, whose landmark 1932 experiments demonstrated that people systematically distort recalled information to conform to their cultural schemas — mental frameworks through which we organize and interpret our experiences. When participants were asked to reproduce an unfamiliar Native American folk tale, they unconsciously altered details that conflicted with their own cultural background, replacing unusual elements with more familiar equivalents.

The implications of this reconstructive nature extend to legal contexts. Eyewitness testimony, long presumed highly reliable, has been shown to be surprisingly susceptible to post-event suggestion. Psychologist Elizabeth Loftus famously demonstrated that altering a single word in a question — asking whether cars "smashed into" versus "contacted" each other — significantly influenced witnesses' subsequent memories of an accident's severity, including details they had never actually observed.`,

    questions: [
      {
        questionText:
          `In the context of the passage, the word "schemas" (paragraph 2) most closely means:`,
        options: [
          "Specific memories stored in long-term neural pathways.",
          "Organized mental frameworks used to interpret and categorize experiences.",
          "Written records or visual diagrams created to aid memory.",
          "Unconscious emotional responses triggered by cultural exposure.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：文脈推測問題】
正解は B。語彙の意味を文脈から推測する問題で、国公立大で頻出のパターンです。

"schemas" は直後にダッシュ（—）を用いた同格説明で定義されています。
"schemas — mental frameworks through which we organize and interpret our experiences"

この定義を言い換えると「経験を整理・解釈するための精神的枠組み」= B が最も適切。

【引っかけ分析】
・A「長期記憶に保存された特定の記憶」: "schemas" は個々の記憶ではなく、記憶を解釈する「構造・枠組み」です。
・C「記憶を助けるための書かれた記録」: 全く関係ありません。
・D「感情的反応」: schemas は認知的（cognitive）なもので、感情的反応ではありません。

【構文解析：関係代名詞の構造】
"mental frameworks through which we organize and interpret our experiences"
→ 前置詞 "through" + 関係代名詞 "which" の形。
→ 元の文: "We organize and interpret our experiences through mental frameworks."
→ 「その枠組みを通じて我々は経験を整理・解釈する」

この "前置詞 + which" の形は国公立二次・私立難関で頻出。"through which" を "through them" に置き換えると構造が見えやすくなります。`,
      },
      {
        questionText:
          "Bartlett's experiments showed that participants distorted the folk tale primarily because:",
        options: [
          "They lacked sufficient working memory capacity to store long narratives.",
          "The tale was presented too rapidly for accurate comprehension.",
          "Their pre-existing cultural frameworks caused them to reinterpret unfamiliar content.",
          "They were deliberately instructed to modify culturally inappropriate elements.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と因果関係の把握】
正解は C。因果関係を問う問題です。

本文の該当箇所: "people systematically distort recalled information to conform to their cultural schemas"
そして: "they unconsciously altered details that conflicted with their own cultural background, replacing unusual elements with more familiar equivalents."

歪曲の原因（cause）= 「自分の文化的背景（= cultural schemas）と矛盾する要素に対して」
歪曲の結果（effect）= 「無意識に馴染みのある要素に置き換えた」

選択肢 C は "pre-existing cultural frameworks" = "cultural schemas" の言い換えとして適切。

【引っかけ分析】
・A「ワーキングメモリの容量不足」: 本文は記憶容量の問題ではなく、文化的枠組みによる解釈の問題として説明。
・B「提示速度の問題」: 本文に記述なし。
・D「意図的な指示があった」: 本文は "unconsciously"（無意識に）と明示しており、意図的ではない。

【語彙ポイント】
・"systematically distort"（系統的に歪める）: ランダムではなく、一定のパターンで歪める。
・"unconsciously altered"（無意識に変容させた）: 意図せずして起きた認知的変化。`,
      },
      {
        questionText:
          `In the final paragraph, "details they had never actually observed" refers to details that:`,
        options: [
          "Were fabricated by the researchers and inserted into the testimony.",
          "Existed in the accident but were too minor for witnesses to notice.",
          "Were created in the witnesses' memories through the influence of leading questions.",
          "Had been accurately reported by witnesses in earlier interviews.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：指示内容問題（代名詞・指示語）】
正解は C。"details they had never actually observed" の "they" が何を指し、"never actually observed" が何を意味するかを問う問題です。

文脈の流れを整理します。
(1) Loftus は目撃者に「cars が smashed into / contacted した」と言葉を変えて質問。
(2) すると目撃者はその後の記憶（subsequent memories）が変化した。
(3) 変化した記憶には「実際には見ていなかった詳細」まで含まれた。

→「実際には見ていなかった詳細」= 質問の言葉（leading question）によって記憶の中に新たに生み出された偽の詳細。

これは "post-event suggestion"（事後示唆）によって記憶が汚染される現象を指しており、C が正解。

【引っかけ分析】
・A「研究者が意図的に挿入した情報」: 実験の手続きは「質問の言葉を変える」だけであり、情報を直接挿入したわけではない。
・B「事故に実在したが見落とされた細部」: 本文は記憶が「変化・拡大した」ことを示しており、単なる見落としではない。
・D「以前の証言で正確に報告されていた」: 以前の証言との比較は本文に記述なし。

【構文解析】
"details they had never actually observed"
→ 関係代名詞 that/which の省略: "details [that/which] they had never actually observed"
→ 過去完了 "had never observed": インタビュー時点より以前に「観察していなかった」ことを示す時制の一致。

【語彙】
・"susceptible to"（〜に影響されやすい）: be susceptible to suggestion = 示唆に乗りやすい。
・"leading question"（誘導尋問）: 回答者の記憶・判断を特定方向に誘導する質問形式。`,
      },
    ],
  },
];
