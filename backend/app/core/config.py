from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "SkillForge API"
    debug: bool = True


settings = Settings()