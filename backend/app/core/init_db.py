from app.core.base import Base
from app.core.database import engine
from app.models import User, Resume


def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("Database initialized successfully")