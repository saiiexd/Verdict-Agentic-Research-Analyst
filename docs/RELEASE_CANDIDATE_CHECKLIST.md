# Release Candidate Checklist

Pre-flight verification checklist for the Verdict v1.0.0-RC1 release.

---

## 1. Quality Checklist

- [x] **Next.js compilation**: The production build compiles successfully with zero warnings.
- [x] **Strict Typing**: All components use strict TypeScript interfaces (no `any` casts).
- [x] **DevOps integration**: GitHub Actions configuration is set up.
- [x] **Accessibility (WCAG AAA)**: Text elements meet AAA contrast targets and support keyboard navigation.
- [x] **Keyboard navigation**: sequences (`gd`, `gh`, `gs`) and Command Palette triggers (`Ctrl+K`) are responsive.
