import requests
import json

BASE_URL = "http://127.0.0.1:8000/auth"

def create_test_user(user_id, username):
    user_data = {
        "security_level": 1,
        "username": username,
        "first_name": "Test",
        "last_name": "User",
        "password": "test123",
        "email": f"test{user_id}@example.com",
        "level": 1,
        "next_level": 2,
        "mmr": 1000,
        "badges": 0,
        "total_assessments": 0,
        "number_of_failures": 0,
        "straight_failures": 0,
        "assessment_overdue": False,
        "total_score": 0,
        "company_id": 1,
        "group_id": 1,
        "profileImguser": ""
    }
    
    try:
        response = requests.post(f"{BASE_URL}/", json=user_data)
        if response.status_code == 201:
            print(f"Successfully created user {username}")
        else:
            print(f"Failed to create user {username}: {response.text}")
    except Exception as e:
        print(f"Error creating user {username}: {str(e)}")

def main():
    # Create test users with the IDs we're using in generate_fake_data.py
    test_users = [
        (1234567, "test1234567"),
        (123456, "test123456"),
        (123455, "test123455"),
        (123454, "test123454")
    ]
    
    for user_id, username in test_users:
        create_test_user(user_id, username)

if __name__ == "__main__":
    main() 