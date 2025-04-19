from fastapi import FastAPI

def create_app():
    app = FastAPI()
    
    # from app.views.auth import router as auth_router
    # app.include_router(auth_router, prefix='/auth')
    
    from app.views.service import router as service_router
    app.include_router(service_router, prefix='/service')
    
    return app