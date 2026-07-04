"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAppStore } from "@/store/useAppStore";

// ─── 1. Appearance Settings Panel ────────────────────────────
export function AppearanceSettings() {
  const { animationsEnabled, toggleAnimations } = useAppStore();
  const [glassIntensity, setGlassIntensity] = useState("medium");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Interface Theme</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Switch between Light and Dark color spaces</span>
        </div>
        <div className="border border-[rgb(var(--border-default))] rounded-full p-1 bg-[rgb(var(--bg-elevated))]">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[rgb(var(--border-default))]/45 pt-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Workspace Animations</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Toggle Framer Motion transitions</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={animationsEnabled}
            onChange={toggleAnimations}
          />
          <div className="w-9 h-5 bg-[rgb(var(--bg-subtle))] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(var(--accent-primary))] border border-[rgb(var(--border-default))]" />
        </label>
      </div>

      <div className="flex items-center justify-between border-t border-[rgb(var(--border-default))]/45 pt-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Glassmorphism Blur</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Adjust backdrop filter blur density</span>
        </div>
        <div className="flex border border-[rgb(var(--border-default))] rounded-lg p-0.5 bg-[rgb(var(--bg-surface))]">
          {["low", "medium", "high"].map((level) => (
            <button
              key={level}
              onClick={() => setGlassIntensity(level)}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer",
                glassIntensity === level 
                  ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm" 
                  : "text-[rgb(var(--text-tertiary))]"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 2. Workspace Preferences Panel ──────────────────────────
export function WorkspacePreferences() {
  const { layoutDensity, setLayoutDensity } = useAppStore();
  const [defaultRoute, setDefaultRoute] = useState("/dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Workspace Density</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Tailor visual margins and padding</span>
        </div>
        <div className="flex border border-[rgb(var(--border-default))] rounded-lg p-0.5 bg-[rgb(var(--bg-surface))]">
          {["comfortable", "compact"].map((density) => (
            <button
              key={density}
              onClick={() => setLayoutDensity(density as "comfortable" | "compact")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer",
                layoutDensity === density 
                  ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm" 
                  : "text-[rgb(var(--text-tertiary))]"
              )}
            >
              {density}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[rgb(var(--border-default))]/45 pt-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Landing Home Page</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Set primary workspace viewport on launch</span>
        </div>
        <select
          value={defaultRoute}
          onChange={(e) => setDefaultRoute(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg text-xs border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] focus:outline-none"
        >
          <option value="/dashboard">Dashboard</option>
          <option value="/">Research Workspace</option>
          <option value="/history">History log</option>
        </select>
      </div>
    </div>
  );
}

// ─── 3. AI Execution Preferences Panel ────────────────────────
export function AIPreferences() {
  const [modelName, setModelName] = useState("gemini-3.5-flash");
  const [reasoningDepth, setReasoningDepth] = useState(70);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Preferred AI Model</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Agent pipeline primary reasoning model</span>
        </div>
        <select
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg text-xs border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] focus:outline-none"
        >
          <option value="gemini-3.5-flash">Gemini 3.5 Flash (Medium)</option>
          <option value="gemini-3.5-pro">Gemini 3.5 Pro (Thorough)</option>
          <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
        </select>
      </div>

      <div className="space-y-2 border-t border-[rgb(var(--border-default))]/45 pt-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Reasoning Pipeline Depth</h4>
            <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Execution iteration count controls</span>
          </div>
          <span className="font-mono text-xs font-bold text-[rgb(var(--accent-primary))]">{reasoningDepth}%</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={reasoningDepth}
          onChange={(e) => setReasoningDepth(Number(e.target.value))}
          className="w-full h-1 bg-[rgb(var(--border-default))] rounded-lg appearance-none cursor-pointer accent-[rgb(var(--accent-primary))]"
        />
      </div>
    </div>
  );
}

// ─── 4. Research Template Configurations ──────────────────────
export function ResearchPreferences() {
  const [includeValuation, setIncludeValuation] = useState(true);
  const [includeSentiment, setIncludeSentiment] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Extract Valuation Charts</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Calculate valuation ratios automatically</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={includeValuation}
            onChange={() => setIncludeValuation(!includeValuation)}
          />
          <div className="w-9 h-5 bg-[rgb(var(--bg-subtle))] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(var(--accent-primary))] border border-[rgb(var(--border-default))]" />
        </label>
      </div>

      <div className="flex items-center justify-between border-t border-[rgb(var(--border-default))]/45 pt-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Gather News Sentiment</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Parse media feeds and sentiment indexations</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={includeSentiment}
            onChange={() => setIncludeSentiment(!includeSentiment)}
          />
          <div className="w-9 h-5 bg-[rgb(var(--bg-subtle))] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(var(--accent-primary))] border border-[rgb(var(--border-default))]" />
        </label>
      </div>
    </div>
  );
}

// ─── 5. Accessibility Settings ────────────────────────────────
export function AccessibilitySettings() {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">High Contrast Mode</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Enforce maximum accessibility contrast thresholds</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={highContrast}
            onChange={() => setHighContrast(!highContrast)}
          />
          <div className="w-9 h-5 bg-[rgb(var(--bg-subtle))] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(var(--accent-primary))] border border-[rgb(var(--border-default))]" />
        </label>
      </div>
    </div>
  );
}

// ─── 6. Keyboard Shortcuts Viewer ─────────────────────────────
export function KeyboardShortcutViewer() {
  const shortcuts = [
    { keys: "G D", description: "Navigate to Workspace Dashboard" },
    { keys: "G H", description: "Navigate to Research History" },
    { keys: "G S", description: "Navigate to Settings Panel" },
    { keys: "Esc", description: "Clear current research search results" },
    { keys: "?", description: "Open interactive shortcut list" },
  ];

  return (
    <div className="space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-[rgb(var(--border-default))]/40 pb-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[rgb(var(--text-tertiary))]">Command</span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[rgb(var(--text-tertiary))]">Shortcut Map</span>
      </div>
      <div className="space-y-3">
        {shortcuts.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center gap-4 py-0.5">
            <span className="text-xs font-semibold text-[rgb(var(--text-secondary))]">{item.description}</span>
            <kbd className="px-2 py-0.5 rounded border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] text-[10px] font-mono font-bold text-[rgb(var(--text-primary))] shadow-sm select-none">
              {item.keys}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 7. Developer Debug Settings ──────────────────────────────
export function DeveloperOptions() {
  const [mockMode, setMockMode] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-0.5">Mock Backend Pipeline</h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">Run simulation loops to bypass endpoint latency</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={mockMode}
            onChange={() => setMockMode(!mockMode)}
          />
          <div className="w-9 h-5 bg-[rgb(var(--bg-subtle))] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(var(--accent-primary))] border border-[rgb(var(--border-default))]" />
        </label>
      </div>
    </div>
  );
}

// ─── 8. About Verdict Panel ──────────────────────────────────
export function AboutVerdict() {
  return (
    <div className="space-y-4 text-xs select-none">
      <p className="text-[rgb(var(--text-secondary))] leading-relaxed">
        Verdict is an institutional-grade, multi-agent AI framework for automated equity research synthesis, sentiment indexing, and logic audits.
      </p>
      <div className="border-t border-[rgb(var(--border-default))]/45 pt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">Application Version</span>
          <span className="font-semibold text-[rgb(var(--text-secondary))]">v1.5.0-production</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">Pipeline Engine</span>
          <span className="font-semibold text-[rgb(var(--text-secondary))]">FastAPI / LangGraph v0.4</span>
        </div>
      </div>
    </div>
  );
}
