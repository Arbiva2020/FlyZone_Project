from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Dict, Any
from .users import get_db
from models import Level, User, Mission, Map, LevelResults
from pydantic import BaseModel
from datetime import datetime


router = APIRouter(
    prefix='/analytics',
    tags=['analytics']
)

# Pydantic models for response
class UserAnalytics(BaseModel):
    user_id: int
    total_levels: int
    average_time: float
    average_score: float
    completion_rate: float
    most_played_mission: int
    most_played_map: int

class MissionAnalytics(BaseModel):
    mission_id: int
    total_attempts: int
    average_time: float
    average_score: float
    completion_rate: float
    average_difficulty: float

class MapAnalytics(BaseModel):
    map_id: int
    total_attempts: int
    average_time: float
    average_score: float
    completion_rate: float
    average_difficulty: float

# Add new Pydantic model for LevelResults
class LevelResultsCreate(BaseModel):
    level_level: str
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

@router.get("/user/{user_id}", response_model=UserAnalytics)
async def get_user_analytics(user_id: int, db: Session = Depends(get_db)):
    try:
        # Get user's levels
        user_levels = db.query(Level).filter(Level.user_id == user_id).all()
        
        if not user_levels:
            raise HTTPException(status_code=404, detail="No data found for this user")
        
        # Calculate analytics
        total_levels = len(user_levels)
        total_time = sum(level.time_to_finish for level in user_levels)
        average_time = total_time / total_levels if total_levels > 0 else 0
        
        # Calculate score based on various factors
        scores = []
        for level in user_levels:
            # Example scoring formula (adjust based on your needs)
            score = (
                (120 - level.time_to_finish) * 0.4 +  # Time component
                (120 - level.close_calls) * 0.3 +     # Safety component
                (120 - level.spotted) * 0.3          # Stealth component
            )
            scores.append(score)
        
        average_score = sum(scores) / len(scores) if scores else 0
        
        # Get most played mission and map
        mission_counts = {}
        map_counts = {}
        for level in user_levels:
            mission_counts[level.mission_id] = mission_counts.get(level.mission_id, 0) + 1
            map_counts[level.basemap_id] = map_counts.get(level.basemap_id, 0) + 1
        
        most_played_mission = max(mission_counts.items(), key=lambda x: x[1])[0]
        most_played_map = max(map_counts.items(), key=lambda x: x[1])[0]
        
        return {
            "user_id": user_id,
            "total_levels": total_levels,
            "average_time": round(average_time, 2),
            "average_score": round(average_score, 2),
            "completion_rate": 1.0,  # Since we're only storing completed levels
            "most_played_mission": most_played_mission,
            "most_played_map": most_played_map
        }
        
    except Exception as e:
        print(f"Error calculating user analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/mission/{mission_id}", response_model=MissionAnalytics)
async def get_mission_analytics(mission_id: int, db: Session = Depends(get_db)):
    try:
        # Get all levels for this mission
        mission_levels = db.query(Level).filter(Level.mission_id == mission_id).all()
        
        if not mission_levels:
            raise HTTPException(status_code=404, detail="No data found for this mission")
        
        # Calculate analytics
        total_attempts = len(mission_levels)
        total_time = sum(level.time_to_finish for level in mission_levels)
        average_time = total_time / total_attempts if total_attempts > 0 else 0
        
        # Calculate scores
        scores = []
        difficulties = []
        for level in mission_levels:
            score = (
                (120 - level.time_to_finish) * 0.4 +
                (120 - level.close_calls) * 0.3 +
                (120 - level.spotted) * 0.3
            )
            scores.append(score)
            difficulties.append(level.difficulty_level)
        
        average_score = sum(scores) / len(scores) if scores else 0
        average_difficulty = sum(difficulties) / len(difficulties) if difficulties else 0
        
        return {
            "mission_id": mission_id,
            "total_attempts": total_attempts,
            "average_time": round(average_time, 2),
            "average_score": round(average_score, 2),
            "completion_rate": 1.0,
            "average_difficulty": round(average_difficulty, 2)
        }
        
    except Exception as e:
        print(f"Error calculating mission analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/map/{map_id}", response_model=MapAnalytics)
async def get_map_analytics(map_id: int, db: Session = Depends(get_db)):
    try:
        # Get all levels for this map
        map_levels = db.query(Level).filter(Level.basemap_id == map_id).all()
        
        if not map_levels:
            raise HTTPException(status_code=404, detail="No data found for this map")
        
        # Calculate analytics
        total_attempts = len(map_levels)
        total_time = sum(level.time_to_finish for level in map_levels)
        average_time = total_time / total_attempts if total_attempts > 0 else 0
        
        # Calculate scores
        scores = []
        difficulties = []
        for level in map_levels:
            score = (
                (120 - level.time_to_finish) * 0.4 +
                (120 - level.close_calls) * 0.3 +
                (120 - level.spotted) * 0.3
            )
            scores.append(score)
            difficulties.append(level.difficulty_level)
        
        average_score = sum(scores) / len(scores) if scores else 0
        average_difficulty = sum(difficulties) / len(difficulties) if difficulties else 0
        
        return {
            "map_id": map_id,
            "total_attempts": total_attempts,
            "average_time": round(average_time, 2),
            "average_score": round(average_score, 2),
            "completion_rate": 1.0,
            "average_difficulty": round(average_difficulty, 2)
        }
        
    except Exception as e:
        print(f"Error calculating map analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add new endpoint for processing LevelResults and creating Level
@router.post("/process-level-results", response_model=Dict[str, Any])
async def process_level_results(results: LevelResultsCreate, db: Session = Depends(get_db)):
    try:
        # 1. Create LevelResults record
        level_results = LevelResults(
            level_level=results.level_level,
            user_id=results.user_id,
            fog_level=results.fog_level,
            brightness_level=results.brightness_level,
            wind_level=results.wind_level,
            close_calls=results.close_calls,
            spotted=results.spotted,
            time_to_finish=results.time_to_finish,
            mission_id=results.mission_id,
            basemap_id=results.basemap_id,
            difficulty_level=results.difficulty_level,
            connection_lost=results.connection_lost,
            payload=results.payload,
            dust=results.dust,
            night_vision=results.night_vision,
            trees=results.trees,
            birds=results.birds,
            battery_usage=results.battery_usage
        )
        db.add(level_results)
        db.commit()
        db.refresh(level_results)

        # 2. Calculate new Level parameters based on results
        # game-specific logic
        # if player did well, increase difficulty
        # If player struggled, decrease difficulty
        new_difficulty = calculate_new_difficulty(results)
        new_fog = calculate_new_fog(results)
        new_brightness = calculate_new_brightness(results)
        new_wind = calculate_new_wind(results)
        
        # 3. Create new Level record
        new_level = Level(
            level_level=int(results.level_level) + 1,  
            user_id=results.user_id,
            fog_level=new_fog,
            brightness_level=new_brightness,
            wind_level=new_wind,
            close_calls=0,  
            spotted=0,      
            time_to_finish=0,  
            mission_id=results.mission_id,
            basemap_id=results.basemap_id,
            difficulty_level=new_difficulty,
            connection_lost=0,  
            payload=0,  
            dust=0,  
            night_vision=results.night_vision,  
            trees=results.trees,  
            birds=results.birds,  
            battery_usage=0  
        )
        db.add(new_level)
        db.commit()
        db.refresh(new_level)

        return {
            "message": "Level results processed and new level created",
            "level_results_id": level_results.id,
            "new_level": {
                "id": new_level.id,
                "level_level": new_level.level_level,
                "difficulty_level": new_level.difficulty_level,
                "fog_level": new_level.fog_level,
                "brightness_level": new_level.brightness_level,
                "wind_level": new_level.wind_level,
                "night_vision": new_level.night_vision,
                "trees": new_level.trees,
                "birds": new_level.birds
            }
        }

    except Exception as e:
        db.rollback()
        print(f"Error processing level results: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def calculate_new_difficulty(results: LevelResultsCreate) -> int:
    """Calculate new difficulty based on performance"""
    # Example logic:
    # If player completed quickly and with few close calls, increase difficulty
    # If player struggled, decrease difficulty
    base_difficulty = results.difficulty_level
    time_factor = 1 if results.time_to_finish < 60 else -1
    close_calls_factor = 1 if results.close_calls < 3 else -1
    spotted_factor = 1 if results.spotted < 2 else -1
    
    new_difficulty = base_difficulty + time_factor + close_calls_factor + spotted_factor
    return max(1, min(120, new_difficulty))  # Keep between 1 and 120

def calculate_new_fog(results: LevelResultsCreate) -> int:
    """Calculate new fog level based on performance"""
    # Example logic: Increase fog if player did well, decrease if they struggled
    base_fog = results.fog_level
    performance_factor = 1 if results.time_to_finish < 60 else -1
    new_fog = base_fog + (performance_factor * 10)
    return max(0, min(120, new_fog))

def calculate_new_brightness(results: LevelResultsCreate) -> int:
    """Calculate new brightness level based on performance"""
    # Example logic: Decrease brightness if player did well, increase if they struggled
    base_brightness = results.brightness_level
    performance_factor = -1 if results.time_to_finish < 60 else 1
    new_brightness = base_brightness + (performance_factor * 10)
    return max(0, min(120, new_brightness))

def calculate_new_wind(results: LevelResultsCreate) -> int:
    """Calculate new wind level based on performance"""
    # Example logic: Increase wind if player did well, decrease if they struggled
    base_wind = results.wind_level
    performance_factor = 1 if results.time_to_finish < 60 else -1
    new_wind = base_wind + (performance_factor * 10)
    return max(0, min(120, new_wind)) 