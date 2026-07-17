import { getElementaryCharacter } from "@/data/elementary/characters";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import type {
  ElementaryDialogueBlock,
  ElementaryDialogueLine,
} from "@/types/elementary-content";
import { ElementaryText } from "./ElementaryText";
import styles from "./ElementaryLesson.module.css";

export function ElementaryCharacterBadge({
  speakerId,
  labelId,
}: {
  speakerId: ElementaryDialogueLine["speakerId"];
  labelId?: string;
}) {
  const character = getElementaryCharacter(speakerId);
  if (!character) {
    throw new Error(`Unknown elementary character: ${speakerId}`);
  }
  return (
    <span id={labelId} className={styles.character} aria-label={character.accessibilityLabel}>
      <span
        className={styles.avatarFallback}
        aria-hidden="true"
        data-testid={`elementary-character-fallback-${character.id}`}
      >
        {character.fallback.symbol}
      </span>
      <span className={styles.characterName}>
        <ElementaryText content={character.displayNameContent} />
      </span>
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
  const speakerLabelId = `${line.id}-speaker`;
  return (
    <div
      className={styles.dialogueLine}
      data-dialogue-line={line.id}
      data-speaker={line.speakerId}
      data-speaker-role={character.role}
      data-testid="elementary-dialogue-bubble"
      role="group"
      aria-labelledby={speakerLabelId}
    >
      <div className={styles.dialogueMeta}>
        <ElementaryCharacterBadge speakerId={line.speakerId} labelId={speakerLabelId} />
      </div>
      <p className={styles.dialogueText}>
        <ElementaryText content={line.content} />
      </p>
    </div>
  );
}

export function ElementaryDialogue({ block }: { block: ElementaryDialogueBlock }) {
  return (
    <ol className={styles.dialogueList} aria-label={elementaryUiCopy("dialogue-order-label")}>
      {block.lines.map((line) => (
        <li key={line.id} className={styles.dialogueItem}>
          <ElementaryDialogueLineView line={line} />
        </li>
      ))}
    </ol>
  );
}
