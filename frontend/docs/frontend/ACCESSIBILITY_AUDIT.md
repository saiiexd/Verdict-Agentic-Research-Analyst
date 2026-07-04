# Accessibility Audit

**Date**: July 2026
**Scope**: Verdict Frontend

## 1. Semantic HTML
- Replaced non-semantic `div` soup with `<main>`, `<aside>`, `<nav>`, and `<article>` tags across the layout.
- Report structures use proper heading hierarchy (`<h1>` for title, `<h3>` for sections, etc.) ensuring screen readers parse the document logically.

## 2. Keyboard Navigation
- All interactive elements (`Button`, `Input`, `Link`) are keyboard focusable.
- The global focus ring utility (`.focus-ring`) in `globals.css` provides a high-contrast visible ring (`ring-2 ring-[rgb(var(--accent-primary))]`) when navigating via Tab.

## 3. ARIA Enhancements
- Icon-only buttons (Sidebar Toggle, Theme Toggle, History Trash Button) have explicit `aria-label` attributes to ensure screen readers announce their function.
- Radix UI primitives (`@radix-ui/react-tooltip`, `react-dialog`) natively handle complex ARIA interactions like trapping focus and `aria-expanded` states.

## 4. Color Contrast
- The Design System (Part 1) evaluated the contrast ratio for all `--text-secondary` and `--text-tertiary` tokens.
- Light mode `text-secondary` (RGB 95 95 105) against `bg-base` (RGB 250 250 250) passes AA guidelines.

## 5. Reduced Motion
- Users can disable all Framer Motion animations globally via the Settings page. This ties directly into the Zustand store, although future updates could bind it directly to the OS `prefers-reduced-motion` media query.
