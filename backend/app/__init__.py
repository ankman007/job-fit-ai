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
        allow_origins=["http://localhost:3000", "https://job-fit-ai.vercel.app"],  
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    Base.metadata.create_all(bind=engine)
    
    from app.routes.auth import router as auth_router
    app.include_router(auth_router, prefix='/auth')
    
    from app.routes.cheatsheet import router as cheatsheet_router
    app.include_router(cheatsheet_router, prefix='/cheatsheet')
    
    from app.routes.user import router as user_route
    app.include_router(user_route, prefix='/user')
    
    return app