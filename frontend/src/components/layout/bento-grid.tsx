import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { slideUp, staggerContainer } from "@/components/animations/variants";

export const BentoGrid = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={cn(
          "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
BentoGrid.displayName = "BentoGrid";

export const BentoGridItem = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & {
  colSpan?: number | Partial<Record<"sm" | "md" | "lg" | "xl", number>>;
}>(
  ({ className, children, colSpan = 1, ...props }, ref) => {
    // Generate col-span classes based on the colSpan prop
    const generateColClasses = () => {
      if (typeof colSpan === 'number') {
        return `lg:col-span-${colSpan} md:col-span-${Math.max(1, Math.floor(colSpan/2))} col-span-1`;
      }
      
      const classes = [];
      if (colSpan.sm) classes.push(`col-span-${colSpan.sm}`);
      else classes.push(`col-span-1`); // default mobile
      
      if (colSpan.md) classes.push(`md:col-span-${colSpan.md}`);
      if (colSpan.lg) classes.push(`lg:col-span-${colSpan.lg}`);
      if (colSpan.xl) classes.push(`xl:col-span-${colSpan.xl}`);
      
      return classes.join(' ');
    };

    return (
      <motion.div
        ref={ref}
        variants={slideUp}
        className={cn(
          "rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] p-6 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden flex flex-col",
          generateColClasses(),
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
BentoGridItem.displayName = "BentoGridItem";
