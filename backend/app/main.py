from fastapi import FastAPI

app = FastAPI(title="SkillForge API")


@app.get("/")
def root():
    return {"message": "Welcome to SkillForge API"}
