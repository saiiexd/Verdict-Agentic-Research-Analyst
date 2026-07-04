# Design System Audit

An audit of typography scales, spacing tokens, color palettes, and motion curves implemented in the Verdict workspace.

---

## 1. Typography Hierarchy

Verdict uses pre-configured Tailwind classes to enforce editorial text rhythms:
- **Display**: For ticker headlines.
- **Title**: Section card titles.
- **Body**: Secondary descriptions and parsed markdown paragraphs.
- **Caption / Mono**: Generation stamps and metrics values.

---

## 2. Color Palette & Dark/Light Themes

Adheres to a luxury minimal design system:
- **Backgrounds**: Dark theme uses slate/slate-950 base colors, while light theme leverages zinc-50/100 parameters.
- **Borders**: Restrained `border-[rgb(var(--border-default))]` mappings prevent excessive visual partitions.
- **Highlights**: Highlights (like ratings and indicators) use controlled emerald (Buy), amber (Hold), and red (Sell) hues.

---

## 3. Motion Curves

- Entrance animations use spring fade-ins with linear/outwards easing curves.
- Focus mode collapses columns cleanly using layout-transition constraints.
