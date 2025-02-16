import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker, declarative_base
from flyzone_server.main import app
from flyzone_server.models import User, LevelResults
from fastapi.testclient import TestClient
from ..routers.auth import bcrypt_context


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
    return {"security_level": 1, 'username': 'admin', 'id': 1, 'first_name': 'Admin', 'last_name': 'User'}

client = TestClient(app)

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
        battery_usage=0,
        # id=5
    )

    db = TestingSessionLocal()
    db.add(levelResults)
    db.commit()
    db.refresh(levelResults)
    yield levelResults

    with engine.connect() as connection:
        connection.execute(text("DELETE FROM levelresults;"))
        connection.commit()
        
        
@pytest.fixture(autouse=True)
def clean_database():
    # Reset the database before and after each test
    with engine.connect() as connection:
        # Delete from specific tables to clear the data
        connection.execute(text("DELETE FROM levelresults;"))
        connection.execute(text("DELETE FROM users;"))  # Add other tables as needed
        connection.commit()
        
    # Optionally, you can add a logging step here to see the cleanup
    print("Database cleaned")
    
    
    
@pytest.fixture
def test_user():
    user = User(
        security_level = 1,
        username = 'Batyagal',
        first_name = 'Batya',
        last_name = 'Gal',
        password = bcrypt_context.hash("Batyagal123"),
        email = 'batya@gal.com',
        level = 0,
        next_level = 0,
        mmr = 0,
        badges = 0,
        total_assessments = 0,
        number_of_failures = 0,
        straight_failures = 0,
        assessment_overdue = 0,
        total_score = 0,
        company_id = 0,
        group_id = 0,
        profileImguser = 0,
        levels = 0,
        levelResults = 0 
    )
    db = TestingSessionLocal()
    db.add(user)
    db.commit()
    db.refresh(user)
    yield user

    with engine.connect() as connection:
        connection.execute(text("DELETE FROM user;"))
        connection.commit()