from fastapi import APIRouter
from pydantic import BaseModel
from models import User, Level
from passlib.context import CryptContext
from passlib.handlers.bcrypt import bcrypt
import models
from database import SessionLocal
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends, Query, status, Path
from typing import Union, Annotated, List, Optional
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter()

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto', default="bcrypt")
print(bcrypt_context.schemes())

class CreateUserRequest(BaseModel):
    security_level: int
    username: str
    first_name: str
    last_name: str
    password: str
    email: str
    level: int
    next_level: int
    mmr: int
    badges: int
    total_assessments: int
    number_of_failures: int
    straight_failures: int
    assessment_overdue: bool
    total_score: int
    company_id: int
    group_id: int
    profileImguser: str
    
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]
    
def authenticate_user(username: str, password: str, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return True
  

class UserModel(CreateUserRequest):
    id: int

@router.post("/auth", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model = User(
        security_level= create_user_request.security_level,
        username = create_user_request.username,
        first_name = create_user_request.first_name,
        last_name = create_user_request.last_name,
        password = bcrypt_context.hash(create_user_request.password),
        email = create_user_request.email,
        level = create_user_request.level, 
        next_level = create_user_request.next_level,
        mmr = create_user_request.mmr, 
        badges = create_user_request.badges,
        total_assessments = create_user_request.total_assessments, 
        number_of_failures = create_user_request.number_of_failures,
        straight_failures = create_user_request.straight_failures,
        assessment_overdue = create_user_request.assessment_overdue,
        total_score = create_user_request.total_score,
        company_id = create_user_request.company_id, 
        group_id = create_user_request.group_id,
        profileImguser = create_user_request.profileImguser
    )
    db.add(create_user_model)
    db.commit()


@router.post("/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], 
                                 db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        return 'Failed Authentication'
    return 'Successful Authentication'