import { indexByUniqueRegistryKey } from "@/lib/registry";
import type {
  ElementaryGradeSpeechPolicy,
} from "@/types/elementary-content";
import type { ElementaryGradeId } from "@/types/elementary";

export const ELEMENTARY_GRADE_SPEECH_POLICIES: readonly ElementaryGradeSpeechPolicy[] = [
  {
    gradeId: "grade-3",
    maxDialogueCharacters: 60,
    maxIdeasPerLine: 1,
    useConcreteExamples: true,
    rephraseDifficultTerms: true,
    guidance: ["一文を短くする", "身近な物を例にする", "抽象語を避ける"],
  },
  {
    gradeId: "grade-4",
    maxDialogueCharacters: 70,
    maxIdeasPerLine: 1,
    useConcreteExamples: true,
    rephraseDifficultTerms: true,
    guidance: ["身近な例から考える", "新しい考えは一つずつ示す"],
  },
  {
    gradeId: "grade-5",
    maxDialogueCharacters: 80,
    maxIdeasPerLine: 1,
    useConcreteExamples: true,
    rephraseDifficultTerms: true,
    guidance: ["具体と抽象を行き来する", "理由を短く説明する"],
  },
  {
    gradeId: "grade-6",
    maxDialogueCharacters: 90,
    maxIdeasPerLine: 1,
    useConcreteExamples: true,
    rephraseDifficultTerms: true,
    guidance: ["考えの根拠を示す", "必要な用語は身近な言葉で補う"],
  },
] as const;

export const ELEMENTARY_GRADE_SPEECH_POLICIES_BY_ID = indexByUniqueRegistryKey(
  ELEMENTARY_GRADE_SPEECH_POLICIES,
  (policy) => policy.gradeId,
  "elementary grade speech-policy registry",
);

export const ELEMENTARY_PROHIBITED_PHRASES = [
  "こんなの簡単",
  "こんなことも分からない",
  "当たり前",
  "ちゃんと考えて",
  "頭が悪い",
  "勉強ができない",
  "普通は分かる",
  "覚えるだけ",
  "理屈はいいから",
] as const;

export function getElementaryGradeSpeechPolicy(
  gradeId: ElementaryGradeId | string,
): ElementaryGradeSpeechPolicy | undefined {
  return ELEMENTARY_GRADE_SPEECH_POLICIES_BY_ID[gradeId];
}
