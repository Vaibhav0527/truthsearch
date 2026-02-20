from pydantic import BaseModel, Field

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



