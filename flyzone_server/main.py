import os
import logging
import uvicorn
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi import FastAPI, HTTPException, Depends, Query, status, Path
from fastapi.middleware.cors import CORSMiddleware
from typing import Union, Annotated, List, Optional
from sqlalchemy.orm import Session
# pydantic allowes validation of the data, and BaseModel is for the object comming in
from pydantic import BaseModel, Field, EmailStr
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta, datetime
from pytz import timezone
from models import User, Level, Base
import models
# from database import SessionLocal, engine
from database import engine
from starlette import status
# from routers import auth, simulation, admin, users
from routers import auth, simulation, admin, users, game_data


load_dotenv('.env')


app = FastAPI(
    title = "FlyZone API",
    description = "A service for data collection of user preformance in the FlyZone VR platform",
    docs_url = "/",
    debug=True
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")



# our react application and our fastAPI aplication are located at the same place, obviasly. the origin of the React app. port 3000
#is the port from which one application can call the fastAPI application:
origins = [
    'http://localhost:5173', 
    'http://OurProductionDomain.com', 
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("creating tables")

models.Base.metadata.create_all(bind=engine)
Base.metadata.create_all(bind=engine)


@app.get("/healthy")
def health_check():
    return {'status':'Healthy'}

app.include_router(auth.router)
app.include_router(simulation.router)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(game_data.router)

# def verify_password(plain_password, hashed_password):
# return pwd_context.verify(plain_password, hashed_password)




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)