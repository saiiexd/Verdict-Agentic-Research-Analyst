"use client";

import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp } from "@/components/animations/variants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-base))] flex flex-col items-center justify-center p-6 text-center">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="max-w-md w-full">
        <div className="w-20 h-20 rounded-full bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FileQuestion className="h-10 w-10 text-[rgb(var(--text-tertiary))]" />
        </div>
        <h1 className="text-headline mb-3">Page Not Found</h1>
        <p className="text-[rgb(var(--text-secondary))] mb-8 leading-relaxed text-body">
          The research report or page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
        </p>
        
        <Link href="/dashboard">
          <Button size="lg" className="shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
