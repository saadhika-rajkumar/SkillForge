from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies.auth import get_current_user
from app.core.database import get_db
from app.models.resume import Resume
from app.models.user import User
from app.schemas.analysis import (
    AnalysisResponse,
    JobDescriptionRequest,
)
from app.services.skill_analyzer import (
    analyze_resume_against_job,
)


router = APIRouter(
    prefix="/analysis",
    tags=["Skill Analysis"]
)


@router.post(
    "/job-match",
    response_model=AnalysisResponse
)
def analyze_job_match(
    request: JobDescriptionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == request.resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    result = analyze_resume_against_job(
        resume.extracted_text,
        request.job_description
    )

    return {
        "resume_id": resume.id,
        "filename": resume.filename,
        **result
    }