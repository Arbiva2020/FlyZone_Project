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

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../flyzone_server')))

SQLALCHEMY_DATABASE_URL = 'sqlite:///./testdb.db'

# Set up test database and session
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Override the dependency to simulate a logged-in user
def override_get_current_user():
    return {'username': 'BatyaG', 'id': 3, 'first_name': 'Batya', 'last_name': 'Gal'}

app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = override_get_current_user

client = TestClient(app)

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

# Fixture to insert test level results into the database
@pytest.fixture
def test_levelResults():
    levelResults = LevelResults(
        level_level="level",
        user_id=3,
        fog_level=0,
        brightness_level=0,
        wind_level=0,
        close_calls=0,
        spotted=0,
        time_to_finish=0,
        mission_id=1,
        basemap_id=1,
        difficulty_level=0,
        connection_lost=0,
        payload=0,
        dust=0,
        night_vision=True,
        trees=0,
        birds=0,
        battery_usage=0
    )

    db = TestingSessionLocal()
    db.add(levelResults)
    db.commit()
    db.refresh(levelResults)
    yield levelResults

    with engine.connect() as connection:
        connection.execute(text("DELETE FROM levelresults;"))
        connection.commit()
        
        
def test_levelResult_read_one_authenticated_not_found():
    response = client.get("/levelResults/999")
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
        'battery_usage': 0
    }
    
    response = client.post('/levelResults/', json=request_data)
    assert response.status_code == 201
      

def test_read_all_authenticated(auth_headers, test_levelResults):
    # Check data directly in the database before calling the API
    db = TestingSessionLocal()
    results = db.query(LevelResults).all()
    assert len(results) > 0  # Ensure there's data in the database

    # Make the request with the auth header
    response = client.get("/levelResults_by_user", headers=auth_headers)
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
        'battery_usage': 0
    }]
    
    
def test_read_one_authenticated(auth_headers, test_levelResults):
    # Check data directly in the database before calling the API
    db = TestingSessionLocal()
    results = db.query(LevelResults).all()
    assert len(results) > 0  # Ensure there's data in the database

    # Make the request with the auth header
    response = client.get("/levelResults/5", headers=auth_headers)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) > 0  # Ensure the response contains data

    # Get the actual response
    response_json = response.json()
    print(f"Response JSON: {response_json}")
     # If response is not a list, handle it as a dictionary
    if isinstance(response_json, dict):
        response_json.pop('id', None)  

    expected_response = {
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
        'battery_usage': 0
    }


    # Ensure the data in the response matches the inserted data
    assert response_json == expected_response

