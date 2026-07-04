import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  intensity?: "light" | "medium" | "heavy";
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = "medium", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-panel rounded-xl shadow-md",
          {
            "bg-[rgb(var(--bg-surface))]/40 backdrop-blur-md": intensity === "light",
            "bg-[rgb(var(--bg-surface))]/65 backdrop-blur-xl": intensity === "medium",
            "bg-[rgb(var(--bg-surface))]/80 backdrop-blur-2xl": intensity === "heavy",
          },
          className
        )}
        {...props}
      />
    );
  }
);
GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
