from .utils import *
from ..routers.admin import get_db, get_current_user
from ..models import LevelResults
from fastapi import status


app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = override_get_current_user

def test_admin_read_all_authenticated(test_levelResults):
    response = client.get("/admin/levelResults")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{
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
    }]
    


def test_admin_delete_levelresults(test_levelResults):
    response = client.delete("/admin/levelresults/1")
    assert response.status_code == 204
    
    db = TestingSessionLocal()
    model = db.quary(LevelResults).filter(LevelResults.id == 1).first()
    assert model is None
    


def test_admin_delete_levelResults_not_found():
    response = client.delete("/admin/levelResults/9999")
    assert response.status_code == 404
    assert response.json() == {'detail': 'Not Found'}
    