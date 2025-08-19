import joblib
import numpy as np
import pandas as pd
import json

# Load pipeline once (at startup)
MODEL_PATH = "customer_demand_pipeline.pkl"
pipeline = joblib.load(MODEL_PATH)

# Discount logic
def compute_discount(predicted_customers: float, total_seats: int) -> int:
    occupancy = predicted_customers / total_seats if total_seats > 0 else 0
    if occupancy < 0.3:
        return 30
    elif occupancy < 0.6:
        return 15
    else:
        return 0

def predict_discount(hour_record: dict) -> dict:
    X = pd.DataFrame([hour_record])
    predicted = pipeline.predict(X)[0]
    discount = compute_discount(predicted, hour_record["total_seats"])
    return {
        "time": f"{hour_record['hour']:02d}:00",
        "discount": discount
    }

# Example usage: generate discounts for a whole day
if __name__ == "__main__":
    base_context = {
        "closing_time": 22,
        "google_rating": 4.5,
        "review_sentiment_score": 0.72,
        "temperature": 18,
        "average_bill_price": 25,
        "total_seats": 80,
        "distance_to_cbd_km": 1.5,
        "weekday_index": 4,
        "is_weekend": 0,
        "day_of_week": "Friday",
        "weather": "Clear",
        "categories": "",
        "local_events": "None",
        "holiday": False
    }

    results = []
    for hour in range(8, 23):  # 08:00–22:00
        record = {
            **base_context,
            "hour": hour,
            "is_lunch": 1 if 11 <= hour <= 14 else 0,
            "is_dinner": 1 if 18 <= hour <= 21 else 0,
            "reservations": 25 if 11 <= hour <= 14 else (40 if 18 <= hour <= 21 else 5)
        }
        results.append(predict_discount(record))

    # Print the whole day as a JSON array
    print(json.dumps(results, indent=2))
