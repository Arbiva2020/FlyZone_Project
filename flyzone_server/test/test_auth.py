from .utils import *
from ..routers.auth import get_db, authenticate_user, create_access_token, SECRET_KEY, ALGORYTHM
from jose import jwt
from datetime import timedelta

app.dependency_overrides[get_db] = override_get_db

def test_authenticate_user(test_user):
    db = TestingSessionLocal()
    
    authenticated_user = authenticate_user(test_user.username, 'testpassword', db)
    assert authenticated_user is not None
    assert authenticated_user.username == test_user.username
    
    
def test_create_access_token():
    username = "testuser"
    user_id = 1
    security_level = 0
    expires_delta = timedelta(days=1)   
    
    token = create_access_token(username, user_id, security_level, expires_delta)
    
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORYTHM], options={'verify_signature':False})
    assert decoded_token['sub'] == username
    assert decoded_token['id'] == user_id
    assert decoded_token['security_level'] == security_level
