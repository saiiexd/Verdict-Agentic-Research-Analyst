# CI/CD Setup Guide

This document describes the automated integration and delivery pipelines configured for the Verdict workspace.

---

## 1. GitHub Actions Pipeline

A template workflow file `.github/workflows/ci.yml` is used to validate pull requests:

```yaml
name: Continuous Integration

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'

      - name: Install Dependencies
        run: |
          cd frontend
          npm ci

      - name: Run Linter & Type Check
        run: |
          cd frontend
          npm run lint

      - name: Validate Production Build
        run: |
          cd frontend
          npm run build
```

---

## 2. Automated Testing Integrations

Future integrations can add Jest/Vitest automated testing steps into the validation pipeline:
```yaml
      - name: Run Tests
        run: |
          cd frontend
          npm run test
```
This guarantees that regressions are caught automatically before merging code into main branches.
