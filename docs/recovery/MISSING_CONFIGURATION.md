# Missing Configuration

This document highlights the missing configuration files and values that were recreated during the recovery process.

## 1. Missing `backend/.env`
The backend environment file was entirely absent (which is standard practice for git repositories). A new `backend/.env` was generated based on the `backend/.env.example` file and the `Settings` class in `backend/app/config/settings.py`. Placeholders were used for sensitive API keys.

## 2. Missing `frontend/.env.local`
The frontend environment file was missing. Next.js expects API endpoint configuration to connect with the FastAPI backend. A new `.env.local` was created containing:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 3. Missing `src/lib/errors.ts`
The file `frontend/src/lib/errors.ts` was not present in the repository clone. Since `useResearch.ts`, `researchService.ts`, and `ReportPanel.tsx` explicitly depended on this file for error boundaries, it was reconstructed to match the required signatures (`ResearchError` class, `AppError` type with `isRecoverable`, and `normalizeError` function).
