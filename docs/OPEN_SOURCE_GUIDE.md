# Open Source Publication Guide

Guidelines for launching Verdict as an open-source project.

---

## 1. Clean Code Standards

To encourage public contributions:
- Ensure all API credentials reside in local `.env` files (never check them into Git).
- Run lint verification before committing changes:
  ```bash
  npm run lint
  ```
- Use Semantic Versioning guidelines for tagging changes.

---

## 2. Issues & Pull Requests

- **Issue Templates**: Check for bugs, feature requests, or documentation improvements.
- **Pull Requests**: Pull requests should detail changes made, tests run, and include screenshots for UI modifications.
