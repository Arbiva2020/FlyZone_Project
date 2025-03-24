from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .users import get_db
from models import Level, User, Mission, Map
from typing import List

router = APIRouter(
    prefix='/game_data',
    tags=['game_data']
)

# Pydantic model to validate incoming data
class LevelCreate(BaseModel):
    id: int
    level_level: int
    user_id: int
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
    night_vision: bool
    trees: int
    birds: int
    battery_usage: int

# Pydantic model for response
class LevelResponse(BaseModel):
    id: int
    level_level: int
    user_id: int
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
    night_vision: bool
    trees: int
    birds: int
    battery_usage: int

    class Config:
        from_attributes = True

@router.get("/", response_model=List[LevelResponse])
async def get_all_levels(db: Session = Depends(get_db)):
    try:
        levels = db.query(Level).all()
        return levels
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", status_code=200)
async def record_level(data: LevelCreate, db: Session = Depends(get_db)):
    try:
        # Retrieve related objects from the database using the provided IDs
        user = db.query(User).filter(User.id == data.user_id).first()
        if not user:
            print(f"User not found with ID: {data.user_id}")
            raise HTTPException(status_code=404, detail=f"User not found with ID: {data.user_id}")

        mission = db.query(Mission).filter(Mission.id == data.mission_id).first()
        if not mission:
            print(f"Mission not found with ID: {data.mission_id}")
            raise HTTPException(status_code=404, detail=f"Mission not found with ID: {data.mission_id}")

        basemap = db.query(Map).filter(Map.id == data.basemap_id).first()
        if not basemap:
            print(f"Basemap not found with ID: {data.basemap_id}")
            raise HTTPException(status_code=404, detail=f"Basemap not found with ID: {data.basemap_id}")

        new_data = Level(
            level_level=data.level_level,
            user_id=data.user_id, 
            fog_level=data.fog_level,
            brightness_level=data.brightness_level,
            wind_level=data.wind_level,
            close_calls=data.close_calls,
            spotted=data.spotted,
            time_to_finish=data.time_to_finish,
            mission_id=data.mission_id,  
            basemap_id=data.basemap_id,  
            difficulty_level=data.difficulty_level,
            connection_lost=data.connection_lost,
            payload=data.payload,
            dust=data.dust,
            night_vision=data.night_vision,
            trees=data.trees,
            birds=data.birds,
            battery_usage=data.battery_usage
        )
        
        db.add(new_data)
        db.commit()
        db.refresh(new_data)
        
        return {"message": "Game data received", "data": new_data}

    except Exception as e:
        db.rollback()
        print(f"Error: {str(e)}")
        print(f"Error type: {type(e)}")
        raise HTTPException(status_code=500, detail=str(e))
