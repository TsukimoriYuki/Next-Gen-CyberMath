"use client";

import { useState } from "react";
import { CheckCircle2, Eye, Layers, MousePointerClick } from "lucide-react";
import type { GeometryLayer, GeometryLayerBlock as GeometryLayerBlockData } from "@/data/specialLectures";
import { MathText } from "@/components/math/Math";

interface GeometryLayersBlockProps {
  block: GeometryLayerBlockData;
  onComplete?: () => void;
}

export function GeometryLayersBlock({ block, onComplete }: GeometryLayersBlockProps) {
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [viewedLayerIds, setViewedLayerIds] = useState<Set<string>>(() => new Set());

  const activeLayer = block.layers.find((layer) => layer.id === activeLayerId) ?? null;
  const displayedImage = activeLayer?.image ?? block.baseImage;
  const viewedAllLayers = block.layers.length > 0 && viewedLayerIds.size >= block.layers.length;
  const viewedCount = viewedLayerIds.size;

  function selectLayer(layer: GeometryLayer) {
    setActiveLayerId(layer.id);
    if (viewedLayerIds.has(layer.id)) return;

    const nextViewedLayerIds = new Set(viewedLayerIds);
    nextViewedLayerIds.add(layer.id);
    setViewedLayerIds(nextViewedLayerIds);

    if (nextViewedLayerIds.size >= block.layers.length && block.layers.length > 0) {
      onComplete?.();
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700">
              <Layers className="h-4 w-4" />
              図形レイヤー
            </div>
            {block.title && (
              <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">
                {block.title}
              </h2>
            )}
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${
              viewedAllLayers
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {viewedAllLayers ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                全レイヤー確認済み
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                {viewedCount}/{block.layers.length} レイヤー
              </>
            )}
          </span>
        </div>
        {block.description && (
          <MathText className="mt-2 text-sm leading-6 text-slate-600">
            {block.description}
          </MathText>
        )}
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[11px] font-bold text-blue-700">
          <MousePointerClick className="h-3.5 w-3.5" />
          番号順に押して、図の見方を一段ずつ確認しましょう
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveLayerId(null)}
            className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
              activeLayerId === null
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            基本図
          </button>
          {block.layers.map((layer, index) => {
            const active = activeLayerId === layer.id;
            const viewed = viewedLayerIds.has(layer.id);
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => selectLayer(layer)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-white hover:text-blue-700"
                }`}
              >
                <span
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-mono font-extrabold ${
                    active ? "bg-white/25 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
                  }`}
                >
                  {viewed && !active ? "✓" : index + 1}
                </span>
                {layer.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-gradient-to-b from-white to-slate-50 p-3 sm:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayedImage.src}
              alt={displayedImage.alt}
              className="mx-auto block h-auto w-full max-w-[520px] object-contain"
            />
          </div>
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-slate-400">
              このレイヤーで見ること
            </div>
            <div className="mt-1 text-sm font-extrabold text-slate-800">
              {activeLayer?.label ?? "基本図"}
            </div>
            {activeLayer?.explanation ? (
              <MathText className="mt-1 text-sm leading-6 text-slate-700">
                {activeLayer.explanation}
              </MathText>
            ) : (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                まず基本図で点の名前を確認し、上のボタンを順に押して条件・角・補助線・公式・解法ルートを重ねていきましょう。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
