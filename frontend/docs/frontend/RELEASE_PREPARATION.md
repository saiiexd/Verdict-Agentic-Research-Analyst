# Release Preparation Guidelines

Procedures for version tagging, packaging, and deploying updates to production.

---

## 1. Version Control

Verdict follows Semantic Versioning guidelines (`MAJOR.MINOR.PATCH`):
- **MAJOR**: Breaking structural changes (e.g. backend model overhauls requiring frontend changes).
- **MINOR**: Feature additions (e.g. new settings tabs, watchlists, analytics).
- **PATCH**: Bug fixes (e.g. ESLint lints, Next.js dynamic routing configurations).

---

## 2. Release Steps

1. **Verify Local Build**:
   ```bash
   npm run build
   ```
2. **Tag the Release**:
   Create a Git tag matching the version bump:
   ```bash
   git tag -a v1.5.0 -m "Release v1.5.0: Watchlists, Settings Workspace, Command Palette"
   git push origin v1.5.0
   ```
3. **Deployment Handoff**:
   Push the tag to trigger CI/CD deployment pipelines (e.g. automated Vercel preview environments).
