// ── 共通テスト AI作戦会議 — Geminiプロンプト組み立て ───────────────────────

import type { CommonTestAiAnalysisInput } from "@/lib/common-test-ai-analysis";
import { buildValidCommonTestHrefs } from "@/lib/common-test-ai-analysis";

export const COMMON_TEST_ORACLE_SYSTEM_INSTRUCTION = `あなたは大学入学共通テスト対策の経験豊富な学習コーチです。
受験生一人ひとりの模擬試験の結果データを分析し、次に何をすべきかを具体的かつ実行可能な言葉で助言します。

# 守るべき方針
- 自然で丁寧な日本語の受験指導を行うこと。
- サイバーパンク風の比喩（特異点・撃破・討伐・汚染・ハッキング・侵入・ボスなど）は絶対に使わないこと。
- 受験生を煽ったり、自信を失わせたりする表現は禁止。
- 必ず「時間内スコア」と「無制限スコア」の差を分析し、理解の問題か処理速度の問題かを切り分けること。
- 大問別に、時間超過・未解答・弱点タグを踏まえて助言すること。
- 目標点が与えられている場合は、あと何点必要かを踏まえて、得点効率の高い大問から優先するよう助言すること。
- 次にやるべき行動を必ず3つ提示すること。
- 各助言は簡潔に。冗長な前置きや一般論を避け、このデータに即した具体的な内容にすること。

# 出力形式
- 必ず下記スキーマのJSONのみを出力すること。マークダウンのコードフェンスや説明文は一切付けないこと。
- href は、こちらが提示する「利用可能なURL」の中からのみ選ぶこと。該当が無ければ href を省略してよい。

スキーマ:
{
  "summary": "全体の総合講評（80〜120字）",
  "scoreDiagnosis": "時間内/無制限スコアの差に基づく診断",
  "timeDiagnosis": "時間配分の診断",
  "sectionAdvice": [{"sectionId":"section-2","title":"第2問","diagnosis":"...","nextAction":"..."}],
  "weakPointSummary": "弱点タグを踏まえたまとめ",
  "nextThreeActions": [{"title":"...","reason":"...","href":"/common-test/..."}],
  "reviewQueueAdvice": "復習キューの使い方の助言",
  "targetScoreAdvice": "目標点までの道筋",
  "encouragement": "前向きな励まし（1〜2文）"
}`;

export function buildCommonTestOracleUserPrompt(
  input: CommonTestAiAnalysisInput
): string {
  const validHrefs = buildValidCommonTestHrefs(input);
  const unit = input.totalScore === 100 ? "点" : "問";

  const sectionLines = input.sectionResults
    .map((s) => {
      const num = s.sectionId.replace("section-", "");
      const accuracy =
        s.totalQuestions > 0
          ? Math.round((s.correctCount / s.totalQuestions) * 100)
          : 0;
      const over =
        s.recommendedTimeSec > 0 && s.totalTimeSec > s.recommendedTimeSec
          ? "（推奨時間超過）"
          : "";
      const scorePart =
        s.sectionScore != null
          ? ` 得点${s.earnedScore ?? 0}/${s.sectionScore}点（時間内${s.inTimeScore ?? 0}点）`
          : "";
      return `- 第${num}問${s.sectionTitle ? `「${s.sectionTitle}」` : ""}: 正答${s.correctCount}/${s.totalQuestions}（${accuracy}%）${scorePart} 所要約${Math.round(
        s.totalTimeSec / 60
      )}分/推奨${Math.round(s.recommendedTimeSec / 60)}分${over} 未解答${s.unansweredCount} 見直し${s.markedCount} 弱点[${s.weakSkillTags.join("・") || "なし"}]`;
    })
    .join("\n");

  return `# 受験生の模擬試験結果
科目: ${input.title}
目標点: ${input.targetScore != null ? `${input.targetScore}点` : "未設定"}
時間内スコア: ${input.timeLimitScore}${unit} / ${input.totalScore}${unit}
無制限スコア: ${input.unlimitedScore}${unit} / ${input.totalScore}${unit}
スコア差（無制限-時間内）: ${input.scoreGap}${unit}
所要時間: ${Math.round(input.actualTimeSec / 60)}分 / 制限${Math.round(
    input.examLimitSec / 60
  )}分
未解答数: ${input.unansweredCount}問
見直しフラグ数: ${input.markedCount}問
推奨時間を超過した大問数: ${input.overtimeCount}
全体の弱点タグ: ${input.weakSkillTags.join("・") || "なし"}

# 大問別の結果
${sectionLines}

# 利用可能なURL（nextThreeActions.href はこの中から選ぶこと）
${validHrefs.map((h) => `- ${h}`).join("\n")}

上記データを分析し、この受験生に向けた作戦会議をスキーマ通りのJSONで出力してください。`;
}
