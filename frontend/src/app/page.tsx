import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen p-12 space-y-16">
      <header className="flex justify-between items-center pb-8 border-b border-strong">
        <div>
          <h1 className="text-display">Design System</h1>
          <p className="text-subtitle text-secondary">Verdict Frontend Foundation</p>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="space-y-24">
        {/* We will build our components here to test them visually */}
        <section className="space-y-6">
          <h2 className="text-title">Colors</h2>
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg bg-base flex items-center justify-center border border-default shadow-sm"><span className="text-small">Base</span></div>
            <div className="w-24 h-24 rounded-lg bg-surface flex items-center justify-center border border-default shadow-sm"><span className="text-small">Surface</span></div>
            <div className="w-24 h-24 rounded-lg bg-elevated flex items-center justify-center border border-default shadow-sm"><span className="text-small">Elevated</span></div>
            <div className="w-24 h-24 rounded-lg bg-subtle flex items-center justify-center border border-default shadow-sm"><span className="text-small">Subtle</span></div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="w-24 h-24 rounded-lg bg-[rgb(var(--accent-primary))] text-white flex items-center justify-center shadow-md"><span className="text-small">Primary</span></div>
            <div className="w-24 h-24 rounded-lg bg-[rgb(var(--accent-secondary))] text-white flex items-center justify-center shadow-md"><span className="text-small">Secondary</span></div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-title">Typography</h2>
          <div className="space-y-4">
            <div className="text-display">Display</div>
            <div className="text-headline">Headline</div>
            <div className="text-title">Title</div>
            <div className="text-subtitle">Subtitle</div>
            <div className="text-body">Body text goes here. It is legible and clean.</div>
            <div className="text-small">Small text for secondary details.</div>
            <div className="text-caption">CAPTION TEXT</div>
            <div className="text-label">LABEL TEXT</div>
            <div className="text-ticker">1,234.56</div>
          </div>
        </section>
      </main>
    </div>
  );
}
