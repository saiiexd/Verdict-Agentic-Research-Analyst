from abc import ABC, abstractmethod


class AbstractLLMProvider(ABC):

    @abstractmethod
    def invoke(self, prompt: str):
        """
        Invoke the language model.
        """
        pass

    @abstractmethod
    def get_llm(self):
        """
        Return the underlying LangChain model.
        """
        pass