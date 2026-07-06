# Verdict Certified Setup Guide

This guide ensures a seamless onboarding experience for new developers cloning the repository.

## 1. Prerequisites
- **Python**: Version 3.10 to 3.13
- **Node.js**: Version 20.x or higher (NPM included)
- **Git**: For cloning the repository

## 2. Environment Configuration
The project is strictly separated into two domains: `backend` and `frontend`. 

### Backend Configuration
1. Open the `/backend` directory.
2. Create a file named `.env` and configure the following variables:
   ```env
   APP_NAME="Verdict API"
   APP_VERSION="1.0.0"
   DEBUG=True
   LLM_PROVIDER=gemini # Or openai, openrouter
   LLM_MODEL=gemini-2.5-pro
   LLM_API_KEY=your_actual_key_here
   TAVILY_API_KEY=your_actual_tavily_key_here
   ```

### Frontend Configuration
1. Open the `/frontend` directory.
2. Create a file named `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## 3. Backend Setup & Launch
Navigate to the `/backend` folder:
```bash
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt -r requirements-dev.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```
*Note: The server will be accessible at http://localhost:8000. Swagger UI is at http://localhost:8000/docs.*

## 4. Frontend Setup & Launch
Navigate to the `/frontend` folder:
```bash
npm install
npm audit fix --force # Resolves known Next.js vulnerabilities

# Start the dev server
npm run dev
```
*Note: The application will be accessible at http://localhost:3000.*

## 5. End-to-End Validation
Once both servers are running:
1. Open http://localhost:3000 in your browser.
2. Enter a stock ticker symbol (e.g., "AAPL") into the central search bar.
3. Observe the loading state and workflow transitions (Searching, Synthesizing, etc.).
4. Verify the final research report is successfully rendered. 

If you encounter `401 Unauthorized` errors, please ensure you have provided valid, active API keys in your `backend/.env` file.
