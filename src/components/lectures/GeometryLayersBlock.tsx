"use client";

import { useState } from "react";
import { CheckCircle2, Layers } from "lucide-react";
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
          {viewedAllLayers && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              全レイヤー確認済み
            </span>
          )}
        </div>
        {block.description && (
          <MathText className="mt-2 text-sm leading-6 text-slate-600">
            {block.description}
          </MathText>
        )}
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
          {block.layers.map((layer) => {
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
                {viewed && !active && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                {layer.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-white p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayedImage.src}
              alt={displayedImage.alt}
              className="mx-auto h-auto max-h-[520px] w-full max-w-full object-contain"
            />
          </div>
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
            <div className="text-xs font-extrabold text-slate-500">
              {activeLayer?.label ?? "基本図"}
            </div>
            {activeLayer?.explanation ? (
              <MathText className="mt-1 text-sm leading-6 text-slate-700">
                {activeLayer.explanation}
              </MathText>
            ) : (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                レイヤーを選ぶと、見るべき条件や解法の順番を段階的に確認できます。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
