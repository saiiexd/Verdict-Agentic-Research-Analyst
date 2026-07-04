# Settings Workspace Architecture

This document describes the visual customization, multi-agent reasoning depth settings, local mock states, and keyboard shortcut configurations governing Verdict's system options.

---

## 1. Multi-Panel settings workspace (`SettingsComponents.tsx`)

The settings workspace coordinates distinct configuration blocks matching established monochrome luxury minimal parameters:
- **`AppearanceSettings`**: Toggles dark/light visual modes, motion transitions, and glassmorphism blurs.
- **`WorkspacePreferences`**: Sets default landing parameters (dashboard, history, or analyzer views) and layout margins (Comfortable vs. Compact densities).
- **`AIPreferences`**: Sets LLM primary agents (Gemini models) and reasoning depth loops (10% to 100%).
- **`ResearchPreferences`**: Toggles valuation extractions and news sentiment parse options.
- **`AccessibilitySettings`**: Toggles high contrast modes.
- **`KeyboardShortcutViewer`**: Documents layout key combinations.
- **`DeveloperOptions`**: Custom endpoint modifiers and mock backend loop switches.
- **`AboutVerdict`**: Standard deployment version numbers and release logs.

---

## 2. Keyboard Navigation hotkeys (`layout.tsx`)

A global listener checks sequence keys to streamline page navigation:
- `g` followed by `d` dispatches direct routing to `/dashboard`.
- `g` followed by `h` dispatches direct routing to `/history`.
- `g` followed by `s` dispatches direct routing to `/settings`.

These sequences are ignored when user focus resides inside input fields (`INPUT`, `TEXTAREA`, `SELECT`) to avoid collision.

---

## 3. Future Authentication sync

All state configurations are mapped to Zustand slices. In a future authenticated environment, these configurations can sync directly with backend databases (e.g. users table in PostgreSQL) to support cross-device persistences.
