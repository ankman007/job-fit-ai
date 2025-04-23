from sqlalchemy import Integer, Column, String, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class UserModel(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)

    cheat_sheets = relationship("InterviewCheatSheetModel", back_populates="user")


class InterviewCheatSheetModel(Base):
    __tablename__ = "cheatsheets"
    
    id = Column(Integer, primary_key=True, index=True)
    resume_path = Column(String, nullable=True)
    job_description = Column(String)
    generated_at = Column(DateTime, default=datetime.now)
    content = Column(JSON)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("UserModel", back_populates="cheat_sheets")
