import os
import logging
import uvicorn
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi import FastAPI, HTTPException, Depends, Query, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Union, Annotated, List, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta, datetime
from pytz import timezone

import models
from database import SessionLocal, engine

load_dotenv('.env')


app = FastAPI(
    title = "FlyZone API",
    description = "A service for data collection of user preformance in the FlyZone VR platform",
    # docs_url = "/",
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


# creating the db dependencies:
# the db will open when a request comes in, and closes when the request is complete. 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# To hash the password in the future:
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# JWT secret and algorithm
SECRET_KEY = "09m25y094sec6re2556t818166k7e9563y93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# creating the pydantic model to validate the requests from the react application:
class UserLoginBase(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    email: str
    company_id: int
    group_id: int
    profileImguser: str 

class UserBase(BaseModel):
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
    number_of_failurs: int
    straight_failurs: int
    assessment_overdue: bool
    total_score: int
    company_id: int
    group_id: int
    profileImguser: str

class GroupBase(BaseModel):
     group_numbers: int
     avg_score: int
     avatar: str
     users_avg_score: int

class CompanyBase(BaseModel):
        company_name: str
        avatar: str

class MapBase(BaseModel):
    map_name: str
    map_img: str
    map_popularity: int
    map_characteristics: str
    map_description: str
    map_additional_data: str

class MissionBase(BaseModel):
    mission_name: str
    mission_popularity: int
    mission_characteristics: str
    mission_description: str
    mission_additional_data: str

class FogBase(BaseModel):
    fog_level: int
    fog_radius: int
    fog_density: int
    fog_duration: int
    fog_coefficient: int

class WindBase(BaseModel):
    wind_level: int
    wind_radius: int
    wind_density: int
    wind_duration: int
    wind_diraction: int
    wind_coefficient: int

class BrightnessBase(BaseModel):
    brightness_level: int
    brightness_duration: int
    brightness_coefficient: int

class SpottedBase(BaseModel):
    spotted_number: int

class LevelBase(BaseModel):
    level_level: int
    user_id: int
    fog_level: int
    brightness_level: int
    wind_level: int
    close_calls: int
    spoted: int
    time_to_finish: int
    mission_id: int
    basemap_id: int
    difficulty_level: int

class Level_resultsBase(BaseModel):
    level_level: int
    user_id: int
    fog_level: int
    brightness_level: int
    wind_level: int
    close_calls: int
    spoted: int
    time_to_finish: int
    mission_id: int
    basemap_id: int
    difficulty_level: int 



    # to validate therequests from our React application:

class UserLoginModel(UserLoginBase):
    id: int

class UserCreate(UserCreate):
    id: int

class UserModel(UserBase):
    id: int

class GroupModel(GroupBase):
    id: int

class CompanyModel(CompanyBase):
    id: int

class MapModel(MapBase):
    id: int

class MissionModel(MissionBase):
    id: int

class FogModel(FogBase):
    id: int

class WindModel(WindBase):
    id: int

class BrightnessModel(BrightnessBase):
    id: int

class SpottedModel(SpottedBase):
    id: int

class LevelModel(LevelBase):
    id: int

class Level_resultsModel(Level_resultsBase):
    id: int
    
    
    class Config:
        orm_mode = True



# create dependency injection:
db_dependency = Annotated[Session, Depends(get_db)]


# when the FastAPI app is created, the db create the tables automatically
models.Base.metadata.create_all(bind=engine)

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)



def verify_password(plain_password, hashed_password):
    print(f"Verifying password: {plain_password} with hashed: {hashed_password}")
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_username(db: Session, username: str):
    print("$$$$$$$$", User)
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    print("Creating user with hashed password: {hashed_password}")  # Debug statement
    db_user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        password=hashed_password,  # Store the hashed password
        email=user.email,
        company_id=user.company_id,
        group_id=user.group_id,
        profileImguser=user.profileImguser
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    # return "complete"



#creating the endpoints for our application:

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    print("####")
    db_user = get_user_by_username(db, username=user.username)
    print("##########", db_user)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    print("################", create_user(db, user))
    return create_user(db, user)


def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    print("#??#- Auth", username)
    if not user:
        print("User not found - Auth failed", username)
        return False
    if not pwd_context.verify(password, user.password):
        print("Password does not match - Auth failed")
        return False
    print("???????????- Auth",user)
    return user


# def authenticate_user(username: str, password: str, db: Session):
#     user = get_user_by_username(db, username)
#     print("!!!!!!!!!!!!", username)
#     if not user:
#         print("User not found", username)
#         return False
#     if not verify_password(password, user.password):
#         print("Password does not match")
#         return False
#     print("User authenticated")
#     return user


def create_access_token(data:dict, expires_delta: timedelta | None=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# @app.post("/token")
# def login_for_access_token(form_data: OAuth2PasswordRequestForm=Depends(), db: Session=Depends(get_db)):
#     user= authenticate_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, 
#             detail="Incorrect username or password", 
#             headers={"WWW-Authenticate":"Bearer"}
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token":access_token, "token_type":"bearer"}

@app.post("/token", response_model=dict)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")
    
# @app.get("/verify-token/{token}")
# async def verify_user_token(token: str):
#     verify_token(token=token)
#     return {"message":"Token is valid"}
    




## check why route is failing!!!!!!!
@app.post("/login/", response_model=UserLoginModel)
async def login_user(user:UserLoginBase, db: db_dependency):
    print(user)
    try:
        db_user=models.User(**user.dict())
        db.query(db_user).filter(UserLoginBase.username == user.username and UserLoginBase.password == user.password).first()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/users/", response_model=UserModel)
async def create_user(user: UserBase, db: db_dependency):
    try:
        db_user = models.User(**user.dict())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/groups/", response_model=GroupModel)
async def create_group(group: GroupBase, db: db_dependency):
    try:
        db_group = models.Group(**group.dict())
        db.add(db_group)
        db.commit()
        db.refresh(db_group)
        return db_group
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/companies/", response_model=CompanyModel)
async def create_company(company: CompanyBase, db: db_dependency):
    try:
        db_company = models.Company(**company.dict())
        db.add(db_company)
        db.commit()
        db.refresh(db_company)
        return db_company
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/maps/", response_model=MapModel)
async def create_map(map: MapBase, db: db_dependency):
    try:
        db_map = models.Map(**map.dict())
        db.add(db_map)
        db.commit()
        db.refresh(db_map)
        return db_map
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@app.get("/users/", response_model=List[UserModel])
async def read_users(db:db_dependency, skip: int=0, limit: int = 100):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users


@app.put("/users/{user_id}")
async def update_user(user_id: int, user_name: str):
    return {"user_name": user_name, "user_id": user_id}

@app.delete('/users/{user_id}')
async def delete_user_by_id(user_id):
    pass





# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

# @app.get('/users')
# async def get_all_users():
#     pass

# @app.post('/users')
# async def create_user():
#     pass

# @app.get('/users/{user_id}')
# async def get_user_by_id(user_id):
#     pass

# @app.patch('/users/{user_id}')
# async def update_user_by_id(user_id):
#     pass

# @app.delete('/users/{user_id}')
# async def delete_user_by_id(user_id):
#     pass




# @app.post("/users/", response_model=SchemaUser)
# async def create_user(user: SchemaUser, db: db_dependency):
#     db_user=models.User(**user.model_dump())
#     db.add(db_user)
#     db.commit()
#     db.refresh(db-user)
#     return db_user


# @app.post("/users/", response_model=UserModel)
# def create_user(user: UserBase, db: db_dependency):
#     db_user = models.User(**user.dict())
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


# @app.post("/users/", response_model=SchemaUser)
# async def create_user(user: SchemaUser, db:db_dependency):
#     db_user = models.User(**user.dict())
#     db.add(db_user)
#     db.commit() 
#     db.refresh(db_user)
#     return db_user


# @app.get("/users/{user_id}")
# async def read_users(user_id:int):
#     return {"user_id": user_id}


# @app.get("/users", response_model=List[UserModel])
# async def read_users(db: db_dependency, skip: int=0, limit: int=100):
#     users = db.query(models.User).offset(skip).limit(limit).all()
#     return users 


# @app.get("/users/")
# async def read_users(q: Annotated[str | None, Query(max_length=50)] = None):
#     results = {"users": [{"user_id": "Foo"}, {"user_id": "Bar"}]}
#     if q:
#         results.update({"q": q})
#     return results


# @app.put("/users/{user_id}")
# async def update_user(user_id: int, user_name: str):
#     return {"user_name": user_name, "user_id": user_id}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)