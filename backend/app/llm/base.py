from abc import ABC, abstractmethod
from typing import TypeVar, Type, Any

T = TypeVar('T')


class AbstractLLMProvider(ABC):

    @abstractmethod
    def invoke(self, prompt: str) -> str:
        """
        Invoke the language model.
        """
        pass

    @abstractmethod
    def invoke_structured(self, prompt: str, schema: Type[T]) -> T:
        """
        Invoke the language model and return structured output matching the schema.
        Graceful fallback should be implemented if not natively supported.
        """
        pass

    @abstractmethod
    def get_llm(self) -> Any:
        """
        Return the underlying LangChain model.
        """
        pass