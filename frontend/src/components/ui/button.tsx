import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[rgb(var(--accent-primary))] text-white hover:bg-[rgb(var(--accent-primary-hover))] shadow-sm hover:shadow-md",
        secondary:
          "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-subtle))] border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-strong))]",
        outline:
          "border border-[rgb(var(--border-strong))] bg-transparent hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))]",
        ghost: "hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] hover:text-[rgb(var(--text-primary))]",
        glass: "glass-panel hover:bg-[rgb(var(--bg-surface))]/80 text-[rgb(var(--text-primary))]",
        danger: "bg-[rgb(var(--color-danger))] text-white hover:bg-[rgb(var(--color-danger))]/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // If it's not a slot, we can wrap it in motion for subtle tap effects
    if (!asChild) {
      return (
        <motion.button
          whileTap={{ scale: 0.98 }}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...props as any}
        />
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
