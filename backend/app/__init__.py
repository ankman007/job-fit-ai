from os import getenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

from app.core.middleware import LoggingAndPerformanceMiddleware

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in environment variables.")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully.")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_app():
    app = FastAPI()

    app.add_middleware(LoggingAndPerformanceMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "https://job-fit-ai.vercel.app"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    Base.metadata.create_all(bind=engine)

    from app.routes.auth import router as auth_router
    from app.routes.cheatsheet import router as cheatsheet_router
    from app.routes.user import router as user_router
    from app.routes.health import router as health_router

    app.include_router(auth_router, prefix="/auth")
    app.include_router(cheatsheet_router, prefix="/cheatsheet")
    app.include_router(user_router, prefix="/user")
    app.include_router(health_router, prefix="/health")

    return app