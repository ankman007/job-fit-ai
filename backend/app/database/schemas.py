from typing import Optional
from pydantic import BaseModel, EmailStr, constr

class UserSignupRequest(BaseModel):
    user_name: str
    email: EmailStr
    bio: Optional[str] = None  
    location: Optional[str] = None  
    job_title: Optional[str] = None  
    password: str

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    message: str
