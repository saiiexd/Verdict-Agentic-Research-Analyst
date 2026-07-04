# Personalized Workspace Architecture

This document outlines the layout orchestration, watchlist managers, system notification alerts, and structural customizations that govern Verdict's personalized intelligence dashboard.

---

## 1. Watchlist and Alerts Sync (`WorkspaceDashboardComponents.tsx`)

Persisted user state is loaded dynamically from store storage blocks:
- **`WatchlistPanel`**: Displays monitored stock ticker metrics, mapping local history runs or linking new analyzer launches.
- **`WorkspaceNotificationCenter`**: An alert stack illustrating pipeline completion messages. Marks alerts as read in real-time.

---

## 2. Layout Personalization Density & Collections

Verdict includes structured customization modules to tailor presentation setups:
- **`PersonalizedLayout`**: Allows toggling between `Comfortable` and `Compact` layout density settings, mapping typography spacing classes.
- **`ResearchCollections`**: Structures peer groups (e.g. Semiconductors, AI & Tech) to categorise reports.
- **`WorkspaceInsights`**: Aggregates history logs to display total coverage indices, sector lists, and average execution timelines.

---

## 3. Extensibility for Authentication & Cloud Persist

The client-side Zustand store is designed to sync with future cloud layers:
- Watchlist arrays (`watchlist`) and layout parameters (`dashboardLayout`, `layoutDensity`) are part of a partialize persist hook.
- A future cloud synchronization service can replace these hooks with HTTP endpoints linked to an external database (e.g. PostgreSQL) without restructuring components, maintaining a presentation-focused design pattern.
