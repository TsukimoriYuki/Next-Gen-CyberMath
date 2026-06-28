"use client";

import {
  createGeometryDiagramDataUri,
  GEOMETRY_DIAGRAM_META,
  type GeometryDiagramType,
} from "@/lib/geometry-diagrams";
import { cn } from "@/lib/utils";

export function GeometryDiagram({
  type,
  caption,
  className,
}: {
  type: GeometryDiagramType;
  caption?: string;
  className?: string;
}) {
  const meta = GEOMETRY_DIAGRAM_META[type];
  const point = caption?.trim() || `この図で見るポイント: ${meta.point}`;

  return (
    <figure
      className={cn(
        "my-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="bg-slate-50/70 p-2 sm:p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={createGeometryDiagramDataUri(type)}
          alt={meta.alt}
          className="mx-auto block h-auto w-full max-w-[640px]"
        />
      </div>
      <figcaption className="border-t border-slate-100 px-4 py-3">
        <div className="text-xs font-extrabold text-slate-700">{meta.title}</div>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {point}
        </p>
      </figcaption>
    </figure>
  );
}
