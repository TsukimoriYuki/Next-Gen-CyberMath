"use client";

import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";

export function MockTimer({
  seconds,
  onExpire,
  running,
}: {
  seconds: number;
  onExpire: () => void;
  running: boolean;
}) {
  const [remaining, setRemaining] = useState(seconds);
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const id = setInterval(() => {
      const left = Math.max(0, seconds - Math.floor((Date.now() - start) / 1000));
      setRemaining(left);
      if (left <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        clearInterval(id);
        onExpire();
      }
    }, 250);
    return () => clearInterval(id);
  }, [running, seconds, onExpire]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const danger = remaining <= 30;
  const color = danger ? "var(--neon-magenta)" : "var(--neon-cyan)";

  return (
    <div
      className="no-print flex items-center gap-2 rounded-xl border px-4 py-2 font-mono tabular-nums"
      style={{
        color,
        borderColor: `color-mix(in oklch, ${color} 45%, transparent)`,
        background: `color-mix(in oklch, ${color} 8%, transparent)`,
        boxShadow: `0 0 22px color-mix(in oklch, ${color} ${danger ? 40 : 22}%, transparent)`,
      }}
    >
      <Timer className={`h-4 w-4 ${danger ? "animate-pulse" : ""}`} />
      <span className="text-xl font-bold">
        {mm}:{ss}
      </span>
    </div>
  );
}
