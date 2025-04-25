#Completed by: Nidula Mallikarachchi (21/04/2025)

import random
import json
from datetime import datetime, timedelta
import calendar

# Constants
PUBLIC_HOLIDAYS = {
    "01-01", "01-26", "03-08", "04-25", "12-25", "12-26"
}

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

DEFAULT_LOCATION = {
    "latitude": -37.8136,
    "longitude": 144.9631,
    "distance_to_cbd_km": 1.5
}

def get_weather(month):
    for months, weather_list in WEATHER_SEASONS.items():
        if month in months:
            return random.choice(weather_list)
    return "Sunny"

def simulate_one_restaurant(
    restaurant_id: str,
    restaurant_name: str,
    categories: list,
    base_price: float,
    total_seats: int,
    years: int = 2,
    output_file: str = "restaurant_data.json"
):
    today = datetime.now()
    start_date = today - timedelta(days=365 * years)
    data_output = []

    for i in range(365 * years):
        current_date = start_date + timedelta(days=i)
        date_str = current_date.strftime("%Y-%m-%d")
        month_day = current_date.strftime("%m-%d")
        dow = calendar.day_name[current_date.weekday()]
        month = current_date.month

        is_holiday = month_day in PUBLIC_HOLIDAYS
        holiday_price_factor = 1.2 if is_holiday else 1.0
        closing_hour = 18 if is_holiday else 22
        event = LOCAL_EVENTS.get(month_day, None)

        day_entry = {
            "restaurant_id": restaurant_id,
            "restaurant_name": restaurant_name,
            "location": DEFAULT_LOCATION,
            "date": date_str,
            "total_seats": total_seats,
            "hourly_data": []
        }

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
            price = round(base_price * holiday_price_factor * random.uniform(0.95, 1.15), 2)

            hourly_record = {
                "hour": hour,
                "day_of_week": dow,
                "check_in_count": check_in_count,
                "closing_time": closing_hour,
                "google_rating": round(random.uniform(4.0, 4.8), 1),
                "review_sentiment_score": sentiment,
                "categories": categories,
                "weather": weather,
                "temperature": temperature,
                "local_events": [event] if event else [],
                "holiday": is_holiday,
                "reservations": reservations,
                "total_customers": total_customers,
                "average_bill_price": price
            }
            day_entry["hourly_data"].append(hourly_record)

        data_output.append(day_entry)

    with open(output_file, "w") as f:
        json.dump(data_output, f, indent=2)

    print(f"✅ Data simulation complete! Saved to: {output_file}")

# 🟢 Interactive Entry
if __name__ == "__main__":
    print("🍽️ Restaurant Data Simulation")
    restaurant_id = input("Enter restaurant ID: ").strip()
    restaurant_name = input("Enter restaurant name: ").strip()
    category_input = input("Enter categories (comma-separated): ").strip()
    categories = [cat.strip() for cat in category_input.split(",")]
    base_price = float(input("Enter base price of an average meal: "))
    total_seats = int(input("How many seats does the restaurant have? "))
    years = int(input("How many years of data? (default 2): ") or 2)
    output_file = input("Output filename (default: restaurant_data.json): ").strip() or "restaurant_data.json"
    if not output_file.endswith(".json"):
        output_file += ".json"

    simulate_one_restaurant(
        restaurant_id=restaurant_id,
        restaurant_name=restaurant_name,
        categories=categories,
        base_price=base_price,
        total_seats=total_seats,
        years=years,
        output_file=output_file
    )
