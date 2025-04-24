# from jose import jwt, JWTError
# from loguru import logger
# from datetime import datetime, timedelta, timezone
# from dotenv import load_dotenv
# from os import getenv
# from app import get_db
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from sqlalchemy.orm import Session

# load_dotenv()

# SECRET_KEY = getenv('SECRET_KEY')
# ALGORITHM = getenv('ALGORITHM')
# ACCESS_TOKEN_EXPIRE_MINUTES = 90

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# def create_token(data: dict):
#     to_encode = data.copy() 
    
#     expiry_date = datetime.now(timezone.utc) + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({'exp': expiry_date})
    
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id: str = payload.get("sub")
#         if user_id is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception

#     user = db.query(User).filter(User.id == user_id).first()
#     if user is None:
#         raise credentials_exception
#     return user
