from abc import ABC, abstractmethod

class AbstractLLMProvider(ABC):
    """
    Abstract base class for all LLM providers.
    """

    @abstractmethod
    def get_llm(self):
        """
        Returns the configured LangChain LLM instance.
        """
        pass
