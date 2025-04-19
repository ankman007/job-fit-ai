from pydantic import BaseModel
from typing import List, Optional

class User(BaseModel):
    user_name: str 
    password: str 
    
class SignupUser(User):
    confirm_password: str
    