import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  span?: "1" | "2" | "3" | "4" | "full";
  rowSpan?: "1" | "2";
}

export function BentoCard({
  children,
  className,
  glass = false,
  hover = true,
  span,
  rowSpan,
}: BentoCardProps) {
  const colSpanMap = {
    "1": "col-span-1",
    "2": "col-span-2",
    "3": "col-span-3",
    "4": "col-span-4",
    "full": "col-span-full",
  };
  const rowSpanMap = {
    "1": "row-span-1",
    "2": "row-span-2",
  };

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        span && colSpanMap[span],
        rowSpan && rowSpanMap[rowSpan],
        glass
          ? "glass"
          : "bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))]",
        hover && [
          "transition-all duration-300 ease-out",
          "hover:shadow-md hover:-translate-y-0.5",
          "hover:border-[rgb(var(--border-strong))]",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 12 | 6 | 4 | 3;
}

export function BentoGrid({ children, className, cols = 12 }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 12 && "grid-cols-12",
        cols === 6 && "grid-cols-6",
        cols === 4 && "grid-cols-4",
        cols === 3 && "grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
