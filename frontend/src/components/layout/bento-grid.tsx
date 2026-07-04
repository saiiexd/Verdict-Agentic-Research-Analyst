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
    const smMap: Record<number, string> = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5", 6: "col-span-6", 7: "col-span-7", 8: "col-span-8", 9: "col-span-9", 10: "col-span-10", 11: "col-span-11", 12: "col-span-12" };
    const mdMap: Record<number, string> = { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4", 5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 8: "md:col-span-8", 9: "md:col-span-9", 10: "md:col-span-10", 11: "md:col-span-11", 12: "md:col-span-12" };
    const lgMap: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6", 7: "lg:col-span-7", 8: "lg:col-span-8", 9: "lg:col-span-9", 10: "lg:col-span-10", 11: "lg:col-span-11", 12: "lg:col-span-12" };
    const xlMap: Record<number, string> = { 1: "xl:col-span-1", 2: "xl:col-span-2", 3: "xl:col-span-3", 4: "xl:col-span-4", 5: "xl:col-span-5", 6: "xl:col-span-6", 7: "xl:col-span-7", 8: "xl:col-span-8", 9: "xl:col-span-9", 10: "xl:col-span-10", 11: "xl:col-span-11", 12: "xl:col-span-12" };

    const generateColClasses = () => {
      if (typeof colSpan === 'number') {
        const smVal = smMap[1] || "col-span-1";
        const mdVal = mdMap[Math.max(1, Math.floor(colSpan/2))] || "md:col-span-1";
        const lgVal = lgMap[colSpan] || "lg:col-span-1";
        return `${lgVal} ${mdVal} ${smVal}`;
      }
      
      const classes = [];
      if (colSpan.sm && smMap[colSpan.sm]) classes.push(smMap[colSpan.sm]);
      else classes.push("col-span-1"); // default mobile
      
      if (colSpan.md && mdMap[colSpan.md]) classes.push(mdMap[colSpan.md]);
      if (colSpan.lg && lgMap[colSpan.lg]) classes.push(lgMap[colSpan.lg]);
      if (colSpan.xl && xlMap[colSpan.xl]) classes.push(xlMap[colSpan.xl]);
      
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
