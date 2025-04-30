from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from app.database import SessionLocal, Base, engine
from app.core.middleware import LoggingAndPerformanceMiddleware
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
    app.add_middleware(LoggingAndPerformanceMiddleware)
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "https://ai-job-prep.vercel.app"],  
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    Base.metadata.create_all(bind=engine)
    
    from app.routes.auth import router as auth_router
    app.include_router(auth_router, prefix='/auth')
    
    from app.routes.cheatsheet import router as cheetsheet_router
    app.include_router(cheetsheet_router, prefix='/cheetsheet')
    
    from app.routes.users import router as users_route
    app.include_router(users_route, prefix='/users')
    
    return app