import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi.testclient import TestClient
from fastapi import status
from flyzone_server.main import app
from flyzone_server.routers.simulation import get_db
from flyzone_server.routers.auth import get_current_user
import os
import sys
from passlib.context import CryptContext
from flyzone_server.models import User, LevelResults
from datetime import timedelta
from .utils import *

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../flyzone_server')))


app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = override_get_current_user


# Function to obtain access token for a user
def get_access_token():
    response = client.post("/auth/token", data={"username": "BatyaG", "password": "Batyag123!@#"})
    assert response.status_code == 200  # Ensure login was successful
    return response.json()['access_token']

# Fixture to provide authorization headers
@pytest.fixture
def auth_headers():
    token = get_access_token()
    return {"Authorization": f"Bearer {token}"}

        
        
def test_levelResult_read_one_authenticated_not_found():
    response = client.get("/simulation/levelResults/999")
    assert response.status_code == 404
    assert response.json() == {'detail': "Level not found"}
    
    
def test_create_level(test_levelResults):
    request_data={
        'level_level': "level",
        'user_id': 3,
        'fog_level': 0,
        'brightness_level': 0,
        'wind_level': 0,
        'close_calls': 0,
        'spotted': 0,
        'time_to_finish': 0,
        'mission_id': 1, 
        'basemap_id': 1,  
        'difficulty_level': 0,
        'connection_lost': 0,
        'payload': 0,
        'dust': 0,
        'night_vision': False,
        'trees': 0,
        'birds': 0,
        'battery_usage': 0,
        # 'id': 5
    }
    
    response = client.post('/simulation/levelResults/', json=request_data)
    assert response.status_code == 201
    

    
def level_results_update(test_levelResults):
    request_data={
        'level_level': "Second level",
        'user_id': 3,
        'fog_level': 1,
        'brightness_level': 1,
        'wind_level': 1,
        'close_calls': 1,
        'spotted': 0,
        'time_to_finish': 1,
        'mission_id': 1,
        'basemap_id': 1,
        'difficulty_level': 0,
        'connection_lost': 1,
        'payload': 1,
        'dust': 0,
        'night_vision': True,
        'trees': 1,
        'birds': 1,
        'battery_usage': 1,
        # 'id': 5
    }
    
    response = client.put('/simulation/levelresults/5', json=request_data)
    assert response.status_code == 204
    db = TestingSessionLocal()
    model = db.query(LevelResults).filter(LevelResults.id == 5).first()
    assert model.level_level == 'Second level'
    
    
def level_results_update_not_found(test_levelResults):
    request_data={
        'level_level': "Second level",
        'user_id': 3,
        'fog_level': 1,
        'brightness_level': 1,
        'wind_level': 1,
        'close_calls': 1,
        'spotted': 0,
        'time_to_finish': 1,
        'mission_id': 1,
        'basemap_id': 1,
        'difficulty_level': 0,
        'connection_lost': 1,
        'payload': 1,
        'dust': 0,
        'night_vision': True,
        'trees': 1,
        'birds': 1,
        'battery_usage': 1,
        # 'id': 1
    }
    
    response = client.put('/simulation/levelresults/999', json=request_data)
    assert response.status_code == 404
    assert response.json() == {'detail': 'Level results not found'}
    


def test_read_all_authenticated(auth_headers, test_levelResults):
    # Check data directly in the database before calling the API
    db = TestingSessionLocal()
    results = db.query(LevelResults).all()
    assert len(results) > 0  # Ensure there's data in the database

    # Make the request with the auth header
    response = client.get("/simulation/levelResults_by_user", headers=auth_headers)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) > 0  # Ensure the response contains data

    # Get the actual response
    response_json = response.json()
    
    # Remove 'id' field from each item in the response
    for item in response_json:
        item.pop('id', None)  

    # Expected response (adjusted for correct values)
    expected_response = [{
        'level_level': "level",
        'user_id': 3,
        'fog_level': 0,
        'brightness_level': 0,
        'wind_level': 0,
        'close_calls': 0,
        'spotted': 0,
        'time_to_finish': 0,
        'mission_id': 1, 
        'basemap_id': 1,  
        'difficulty_level': 0,
        'connection_lost': 0,
        'payload': 0,
        'dust': 0,
        'night_vision': True,
        'trees': 0,
        'birds': 0,
        'battery_usage': 0,
        # 'id': 5
    }]
    
    
def test_read_one_authenticated(auth_headers, test_levelResults):   
    # Make the request with the auth header
    response = client.get("/simulation/levelResults/5", headers=auth_headers)
    
    # Ensure that the response status code is correct
    assert response.status_code == status.HTTP_200_OK
    
    response_json = response.json()
    print(f"Response JSON: {response_json}")

    # Ensure the response data matches the updated values
    db = TestingSessionLocal()
    model = db.query(LevelResults).filter(LevelResults.id == 5).first()
    assert model is not None
    print(f"Model data after update: {model}")

    # Remove 'id' field from each item in the response
    if isinstance(response_json, dict):
        response_json.pop('id', None)

    expected_response = {
        'level_level': "Second level",
        'user_id': 3,
        'fog_level': 1,
        'brightness_level': 1,
        'wind_level': 1,
        'close_calls': 1,
        'spotted': 0,
        'time_to_finish': 1,
        'mission_id': 1,
        'basemap_id': 1,
        'difficulty_level': 0,
        'connection_lost': 1,
        'payload': 1,
        'dust': 0,
        'night_vision': True,
        'trees': 1,
        'birds': 1,
        'battery_usage': 1,
        # 'id': 5
    }

    assert response_json == expected_response
    
    
    

def test_delete_levelResults(test_levelResults):
    db = TestingSessionLocal()
    model = db.query(LevelResults).filter(LevelResults.id == 1).first()
    assert model is not None  # Ensure the record exists before deletion
    
    response = client.delete('/simulation/levelResults/1')
    assert response.status_code == 204
    model = db.query(LevelResults).filter(LevelResults.id == 1).first()
    assert model is None  # Ensure it was deleted

    

def test_delete_levelResults_not_found():
    response = client.delete('/simulation/levelResults/999')
    assert response.status_code == 404
    assert response.json() == {'detail':'Results not found'}

