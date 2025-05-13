# Completed by: ChatGPT + Nidula (13/05/2025)
# Simulates daily prediction outputs for restaurants and stores them in MongoDB
# Stores: expected_customers, discounts, accepted_discounts = null

import random
from datetime import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# ------------------ Hardcoded Restaurant Info ------------------
restaurant_info = {
    "restaurant_id": "0001",
    "restaurant_name": "Tasty Food"
}

# ------------------ MongoDB Setup ------------------
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["restaurant_prediction_data"]
collection_name = f"restaurant_{restaurant_info['restaurant_id']}"
collection = db[collection_name]


# ------------------ Prediction Simulation Logic ------------------
def simulate_prediction_data(info):
    today = datetime.now().strftime("%Y-%m-%d")

    expected_customers = {}
    discounts = {}
    accepted_discounts = {}

    for hour in range(8, 22):  # from 8AM to 10PM
        expected = random.randint(5, 30)
        if expected < 10:
            discount = 30
        elif expected < 20:
            discount = 15
        else:
            discount = 0

        hour_str = str(hour).zfill(2)
        expected_customers[hour_str] = expected
        discounts[hour_str] = discount
        accepted_discounts[hour_str] = None  # will be updated by admin

    return {
        "restaurant_id": info["restaurant_id"],
        "date": today,
        "expected_customers": expected_customers,
        "discounts": discounts,
        "accepted_discounts": accepted_discounts
    }


# ------------------ Run & Insert ------------------
if __name__ == "__main__":
    print(f"📊 Simulating prediction for {restaurant_info['restaurant_name']}")

    prediction = simulate_prediction_data(restaurant_info)
    collection.insert_one(prediction)

    print(f"✅ Inserted prediction data for {prediction['date']} into collection '{collection_name}'")
