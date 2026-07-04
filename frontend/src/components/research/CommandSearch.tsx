"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandSearchProps {
  /**
   * Optional callback triggered when research execution is requested.
   * Passes the sanitized search query (uppercase ticker or company name).
   */
  onAnalyze?: (query: string) => void;
  /**
   * Optional placeholder override for the input field.
   */
  placeholder?: string;
  /**
   * Optional custom classes to apply to the search container wrapper.
   */
  className?: string;
  /**
   * Whether a research workflow is actively running.
   */
  isPending?: boolean;
}

/**
 * CommandSearch serves as the primary interface for triggering AI research.
 * Employs a glassmorphic container, subtle hover/focus highlight feedback, and full accessibility.
 */
export function CommandSearch({
  onAnalyze,
  placeholder = "Search company or ticker symbol (e.g. NVDA, Apple, Tesla)",
  className,
  isPending = false,
}: CommandSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus on load to streamline user workflow (Spotlight/Raycast style)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedQuery = query.trim();
    if (!sanitizedQuery) return;

    // Temporary behavior: Log execution to console
    console.log(`[CommandSearch] Submit Query: ${sanitizedQuery}`);
    
    // Call external handler if provided
    if (onAnalyze) {
      onAnalyze(sanitizedQuery);
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const isDisabled = !query.trim() || isPending;

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      onClick={!isPending ? handleContainerClick : undefined}
      className={cn(
        "w-full flex flex-col md:flex-row items-stretch md:items-center gap-3 p-2 md:p-3 rounded-2xl transition-all duration-300",
        isPending ? "cursor-not-allowed opacity-80" : "cursor-text",
        "bg-[rgb(var(--glass-bg))] backdrop-blur-md border",
        isFocused && !isPending
          ? "border-[rgb(var(--accent-primary))] shadow-[0_0_0_4px_rgba(var(--accent-primary),0.1)]"
          : "border-[rgb(var(--border-strong))] shadow-sm hover:border-[rgb(var(--text-tertiary))]",
        className
      )}
    >
      <div className="flex flex-1 items-center gap-3 px-3">
        {/* Search Icon */}
        <Search 
          className={cn(
            "h-5 w-5 flex-shrink-0 transition-colors duration-300",
            isFocused && !isPending ? "text-[rgb(var(--accent-primary))]" : "text-[rgb(var(--text-tertiary))]"
          )}
          aria-hidden="true"
        />
        
        {/* Elegant Input Area */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isPending}
          className={cn(
            "w-full bg-transparent border-none outline-none py-2 md:py-3",
            "text-[16px] md:text-body font-medium text-[rgb(var(--text-primary))]",
            "placeholder:text-[rgb(var(--text-tertiary))]",
            isPending && "cursor-not-allowed"
          )}
          aria-label="Search company or ticker symbol"
        />
      </div>

      {/* Action Button */}
      <motion.button
        type="submit"
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
        whileTap={!isDisabled ? { scale: 0.98, y: 0 } : {}}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "px-6 py-3 md:py-3.5 rounded-xl font-semibold text-body select-none transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))] focus-visible:ring-offset-2",
          isDisabled
            ? "bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text-tertiary))] cursor-not-allowed border border-[rgb(var(--border-default))]"
            : "bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))] cursor-pointer hover:shadow-md"
        )}
      >
        {isPending ? "Analyzing..." : "Analyze"}
      </motion.button>
    </motion.form>
  );
}

CommandSearch.displayName = "CommandSearch";
