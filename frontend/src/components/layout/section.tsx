import * as React from "react";
import { cn } from "@/lib/utils";

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-[var(--spacing-section)] px-6", className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl w-full">
          {children}
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";

export const SectionHeader = ({
  title,
  subtitle,
  align = "left",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        {
          "text-left": align === "left",
          "text-center items-center": align === "center",
          "text-right items-end": align === "right",
        },
        className
      )}
    >
      <h2 className="text-headline text-[rgb(var(--text-primary))]">{title}</h2>
      {subtitle && (
        <p className="text-body text-[rgb(var(--text-secondary))] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
