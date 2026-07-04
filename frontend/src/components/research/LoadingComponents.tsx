"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Clock, Cpu, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── 1. Reusable Shimmer Skeleton ───────────────────────────
export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div 
      className={cn("bg-[rgb(var(--bg-subtle))] animate-pulse rounded-md", className)} 
      role="progressbar" 
      aria-label="Loading content placeholder"
    />
  );
}

// ─── 2. Local Execution Timer ────────────────────────────────
export function ExecutionTimer({ isActive, startTime }: { isActive: boolean; startTime?: number }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setSeconds(0);
      return;
    }

    const start = startTime || Date.now();
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex items-center gap-1.5 font-mono text-caption text-[rgb(var(--text-tertiary))] select-none">
      <Clock className="h-3.5 w-3.5" />
      <span>Elapsed: {formatTime(seconds)}</span>
    </div>
  );
}

// ─── 3. Horizontal Progress Indicator Bar ────────────────────
export function ProgressIndicator({ value }: { value: number }) {
  return (
    <div 
      className="w-full h-1 bg-[rgb(var(--bg-subtle))] rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full bg-[rgb(var(--accent-primary))] transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ─── 4. Timeline Event Node ──────────────────────────────────
export interface TimelineEventProps {
  label: string;
  timestamp?: string;
  status: "waiting" | "running" | "completed" | "failed";
}

export function TimelineEvent({ label, timestamp, status }: TimelineEventProps) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <div className="flex items-center gap-2">
        {status === "completed" && (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
        )}
        {status === "running" && (
          <Cpu className="h-3.5 w-3.5 text-[rgb(var(--accent-primary))] animate-spin flex-shrink-0" />
        )}
        {status === "waiting" && (
          <Circle className="h-3.5 w-3.5 text-[rgb(var(--text-tertiary))] flex-shrink-0" />
        )}
        {status === "failed" && (
          <Circle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 fill-red-500/20" />
        )}
        <span className={cn(
          "font-medium",
          status === "running" ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-secondary))]"
        )}>
          {label}
        </span>
      </div>
      {timestamp && (
        <span className="font-mono text-[rgb(var(--text-tertiary))]">{timestamp}</span>
      )}
    </div>
  );
}

// ─── 5. Contextual Status Message panel ──────────────────────
export function StatusMessage({ message, activeAgent }: { message: string; activeAgent?: string }) {
  return (
    <div className="flex flex-col gap-1 text-left" aria-live="polite">
      <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">
        {activeAgent || "Orchestration Pipeline"}
      </span>
      <p className="text-small text-[rgb(var(--text-secondary))] leading-tight font-medium">
        {message}
      </p>
    </div>
  );
}
