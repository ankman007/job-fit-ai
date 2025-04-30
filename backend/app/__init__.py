from fastapi import FastAPI
from dotenv import load_dotenv

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
    
    Base.metadata.create_all(bind=engine)
    
    from app.routes.auth import router as auth_router
    app.include_router(auth_router, prefix='/auth')
    
    from app.routes.cheatsheet import router as service_router
    app.include_router(service_router, prefix='/service')
    
    from app.routes.users import router as users_route
    app.include_router(users_route, prefix='/users')
    
    return app