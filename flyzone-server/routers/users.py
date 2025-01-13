import os
import logging
import uvicorn
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi import APIRouter, HTTPException, Depends, Query, status, Path
from fastapi.middleware.cors import CORSMiddleware
from typing import Union, Annotated, List, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, EmailStr
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta, datetime
from pytz import timezone
from models import User, Level, Map, Level_results
import models
from database import SessionLocal
from starlette import status
from .auth import get_current_user


router = APIRouter(
    prefix='/user',
    tags=['user']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto', default="bcrypt")


class UserVerification(BaseModel):
    password: str
    new_password: str = Field(min_length=6)



@router.get("/", status_code=status.HTTP_200_OK)
async def get_user(user:user_dependency, db:db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return db.query(User).filter(User.id == user.get('id')).first()


# Change password by user:
@router.put("/password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(user: user_dependency, db: db_dependency, user_verification: UserVerification):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    user_model = db.query(User).filter(User.id == user.get("id")).first()
    
    if not bcrypt_context.verify(user_verification.password, user_model.password):
        raise HTTPException(status_code=401, detail="Error on password change")
    user_model.password = bcrypt_context.hash(user_verification.new_password)
    db.add(user_model)
    db.commit()



