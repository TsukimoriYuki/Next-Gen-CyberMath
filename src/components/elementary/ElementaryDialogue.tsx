import { getElementaryCharacter } from "@/data/elementary/characters";
import type {
  ElementaryCharacterEmotion,
  ElementaryDialogueBlock,
  ElementaryDialogueLine,
} from "@/types/elementary-content";
import { ElementaryText } from "./ElementaryText";
import styles from "./ElementaryLesson.module.css";

const EMOTION_LABELS: Readonly<Record<ElementaryCharacterEmotion, string>> = {
  neutral: "おだやか",
  curious: "知りたい",
  thinking: "考え中",
  confused: "とまどい",
  surprised: "気づき",
  encouraging: "応援",
  happy: "うれしい",
  confident: "自信あり",
};

export function ElementaryCharacterBadge({
  speakerId,
}: {
  speakerId: ElementaryDialogueLine["speakerId"];
}) {
  const character = getElementaryCharacter(speakerId);
  if (!character) {
    throw new Error(`Unknown elementary character: ${speakerId}`);
  }
  return (
    <span className={styles.character} aria-label={character.accessibilityLabel}>
      <span
        className={styles.avatarFallback}
        aria-hidden="true"
        data-testid={`elementary-character-fallback-${character.id}`}
      >
        {character.fallback.symbol}
      </span>
      <span className={styles.characterName}>{character.displayName}</span>
    </span>
  );
}

export function ElementaryDialogueLineView({
  line,
}: {
  line: ElementaryDialogueLine;
}) {
  const character = getElementaryCharacter(line.speakerId);
  if (!character) {
    throw new Error(`Unknown elementary character: ${line.speakerId}`);
  }
  return (
    <div
      className={styles.dialogueLine}
      data-dialogue-line={line.id}
      data-speaker={line.speakerId}
      data-speaker-role={character.role}
    >
      <div className={styles.dialogueMeta}>
        <ElementaryCharacterBadge speakerId={line.speakerId} />
        <span className={styles.emotionLabel}>{EMOTION_LABELS[line.emotion]}</span>
      </div>
      <p className={styles.dialogueText}>
        <ElementaryText content={line.content} />
      </p>
    </div>
  );
}

export function ElementaryDialogue({ block }: { block: ElementaryDialogueBlock }) {
  return (
    <ol className={styles.dialogueList} aria-label="会話の順番">
      {block.lines.map((line) => (
        <li key={line.id} className={styles.dialogueItem}>
          <ElementaryDialogueLineView line={line} />
        </li>
      ))}
    </ol>
  );
}
