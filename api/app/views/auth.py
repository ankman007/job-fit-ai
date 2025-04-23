from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database.model import UserModel
from app import get_db
from app.hashing import hash_password, verify_password
from app.token import create_token, validate_token

router = APIRouter()


@router.post('/login')
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == email).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if not verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
        
    token = create_token({"user_id": user.id})
    return {"access_token": token, "message": "Login Successful"}


@router.post('/sign-up')
def sign_up(user_name: str, email: str, password: str, db: Session = Depends(get_db)):
    existing_user = db.query(UserModel).filter(UserModel.email == email).first()
    
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already registered.")

    hashed_password = hash_password(password)
    new_user = UserModel(user_name=user_name, email=email, password=hashed_password)
    
    try: 
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User created successfully", "user_id": new_user.id}
        
    except IntegrityError:
        db.rollback()  
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Error while creating user")
    
    