#Completed by: Nidula Mallikarachchi (25/04/2025)

#This script will act as a live restaurant
#The data is generated randomly (mock data) and will be stored in the MongoDB collection
#To make it act as a new restaurant change the Hardcoded Restaurant Info Section Below
#Please keep trac of the restaurant specific data in the restaurant_data.txt file in this project if you are creating a new restaurant
#Creating a new restaurant will create a new collection in the mongodb cluster

import random
from datetime import datetime
import calendar
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

# ------------------ Hardcoded Restaurant Info ------------------
restaurant_info = {
    "restaurant_id": "0001",
    "restaurant_name": "Tasty Food",
    "categories": ["Italian", "Pizza"],
    "base_price": 25.0,
    "total_seats": 50,
    "location": {
        "latitude": -37.8136,
        "longitude": 144.9631,
        "distance_to_cbd_km": 1.5
    }
}

# ------------------ MongoDB Setup ------------------
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["restaurant_training_data"]
collection_name = f"restaurant_{restaurant_info['restaurant_id']}"
collection = db[collection_name]

# ------------------ Simulation Function ------------------
def simulate_day_data(info):
    today = datetime.now()
    date_str = today.strftime("%Y-%m-%d")
    month_day = today.strftime("%m-%d")
    dow = calendar.day_name[today.weekday()]
    month = today.month

    PUBLIC_HOLIDAYS = {"01-01", "01-26", "03-08", "04-25", "12-25", "12-26"}
    LOCAL_EVENTS = {
        "03-10": "Moomba Festival",
        "03-22": "Melbourne Grand Prix",
        "04-01": "Melbourne Comedy Festival",
        "11-01": "Melbourne Cup",
        "12-15": "Christmas Market"
    }
    WEATHER_SEASONS = {
        (12, 1, 2): ["Hot", "Sunny", "Rainy"],
        (3, 4, 5): ["Mild", "Cloudy", "Rainy"],
        (6, 7, 8): ["Cold", "Rainy", "Cloudy"],
        (9, 10, 11): ["Mild", "Sunny", "Rainy"]
    }

    def get_weather(month):
        for months, weather_list in WEATHER_SEASONS.items():
            if month in months:
                return random.choice(weather_list)
        return "Sunny"

    is_holiday = month_day in PUBLIC_HOLIDAYS
    holiday_price_factor = 1.2 if is_holiday else 1.0
    closing_hour = 18 if is_holiday else 22
    event = LOCAL_EVENTS.get(month_day, None)

    hourly_data = []

    for hour in range(8, closing_hour):
        weather = get_weather(month)
        temperature = {
            "Hot": random.randint(28, 38),
            "Sunny": random.randint(20, 28),
            "Mild": random.randint(15, 22),
            "Cloudy": random.randint(10, 18),
            "Cold": random.randint(5, 12),
            "Rainy": random.randint(8, 16)
        }[weather]

        is_weekend = dow in ["Saturday", "Sunday"]
        base_traffic = 20 if is_weekend else 10
        if weather == "Rainy":
            base_traffic *= 0.5
        if is_holiday:
            base_traffic *= 0.8
        if event:
            base_traffic *= 1.3

        check_in_count = int(base_traffic + random.gauss(0, 3))
        reservations = int(check_in_count * random.uniform(0.4, 0.7))
        total_customers = check_in_count + random.randint(1, 5)
        sentiment = round(random.uniform(0.6, 0.9) if weather != "Rainy" else random.uniform(0.5, 0.7), 2)
        price = round(info["base_price"] * holiday_price_factor * random.uniform(0.95, 1.15), 2)

        hourly_data.append({
            "hour": hour,
            "day_of_week": dow,
            "check_in_count": check_in_count,
            "closing_time": closing_hour,
            "google_rating": round(random.uniform(4.0, 4.8), 1),
            "review_sentiment_score": sentiment,
            "categories": info["categories"],
            "weather": weather,
            "temperature": temperature,
            "local_events": [event] if event else [],
            "holiday": is_holiday,
            "reservations": reservations,
            "total_customers": total_customers,
            "average_bill_price": price
        })

    return {
        "restaurant_id": info["restaurant_id"],
        "restaurant_name": info["restaurant_name"],
        "location": info["location"],
        "date": date_str,
        "total_seats": info["total_seats"],
        "hourly_data": hourly_data
    }

# ------------------ Run & Insert ------------------
if __name__ == "__main__":
    print(f"📅 Generating data for {restaurant_info['restaurant_name']}")

    simulated_day = simulate_day_data(restaurant_info)

    collection.insert_one(simulated_day)

    print(f"✅ Inserted data for {simulated_day['date']} into collection '{collection_name}'")
