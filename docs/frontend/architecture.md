# Verdict Frontend Architecture

## Overview
Verdict's frontend is built using a modern, scalable React architecture focused on performance, aesthetics, and maintainability. It utilizes Next.js App Router for routing and server-side rendering, Tailwind CSS v4 for styling, and Framer Motion for subtle animations.

## Directory Structure
- `src/app`: Next.js App Router definitions.
- `src/components/ui`: Reusable, foundational UI primitives (Buttons, Inputs, Cards).
- `src/components/layout`: Layout abstractions like Bento Grid and page sections.
- `src/components/animations`: Framer Motion variant definitions for consistent movement.
- `src/hooks`: Custom React hooks.
- `src/utils`: Helper functions and utilities (e.g., `cn` for Tailwind class merging).
- `src/styles`: Contains `globals.css` where Tailwind v4 `@theme` is defined.
- `src/assets`: Static assets including centralized icons.

## Design Philosophy
1. **Premium Minimalism**: Restrained use of color, relying heavily on typography, spacing, and subtle glassmorphism to define hierarchy.
2. **Motion as Feedback**: Animations (Framer Motion) should only be used to provide context and feedback, never to distract.
3. **Bento Grid Layouts**: Using modular, responsive grid systems for data presentation.
4. **Tailwind v4 Native**: All design tokens are centralized in `globals.css` using the `@theme` directive rather than an external JS config.

## Component Strategy
- UI Primitives are heavily inspired by `shadcn/ui` but customized heavily for Verdict's premium aesthetic.
- Components use `class-variance-authority` (cva) for managing variants.
- Avoid massive components; heavily favor composition.
