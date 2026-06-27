from langchain_google_genai import ChatGoogleGenerativeAI
from app.config.settings import settings
from app.llm.base import AbstractLLMProvider

class GeminiProvider(AbstractLLMProvider):
    """
    Google Gemini LLM Provider implementation.
    """
    
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model=settings.LLM_MODEL,
            api_key=settings.LLM_API_KEY,
            temperature=0,
        )

    def get_llm(self):
        return self.llm
