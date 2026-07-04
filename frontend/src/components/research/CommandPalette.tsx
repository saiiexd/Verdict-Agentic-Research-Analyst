"use client";

import * as React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Activity, 
  Clock, 
  Settings2, 
  Eye, 
  CornerDownLeft, 
  FileText,
  Pin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

interface Command {
  id: string;
  title: string;
  description?: string;
  action: () => void;
  category: "Commands" | "Navigation" | "History Reports" | "Watchlist";
  icon: React.ComponentType<{ className?: string }>;
}

export function CommandPalette() {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    history, 
    watchlist,
    toggleAnimations 
  } = useAppStore();

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle Command Palette open state via Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Focus input automatically on open
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Build command registry dynamically
  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      {
        id: "new-research",
        title: "Start New Research",
        description: "Launch a new multi-agent equity analysis run",
        category: "Commands",
        icon: Sparkles,
        action: () => { router.push("/"); setCommandPaletteOpen(false); }
      },
      {
        id: "nav-dashboard",
        title: "Go to Dashboard",
        description: "Open the workspace intelligence dashboard overview",
        category: "Navigation",
        icon: Activity,
        action: () => { router.push("/dashboard"); setCommandPaletteOpen(false); }
      },
      {
        id: "nav-history",
        title: "Go to Research History",
        description: "View logs of previously compiled AI reports",
        category: "Navigation",
        icon: Clock,
        action: () => { router.push("/history"); setCommandPaletteOpen(false); }
      },
      {
        id: "nav-settings",
        title: "Go to Settings Workspace",
        description: "Configure models, layouts, density, and developer options",
        category: "Navigation",
        icon: Settings2,
        action: () => { router.push("/settings"); setCommandPaletteOpen(false); }
      },
      {
        id: "toggle-motion",
        title: "Toggle UI Animations",
        description: "Flip Framer Motion layout transition animations",
        category: "Commands",
        icon: Eye,
        action: () => { toggleAnimations(); setCommandPaletteOpen(false); }
      }
    ];

    // Append history items dynamically
    history.forEach(item => {
      list.push({
        id: `history-${item.ticker.toLowerCase()}`,
        title: `Open report for ${item.ticker.toUpperCase()}`,
        description: item.data.financial_data?.company_name || "Securities analysis report",
        category: "History Reports",
        icon: FileText,
        action: () => { router.push(`/reports/${item.ticker.toLowerCase()}`); setCommandPaletteOpen(false); }
      });
    });

    // Append watchlist items dynamically
    watchlist.forEach(ticker => {
      list.push({
        id: `watchlist-${ticker.toLowerCase()}`,
        title: `Watchlist item: ${ticker.toUpperCase()}`,
        description: "Monitored asset shortcut",
        category: "Watchlist",
        icon: Pin,
        action: () => { router.push(`/reports/${ticker.toLowerCase()}`); setCommandPaletteOpen(false); }
      });
    });

    return list;
  }, [history, watchlist, router, setCommandPaletteOpen, toggleAnimations]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(cmd => 
      cmd.title.toLowerCase().includes(q) || 
      (cmd.description || "").toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Handle arrow key selections and Enter submissions
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [commandPaletteOpen, filteredCommands, selectedIndex, setCommandPaletteOpen]);

  // Close command palette when clicking outside the panel modal
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };
    if (commandPaletteOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-[15vh]">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] shadow-2xl flex flex-col overflow-hidden max-h-[450px]"
          >
            {/* Command Palette search bar */}
            <div className="relative border-b border-[rgb(var(--border-default))] p-3 flex items-center gap-3 select-none">
              <Search className="h-4 w-4 text-[rgb(var(--text-tertiary))]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Search commands, reports, and watchlists..."
                className="w-full text-xs bg-transparent border-none text-[rgb(var(--text-primary))] focus:outline-none placeholder-[rgb(var(--text-tertiary))]"
              />
              <kbd className="px-1.5 py-0.5 rounded border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] text-[9px] font-mono text-[rgb(var(--text-tertiary))] shadow-sm">
                ESC
              </kbd>
            </div>

            {/* Results display */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {filteredCommands.length === 0 ? (
                <p className="text-xs text-[rgb(var(--text-tertiary))] italic py-8 text-center select-none">
                  No matching workspace actions found.
                </p>
              ) : (
                <div className="space-y-3">
                  {/* Group items by category for semantic rendering */}
                  {["Commands", "Navigation", "History Reports", "Watchlist"].map((cat) => {
                    const items = filteredCommands.filter(c => c.category === cat);
                    if (items.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1.5">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[rgb(var(--text-tertiary))] px-2.5 block select-none">
                          {cat}
                        </span>
                        <div className="space-y-0.5">
                          {items.map((cmd) => {
                            const indexInFlatList = filteredCommands.indexOf(cmd);
                            const isSelected = selectedIndex === indexInFlatList;

                            return (
                              <div
                                key={cmd.id}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(indexInFlatList)}
                                className={cn(
                                  "px-3 py-2 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-all",
                                  isSelected 
                                    ? "bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))]" 
                                    : "text-[rgb(var(--text-secondary))]"
                                )}
                              >
                                <div className="flex items-center gap-3 truncate">
                                  <cmd.icon className={cn("h-4 w-4 flex-shrink-0", isSelected ? "text-[rgb(var(--bg-surface))]" : "text-[rgb(var(--text-tertiary))]" )} />
                                  <div className="flex flex-col gap-0.5 truncate text-left">
                                    <span className="text-xs font-bold leading-tight">{cmd.title}</span>
                                    {cmd.description && (
                                      <span className={cn("text-[9px] truncate", isSelected ? "text-[rgb(var(--bg-surface))]/70" : "text-[rgb(var(--text-tertiary))]" )}>
                                        {cmd.description}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {isSelected && (
                                  <CornerDownLeft className="h-3.5 w-3.5 flex-shrink-0 text-[rgb(var(--bg-surface))]" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
