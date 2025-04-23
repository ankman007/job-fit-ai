from jose import jwt, JWTError
from loguru import logger
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from os import getenv

load_dotenv()

SECRET_KEY = getenv('SECRET_KEY')
ALGORITHM = getenv('ALGORITHM')
# ACCESS_TOKEN_EXPIRE_MINUTES = getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
ACCESS_TOKEN_EXPIRE_MINUTES = 90

def create_token(data: dict):
    to_encode = data.copy() 
    
    expiry_date = datetime.now(timezone.utc) + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expiry_date})
    
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def validate_token(token: str):
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])    
        return payload
    except JWTError as error:
        logger.error(f"Unable to validate token: {error}")
        return None