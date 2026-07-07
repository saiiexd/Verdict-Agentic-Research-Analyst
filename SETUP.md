# Verdict Development Environment Setup

This document provides complete instructions to set up the Verdict development environment from scratch.

## Prerequisites
- **Operating System**: Windows (tested), macOS, or Linux
- **Python**: 3.10+
- **Node.js**: 20+
- **Package Managers**: `pip` (Python), `npm` (Node)

## 1. Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - On Windows: `.\venv\Scripts\Activate.ps1`
   - On macOS/Linux: `source venv/bin/activate`

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

5. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory (or copy `.env.example`):
   ```env
   APP_NAME="Verdict API"
   APP_VERSION="1.0.0"
   DEBUG=True

   # Choose LLM Provider (e.g., openrouter, gemini, openai)
   LLM_PROVIDER=gemini
   LLM_MODEL=gemini-2.5-flash
   LLM_API_KEY=your_llm_api_key_here

   # Tavily Search API
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

6. **Start the Backend Server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## 2. Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```

## 3. Verification

Once both servers are running:
1. Access the frontend application at [http://localhost:3000](http://localhost:3000).
2. The backend API documentation (Swagger) is available at [http://localhost:8000/docs](http://localhost:8000/docs).
3. Submitting a research request on the frontend will trigger the backend LangGraph pipeline.

## 4. Troubleshooting
- **Missing API Keys**: If the backend workflow fails with a `401 Unauthorized` or `InvalidAPIKeyError`, verify that your `LLM_API_KEY` and `TAVILY_API_KEY` in `backend/.env` are valid.
- **Port Conflicts**: Ensure ports `3000` and `8000` are free before starting the frontend and backend servers.
- **Next.js Build Errors**: If deploying to production, run `npm run build` in the `frontend` folder to ensure all types are strictly adhered to.
