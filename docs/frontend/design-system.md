# Design System

Verdict utilizes a custom, premium design system built natively into Tailwind CSS v4 via `globals.css`.

## Colors
The color palette avoids highly saturated primary colors in favor of subtle neutrals and intentional accents.
- **Base/Surface**: The foundational background colors. Light mode uses off-whites, Dark mode uses deep slates/blacks.
- **Elevated/Subtle**: Used for cards, secondary panels, and hover states to establish depth.
- **Accent Primary**: Deep Slate (Light) / Off-White (Dark). Used for primary actions to convey authority.
- **Accent Secondary**: Emerald Green. Used sparingly for highlights, positive financial metrics, or active states.

## Typography
- **Font Family**: Inter (sans-serif)
- **Hierarchy**:
  - `text-display`: (2.5rem - 4rem) Massive headers.
  - `text-headline`: (1.75rem - 2.5rem) Page titles.
  - `text-title`: (1.25rem - 1.5rem) Card titles, major sections.
  - `text-subtitle`: (1.0625rem) Supporting headers.
  - `text-body`: Standard readable text.
  - `text-small`: Secondary information.
  - `text-caption`: Uppercase metadata.
  - `text-ticker`: Tabular-nums enabled font for financial symbols and numbers.

## Glassmorphism
We use subtle glass surfaces instead of flat colors for floating elements or elevated panels.
- Defined via `.glass-panel` utility class or `<GlassPanel />` component.
- Intensity can be `light`, `medium`, or `heavy`.

## Motion
Animations are centralized in `src/components/animations/variants.ts`.
- **Slide Up**: For cards entering the viewport.
- **Fade In**: For subtle content reveals.
- **Scale In**: For interactive elements like modals.
- Staggered animations are used for Bento grids to create a cascading entrance effect.
