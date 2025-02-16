from .utils import *
from ..routers.users import get_db, get_current_user
from fastapi import status

app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = override_get_current_user

def test_return_user(test_user):
    response = client.get("/user")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['security_level'] == 1
    assert response.json()['username'] == "BatyaGalTest"
    assert response.json()['first_name'] == "Bat"
    assert response.json()['last_name'] == "Yagal"
    assert response.json()['password'] == "Batyagal"
    assert response.json()['email'] == "batyagal@bat.com"
    assert response.json()['level'] == 1
    assert response.json()['next_level'] == 1
    assert response.json()['mmr'] == 1
    assert response.json()['badges'] == 1
    assert response.json()['total_assessments'] == 1
    assert response.json()['number_of_failures'] == 1
    assert response.json()['straight_failures'] == 1
    assert response.json()['assessment_overdue'] == True
    assert response.json()['total_score'] == 1
    assert response.json()['company_id'] == 2
    assert response.json()['group_id'] == 1
    assert response.json()['profileImguser'] == "Batyagal"
    
    
# def test_change_password_success(test_user):
#     response = client.put("/user/password", json={"password": "testpassword", "newpassword" : "newpassword"})
#     assert response.status_code == status.HTTP_204_NO_CONTENT


# def test_change_password_invalid_current_passwors(test_user):
#     response = client.put("/user/password", json={"password": "wrongpassword", "newpassword" : "newpassword"})
#     assert response.status_code == status.HTTP_401_UNAUTHORIZED
#     assert response.json() == {"detail": "Error on password change"}


# def test_change_email_success(test_user):
#     response = client.put("/user/email/email@email.com")
#     assert response.status_code == status.HTTP_204_NO_CONTENT


    
