"use client";

import { useAppStore } from "@/store/useAppStore";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function SettingsPage() {
  const { animationsEnabled, toggleAnimations } = useAppStore();

  return (
    <Section className="max-w-4xl">
      <SectionHeader title="Settings" subtitle="Manage your application preferences." className="mb-10 border-b border-[rgb(var(--border-default))] pb-6" />

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the visual style of Verdict.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Theme Preference</h4>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Toggle between light and dark modes.</p>
              </div>
              <div className="border border-[rgb(var(--border-default))] rounded-full p-1 bg-[rgb(var(--bg-elevated))]">
                <ThemeToggle />
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-[rgb(var(--border-default))] pt-6">
              <div>
                <h4 className="text-sm font-medium">UI Animations</h4>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Enable or disable Framer Motion animations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={animationsEnabled}
                  onChange={toggleAnimations}
                />
                <div className="w-11 h-6 bg-[rgb(var(--bg-subtle))] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--accent-secondary))] border border-[rgb(var(--border-default))]"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="opacity-50 pointer-events-none">
          <CardHeader>
            <CardTitle>AI Providers (Coming Soon)</CardTitle>
            <CardDescription>Configure custom API keys for LLM execution.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-[rgb(var(--text-secondary))]">
              Currently, Verdict uses the default backend provider. Custom model selection will be enabled in a future update.
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
