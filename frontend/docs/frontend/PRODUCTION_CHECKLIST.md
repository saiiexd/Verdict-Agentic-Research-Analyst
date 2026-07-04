# Production Readiness Checklist

Pre-deployment verification guidelines to ensure Verdict meets enterprise product standards.

---

## 1. Environment Configurations
- [ ] `NEXT_PUBLIC_API_URL` is set to the production FastAPI endpoint (and does not point to `localhost:8000`).
- [ ] `NODE_ENV` is set to `production` during builds.

## 2. Compilation and Code Quality
- [ ] `npm run build` runs and completes with zero TypeScript or ESLint errors.
- [ ] Unused imports, console logs, and debugging artifacts are removed.

## 3. Performance & Design Systems
- [ ] Next.js routing layouts are responsive down to mobile sizes (no overflow offsets).
- [ ] Dynamic parameters are marked dynamically.
- [ ] Theme toggles function cleanly (Light Mode vs. Dark Mode).
