"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp } from "@/components/animations/variants";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-base))] flex flex-col items-center justify-center p-6 text-center">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="max-w-md w-full bg-[rgb(var(--bg-surface))] rounded-2xl p-8 border border-[rgb(var(--border-default))] shadow-sm">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-3 tracking-tight">System Interruption</h1>
        <p className="text-[rgb(var(--text-secondary))] mb-8 leading-relaxed">
          The application encountered an unexpected runtime error. Our engineering team has been notified.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button onClick={reset} size="lg" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <Link href="/" className="w-full">
            <Button variant="outline" size="lg" className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
