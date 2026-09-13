from pydantic import BaseModel, Field


class JobDescriptionRequest(BaseModel):
    resume_id: int
    job_description: str = Field(
        min_length=20,
        max_length=20000
    )


class SkillRecommendation(BaseModel):
    skill: str
    recommendation: str


class AnalysisResponse(BaseModel):
    resume_id: int
    filename: str
    resume_skills: list[str]
    required_skills: list[str]
    matched_skills: list[str]
    missing_skills: list[str]
    match_score: float
    recommendations: list[SkillRecommendation]