from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central application configuration.
    """

    APP_NAME: str = "Verdict API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Search
<<<<<<< HEAD
    TAVILY_API_KEY: str

    # LLM
    LLM_PROVIDER: str
    LLM_MODEL: str
    LLM_API_KEY: str
=======
    TAVILY_API_KEY: str = ""

    # LLM
    LLM_PROVIDER: str = "gemini"
    LLM_MODEL: str = "gemini-2.5-pro"
    LLM_API_KEY: str = ""
>>>>>>> bc7f3ac (Continue Verdict v1.0 development)

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()