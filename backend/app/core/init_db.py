from app.core.base import Base
from app.core.database import engine
from app.models import User


def init_db():
    Base.metadata.create_all(bind=engine)