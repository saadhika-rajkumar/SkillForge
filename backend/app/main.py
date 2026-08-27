from fastapi import FastAPI
from app.api.routes.health import router as health_router

app = FastAPI(title="SkillForge API")

app.include_router(health_router)


@app.get("/")
def root():
    return {"message": "Welcome to SkillForge API"}