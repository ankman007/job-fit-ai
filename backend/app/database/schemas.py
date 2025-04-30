from typing import Optional
from pydantic import BaseModel, EmailStr, constr

class UserSignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    bio: Optional[str] = None  
    location: Optional[str] = None  
    job_title: Optional[str] = None  

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    message: str
