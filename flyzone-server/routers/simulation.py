import os
import logging
import uvicorn
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi import APIRouter, HTTPException, Depends, Query, status, Path
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
from models import User, Level
import models
from database import SessionLocal
from starlette import status
from .auth import get_current_user

load_dotenv('.env')


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# our react application and our fastAPI aplication are located at the same place, obviasly. the origin of the React app. port 3000
#is the port from which one application can call the fastAPI application:
origins = [
    'http://localhost:5173', 
    'http://OurProductionDomain.com', 
]

# app.add_middleware(
#     CORSMiddleware, 
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# creating the db dependencies:
# the db will open when a request comes in, and closes when the request is complete. 
# the "finally" runs after the data was delivered. 
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


# There could be tests without certain values. hence, we could either define these values as Optional
# for example: "radius: Ooptionl[int] = None, or create a function that saves the data no matter what 
# we already have. 

# creating the pydantic model to validate the requests from the react application:
class UserLoginBase(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    password: str = Field(..., min_length=8)
    email: EmailStr
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
    number_of_failures: int
    straight_failures: int
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
        company_name: str = Field(min_length=2)
        avatar: str

class MapBase(BaseModel):
    map_name: str
    map_img: str
    map_popularity: int
    map_characteristics: str
    map_description: str
    # map_description: str = Field(min_length=5, max_length=100)
    map_additional_data: str

class MissionBase(BaseModel):
    mission_name: str
    mission_popularity: int
    mission_characteristics: str
    mission_description: str
    mission_additional_data: str

class FogBase(BaseModel):
    fog_level: int = Field(gt=0, lt=6)
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
    user: int
    fog_level: int
    brightness_level: int
    wind_level: int
    close_calls: int
    spotted: int
    time_to_finish: int
    mission_id: int
    basemap_id: int
    difficulty_level: int
    connection_lost: int
    payload: int
    dust: int
    night_vision: int
    trees: int
    birds: int
    battery_usage: int

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
    connection_lost: int
    payload: int
    dust: int
    night_vision: int
    trees: int
    birds: Optional[int] = Field(description="birds is not needed on create", default=None)
    battery_usage: int
 
# For pre-populating keys, we can use "model_config". maybe we could use this to pre-populate each one of
# the objects with data from Unity. 


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



# create dependency injection for our API endpoints:
db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
print("creating tables")
# When the FastAPI app is created, the db create the tables automatically.
# The: models.Base.metadata.create_all(bind=engine) will only run once, to create the flyzone.db file. 
# if we want to change someting in our database, it is best to delete the flyzone.db file and run the server again -
# that if you dont work with the DB browser for sqlite.



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
    print("Creating user with hashed password: {hashed_password}") 
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

@router.post("/register",  response_model=UserModel)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    print("Received user registration:", user)
    db_user = get_user_by_username(db, username=user.username)
    print("##########", db_user)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    print("################", create_user(db, user))
    return create_user(db, user)


# def authenticate_user(username: str, password: str, db: Session):
#     user = db.query(User).filter(User.username == username).first()
#     print("#??#- Auth", username)
#     if not user:
#         print("User not found - Auth failed", username)
#         return False
#     if not pwd_context.verify(password, user.password):
#         print("Password does not match - Auth failed")
#         return False
#     print("???????????- Auth",user)
#     return user



# def create_access_token(data:dict, expires_delta: timedelta | None=None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.now(timezone.utc) + expires_delta
#     else:
#         expire = datetime.now(timezone.utc) + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt



# @router.post("/token", response_model=dict)
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     print("Received data:", form_data)
#     user = authenticate_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


# def verify_token(token: str = Depends(oauth2_scheme)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise HTTPException(status_code=403, detail="Token is invalid or expired")
#         return payload
#     except JWTError:
#         raise HTTPException(status_code=403, detail="Token is invalid or expired")




## check why route is failing!!!!!!!
@router.post("/login/", response_model=UserLoginModel)
async def login_user(user:UserLoginBase, db: db_dependency):
    print(user)
    try:
        db_user=models.User(**user.dict())
        db.query(db_user).filter(UserLoginBase.username == user.username and UserLoginBase.password == user.password).first()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


## working
@router.post("/users/", response_model=UserModel)
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
    

## working    
@router.get("/users/{user_id}")
async def get_user_by_id(user_id: int, db: db_dependency):
    print(f"Querying user with ID: {user_id}")  
    user = db.query(models.User).filter(models.User.id == user_id).first()
    print(f"Found user: {user}") 
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

    

@router.post("/groups/", response_model=GroupModel)
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
    

@router.post("/companies/", response_model=CompanyModel)
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
    
## working   
@router.get("/companies/", response_model=List[CompanyModel])
async def read_companies(db:db_dependency, skip: int=0, limit: int = 100):
    companies = db.query(models.Company).offset(skip).limit(limit).all()
    return companies

    
## working
@router.post("/maps/", response_model=MapModel)
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
    
@router.post("/maps/", response_model=MapModel, status_code=status.HTTP_201_CREATED)
async def create_new_map(map: MapBase, user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    try:
        db_map = models.Map(**map.dict(), owner_id=user.get('id'))
        db.add(db_map)
        db.commit()
        db.refresh(db_map)
        return db_map
    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail=str(e))


## working
@router.get("/maps/", response_model=List[MapModel])
async def read_maps(db:db_dependency, skip: int=0, limit: int = 100):
    maps = db.query(models.Map).offset(skip).limit(limit).all()
    return maps


## working
@router.get("/maps/{map_popularity}", response_model=List[MapModel])
async def read_maps(db:db_dependency, map_popularity:int = Path(gt=2)):
    maps = db.query(models.Map).filter(models.Map.map_popularity >= map_popularity).all()
    return maps
    
    
## working  
@router.get("/users/{user_username}")
async def read_user(user_username: str, db: db_dependency):
    user = db.query(models.User).filter(models.User.username == user_username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user 
 

## working 
@router.get("/maps/{map_map_name}")
async def get_map_my_name(map_map_name: str, db: db_dependency):
    map = db.query(models.Map).filter(models.Map.map_name == map_map_name).first()
    if map is None:
        raise HTTPException(status_code=404, detail="Map not found")
    return map



@router.get("/maps/{map_id}")
async def get_map_by_id(map_id: int, db: db_dependency):
    print(f"Querying map with ID: {map_id}")
    map = db.query(models.Map).filter(models.Map.id == map_id).first()
    print(f"Found map: {map}")
    if map is None:
        raise HTTPException(status_code=404, detail="Map not found")
    return map   


## working  
@router.get("/users/", response_model=List[UserModel])
async def read_users(db:db_dependency, skip: int=0, limit: int = 100):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users


## working  
@router.get("/groups/", response_model=List[GroupModel])
async def read_all_groups(db:db_dependency, skip: int=0, limit: int = 100):
    groups = db.query(models.Group).offset(skip).limit(limit).all()
    return groups


## working
@router.get("/users/{user_id}")
async def read_user_by_id(user_id: int, db: db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user 


@router.get("/return_users_by_score/", response_model=List[UserModel])
async def read_user_by_total_score(total_score: int, db: Session=Depends(get_db)):
    users = db.query(User).filter(User.total_score == total_score).all()
    if not users:
        raise HTTPException(status_code=404, detail="No users found with the specified total_score")
    return users


@router.patch("/users/{user_id}")
async def update_user_by_id(user_id: int, user_name: str):
    return {"user_name": user_name, "user_id": user_id}



@router.put("/users/{user_id}", response_model=UserCreate)
async def update_user(user_id: int, updated_user: UserCreate, db: Session = Depends(get_db)):
    # Query the user by ID
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update the fields dynamically
    for field, value in updated_user.dict(exclude_unset=True).items():
        setattr(user, field, value)

    # Commit the changes to the database
    db.commit()
    db.refresh(user)

    return user


# Updating a new level and switch its automatic values with these the admin decided upon:
@router.put("/levels/{level_id}", response_model=LevelModel)
async def update_level(level_id: int, updated_level: LevelBase, db: Annotated[Session, Depends(get_db)]):
    level_entry = db.query(Level).filter(Level.id == level_id).first()
    if not level_entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Level entry not found")
    # Update fields from the input LevelBase model
    for field, value in updated_level.dict(exclude_unset=True).items():
        setattr(level_entry, field, value)
    db.commit()
    db.refresh(level_entry)
    
    return level_entry 


# working
@router.delete("/users/{user_first_name}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_by_firstname(user_first_name: str, db: db_dependency):
    user = db.query(models.User).filter(models.User.first_name == user_first_name).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()  

    return {"message": f"User with first name '{user_first_name}' has been deleted."}
    

@router.delete("/companies/{company_id}")
async def delete_company_by_id(company_id: int, db: db_dependency):
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if company is None:
        raise HTTPException(status_code=404, detail="User not found")
    return ("company deleted:", company) 






