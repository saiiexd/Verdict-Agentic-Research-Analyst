import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-primary))] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[rgb(var(--accent-primary))] text-white hover:bg-[rgb(var(--accent-primary-hover))]",
        secondary:
          "border-transparent bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-subtle))]",
        destructive:
          "border-transparent bg-[rgb(var(--color-danger))] text-white hover:bg-[rgb(var(--color-danger))]/80",
        outline: "text-[rgb(var(--text-primary))] border-[rgb(var(--border-strong))]",
        success: "border-transparent bg-[rgb(var(--color-success))]/15 text-[rgb(var(--color-success))] hover:bg-[rgb(var(--color-success))]/25",
        warning: "border-transparent bg-[rgb(var(--color-warning))]/15 text-[rgb(var(--color-warning))] hover:bg-[rgb(var(--color-warning))]/25",
        glass: "border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))]/50 backdrop-blur-md text-[rgb(var(--text-primary))] shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
