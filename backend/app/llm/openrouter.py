from typing import Any
from langchain_openai import ChatOpenAI

from app.config.settings import settings
from app.llm.base import AbstractLLMProvider


from pydantic import SecretStr

class OpenRouterProvider(AbstractLLMProvider):

    def __init__(self):

        self.llm = ChatOpenAI(
            model=settings.LLM_MODEL,
            api_key=SecretStr(settings.LLM_API_KEY) if settings.LLM_API_KEY else None, # type: ignore
            base_url="https://openrouter.ai/api/v1",
            temperature=0,
        )

    def invoke(self, prompt: str) -> str:

        response = self.llm.invoke(prompt)

        return str(response.content)

    def invoke_structured(self, prompt: str, schema: Any) -> Any:
        if hasattr(self.llm, "with_structured_output"):
            try:
                structured_llm = self.llm.with_structured_output(schema)
                return structured_llm.invoke(prompt)
            except NotImplementedError:
                pass
        
        # Graceful fallback: return empty schema if structured output is not supported
        from app.core.logger import logger
        logger.warning(f"Structured output not supported natively by OpenRouter model {settings.LLM_MODEL}. Returning empty schema.")
        return schema()

    def get_llm(self):

        return self.llm