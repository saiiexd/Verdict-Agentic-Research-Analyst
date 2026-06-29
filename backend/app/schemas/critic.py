from pydantic import BaseModel, Field


class CriticReport(BaseModel):
    overall_score: int = Field(
        ge=1,
        le=10,
        description="Overall quality score for the report."
    )

    strengths: list[str] = Field(
        description="Strong aspects of the report."
    )

    weaknesses: list[str] = Field(
        description="Weaknesses or missing information."
    )

    hallucination_risk: str = Field(
        description="Assessment of unsupported or speculative claims."
    )

    recommendation: str = Field(
        description="Concrete recommendations to improve the report."
    )