"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Copy,
  Eye,
  FileDown,
  FileUp,
  Layers,
  Plus,
  Save,
  Trash2,
  Wand2,
} from "lucide-react";
import {
  createTriangleGeometryLayerBlock,
  DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
  type TriangleAuxiliaryLinePreset,
  type TriangleGeometrySvgInput,
} from "@/lib/lecture-geometry-svg";
import {
  MISTAKE_DIAGNOSIS_TAGS,
  SPECIAL_LECTURES,
  type ExpertThinkingItem,
  type ExplanationTab,
  type GeometryLayer,
  type Lecture,
  type LectureBlock,
  type LectureDifficulty,
  type MistakeDiagnosisTag,
} from "@/data/specialLectures";
import { LectureRenderer } from "@/components/lectures/LectureRenderer";

const STORAGE_KEY = "cyber-math-special-lecture-drafts";

const EXPLANATION_LABELS: ExplanationTab["label"][] = [
  "ヒント",
  "方針",
  "詳しい解説",
  "別解",
  "最速解法",
  "よくあるミス",
  "類題",
];

const THINKING_LABELS: ExpertThinkingItem["label"][] = [
  "まず見るところ",
  "怪しい条件",
  "使う公式候補",
  "決め手",
  "本番判断",
  "撤退ライン",
];

const BLOCK_TYPES: { type: LectureBlock["type"]; label: string }[] = [
  { type: "heading", label: "見出し" },
  { type: "paragraph", label: "本文" },
  { type: "math", label: "数式" },
  { type: "image", label: "画像" },
  { type: "geometryLayers", label: "図形レイヤー" },
  { type: "problem", label: "問題" },
  { type: "explanationTabs", label: "解説タブ" },
  { type: "expertThinking", label: "できる人の頭の中" },
  { type: "checklist", label: "チェックリスト" },
  { type: "relatedProblems", label: "関連演習" },
  { type: "callout", label: "補足" },
  { type: "solutionFlow", label: "解法判別フロー" },
  { type: "discriminationDrill", label: "判別ドリル" },
  { type: "mistakeRecovery", label: "ミス別補講" },
];

interface Props {
  lectureId?: string;
}

export function LectureEditor({ lectureId }: Props) {
  const [lecture, setLecture] = useState<Lecture>(() => createEmptyLecture(false));
  const [jsonText, setJsonText] = useState("");
  const [selectedType, setSelectedType] = useState<LectureBlock["type"]>("paragraph");
  const [status, setStatus] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [collapsedBlocks, setCollapsedBlocks] = useState<Record<string, boolean>>({});
  const [autosaveLabel, setAutosaveLabel] = useState("未保存");
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!lectureId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLecture(createEmptyLecture());
      return;
    }
    const saved = loadDraftLectures().find((item) => item.id === lectureId);
    const staticLecture = SPECIAL_LECTURES.find((item) => item.id === lectureId || item.slug === lectureId);
    setLecture(saved ?? staticLecture ?? createEmptyLecture());
  }, [lectureId]);

  const exportJson = useMemo(() => JSON.stringify(lecture, null, 2), [lecture]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const timeoutId = window.setTimeout(() => {
      saveLectureDraft(lecture);
      setAutosaveLabel(`自動保存済み ${new Date().toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      })}`);
    }, 900);
    return () => window.clearTimeout(timeoutId);
  }, [lecture]);

  function updateMeta<K extends keyof Lecture>(key: K, value: Lecture[K]) {
    setLecture((current) => ({ ...current, [key]: value }));
  }

  function saveDraft() {
    saveLectureDraft(lecture);
    setAutosaveLabel("手動保存済み");
    setStatus("localStorageに保存しました");
  }

  async function copyJson() {
    setJsonText(exportJson);
    try {
      await navigator.clipboard.writeText(exportJson);
      setStatus("JSONをクリップボードにコピーしました");
    } catch {
      setStatus("JSONを下の欄に生成しました");
    }
  }

  function generateJson() {
    setJsonText(exportJson);
    setStatus("JSONを生成しました");
  }

  function importJson() {
    try {
      const parsed = JSON.parse(jsonText) as Lecture;
      if (!parsed.id || !parsed.title || !Array.isArray(parsed.blocks)) {
        setStatus("Lecture JSONの形式を確認してください");
        return;
      }
      setLecture(parsed);
      setStatus("JSONを読み込みました");
    } catch {
      setStatus("JSONの読み込みに失敗しました");
    }
  }

  function addBlock(type: LectureBlock["type"]) {
    setLecture((current) => ({
      ...current,
      blocks: [...current.blocks, createBlock(type)],
    }));
  }

  function updateBlock(nextBlock: LectureBlock) {
    setLecture((current) => ({
      ...current,
      blocks: current.blocks.map((block) => (block.id === nextBlock.id ? nextBlock : block)),
    }));
  }

  function duplicateBlock(block: LectureBlock) {
    const cloned = cloneBlock(block);
    setLecture((current) => {
      const index = current.blocks.findIndex((item) => item.id === block.id);
      if (index < 0) return { ...current, blocks: [...current.blocks, cloned] };
      const blocks = [...current.blocks];
      blocks.splice(index + 1, 0, cloned);
      return { ...current, blocks };
    });
  }

  function deleteBlock(blockId: string) {
    setLecture((current) => ({
      ...current,
      blocks: current.blocks.filter((block) => block.id !== blockId),
    }));
  }

  function moveBlock(blockId: string, direction: -1 | 1) {
    setLecture((current) => {
      const index = current.blocks.findIndex((block) => block.id === blockId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.blocks.length) return current;
      const blocks = [...current.blocks];
      const [target] = blocks.splice(index, 1);
      blocks.splice(nextIndex, 0, target);
      return { ...current, blocks };
    });
  }

  function toggleCollapsed(blockId: string) {
    setCollapsedBlocks((current) => ({ ...current, [blockId]: !current[blockId] }));
  }

  function addProblemTemplate() {
    setLecture((current) => ({
      ...current,
      blocks: [...current.blocks, ...createProblemExplanationTemplate()],
    }));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/admin/lectures" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" />
          講義管理へ戻る
        </Link>

        <header className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold text-blue-700">管理者向け</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              {lecture.title || "新しい講義"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              保存先はこのブラウザのlocalStorageです。公開反映はJSONをエクスポートしてspecialLectures.tsへ貼り付けます。
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <Save className="h-3.5 w-3.5" />
              {autosaveLabel}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={saveDraft} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
              <Save className="h-4 w-4" />
              下書き保存
            </button>
            <button type="button" onClick={() => setShowPreview((value) => !value)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-200">
              <Eye className="h-4 w-4" />
              プレビュー
            </button>
          </div>
        </header>

        {status && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
            {status}
          </div>
        )}

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_480px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-950">基本情報</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="タイトル">
                  <input value={lecture.title} onChange={(e) => updateMeta("title", e.target.value)} className="input" />
                </Field>
                <Field label="slug">
                  <input value={lecture.slug} onChange={(e) => updateMeta("slug", e.target.value)} className="input" />
                </Field>
                <Field label="説明">
                  <textarea value={lecture.description} onChange={(e) => updateMeta("description", e.target.value)} className="input min-h-24" />
                </Field>
                <div className="grid gap-4">
                  <Field label="科目">
                    <input value={lecture.subject} onChange={(e) => updateMeta("subject", e.target.value)} className="input" />
                  </Field>
                  <Field label="単元">
                    <input value={lecture.unit} onChange={(e) => updateMeta("unit", e.target.value)} className="input" />
                  </Field>
                </div>
                <Field label="難易度">
                  <select value={lecture.difficulty} onChange={(e) => updateMeta("difficulty", e.target.value as LectureDifficulty)} className="input">
                    <option value="基礎">基礎</option>
                    <option value="標準">標準</option>
                    <option value="発展">発展</option>
                  </select>
                </Field>
                <Field label="推奨時間（分）">
                  <input
                    type="number"
                    value={lecture.recommendedMinutes}
                    onChange={(e) => updateMeta("recommendedMinutes", Number(e.target.value))}
                    className="input"
                  />
                </Field>
                <Field label="タグ（カンマ区切り）">
                  <input value={lecture.tags.join(", ")} onChange={(e) => updateMeta("tags", splitCsv(e.target.value))} className="input" />
                </Field>
                <Field label="公開日">
                  <input value={lecture.publishedAt} onChange={(e) => updateMeta("publishedAt", e.target.value)} className="input" />
                </Field>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-950">講義ブロック</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      よく使う部品を選んで追加します。問題解説セットは授業用の一式をまとめて挿入します。
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addProblemTemplate}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-700"
                  >
                    <Layers className="h-4 w-4" />
                    問題解説テンプレート
                  </button>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {BLOCK_TYPES.map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => {
                        setSelectedType(item.type);
                        addBlock(item.type);
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
                        selectedType === item.type
                          ? "border-blue-300 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {lecture.blocks.map((block, index) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === lecture.blocks.length - 1}
                    onChange={updateBlock}
                    onDelete={deleteBlock}
                    onMove={moveBlock}
                    onDuplicate={duplicateBlock}
                    collapsed={Boolean(collapsedBlocks[block.id])}
                    onToggleCollapsed={toggleCollapsed}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-950">JSONインポート / エクスポート</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={generateJson} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-200">
                  <FileDown className="h-4 w-4" />
                  JSONを生成
                </button>
                <button type="button" onClick={copyJson} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
                  <Copy className="h-4 w-4" />
                  JSONをコピー
                </button>
                <button type="button" onClick={importJson} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-200">
                  <FileUp className="h-4 w-4" />
                  JSONインポート
                </button>
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder={exportJson}
                className="mt-4 min-h-72 w-full rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 font-mono text-xs leading-5 text-slate-100 outline-none focus:border-blue-300"
              />
            </section>
          </div>

          {showPreview && (
            <aside className="xl:sticky xl:top-6 xl:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-slate-950">
                  <Clipboard className="h-4 w-4 text-blue-600" />
                  プレビュー
                </div>
                <div className="max-h-[calc(100vh-140px)] overflow-y-auto rounded-xl bg-slate-50 p-3 sm:p-4">
                  <LectureRenderer lecture={lecture} />
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function BlockEditor({
  block,
  index,
  isFirst,
  isLast,
  collapsed,
  onChange,
  onDelete,
  onMove,
  onDuplicate,
  onToggleCollapsed,
}: {
  block: LectureBlock;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  collapsed: boolean;
  onChange: (block: LectureBlock) => void;
  onDelete: (blockId: string) => void;
  onMove: (blockId: string, direction: -1 | 1) => void;
  onDuplicate: (block: LectureBlock) => void;
  onToggleCollapsed: (blockId: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onToggleCollapsed(block.id)}
          className="flex min-w-0 items-center gap-2 text-left text-sm font-extrabold text-slate-900"
        >
          {collapsed ? <ChevronRight className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          <span className="truncate">
            {index + 1}. {BLOCK_TYPES.find((item) => item.type === block.type)?.label ?? block.type}
          </span>
          <span className="hidden rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-400 ring-1 ring-slate-200 sm:inline">
            {block.type}
          </span>
        </button>
        <div className="flex gap-1.5">
          <IconButton label="上へ" disabled={isFirst} onClick={() => onMove(block.id, -1)} icon={<ArrowUp className="h-4 w-4" />} />
          <IconButton label="下へ" disabled={isLast} onClick={() => onMove(block.id, 1)} icon={<ArrowDown className="h-4 w-4" />} />
          <IconButton label="複製" onClick={() => onDuplicate(block)} icon={<Copy className="h-4 w-4" />} />
          <IconButton label="削除" onClick={() => onDelete(block.id)} icon={<Trash2 className="h-4 w-4" />} danger />
        </div>
      </div>
      {collapsed ? (
        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
          折りたたみ中
        </div>
      ) : (
        <BlockFields block={block} onChange={onChange} />
      )}
    </div>
  );
}

function BlockFields({ block, onChange }: { block: LectureBlock; onChange: (block: LectureBlock) => void }) {
  switch (block.type) {
    case "heading":
      return (
        <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
          <Field label="レベル">
            <select value={block.level} onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })} className="input">
              <option value={2}>大見出し</option>
              <option value={3}>小見出し</option>
            </select>
          </Field>
          <Field label="本文">
            <input value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} className="input" />
          </Field>
        </div>
      );
    case "paragraph":
      return (
        <Field label="本文">
          <textarea value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} className="input min-h-28" />
        </Field>
      );
    case "math":
      return (
        <div className="grid gap-3">
          <Field label="TeX">
            <textarea value={block.expression} onChange={(e) => onChange({ ...block, expression: e.target.value })} className="input min-h-24 font-mono" />
          </Field>
          <Field label="説明">
            <input value={block.caption ?? ""} onChange={(e) => onChange({ ...block, caption: e.target.value })} className="input" />
          </Field>
        </div>
      );
    case "image":
      return (
        <div className="grid gap-3">
          <Field label="画像URL">
            <input value={block.src} onChange={(e) => onChange({ ...block, src: e.target.value })} className="input" />
          </Field>
          <Field label="代替テキスト">
            <input value={block.alt} onChange={(e) => onChange({ ...block, alt: e.target.value })} className="input" />
          </Field>
          <Field label="キャプション">
            <input value={block.caption ?? ""} onChange={(e) => onChange({ ...block, caption: e.target.value })} className="input" />
          </Field>
        </div>
      );
    case "geometryLayers":
      return <GeometryLayersFields block={block} onChange={onChange} />;
    case "problem":
      return (
        <div className="grid gap-3">
          <Field label="タイトル">
            <input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
          </Field>
          <Field label="問題文">
            <textarea value={block.prompt} onChange={(e) => onChange({ ...block, prompt: e.target.value })} className="input min-h-28" />
          </Field>
          <Field label="選択肢（1行1つ）">
            <textarea value={(block.choices ?? []).join("\n")} onChange={(e) => onChange({ ...block, choices: splitLines(e.target.value) })} className="input min-h-24" />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="答え">
              <input value={block.answer ?? ""} onChange={(e) => onChange({ ...block, answer: e.target.value })} className="input" />
            </Field>
            <Field label="配点">
              <input type="number" value={block.points ?? 0} onChange={(e) => onChange({ ...block, points: Number(e.target.value) })} className="input" />
            </Field>
          </div>
          <Field label="ミス診断タグ">
            <div className="flex flex-wrap gap-2">
              {MISTAKE_DIAGNOSIS_TAGS.map((tag) => {
                const checked = (block.mistakeTags ?? []).includes(tag);
                return (
                  <label key={tag} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${checked ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-500"}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onChange({ ...block, mistakeTags: toggleTag(block.mistakeTags ?? [], tag) })}
                      className="sr-only"
                    />
                    {tag}
                  </label>
                );
              })}
            </div>
          </Field>
        </div>
      );
    case "explanationTabs":
      return (
        <div className="grid gap-3">
          {EXPLANATION_LABELS.map((label) => {
            const tab = block.tabs.find((item) => item.label === label) ?? { label, body: "" };
            return (
              <Field key={label} label={label}>
                <textarea
                  value={tab.body}
                  onChange={(e) =>
                    onChange({
                      ...block,
                      tabs: upsertByLabel(block.tabs, { label, body: e.target.value }),
                    })
                  }
                  className="input min-h-20"
                />
              </Field>
            );
          })}
        </div>
      );
    case "expertThinking":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {THINKING_LABELS.map((label) => {
            const item = block.items.find((entry) => entry.label === label) ?? { label, body: "" };
            return (
              <Field key={label} label={label}>
                <textarea
                  value={item.body}
                  onChange={(e) =>
                    onChange({
                      ...block,
                      items: upsertByLabel(block.items, { label, body: e.target.value }),
                    })
                  }
                  className="input min-h-24"
                />
              </Field>
            );
          })}
        </div>
      );
    case "checklist":
      return (
        <div className="grid gap-3">
          <Field label="タイトル">
            <input value={block.title ?? ""} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
          </Field>
          <Field label="項目（1行1つ）">
            <textarea value={block.items.join("\n")} onChange={(e) => onChange({ ...block, items: splitLines(e.target.value) })} className="input min-h-28" />
          </Field>
        </div>
      );
    case "relatedProblems":
      return (
        <div className="grid gap-3">
          <Field label="タイトル">
            <input value={block.title ?? ""} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
          </Field>
          <Field label="関連演習（タイトル | URL | メモ）">
            <textarea
              value={block.items.map((item) => [item.title, item.href ?? "", item.note ?? ""].join(" | ")).join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  items: splitLines(e.target.value).map((line) => {
                    const [title, href, note] = line.split("|").map((value) => value.trim());
                    return { title, href: href || undefined, note: note || undefined };
                  }),
                })
              }
              className="input min-h-28"
            />
          </Field>
        </div>
      );
    case "callout":
      return (
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="種類">
              <select value={block.tone} onChange={(e) => onChange({ ...block, tone: e.target.value as "info" | "warning" | "success" })} className="input">
                <option value="info">情報</option>
                <option value="warning">注意</option>
                <option value="success">成功</option>
              </select>
            </Field>
            <Field label="タイトル">
              <input value={block.title ?? ""} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
            </Field>
          </div>
          <Field label="本文">
            <textarea value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} className="input min-h-24" />
          </Field>
        </div>
      );
    case "solutionFlow":
      return (
        <div className="grid gap-3">
          <Field label="タイトル">
            <input value={block.title ?? ""} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
          </Field>
          <Field label="説明">
            <input value={block.intro ?? ""} onChange={(e) => onChange({ ...block, intro: e.target.value })} className="input" />
          </Field>
          <Field label="ステップ（1行1つ：条件 | 道具 | 理由）">
            <textarea
              value={block.steps.map((s) => [s.condition, s.tool, s.reason ?? ""].join(" | ")).join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  steps: splitLines(e.target.value).map((line) => {
                    const [condition, tool, reason] = line.split("|").map((v) => v.trim());
                    return { condition: condition ?? "", tool: tool ?? "", reason: reason || undefined };
                  }),
                })
              }
              className="input min-h-32 font-mono"
            />
          </Field>
        </div>
      );
    case "discriminationDrill":
      return (
        <div className="grid gap-3">
          <Field label="タイトル">
            <input value={block.title ?? ""} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
          </Field>
          <Field label="説明">
            <input value={block.intro ?? ""} onChange={(e) => onChange({ ...block, intro: e.target.value })} className="input" />
          </Field>
          <Field label="設問（1行1つ：条件 | 求めたいもの | 選択肢;区切り | 正解 | 理由）">
            <textarea
              value={block.items
                .map((it) => [it.condition, it.goal ?? "", it.choices.join(";"), it.answer, it.reason].join(" | "))
                .join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  items: splitLines(e.target.value).map((line) => {
                    const [condition, goal, choices, answer, reason] = line.split("|").map((v) => v.trim());
                    return {
                      condition: condition ?? "",
                      goal: goal || undefined,
                      choices: (choices ?? "").split(";").map((c) => c.trim()).filter(Boolean),
                      answer: answer ?? "",
                      reason: reason ?? "",
                    };
                  }),
                })
              }
              className="input min-h-32 font-mono"
            />
          </Field>
        </div>
      );
    case "mistakeRecovery":
      return (
        <div className="grid gap-3">
          <Field label="タイトル">
            <input value={block.title ?? ""} onChange={(e) => onChange({ ...block, title: e.target.value })} className="input" />
          </Field>
          <Field label="説明">
            <input value={block.intro ?? ""} onChange={(e) => onChange({ ...block, intro: e.target.value })} className="input" />
          </Field>
          <Field label="項目（1行1つ：間違えた理由 | 戻る場所 | リンク）">
            <textarea
              value={block.items.map((it) => [it.symptom, it.action, it.href ?? ""].join(" | ")).join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  items: splitLines(e.target.value).map((line) => {
                    const [symptom, action, href] = line.split("|").map((v) => v.trim());
                    return { symptom: symptom ?? "", action: action ?? "", href: href || undefined };
                  }),
                })
              }
              className="input min-h-32 font-mono"
            />
          </Field>
        </div>
      );
  }
}

function GeometryLayersFields({
  block,
  onChange,
}: {
  block: Extract<LectureBlock, { type: "geometryLayers" }>;
  onChange: (block: LectureBlock) => void;
}) {
  const [triangleInput, setTriangleInput] = useState<TriangleGeometrySvgInput>(() =>
    createTriangleInputFromGeometryBlock(block),
  );
  const generatedBlock = useMemo(
    () => createTriangleGeometryLayerBlock(triangleInput, block.id),
    [triangleInput, block.id],
  );

  function updateTriangleInput<K extends keyof TriangleGeometrySvgInput>(
    key: K,
    value: TriangleGeometrySvgInput[K],
  ) {
    setTriangleInput((current) => ({ ...current, [key]: value }));
  }

  function updatePointLabel(
    key: keyof TriangleGeometrySvgInput["pointLabels"],
    value: string,
  ) {
    setTriangleInput((current) => ({
      ...current,
      pointLabels: { ...current.pointLabels, [key]: value },
    }));
  }

  function updateSideLabel(
    key: keyof TriangleGeometrySvgInput["sideLabels"],
    value: string,
  ) {
    setTriangleInput((current) => ({
      ...current,
      sideLabels: { ...current.sideLabels, [key]: value },
    }));
  }

  function updateAngleLabel(
    key: keyof TriangleGeometrySvgInput["angleLabels"],
    value: string,
  ) {
    setTriangleInput((current) => ({
      ...current,
      angleLabels: { ...current.angleLabels, [key]: value },
    }));
  }

  function applyGeneratedBlock() {
    onChange({
      ...generatedBlock,
      id: block.id,
    });
  }

  function applyGeneratedBaseImage() {
    onChange({
      ...block,
      title: generatedBlock.title,
      description: generatedBlock.description,
      baseImage: generatedBlock.baseImage,
    });
  }

  function applyGeneratedLayers() {
    onChange({
      ...block,
      layers: generatedBlock.layers,
    });
  }

  function updateLayer(layerId: string, nextLayer: GeometryLayer) {
    onChange({
      ...block,
      layers: block.layers.map((layer) => (layer.id === layerId ? nextLayer : layer)),
    });
  }

  function addLayer() {
    const nextLayer: GeometryLayer = {
      id: blockId("geometry-layer"),
      label: "新しいレイヤー",
      image: {
        src: block.baseImage.src,
        alt: block.baseImage.alt || "図形レイヤー",
      },
      explanation: "",
    };
    onChange({ ...block, layers: [...block.layers, nextLayer] });
  }

  function duplicateLayer(layer: GeometryLayer) {
    const clonedLayer: GeometryLayer = {
      ...structuredCloneLayer(layer),
      id: blockId("geometry-layer"),
      label: `${layer.label} コピー`,
    };
    const index = block.layers.findIndex((item) => item.id === layer.id);
    const layers = [...block.layers];
    layers.splice(index + 1, 0, clonedLayer);
    onChange({ ...block, layers });
  }

  function deleteLayer(layerId: string) {
    onChange({ ...block, layers: block.layers.filter((layer) => layer.id !== layerId) });
  }

  function moveLayer(layerId: string, direction: -1 | 1) {
    const index = block.layers.findIndex((layer) => layer.id === layerId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= block.layers.length) return;
    const layers = [...block.layers];
    const [target] = layers.splice(index, 1);
    layers.splice(nextIndex, 0, target);
    onChange({ ...block, layers });
  }

  return (
    <div className="grid gap-4">
      <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700">
              <Wand2 className="h-4 w-4" />
              三角形SVG生成補助
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              点名・辺・角・公式メモを入れると、geometryLayers用のSVG data URIをまとめて生成します。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={applyGeneratedBlock}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              <Wand2 className="h-3.5 w-3.5" />
              三角形SVGを生成
            </button>
            <button
              type="button"
              onClick={applyGeneratedBaseImage}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50"
            >
              基本図だけ反映
            </button>
            <button
              type="button"
              onClick={applyGeneratedLayers}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50"
            >
              レイヤーだけ反映
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="図形タイトル">
                <input
                  value={triangleInput.title}
                  onChange={(e) => updateTriangleInput("title", e.target.value)}
                  className="input bg-white"
                />
              </Field>
              <Field label="補助線プリセット">
                <select
                  value={triangleInput.auxiliaryLine}
                  onChange={(e) =>
                    updateTriangleInput("auxiliaryLine", e.target.value as TriangleAuxiliaryLinePreset)
                  }
                  className="input bg-white"
                >
                  <option value="altitude-from-a">AからBCへ</option>
                  <option value="altitude-from-b">BからACへ</option>
                  <option value="median-from-a">AからBCの中点へ</option>
                  <option value="none">補助線なし</option>
                </select>
              </Field>
            </div>

            <Field label="説明文">
              <textarea
                value={triangleInput.description}
                onChange={(e) => updateTriangleInput("description", e.target.value)}
                className="input min-h-20 bg-white"
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="点A">
                <input value={triangleInput.pointLabels.a} onChange={(e) => updatePointLabel("a", e.target.value)} className="input bg-white" />
              </Field>
              <Field label="点B">
                <input value={triangleInput.pointLabels.b} onChange={(e) => updatePointLabel("b", e.target.value)} className="input bg-white" />
              </Field>
              <Field label="点C">
                <input value={triangleInput.pointLabels.c} onChange={(e) => updatePointLabel("c", e.target.value)} className="input bg-white" />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="辺AB">
                <input value={triangleInput.sideLabels.ab} onChange={(e) => updateSideLabel("ab", e.target.value)} className="input bg-white" />
              </Field>
              <Field label="辺BC">
                <input value={triangleInput.sideLabels.bc} onChange={(e) => updateSideLabel("bc", e.target.value)} className="input bg-white" />
              </Field>
              <Field label="辺CA">
                <input value={triangleInput.sideLabels.ca} onChange={(e) => updateSideLabel("ca", e.target.value)} className="input bg-white" />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="角A">
                <input value={triangleInput.angleLabels.a} onChange={(e) => updateAngleLabel("a", e.target.value)} className="input bg-white" />
              </Field>
              <Field label="角B">
                <input value={triangleInput.angleLabels.b} onChange={(e) => updateAngleLabel("b", e.target.value)} className="input bg-white" />
              </Field>
              <Field label="角C">
                <input value={triangleInput.angleLabels.c} onChange={(e) => updateAngleLabel("c", e.target.value)} className="input bg-white" />
              </Field>
            </div>

            <details className="rounded-xl border border-blue-100 bg-white p-3">
              <summary className="cursor-pointer text-xs font-extrabold text-slate-700">
                詳細メモを編集
              </summary>
              <div className="mt-3 grid gap-3">
                <Field label="等しい角の説明">
                  <input
                    value={triangleInput.equalAngleLabel}
                    onChange={(e) => updateTriangleInput("equalAngleLabel", e.target.value)}
                    className="input"
                  />
                </Field>
                <Field label="使う公式（1行1つ）">
                  <textarea
                    value={triangleInput.formulaNotes.join("\n")}
                    onChange={(e) => updateTriangleInput("formulaNotes", splitLines(e.target.value))}
                    className="input min-h-24"
                  />
                </Field>
                <Field label="解法ルート（1行1つ）">
                  <textarea
                    value={triangleInput.routeSteps.join("\n")}
                    onChange={(e) => updateTriangleInput("routeSteps", splitLines(e.target.value))}
                    className="input min-h-24"
                  />
                </Field>
              </div>
            </details>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="mb-2 text-xs font-extrabold text-slate-600">生成プレビュー</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={generatedBlock.layers[0]?.image.src ?? generatedBlock.baseImage.src}
              alt="生成した三角形SVGプレビュー"
              className="h-auto w-full rounded-lg border border-slate-100 bg-white object-contain"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {generatedBlock.layers.map((layer) => (
                <span key={layer.id} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                  {layer.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="タイトル">
          <input
            value={block.title ?? ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="説明">
          <input
            value={block.description ?? ""}
            onChange={(e) => onChange({ ...block, description: e.target.value })}
            className="input"
          />
        </Field>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-xs font-extrabold text-slate-600">基本図</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="baseImage src">
            <input
              value={block.baseImage.src}
              onChange={(e) =>
                onChange({
                  ...block,
                  baseImage: { ...block.baseImage, src: e.target.value },
                })
              }
              className="input"
            />
          </Field>
          <Field label="baseImage alt">
            <input
              value={block.baseImage.alt}
              onChange={(e) =>
                onChange({
                  ...block,
                  baseImage: { ...block.baseImage, alt: e.target.value },
                })
              }
              className="input"
            />
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs font-extrabold text-slate-600">レイヤー</div>
          <button
            type="button"
            onClick={addLayer}
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            レイヤー追加
          </button>
        </div>

        <div className="space-y-3">
          {block.layers.map((layer, index) => (
            <div key={layer.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-extrabold text-slate-700">
                  {index + 1}. {layer.label || "無題のレイヤー"}
                </div>
                <div className="flex gap-1.5">
                  <IconButton label="レイヤーを上へ" disabled={index === 0} onClick={() => moveLayer(layer.id, -1)} icon={<ArrowUp className="h-4 w-4" />} />
                  <IconButton label="レイヤーを下へ" disabled={index === block.layers.length - 1} onClick={() => moveLayer(layer.id, 1)} icon={<ArrowDown className="h-4 w-4" />} />
                  <IconButton label="レイヤー複製" onClick={() => duplicateLayer(layer)} icon={<Copy className="h-4 w-4" />} />
                  <IconButton label="レイヤー削除" onClick={() => deleteLayer(layer.id)} icon={<Trash2 className="h-4 w-4" />} danger />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="label">
                  <input
                    value={layer.label}
                    onChange={(e) => updateLayer(layer.id, { ...layer, label: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="image alt">
                  <input
                    value={layer.image.alt}
                    onChange={(e) =>
                      updateLayer(layer.id, {
                        ...layer,
                        image: { ...layer.image, alt: e.target.value },
                      })
                    }
                    className="input"
                  />
                </Field>
              </div>
              <div className="mt-3 grid gap-3">
                <Field label="image src">
                  <input
                    value={layer.image.src}
                    onChange={(e) =>
                      updateLayer(layer.id, {
                        ...layer,
                        image: { ...layer.image, src: e.target.value },
                      })
                    }
                    className="input"
                  />
                </Field>
                <Field label="explanation">
                  <textarea
                    value={layer.explanation ?? ""}
                    onChange={(e) => updateLayer(layer.id, { ...layer, explanation: e.target.value })}
                    className="input min-h-20"
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminLectureList() {
  const [drafts, setDrafts] = useState<Lecture[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrafts(loadDraftLectures());
  }, []);

  function remove(id: string) {
    deleteDraftLecture(id);
    setDrafts(loadDraftLectures());
  }

  const allLectures = [
    ...drafts.map((lecture) => ({ lecture, source: "下書き" as const })),
    ...SPECIAL_LECTURES.map((lecture) => ({ lecture, source: "公開データ" as const })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/common-test" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" />
          共通テスト数学へ戻る
        </Link>

        <header className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold text-blue-700">管理者向け</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              特別講義管理
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              作成した講義はブラウザのlocalStorageに保存し、JSONとしてエクスポートできます（DB・認証は未接続）。
            </p>
          </div>
          <Link href="/admin/lectures/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            新しい講義を作る
          </Link>
        </header>

        <section className="mt-8 grid gap-4">
          {allLectures.map(({ lecture, source }) => (
            <article key={`${source}-${lecture.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                      {source}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {lecture.subject} / {lecture.unit}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-950">{lecture.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{lecture.description}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link href={`/admin/lectures/${lecture.id}/edit`} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-200">
                    編集
                  </Link>
                  <Link href={`/common-test/lectures/${lecture.slug}`} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-200">
                    公開表示
                  </Link>
                  {source === "下書き" && (
                    <button type="button" onClick={() => remove(lecture.id)} className="rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50">
                      削除
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export function loadDraftLectures(): Lecture[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Lecture[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLectureDraft(lecture: Lecture) {
  const drafts = loadDraftLectures();
  const next = [lecture, ...drafts.filter((item) => item.id !== lecture.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function deleteDraftLecture(id: string) {
  const drafts = loadDraftLectures().filter((lecture) => lecture.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function IconButton({
  label,
  icon,
  onClick,
  disabled,
  danger,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-40 ${
        danger
          ? "border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
      }`}
    >
      {icon}
    </button>
  );
}

function createEmptyLecture(useUniqueIds = true): Lecture {
  const id = useUniqueIds ? `lecture-${Date.now()}` : "lecture-draft";
  const idFor = (type: string, index: number) =>
    useUniqueIds ? blockId(type) : `${type}-draft-${index}`;
  return {
    id,
    slug: "new-special-lecture",
    title: "新しい特別講義",
    description: "講義の説明を入力してください。",
    subject: "数学IA",
    unit: "図形と計量",
    difficulty: "標準",
    recommendedMinutes: 30,
    tags: ["共通テスト", "数学IA"],
    publishedAt: useUniqueIds ? new Date().toISOString().slice(0, 10) : "2026-01-01",
    blocks: [
      { id: idFor("heading", 1), type: "heading", level: 2, text: "講義の見出し" },
      { id: idFor("paragraph", 2), type: "paragraph", text: "ここに講義本文を入力します。" },
      {
        id: idFor("expertThinking", 3),
        type: "expertThinking",
        items: THINKING_LABELS.map((label) => ({ label, body: `${label}を入力してください。` })),
      },
      {
        id: idFor("explanationTabs", 4),
        type: "explanationTabs",
        tabs: EXPLANATION_LABELS.map((label) => ({ label, body: `${label}を入力してください。` })),
      },
    ],
  };
}

function createBlock(type: LectureBlock["type"]): LectureBlock {
  const id = blockId(type);
  switch (type) {
    case "heading":
      return { id, type, level: 2, text: "新しい見出し" };
    case "paragraph":
      return { id, type, text: "本文を入力してください。" };
    case "math":
      return { id, type, expression: "a^2+b^2=c^2", caption: "数式の説明" };
    case "image":
      return { id, type, src: "/window.svg", alt: "講義画像", caption: "画像の説明" };
    case "geometryLayers":
      return createTriangleGeometryLayerBlock(DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT, id);
    case "problem":
      return {
        id,
        type,
        title: "オリジナル問題",
        prompt: "問題文を入力してください。",
        choices: ["選択肢1", "選択肢2"],
        answer: "答え",
        points: 5,
        mistakeTags: ["公式選択ミス"],
      };
    case "explanationTabs":
      return { id, type, tabs: EXPLANATION_LABELS.map((label) => ({ label, body: `${label}を入力してください。` })) };
    case "expertThinking":
      return { id, type, items: THINKING_LABELS.map((label) => ({ label, body: `${label}を入力してください。` })) };
    case "checklist":
      return { id, type, title: "確認ポイント", items: ["確認すること"] };
    case "relatedProblems":
      return { id, type, title: "関連演習", items: [{ title: "数学IA 第1問", href: "/common-test/math-1a/section-1", note: "講義後に解く" }] };
    case "callout":
      return { id, type, tone: "info", title: "ポイント", text: "補足説明を入力してください。" };
    case "solutionFlow":
      return {
        id,
        type,
        title: "解法判別フロー",
        intro: "何が見えたら、どの道具を選ぶかを確認します。",
        steps: [
          { condition: "2辺とその間の角がある", tool: "余弦定理", reason: "挟角を含む2辺から第三辺が出る" },
          { condition: "辺と向かいの角のセットがある", tool: "正弦定理", reason: "向かい合う辺と角をつなげる" },
        ],
      };
    case "discriminationDrill":
      return {
        id,
        type,
        title: "判別ドリル：初手は何を使う？",
        intro: "計算はしません。条件を見て最初に使う道具を選びます。",
        items: [
          {
            condition: "2辺とその間の角が分かっている。残りの辺を求めたい。",
            goal: "残りの辺",
            choices: ["余弦定理", "正弦定理", "面積公式"],
            answer: "余弦定理",
            reason: "挟角を含む2辺から第三辺は余弦定理で出る。",
          },
        ],
      };
    case "mistakeRecovery":
      return {
        id,
        type,
        title: "ミス別補講：間違えた理由から戻る",
        items: [
          { symptom: "公式選択を間違えた", action: "解法判別フローをもう一度見る", href: "" },
        ],
      };
  }
}

function createProblemExplanationTemplate(): LectureBlock[] {
  return [
    createBlock("problem"),
    createBlock("expertThinking"),
    createBlock("explanationTabs"),
    {
      id: blockId("checklist"),
      type: "checklist",
      title: "解いた後の確認",
      items: [
        "最初に見る条件を間違えていない",
        "使う公式を1つに絞れた",
        "本番で撤退するラインを決められた",
      ],
    },
    createBlock("relatedProblems"),
  ];
}

function cloneBlock(block: LectureBlock): LectureBlock {
  const cloned = structuredCloneBlock(block);
  return { ...cloned, id: blockId(block.type) } as LectureBlock;
}

function structuredCloneBlock(block: LectureBlock): LectureBlock {
  return JSON.parse(JSON.stringify(block)) as LectureBlock;
}

function structuredCloneLayer(layer: GeometryLayer): GeometryLayer {
  return JSON.parse(JSON.stringify(layer)) as GeometryLayer;
}

function createTriangleInputFromGeometryBlock(
  block: Extract<LectureBlock, { type: "geometryLayers" }>,
): TriangleGeometrySvgInput {
  return {
    ...DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
    title: block.title ?? DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT.title,
    description: block.description ?? DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT.description,
  };
}

function blockId(type: string): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function splitCsv(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toggleTag(tags: MistakeDiagnosisTag[], tag: MistakeDiagnosisTag): MistakeDiagnosisTag[] {
  return tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag];
}

function upsertByLabel<T extends { label: string }>(items: T[], next: T): T[] {
  const exists = items.some((item) => item.label === next.label);
  return exists ? items.map((item) => (item.label === next.label ? next : item)) : [...items, next];
}

export { AdminLectureList };
