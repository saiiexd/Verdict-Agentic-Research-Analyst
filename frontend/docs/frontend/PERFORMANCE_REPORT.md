# Performance Report

**Date**: July 2026
**Scope**: Verdict Frontend (Next.js App Router)

## 1. Network & API Optimization
- **React Query Implementation**: All requests to the backend `POST /research` are managed via TanStack Query.
- **Caching**: The `queryClient` is configured globally with a 5-minute stale time. While `POST` requests don't inherently cache the same way as `GET`s, the frontend manages deduplication and uses local state (`Zustand`) for caching history.
- **Timeouts**: The Axios instance implements a 180s timeout, adapting safely to the LangGraph execution duration (~60s).

## 2. Rendering Optimization
- **Client vs Server Components**: The application correctly splits the layout. The `RootLayout` uses Server Components natively, while interactive pages (Dashboard, Report Viewer) use `"use client"`.
- **Zustand Persistence**: History state is persisted in `localStorage`. Only the `history` and `animationsEnabled` slices are serialized to avoid bloating the client.

## 3. Asset & CSS Efficiency
- **Tailwind v4**: The removal of `tailwind.config.ts` in favor of `@theme` inside `globals.css` forces JIT compilation through PostCSS with LightningCSS under the hood, dramatically reducing the CSS payload size.
- **Framer Motion**: Animations are handled via reusable variants (`slideUp`, `fadeIn`) in a single file (`variants.ts`) to avoid massive inline object allocations.

## 4. Lazy Loading
- Next.js dynamic routing automatically code-splits chunks per route (e.g., `reports/[ticker]` chunks are only loaded when viewing reports).
