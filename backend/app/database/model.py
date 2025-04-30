from sqlalchemy import Integer, Column, String, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    bio = Column(String, nullable=True)  
    location = Column(String, nullable=True) 
    job_title = Column(String, nullable=True)

    cheat_sheets = relationship("InterviewCheatSheetModel", back_populates="user")
    

class InterviewCheatSheetModel(Base):
    __tablename__ = "cheatsheets"
    
    id = Column(Integer, primary_key=True, index=True)
    resume_text = Column(String, nullable=True)
    job_description = Column(String)
    generated_at = Column(DateTime, default=datetime.now)
    content = Column(JSON)
    cheatsheet_type = Column(String)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("UserModel", back_populates="cheat_sheets")