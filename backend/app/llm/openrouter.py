from langchain_openai import ChatOpenAI
from app.config.settings import settings
from app.llm.base import AbstractLLMProvider

class OpenRouterProvider(AbstractLLMProvider):
    """
    OpenRouter LLM Provider implementation using ChatOpenAI client.
    """
    
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.LLM_MODEL,
            api_key=settings.LLM_API_KEY,
            base_url="https://openrouter.ai/api/v1",
            temperature=0,
        )

    def get_llm(self):
        return self.llm
