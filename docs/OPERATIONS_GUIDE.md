# Operations Guide

Operational setups for DevOps engineers running Verdict in production.

---

## 1. Hosting Environment
The Verdict frontend is optimized for deployment on Vercel. 
The backend can be containerized using Docker and deployed on Render, Fly.io, or AWS ECS.

## 2. CI/CD Triggers
- Pushes to the `main` branch automatically trigger Next.js cache clearance and re-deployment on Vercel endpoints.
- `.env` variables mapped inside Vercel Dashboard dictate API target URLs.

## 3. Logs & Diagnostics
- Monitor frontend exceptions using standard Vercel log interfaces.
- The Python backend exposes HTTP traceback logs directly to STDOUT, accessible through standard Docker or cluster viewing protocols.
