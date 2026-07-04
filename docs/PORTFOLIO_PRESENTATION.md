# Portfolio Presentation Guide

This guide is designed for recruiters and engineering leads to evaluate Verdict's architectural depth.

---

## 1. Key Engineering Highlights to Showcase

- **Stateful Multi-Agent Loops**: Verdict leverages LangGraph to run cycles (such as draft revisions and critic validation debates) instead of simple linear LLM calls.
- **Dynamic focus states**: Zustand triggers collapse layouts, providing a clean, distraction-free reading mode.
- **Visual Performance Tuning**: Highlights search query matches dynamically using React RegExp render algorithms.
- **Client-Side Cache Persistence**: Watchlists and settings are cached on the client via Zustand's partialize persistent hooks.
