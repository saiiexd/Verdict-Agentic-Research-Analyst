import os
from app.llm.base import AbstractLLMProvider
from app.llm.openrouter import OpenRouterProvider
from app.llm.gemini import GeminiProvider
from app.core.logger import logger

class LLMFactory:
    """
    Factory class to instantiate the correct LLM provider.
    """

    @staticmethod
    def get_provider() -> AbstractLLMProvider:
        # Default to openrouter if not specified
        provider_name = os.getenv("LLM_PROVIDER", "openrouter").lower()
        
        logger.info(f"Initializing LLM Provider: {provider_name}")

        if provider_name == "openrouter":
            return OpenRouterProvider()
        elif provider_name == "gemini":
            return GeminiProvider()
        else:
            logger.warning(f"Unknown LLM provider '{provider_name}'. Falling back to OpenRouter.")
            return OpenRouterProvider()
