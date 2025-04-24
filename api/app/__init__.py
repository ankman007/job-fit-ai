from fastapi import FastAPI
from app.database import SessionLocal, Base, engine
from dotenv import load_dotenv

from app.database import SessionLocal  

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

def create_app():
    load_dotenv()
    app = FastAPI()
    
    Base.metadata.create_all(bind=engine)
    
    from app.views.auth import router as auth_router
    app.include_router(auth_router, prefix='/auth')
    
    from app.views.service import router as service_router
    app.include_router(service_router, prefix='/service')
    
    return app