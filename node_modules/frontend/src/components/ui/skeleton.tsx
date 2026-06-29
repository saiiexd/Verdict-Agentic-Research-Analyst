import { cn } from "@/lib/utils";

// ─── Shimmer Skeleton ────────────────────────────────────
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        "bg-[rgb(var(--bg-subtle))]",
        "before:absolute before:inset-0",
        "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]",
        "before:bg-[length:200%_100%]",
        "before:animate-shimmer",
        className
      )}
    />
  );
}

// ─── Metric Card Skeleton ────────────────────────────────
export function MetricCardSkeleton() {
  return (
    <div className="rounded-xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

// ─── Report Section Skeleton ─────────────────────────────
export function ReportSectionSkeleton() {
  return (
    <div className="space-y-3 p-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-full" />
    </div>
  );
}

// ─── News Card Skeleton ──────────────────────────────────
export function NewsCardSkeleton() {
  return (
    <div className="p-4 space-y-2 border-b border-[rgb(var(--border-default))] last:border-0">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-2.5 w-20" />
      </div>
    </div>
  );
}
