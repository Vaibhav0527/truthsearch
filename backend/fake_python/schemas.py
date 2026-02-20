from pydantic import BaseModel, Field, field_validator

class FactCheckResult(BaseModel):
    verdict: str = Field(
        description="True/ False/ Misleading/ Unverified"
    )
    explanation: str = Field(
        description="Long explanation of why the verdict was given"
    )
    confidence: int = Field(
        description="Integer from 0 to 100"
    )
    sources: list[str] = Field(
        description="List of URLs used for verification"
    )

    @field_validator("confidence", mode="before")
    @classmethod
    def coerce_confidence(cls, v):
        if isinstance(v, str):
            return int(v)
        return v