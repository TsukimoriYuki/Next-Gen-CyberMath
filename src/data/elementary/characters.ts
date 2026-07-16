import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";
import type {
  ElementaryCharacterId,
  ElementaryCharacterProfile,
} from "@/types/elementary-content";
import { TOMIYAMA_RUBY_EXCEPTION_ID } from "./kanji/ruby-exceptions";

export const ELEMENTARY_CHARACTERS: readonly ElementaryCharacterProfile[] = [
  {
    id: "hinano",
    role: "student",
    displayName: "ひなのちゃん",
    displayNameContent: [{ type: "text", text: "ひなのちゃん" }],
    characterLabel: "考えを言葉にする学習者",
    accessibilityLabel: "学習者のひなのちゃん",
    defaultEmotion: "curious",
    permittedIntents: [
      "question",
      "prediction",
      "misconception",
      "retry",
      "self-explanation",
      "acknowledgement",
      "summary",
    ],
    fallback: { symbol: "ひ", label: "ひなのちゃんの代わり" },
    speechPolicy: {
      principles: [
        "子どもが持ちやすい疑問を言葉にする",
        "間違いには考えた理由を持たせる",
        "説明の後でもう一度考える",
        "最後に自分の言葉で理解を説明する",
      ],
      prohibitedApproaches: [
        "間違いを能力不足や恥ずかしいこととして扱う",
        "理由のない誤答をさせる",
      ],
    },
  },
  {
    id: "tomiyama",
    role: "teacher",
    displayName: "冨山先生",
    displayNameContent: [
      {
        type: "ruby",
        base: "冨山",
        reading: "とみやま",
        exceptionId: TOMIYAMA_RUBY_EXCEPTION_ID,
      },
      { type: "text", text: "先生" },
    ],
    characterLabel: "問い返しで考えを支える先生",
    accessibilityLabel: "先生の とみやま せんせい",
    defaultEmotion: "encouraging",
    permittedIntents: [
      "acknowledgement",
      "prompt",
      "hint",
      "explanation",
      "deepening",
      "summary",
    ],
    fallback: { symbol: "と", label: "とみやま せんせいの代わり" },
    speechPolicy: {
      principles: [
        "子どもの考えの正しい部分を先に認める",
        "答えだけを先に示さず問い返す",
        "図や具体例を使い難しい言葉を言い換える",
        "必修内容と発展内容を分ける",
        "子どものなぜという疑問を大切にする",
      ],
      prohibitedApproaches: [
        "一方的な説教にする",
        "疑問や誤答を軽視する",
      ],
    },
  },
] as const;

assertUniqueRegistryKeys(
  ELEMENTARY_CHARACTERS,
  (character) => character.id,
  "elementary character ID registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_CHARACTERS,
  (character) => character.displayName,
  "elementary character display-name registry",
);

export const ELEMENTARY_CHARACTERS_BY_ID = indexByUniqueRegistryKey(
  ELEMENTARY_CHARACTERS,
  (character) => character.id,
  "elementary character ID registry",
);

export function getElementaryCharacter(
  characterId: ElementaryCharacterId | string,
): ElementaryCharacterProfile | undefined {
  return ELEMENTARY_CHARACTERS_BY_ID[characterId];
}
