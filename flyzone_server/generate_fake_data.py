import requests
import random
import time

# The base URL for your FastAPI backend (make sure this matches your backend URL)
BASE_URL = "http://127.0.0.1:8000/game_data"

# Valid IDs from your database
VALID_USER_IDS = ["3", "13", "14"]  # From your fake data
VALID_MISSION_IDS = [1]  # From your missions data
VALID_MAP_IDS = [1]  # From your maps data

# Simulate some game data to send to the backend
def generate_fake_level():
    level = {
        "id": random.randint(0, 2),
        "level_level": random.randint(0, 10),
        "user_id": int(random.choice(VALID_USER_IDS)),  
        # "user": random.randint(0, 2),
        "fog_level": random.randint(0, 120),
        "brightness_level": random.randint(0, 120),
        "wind_level": random.randint(0, 120),
        "close_calls": random.randint(0, 120),
        "spotted": random.randint(0, 120),
        "time_to_finish": random.randint(0, 120),  
        "mission_id": random.choice(VALID_MISSION_IDS), 
        "basemap_id": random.choice(VALID_MAP_IDS),
        "difficulty_level": random.randint(0, 120),
        "connection_lost":  random.randint(0, 3),  
        "payload": random.randint(0, 120), 
        "dust": random.randint(0, 120),
        "night_vision": bool(random.getrandbits(1)), 
        "trees": random.randint(0, 120),
        "birds": random.randint(0, 120),
        "battery_usage": random.randint(0, 120),
        "unique_id": f"level_{time.time()}" 
    }
    return level



def send_fake_data():
    data = generate_fake_level()
    try:
        print("\n--- Sending new data ---")
        print(f"Sending to URL: {BASE_URL}")
        print(f"Data being sent: {data}")
        
        response = requests.post(BASE_URL, json=data)
        
        print(f"Status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        
        if response.status_code != 200:
            print(f"Failed to send data. Status code: {response.status_code}")
            print(f"Response content: {response.text}")
    except requests.exceptions.ConnectionError:
        print("Connection failed - is the server running at http://127.0.0.1:8000?")
        time.sleep(5)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        print(f"Error type: {type(e)}")
        
# Main function to send fake data at intervals
if __name__ == "__main__":
    while True:
        send_fake_data() 
        time.sleep(2)  
