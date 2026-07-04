"use client";

import * as React from "react";
import { useState } from "react";
import { Section, SectionHeader } from "@/components/layout/section";
import { 
  Eye, 
  Settings2, 
  Brain, 
  FileText, 
  Sliders, 
  Keyboard, 
  Code2, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  AppearanceSettings, 
  WorkspacePreferences, 
  AIPreferences, 
  ResearchPreferences, 
  AccessibilitySettings, 
  KeyboardShortcutViewer, 
  DeveloperOptions, 
  AboutVerdict 
} from "@/components/research/SettingsComponents";

type TabId = "appearance" | "workspace" | "ai" | "research" | "accessibility" | "shortcuts" | "developer" | "about";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("appearance");

  const navigationItems = [
    { id: "appearance" as TabId, label: "Appearance", icon: Eye },
    { id: "workspace" as TabId, label: "Workspace Prefs", icon: Settings2 },
    { id: "ai" as TabId, label: "AI Config", icon: Brain },
    { id: "research" as TabId, label: "Research Prefs", icon: FileText },
    { id: "accessibility" as TabId, label: "Accessibility", icon: Sliders },
    { id: "shortcuts" as TabId, label: "Key Shortcuts", icon: Keyboard },
    { id: "developer" as TabId, label: "Developer", icon: Code2 },
    { id: "about" as TabId, label: "About Verdict", icon: Info },
  ];

  const renderActivePanel = () => {
    switch (activeTab) {
      case "appearance":
        return <AppearanceSettings />;
      case "workspace":
        return <WorkspacePreferences />;
      case "ai":
        return <AIPreferences />;
      case "research":
        return <ResearchPreferences />;
      case "accessibility":
        return <AccessibilitySettings />;
      case "shortcuts":
        return <KeyboardShortcutViewer />;
      case "developer":
        return <DeveloperOptions />;
      case "about":
        return <AboutVerdict />;
      default:
        return null;
    }
  };

  return (
    <Section className="pb-24 max-w-5xl">
      <SectionHeader title="Settings Workspace" subtitle="Tailor multi-agent orchestration, keybindings, and display density." className="mb-8 border-b border-[rgb(var(--border-default))] pb-6" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full select-none">
        {/* Navigation Sidebar (3/12) */}
        <aside className="md:col-span-3 flex flex-col gap-1 w-full text-left">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer text-left",
                activeTab === item.id 
                  ? "bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))]" 
                  : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-elevated))] hover:text-[rgb(var(--text-primary))]"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Configurations Panel (9/12) */}
        <main className="md:col-span-9 rounded-2xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 md:p-8 w-full">
          <h3 className="text-subtitle font-bold text-[rgb(var(--text-primary))] mb-6 uppercase tracking-wider pb-2 border-b border-[rgb(var(--border-default))]/45">
            {navigationItems.find(item => item.id === activeTab)?.label} Settings
          </h3>
          <div className="w-full">
            {renderActivePanel()}
          </div>
        </main>
      </div>
    </Section>
  );
}
