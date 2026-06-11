// ── 共通テスト ルールベース作戦会議 ─────────────────────────────────────
// Gemini API が使えない場合のフォールバック。AIなしでも実用的な助言を返す。

import type {
  CommonTestAiAnalysisInput,
  CommonTestAiAnalysisResult,
  CommonTestAiSectionAdvice,
  CommonTestAiNextAction,
} from "@/lib/common-test-ai-analysis";
import { resolveCommonTestHref } from "@/lib/common-test-ai-analysis";

function fmtMin(sec: number): string {
  return `${Math.round(sec / 60)}分`;
}

function sectionLabel(input: CommonTestAiAnalysisInput, sectionId: string): string {
  const sr = input.sectionResults.find((s) => s.sectionId === sectionId);
  const num = sectionId.replace("section-", "");
  if (sr?.sectionTitle) return `第${num}問（${sr.sectionTitle}）`;
  return `第${num}問`;
}

export function buildRuleBasedAnalysis(
  input: CommonTestAiAnalysisInput
): CommonTestAiAnalysisResult {
  const unit = input.totalScore === 100 ? "点" : "問";

  // ── スコア診断 ──────────────────────────────────────────────────────
  const gap = input.scoreGap;
  let scoreDiagnosis: string;
  if (gap >= 10) {
    scoreDiagnosis = `時間内スコアは${input.timeLimitScore}${unit}、時間をかければ${input.unlimitedScore}${unit}まで届いています。差が${gap}${unit}と大きく、知識は身についているものの、時間内に解き切る処理速度に課題があります。`;
  } else if (gap >= 4) {
    scoreDiagnosis = `時間内スコア${input.timeLimitScore}${unit}に対し、無制限なら${input.unlimitedScore}${unit}。差は${gap}${unit}で、あと一歩で時間内に取り切れる問題が残っています。時間配分を少し見直すだけで上積みできます。`;
  } else {
    scoreDiagnosis = `時間内スコアと無制限スコアの差は${gap}${unit}と小さく、時間内に実力を出し切れています。次は得点そのものの底上げが課題です。`;
  }

  // ── 時間診断 ────────────────────────────────────────────────────────
  const overtimeSections = input.sectionResults.filter(
    (s) => s.recommendedTimeSec > 0 && s.totalTimeSec > s.recommendedTimeSec
  );
  let timeDiagnosis: string;
  if (input.actualTimeSec > input.examLimitSec) {
    timeDiagnosis = `全体で制限時間（${fmtMin(input.examLimitSec)}）を超過しました。`;
  } else {
    timeDiagnosis = `所要時間は${fmtMin(input.actualTimeSec)}で、制限時間内に収まっています。`;
  }
  if (overtimeSections.length > 0) {
    const names = overtimeSections
      .slice(0, 2)
      .map((s) => sectionLabel(input, s.sectionId))
      .join("・");
    timeDiagnosis += ` 特に${names}で推奨時間を超えています。ここを時間内に収める練習が効果的です。`;
  }
  if (input.unansweredCount > 0) {
    timeDiagnosis += ` 未解答が${input.unansweredCount}問あり、最後まで到達できていません。解く順番と捨て問の判断を決めておきましょう。`;
  }

  // ── 大問別アドバイス ────────────────────────────────────────────────
  const sectionAdvice: CommonTestAiSectionAdvice[] = input.sectionResults.map(
    (s) => {
      const num = s.sectionId.replace("section-", "");
      const accuracy =
        s.totalQuestions > 0
          ? Math.round((s.correctCount / s.totalQuestions) * 100)
          : 0;
      const over =
        s.recommendedTimeSec > 0 && s.totalTimeSec > s.recommendedTimeSec;

      let diagnosis = `正答 ${s.correctCount}/${s.totalQuestions}（正答率${accuracy}%）`;
      if (s.sectionScore != null && s.earnedScore != null) {
        diagnosis += `、得点 ${s.earnedScore}/${s.sectionScore}点`;
      }
      diagnosis += "。";
      if (over) {
        diagnosis += ` 推奨${fmtMin(s.recommendedTimeSec)}に対し約${fmtMin(s.totalTimeSec)}かかっています。`;
      }
      if (s.unansweredCount > 0) {
        diagnosis += ` 未解答が${s.unansweredCount}問あります。`;
      }

      let nextAction: string;
      if (accuracy < 50) {
        nextAction = `${s.weakSkillTags[0] ?? "基本事項"}を中心に、まず時間を気にせず確実に解ける状態を作りましょう。`;
      } else if (over) {
        nextAction = "解法は身についています。同じ大問を時間を計って繰り返し、処理速度を上げましょう。";
      } else if (s.unansweredCount > 0) {
        nextAction = "解ける問題から先に手を付け、難しい設問は後回しにする練習をしましょう。";
      } else {
        nextAction = "安定して得点できています。この調子を維持しましょう。";
      }

      return { sectionId: s.sectionId, title: `第${num}問`, diagnosis, nextAction };
    }
  );

  // ── 弱点まとめ ──────────────────────────────────────────────────────
  let weakPointSummary: string;
  if (input.weakSkillTags.length > 0) {
    weakPointSummary = `今回の弱点は「${input.weakSkillTags
      .slice(0, 3)
      .join("」「")}」です。これらが関わる設問を重点的に演習すると、得点が伸びやすくなります。`;
  } else {
    weakPointSummary =
      "目立った弱点タグはありません。各大問をまんべんなく演習し、取りこぼしを減らしましょう。";
  }

  // ── 次にやるべき3つ ─────────────────────────────────────────────────
  const nextThreeActions: CommonTestAiNextAction[] = [];

  // 1. 最も正答率が低い大問
  const sortedByAccuracy = [...input.sectionResults].sort((a, b) => {
    const aa = a.totalQuestions > 0 ? a.correctCount / a.totalQuestions : 0;
    const ba = b.totalQuestions > 0 ? b.correctCount / b.totalQuestions : 0;
    return aa - ba;
  });
  const weakest = sortedByAccuracy[0];
  if (weakest) {
    nextThreeActions.push({
      title: `${sectionLabel(input, weakest.sectionId)}を重点演習`,
      reason: `この大問の正答率が最も低く、伸びしろが大きい領域です。`,
      href: resolveCommonTestHref(
        `/common-test/${input.subjectId}/${weakest.sectionId}`,
        input
      ),
    });
  }

  // 2. 時間超過 or 未解答への対策
  if (overtimeSections.length > 0) {
    const target = overtimeSections[0];
    nextThreeActions.push({
      title: `${sectionLabel(input, target.sectionId)}を時間を計って解く`,
      reason: "推奨時間を超えています。時間を意識した反復で処理速度を上げましょう。",
      href: resolveCommonTestHref(
        `/common-test/${input.subjectId}/${target.sectionId}`,
        input
      ),
    });
  } else if (input.unansweredCount > 0) {
    nextThreeActions.push({
      title: "解答順序と時間配分を固める",
      reason: `未解答が${input.unansweredCount}問あります。解く順番と捨て問の基準を決めましょう。`,
      href: resolveCommonTestHref(`/common-test/simulator/${input.examId}`, input),
    });
  } else {
    nextThreeActions.push({
      title: "本番形式でもう一度通し演習",
      reason: "時間内に実力を出せています。再演習で安定感を高めましょう。",
      href: resolveCommonTestHref(`/common-test/simulator/${input.examId}`, input),
    });
  }

  // 3. 復習キューの活用
  nextThreeActions.push({
    title: "間違えた問題を復習キューで再演習",
    reason: "誤答・勘で正解した問題を復習キューに登録し、間隔をあけて解き直しましょう。",
    href: "/common-test/review",
  });

  // ── 復習キューについて ──────────────────────────────────────────────
  const reviewQueueAdvice =
    "誤答や、自信のないまま正解した問題は復習キューに登録できます。数日おいてから解き直すことで、知識が定着し、同じミスを繰り返しにくくなります。";

  // ── 目標点への助言 ──────────────────────────────────────────────────
  let targetScoreAdvice: string;
  if (input.targetScore != null) {
    const diff = input.targetScore - input.timeLimitScore;
    if (diff <= 0) {
      targetScoreAdvice = `現在の時間内スコア${input.timeLimitScore}${unit}は目標${input.targetScore}点に到達しています。この水準を本番で安定して出せるよう演習を続けましょう。`;
    } else {
      const topTarget = sortedByAccuracy
        .slice(0, 2)
        .map((s) => sectionLabel(input, s.sectionId))
        .join("・");
      targetScoreAdvice = `目標${input.targetScore}点まであと${diff}${unit}です。得点効率の高い${topTarget}から優先的に改善すると、最短で目標に近づけます。`;
    }
  } else {
    targetScoreAdvice =
      "司令室で目標点を設定すると、目標までの差分に基づいた具体的な助言が表示されます。";
  }

  // ── 総合講評・励まし ────────────────────────────────────────────────
  const summary = `${input.title}の結果です。時間内スコア${input.timeLimitScore}${unit} / ${input.totalScore}${unit}。${
    gap >= 10
      ? "処理速度が伸びれば一気に得点が上がる状態です。"
      : input.unansweredCount > 0
        ? "最後まで解き切る時間設計が次の鍵です。"
        : "着実に実力がついています。"
  }`;

  const encouragement =
    "一度の結果に一喜一憂せず、弱点を一つずつ潰していけば必ず得点は伸びます。次の演習でこの作戦を試してみてください。";

  return {
    summary,
    scoreDiagnosis,
    timeDiagnosis,
    sectionAdvice,
    weakPointSummary,
    nextThreeActions: nextThreeActions.slice(0, 3),
    reviewQueueAdvice,
    targetScoreAdvice,
    encouragement,
  };
}
