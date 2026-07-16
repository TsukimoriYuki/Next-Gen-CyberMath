import type {
  ElementaryInlineContent,
  ElementaryLesson,
  ElementaryLessonBlock,
} from "@/types/elementary-content";

export type ElementaryTextField = Readonly<{
  path: string;
  content: ElementaryInlineContent;
}>;

export function extractElementaryInlineText(
  content: ElementaryInlineContent,
  options: Readonly<{ includeRubyReadings?: boolean }> = {},
): string {
  return content
    .map((segment) => {
      if (segment.type === "ruby") {
        return options.includeRubyReadings
          ? `${segment.base}（${segment.reading}）`
          : segment.base;
      }
      return segment.text;
    })
    .join("");
}

export function getElementaryLessonTextFields(
  lesson: ElementaryLesson,
): readonly ElementaryTextField[] {
  const fields: ElementaryTextField[] = [
    { path: "title", content: lesson.title },
    { path: "description", content: lesson.description },
    ...lesson.goals.map((content, index) => ({ path: `goals[${index}]`, content })),
  ];

  lesson.blocks.forEach((block, blockIndex) => {
    fields.push(...getElementaryBlockTextFields(block, `blocks[${blockIndex}]`));
  });
  return fields;
}

export function getElementaryBlockTextFields(
  block: ElementaryLessonBlock,
  path = `block:${block.id}`,
): readonly ElementaryTextField[] {
  switch (block.type) {
    case "opening-question":
      return [{ path: `${path}.question`, content: block.question }];
    case "learning-goals":
      return block.items.map((content, index) => ({ path: `${path}.items[${index}]`, content }));
    case "dialogue":
      return [
        ...(block.title ? [{ path: `${path}.title`, content: block.title }] : []),
        ...block.lines.flatMap((line, index) => [
          { path: `${path}.lines[${index}].content`, content: line.content },
          ...(line.intent === "misconception"
            ? [{ path: `${path}.lines[${index}].rationale`, content: line.rationale }]
            : []),
        ]),
      ];
    case "explanation":
      return [
        { path: `${path}.title`, content: block.title },
        ...block.paragraphs.map((content, index) => ({ path: `${path}.paragraphs[${index}]`, content })),
      ];
    case "key-point":
      return [
        { path: `${path}.title`, content: block.title },
        ...block.points.map((content, index) => ({ path: `${path}.points[${index}]`, content })),
      ];
    case "guided-example":
      return [
        { path: `${path}.title`, content: block.title },
        { path: `${path}.prompt`, content: block.prompt },
        ...block.steps.map((step, index) => ({ path: `${path}.steps[${index}].content`, content: step.content })),
        { path: `${path}.answer`, content: block.answer },
        { path: `${path}.check`, content: block.check },
      ];
    case "visual":
      return [
        { path: `${path}.title`, content: block.title },
        { path: `${path}.fallbackText`, content: block.fallbackText },
      ];
    case "retry":
      return [
        { path: `${path}.title`, content: block.title },
        { path: `${path}.prompt`, content: block.prompt },
        { path: `${path}.response.content`, content: block.response.content },
      ];
    case "summary":
      return block.items.map((content, index) => ({ path: `${path}.items[${index}]`, content }));
    case "enrichment":
      return [
        { path: `${path}.title`, content: block.title },
        ...block.content.map((content, index) => ({ path: `${path}.content[${index}]`, content })),
      ];
  }
}
